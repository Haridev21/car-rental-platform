# DriveEase Deployment Guide

Follow these steps to deploy your Car Rental project to the cloud.

## 1. Backend Deployment (Render.com)

1.  **Sign up** at [Render.com](https://render.com).
2.  **Create a New Web Service** and connect your GitHub repository.
3.  **Root Directory**: `server`
4.  **Runtime**: `Node`
5.  **Build Command**: `npm install` (Do NOT add `npm run build`)
6.  **Start Command**: `npm start`
7.  **Environment Variables**:
    - `MONGODB_URI`: *Your MongoDB Atlas connection string*
    - `JWT_SECRET`: *A secure random string*
    - `PORT`: `5001` (or leave as default)

## 2. Frontend Deployment (Vercel.com)

1.  **Sign up** at [Vercel.com](https://vercel.com).
2.  **New Project**: Connect your GitHub repository.
3.  **Framework Preset**: `Vite`
4.  **Root Directory**: `./` (Root of the repo)
5.  **Build Command**: `npm run build`
6.  **Output Directory**: `dist`
7.  **Environment Variables**:
    - `VITE_API_URL`: `https://your-backend-url.onrender.com/api`

## 3. Post-Deployment
- Once both are deployed, verify the live URL from Vercel.
- Test the Login, Sign up, and Car browsing flows to ensure the connection is working.
