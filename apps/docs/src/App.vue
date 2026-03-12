<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import { Badge, Button, Modal } from '@basith-08/rose-ui'
import DocsShell from './components/DocsShell.vue'
import { docsNavigation } from './router'

const modalOpen = ref(false)
const route = useRoute()
const currentPath = computed(() => route.path)
</script>

<template>
    <DocsShell
        title="Docs Preview"
        subtitle="This app gives the workspace a stable place to document setup, preview components, and validate the package contract with the same imports external consumers will use."
        :navigation="docsNavigation"
        :current-path="currentPath"
    >
        <template #header-actions>
            <div class="flex items-center gap-3">
                <Badge variant="sage" size="md">
                    Tailwind-first
                </Badge>
                <Button size="sm" @click="modalOpen = true">
                    Open docs modal
                </Button>
            </div>
        </template>

        <RouterView />

        <Modal
            v-model="modalOpen"
            title="Rose UI install guidance"
            description="Use this dialog to demonstrate modal semantics inside the docs shell."
        >
            <div class="space-y-4">
                <p class="text-sm leading-6 text-slate-600">
                    Install `@basith-08/rose-ui`, `@basith-08/tokens`, and `vue`, then extend your Tailwind setup with the Rose token values so component utility classes resolve correctly.
                </p>
                <div class="flex gap-3">
                    <Button @click="modalOpen = false">
                        Close docs modal
                    </Button>
                    <Button variant="outline" @click="modalOpen = false">
                        Keep browsing
                    </Button>
                </div>
            </div>
        </Modal>
    </DocsShell>
</template>
