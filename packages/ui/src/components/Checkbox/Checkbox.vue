<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import { cn } from '../../utils/cn'
import { description, input, label, wrapper } from './Checkbox.styles'
import type { CheckboxProps } from './Checkbox.types'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<CheckboxProps>(),
    {
        modelValue: false,
        disabled: false,
    },
)

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    change: [value: boolean]
}>()

const attrs = useAttrs()

const wrapperClasses = computed(() => cn(wrapper, props.class, attrs.class as string | undefined))
const inputClasses = computed(() => cn(input, props.inputClass))

function handleChange(event: Event) {
    const target = event.target as HTMLInputElement | null
    const nextValue = Boolean(target?.checked)
    emit('update:modelValue', nextValue)
    emit('change', nextValue)
}
</script>

<template>
    <label :for="props.id" :class="wrapperClasses">
        <input
            v-bind="attrs"
            :id="props.id"
            type="checkbox"
            :checked="props.modelValue"
            :disabled="props.disabled"
            :class="inputClasses"
            @change="handleChange"
        />
        <span class="min-w-0 space-y-1">
            <span v-if="props.label" :class="label">
                {{ props.label }}
            </span>
            <span v-if="props.description" :class="description">
                {{ props.description }}
            </span>
        </span>
    </label>
</template>
