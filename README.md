# Plateform Builder MVP

This repo contains a working full-stack MVP for a premium, SaaS-ready restaurant website builder called Plateform. It is designed to generate modern, mobile-first websites instantly with a live WYSIWYG Template Editor.

## 🚀 Key Features

### User & Authentication
- **Secure Owner Authentication:** Register, login, and logout.
- **Session Management:** Secure in-memory session handling.

### Advanced Core Operations
- **Restaurant Onboarding Flow:** Easy data entry for new businesses.
- **Modular Layout Engine:** Dynamically re-order sections as they appear on your site.
- **Robust Menu CMS:** Organize menus seamlessly with categories, names, prices, and descriptions.
- **Immersive Galleries:** Automatic masonry-style visual galleries (capped at 20 images max for stability).

### Design & Customization
- **Live WYSIWYG Platform:** Side-by-side Live Simulator preview powered by generative compilation.
- **Generative Design Engine:** Over 40 distinctive built-in theme presets (from Modern Vegan to Cyberpunk Diner).
- **Fine-Grained Styling:** Tweak everything including typography, card rounding, button shapes, navigation headers, and hero styles.
- **Color Customization:** Change explicit Primary and Accent colors, alongside light/dim/dark Mode styling.

### Business & Growth
- **Localization:** Robust multi-location/branch support for franchises.
- **SEO Tuning:** Customizable metadata including meta title & descriptions for Google/Facebook.
- **Privacy Controls:** Hide specific sections, phone numbers, or toggle the website completely offline instantly.
- **Site Analytics:** View total visitor traffic with passive tracking on the Live Editor.
- **Deployment Control:** One-click static deployment with detailed version history and live QR code creation preview.

### Security & Limits
- **IP-Based Rate Limiting:** Fixed-window rate limiter prevents abuse by capping external REST API traffic limits (max 200 requests/minute).

## 🧰 Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js HTTP server (`server/index.js`)
- **Persistence:** Local JSON file abstraction (`data/db.json` - auto-generated)
- **Deployment Build Target:** Static HTML dynamically generated using `server/siteRenderer.js` exported to `published/` directory.

## 🛠 Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start backend (Terminal 1):

```bash
npm run dev:server
```

3. Start frontend (Terminal 2):

```bash
npm run dev
```

4. Open the frontend URL shown by Vite (usually `http://localhost:5173`).

## ⚙️ Environment Variables (Optional)

- `PORT` for backend port (default `8787`)
- `CORS_ORIGIN` for frontend origin (default `http://localhost:5173`)
- `VITE_API_URL` for frontend API base (default `http://localhost:8787`)

## 📡 REST API Overview

### Authentication
- `POST /api/auth/register` - Register a new owner
- `POST /api/auth/login` - Validate credentials and return a token
- `POST /api/auth/logout` - Invalidate an active session
- `GET /api/me` - Details of the current logged-in user

### Restaurant Management
- `GET /api/restaurants` - List restaurants for your account
- `POST /api/restaurants` - Create initial restaurant profile
- `PUT /api/restaurants/:id` - Save draft modifications and metadata
- `POST /api/restaurants/:id/publish` - Triggers a static build rendering HTML
- `GET /api/restaurants/:id/deployments` - Returns deployment history mapping

### Content & Delivery
- `POST /api/preview` - Instant generative endpoint for Live Simulator iframe content
- `GET /api/public/:slug` - Public API profile of business data
- `GET /sites/:slug` - Edge server route that returns the customized restaurant `index.html` markup (adds +1 hit counter view)
- `GET /api/health` - Basic uptime checker

## 📂 Project Structure

- `src/App.jsx`: Main UI bundle grouping dashboard, simulator layer, editor components
- `server/index.js`: Primary API gateway, limiter proxy, auth guard
- `server/siteRenderer.js`: Raw HTML template interpolator rendering logic
- `data/db.json`: JSON persistent system mapped automatically
- `published/`: Generated deployed HTML static sites map

## 📈 Next Steps for Production

This is a complete MVP. For a true scale ecosystem, here are the next objectives:
- Replace JSON abstraction logic with Postgres (Supabase, Neon).
- Shift deployment generation to edge nodes (Vercel, Cloudflare Pages).
- Connect API integration for automatic SSL custom domains.
- Implement Stripe to charge for premium template generation variants.
