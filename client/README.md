# IVC Frontend (Client)

The frontend for the Innovators & Visionaries Club (IVC) is a high-performance, visually stunning web application designed with a premium "Glassmorphism" aesthetic.

---

## Design Vision

This application follows a Premium Dark Aesthetic inspired by modern glass design:
- **Liquid Glass**: High-transparency panels with multi-layer blurs and glossy reflections.
- **3D Interactive Hero**: A 3D parallax hero card that reacts to mouse movement and tilt.
- **Micro-interactions**: Shimmering typography, tap feedback, and ambient pulsing glows.
- **Smart Navigation**: A header that automatically hides on scroll to maximize content visibility and reappears on scroll up.

---

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Smooth Scrolling**: Lenis
- **Icons**: Lucide React

---

## Key Features & Pages

### 1. Home Page
- **3D Tilt Experience**: Uses GPU-accelerated transforms to tilt the interactive glass card based on mouse position.
- **Shimmer Typography**: Custom scanning light animation on the main tagline.
- **Logo Aura**: A breathing ambient glow that draws focus to the brand logo.

### 2. Team Page
- **Dynamic Member Gallery**: Fetches and displays approved club members from the backend.
- **Interactive Cards**: High-gloss cards with hover effects and social links.

### 3. Join IVC / Profile Submission
- **Secure Access**: Protected by a profile access key.
- **Multi-part Form**: Allows members to submit bios, roles, social links, and profile photos.
- **Image Preview**: Real-time preview of uploaded photos before submission.

### 4. Admin Dashboard
- **Protected Route**: Requires administrative password for access.
- **Request Management**: Admins can review, approve, or reject pending member applications.
- **Real-time Updates**: Instant status changes reflected in the database.

---

## Local Development

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

