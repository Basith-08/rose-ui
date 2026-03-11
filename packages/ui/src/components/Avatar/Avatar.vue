<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'

import Box from '../../primitives/Box.vue'
import { cn } from '../../utils/cn'
import { base, sizes } from './Avatar.styles'
import type { AvatarProps } from './Avatar.types'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<AvatarProps>(),
    {
        alt: 'Avatar',
        size: 'md',
        rounded: true,
    },
)

const attrs = useAttrs()
const hasImageError = ref(false)

const initials = computed(() => {
    if (!props.name) {
        return '?'
    }

    return props.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('')
})

const classes = computed(() =>
    cn(
        base,
        sizes[props.size],
        props.rounded ? 'rounded-full' : 'rounded-lg',
        props.class,
        attrs.class as string | undefined,
    ),
)

function handleError() {
    hasImageError.value = true
}
</script>

<template>
    <Box as="span" v-bind="attrs" :class="classes" aria-label="avatar">
        <img
            v-if="props.src && !hasImageError"
            :src="props.src"
            :alt="props.alt"
            class="h-full w-full object-cover"
            @error="handleError"
        />
        <span v-else>{{ initials }}</span>
    </Box>
</template>
