export const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60"

export const variants = {
    primary:
        "bg-primary text-white hover:bg-secondary",

    secondary:
        "bg-secondary text-white hover:bg-accent",

    outline:
        "border border-border text-text hover:bg-background",

    ghost:
        "text-text hover:bg-background",
}

export const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
}
