# Placement Training Backend

A Node.js/Express backend for the Placement Training System with MongoDB integration.

## Features

- User management (CRUD operations)
- Skills management
- Training modules
- Placement statistics
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd backend1
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running on your system or update the connection string in `config/db.js`

4. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Skills
- `GET /api/skills` - Get all available skills

### Training Modules
- `GET /api/training-modules` - Get all training modules

### Placement Statistics
- `GET /api/placement-stats` - Get placement statistics

### Health Check
- `GET /api/health` - Server health check

## User Model Schema

```javascript
{
  name: String (required),
  email: String (required, unique),
  age: Number (required),
  phone: String,
  skills: [String],
  education: {
    degree: String,
    institution: String,
    graduationYear: Number
  },
  placementStatus: String (enum: ['Not Placed', 'In Process', 'Placed']),
  company: String,
  salary: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/placement_training
NODE_ENV=development
```

## Database Setup

The application uses MongoDB. Make sure MongoDB is running and accessible. The default connection string is `mongodb://localhost:27017/`.

## CORS Configuration

The backend is configured to accept requests from any origin for development. For production, update the CORS configuration in `server.js`.

## Error Handling

All endpoints include proper error handling and return appropriate HTTP status codes and error messages.

## Development

- The server uses nodemon for development (auto-restart on file changes)
- All routes are prefixed with `/api`
- JSON responses for all endpoints
- Proper HTTP status codes for different scenarios 