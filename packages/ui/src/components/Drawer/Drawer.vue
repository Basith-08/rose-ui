<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { useClickOutside } from '../../hooks/useClickOutside'
import { cn } from '../../utils/cn'
import { overlay, panel } from './Drawer.styles'
import type { DrawerProps } from './Drawer.types'

const props = withDefaults(
    defineProps<DrawerProps>(),
    {
        modelValue: false,
        side: 'right',
        closeOnOverlay: true,
        closeOnEscape: true,
        showClose: true,
    },
)

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
}>()

const panelRef = ref<HTMLElement | null>(null)

const panelClasses = computed(() =>
    cn(
        panel,
        props.side === 'right' ? 'right-0' : 'left-0',
        props.class,
    ),
)

function close() {
    emit('update:modelValue', false)
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
    (isOpen) => {
        if (typeof document !== 'undefined') {
            document.body.style.overflow = isOpen ? 'hidden' : ''
        }
    },
    { immediate: true },
)

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
})
</script>

<template>
    <div v-if="props.modelValue">
        <div :class="overlay" />
        <aside ref="panelRef" :class="panelClasses">
            <div v-if="props.title || props.showClose" class="mb-4 flex items-start justify-between gap-4">
                <h2 v-if="props.title" class="text-lg font-semibold text-text">
                    {{ props.title }}
                </h2>
                <button
                    v-if="props.showClose"
                    type="button"
                    class="rounded-md px-2 py-1 text-sm text-slate-500 transition hover:bg-background hover:text-text"
                    @click="close"
                >
                    Close
                </button>
            </div>
            <div class="min-h-0 flex-1 overflow-y-auto">
                <slot />
            </div>
        </aside>
    </div>
</template>
