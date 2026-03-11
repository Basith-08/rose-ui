<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import Box from '../../primitives/Box.vue'
import { cn } from '../../utils/cn'
import { link, root } from './Breadcrumb.styles'
import type { BreadcrumbProps } from './Breadcrumb.types'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<BreadcrumbProps>(),
    {
        items: () => [],
        separator: '/',
    },
)

const attrs = useAttrs()
const rootClasses = computed(() => cn(root, props.class, attrs.class as string | undefined))
</script>

<template>
    <nav v-bind="attrs" :class="rootClasses" aria-label="Breadcrumb">
        <template v-for="(item, index) in props.items" :key="`${item.label}-${index}`">
            <Box
                :as="item.href && !item.current ? 'a' : 'span'"
                :href="item.href"
                :class="cn(link, item.current && 'font-medium text-text')"
                :aria-current="item.current ? 'page' : undefined"
            >
                {{ item.label }}
            </Box>
            <span v-if="index < props.items.length - 1" aria-hidden="true">
                {{ props.separator }}
            </span>
        </template>
    </nav>
</template>
