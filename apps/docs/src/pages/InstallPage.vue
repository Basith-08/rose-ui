<script setup lang="ts">
import { ref } from 'vue'

import { Accordion, Badge, Card, Input, Switch } from '@kagami.b/rose-ui'
import CodeSample from '../components/CodeSample.vue'
import DocsSection from '../components/DocsSection.vue'
import { installCommand, setupItems, tailwindSnippet } from '../content'

const email = ref('design@rose-ui.dev')
const compactMode = ref(false)
const accordionValue = ref<string | null>('tailwind')
</script>

<template>
    <DocsSection
        id="install"
        eyebrow="Getting started"
        title="Install checklist"
        description="Practical guidance for wiring Rose UI into an app."
    >
        <div class="grid gap-6 lg:grid-cols-2">
            <Card class="space-y-5">
                <Accordion v-model="accordionValue" :items="setupItems" />
                <CodeSample title="Install packages" :code="installCommand" />
                <CodeSample title="Tailwind config" :code="tailwindSnippet" />
            </Card>

            <Card class="space-y-5">
                <p class="text-sm font-semibold text-text">
                    Interactive example
                </p>
                <Input
                    id="docs-email"
                    v-model="email"
                    label="Team contact"
                    hint="This field proves typed consumer integration."
                />

                <Switch
                    v-model="compactMode"
                    label="Compact preview mode"
                    description="Toggles a simple boolean state through the published Switch component."
                />

                <div class="flex flex-wrap items-center gap-3">
                    <Badge :variant="compactMode ? 'secondary' : 'outline'">
                        {{ compactMode ? 'Compact mode on' : 'Standard layout' }}
                    </Badge>
                    <span class="text-sm text-slate-500">
                        Contact: {{ email }}
                    </span>
                </div>
            </Card>
        </div>
    </DocsSection>
</template>
