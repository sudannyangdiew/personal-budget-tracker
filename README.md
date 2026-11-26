# Sudan Nyang's SpendWise — Personal Budget Tracker

## Project Title
Sudan Nyang's SpendWise

## Project Description

Sudan Nyang's SpendWise is an interactive personal budget and expense tracker built across an 8-week web development progression. It lets Sudan Nyang set a monthly budget, log expenses across categories (`Food`, `Transport`, `Rent`, `Entertainment`, `Savings`, `Utilities`, and `Other`), filter records, delete items, view category budget progress cards, and track remaining balance and budget health status in real time.

## Technologies Used

- **HTML5**: Semantic structure (`<header>`, `<aside>`, `<main>`, `<section>`, `<form>`, `<table>`, `<details>`) and multimedia embeds.
- **CSS3**: CSS custom properties (`:root` and `@media (prefers-color-scheme: dark)`), CSS Grid dashboard layout, Flexbox components, responsive media queries, and card transitions.
- **JavaScript (ES6+)**: State arrays, loops, conditional budget evaluation, event listeners, and dynamic DOM rendering.
- **Git & GitHub**: Version control and public code hosting.
- **Netlify**: Static site hosting and continuous deployment from GitHub.

## GitHub Repository Information

- **Repository Owner**: Sudan Nyang (`sudannyangdiew`)
- **Repository URL**: https://github.com/sudannyangdiew/personal-budget-tracker
- **Main Branch**: `main`

## Live Netlify Website URL

- **Live Site**: [https://sudan-nyang-spendwise.netlify.app](https://sudannyangpersonalbudgettracker.netlify.app/)

## Deployment Process Summary

1. Verified that `index.html`, `style.css`, `script.js`, and `README.md` sit together in the root of `personal-budget-tracker` using relative paths.
2. Committed the project files and pushed them to `https://github.com/sudannyangdiew/personal-budget-tracker`.
3. Connected the `personal-budget-tracker` repository to Netlify (`Add new site -> Import an existing project`) with no build command and root publish directory (`.`).
4. Renamed the generated Netlify subdomain to a project-specific name (`sudan-nyang-spendwise`).
5. Pushed a follow-up update to `main` and confirmed Netlify automatically built and published the new deployment.
6. Tested the live Netlify site across desktop and mobile viewports to verify styles, scripts, and interactive expense/budget updates.

## Challenges Encountered During Deployment

- **Verifying relative paths and case sensitivity**: Web servers are stricter than local file browsing about exact file names and relative paths (`style.css`, `script.js`). Checking file names and paths at the repository root prevented missing-asset `404` errors.
- **Confirming automatic deploy timing**: After pushing changes to GitHub, the live site takes a few seconds to rebuild—monitoring the Netlify **Deploys** tab confirmed the deploy reached **Published** before verifying the live change.

## Lessons Learned

- Keeping static front-end files cleanly organized at the repository root makes GitHub-to-Netlify deployment straightforward and predictable.
- Connecting GitHub to Netlify creates a continuous deployment pipeline where every push to `main` automatically updates the live website.
- Testing on the live hosted URL ensures all assets, responsive layouts, and JavaScript interactions work reliably for end users.
