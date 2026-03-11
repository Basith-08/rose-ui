<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import { cn } from '../../utils/cn'
import { textarea } from './Textarea.styles'
import type { TextareaProps } from './Textarea.types'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<TextareaProps>(),
    {
        modelValue: '',
        rows: 4,
        resize: true,
    },
)

const emit = defineEmits<{
    'update:modelValue': [value: string]
    blur: [event: FocusEvent]
    focus: [event: FocusEvent]
}>()

const attrs = useAttrs()

const textareaClasses = computed(() =>
    cn(
        textarea,
        props.error ? 'border-red-400' : 'border-border',
        props.disabled && 'cursor-not-allowed bg-slate-100 text-slate-500',
        !props.resize && 'resize-none',
        props.textareaClass,
    ),
)

function handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement | null
    emit('update:modelValue', target?.value ?? '')
}
</script>

<template>
    <label :for="props.id" :class="cn('block space-y-1.5', props.class, attrs.class as string | undefined)">
        <span v-if="props.label" class="block text-sm font-medium text-text">
            {{ props.label }}
        </span>
        <textarea
            v-bind="attrs"
            :id="props.id"
            :rows="props.rows"
            :class="textareaClasses"
            :placeholder="props.placeholder"
            :disabled="props.disabled"
            :value="props.modelValue"
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
