<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import Box from '../../primitives/Box.vue'
import { cn } from '../../utils/cn'
import type { BadgeProps } from './Badge.types'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<BadgeProps>(),
    {
        variant: 'primary',
        size: 'sm',
    },
)

const attrs = useAttrs()

const classes = computed(() =>
    cn(
        'inline-flex items-center rounded-full font-medium',
        props.size === 'sm' ? 'px-2 py-1 text-xs' : 'px-2.5 py-1 text-sm',
        props.variant === 'primary' && 'bg-primary text-white',
        props.variant === 'secondary' && 'bg-secondary text-white',
        props.variant === 'sage' && 'bg-sage text-white',
        props.variant === 'outline' && 'border border-border bg-white text-text',
        props.class,
        attrs.class as string | undefined,
    ),
)
</script>

<template>
    <Box as="span" v-bind="attrs" :class="classes">
        <slot />
    </Box>
</template>
