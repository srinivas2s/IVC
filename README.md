# IVC - Innovators & Visionaries Club

![IVC Platform](client/public/logo.png)

A professional, full-stack digital platform for the Innovators & Visionaries Club (IVC). This project serves as a centralized hub to showcase innovatives projects, manage upcoming events, and provide a secure onboarding experience for club members.
---

## Project Highlights

- **Premium UI/UX**: Built with a "Liquid Glass" design system, featuring advanced translucency, blurs, and interactive 3D parallax effects.
- **Full-Stack Security**: Production-ready backend featuring JWT-based authentication, rate limiting, and strict input validation.
- **Database Persistence**: Integrated with Supabase for reliable data storage and member management.
- **Image Storage**: Automated photo uploads to Supabase Storage with memory-optimized processing.
- **Responsive Design**: Fully optimized for a seamless experience across all devices, from desktop monitors to mobile phones.

---

## Project Structure

```bash
IVC-main/
├── client/             # React + Vite frontend
│   └── src/            # UI Components, Pages & Logic
├── server/             # Node.js + Express backend
│   ├── index.js        # API Routes, Middleware & Supabase Logic
│   └── vercel.json     # Deployment configuration for Vercel
├── supabase_setup.sql  # Database schema and initial setup
└── README.md           # Project overview
```

---

## Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion & Lenis Smooth Scroll
- **Icons**: Lucide React

### Backend
- **Framework**: Node.js + Express
- **Database**: Supabase (PostgreSQL)
- **Validation**: Zod
- **Security**: Helmet, CORS, Express Rate Limit
- **Storage**: Multer + Supabase Storage

---

## Quick Start

### 1. Prerequisites
Ensure you have **Node.js (v18+)** installed.

### 2. Environment Variables
Create a `.env` file in the `server` directory with the following:
- `ADMIN_PASSWORD`: Access key for the admin dashboard.
- `PROFILE_PASSWORD`: Access key for member profile submissions.
- `SUPABASE_URL`: Your Supabase project URL.
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key.
- `ADMIN_SECRET`: A secret string for signing session tokens.

### 3. Installation & Setup
Run the following commands:

```bash
# Clone the repository
git clone https://github.com/srinivas2s/IVC.git
cd IVC-main

# Set up the Frontend
cd client
npm install

# Set up the Backend
cd ../server
npm install
```

### 4. Running the App
Start both the backend and frontend:

- **Backend**: `cd server && npm run dev` (Runs on port 5000)
- **Frontend**: `cd client && npm run dev` (Runs on port 5173)

---

## License
This project is developed for the Innovators & Visionaries Club. All rights reserved.
---

