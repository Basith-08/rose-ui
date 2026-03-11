export const typography = {
    h1: {
        fontSize: "48px",
        fontWeight: 700,
        lineHeight: 1.2,
    },

    h2: {
        fontSize: "36px",
        fontWeight: 700,
        lineHeight: 1.2,
    },

    h3: {
        fontSize: "28px",
        fontWeight: 600,
        lineHeight: 1.2,
    },

    h4: {
        fontSize: "22px",
        fontWeight: 600,
        lineHeight: 1.2,
    },

    body: {
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: 1.6,
    },

    small: {
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: 1.6,
    },

    caption: {
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: 1.6,
    },
} as const

export type TypographyToken = keyof typeof typography