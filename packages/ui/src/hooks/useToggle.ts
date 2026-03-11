import { ref } from "vue"

export function useToggle(initial = false) {
    const state = ref(initial)

    function toggle() {
        state.value = !state.value
    }

    function open() {
        state.value = true
    }

    function close() {
        state.value = false
    }

    return { state, toggle, open, close }
}