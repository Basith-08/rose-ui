import type { Config } from 'tailwindcss'

import preset from '@basith-08/config/tailwind/preset'

export default {
    presets: [preset],
    content: [
        './index.html',
        './src/**/*.{vue,ts}',
        '../../packages/ui/src/**/*.{vue,ts}',
        '../../packages/ui/dist/**/*.{js,d.ts}',
    ],
} satisfies Config
