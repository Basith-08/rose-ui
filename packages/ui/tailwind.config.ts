import type { Config } from 'tailwindcss'

import preset from '../config/tailwind/preset'

export default {
    presets: [preset],
    content: ['./src/**/*.{vue,ts}', './index.html'],
} satisfies Config
