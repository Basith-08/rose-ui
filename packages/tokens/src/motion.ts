export const motion = {
    duration: {
        fast: "150ms",
        normal: "250ms",
        slow: "400ms",
    },

    easing: {
        default: "ease",
        smooth: "ease-in-out",
    },
} as const

export type MotionDurationToken = keyof typeof motion.duration
export type MotionEasingToken = keyof typeof motion.easing