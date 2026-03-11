<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'

import Card from '../Card/Card.vue'
import { useClickOutside } from '../../hooks/useClickOutside'
import { cn } from '../../utils/cn'
import type { ModalProps } from './Modal.types'

const props = withDefaults(
    defineProps<ModalProps>(),
    {
        modelValue: false,
        closeOnOverlay: true,
        closeOnEscape: true,
        showClose: true,
    },
)

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
}>()

const panelRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)
const lastFocusedElement = ref<HTMLElement | null>(null)
const titleId = useId()
const descriptionId = useId()

const isOpen = computed(() => props.modelValue)
const labelledBy = computed(() => (props.title ? titleId : undefined))
const describedBy = computed(() => (props.description ? descriptionId : undefined))

function close() {
    emit('update:modelValue', false)
}

async function focusDialog() {
    await nextTick()
    closeButtonRef.value?.focus()

    if (closeButtonRef.value) {
        return
    }

    panelRef.value?.focus()
}

function restoreFocus() {
    lastFocusedElement.value?.focus()
    lastFocusedElement.value = null
}

function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && props.modelValue && props.closeOnEscape) {
        close()
    }
}

useClickOutside(panelRef, () => {
    if (props.modelValue && props.closeOnOverlay) {
        close()
    }
})

watch(
    () => props.modelValue,
    async (isOpen) => {
        if (typeof document !== 'undefined') {
            document.body.style.overflow = isOpen ? 'hidden' : ''
        }

        if (isOpen && typeof document !== 'undefined') {
            lastFocusedElement.value = document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null
            await focusDialog()
            return
        }

        restoreFocus()
    },
    { immediate: true },
)

onMounted(() => {
    if (typeof document === 'undefined') {
        return
    }

    document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    if (typeof document !== 'undefined') {
        document.removeEventListener('keydown', handleKeydown)
        document.body.style.overflow = ''
    }

    restoreFocus()
})
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black/30 px-4">
        <div
            ref="panelRef"
            class="w-full max-w-lg"
            tabindex="-1"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="labelledBy"
            :aria-describedby="describedBy"
        >
            <Card class="space-y-4 rounded-xl p-6 shadow-lg" :class="cn(props.class)">
                <div v-if="props.title || props.showClose" class="flex items-start justify-between gap-4">
                    <div class="space-y-1">
                        <h2 v-if="props.title" :id="titleId" class="text-lg font-semibold text-text">
                            {{ props.title }}
                        </h2>
                        <p v-if="props.description" :id="descriptionId" class="text-sm text-slate-500">
                            {{ props.description }}
                        </p>
                    </div>
                    <button
                        v-if="props.showClose"
                        ref="closeButtonRef"
                        type="button"
                        class="rounded-md px-2 py-1 text-sm text-slate-500 transition hover:bg-background hover:text-text"
                        aria-label="Close dialog"
                        @click="close"
                    >
                        Close
                    </button>
                </div>
                <slot />
            </Card>
        </div>
    </div>
</template>
