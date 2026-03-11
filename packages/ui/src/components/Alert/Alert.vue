<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue'

import Box from '../../primitives/Box.vue'
import { cn } from '../../utils/cn'
import { base, variants } from './Alert.styles'
import type { AlertProps } from './Alert.types'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<AlertProps>(),
    {
        as: 'div',
        variant: 'info',
        closable: false,
    },
)

const emit = defineEmits<{
    close: []
}>()

const attrs = useAttrs()
const visible = ref(true)

watch(
    () => [props.title, props.variant, props.closable, props.class],
    () => {
        visible.value = true
    },
)

const classes = computed(() =>
    cn(base, variants[props.variant], props.class, attrs.class as string | undefined),
)

function close() {
    visible.value = false
    emit('close')
}
</script>

<template>
    <Box
        v-if="visible"
        :as="props.as"
        v-bind="attrs"
        :class="classes"
        role="alert"
    >
        <div class="flex items-start gap-3">
            <div class="min-w-0 flex-1 space-y-1">
                <p v-if="props.title" class="font-semibold">
                    {{ props.title }}
                </p>
                <div class="text-sm">
                    <slot />
                </div>
            </div>
            <button
                v-if="props.closable"
                type="button"
                class="rounded-md px-2 py-1 text-sm opacity-70 transition hover:opacity-100"
                @click="close"
            >
                Close
            </button>
        </div>
    </Box>
</template>
