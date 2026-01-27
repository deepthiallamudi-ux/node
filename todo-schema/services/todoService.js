const supabase = require('../config/supabase');

class TodoService {
  async createTodo(todoData) {
    try {
      const { title, description, userId } = todoData;

      const { data: userExists, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .single();

      if (userError || !userExists) {
        throw new Error('User not found');
      }

      const newTodo = {
        title: title.trim(),
        description: description ? description.trim() : null,
        user_id: userId,
        is_completed: false
      };

      const { data, error } = await supabase
        .from('todos')
        .insert([newTodo])
        .select('id, title, description, is_completed, user_id, created_at')
        .single();

      if (error) {
        if (error.code === '23503') {
          throw new Error('Foreign key violation: Invalid user ID');
        }
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUserTodos(userId) {
    try {
      const { data: userExists, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .single();

      if (userError || !userExists) {
        throw new Error('User not found');
      }

      const { data, error } = await supabase
        .from('todos')
        .select('id, title, description, is_completed, user_id, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateTodo(todoId, updateData) {
    try {
      const { data: existingTodo, error: checkError } = await supabase
        .from('todos')
        .select('id')
        .eq('id', todoId)
        .single();

      if (checkError || !existingTodo) {
        throw new Error('Todo not found');
      }

      const dataToUpdate = {};

      if (updateData.title) {
        dataToUpdate.title = updateData.title.trim();
      }

      if (updateData.description !== undefined) {
        dataToUpdate.description = updateData.description ? updateData.description.trim() : null;
      }

      if (updateData.is_completed !== undefined) {
        dataToUpdate.is_completed = updateData.is_completed;
      }

      const { data, error } = await supabase
        .from('todos')
        .update(dataToUpdate)
        .eq('id', todoId)
        .select('id, title, description, is_completed, user_id, created_at')
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteTodo(todoId) {
    try {
      const { data: existingTodo, error: checkError } = await supabase
        .from('todos')
        .select('id')
        .eq('id', todoId)
        .single();

      if (checkError || !existingTodo) {
        throw new Error('Todo not found');
      }

      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', todoId);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TodoService();
