<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import { cn } from '../../utils/cn'
import { select } from './Select.styles'
import type { SelectProps } from './Select.types'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<SelectProps>(),
    {
        modelValue: '',
        options: () => [],
        placeholder: 'Select an option',
        disabled: false,
    },
)

const emit = defineEmits<{
    'update:modelValue': [value: string]
    change: [value: string]
}>()

const attrs = useAttrs()

const selectClasses = computed(() =>
    cn(
        select,
        props.error ? 'border-red-400' : 'border-border',
        props.disabled && 'cursor-not-allowed bg-slate-100 text-slate-500',
        props.selectClass,
    ),
)

function handleChange(event: Event) {
    const target = event.target as HTMLSelectElement | null
    const value = target?.value ?? ''
    emit('update:modelValue', value)
    emit('change', value)
}
</script>

<template>
    <label :for="props.id" :class="cn('block space-y-1.5', props.class, attrs.class as string | undefined)">
        <span v-if="props.label" class="block text-sm font-medium text-text">
            {{ props.label }}
        </span>
        <select
            v-bind="attrs"
            :id="props.id"
            :class="selectClasses"
            :value="props.modelValue"
            :disabled="props.disabled"
            :aria-invalid="Boolean(props.error) || undefined"
            @change="handleChange"
        >
            <option value="" disabled>
                {{ props.placeholder }}
            </option>
            <option
                v-for="option in props.options"
                :key="option.value"
                :value="option.value"
                :disabled="option.disabled"
            >
                {{ option.label }}
            </option>
        </select>
        <span v-if="props.error" class="block text-sm text-red-500">
            {{ props.error }}
        </span>
        <span v-else-if="props.hint" class="block text-sm text-slate-500">
            {{ props.hint }}
        </span>
    </label>
</template>
