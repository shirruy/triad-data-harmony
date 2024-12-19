import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TeamDashboard } from "@/components/team/TeamDashboard";
import { HistoricalTrend } from "@/components/aht/HistoricalTrend";
import { AHTMetrics } from "@/components/aht/metrics/AHTMetrics";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <AHTMetrics />
        <HistoricalTrend />
        <TeamDashboard />
      </div>
    </DashboardLayout>
  );
};

export default Index;