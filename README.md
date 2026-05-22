# 🐾 FurEverFriends Pet Adoption Platform

A full-stack rescue portal designed to match verified adoptable pets with loving forever homes. Built with the MERN stack (MongoDB, Express, React/Next.js, Node.js) featuring JWT authentication, glassmorphic UI, and real-time adoption request management.

---

## 🌐 Live URL

> **Client:** [https://fur-ever-friends.vercel.app](https://fur-ever-friends.vercel.app)  
> **Server:** [https://fur-ever-friends-api.onrender.com](https://fur-ever-friends-api.onrender.com)

---

## 🎯 Purpose

FurEverFriends is a real-world pet adoption portal where:
- **Adopters** can browse available pets, view detailed profiles, and submit adoption requests
- **Pet owners / shelters** can list pets, manage listings, approve or reject adoption requests
- All data is securely stored in MongoDB Atlas with JWT-protected private routes

---

## ✨ Features

- **🔍 Advanced Search, Filter & Sort** — Search pets by name using MongoDB `$regex`, filter by species using `$in`, and sort by newest, price (low→high / high→low), or age
- **🔐 JWT Cookie Authentication** — Secure HTTP-Only cookie-based sessions with Google OAuth support; private routes never redirect on reload
- **🌌 Aurora Animation & Glassmorphism UI** — Custom CSS-animated aurora blobs, glassmorphic panels, and a fuchsia/pink/violet gradient system across all pages
- **🐾 Complete CRUD for Pet Listings** — Owners can Add, Edit (Update Modal), View, and Delete pet listings from the dashboard; deletions cascade-remove all adoption requests
- **📋 Adoption Request Lifecycle** — Adopters submit requests (with pickup date & message); owners approve or reject from a modal — approving marks the pet as adopted and auto-rejects all other pending requests
- **📊 Owner Dashboard** — My Listings with live stats (Total / Available / Adopted), My Requests table with Request Date, Pickup Date, Status, and Cancel action
- **🌗 Dark / Light Theme Toggle** — Persistent theme via `localStorage` and `data-theme` attribute; no flash on reload
- **🎬 Framer Motion Animations** — Scroll-triggered entrance animations, hero fade-in/slide, and card stagger effects throughout the app
- **📱 Fully Responsive Design** — Mobile, tablet, and desktop layouts using Tailwind CSS v4 utility grid system
- **🔔 Toast Notifications** — All success/error/info messages use `react-hot-toast`; zero browser `alert()` calls

---

## 📦 NPM Packages Used

### Client (`client/my-app`)

| Package | Purpose |
|---|---|
| `next` | React framework with App Router & Turbopack |
| `react` / `react-dom` | Core React library |
| `axios` | HTTP client for API requests |
| `framer-motion` | Page and component animations |
| `react-hot-toast` | Beautiful toast notifications |
| `tailwindcss` (v4) | Utility-first CSS framework |
| `@heroui/react` | UI component primitives |

### Server (`client/server`)

| Package | Purpose |
|---|---|
| `express` | Node.js web framework |
| `mongoose` | MongoDB ODM |
| `jsonwebtoken` | JWT generation & verification |
| `bcrypt` | Password hashing |
| `cookie-parser` | HTTP-Only cookie handling |
| `cors` | Cross-Origin Resource Sharing config |
| `helmet` | Security HTTP headers |
| `express-rate-limit` | Rate limiting for auth endpoints |
| `dotenv` | Environment variable management |
| `google-auth-library` | Google OAuth token verification |

---

## 🚀 Getting Started (Local Development)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/furever-friends-client.git
```

### 2. Set Up Environment Variables

**Server** — create `client/server/.env`:
```env
MONGO_URI=your_mongodb_atlas_connection_string
SESSION_SECRET=your_jwt_secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
PORT=5000
```

**Client** — create `client/my-app/.env.local`:
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

### 3. Seed the Database (Optional)
```bash
cd client/server
npm install
npm run seed
```

### 4. Start the Backend
```bash
cd client/server
npm run dev
# Runs on http://localhost:5000
```

### 5. Start the Frontend
```bash
cd client/my-app
npm install
npm run dev
# Runs on http://localhost:3000
```

---

## 🏗️ Project Structure

```
MERNAUTH/
├── client/
│   ├── my-app/          # Next.js 15 frontend
│   │   ├── src/
│   │   │   ├── app/     # App Router pages
│   │   │   ├── components/  # Navbar, Footer, PetCard...
│   │   │   └── context/ # AuthContext (JWT + Google)
│   │   └── ...
│   └── server/          # Express.js backend
│       ├── server.js    # All routes & MongoDB schemas
│       └── seed.js      # Database seeder
└── requirements.md
```

---

## 🛡️ Security Notes

- MongoDB credentials are stored in `.env` files (excluded from version control via `.gitignore`)
- JWT tokens are stored in HTTP-Only cookies (not accessible via JavaScript)
- Auth routes are protected by `express-rate-limit` (5 attempts / 15 minutes)
- Helmet.js sets secure HTTP headers on all responses

---

## 🐛 Troubleshooting

| Issue | Fix |
|---|---|
| No pets visible | Run `npm run seed` in `client/server` |
| Login not persisting | Ensure `credentials: 'include'` is set in all API calls |
| CORS errors | Check that the client origin is listed in `server.js` CORS config |
| Port conflicts | Ensure ports `3000` and `5000` are free |
