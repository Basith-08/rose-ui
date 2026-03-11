<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue'

import Box from '../../primitives/Box.vue'
import { cn } from '../../utils/cn'
import { base, variants } from './Toast.styles'
import type { ToastProps } from './Toast.types'

const props = withDefaults(
    defineProps<ToastProps>(),
    {
        modelValue: false,
        variant: 'info',
        duration: 3000,
        closable: true,
    },
)

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    close: []
}>()

let timeoutId: ReturnType<typeof setTimeout> | undefined

const classes = computed(() => cn(base, variants[props.variant], props.class))

function clearTimer() {
    if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = undefined
    }
}

function close() {
    clearTimer()
    emit('update:modelValue', false)
    emit('close')
}

watch(
    () => props.modelValue,
    (isOpen) => {
        clearTimer()

        if (isOpen && props.duration > 0) {
            timeoutId = setTimeout(() => {
                close()
            }, props.duration)
        }
    },
    { immediate: true },
)

onBeforeUnmount(() => {
    clearTimer()
})
</script>

<template>
    <Box v-if="props.modelValue" as="div" :class="classes" role="status" aria-live="polite">
        <div class="flex items-start gap-3">
            <div class="min-w-0 flex-1 space-y-1">
                <p v-if="props.title" class="font-semibold">
                    {{ props.title }}
                </p>
                <p v-if="props.message" class="text-sm text-slate-600">
                    {{ props.message }}
                </p>
                <div v-else class="text-sm">
                    <slot />
                </div>
            </div>
            <button
                v-if="props.closable"
                type="button"
                class="rounded-md px-2 py-1 text-sm text-slate-500 transition hover:bg-background hover:text-text"
                @click="close"
            >
                Close
            </button>
        </div>
    </Box>
</template>
