# DriveEase

DriveEase is a car rental platform designed to make finding and booking your next ride simple and straightforward. Whether you're planning a weekend getaway or just need a reliable set of wheels for the day, this application provides a clean interface to browse, select, and manage your rentals.

## Core Features

- User Authentication: Secure sign-up and login for a personalized experience.
- Car Browsing: Explore a variety of available vehicles with detailed information.
- Booking System: Easy-to-use flow for reserving cars.
- Responsive Design: Works smoothly across different devices.

## Getting Started

To get the project running on your local machine, follow these steps.

### Frontend Setup

The frontend is built with React and Vite.

1. Navigate to the root folder.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

The backend is an Express server using MongoDB.

1. Navigate to the `server` directory.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and add your environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5001
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## Built With

- React: For the user interface.
- Tailwind CSS: For styling.
- Node.js & Express: Powering the backend api.
- MongoDB: For data storage.
- Vite: As the build tool.

## Deployment

This project is configured for deployment on Vercel for the frontend and Render for the backend. Detailed instructions can be found in the `deployment_guide.md` file.
