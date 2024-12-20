import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { TotalCallsView } from "./components/aht/TotalCallsView";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";
import { AgentPerformance } from "@/components/performance/AgentPerformance";
import { WavePerformance } from "@/components/performance/WavePerformance";
import { TeamDashboard } from "@/components/team/TeamDashboard";
import { Settings } from "@/components/settings/Settings";
import { Profile } from "@/components/profile/Profile";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: true
    },
  },
});

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" attribute="class">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/total-calls" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <TotalCallsView />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/agent-performance" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <AgentPerformance />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/wave-performance" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <WavePerformance />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/team-performance" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <TeamDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Settings />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Profile />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
            </Routes>
            <Toaster position="top-right" />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;