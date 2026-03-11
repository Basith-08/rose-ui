# Contributing to Rose UI

This document covers the local development flow for the Rose UI monorepo.

## Workspace Setup

### A. Clone the repository

```bash
git clone https://github.com/Basith-08/rose-ui.git
cd rose-ui
```

### B. Install dependencies

```bash
pnpm install
```

### C. Verify the workspace

```bash
pnpm check
```

This command runs linting, package builds, app builds, tests, and smoke checks.

## Local Development

### D. Explore the local apps

Run the docs app:

```bash
pnpm dev:docs
```

Run the playground app:

```bash
pnpm dev:playground
```

Use these apps to preview components, check interactions, and validate styling changes.

### E. Build the publishable packages

```bash
pnpm build
```

This builds:

- `@rose/tokens`
- `@rose/ui`

## Trying the Library in Another Project

### F. Create local tarballs

```bash
pnpm pack:local
```

This generates local installable files in:

```bash
.local-packages/
```

### G. Create or open your personal project

Example:

```bash
mkdir my-vue-app
cd my-vue-app
pnpm init
```

### H. Install the Rose UI packages into your personal project

```bash
pnpm add /path/to/rose-ui/.local-packages/rose-tokens-1.0.0.tgz
pnpm add /path/to/rose-ui/.local-packages/rose-ui-0.0.0.tgz
pnpm add vue
pnpm add -D tailwindcss postcss autoprefixer
```

### I. Configure Tailwind

Example `tailwind.config.ts`:

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

### J. Configure PostCSS

Example `postcss.config.cjs`:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### K. Import Tailwind styles

Example `src/style.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### L. Start using the components

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

### M. Verify external consumption

Back in this monorepo, run:

```bash
pnpm verify:consumer
```

That command simulates installing the packed libraries into a temporary project outside the monorepo.

## Shipping Changes

### N. Update the library during development

When you change components or tokens:

```bash
pnpm build
pnpm pack:local
```

Then reinstall or update the tarballs in your personal project.

### O. Push the monorepo to GitHub

```bash
git add .
git commit -m "feat: initialize rose-ui monorepo"
git push -u origin main
```

### P. Optional release workflow

If later you want to version and publish packages formally:

```bash
pnpm changeset
pnpm version-packages
pnpm release
```
