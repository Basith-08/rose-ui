<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import { cn } from '../../utils/cn'
import { active, button, root } from './Pagination.styles'
import type { PaginationProps } from './Pagination.types'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<PaginationProps>(),
    {
        page: 1,
        totalPages: 1,
        siblingCount: 1,
        disabled: false,
    },
)

const emit = defineEmits<{
    'update:page': [page: number]
    change: [page: number]
}>()

const attrs = useAttrs()

const pages = computed(() => {
    const total = Math.max(props.totalPages, 1)
    return Array.from({ length: total }, (_, index) => index + 1)
})

const rootClasses = computed(() => cn(root, props.class, attrs.class as string | undefined))

function setPage(nextPage: number) {
    if (props.disabled || nextPage < 1 || nextPage > props.totalPages || nextPage === props.page) {
        return
    }

    emit('update:page', nextPage)
    emit('change', nextPage)
}
</script>

<template>
    <nav v-bind="attrs" :class="rootClasses" aria-label="Pagination">
        <button
            type="button"
            :class="button"
            :disabled="props.disabled || props.page <= 1"
            @click="setPage(props.page - 1)"
        >
            Prev
        </button>
        <button
            v-for="entry in pages"
            :key="entry"
            type="button"
            :class="cn(button, props.page === entry && active)"
            :disabled="props.disabled"
            @click="setPage(entry)"
        >
            {{ entry }}
        </button>
        <button
            type="button"
            :class="button"
            :disabled="props.disabled || props.page >= props.totalPages"
            @click="setPage(props.page + 1)"
        >
            Next
        </button>
    </nav>
</template>
