export interface RadioOption {
    label: string
    value: string
    description?: string
    disabled?: boolean
}

export interface RadioProps {
    modelValue?: string
    name?: string
    options?: RadioOption[]
    direction?: 'vertical' | 'horizontal'
    disabled?: boolean
    class?: string
    itemClass?: string
}
