export interface BreadcrumbItem {
    label: string
    href?: string
    current?: boolean
}

export interface BreadcrumbProps {
    items?: BreadcrumbItem[]
    separator?: string
    class?: string
}
