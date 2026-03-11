<script setup lang="ts">
import { computed } from 'vue'

import Box from './Box.vue'
import { cn } from '../utils/cn'

const props = withDefaults(
    defineProps<{
        as?: string
        class?: string
        inline?: boolean
    }>(),
    {
        as: 'div',
        inline: false,
    },
)

const classes = computed(() => cn(props.inline ? 'inline-flex' : 'flex', props.class))
</script>

<template>
    <Box :as="props.as" :class="classes" v-bind="$attrs">
        <slot />
    </Box>
</template>
