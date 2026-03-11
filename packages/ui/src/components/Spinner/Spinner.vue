<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import Box from '../../primitives/Box.vue'
import { cn } from '../../utils/cn'
import { base, sizes } from './Spinner.styles'
import type { SpinnerProps } from './Spinner.types'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<SpinnerProps>(),
    {
        size: 'md',
        label: 'Loading',
    },
)

const attrs = useAttrs()

const classes = computed(() =>
    cn(base, sizes[props.size], props.class, attrs.class as string | undefined),
)
</script>

<template>
    <Box
        as="span"
        v-bind="attrs"
        :class="classes"
        role="status"
        :aria-label="props.label"
    />
</template>
