<script setup lang="ts">
defineProps<{
    title: string
    subtitle: string
    currentPath?: string
    navigation?: Array<{ label: string; to: string }>
}>()
</script>

<template>
    <div class="min-h-screen">
        <header class="border-b border-white/60 bg-white/70 backdrop-blur">
            <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                <div>
                    <p class="text-sm uppercase tracking-[0.24em] text-slate-500">
                        Rose UI
                    </p>
                    <h1 class="text-3xl font-semibold tracking-tight">
                        {{ title }}
                    </h1>
                </div>
                <slot name="header-actions" />
            </div>
        </header>

        <main class="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
            <p class="max-w-2xl text-base leading-7 text-slate-600">
                {{ subtitle }}
            </p>
            <nav
                v-if="navigation?.length"
                class="sticky top-4 z-10 rounded-2xl border border-white/70 bg-white/75 p-3 shadow-lg backdrop-blur"
            >
                <div class="flex flex-wrap gap-3">
                    <RouterLink
                        v-for="item in navigation"
                        :key="item.to"
                        :to="item.to"
                        class="rounded-full px-4 py-2 text-sm font-medium transition"
                        :class="currentPath === item.to ? 'bg-text text-white' : 'bg-background text-text hover:bg-white'"
                    >
                        {{ item.label }}
                    </RouterLink>
                </div>
            </nav>
            <slot />
        </main>
    </div>
</template>
