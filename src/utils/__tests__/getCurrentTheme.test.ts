import {describe, it, expect} from 'vitest'
import { getCurrentThemeClass } from '../getCurrentTheme'

describe('getCurrentTheme', () => {

    it('should return the dark theme class name when the theme is dark', () => {
        const theme = getCurrentThemeClass('dark')
        expect(theme).toBe('dark-theme')
    })

    it('should return the light theme class name when the theme is light', () => {
        const theme = getCurrentThemeClass('light')
        expect(theme).toBe('light-theme')
    })

    it('should return the light theme class name when the theme is not specified', () => {
        const theme = getCurrentThemeClass('')
        expect(theme).toBe('light-theme')
    })
})