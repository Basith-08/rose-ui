export interface TabItem {
    label: string
    value: string
    disabled?: boolean
}

export interface TabsProps {
    items?: TabItem[]
    modelValue?: string
    class?: string
    listClass?: string
    panelClass?: string
}
