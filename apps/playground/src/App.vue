<script setup lang="ts">
import { ref } from 'vue'

import {
    Accordion,
    Alert,
    Badge,
    Button,
    Card,
    Input,
    Modal,
    Toast,
    Tooltip,
    Switch,
} from '@kagami.b/rose-ui'

const email = ref('')
const notifications = ref(true)
const modalOpen = ref(false)
const activeFaq = ref<string | null>('publishing')
const toastOpen = ref(false)
const toastCount = ref(0)

const faqItems = [
    {
        title: 'How should I consume Rose UI?',
        value: 'publishing',
        content: 'Use the published packages, include the Tailwind preset, and let your app provide Vue as a peer dependency.',
    },
    {
        title: 'What is this app for?',
        value: 'playground',
        content: 'This playground is a local consumer app for quick manual QA, interaction checks, and styling validation.',
    },
]

function launchToast() {
    toastCount.value += 1
    toastOpen.value = true
}
</script>

<template>
    <main class="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10">
        <section class="grid gap-6 rounded-[2rem] border border-white/70 bg-white/75 p-8 shadow-xl backdrop-blur md:grid-cols-[1.4fr_0.8fr]">
            <div class="space-y-5">
                <Badge variant="outline" size="md">
                    Local consumer app
                </Badge>
                <div class="space-y-3">
                    <h1 class="text-4xl font-semibold tracking-tight text-text">
                        Rose UI Playground
                    </h1>
                    <p class="max-w-2xl text-base leading-7 text-slate-600">
                        A focused sandbox to verify publishable package output, Tailwind styling, and component interactions as a real consuming app.
                    </p>
                </div>
                <div class="flex flex-wrap gap-3">
                    <Button @click="modalOpen = true">
                        Open modal flow
                    </Button>
                    <Button variant="secondary">
                        Secondary action
                    </Button>
                    <Button variant="ghost">
                        Quiet action
                    </Button>
                </div>
            </div>
            <Card class="space-y-4 bg-text text-white">
                <p class="text-sm uppercase tracking-[0.24em] text-white/70">
                    Manual QA ideas
                </p>
                <ul class="space-y-3 text-sm leading-6 text-white/85">
                    <li>Check focus handling inside the modal.</li>
                    <li>Inspect component states after token changes.</li>
                    <li>Validate the Tailwind preset in a real app shell.</li>
                </ul>
            </Card>
        </section>

        <section class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card class="space-y-5">
                <div class="space-y-2">
                    <h2 class="text-2xl font-semibold">
                        Integration form
                    </h2>
                    <p class="text-sm text-slate-500">
                        Smoke test basic input, switch, alert, and action controls together.
                    </p>
                </div>

                <Alert title="Workspace package build" variant="success">
                    The playground consumes the local `@kagami.b/rose-ui` and `@kagami.b/tokens` packages.
                </Alert>

                <div class="space-y-4">
                    <Input
                        id="playground-email"
                        v-model="email"
                        label="Release contact"
                        hint="Try editing this field to validate two-way binding."
                        placeholder="team@rose-ui.dev"
                    />

                    <Switch
                        v-model="notifications"
                        label="Notify maintainers on release"
                        description="Useful for testing controlled boolean state."
                    />
                </div>

                <div class="flex flex-wrap items-center gap-3">
                    <Badge :variant="notifications ? 'sage' : 'outline'">
                        {{ notifications ? 'Notifications enabled' : 'Notifications paused' }}
                    </Badge>
                    <span class="text-sm text-slate-500">
                        Current email: {{ email || 'not set yet' }}
                    </span>
                </div>
            </Card>

            <Card class="space-y-5">
                <div class="space-y-2">
                    <h2 class="text-2xl font-semibold">
                        FAQ
                    </h2>
                    <p class="text-sm text-slate-500">
                        Quick accordion smoke test inside the app shell.
                    </p>
                </div>

                <Accordion
                    v-model="activeFaq"
                    :items="faqItems"
                />
            </Card>
        </section>

        <section class="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Card class="space-y-5">
                <div class="space-y-2">
                    <h2 class="text-2xl font-semibold">
                        Feedback states
                    </h2>
                    <p class="text-sm text-slate-500">
                        Quick manual checks for tooltip and toast behavior in a consumer app.
                    </p>
                </div>

                <div class="flex flex-wrap items-center gap-4">
                    <Tooltip text="This uses the published Tooltip component." side="bottom">
                        <Button variant="outline">
                            Hover for tooltip
                        </Button>
                    </Tooltip>

                    <Button @click="launchToast">
                        Trigger toast
                    </Button>
                </div>

                <Toast
                    v-model="toastOpen"
                    variant="success"
                    title="Playground event"
                    :message="`Toast fired ${toastCount} time${toastCount === 1 ? '' : 's'}.`"
                />
            </Card>

            <Card class="space-y-5">
                <div class="space-y-2">
                    <h2 class="text-2xl font-semibold">
                        QA checklist
                    </h2>
                    <p class="text-sm text-slate-500">
                        A few repeatable tasks that make this playground useful during component work.
                    </p>
                </div>

                <div class="grid gap-3 sm:grid-cols-2">
                    <div class="rounded-2xl border border-border bg-background/60 p-4">
                        <p class="text-sm font-semibold text-text">
                            Visual regression
                        </p>
                        <p class="mt-2 text-sm leading-6 text-slate-500">
                            Inspect buttons, badges, and cards after token or Tailwind preset changes.
                        </p>
                    </div>
                    <div class="rounded-2xl border border-border bg-background/60 p-4">
                        <p class="text-sm font-semibold text-text">
                            Interactive states
                        </p>
                        <p class="mt-2 text-sm leading-6 text-slate-500">
                            Verify controlled inputs, switches, tooltip hover, toast timeout, and modal focus behavior.
                        </p>
                    </div>
                    <div class="rounded-2xl border border-border bg-background/60 p-4">
                        <p class="text-sm font-semibold text-text">
                            Packaging confidence
                        </p>
                        <p class="mt-2 text-sm leading-6 text-slate-500">
                            Confirm the app still works while consuming the built workspace packages.
                        </p>
                    </div>
                    <div class="rounded-2xl border border-border bg-background/60 p-4">
                        <p class="text-sm font-semibold text-text">
                            Accessibility pass
                        </p>
                        <p class="mt-2 text-sm leading-6 text-slate-500">
                            Tab through components and check keyboard support for dialog and switch controls.
                        </p>
                    </div>
                </div>
            </Card>
        </section>

        <Modal
            v-model="modalOpen"
            title="Ship a release"
            description="This modal is mounted from the consumer app to verify accessibility and publishable package behavior."
        >
            <div class="space-y-4">
                <p class="text-sm leading-6 text-slate-600">
                    If this dialog opens, traps focus on the close control first, and restores focus after close, the consumer-side modal contract is healthy.
                </p>
                <div class="flex gap-3">
                    <Button @click="modalOpen = false">
                        Confirm
                    </Button>
                    <Button variant="outline" @click="modalOpen = false">
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    </main>
</template>
