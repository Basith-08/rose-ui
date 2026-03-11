<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import { cn } from '../../utils/cn'
import type { InputProps } from './Input.types'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<InputProps>(),
    {
        modelValue: '',
        type: 'text',
    },
)

const emit = defineEmits<{
    'update:modelValue': [value: string]
    blur: [event: FocusEvent]
    focus: [event: FocusEvent]
}>()

const attrs = useAttrs()

function handleInput(event: Event) {
    const target = event.target as HTMLInputElement | null
    emit('update:modelValue', target?.value ?? '')
}

const inputClasses = computed(() =>
    cn(
        'w-full rounded-md border px-3 py-2 outline-none transition focus:ring-2 focus:ring-primary',
        props.error ? 'border-red-400' : 'border-border',
        props.disabled && 'cursor-not-allowed bg-slate-100 text-slate-500',
        props.inputClass,
    ),
)
</script>

<template>
    <label :for="props.id" :class="cn('block space-y-1.5', props.class, attrs.class as string | undefined)">
        <span v-if="props.label" class="block text-sm font-medium text-text">
            {{ props.label }}
        </span>
        <input
            v-bind="attrs"
            :id="props.id"
            :type="props.type"
            :class="inputClasses"
            :value="props.modelValue"
            :placeholder="props.placeholder"
            :disabled="props.disabled"
            :aria-invalid="Boolean(props.error) || undefined"
            @input="handleInput"
            @blur="emit('blur', $event)"
            @focus="emit('focus', $event)"
        />
        <span v-if="props.error" class="block text-sm text-red-500">
            {{ props.error }}
        </span>
        <span v-else-if="props.hint" class="block text-sm text-slate-500">
            {{ props.hint }}
        </span>
    </label>
</template>
