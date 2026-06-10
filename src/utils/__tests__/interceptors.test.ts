import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { axiosInstance, buildApiBaseUrl, setupInterceptors } from '../interceptors';
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
    return {
        default: mockAxios,
        isAxiosError: vi.fn((error) => Boolean(error?.isAxiosError))
    };
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
        vi.spyOn(localStorage, 'setItem');

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
        it('should append the versioned API path to the backend base URL', () => {
            expect(buildApiBaseUrl('https://api.example.com')).toBe('https://api.example.com/api/v1');
            expect(buildApiBaseUrl('https://api.example.com/')).toBe('https://api.example.com/api/v1');
        });

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
                data: { id: 'topic-1' },
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

        it('should handle error response and redirect to error page', async () => {
            setupInterceptors();

            // Get the response error handler
            const errorHandler = vi.mocked(axiosInstance.interceptors.response.use).mock.calls[0][1] as (
                error: any
            ) => Promise<never>;

            const mockError = {
                status: 500,
                response: {
                    status: 500,
                    data: {
                        statusCode: 500,
                        message: 'Server Error'
                    }
                }
            };

            vi.mocked(queryByError).mockReturnValue('unexpected');

            await expect(errorHandler(mockError)).rejects.toEqual(mockError);

            expect(queryByError).toHaveBeenCalledWith(500);
            expect(localStorage.setItem).toHaveBeenCalledWith('error', 'unexpected');
            expect(window.location.assign).toHaveBeenCalledWith('/error');
        });

        it('should not redirect when topic generation is in progress', async () => {
            setupInterceptors();

            // Get the response error handler
            const errorHandler = vi.mocked(axiosInstance.interceptors.response.use).mock.calls[0][1] as (
                error: any
            ) => Promise<never>;

            const mockError = {
                status: 409,
                response: {
                    status: 409,
                    data: {
                        statusCode: 409,
                        message: 'Topic generation in progress',
                        code: 'TOPIC_GENERATION_IN_PROGRESS'
                    }
                }
            };

            await expect(errorHandler(mockError)).rejects.toEqual(mockError);

            expect(queryByError).not.toHaveBeenCalled();
            expect(localStorage.setItem).not.toHaveBeenCalled();
            expect(window.location.assign).not.toHaveBeenCalled();
        });

        it('should not redirect when the authenticated user profile is missing', async () => {
            setupInterceptors();

            const errorHandler = vi.mocked(axiosInstance.interceptors.response.use).mock.calls[0][1] as (
                error: any
            ) => Promise<never>;

            const mockError = {
                status: 404,
                response: {
                    status: 404,
                    data: {
                        statusCode: 404,
                        message: 'User profile not found',
                        code: 'USER_NOT_FOUND'
                    }
                }
            };

            await expect(errorHandler(mockError)).rejects.toEqual(mockError);

            expect(queryByError).not.toHaveBeenCalled();
            expect(localStorage.setItem).not.toHaveBeenCalled();
            expect(window.location.assign).not.toHaveBeenCalled();
        });

        it('should handle network errors without a response', async () => {
            setupInterceptors();

            const errorHandler = vi.mocked(axiosInstance.interceptors.response.use).mock.calls[0][1] as (
                error: any
            ) => Promise<never>;

            const mockError = {
                message: 'Network Error'
            };

            vi.mocked(queryByError).mockReturnValue('unexpected');

            await expect(errorHandler(mockError)).rejects.toEqual(mockError);

            expect(queryByError).toHaveBeenCalledWith(500);
            expect(localStorage.setItem).toHaveBeenCalledWith('error', 'unexpected');
            expect(window.location.assign).toHaveBeenCalledWith('/error');
        });
    });
});
