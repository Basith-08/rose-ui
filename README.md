# Rose UI

Rose UI is a Vue 3 design system workspace for reusable application interfaces. It includes a publishable component library, a runtime token package, and local docs/playground apps so you can build and validate the library in real consumer environments.

Repository: `https://github.com/Basith-08/rose-ui`

## Packages

- `@rose/ui`: Vue 3 component library with a Tailwind-first styling contract
- `@rose/tokens`: runtime design tokens for colors, spacing, radius, shadows, motion, and z-index
- `@rose/config`: private workspace config package for internal development tooling

## Quick Start

```bash
pnpm install
pnpm check
```

Useful commands:

- `pnpm dev:docs`: run the docs app
- `pnpm dev:playground`: run the playground app
- `pnpm build`: build `@rose/tokens` and `@rose/ui`
- `pnpm build:apps`: build the consumer apps
- `pnpm pack:local`: create local tarballs for `@rose/ui` and `@rose/tokens`
- `pnpm verify:consumer`: simulate installing the packed libraries in a temporary external project

## Usage

### Install in another project

Generate local tarballs from this repo:

```bash
pnpm pack:local
```

Install them in your personal project:

```bash
pnpm add /path/to/rose-ui/.local-packages/rose-tokens-1.0.0.tgz
pnpm add /path/to/rose-ui/.local-packages/rose-ui-0.0.0.tgz
pnpm add vue
pnpm add -D tailwindcss postcss autoprefixer
```

### Configure Tailwind

```ts
import type { Config } from 'tailwindcss'
import { colors, radius, shadows } from '@rose/tokens'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,ts,tsx}',
    './node_modules/@rose/ui/dist/**/*.{js,mjs}'
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accentDark,
        background: colors.background,
        text: colors.text,
        border: colors.border,
        sage: colors.sage
      },
      borderRadius: radius,
      boxShadow: shadows
    }
  }
} satisfies Config
```

### Import components

```vue
<script setup lang="ts">
import { Button, Input, Modal } from '@rose/ui'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div class="space-y-4">
    <Input label="Email" placeholder="you@example.com" />
    <Button @click="open = true">
      Open modal
    </Button>

    <Modal
      v-model="open"
      title="Hello from Rose UI"
      description="This component is rendered from your personal project."
    >
      <p class="text-sm text-slate-600">
        Rose UI is working correctly.
      </p>
    </Modal>
  </div>
</template>
```

## Development and Detailed Setup

For the full A-to-Z setup, local development flow, consumer testing steps, and release workflow, see [CONTRIBUTING.md](/home/junichirou/Documents/code/rose-ui/CONTRIBUTING.md).
