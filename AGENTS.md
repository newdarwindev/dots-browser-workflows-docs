# Repository guidance

- This repository contains only public, newly authored documentation and synthetic architecture diagrams. Keep private implementation source, credentials, cookies, browser profiles, internal screenshots and test logs out.
- Preserve existing visual style and anchor URLs, especially `#principles`.
- Before publishing, run `npm run lint`, `npm test`, `npm run build-storybook`, `npm run build`, and `npm run test:browser` where system Chrome is available. Report which checks actually ran.
- Keep reduced-motion, keyboard and narrow-screen behavior usable. The static fallback must remain readable without JavaScript.
- Distinguish locally tested components from planned architecture. Do not imply production security or real-account results from synthetic tests.
