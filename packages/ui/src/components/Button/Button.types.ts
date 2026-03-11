export type ButtonVariant =
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"

export type ButtonSize =
    | "sm"
    | "md"
    | "lg"

export interface ButtonProps {
    as?: string
    variant?: ButtonVariant
    size?: ButtonSize
    disabled?: boolean
    loading?: boolean
    fullWidth?: boolean
    class?: string
    type?: 'button' | 'submit' | 'reset'
}
