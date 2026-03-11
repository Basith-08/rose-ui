export type AvatarSize = 'sm' | 'md' | 'lg'

export interface AvatarProps {
    src?: string
    alt?: string
    name?: string
    size?: AvatarSize
    rounded?: boolean
    class?: string
}
