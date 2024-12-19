import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TeamDashboard } from "@/components/team/TeamDashboard";
import { HistoricalTrend } from "@/components/aht/HistoricalTrend";
import { AHTMetrics } from "@/components/aht/metrics/AHTMetrics";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="bg-card/40 backdrop-blur-sm rounded-lg p-6">
          <AHTMetrics />
        </div>
        
        <div className="bg-card/40 backdrop-blur-sm rounded-lg p-6">
          <HistoricalTrend />
        </div>
        
        <div className="bg-card/40 backdrop-blur-sm rounded-lg p-6">
          <TeamDashboard />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;