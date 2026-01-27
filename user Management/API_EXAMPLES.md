# API Testing Examples

## Using cURL

### 1. Create User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "password": "password123",
    "age": 28,
    "role": "user"
  }'
```

### 2. Get All Users
```bash
curl http://localhost:3000/api/users
```

### 3. Get User by ID
```bash
curl http://localhost:3000/api/users/YOUR_USER_ID_HERE
```

### 4. Update User
```bash
curl -X PUT http://localhost:3000/api/users/YOUR_USER_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Updated",
    "age": 29
  }'
```

### 5. Delete User
```bash
curl -X DELETE http://localhost:3000/api/users/YOUR_USER_ID_HERE
```

## Using PowerShell (Windows)

### 1. Create User
```powershell
$body = @{
    name = "Bob Smith"
    email = "bob@example.com"
    password = "securepass123"
    age = 30
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/users" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

### 2. Get All Users
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method Get
```

### 3. Get User by ID
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/users/YOUR_USER_ID" -Method Get
```

### 4. Update User
```powershell
$updateBody = @{
    name = "Bob Updated"
    age = 31
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/users/YOUR_USER_ID" `
  -Method Put `
  -ContentType "application/json" `
  -Body $updateBody
```

### 5. Delete User
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/users/YOUR_USER_ID" -Method Delete
```

## Validation Error Examples

### Invalid Email Format
```json
{
  "name": "Test User",
  "email": "invalidemail",
  "password": "password123"
}
```
Response: 400 - "Email must be a valid email format"

### Password Too Short
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "short"
}
```
Response: 400 - "Password must be at least 8 characters long"

### Age Below 18
```json
{
  "name": "Young User",
  "email": "young@example.com",
  "password": "password123",
  "age": 16
}
```
Response: 400 - "Age must be 18 or greater"

### Duplicate Email
```json
{
  "name": "Another User",
  "email": "existing@example.com",
  "password": "password123"
}
```
Response: 409 - "Email already exists"

### Invalid User ID Format
```
GET /api/users/invalid-id
```
Response: 400 - "Invalid user ID format. Must be a valid UUID"

### User Not Found
```
GET /api/users/123e4567-e89b-12d3-a456-999999999999
```
Response: 404 - "User not found"
