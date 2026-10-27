# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. If the repository contains this project inside an `ev-charge-finder` folder, set **Root Directory** to `ev-charge-finder`. If the repository root is this project, leave the root directory as `.`.
4. Use the Vite defaults: build command `npm run build` and output directory `dist`.
5. Select **Deploy**.

The Vercel rewrite in `vercel.json` lets React Router routes such as `/station/:id` load directly. Vercel serves the app over HTTPS, which is required for browser geolocation outside localhost.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
