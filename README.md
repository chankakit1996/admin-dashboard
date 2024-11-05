# Fullstack Admin Dashboard

## Overview

This repository contains the code for a full-stack MERN (MongoDB, Express, Next.js, Node.js) admin dashboard application. The project demonstrates how to build a comprehensive admin panel with features like data visualization, user management.

## Key Features

- React-based frontend with Material-UI components
- Redux Toolkit for state management
- Backend API built with Node.js and Express
- MongoDB database integration
- Data visualization using chart.js
- Responsive design for various screen sizes

## Getting Started

1. Clone the repository
2. Navigate to the `client` folder and run `npm install` to install frontend dependencies
3. Navigate to the `server` folder and run `npm install` to install backend dependencies
4. Set up your MongoDB database and update the connection string in the server configuration
5. Start the backend server by running `npm run dev` in the `server` folder
6. Start the frontend development server by running `npm run dev` in the `client` folder

## Folder Structure

- `/client`: React frontend application
- `/server`: Node.js backend API

## Build Script
1. Runtime: Not set
2. Base directory: server
3. Package directory: Not set
4. Build command: `cd ../client && yarn && yarn build && mv out ../server/public`
5. Publish directory: server/public
6. Functions directory: server/netlify/functions
