import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Trash2, CheckCircle2, Circle, ClipboardList,
  Calendar, Clock, ListTodo, GripVertical, Pencil, Check, X, Loader2
} from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { MobileSidebarProvider } from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { Card } from "@/components/ui/card";
import { api, Todo } from "@/lib/api";

const DEMO_USER_ID = "demo-user-123";

const isToday = (ds: string | null) => {
  if (!ds) return false;
  const t = new Date(), d = new Date(ds);
  return d.getDate() === t.getDate() && d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear();
};

const isUpcoming = (ds: string | null) => {
  if (!ds || isToday(ds)) return false;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return new Date(ds) > today;
};

type Filter = "all" | "today" | "upcoming";

const VIEWS: { key: Filter; label: string; icon: React.ElementType }[] = [
  { key: "all", label: "All Tasks", icon: ListTodo },
  { key: "today", label: "Today", icon: Clock },
  { key: "upcoming", label: "Upcoming", icon: Calendar },
];

/* ─── TaskRow ────────────────────────────────────────────────────────────── */
interface TaskRowProps {
  todo: Todo;
  onToggle: (id: string, backendId?: string) => void;
  onDelete: (id: string, backendId?: string) => void;
  onEdit: (id: string, backendId: string, title: string, dueDate: string | null) => void;
}

