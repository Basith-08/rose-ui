import { onBeforeUnmount, onMounted, type Ref } from 'vue'

export function useClickOutside(
    element: Ref<HTMLElement | null>,
    handler: (event: MouseEvent | TouchEvent) => void,
) {
    const listener = (event: MouseEvent | TouchEvent) => {
        const target = event.target as Node | null

        if (!element.value || !target || element.value.contains(target)) {
            return
        }

        handler(event)
    }

    onMounted(() => {
        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)
    })

    onBeforeUnmount(() => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
    })
}
