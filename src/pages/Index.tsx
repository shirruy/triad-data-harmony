import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TeamDashboard } from "@/components/team/TeamDashboard";
import { HistoricalTrend } from "@/components/aht/HistoricalTrend";
import { AHTMetrics } from "@/components/aht/metrics/AHTMetrics";
import { TeamCollaboration } from "@/components/collaboration/TeamCollaboration";
import { PerformanceMetrics } from "@/components/performance/PerformanceMetrics";
import { DataExport } from "@/components/export/DataExport";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg p-8">
          <AHTMetrics />
        </div>
        
        <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg p-8">
          <PerformanceMetrics />
        </div>

        <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg p-8">
          <TeamCollaboration />
        </div>
        
        <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg p-8">
          <HistoricalTrend />
        </div>
        
        <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg p-8">
          <TeamDashboard />
        </div>

        <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg p-8">
          <DataExport />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;