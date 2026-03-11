export type AlertVariant = 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps {
    as?: string
    variant?: AlertVariant
    title?: string
    closable?: boolean
    class?: string
}
