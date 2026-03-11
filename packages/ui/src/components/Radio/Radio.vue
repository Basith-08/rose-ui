<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import { cn } from '../../utils/cn'
import { control, group, item } from './Radio.styles'
import type { RadioOption, RadioProps } from './Radio.types'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<RadioProps>(),
    {
        modelValue: '',
        options: () => [],
        direction: 'vertical',
        disabled: false,
    },
)

const emit = defineEmits<{
    'update:modelValue': [value: string]
    change: [option: RadioOption]
}>()

const attrs = useAttrs()

const groupClasses = computed(() =>
    cn(
        group,
        props.direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap items-center',
        props.class,
        attrs.class as string | undefined,
    ),
)

function selectOption(option: RadioOption) {
    if (props.disabled || option.disabled) {
        return
    }

    emit('update:modelValue', option.value)
    emit('change', option)
}
</script>

<template>
    <div v-bind="attrs" role="radiogroup" :class="groupClasses">
        <label
            v-for="option in props.options"
            :key="option.value"
            :class="cn(item, props.itemClass, (props.disabled || option.disabled) && 'opacity-60')"
        >
            <input
                :name="props.name"
                type="radio"
                :class="control"
                :checked="props.modelValue === option.value"
                :disabled="props.disabled || option.disabled"
                @change="selectOption(option)"
            />
            <span class="min-w-0 space-y-1">
                <span class="block text-sm font-medium text-text">
                    {{ option.label }}
                </span>
                <span v-if="option.description" class="block text-sm text-slate-500">
                    {{ option.description }}
                </span>
            </span>
        </label>
    </div>
</template>
