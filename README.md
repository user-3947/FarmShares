<div align="center">

# 🌾 FarmShares

**The cooperative farm & share ledger — fractional agri-asset ownership,
lease tracking and yield telemetry in one soft-UI portal.**

[![Version](https://img.shields.io/badge/version-1.2.1-3d7d46?style=for-the-badge&labelColor=2a3323)](#-versioning)
[![React](https://img.shields.io/badge/React-19-149eca?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-aa6bff?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Auth_%2B_RLS-3fcf8e?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)

![Build](https://img.shields.io/badge/build-tsc_%2B_vite_✓-84cc16?style=flat-square)
![Lint](https://img.shields.io/badge/lint-oxlint_0_errors-brightgreen?style=flat-square)
![Design](https://img.shields.io/badge/design-Neumorphic_Soft_UI-c2821f?style=flat-square)

</div>

---

## 📖 About

FarmShares is the member portal of an agricultural cooperative: investors track
capital deployments and dividends, landowners follow acreage, leases and
seasonal yield — all behind one Supabase-secured sign-in with a neumorphic
(soft-UI) light/dark interface.

## ✨ Features

| | Feature | Details |
|---|---|---|
| 🔐 | **Supabase Auth** | Email + password sign-in & sign-up, session restore on reload, clear errors for unconfirmed emails and role mismatches. |
| 🛡️ | **Trusted roles** | Authorization comes from the signed-in user's own `public.profiles.role` row (RLS-backed). The UI role pick is verified, never trusted. |
| 📊 | **Investor deck** | KPI tiles (capital, portfolio value, parcels, dividends) + a Recharts capital-vs-dividends ledger with 1M / 6M / 1Y horizons and one-click CSV export. |
| 🚜 | **Landowner deck** | Acreage, seasonal yield, active leases and payout stats. |
| 🔎 | **Live search** | The header search filters the Active Holdings rail in real time. |
| 🔔 | **Notifications** | Dropdown feed with a derived unread badge and "mark all as read". |
| 🌗 | **Light / dark theme** | A single `.dark` class re-skins the entire app; the choice persists in `localStorage`. |
| ⚡ | **Code splitting** | The dashboard is lazy-loaded into its own chunk — auth screens stay featherweight. |
| 📱 | **Responsive shell** | Fixed top bar + section sidebar collapse gracefully on small screens. |
| 🧱 | **Design system** | Tailwind v4 semantic tokens & custom `neu-*` neumorphic utilities defined once in `src/index.css`. |

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| UI framework | [React 19](https://react.dev) + React Compiler (babel preset) |
| Language | [TypeScript 6](https://www.typescriptlang.org) |
| Build tool | [Vite 8](https://vite.dev) (rolldown) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) — `@theme` tokens & `@utility` neumorphs |
| Icons | [lucide-react](https://lucide.dev) |
| Charts | [Recharts 3](https://recharts.org) |
| Backend | [Supabase](https://supabase.com) — Auth, Postgres, Row-Level Security |
| Quality gates | `tsc -b` strict build · oxlint |

## 📁 Project Structure

```
src/
├── components/            # Reusable cross-feature UI
│   ├── auth/              #   AuthShell · RoleSelector · PasswordField · TextField · FormAlert
│   └── ui/                #   BrandLogo · ThemeToggle · LiveStatusBadge
├── config/
│   └── app.ts             # App identity: version, taglines, status & legal strings
├── context/
│   └── AppContext.tsx     # Global state: theme · view · role · trusted profile
├── features/
│   ├── auth/
│   │   └── components/    #   SignInForm · SignUpForm
│   └── dashboard/
│       ├── dashboard.types.ts
│       ├── dashboard.data.ts    # Mocked domain data + derived helpers (CSV, palettes)
│       └── components/          # Header · Sidebar · Hero · LedgerChart ·
│                                # StatCard · InvestmentCard · HoldingsPanel · NotificationsMenu
├── lib/
│   ├── supabase.ts        # Env-configured Supabase client
│   ├── auth.ts            # sign-up / sign-in / own-profile (trusted role source)
│   ├── validation.ts      # Shared form validation
│   └── format.ts          # Display helpers (avatar monogram, …)
├── pages/                 # Slim composition roots
│   ├── LoginPage.tsx
│   ├── CreateAccount.tsx
│   └── Dashboard.tsx
├── index.css              # Soft-UI design system (tokens, dark mode, neu-* utilities)
├── App.tsx                # Providers · session bootstrap · lazy dashboard
└── main.tsx
```

## 🚀 Getting Started

**Prerequisites** — Node.js ≥ 20 and npm.

```bash
# 1 · install
cd Frontend
npm install

# 2 · configure Supabase credentials
cp .env.example .env    # then fill in the two variables below

# 3 · run
npm run dev             # start the dev server
```

| Environment variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL (*Settings → API*) |
| `VITE_SUPABASE_ANON_KEY` | Supabase public **anon** key |

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) + production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | oxlint over `src/` |

> 💡 Without real credentials the app still builds and renders, but auth
> actions fail fast with a pointer to `.env.example`.

## ☁️ Deployment

> ⚠️ **`VITE_*` variables are inlined at build time.** `.env` is git-ignored, so
> a build performed by your hosting platform (CI) never sees it — the shipped
> bundle renders, but auth fails at runtime with *"Supabase is not configured"*.

**Fix:** give the two variables to the **build environment**, then rebuild.

1. In your hosting dashboard (Vercel / Netlify / Cloudflare Pages / GitHub Actions…),
   add the **build environment variables**:

   | Name | Value |
   |---|---|
   | `VITE_SUPABASE_URL` | your Supabase project URL |
   | `VITE_SUPABASE_ANON_KEY` | your public **anon** key (never the service key) |

2. Point the platform at the app: **root directory** `Frontend/`,
   **build command** `npm run build`, **output directory** `dist`.
3. **Rebuild / redeploy** — variables only apply to builds created *after* they were set.

> 💡 The build now **fails loudly in the logs** if it is producing an
> unconfigured bundle (`🌾 Supabase credentials are missing from this build`),
> so CI mistakes are obvious. Alternatively, build locally with `.env` present
> and upload `dist/` yourself.

## 🔐 Security Model

- Sign-in / sign-up are **email + password only** — no separate username exists anywhere.
- The **only trusted source** for identity & role is the signed-in user's own
  `public.profiles` row (`id = auth.uid()`), fetched right after authentication.
- The role picked in the UI is **verified against that row** — mismatches are signed out immediately.
- `user_metadata` is never used for authorization (users can edit it themselves), and there is deliberately no public profile/email lookup endpoint.
- Credentials, keys or test accounts are **never displayed in the UI**.

## 🧾 Versioning

The version is single-sourced in [`package.json`](package.json) and
[`src/config/app.ts`](src/config/app.ts) (`APP_VERSION`) and rendered in every
page footer. Release history — what each **Major.Minor.Patch** delivered — is
documented concisely in [`devLog.md`](devLog.md). Current release: **1.2.1**.

---

<div align="center">

🌾 **FarmShares** — grown together, shared fairly.

</div>
