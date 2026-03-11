<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import Box from '../../primitives/Box.vue'
import { cn } from '../../utils/cn'
import type { CardProps } from './Card.types'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<CardProps>(),
    {
        as: 'div',
        padded: true,
        bordered: true,
        interactive: false,
    },
)

const attrs = useAttrs()

const classes = computed(() =>
    cn(
        'rounded-lg bg-white shadow-sm',
        props.padded && 'p-4',
        props.bordered && 'border border-border',
        props.interactive && 'transition hover:-translate-y-0.5 hover:shadow-md',
        props.class,
        attrs.class as string | undefined,
    ),
)
</script>

<template>
    <Box :as="props.as" v-bind="attrs" :class="classes">
        <slot />
    </Box>
</template>
