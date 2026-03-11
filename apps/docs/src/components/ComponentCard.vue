<script setup lang="ts">
defineProps<{
    title: string
    description: string
}>()
</script>

<template>
    <div class="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm">
        <div class="space-y-1">
            <p class="text-sm font-semibold text-text">
                {{ title }}
            </p>
            <p class="text-sm leading-6 text-slate-500">
                {{ description }}
            </p>
        </div>
        <div class="mt-4">
            <slot />
        </div>
    </div>
</template>
