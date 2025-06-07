/// <reference types="jest" />

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { isUserProfileCompleted } from '../isUserProfileCompleted';
import { checkUserProfile } from '@/service/checkUserProfile';
import type { AxiosResponse } from 'axios';

// Mock the checkUserProfile service
vi.mock('@/service/checkUserProfile');

describe('isUserProfileCompleted', () => {
    const mockToken = 'test-token';

    beforeEach(() => {
        // Clear all mocks before each test
        vi.clearAllMocks();
    });

    it('should return true when user profile exists', async () => {
        // Mock successful response with exists = true
        const mockResponse: AxiosResponse = {
            data: { exists: true },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as any
        };
        vi.mocked(checkUserProfile).mockResolvedValue(mockResponse);

        const result = await isUserProfileCompleted(mockToken);

        expect(result).toBe(true);
        expect(checkUserProfile).toHaveBeenCalledWith(mockToken);
        expect(checkUserProfile).toHaveBeenCalledTimes(1);
    });

    it('should return false when user profile does not exist', async () => {

        const mockResponse: AxiosResponse = {
            data: { exists: false },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as any
        };
        vi.mocked(checkUserProfile).mockResolvedValue(mockResponse);

        const result = await isUserProfileCompleted(mockToken);

        expect(result).toBe(false);
        expect(checkUserProfile).toHaveBeenCalledWith(mockToken);
        expect(checkUserProfile).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when API call fails', async () => {
        const errorMessage = 'API Error';

        vi.mocked(checkUserProfile).mockRejectedValue(new Error(errorMessage));

        await expect(isUserProfileCompleted(mockToken)).rejects.toThrow(errorMessage);
        expect(checkUserProfile).toHaveBeenCalledWith(mockToken);
        expect(checkUserProfile).toHaveBeenCalledTimes(1);
    });
});
