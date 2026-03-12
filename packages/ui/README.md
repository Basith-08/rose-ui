# @basith-08/rose-ui

`@basith-08/rose-ui` is a publishable Vue 3 component library built with a Tailwind-first styling contract.

## Installation

```bash
pnpm add @basith-08/rose-ui vue @basith-08/tokens
pnpm add -D tailwindcss postcss autoprefixer
```

## Tailwind-first Setup

Rose UI components rely on Tailwind utility classes. External consumers should extend their Tailwind theme with Rose tokens:

```ts
import type { Config } from "tailwindcss";
import { colors, radius, shadows } from "@basith-08/tokens";

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,ts,tsx}",
    "./node_modules/@basith-08/rose-ui/dist/**/*.{js,mjs}"
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
} satisfies Config;
```

Use a standard PostCSS setup with `tailwindcss` and `autoprefixer`.

If you are trying the package before publishing to npm, generate a tarball from the monorepo with `pnpm pack:local` and install the resulting `.tgz` file in your app.

## Usage

```vue
<script setup lang="ts">
import { Button, Input } from "@basith-08/rose-ui";
</script>

<template>
  <div class="space-y-4">
    <Input label="Email" placeholder="you@example.com" />
    <Button>Submit</Button>
  </div>
</template>
```

## Notes

- `vue` is a peer dependency and must be provided by the consuming app.
- The package ships ESM and TypeScript declarations from `dist/`.
- Internal workspace apps may still reuse `@basith-08/config`, but external consumers should rely only on `@basith-08/rose-ui`, `@basith-08/tokens`, and standard Tailwind config.
