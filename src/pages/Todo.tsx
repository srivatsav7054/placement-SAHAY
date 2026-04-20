import { useState } from "react";
import DashboardSidebar, { MobileSidebarProvider } from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { useTodos } from "@/hooks/useTodos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";

const Todo = () => {
  const { data, isLoading, isError, createTodoMutation, updateTodoMutation, deleteTodoMutation } = useTodos();
  const [draft, setDraft] = useState("");

  return (
    <MobileSidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardTopbar />
          <main className="flex-1 overflow-y-auto px-4 md:px-6 py-3 md:py-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>User To-do List</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex gap-3">
                  <Input
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Add a placement task..."
                  />
                  <Button
                    onClick={async () => {
                      if (!draft.trim()) return;
                      await createTodoMutation.mutateAsync({ title: draft.trim() });
                      setDraft("");
                    }}
                    disabled={createTodoMutation.isPending || !draft.trim()}
                  >
                    {createTodoMutation.isPending ? "Adding..." : "Add"}
                  </Button>
                </div>

                {isLoading && <p className="text-sm text-muted-foreground">Loading to-dos...</p>}
                {isError && !data && <p className="text-sm text-destructive">To-do data could not be loaded.</p>}

                <div className="space-y-3">
                  {(data || []).map((todo) => (
                    <div
                      key={todo._id}
                      className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={(checked) =>
                            updateTodoMutation.mutate({
                              todoId: todo._id,
                              payload: { completed: Boolean(checked) },
                            })
                          }
                        />
                        <div>
                          <p className={`text-sm font-medium ${todo.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                            {todo.title}
                          </p>
                          {todo.description && <p className="text-xs text-muted-foreground mt-1">{todo.description}</p>}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTodoMutation.mutate(todo._id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </MobileSidebarProvider>
  );
};

export default Todo;
