<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'

import { useClickOutside } from '../../hooks/useClickOutside'
import { cn } from '../../utils/cn'
import { item, menu, trigger } from './Dropdown.styles'
import type { DropdownItem, DropdownProps } from './Dropdown.types'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<DropdownProps>(),
    {
        label: 'Options',
        items: () => [],
        placeholder: 'Select an option',
        disabled: false,
    },
)

const emit = defineEmits<{
    'update:modelValue': [value: string]
    select: [item: DropdownItem]
}>()

const attrs = useAttrs()
const rootRef = ref<HTMLElement | null>(null)
const open = ref(false)

useClickOutside(rootRef, () => {
    open.value = false
})

const selectedItem = computed(() =>
    props.items.find((entry) => entry.value === props.modelValue),
)

const triggerClasses = computed(() =>
    cn(trigger, props.disabled && 'cursor-not-allowed opacity-60', attrs.class as string | undefined, props.class),
)

const menuClasses = computed(() => cn(menu, props.contentClass))

function toggle() {
    if (props.disabled) {
        return
    }

    open.value = !open.value
}

function selectItem(entry: DropdownItem) {
    if (entry.disabled) {
        return
    }

    emit('update:modelValue', entry.value)
    emit('select', entry)
    open.value = false
}
</script>

<template>
    <div ref="rootRef" class="relative inline-block w-full">
        <button
            v-bind="attrs"
            type="button"
            :class="triggerClasses"
            :disabled="props.disabled"
            :aria-expanded="open"
            @click="toggle"
        >
            <span class="truncate">{{ selectedItem?.label ?? props.placeholder }}</span>
            <span class="text-xs opacity-70">{{ open ? '▲' : '▼' }}</span>
        </button>
        <div v-if="open" :class="menuClasses">
            <button
                v-for="entry in props.items"
                :key="entry.value"
                type="button"
                :class="cn(item, entry.disabled && 'cursor-not-allowed opacity-50')"
                :disabled="entry.disabled"
                @click="selectItem(entry)"
            >
                {{ entry.label }}
            </button>
        </div>
    </div>
</template>
