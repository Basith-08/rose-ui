import type { App, InjectionKey } from 'vue'

export type ThemeValue = Record<string, string | number | boolean | null | undefined>

export const ThemeSymbol: InjectionKey<ThemeValue> = Symbol('rose-theme')

export function createTheme(theme: ThemeValue) {
    return {
        install(app: App) {
            app.provide(ThemeSymbol, theme)
        },
    }
}
