# Stratis

## Requirements

Install [Node.js](https://nodejs.org/en) and ensure that the `npm` command is available to your command line, for example by running `npm --version`.

## Languages and Frameworks

This project is built with:

- **Vue 3** (Composition API) to build composable and reusable UI components.
- **TypeScript** for static type checking.
- **Vite** for assembling the web page and have live previews during development.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) with the [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar), **ESLint** and **Prettier** extensions.

## Project Setup

Clone the repository and `cd` into its root directory.

```sh
git clone https://github.com/HAROS-framework/stratis.git
cd stratis
```

Then, install missing dependencies.

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

Follow the instructions on your terminal. It should provide a `localhost` link to preview the web application.

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

The output should be placed under a `dist` directory (newly created if it was not there previously).

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
