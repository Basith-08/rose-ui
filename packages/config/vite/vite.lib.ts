import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export function createViteLibConfig(entry: string) {
    return defineConfig({
        plugins: [vue()],
        build: {
            lib: {
                entry,
                formats: ['es'],
                fileName: 'index',
            },
            rollupOptions: {
                external: ['vue'],
            },
        },
    })
}
