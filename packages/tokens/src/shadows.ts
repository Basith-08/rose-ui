export const shadows = {
    sm: "0 2px 8px rgba(0,0,0,0.08)",

    md: "0 6px 16px rgba(0,0,0,0.12)",

    lg: "0 12px 30px rgba(0,0,0,0.15)",
} as const

export type ShadowToken = keyof typeof shadows