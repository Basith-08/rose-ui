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
        content: 'Install @kagami.b/rose-ui, @kagami.b/tokens, and provide Vue from the host app as the shared peer dependency.',
    },
    {
        title: 'Verification',
        value: 'verify',
        content: 'Run the playground and docs apps to validate both interactive behavior and package integration locally.',
    },
]

export const installCommand = `pnpm add @kagami.b/rose-ui @kagami.b/tokens vue
pnpm add -D tailwindcss postcss autoprefixer`

export const tailwindSnippet = `import type { Config } from 'tailwindcss'
import { colors, radius, shadows } from '@kagami.b/tokens'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,ts}',
    './node_modules/@kagami.b/rose-ui/dist/**/*.{js,mjs}'
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
