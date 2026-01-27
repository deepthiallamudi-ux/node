const supabase = require('../config/supabase');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

class UserService {
  // Create a new user
  async createUser(userData) {
    try {
      const { name, email, password, age, role } = userData;

      // Check if email already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single();

      if (existingUser) {
        throw new Error('Email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      // Prepare user data
      const newUser = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        age: age || null,
        role: role || 'user'
      };

      // Insert user into database
      const { data, error } = await supabase
        .from('users')
        .insert([newUser])
        .select('id, name, email, age, role, created_at')
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Get all users
  async getAllUsers() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, name, email, age, role, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Get user by ID
  async getUserById(userId) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, name, email, age, role, created_at')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('User not found');
        }
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Update user
  async updateUser(userId, updateData) {
    try {
      // Check if user exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .single();

      if (checkError || !existingUser) {
        throw new Error('User not found');
      }

      // If email is being updated, check for duplicates
      if (updateData.email) {
        const { data: emailCheck } = await supabase
          .from('users')
          .select('id, email')
          .eq('email', updateData.email.toLowerCase().trim())
          .single();

        if (emailCheck && emailCheck.id !== userId) {
          throw new Error('Email already exists');
        }
      }

      // Prepare update data
      const dataToUpdate = {};

      if (updateData.name) {
        dataToUpdate.name = updateData.name.trim();
      }

      if (updateData.email) {
        dataToUpdate.email = updateData.email.toLowerCase().trim();
      }

      if (updateData.password) {
        dataToUpdate.password = await bcrypt.hash(updateData.password, SALT_ROUNDS);
      }

      if (updateData.age !== undefined) {
        dataToUpdate.age = updateData.age;
      }

      if (updateData.role) {
        dataToUpdate.role = updateData.role;
      }

      // Update user in database
      const { data, error } = await supabase
        .from('users')
        .update(dataToUpdate)
        .eq('id', userId)
        .select('id, name, email, age, role, created_at')
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Delete user
  async deleteUser(userId) {
    try {
      // Check if user exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .single();

      if (checkError || !existingUser) {
        throw new Error('User not found');
      }

      // Delete user
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
