import { describe, it, expect } from 'vitest';
import { queryByError } from '../pathByError';

describe('queryByError', () => {
    it('should return "unauthorized" for error code 401', () => {
        expect(queryByError(401)).toBe('unauthorized');
    });

    it('should return "not-found" for error code 404', () => {
        expect(queryByError(404)).toBe('not-found');
    });

    it('should return "too-many-requests" for error code 429', () => {
        expect(queryByError(429)).toBe('too-many-requests');
    });

    it('should return "unexpected" for error code 500', () => {
        expect(queryByError(500)).toBe('unexpected');
    });

    it('should return "unexpected" for any unhandled error code', () => {
        expect(queryByError(403)).toBe('unexpected');
        expect(queryByError(502)).toBe('unexpected');
        expect(queryByError(418)).toBe('unexpected');
    });
});
