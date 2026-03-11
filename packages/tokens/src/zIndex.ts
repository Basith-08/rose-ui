export const zIndex = {
    dropdown: 1000,
    sticky: 1020,
    overlay: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
} as const

export type ZIndexToken = keyof typeof zIndex