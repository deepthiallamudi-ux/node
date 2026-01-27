-- User Management Application - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to create the users table

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop table if exists (for fresh setup)
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  age INTEGER CHECK (age >= 18),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);

-- Create index on created_at for sorting
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- Add comments to table and columns for documentation
COMMENT ON TABLE users IS 'Stores user information for the User Management Application';
COMMENT ON COLUMN users.id IS 'Unique identifier for each user (UUID v4)';
COMMENT ON COLUMN users.name IS 'Full name of the user';
COMMENT ON COLUMN users.email IS 'Email address - must be unique';
COMMENT ON COLUMN users.password IS 'Hashed password using bcrypt';
COMMENT ON COLUMN users.age IS 'User age - must be 18 or older if provided';
COMMENT ON COLUMN users.role IS 'User role (default: user)';
COMMENT ON COLUMN users.created_at IS 'Timestamp when user was created';

-- Optional: Insert sample data for testing
-- Note: Passwords are hashed versions of 'password123'
-- INSERT INTO users (name, email, password, age, role) VALUES
-- ('John Doe', 'john@example.com', '$2b$10$YourHashedPasswordHere', 25, 'user'),
-- ('Jane Smith', 'jane@example.com', '$2b$10$YourHashedPasswordHere', 30, 'admin');
