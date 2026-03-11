export interface DropdownItem {
    label: string
    value: string
    disabled?: boolean
}

export interface DropdownProps {
    label?: string
    items?: DropdownItem[]
    modelValue?: string
    placeholder?: string
    disabled?: boolean
    class?: string
    contentClass?: string
}
