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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/total-calls" element={
                <DashboardLayout>
                  <TotalCallsView />
                </DashboardLayout>
              } />
              <Route path="/agent-performance" element={
                <DashboardLayout>
                  <AgentPerformance />
                </DashboardLayout>
              } />
              <Route path="/wave-performance" element={
                <DashboardLayout>
                  <WavePerformance />
                </DashboardLayout>
              } />
              <Route path="/team-performance" element={
                <DashboardLayout>
                  <TeamDashboard />
                </DashboardLayout>
              } />
              <Route path="/settings" element={
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              } />
              <Route path="/profile" element={
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
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