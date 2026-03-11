<script setup lang="ts">
defineProps<{
    title: string
    code: string
}>()
</script>

<template>
    <div class="overflow-hidden rounded-2xl border border-border bg-text text-white shadow-sm">
        <div class="border-b border-white/10 px-4 py-3 text-sm font-semibold">
            {{ title }}
        </div>
        <pre class="overflow-x-auto px-4 py-4 text-sm leading-6 text-white/85"><code>{{ code }}</code></pre>
    </div>
</template>
