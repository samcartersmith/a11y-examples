# A11y Examples

Accessibility examples using [Coinbase Design System](https://github.com/coinbase/cds) (CDS). This repo hosts a standalone demo that can be deployed to GitHub Pages without internal engineering infrastructure.

## Local development

```bash
# Install dependencies
npm install
# or: yarn install

# Start dev server
npm run dev
# or: yarn dev
```

## Build

```bash
npm run build
# or: yarn build
```

## Deploy to GitHub Pages

1. Create a new repo on GitHub named `a11y-examples`
2. Push this code to the `main` branch
3. In the repo **Settings → Pages**, set **Source** to "GitHub Actions"
4. The workflow will build and deploy on every push to `main`

The site will be available at `https://<username>.github.io/a11y-examples/`

## Contents

- Accessible form patterns (labels, focus management, keyboard support)
- CDS controls: SearchInput, TextInput, Checkbox, Button
- Light/dark theme toggle
