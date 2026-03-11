export type BadgeVariant = 'primary' | 'secondary' | 'sage' | 'outline'

export type BadgeSize = 'sm' | 'md'

export interface BadgeProps {
    variant?: BadgeVariant
    size?: BadgeSize
    class?: string
}
