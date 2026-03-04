# DriveEase - Premium Car Rental Website

A fully functional, production-ready car rental website built with React 18 and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🛠️ Tech Stack

- **React 18** - Frontend framework with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **PropTypes** - Type checking

## 📁 Project Structure

```
src/
├── components/
│   ├── features/     # Business-specific components (CarCard, AuthModals)
│   ├── layout/       # Layout components (Navbar, Footer, Layout)
│   └── ui/           # Reusable UI components (Button, Input, Modal)
├── context/          # React Context providers
├── data/             # Mock data (cars, reviews, locations, extras)
├── hooks/            # Custom React hooks
├── pages/            # Page components
└── utils/            # Utility functions
```

## ✨ Features

- **Homepage** - Hero section, search widget, featured cars, testimonials
- **Browse Cars** - Advanced filters, sorting, grid/list view, pagination
- **Car Details** - Image gallery, specifications, reviews, booking widget
- **Multi-step Booking** - Rental details, extras, customer info, payment
- **Dark Mode** - Theme toggle with persistence
- **Favorites** - Save cars with localStorage persistence
- **Responsive Design** - Mobile-first, works on all screen sizes

## 📄 Pages

- `/` - Homepage
- `/cars` - Browse all cars
- `/cars/:id` - Car details
- `/booking/:carId` - Booking flow
- `/about` - About us
- `/contact` - Contact page
- `/faq` - FAQ with accordions
- `/locations` - Pickup locations
- `/favorites` - Saved favorites
- `/terms` - Terms of service
- `/privacy` - Privacy policy

## 🎨 Design System

- **Primary Color**: Blue (#3b82f6)
- **Secondary Color**: Cyan (#06b6d4)
- **Accent Color**: Amber (#f59e0b)
- **Typography**: Inter font family
- **Animations**: Smooth transitions and micro-interactions

## 📝 License

MIT
