import type { Ref } from 'vue'

type PossibleRef<T> = Ref<T | null> | ((value: T | null) => void) | undefined

export function mergeRefs<T>(...refs: PossibleRef<T>[]) {
    return (value: T | null) => {
        refs.forEach((ref) => {
            if (!ref) {
                return
            }

            if (typeof ref === 'function') {
                ref(value)
                return
            }

            ref.value = value
        })
    }
}
