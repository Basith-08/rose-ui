import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [vue()],
    test: {
        environment: 'jsdom',
        globals: true,
        include: ['packages/**/tests/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            include: ['packages/tokens/src/**/*.ts', 'packages/ui/src/**/*.{ts,vue}'],
            exclude: [
                'packages/ui/src/**/*.types.ts',
                'packages/ui/src/**/*.styles.ts',
                'packages/ui/src/index.ts',
                'packages/ui/src/vue-shim.d.ts',
            ],
        },
    },
})
