<script setup lang="ts">
import { computed } from 'vue'

import { colors } from '@kagami.b/tokens'
import { Box } from '@kagami.b/rose-ui'
import DocsSection from '../components/DocsSection.vue'

const colorEntries = computed(() => Object.entries(colors))
</script>

<template>
    <DocsSection
        id="tokens"
        eyebrow="Foundation"
        title="Token preview"
        description="The docs app can also present the token layer that feeds the Tailwind preset."
    >
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Box
                v-for="[name, value] in colorEntries"
                :key="name"
                class="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm"
            >
                <div class="mb-3 h-16 rounded-xl border border-slate-200" :style="{ backgroundColor: value }" />
                <p class="text-sm font-semibold capitalize text-text">
                    {{ name }}
                </p>
                <p class="text-xs uppercase tracking-[0.18em] text-slate-500">
                    {{ value }}
                </p>
            </Box>
        </div>
    </DocsSection>
</template>