const TaskRow = ({ todo, onToggle, onDelete, onEdit }: TaskRowProps) => {
  const [editing, setEditing] = useState(false);
  const [editVal, setEditVal] = useState(todo.title);
  const [editDate, setEditDate] = useState(todo.dueDate ?? "");

  const commit = () => {
    if (editVal.trim()) onEdit(todo.id!, todo._id!, editVal.trim(), editDate || null);
    setEditing(false);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className={`group flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 ${todo.completed
        ? "bg-muted/40 border-border/40 opacity-60"
        : "bg-card border-border hover:border-primary/30 hover:shadow-sm"
        }`}
    >
      <GripVertical className="h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors shrink-0" />

      <button onClick={() => onToggle(todo.id!, todo._id)} className="shrink-0 hover:scale-110 transition-transform">
        {todo.completed
          ? <CheckCircle2 className="h-5 w-5 text-primary" />
          : <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />}
      </button>

      {editing ? (
        <div className="flex flex-1 items-center gap-2">
          <input
            autoFocus
            value={editVal}
            onChange={(e) => setEditVal(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") setEditing(false); }}
            className="flex-1 bg-transparent border-b border-primary outline-none text-sm text-foreground"
          />
          <input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            className="text-xs text-muted-foreground bg-transparent outline-none"
          />
          <button onClick={commit} className="text-primary hover:text-primary/80"><Check className="h-4 w-4" /></button>
          <button onClick={() => setEditing(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
        </div>
      ) : (
        <div className="flex flex-1 items-center gap-3 min-w-0" onClick={() => !todo.completed && setEditing(true)}>
          <span className={`text-sm flex-1 truncate ${todo.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
            {todo.title}
          </span>
          {todo.dueDate && (
            <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${isToday(todo.dueDate)
              ? "bg-primary/10 text-primary font-medium"
              : isUpcoming(todo.dueDate)
                ? "bg-secondary text-muted-foreground"
                : "bg-destructive/10 text-destructive"
              }`}>
              {new Date(todo.dueDate).toLocaleDateString([], { month: "short", day: "numeric" })}
            </span>
          )}
        </div>
      )}

      {!editing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button onClick={() => setEditing(true)} className="p-1 text-muted-foreground hover:text-primary transition-colors">
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => onDelete(todo.id!, todo._id)} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </motion.li>
  );
};

/* ─── Main Page ───────────────────────────────────────────────────────────── */
const TodoPage = () => {
  const { user } = useUser();
  const userId = user?.id || DEMO_USER_ID;

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");

  const fetchTodos = useCallback(async () => {
    try {
      const data = await api.getTodos(userId);
      setTodos(data);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    try {
      const newTodo = await api.addTodo(userId, {
        id: Math.random().toString(36).slice(2),
        title: trimmed,
        completed: false,
        dueDate: dueDate || null,
        createdAt: Date.now(),
      });
      setTodos((prev) => [newTodo, ...prev]);
      setInput("");
      setDueDate("");
      toast.success("Task added");
    } catch (error) {
      toast.error("Failed to add task");
    }
  };

  const toggleTodo = async (id: string, backendId?: string) => {
    if (!backendId) return;
    const todo = todos.find(t => t._id === backendId);
    if (!todo) return;

    try {
      const updated = await api.updateTodo(userId, backendId, { completed: !todo.completed });
      setTodos(prev => prev.map(t => t._id === backendId ? updated : t));
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const deleteTodo = async (id: string, backendId?: string) => {
    if (!backendId) return;
    try {
      await api.deleteTodo(userId, backendId);
      setTodos(prev => prev.filter(t => t._id !== backendId));
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const editTodo = async (id: string, backendId: string, title: string, dueDate: string | null) => {
    try {
      const updated = await api.updateTodo(userId, backendId, { title, dueDate });
      setTodos(prev => prev.map(t => t._id === backendId ? updated : t));
      toast.success("Task updated");
    } catch (error) {
      toast.error("Failed to edit task");
    }
  };

  const filtered = todos.filter((t) => {
    if (filter === "today") return isToday(t.dueDate);
    if (filter === "upcoming") return isUpcoming(t.dueDate);
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const todayCount = todos.filter((t) => isToday(t.dueDate) && !t.completed).length;
  const upcomingCount = todos.filter((t) => isUpcoming(t.dueDate) && !t.completed).length;
  const counts: Record<Filter, number> = { all: activeCount, today: todayCount, upcoming: upcomingCount };

  return (
    <MobileSidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardTopbar />
          <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="max-w-5xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <ClipboardList className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-bold text-foreground">My Tasks</h1>
                  <p className="text-sm text-muted-foreground">
                    {activeCount} active {activeCount === 1 ? "task" : "tasks"} remaining
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                <Card className="p-4 shadow-card h-fit lg:col-span-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-1">Views</p>
                  <nav className="space-y-1">
                    {VIEWS.map(({ key, label, icon: Icon }) => (
                      <button
                        key={key}
                        onClick={() => setFilter(key)}
                        className={`w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${filter === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon className="h-4 w-4 shrink-0" />
                          {label}
                        </span>
                        {counts[key] > 0 && (
                          <span className={`text-xs rounded-full px-1.5 py-0.5 font-semibold ${filter === key ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
                            {counts[key]}
                          </span>
                        )}
                      </button>
                    ))}
                  </nav>
                </Card>

                <div className="lg:col-span-3 space-y-4">
                  <Card className="p-4 shadow-card">
                    <div className="flex items-center gap-3">
                      <Plus className="h-5 w-5 text-muted-foreground shrink-0" />
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addTodo()}
                        placeholder="Add a new task..."
                        className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                      />
                      <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="text-xs text-muted-foreground bg-transparent outline-none cursor-pointer hidden sm:block"
                      />
                      <button onClick={addTodo} disabled={!input.trim()} className="shrink-0 bg-primary text-primary-foreground rounded-lg px-4 py-1.5 text-sm font-semibold disabled:opacity-40 hover:bg-primary/90 transition-colors">
                        Add
                      </button>
                    </div>
                  </Card>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-heading text-sm font-semibold text-foreground">
                        {VIEWS.find(v => v.key === filter)?.label}
                      </h2>
                      <span className="text-xs text-muted-foreground">{filtered.length} tasks</span>
                    </div>

                    <ul className="space-y-2">
                      <AnimatePresence initial={false}>
                        {loading ? (
                          <div className="flex justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary/30" />
                          </div>
                        ) : filtered.length === 0 ? (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16">
                            <CheckCircle2 className="h-12 w-12 text-muted-foreground/20 mb-3" />
                            <p className="text-sm font-medium text-muted-foreground text-center">No tasks found here.</p>
                          </motion.div>
                        ) : (
                          filtered.map((todo) => (
                            <TaskRow key={todo._id || todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
                          ))
                        )}
                      </AnimatePresence>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Copyright Footer */}
              <footer className="py-8 mt-12 border-t border-border/40 text-center">
                <p className="text-xs text-muted-foreground font-medium opacity-60">
                  &copy; 2024 Placement SAHAY | @24071A05G2
                </p>
              </footer>
            </motion.div>
          </main>
        </div>
      </div>
    </MobileSidebarProvider>
  );
};

export default TodoPage;
