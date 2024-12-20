import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TeamDashboard } from "@/components/team/TeamDashboard";
import { HistoricalTrend } from "@/components/aht/HistoricalTrend";
import { AHTMetrics } from "@/components/aht/metrics/AHTMetrics";
import { TeamCollaboration } from "@/components/collaboration/TeamCollaboration";
import { PerformanceMetrics } from "@/components/performance/PerformanceMetrics";
import { AHTAgentView } from "@/components/aht/AHTAgentView";
import { AHTDateRangeSelector } from "@/components/aht/AHTDateRangeSelector";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  // Check if data exists in the tables
  const { isLoading: isDataLoading } = useQuery({
    queryKey: ['check-data-exists'],
    queryFn: async () => {
      const [metricsResult, agentResult, teamResult] = await Promise.all([
        supabase.from('aht_metrics').select('count').single(),
        supabase.from('aht_agent_data').select('count').single(),
        supabase.from('aht_team_data').select('count').single()
      ]);

      if (metricsResult.error || agentResult.error || teamResult.error) {
        console.error('Error checking data:', { metricsResult, agentResult, teamResult });
        toast.error('Error checking data availability');
        return false;
      }

      return true;
    }
  });

  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      toast.success(`Data filtered from ${format(start, 'MMM d, yyyy')} to ${format(end, 'MMM d, yyyy')}`);
    }
  };

  if (isDataLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-4 sm:space-y-8">
          <Card className="p-6">
            <Skeleton className="h-8 w-full" />
          </Card>
          <Card className="p-6">
            <Skeleton className="h-32 w-full" />
          </Card>
          <Card className="p-6">
            <Skeleton className="h-48 w-full" />
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-8">
        <div className="mb-6">
          <AHTDateRangeSelector onDateRangeChange={handleDateRangeChange} />
        </div>

        <div className="p-2 sm:p-8">
          <AHTMetrics startDate={startDate} endDate={endDate} />
        </div>
        
        <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg p-4 sm:p-8">
          <AHTAgentView startDate={startDate} endDate={endDate} />
        </div>
        
        <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg p-4 sm:p-8">
          <PerformanceMetrics startDate={startDate} endDate={endDate} />
        </div>

        <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg p-4 sm:p-8">
          <TeamCollaboration startDate={startDate} endDate={endDate} />
        </div>
        
        <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg p-4 sm:p-8">
          <HistoricalTrend startDate={startDate} endDate={endDate} />
        </div>
        
        <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg p-4 sm:p-8">
          <TeamDashboard startDate={startDate} endDate={endDate} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;