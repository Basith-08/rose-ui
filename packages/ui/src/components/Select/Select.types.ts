export interface SelectOption {
    label: string
    value: string
    disabled?: boolean
}

export interface SelectProps {
    modelValue?: string
    options?: SelectOption[]
    label?: string
    placeholder?: string
    hint?: string
    error?: string
    disabled?: boolean
    id?: string
    class?: string
    selectClass?: string
}
