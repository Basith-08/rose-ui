import { describe, expect, it } from 'vitest'

import { colors, motion, radius, shadows, spacing, typography, zIndex } from '../index'

describe('@basith-08/tokens', () => {
    it('exposes the core token groups', () => {
        expect(colors.primary).toBe('#DCA1A1')
        expect(spacing).toBeTruthy()
        expect(radius).toBeTruthy()
        expect(shadows).toBeTruthy()
        expect(motion).toBeTruthy()
        expect(typography).toBeTruthy()
        expect(zIndex).toBeTruthy()
    })
})
