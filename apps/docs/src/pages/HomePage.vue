<script setup lang="ts">
import { Alert, Badge, Button, Card, Spinner } from '@rose/ui'
</script>

<template>
    <section class="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card class="space-y-5 rounded-[2rem] border-white/60 bg-white/80 shadow-xl">
            <div class="space-y-3">
                <p class="text-sm uppercase tracking-[0.24em] text-slate-500">
                    Overview
                </p>
                <h2 class="text-4xl font-semibold tracking-tight">
                    A docs app that behaves like a real consumer
                </h2>
                <p class="max-w-2xl text-base leading-7 text-slate-600">
                    Use this space to document installation, preview core components, and validate package output with the same imports external consumers will use.
                </p>
            </div>

            <Alert title="Recommended workflow" variant="info">
                Keep `apps/docs` for structured guidance and `apps/playground` for rapid manual QA.
            </Alert>

            <div class="flex flex-wrap gap-3">
                <RouterLink to="/install">
                    <Button>
                        Start installation
                    </Button>
                </RouterLink>
                <RouterLink to="/components">
                    <Button variant="outline">
                        Browse component examples
                    </Button>
                </RouterLink>
            </div>
        </Card>

        <Card class="space-y-4 bg-text text-white">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm uppercase tracking-[0.24em] text-white/60">
                        Status
                    </p>
                    <h3 class="mt-2 text-2xl font-semibold">
                        Local docs app ready
                    </h3>
                </div>
                <Spinner />
            </div>
            <p class="text-sm leading-6 text-white/80">
                The docs app consumes the built library packages directly, which makes it useful as a consumer-focused smoke environment.
            </p>
            <div class="flex flex-wrap gap-3">
                <Badge variant="sage" size="md">
                    Tailwind-first
                </Badge>
                <Badge variant="outline" size="md">
                    Vue 3
                </Badge>
            </div>
        </Card>
    </section>

    <section class="grid gap-6 xl:grid-cols-3">
        <Card class="space-y-3">
            <p class="text-sm font-semibold text-text">
                1. Install
            </p>
            <p class="text-sm leading-6 text-slate-500">
                Add `@rose/ui`, `@rose/tokens`, and provide `vue` from your host app.
            </p>
        </Card>

        <Card class="space-y-3">
            <p class="text-sm font-semibold text-text">
                2. Configure Tailwind
            </p>
            <p class="text-sm leading-6 text-slate-500">
                Extend your theme using the Rose preset or token values so component classes resolve correctly.
            </p>
        </Card>

        <Card class="space-y-3">
            <p class="text-sm font-semibold text-text">
                3. Verify locally
            </p>
            <p class="text-sm leading-6 text-slate-500">
                Use this docs app and the playground app to inspect behavior, states, and package integration.
            </p>
        </Card>
    </section>
</template>
