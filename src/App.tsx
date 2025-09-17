import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import CVGenerator from "./pages/CVGenerator";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            
            {/* Protected routes with layout */}
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            <Route path="/jobs" element={<Layout><Jobs /></Layout>} />
            <Route path="/cv-generator" element={<Layout><CVGenerator /></Layout>} />
            <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
