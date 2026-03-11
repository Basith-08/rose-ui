<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import Box from '../../primitives/Box.vue'
import { cn } from '../../utils/cn'
import { base, rounded } from './Skeleton.styles'
import type { SkeletonProps } from './Skeleton.types'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<SkeletonProps>(),
    {
        width: '100%',
        height: '1rem',
        rounded: 'md',
    },
)

const attrs = useAttrs()

const classes = computed(() =>
    cn(base, rounded[props.rounded], props.class, attrs.class as string | undefined),
)

const style = computed(() => ({
    width: props.width,
    height: props.height,
}))
</script>

<template>
    <Box as="div" v-bind="attrs" :class="classes" :style="style" aria-hidden="true" />
</template>
