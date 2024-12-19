import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TeamDashboard } from "@/components/team/TeamDashboard";
import { HistoricalTrend } from "@/components/aht/HistoricalTrend";
import { AHTMetrics } from "@/components/aht/metrics/AHTMetrics";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg p-8">
          <AHTMetrics />
        </div>
        
        <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg p-8">
          <HistoricalTrend />
        </div>
        
        <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg p-8">
          <TeamDashboard />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;