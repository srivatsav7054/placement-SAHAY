import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Profile from "./pages/Profile.tsx";
import ResumeBuilder from "./pages/ResumeBuilder.tsx";
import Analysis from "./pages/Analysis.tsx";
import Settings from "./pages/Settings.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Resumes from "./pages/Resumes.tsx";
import Community from "./pages/Community.tsx";
<<<<<<< HEAD
import TodoPage from "./pages/TodoPage.tsx";
=======
import Weather from "./pages/Weather.tsx";
import Todo from "./pages/Todo.tsx";
>>>>>>> a8ce0f73241742663a3408809d1249ce577c31d8
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login/*" element={<Login />} />
          <Route path="/signup/*" element={<Signup />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/resumes" element={<ProtectedRoute><Resumes /></ProtectedRoute>} />
          <Route path="/resume-builder" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
          <Route path="/analysis" element={<ProtectedRoute><Analysis /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
<<<<<<< HEAD
          <Route path="/todo" element={<ProtectedRoute><TodoPage /></ProtectedRoute>} />
=======
          <Route path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
          <Route path="/todo" element={<ProtectedRoute><Todo /></ProtectedRoute>} />
>>>>>>> a8ce0f73241742663a3408809d1249ce577c31d8
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
