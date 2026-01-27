const supabase = require('../config/supabase');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

class UserService {
  async signup(userData) {
    try {
      const { name, email, password } = userData;

      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('email')
        .eq('email', email.toLowerCase().trim())
        .single();

      if (existingUser) {
        throw new Error('Email already registered');
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const newUser = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword
      };

      const { data, error } = await supabase
        .from('users')
        .insert([newUser])
        .select('id, name, email, created_at')
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, name, email, created_at')
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

  async deleteUser(userId) {
    try {
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .single();

      if (checkError || !existingUser) {
        throw new Error('User not found');
      }

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
