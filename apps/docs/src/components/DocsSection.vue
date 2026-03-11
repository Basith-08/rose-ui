<script setup lang="ts">
defineProps<{
    id: string
    eyebrow?: string
    title: string
    description: string
}>()
</script>

<template>
    <section :id="id" class="space-y-4 scroll-mt-24">
        <div class="space-y-2">
            <p v-if="eyebrow" class="text-sm uppercase tracking-[0.24em] text-slate-500">
                {{ eyebrow }}
            </p>
            <h2 class="text-2xl font-semibold">
                {{ title }}
            </h2>
            <p class="text-sm text-slate-500">
                {{ description }}
            </p>
        </div>
        <slot />
    </section>
</template>
