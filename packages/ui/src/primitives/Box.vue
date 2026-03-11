<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import { cn } from '../utils/cn'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<{
        as?: string
        class?: string
    }>(),
    {
        as: 'div',
    },
)

const attrs = useAttrs()

const forwardedAttrs = computed(() => {
    const { class: _class, ...rest } = attrs
    return rest
})

const classes = computed(() => cn(attrs.class as string | undefined, props.class))
</script>

<template>
    <component :is="props.as" v-bind="forwardedAttrs" :class="classes">
        <slot />
    </component>
</template>
