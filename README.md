# Rush Connect

Website and owner portal for Evelyn Rush Solutions, built by Team Alpha for the
CSC480 capstone.

- **Stack:** Next.js (App Router, TypeScript, Tailwind), Supabase (database,
  auth, file storage), Vercel (hosting)
- **Board:** GitHub Projects for this repo
- **Chat:** Team Alpha Discord

## Getting set up

You need [Node.js](https://nodejs.org) 20 or newer (the LTS download is fine)
and git.

1. Clone the repo and install packages:

   ```bash
   git clone https://github.com/AskTheBoomer/RushConnect.git
   cd RushConnect
   npm install
   ```

2. Create your local environment file:

   ```bash
   cp .env.example .env.local
   ```

   Fill in the two Supabase values. Bryan will share them privately; they are
   also in Supabase under **Project Settings → API Keys**. `.env.local` is
   ignored by git, so it never gets committed. Never paste keys into code,
   commits, or Discord.

3. Start the dev server:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000. Pages reload as you save.

## Useful commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Runs the site locally |
| `npm run lint` | Checks code style and common mistakes |
| `npm run typecheck` | Checks TypeScript types |
| `npm run build` | Builds the site the same way Vercel does |

Run lint, typecheck and build before opening a pull request. The same checks
run automatically on every pull request.

## How we work: branches and pull requests

`main` is protected. Nobody pushes to it directly; all work goes through a
pull request.

1. Start from an up-to-date `main`:

   ```bash
   git checkout main
   git pull
   ```

2. Create a branch named for the work:

   ```bash
   git checkout -b feature/services-page
   ```

   Prefixes: `feature/` for new work, `fix/` for bug fixes, `docs/` for
   documentation, `test/` for tests.

3. Commit as you go with short messages that say what changed, then push:

   ```bash
   git add .
   git commit -m "Add services page layout"
   git push -u origin feature/services-page
   ```

4. Open a pull request on GitHub into `main`. In the description, say what
   changed and how to check it, and link the issue from the board.

5. Wait for the **CI** check to pass. Vercel also posts a preview link on the
   pull request, so you can see your change live before it merges.

6. Merge once the check is green, then delete the branch.

If `main` changed while you were working, run `git pull origin main` on your
branch, fix any conflicts, and push again.

## Database (Supabase)

The schema and access rules live in `supabase/migrations/`, and placeholder
data in `supabase/seed.sql`. To set up a fresh Supabase project, run them in
order in **SQL Editor -> New query**: the migration first, then the seed.

Access rules in short: visitors can read services, business info, page text,
photos and published reviews. They can submit inquiries and reviews but can
never read inquiries or unpublished reviews. Only the owner account can change
anything.

To confirm the rules hold, run:

```bash
npm run check:access
```

Every line should say PASS.

## Project layout

```
src/app/        pages and routes (each folder is a URL)
supabase/       database schema, access rules and seed data
scripts/        helper scripts (access check)
public/         static files such as images
.github/        automated checks (CI)
```

## Environments

| Where | Branch | URL |
| --- | --- | --- |
| Production | `main` | Vercel production URL |
| Preview | any pull request | link posted on the pull request |
| Local | your branch | http://localhost:3000 |
