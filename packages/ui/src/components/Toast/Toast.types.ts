export type ToastVariant = 'info' | 'success' | 'warning' | 'danger'

export interface ToastProps {
    modelValue?: boolean
    variant?: ToastVariant
    title?: string
    message?: string
    duration?: number
    closable?: boolean
    class?: string
}
