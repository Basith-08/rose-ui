<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import { cn } from '../../utils/cn'
import { list, panel, trigger, triggerActive } from './Tabs.styles'
import type { TabItem, TabsProps } from './Tabs.types'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<TabsProps>(),
    {
        items: () => [],
        modelValue: '',
    },
)

const emit = defineEmits<{
    'update:modelValue': [value: string]
    change: [item: TabItem]
}>()

const attrs = useAttrs()

const activeValue = computed(() => props.modelValue || props.items[0]?.value || '')
const activeItem = computed(() => props.items.find((entry) => entry.value === activeValue.value))

function selectTab(entry: TabItem) {
    if (entry.disabled) {
        return
    }

    emit('update:modelValue', entry.value)
    emit('change', entry)
}
</script>

<template>
    <div v-bind="attrs" :class="props.class">
        <div role="tablist" :class="cn(list, props.listClass)">
            <button
                v-for="entry in props.items"
                :key="entry.value"
                type="button"
                role="tab"
                :disabled="entry.disabled"
                :aria-selected="activeValue === entry.value"
                :class="cn(trigger, activeValue === entry.value && triggerActive, entry.disabled && 'cursor-not-allowed opacity-50')"
                @click="selectTab(entry)"
            >
                {{ entry.label }}
            </button>
        </div>
        <div :class="cn(panel, props.panelClass)">
            <slot :active-tab="activeItem" :active-value="activeValue">
                {{ activeItem?.label }}
            </slot>
        </div>
    </div>
</template>
