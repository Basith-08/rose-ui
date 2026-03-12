export const sections = [
    { id: 'install', label: 'Install' },
    { id: 'components', label: 'Components' },
    { id: 'tokens', label: 'Tokens' },
]

export const setupItems = [
    {
        title: 'Tailwind preset',
        value: 'tailwind',
        content: 'Use the Rose preset or mirror its token extensions so utility classes resolve to the expected design tokens.',
    },
    {
        title: 'Package installation',
        value: 'install',
        content: 'Install @basith-08/rose-ui, @basith-08/tokens, and provide Vue from the host app as the shared peer dependency.',
    },
    {
        title: 'Verification',
        value: 'verify',
        content: 'Run the playground and docs apps to validate both interactive behavior and package integration locally.',
    },
]

export const installCommand = `pnpm add @basith-08/rose-ui @basith-08/tokens vue
pnpm add -D tailwindcss postcss autoprefixer`

export const tailwindSnippet = `import type { Config } from 'tailwindcss'
import { colors, radius, shadows } from '@basith-08/tokens'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,ts}',
    './node_modules/@basith-08/rose-ui/dist/**/*.{js,mjs}'
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accentDark,
        background: colors.background,
        text: colors.text,
        border: colors.border,
        sage: colors.sage
      },
      borderRadius: radius,
      boxShadow: shadows
    }
  }
} satisfies Config`
