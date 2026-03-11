<script setup lang="ts">
import { computed } from 'vue'

import Flex from './Flex.vue'
import { cn } from '../utils/cn'

const props = withDefaults(
    defineProps<{
        as?: string
        class?: string
        gap?: string
        align?: string
    }>(),
    {
        as: 'div',
        gap: '1rem',
    },
)

const classes = computed(() => cn('flex-col', props.class))

const style = computed(() => ({
    gap: props.gap,
    alignItems: props.align,
}))
</script>

<template>
    <Flex :as="props.as" :class="classes" :style="style" v-bind="$attrs">
        <slot />
    </Flex>
</template>
