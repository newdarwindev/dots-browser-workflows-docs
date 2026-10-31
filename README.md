# Public documentation site

Only newly authored public marketing and architecture summary belongs in this repository. Do not copy the private implementation source, profiles, credentials, test logs or artifacts here.

The public site is at https://newdarwindev.github.io/dots-browser-workflows-docs/. The page is static HTML with a small React/Motion architecture diagram island; without JavaScript, a readable architecture list remains. The existing `#principles` link is preserved. Storybook builds as a component check but is not published.

Run `npm ci`, `npm run lint`, `npm test`, `npm run build-storybook`, and `npm run build` locally. On the connected Mac, `npm run test:browser` uses the installed system Chrome to check scroll changes, mobile width, reduced motion, repeated navigation and the no-JS fallback. GitHub Pages runs lint, component tests, Storybook build and Vite build on standard public runners, then publishes only `dist/`. No cross-repository credential is used.
