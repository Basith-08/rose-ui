<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import { cn } from '../../utils/cn'
import { thumb, track, wrapper } from './Switch.styles'
import type { SwitchProps } from './Switch.types'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<SwitchProps>(),
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
const trackClasses = computed(() =>
    cn(
        track,
        props.modelValue ? 'bg-primary' : 'bg-slate-300',
        props.disabled && 'cursor-not-allowed opacity-60',
    ),
)

const thumbClasses = computed(() =>
    cn(thumb, props.modelValue ? 'left-[1.45rem]' : 'left-0.5'),
)

function toggle() {
    if (props.disabled) {
        return
    }

    const nextValue = !props.modelValue
    emit('update:modelValue', nextValue)
    emit('change', nextValue)
}
</script>

<template>
    <button
        v-bind="attrs"
        type="button"
        role="switch"
        :aria-checked="props.modelValue"
        :disabled="props.disabled"
        :class="wrapperClasses"
        @click="toggle"
    >
        <span :class="trackClasses">
            <span :class="thumbClasses" />
        </span>
        <span class="min-w-0 text-left">
            <span v-if="props.label" class="block text-sm font-medium text-text">
                {{ props.label }}
            </span>
            <span v-if="props.description" class="block text-sm text-slate-500">
                {{ props.description }}
            </span>
        </span>
    </button>
</template>
