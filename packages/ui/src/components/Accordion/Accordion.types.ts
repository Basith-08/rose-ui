export interface AccordionItem {
    title: string
    value: string
    content?: string
    disabled?: boolean
}

export interface AccordionProps {
    items?: AccordionItem[]
    modelValue?: string | null
    collapsible?: boolean
    class?: string
    itemClass?: string
}
