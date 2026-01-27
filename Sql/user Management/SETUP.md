# Quick Setup Guide

## Step 1: Set Up Supabase

1. **Create a Supabase Account**
   - Go to [https://supabase.com](https://supabase.com)
   - Sign up or log in
   - Create a new project

2. **Get Your Credentials**
   - Navigate to: Settings > API
   - Copy the **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - Copy the **anon/public key** (starts with `eyJ...`)

3. **Create the Database Table**
   - Go to: SQL Editor in your Supabase dashboard
   - Open the file: `database/schema.sql`
   - Copy all the SQL code
   - Paste it in the SQL Editor
   - Click "Run" to create the users table

## Step 2: Configure Environment Variables

1. **Create .env file**
   ```bash
   # Copy the example file
   cp .env.example .env
   ```

2. **Edit .env file** with your actual Supabase credentials:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-actual-anon-key-here
   PORT=3000
   NODE_ENV=development
   ```

## Step 3: Install Dependencies (Already Done!)

```bash
npm install
```
✅ Dependencies are already installed!

## Step 4: Start the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Or production mode:
```bash
npm start
```

You should see:
```
🚀 Server is running on port 3000
📍 Environment: development
🔗 Base URL: http://localhost:3000
```

## Step 5: Test the API

### Option 1: Using Browser
Open: `http://localhost:3000`

### Option 2: Using PowerShell
```powershell
# Test create user
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "password123"
    age = 25
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method Post -ContentType "application/json" -Body $body

# Get all users
Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method Get
```

### Option 3: Using Postman/Thunder Client
- Import the examples from `API_EXAMPLES.md`

## Troubleshooting

### Error: "Missing Supabase credentials"
- Make sure you created the `.env` file
- Check that SUPABASE_URL and SUPABASE_ANON_KEY are set correctly

### Error: "relation 'users' does not exist"
- Run the SQL schema in Supabase SQL Editor
- Make sure the table was created successfully

### Error: "Cannot find module"
- Run `npm install` again
- Check that you're in the correct directory

## Project Structure Overview

```
├── config/           # Supabase configuration
├── controllers/      # Request handlers
├── database/         # SQL schema
├── middleware/       # Validation & error handling
├── routes/          # API endpoints
├── services/        # Business logic
├── server.js        # Main entry point
└── .env            # Your credentials (DO NOT COMMIT!)
```

## Next Steps

1. ✅ Set up Supabase account
2. ✅ Create .env file with your credentials
3. ✅ Run the database schema
4. ✅ Start the server
5. ✅ Test the API endpoints
6. 🎉 Start building!

## Need Help?

- Check the [README.md](README.md) for detailed API documentation
- See [API_EXAMPLES.md](API_EXAMPLES.md) for testing examples
- Review the database schema in [database/schema.sql](database/schema.sql)
