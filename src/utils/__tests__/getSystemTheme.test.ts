import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getTheme } from '../getSystemTheme'

describe('getSystemTheme', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'matchMedia', {
            value: vi.fn().mockImplementation(query => ({
                matches: query === '(prefers-color-scheme: dark)',
                media: query,
                onchange: null,
                addListener: vi.fn()
            }))
        })
    })


    it('should return the system theme when the system theme is dark', () => {
        const theme = getTheme()
        expect(theme).toBe('dark')
    })
})