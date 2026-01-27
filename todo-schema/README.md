# Todo Application with User Signup

A complete RESTful API for Todo management with user authentication built using Node.js, Express.js, and Supabase.

## 🚀 Features

- ✅ User Signup with validation
- ✅ Duplicate email prevention
- ✅ Password hashing with bcrypt
- ✅ Complete Todo CRUD operations (user-linked)
- ✅ Cascade delete (deleting user removes all their todos)
- ✅ Comprehensive validation and error handling
- ✅ Clean MVC architecture

## 📋 Prerequisites

- Node.js (v14 or higher)
- Supabase account and project
- Postman or Thunder Client for testing

## 🛠️ Installation

### 1. Install dependencies

```bash
cd "c:\Users\Sarath\OneDrive\Desktop\node\todo-schema"
npm install
```

### 2. Set up Supabase Database

Run the SQL from `schema.sql` in your Supabase SQL Editor:
- Creates `users` table
- Creates `todos` table with CASCADE delete
- Sets up indexes and foreign keys

### 3. Configure Environment Variables

Your `.env` file is already configured with:
```env
SUPABASE_URL=https://wsdmymizntvusyjesmes.supabase.co
SUPABASE_ANON_KEY=your_key_here
PORT=7000
```

### 4. Start the Server

```bash
npm run dev
```

Server will run on `http://localhost:7000`

## 📚 API Documentation

### Base URL
```
http://localhost:7000
```

---

## 👤 User Endpoints

### 1. User Signup
**POST** `/signup`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `name`: Required, non-empty string
- `email`: Required, valid email format, unique
- `password`: Required, minimum 8 characters

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-01-27T10:00:00.000Z"
  }
}
```

**Error Response (409 - Duplicate Email):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

**Error Response (400 - Validation Failed):**
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

## 📝 Todo Endpoints

### 2. Create Todo
**POST** `/add-todo`

Create a new todo item for a user.

**Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, bread, eggs",
  "userId": "user-uuid-here"
}
```

**Validation Rules:**
- `title`: Required, non-empty string
- `description`: Optional, string
- `userId`: Required, must be a valid user ID

**Success Response (201):**
```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "id": "todo-uuid-here",
    "title": "Buy groceries",
    "description": "Milk, bread, eggs",
    "is_completed": false,
    "user_id": "user-uuid-here",
    "created_at": "2026-01-27T10:00:00.000Z"
  }
}
```

**Error Response (404 - User Not Found):**
```json
{
  "success": false,
  "message": "User not found"
}
```

---

### 3. Get User's Todos
**GET** `/get-my-todo/:userId`

Retrieve all todos for a specific user.

**URL Parameters:**
- `userId`: UUID of the user

**Success Response (200):**
```json
{
  "success": true,
  "message": "Todos retrieved successfully",
  "count": 2,
  "data": [
    {
      "id": "todo-uuid-1",
      "title": "Buy groceries",
      "description": "Milk, bread, eggs",
      "is_completed": false,
      "user_id": "user-uuid-here",
      "created_at": "2026-01-27T10:00:00.000Z"
    },
    {
      "id": "todo-uuid-2",
      "title": "Complete project",
      "description": null,
      "is_completed": true,
      "user_id": "user-uuid-here",
      "created_at": "2026-01-27T09:00:00.000Z"
    }
  ]
}
```

**Error Response (404 - User Not Found):**
```json
{
  "success": false,
  "message": "User not found"
}
```

---

### 4. Update Todo
**PUT** `/update-todo/:todoId`

Update a todo's title, description, or completion status.

**URL Parameters:**
- `todoId`: UUID of the todo

**Request Body:** (at least one field required)
```json
{
  "title": "Buy groceries and cook",
  "description": "Updated description",
  "is_completed": true
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "id": "todo-uuid-here",
    "title": "Buy groceries and cook",
    "description": "Updated description",
    "is_completed": true,
    "user_id": "user-uuid-here",
    "created_at": "2026-01-27T10:00:00.000Z"
  }
}
```

**Error Response (404 - Todo Not Found):**
```json
{
  "success": false,
  "message": "Todo not found"
}
```

---

### 5. Delete Todo
**DELETE** `/delete-todo/:todoId`

Delete a specific todo.

**URL Parameters:**
- `todoId`: UUID of the todo

**Success Response (200):**
```json
{
  "success": true,
  "message": "Todo deleted successfully"
}
```

**Error Response (404 - Todo Not Found):**
```json
{
  "success": false,
  "message": "Todo not found"
}
```

---

## 🔥 Cascade Delete Behavior

When a user is deleted, **all their todos are automatically deleted** due to the `ON DELETE CASCADE` constraint in the database.

**Example:**
```sql
-- Deleting a user will automatically delete all their todos
DELETE FROM users WHERE id = 'user-uuid-here';
-- All todos with user_id = 'user-uuid-here' are automatically removed
```

---

## 📁 Project Structure

```
todo-schema/
├── config/
│   └── supabase.js              # Supabase client
├── controllers/
│   ├── userController.js        # User request handlers
│   └── todoController.js        # Todo request handlers
├── middleware/
│   ├── validation.js            # Request validation
│   └── errorHandler.js          # Error handling
├── routes/
│   ├── userRoutes.js            # User endpoints
│   └── todoRoutes.js            # Todo endpoints
├── services/
│   ├── userService.js           # User business logic
│   └── todoService.js           # Todo business logic
├── .env                         # Environment variables
├── .gitignore                   # Git ignore
├── package.json                 # Dependencies
├── schema.sql                   # Database schema
├── server.js                    # Application entry
└── README.md                    # Documentation
```

---

## 🧪 Testing Examples

### 1. User Signup
```bash
curl -X POST http://localhost:7000/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "password": "password123"
  }'
```

### 2. Create Todo
```bash
curl -X POST http://localhost:7000/add-todo \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Node.js",
    "description": "Complete tutorial",
    "userId": "YOUR_USER_ID_HERE"
  }'
```

### 3. Get User Todos
```bash
curl http://localhost:7000/get-my-todo/YOUR_USER_ID_HERE
```

### 4. Update Todo
```bash
curl -X PUT http://localhost:7000/update-todo/YOUR_TODO_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "is_completed": true
  }'
```

### 5. Delete Todo
```bash
curl -X DELETE http://localhost:7000/delete-todo/YOUR_TODO_ID_HERE
```

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ Email uniqueness validation
- ✅ Input sanitization (trim, lowercase)
- ✅ UUID validation for IDs
- ✅ Foreign key constraints
- ✅ SQL injection protection (via Supabase)

---

## ⚠️ Error Handling

The API returns appropriate HTTP status codes:

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation errors) |
| 404 | Not Found |
| 409 | Conflict (duplicate email) |
| 500 | Internal Server Error |

---

## 🎯 Validation Summary

### User Signup
- Name: Required, non-empty
- Email: Required, valid format, unique
- Password: Required, min 8 characters

### Create Todo
- Title: Required, non-empty
- Description: Optional
- UserId: Required, must exist

### Update Todo
- At least one field required
- Title/Description: Must be non-empty if provided
- is_completed: Boolean

---

## 📝 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Todos Table
```sql
CREATE TABLE todos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT false,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
```

---

## 🚀 Ready to Use!

Your Todo Application is complete and ready for testing. Use Postman or Thunder Client to test all endpoints.

**Server URL:** http://localhost:7000

Happy coding! 🎉
