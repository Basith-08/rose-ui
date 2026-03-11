<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import Box from '../../primitives/Box.vue'
import { cn } from '../../utils/cn'
import { base, variants, sizes } from './Button.styles'
import type { ButtonProps } from './Button.types'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<ButtonProps>(),
    {
        as: 'button',
        variant: 'primary',
        size: 'md',
        loading: false,
        fullWidth: false,
        type: 'button',
    },
)

const attrs = useAttrs()

const classes = computed(() =>
    cn(
        base,
        variants[props.variant],
        sizes[props.size],
        props.fullWidth && 'w-full',
        props.class,
        attrs.class as string | undefined,
    ),
)

const isDisabled = computed(() => props.disabled || props.loading)
</script>

<template>
    <Box
        :as="props.as"
        v-bind="attrs"
        :class="classes"
        :type="props.as === 'button' ? props.type : undefined"
        :disabled="props.as === 'button' ? isDisabled : undefined"
        :aria-busy="props.loading || undefined"
        :aria-disabled="isDisabled || undefined"
    >
        <span v-if="props.loading" class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        <slot />
    </Box>
</template>
