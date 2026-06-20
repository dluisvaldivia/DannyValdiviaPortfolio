# DVPortfolio — Claude Context

## Owner
Danny Valdivia — Frontend/UX developer. Portfolio deployed to GitHub Pages at `https://dluisvaldivia.github.io/DVPortfolio`.

## Stack
- React 18 + TypeScript + Vite
- Tailwind CSS v4 (via `@tailwindcss/vite` plugin — NO `tailwind.config.ts`, config lives in `src/index.css` under `@theme`)
- framer-motion v12 for animations
- react-router-dom v7 (hash-based SPA routing for GH Pages)
- i18next (EN/ES translations inline in `src/i18n.ts`)
- react-icons, react-circle-flags
- **Tiptap** (`@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link`, `@tiptap/extension-image`, `@tiptap/extension-placeholder`) — WYSIWYG blog editor
- **@emailjs/browser** — client-side email sending for contact form (no backend needed)

## Design System
- **Colors:** White, Emerald `#00674F` (main/accent), Neon Blue `#2222F7` (accent highlight)
- **Aesthetic:** Metallic premium modern — dark base (`#0a0a0f`), glassmorphism cards, subtle gradients, framer-motion entrance animations
- CSS variables defined in `src/index.css` under `:root` and `[data-theme="dark"]`
- Tailwind custom tokens: `--color-bg`, `--color-primary`, `--color-secondary`, `--color-text`, `--color-accent`

## Routes
| Path | Component |
|------|-----------|
| `/` | `Home.tsx` |
| `/rates` | `Rates.tsx` |
| `/free-tools/accessibility-checker` | `AccessibilityChecker.tsx` |
| `/blog` | `Blog.tsx` — public listing (not in navbar) |
| `/blog/:slug` | `BlogPost.tsx` — public post detail |
| `/admin` | `AdminLogin.tsx` — hardcoded creds from `.env` |
| `/admin/dashboard` | `AdminDashboard.tsx` — protected |
| `/admin/post/new` | `PostEditor.tsx` — protected |
| `/admin/post/:slug` | `PostEditor.tsx` (edit mode) — protected |
| `*` | `NotFound.tsx` (redirects to `/`) |

## Key Files
- `src/index.css` — global CSS, Tailwind theme tokens, all component classes (includes `.blog-content`, `.tiptap-editor`, `.editor-toolbar`)
- `src/i18n.ts` — all EN/ES strings (no external files)
- `src/models/cardsData.ts` — project cards data
- `src/models/blogData.ts` — `BlogPost` interface + static seed posts
- `src/controllers/themeController.ts` — light/dark theme via `data-theme` on `<html>`
- `src/controllers/authController.ts` — admin login/logout/isAuthenticated via sessionStorage + `.env` creds
- `src/controllers/blogController.ts` — blog CRUD (localStorage), `slugify()`, `estimateReadTime()`, `getAllPosts()`
- `src/view/components/Navbar.tsx` — sticky nav, language toggle, smooth scroll
- `src/view/components/PrivateRoute.tsx` — redirects to `/admin` if not authenticated
- `src/view/components/admin/RichEditor.tsx` — Tiptap WYSIWYG wrapper
- `src/view/components/admin/Toolbar.tsx` — formatting toolbar (bold, italic, headings, lists, code, link, image, HR)
- `src/view/pages/Home.tsx` — hero, about bullets, projects grid, contact form, social links
- `src/view/pages/Rates.tsx` — interactive pricing calculator
- `src/view/pages/AccessibilityChecker.tsx` — WAVE API integration
- `src/view/pages/Blog.tsx` — public blog listing (published posts only)
- `src/view/pages/BlogPost.tsx` — public post detail with `.blog-content` prose styles
- `src/view/pages/admin/AdminLogin.tsx` — login form
- `src/view/pages/admin/AdminDashboard.tsx` — post list, create/edit/delete
- `src/view/pages/admin/PostEditor.tsx` — full post editor (title, slug, excerpt, tags, date, read time, cover image, RichEditor)

