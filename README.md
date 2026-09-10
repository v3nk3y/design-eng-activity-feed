# Technical Round: Improve the Activity Feed

**Stack:** React + TypeScript, any CSS approach

## Context

You are joining a small fintech product team. This project contains a minimal account dashboard with a **transaction activity feed** that is headed to production, but it is not ready yet.

Your task is to improve the `ActivityFeed` component (and related code as needed) so it feels like a real product surface.

## Quick start

Unzip the project, initialize a git repository, and make an initial commit before you start:

```bash
unzip design-eng-activity-feed.zip
cd design-eng-activity-feed
git init
git add -A
git commit -m "Initial commit"
```

Committing the starting point first (and committing as you go) makes it easy for us to see exactly what you changed. When you're done, you'll push this repo to GitHub (or a similar host) and share it with us — see [At the end](#at-the-end).

Requires **Node.js 20.19+** or **22.12+** (Vite 8).

This project includes an [`.nvmrc`](.nvmrc) pinned to **v20.19**. If you use [nvm](https://github.com/nvm-sh/nvm), install and select that version from the project root:

```bash
nvm install   # reads .nvmrc
nvm use       # switches to the version in .nvmrc
```

Then:

```bash
npm install
npm run dev
```

Other Node version managers (fnm, asdf, volta, etc.) can also read `.nvmrc`. Use whatever you already have installed.

Open [http://localhost:5173](http://localhost:5173).

Use the **Dev state** toolbar at the top to switch between default, empty, loading, error, and large (~1k rows) views. The URL updates as well (`?state=empty`, etc.) so you can bookmark or share a scenario. In **Default** or **Empty**, use **Add** / **Remove last** to mutate the list while testing.

### Note on app states

`App.tsx` already handles top-level loading/error via URL query params (`?state=loading`, `?state=error`). You may refactor how loading/error are handled if you have a strong reason, but they are not a required focus for this exercise.

## Requirements

### 1. Improve how the feed communicates information

The current feed doesn’t do a good job of communicating transaction information. Improve it as if you were the engineer responsible for getting this to the finish line.

You can focus on any area you think matters most, for example styling, visual hierarchy, affordances, accessibility, and/or responsiveness. **How** you prioritize within this requirement is up to you.

### 2. Add a transaction detail view

The full transaction data model in `src/types/transaction.ts` includes properties that are **not** surfaced in the feed today (e.g. source/destination accounts, payment method, reference number, timestamps, memo).

Add a way for users to view those additional details. Choose whatever pattern fits best: modal, drawer, separate panel, route, etc.

The detail view should also let the user **dispute a transaction**. You do not need to build out the full dispute flow, a clearly placed CTA (button or link) is enough.

## Prioritization

Beyond the two requirements above, **what you work on is up to you**. We are interested in your judgment: what you chose to fix first, what you deprioritized, and why.

Be prepared to speak to the areas you intentionally omitted from the scope of this work.

Keep in mind how another engineer might need to collaborate with you on this project. You should be aware of how you structure components to create a smooth developer experience.

## Dependencies & tooling

You may install additional packages if they help you work faster or achieve a better result. Common choices include **Tailwind CSS** for styling and a motion library (e.g. **Framer Motion**) for transitions and interaction polish, but use whatever you prefer.

**Design judgment is part of what we evaluate.** If you reach for a component library, we prefer **headless** options (e.g. Radix UI, React Aria, Headless UI) where you supply the styling and visual design yourself. Heavily pre-styled libraries that do most of the design work for you are a weaker signal for this exercise.

## Files to focus on

- `src/components/ActivityFeed/ActivityFeed.tsx`
- `src/components/ActivityFeed/ActivityFeed.css`
- `src/types/transaction.ts`
- `src/data/transactions.ts` (sample data)

You may add new components or files as needed.

## At the end

Walk us through:

1. What you changed and why
2. **What you intentionally did not change** — and how you prioritized your time
3. Tradeoffs you made along the way
4. What you would do with more time

When you're done, push your repo to GitHub (or a similar host) and share the link with us — a public repo is fine, or a private one with us invited as collaborators. Include a short written walkthrough covering the points above, either as a `WALKTHROUGH.md` in the repo or in the repo's README/description. Spend **no more than 3–4 hours** — we care more about judgment and craft than checking every box.
