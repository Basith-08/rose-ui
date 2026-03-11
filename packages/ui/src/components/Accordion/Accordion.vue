<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import { cn } from '../../utils/cn'
import { content, item, root, trigger } from './Accordion.styles'
import type { AccordionItem, AccordionProps } from './Accordion.types'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<AccordionProps>(),
    {
        items: () => [],
        modelValue: null,
        collapsible: true,
    },
)

const emit = defineEmits<{
    'update:modelValue': [value: string | null]
    change: [item: AccordionItem | null]
}>()

const attrs = useAttrs()

const rootClasses = computed(() => cn(root, props.class, attrs.class as string | undefined))

function toggleItem(entry: AccordionItem) {
    if (entry.disabled) {
        return
    }

    const isActive = props.modelValue === entry.value
    const nextValue = isActive && props.collapsible ? null : entry.value

    emit('update:modelValue', nextValue)
    emit('change', nextValue ? entry : null)
}
</script>

<template>
    <div v-bind="attrs" :class="rootClasses">
        <div
            v-for="entry in props.items"
            :key="entry.value"
            :class="cn(item, props.itemClass, entry.disabled && 'opacity-60')"
        >
            <button
                type="button"
                :class="trigger"
                :disabled="entry.disabled"
                :aria-expanded="props.modelValue === entry.value"
                @click="toggleItem(entry)"
            >
                <span>{{ entry.title }}</span>
                <span class="text-xs opacity-70">{{ props.modelValue === entry.value ? '−' : '+' }}</span>
            </button>
            <div v-if="props.modelValue === entry.value" :class="content">
                <slot name="item" :item="entry">
                    {{ entry.content }}
                </slot>
            </div>
        </div>
    </div>
</template>
