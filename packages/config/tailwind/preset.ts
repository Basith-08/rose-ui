import type { Config } from 'tailwindcss'

import { colors, radius, shadows } from '@kagami.b/tokens'

export const tailwindPreset: Partial<Config> = {
    theme: {
        extend: {
            colors: {
                primary: colors.primary,
                secondary: colors.secondary,
                accent: colors.accentDark,

                background: colors.background,
                text: colors.text,
                border: colors.border,

                sage: colors.sage,
            },

            borderRadius: radius,

            boxShadow: shadows,
        },
    },
}

export default tailwindPreset
