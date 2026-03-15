# Elite BMW Cycling - Premium Booking Platform

A production-ready full-stack website for the Elite BMW Cycling company, built precisely according to your MASTER PROMPT. The aesthetic is heavily inspired by premium adventure brands, featuring dark themes, neon accents, floating 3D graphics, and smooth scroll storytelling.

## 🚀 Tech Stack
### Frontend
- **Next.js 14** (App Router)
- **TailwindCSS** (Custom Neon constraints, Dark Mode)
- **Framer Motion** (Scroll animations & layout transitions)
- **React Three Fiber & Drei** (3D Abstract Bicycle Wheel Hero Animation)
- **GSAP** (ScrollTrigger integration)

### Backend
- **Node.js + Express** (REST API)
- **MongoDB + Mongoose** (Database)
- **JSON Web Tokens (JWT)** (Authentication)
- **Bcrypt.js** (Password hashing)

---

## 💻 Project Structure
- `frontend/`: Contains the complete Next.js website, UI components, pages.
- `backend/`: Contains the Express server, Mongoose models, API routes, and auth middleware.

---

## 🔧 Getting Started Instantly

### 1. Start the Backend API
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies (already installed during generation, but just in case):
   ```bash
   npm install
   ```
3. Run the development server (Defaults to Port `5000`):
   ```bash
   node server.js
   ```
*(Note: It connects to a local MongoDB instance `mongodb://localhost:27017/elite-cycling` by default. Ensure MongoDB is running or replace the URI in `server.js` with your MongoDB Atlas string).*

### 2. Start the Frontend Application
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js frontend dev server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:3000` in your browser to see the cinematic 3D experience!

---

## 🔒 Default Admin Credentials
To view the Admin Dashboard, which shows slot availability and active tickets, register an account with:
- **Email:** `admin@gmail.com`
- **Password:** `your_password`

You will quickly need to change the role manually in MongoDB from `'user'` to `'admin'`, or directly seed an admin user since the default register route assigns `'user'`.  Alternatively, alter the schema or `auth.js` default role assignment for testing.

---

## 🔥 Key Features Included
- **3D Scrolling Hero:** A dynamic, floating neon bicycle wheel that reacts to scroll.
- **Glassmorphic UI:** Premium frosted glass components over deep dark themes.
- **Dynamic Booking System:** Prevents overbooking (max 50 slots) on Friday/Saturday nights.
- **Digital Tickets:** Dashboard shows generated Ticket IDs, Date, Meeting Location.
- **Dashboard Cancellation:** Real-time slot restitution upon user or admin cancellation.
