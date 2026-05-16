import { apiRequest } from "@/services/api";
import { DEMO_USER_ID, mockTodos } from "@/services/mockData";
import type { TodoItem } from "@/types/api";

export const listTodos = async (userId = DEMO_USER_ID) => {
  try {
    return await apiRequest<TodoItem[]>(`/todos?userId=${userId}`);
  } catch (error) {
    return mockTodos;
  }
};

export const createTodo = async (title: string, description = "", userId = DEMO_USER_ID) => {
  return apiRequest<TodoItem>("/todos", {
    method: "POST",
    body: JSON.stringify({
      userId,
      title,
      description,
    }),
  });
};

export const updateTodo = async (todoId: string, payload: Partial<TodoItem>) => {
  return apiRequest<TodoItem>(`/todos/${todoId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

export const deleteTodo = async (todoId: string) => {
  return apiRequest<{ message: string }>(`/todos/${todoId}`, {
    method: "DELETE",
  });
};
