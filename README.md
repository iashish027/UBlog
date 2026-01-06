# UBlog

UBlog is a full-stack blogging platform that allows users to create, read, update, and delete blog posts. It features user authentication, post management, and a responsive frontend styled with Tailwind CSS. The backend is built with Node.js and Express, while the frontend is powered by React and Redux.

## Features

- User authentication (Sign Up, Sign In, Verify Email, Sign Out)
- Create, edit, and delete blog posts
- View all posts with pagination
- View individual blog posts
- Responsive design with Tailwind CSS
- Backend API with Express.js
- Database integration with MongoDB
- Cloudinary integration for image uploads

## Project Structure

### Backend

The backend is located in the `backend` folder and includes:

- **Controllers**: Handle business logic for authentication, posts, and more.
- **Routes**: Define API endpoints.
- **Models**: Define MongoDB schemas for `User` and `Post`.
- **Middleware**: Handle authentication and error handling.
- **Utils**: Utility functions for error handling and email sending.

### Frontend

The frontend is located in the `frontend` folder and includes:

- **Components**: Reusable UI components like `Header`, `PostCard`, and `UserPosts`.
- **Pages**: Individual pages like `Home`, `Dashboard`, `SignIn`, and `BlogShow`.
- **Redux**: State management for user authentication and theme.
- **Utils**: Helper functions like `signOut`.

## APIs

### Authentication

- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/signin`: Log in an existing user.
- `POST /api/auth/signOut`: Log out the current user.

### Posts

- `POST /api/posts/create`: Create a new post (requires authentication).
- `GET /api/posts/getposts`: Retrieve posts with pagination.

### Email Verification

- `POST /api/verify-email`: Verify a user's email address.

### Image Upload

- `POST /api/images/upload`: Upload an image to Cloudinary.

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- MongoDB
- Cloudinary account
- npm or yarn

### Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add the following:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME: "your_cloud_name",
   CLOUDINARY_API_KEY"api_key": "your_api_key",
   CLOUDINARY_API_SECRET: "your_api_secret"
   ### or whaterver cloud you are using

   SMTP_HOST=""
   SMTP_PORT=""
   SMTP_SECURE=""
   SMTP_USER=""
   SMTP_PASS=""
   FRONTEND_URL=""

   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder and add the following:
   ```env
   VITE_FRONTEND_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Running the Application

1. Start the backend server.
2. Start the frontend development server.
3. Open your browser and navigate to `http://localhost:5173`.

## Technologies Used

- **Frontend**: React, Redux, Tailwind CSS, Flowbite-React
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Image Hosting**: Cloudinary

## Notes

- Ensure MongoDB is running locally or provide a valid connection string in the `.env` file.
- The backend runs on port `5000` by default, and the frontend communicates with it via the `VITE_API_URL` environment variable.

## Contribution

Feel free to fork this repository and contribute to the project. Pull requests are welcome!

## License

This project is licensed under the MIT License.
