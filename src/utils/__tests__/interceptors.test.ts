import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { axiosInstance, setupInterceptors } from '../interceptors';
import { queryByError } from '../pathByError';
import type { AxiosResponse, InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios';

vi.mock('../pathByError', () => ({
    queryByError: vi.fn()
}));

vi.mock('axios', () => {
    const mockAxios = {
        create: vi.fn(() => mockAxios),
        interceptors: {
            request: {
                use: vi.fn((callback) => callback)
            },
            response: {
                use: vi.fn((successCallback, errorCallback) => ({ successCallback, errorCallback }))
            }
        }
    };
    return { default: mockAxios };
});

describe('Interceptors', () => {
    const mockMetaElement = document.createElement('meta');
    const mockCsrfToken = 'test-csrf-token';

    beforeEach(() => {
        // Setup CSRF meta tag
        mockMetaElement.setAttribute('name', 'csrf-token');
        mockMetaElement.setAttribute('content', mockCsrfToken);
        document.head.appendChild(mockMetaElement);

        // Mock localStorage
        vi.spyOn(Storage.prototype, 'setItem');

        // Mock window.location.assign
        const assignMock = vi.fn();
        vi.stubGlobal('location', { assign: assignMock });
    });

    afterEach(() => {
        // Cleanup
        document.head.removeChild(mockMetaElement);
        vi.clearAllMocks();
        vi.unstubAllGlobals();
    });

    describe('Setup Interceptors', () => {
        it('should set up request and response interceptors', () => {
            setupInterceptors();

            expect(axiosInstance.interceptors.request.use).toHaveBeenCalled();
            expect(axiosInstance.interceptors.response.use).toHaveBeenCalled();
        });

        it('should add CSRF token to request headers', async () => {
            setupInterceptors();

            // Get the request interceptor function
            const requestInterceptor = vi.mocked(axiosInstance.interceptors.request.use).mock.calls[0][0] as (
                config: InternalAxiosRequestConfig
            ) => Promise<InternalAxiosRequestConfig>;

            // Create a simple headers object that can be mutated
            const headers = {} as AxiosRequestHeaders;
            const config: InternalAxiosRequestConfig = {
                headers
            };

            const result = await requestInterceptor(config);

            expect(result.headers['X-CSRF-TOKEN']).toBe(mockCsrfToken);
        });

        it('should handle successful response', () => {
            setupInterceptors();

            // Get the response success handler
            const successHandler = vi.mocked(axiosInstance.interceptors.response.use).mock.calls[0][0] as (
                response: AxiosResponse
            ) => AxiosResponse;

            const mockResponse: AxiosResponse = {
                data: { success: true },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {
                    headers: {} as AxiosRequestHeaders
                } as InternalAxiosRequestConfig
            };

            const result = successHandler(mockResponse);
            expect(result).toEqual(mockResponse);
        });

        it('should handle error response and redirect to error page', () => {
            setupInterceptors();

            // Get the response error handler
            const errorHandler = vi.mocked(axiosInstance.interceptors.response.use).mock.calls[0][1] as (
                error: any
            ) => void;

            const mockError = {
                status: 500,
                response: {
                    data: {
                        content: 'Server Error'
                    }
                }
            };

            vi.mocked(queryByError).mockReturnValue('unexpected');

            errorHandler(mockError);

            expect(queryByError).toHaveBeenCalledWith(500);
            expect(localStorage.setItem).toHaveBeenCalledWith('error', 'unexpected');
            expect(window.location.assign).toHaveBeenCalledWith('/error');
        });

        it('should not redirect if error content is "Topic in progress"', () => {
            setupInterceptors();

            // Get the response error handler
            const errorHandler = vi.mocked(axiosInstance.interceptors.response.use).mock.calls[0][1] as (
                error: any
            ) => void;

            const mockError = {
                status: 500,
                response: {
                    data: {
                        content: 'Topic in progress'
                    }
                }
            };

            vi.mocked(queryByError).mockReturnValue('unexpected');

            errorHandler(mockError);

            expect(queryByError).toHaveBeenCalledWith(500);
            expect(localStorage.setItem).toHaveBeenCalledWith('error', 'unexpected');
            expect(window.location.assign).not.toHaveBeenCalled();
        });
    });
});
