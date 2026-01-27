# User Management Application

A robust RESTful backend service built with Node.js, Express.js, and Supabase for complete user CRUD operations with validation and error handling.

## 🚀 Features

- ✅ Complete CRUD operations for user management
- ✅ Supabase PostgreSQL database integration
- ✅ Comprehensive data validation middleware
- ✅ Password hashing with bcrypt
- ✅ UUID-based user identification
- ✅ Duplicate email prevention
- ✅ Age validation (minimum 18 years)
- ✅ Proper error handling with meaningful messages
- ✅ Clean project structure (MVC pattern)
- ✅ Environment-based configuration

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account and project

## 🛠️ Installation

### 1. Clone or navigate to the project directory

```bash
cd "c:\Users\Sarath\OneDrive\Desktop\node\Sql\user Management"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3000
NODE_ENV=development
```

**To get your Supabase credentials:**
1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project or select existing one
3. Go to Settings > API
4. Copy the `Project URL` and `anon/public` key

### 4. Create the database table

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and run the SQL from `database/schema.sql`

## 🏃 Running the Application

### Development mode (with auto-restart)
```bash
npm run dev
```

### Production mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. Create User
**POST** `/api/users`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "age": 25,
  "role": "user"
}
```

**Validation Rules:**
- `name`: Required, non-empty string
- `email`: Required, valid email format, unique
- `password`: Required, minimum 8 characters
- `age`: Optional, must be ≥ 18 if provided
- `role`: Optional, defaults to "user"

**Success Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "role": "user",
    "created_at": "2026-01-27T10:30:00.000Z"
  }
}
```

**Error Response (400/409):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Email must be a valid email format",
    "Password must be at least 8 characters long"
  ]
}
```

---

#### 2. Get All Users
**GET** `/api/users`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "count": 2,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 25,
      "role": "user",
      "created_at": "2026-01-27T10:30:00.000Z"
    }
  ]
}
```

---

#### 3. Get User by ID
**GET** `/api/users/:id`

**URL Parameters:**
- `id`: UUID of the user

**Success Response (200):**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "role": "user",
    "created_at": "2026-01-27T10:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "User not found"
}
```

---

#### 4. Update User
**PUT** `/api/users/:id`

**URL Parameters:**
- `id`: UUID of the user

**Request Body:** (all fields optional, at least one required)
```json
{
  "name": "John Updated",
  "email": "johnupdated@example.com",
  "password": "newPassword123",
  "age": 26,
  "role": "admin"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Updated",
    "email": "johnupdated@example.com",
    "age": 26,
    "role": "admin",
    "created_at": "2026-01-27T10:30:00.000Z"
  }
}
```

---

#### 5. Delete User
**DELETE** `/api/users/:id`

**URL Parameters:**
- `id`: UUID of the user

**Success Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "User not found"
}
```

## 📁 Project Structure

```
user Management/
├── config/
│   └── supabase.js          # Supabase client configuration
├── controllers/
│   └── userController.js    # Request handlers
├── database/
│   └── schema.sql           # Database schema
├── middleware/
│   ├── errorHandler.js      # Global error handling
│   └── validateUser.js      # Request validation
├── routes/
│   └── userRoutes.js        # API route definitions
├── services/
│   └── userService.js       # Business logic layer
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies
├── server.js                # Application entry point
└── README.md                # Documentation
```

## 🧪 Testing with Postman/Thunder Client

### Create User Example:
```
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "testpass123",
  "age": 22
}
```

### Get All Users:
```
GET http://localhost:3000/api/users
```

### Update User:
```
PUT http://localhost:3000/api/users/{user-id}
Content-Type: application/json

{
  "name": "Updated Name",
  "age": 23
}
```

## 🔒 Security Features

- ✅ Password hashing using bcrypt (10 salt rounds)
- ✅ Email uniqueness validation
- ✅ Input sanitization (trim, lowercase for emails)
- ✅ UUID validation for user IDs
- ✅ Environment variables for sensitive data
- ✅ SQL injection protection (via Supabase client)

## ⚠️ Error Handling

The API returns appropriate HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `409`: Conflict (duplicate email)
- `500`: Internal Server Error

## 📝 Validation Rules Summary

| Field    | Required | Type   | Rules                          |
|----------|----------|--------|--------------------------------|
| name     | Yes      | String | Non-empty                      |
| email    | Yes      | String | Valid format, unique           |
| password | Yes      | String | Min 8 characters               |
| age      | No       | Number | ≥ 18 if provided               |
| role     | No       | String | Defaults to "user"             |

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

ISC

---

**Built with ❤️ using Node.js, Express.js, and Supabase**
