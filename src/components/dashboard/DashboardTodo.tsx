import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, CheckCircle2, Circle, ClipboardList, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useUser } from "@clerk/clerk-react";
import { api, Todo } from "@/lib/api";
import { toast } from "sonner";

/* ─── Helpers ────────────────────────────────────────────────────────────── */
const DEMO_USER_ID = "demo-user-123";

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/* ─── Filter tabs ────────────────────────────────────────────────────────── */
type Filter = "all" | "active" | "done";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "done", label: "Done" },
];

/* ─── Component ───────────────────────────────────────────────────────────── */
const DashboardTodo = () => {
  const { user } = useUser();
  const userId = user?.id || DEMO_USER_ID;

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  // Load from backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await api.getTodos(userId);
        setTodos(data);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
        toast.error("Could not load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [userId]);

  const addTodo = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    
    const newTodo = {
      id: genId(),
      title: trimmed,
      completed: false,
      dueDate: dueDate || null,
      createdAt: Date.now(),
    };

    try {
      const saved = await api.addTodo(userId, newTodo);
      setTodos((prev) => [saved, ...prev]);
      setInput("");
      setDueDate("");
    } catch (error) {
      toast.error("Failed to add task");
    }
  }, [input, dueDate, userId]);

  const toggleTodo = useCallback(async (id: string, backendId?: string) => {
    if (!backendId) return;
    
    const todo = todos.find(t => t._id === backendId);
    if (!todo) return;

    try {
      const updated = await api.updateTodo(userId, backendId, { completed: !todo.completed });
      setTodos((prev) =>
        prev.map((t) => (t._id === backendId ? updated : t))
      );
    } catch (error) {
      toast.error("Failed to update task");
    }
  }, [todos, userId]);

  const deleteTodo = useCallback(async (backendId?: string) => {
    if (!backendId) return;
    try {
      await api.deleteTodo(userId, backendId);
      setTodos((prev) => prev.filter((t) => t._id !== backendId));
    } catch (error) {
      toast.error("Failed to delete task");
    }
  }, [userId]);

  const clearCompleted = async () => {
    const completed = todos.filter(t => t.completed && t._id);
    try {
      await Promise.all(completed.map(t => api.deleteTodo(userId, t._id!)));
      setTodos(prev => prev.filter(t => !t.completed));
      toast.success("Cleared completed tasks");
    } catch (error) {
      toast.error("Failed to clear some tasks");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") addTodo();
  };

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "done") return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.55 }}
    >
      <Card className="p-5 shadow-card flex flex-col h-full min-h-[400px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-primary" />
            <h3 className="font-heading text-base font-semibold text-foreground">
              My Tasks
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {loading && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
            {activeCount > 0 && (
              <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-2 py-0.5">
                {activeCount} pending
              </span>
            )}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-4 bg-muted rounded-lg p-1">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex-1 text-xs font-medium py-1 rounded-md transition-all duration-200 ${
                filter === key
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 mb-4 p-2 rounded-lg border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-0 transition-all">
          <Plus className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a task..."
            className="flex-1 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            title="Due date"
            className="text-xs text-muted-foreground bg-transparent outline-none cursor-pointer"
          />
          <button
            onClick={addTodo}
            disabled={!input.trim() || loading}
            className="shrink-0 bg-primary text-primary-foreground rounded-md px-2.5 py-1 text-xs font-semibold disabled:opacity-40 hover:bg-primary/90 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Task list */}
        <ul className="space-y-2 overflow-y-auto max-h-52 flex-1 pr-0.5">
          <AnimatePresence initial={false}>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary/30" />
              </div>
            ) : filtered.length === 0 ? (
              <motion.li
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <CheckCircle2 className="h-8 w-8 text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {filter === "done"
                    ? "No completed tasks yet."
                    : "No tasks here. You're all caught up!"}
                </p>
              </motion.li>
            ) : (
              filtered.map((todo) => (
                <motion.li
                  key={todo._id || todo.id}
                  layout
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                  className={`group flex items-center gap-3 p-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                    todo.completed
                      ? "bg-muted/50 border-border/50 opacity-70"
                      : "bg-card border-border hover:border-primary/30 hover:shadow-sm"
                  }`}
                  onClick={() => toggleTodo(todo.id, todo._id)}
                >
                  {/* Checkbox */}
                  <div
                    className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {todo.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : (
                      <Circle className="h-4 w-4" />
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-sm block truncate ${
                        todo.completed
                          ? "line-through text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {todo.title}
                    </span>
                    {todo.dueDate && (
                      <span className="text-xs text-muted-foreground">
                        {new Date(todo.dueDate).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
                  </div>

                  {/* Delete */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTodo(todo._id);
                    }}
                    className="shrink-0 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </motion.li>
              ))
            )}
          </AnimatePresence>
        </ul>

        {/* Footer clear completed */}
        {!loading && todos.some((t) => t.completed) && filter !== "active" && (
          <button
            onClick={clearCompleted}
            className="mt-3 text-xs text-muted-foreground hover:text-destructive transition-colors text-right"
          >
            Clear completed
          </button>
        )}
      </Card>
    </motion.div>
  );
};

export default DashboardTodo;
