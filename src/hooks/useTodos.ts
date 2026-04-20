import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, listTodos, updateTodo } from "@/services/todoService";
import { DEMO_USER_ID } from "@/services/mockData";
import type { TodoItem } from "@/types/api";

export const useTodos = (userId = DEMO_USER_ID) => {
  const queryClient = useQueryClient();

  const todoQuery = useQuery({
    queryKey: ["todos", userId],
    queryFn: () => listTodos(userId),
  });

  const refreshTodos = () => queryClient.invalidateQueries({ queryKey: ["todos", userId] });

  return {
    ...todoQuery,
    createTodoMutation: useMutation({
      mutationFn: ({ title, description }: { title: string; description?: string }) =>
        createTodo(title, description, userId),
      onSuccess: refreshTodos,
    }),
    updateTodoMutation: useMutation({
      mutationFn: ({ todoId, payload }: { todoId: string; payload: Partial<TodoItem> }) =>
        updateTodo(todoId, payload),
      onSuccess: refreshTodos,
    }),
    deleteTodoMutation: useMutation({
      mutationFn: (todoId: string) => deleteTodo(todoId),
      onSuccess: refreshTodos,
    }),
  };
};
