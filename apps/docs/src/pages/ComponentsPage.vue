<script setup lang="ts">
import { ref } from 'vue'

import {
    Alert,
    Badge,
    Button,
    Spinner,
    Toast,
    Tooltip,
} from '@rose/ui'
import ComponentCard from '../components/ComponentCard.vue'
import DocsSection from '../components/DocsSection.vue'

const toastOpen = ref(false)

function openToast() {
    toastOpen.value = true
}
</script>

<template>
    <DocsSection
        id="components"
        eyebrow="Catalog"
        title="Component snapshots"
        description="A compact catalog of common states for visual review and docs authoring."
    >
        <div class="grid gap-6 xl:grid-cols-3">
            <ComponentCard
                title="Actions"
                description="Primary and alternative action styles from the published package."
            >
                <div class="flex flex-wrap gap-3">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                </div>
            </ComponentCard>

            <ComponentCard
                title="Feedback"
                description="Alert, tooltip, and toast interactions inside the docs shell."
            >
                <div class="space-y-3">
                    <Alert title="Success state" variant="success">
                        This alert uses the published library styles.
                    </Alert>
                    <div class="flex items-center gap-3">
                        <Tooltip text="Tooltip preview from docs app.">
                            <Button variant="outline" size="sm">
                                Hover me
                            </Button>
                        </Tooltip>
                        <Button size="sm" @click="openToast">
                            Show toast
                        </Button>
                    </div>
                </div>
            </ComponentCard>

            <ComponentCard
                title="Status"
                description="Compact examples for badges and loading indicators."
            >
                <div class="flex flex-wrap items-center gap-3">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="sage">Sage</Badge>
                    <Spinner />
                </div>
            </ComponentCard>
        </div>

        <Toast
            v-model="toastOpen"
            title="Docs preview"
            message="Toast interaction is working inside the docs app."
            variant="info"
        />
    </DocsSection>
</template>
