# MusiCart

MusiCart is a comprehensive web application designed for music enthusiasts to explore, select, and purchase their favorite music gear. Built with the modern JavaScript stack, including React for the frontend and Express for the backend, musiCart offers a seamless shopping experience. Users can browse through a wide range of music products, add them to their cart, and proceed to checkout. The application also supports user authentication, allowing for a personalized shopping experience.

# Features

- **Product Exploration**: Users can browse through various categories of music products.
- **User Authentication**: Secure login and signup features for a personalized experience.
- **Shopping Cart**: Add products to a cart and manage them before purchase.
- **Checkout Process**: A streamlined checkout page for users to finalize their purchases.
- **Feedback Submission**: Users can submit feedback about their shopping experience.

# Installation

Ensure you have [Node.js](https://nodejs.org/) and npm installed. Follow these steps to set up musiCart locally:

1. Clone the repository or download the ZIP file.
2. Navigate to the project directory.
3. Install dependencies:

```bash
npm install
```

4. Start the frontend and backend servers:

```bash
# Start frontend
npm run dev

# Start backend
npm run dev:server
```

# Environment Setup

Configure the following environment variables in a `.env` file:

```env
DB="your MongoDB connection URI"
JWT_SUPER_SEACRETE="your JWT secret"
PORT="your preferred port number"
```

# Dependencies

### Frontend

- ReactJS
- React Router Dom
- react-hot-toast
- react-hook-form
- react-select

### Backend

- bcrypt
- dotenv
- express
- express-async-errors
- jsonwebtoken
- mongoose

# Viewing the Application

Access musiCart by navigating to [http://localhost:5173](http://localhost:5173) in your browser (adjust the port according to your `.env` configuration).

# Demo

A live demo of musiCart is available [here](https://music-cart-yesrab.vercel.app/)

