<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'

import { cn } from '../../utils/cn'
import { content, wrapper } from './Tooltip.styles'
import type { TooltipProps } from './Tooltip.types'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<TooltipProps>(),
    {
        text: '',
        side: 'top',
        open: undefined,
    },
)

const attrs = useAttrs()
const hovering = ref(false)

const isOpen = computed(() => props.open ?? hovering.value)

const contentClasses = computed(() =>
    cn(
        content,
        props.side === 'top' && 'bottom-full left-1/2 mb-2 -translate-x-1/2',
        props.side === 'bottom' && 'left-1/2 top-full mt-2 -translate-x-1/2',
        props.class,
    ),
)
</script>

<template>
    <span
        v-bind="attrs"
        :class="wrapper"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
        @focusin="hovering = true"
        @focusout="hovering = false"
    >
        <slot />
        <span v-if="isOpen && props.text" role="tooltip" :class="contentClasses">
            {{ props.text }}
        </span>
    </span>
</template>