## Assets (`src/assets/`)
linkedin.svg, github-light.svg, github-dark.svg, calendly.svg, icons8-whatsapp.svg,
image-of-laptop-screen-with-computer-code.webp, thatsveryadhd.png, expensevue.png,
BloomIcon.ico, css-logo.png, html-logo.png, javascript-logo.png

## Contact / Social
- LinkedIn: https://www.linkedin.com/in/dannyvaldivia/
- GitHub: https://github.com/dluisvaldivia
- Calendly: https://calendly.com/dluis-valdivia/30min
- WhatsApp: +34615193280
- Email: dluis.valdivia@gmail.com (EmailJS contact form — keys in `.env`)

## Deploy
`npm run deploy` → builds then pushes `dist/` to `gh-pages` branch via `gh-pages` package.

## Blog System
- **Storage:** blog posts created via admin are stored in `localStorage` (`dv_blog_posts` key) as JSON
- **Merge:** `getAllPosts()` merges localStorage posts with static seed posts in `blogData.ts`; local overrides static by slug
- **Published/Draft:** only posts with `published !== false` appear on public `/blog`; static seed posts default to published
- **Built-in posts:** static seed posts show a "built-in" badge in the dashboard; editing them saves a local override
- **Admin auth:** credentials in `.env` (`VITE_ADMIN_USER`, `VITE_ADMIN_PASS`); session stored in `sessionStorage` (clears on tab close)
- **Admin URL:** `/admin` locally at `localhost:5173/admin`, live at `dluisvaldivia.github.io/DVPortfolio/admin`

## Projects Section (`src/view/components/card.tsx` + `src/models/cardsData.ts`)
- Active projects: Bloom, YogaBuddy (was "The Yoga Game"), ExpenseVue — SO DIVERGENT removed
- Project card button is an `<a>` with `button-primary` class (not a nested `<button>`) — fixes pointer cursor and click area
- `LuExternalLink` icon (react-icons/lu) sits `absolute top-2 right-2` inside the button
- `button-primary:focus-visible` uses a 2px `#2222F7` outline for keyboard nav visibility
- "View more on GitHub" button rendered below the cards grid (links to `https://github.com/dluisvaldivia`)
- Project descriptions live in `src/i18n.ts` under `cards.[id].description` (EN + ES), not in `cardsData.ts`
- ExpenseVue link points to GitHub repo (not the Render deployment)

## Contact Section (`src/view/pages/Home.tsx`)
- **EmailJS** replaces formsubmit.co — `emailjs.sendForm()` called on submit, keys from `.env`
- `.env` keys: `VITE_EMAILJS_SERVICE_ID=service_whtrzxq`, `VITE_EMAILJS_TEMPLATE_ID=template_e0z7d3m`, `VITE_EMAILJS_PUBLIC_KEY=nYEaCtGpLdZk5nwNY`
- EmailJS template must use `{{name}}`, `{{email}}`, `{{message}}` variable names
- Form is fully controlled (React state), with `loading / success / error` status + inline feedback banners
- Inputs disabled during send to prevent double-submit; fields clear on success
- Visual redesign: large gradient heading (`clamp(2.8rem–5rem)`), laser-line top border `::before`, dual radial glow background, glassmorphism card (`.contact-form-card`), shimmer-sweep submit button
- All contact CSS lives in `src/index.css` under classes prefixed `.contact-*`
- `@keyframes contact-spin` defined outside `@layer components` alongside `@keyframes ripple-flash`

## Notes
- No tailwind.config file — Tailwind v4 config is entirely in `src/index.css`
- Theme toggle persists to `localStorage` via `themeController`
- Calendly widget loaded via CDN script in `index.html`
- GH Pages SPA redirect handled via `sessionStorage` script in `index.html`
- `.env` is gitignored — contains `VITE_WAVE_API_KEY`, `VITE_ADMIN_USER`, `VITE_ADMIN_PASS`, `VITE_EMAILJS_*`
- framer-motion v12: bezier ease arrays must be cast `as [number, number, number, number]` to satisfy the `Easing` type
