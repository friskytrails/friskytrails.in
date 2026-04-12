# FriskyTrails - Explore India with Us 🏔️🌊🌅

FriskyTrails is a premium adventure and tour booking platform designed to redefine how people explore India. We offer a curated selection of 100+ adventure activities and 500+ tour packages across 200+ breathtaking locations.

![FriskyTrails Banner](public/logo.PNG)

## ✨ Features

- **Adventure & Tour Booking**: Seamless discovery and booking of diverse travel experiences.
- **Dynamic Content Management**: A robust Admin Dashboard to manage blogs, products, countries, states, and cities.
- **SEO Optimized**: Advanced sitemap generation and semantic HTML structure for maximum search engine visibility.
- **Rich User Experience**: Smooth animations using GSAP and Framer Motion, with a responsive design for all devices.
- **Secure Authentication**: Integrated Google OAuth and JWT-based authentication for secure user and admin access.
- **Interactive Image Sliders**: Optimized sliders for showcasing beautiful destinations on both desktop and mobile.

## 🚀 Tech Stack

### Frontend
- **Core**: React 18, Vite
- **Styling**: Tailwind CSS, Framer Motion, GSAP (Animations)
- **State Management**: React Context API
- **Routing**: React Router 7

### Backend
- **Core**: Node.js, Express 5
- **Database**: MongoDB Atlas with Mongoose
- **Auth**: Passport.js (Google OAuth), JWT (Access/Refresh Tokens)
- **Media**: Cloudinary (Image Hosting), Multer (File Handling)
- **Communication**: Nodemailer (Email services)

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Cloudinary account

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/friskytrails.in.git
   cd friskytrails.in
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Environment Variables**:
   Create a `.env` file in the root and another in the `backend/` directory based on the provided configuration.

### Running the Application

- **Frontend**:
  ```bash
  npm run dev
  ```
  The app will be available at `http://localhost:5173`.

- **Backend**:
  ```bash
  cd backend
  npm start
  ```
  The server will run on `http://localhost:8000`.

## 📂 Project Structure

```text
├── backend/            # Express server, MongoDB models, API routes, and controllers
├── public/             # Static assets (logos, icons)
├── src/                # React frontend source code
│   ├── admin/          # Admin-specific components and forms
│   ├── api/            # API utility functions (Axios)
│   ├── components/     # Reusable UI components
│   ├── pages/          # Main application pages
│   ├── sections/       # Layout sections (Hero, Featured, Footer)
│   └── utils/          # Helper functions and constants
└── vercel.json         # Vercel deployment configuration
```

## 📄 SEO & Sitemaps

FriskyTrails automatically generates and serves sitemaps for:
- Static Pages
- Blogs
- Countries, States, and Cities
- Tour Listings
- Tags/Product Types

View the sitemap index at `/sitemap.xml`.

## 📞 Contact

- **Website**: [friskytrails.in](https://www.friskytrails.in)
- **Email**: contact@friskytrails.in
- **Phone**: +91-78779 79193
- **Address**: Uttarapan Market Complex, G15, Siliguri, West Bengal 734001
