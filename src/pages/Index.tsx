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
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

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
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
          <AHTDateRangeSelector onDateRangeChange={handleDateRangeChange} />
        </div>

        <div className="p-4">
          <AHTMetrics startDate={startDate} endDate={endDate} />
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 lg:grid-cols-4 h-auto gap-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="historical">Historical</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <Card className="p-6">
              <AHTAgentView startDate={startDate} endDate={endDate} />
            </Card>
            <Card className="p-6">
              <PerformanceMetrics startDate={startDate} endDate={endDate} />
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <Card className="p-6">
              <TeamCollaboration startDate={startDate} endDate={endDate} />
            </Card>
          </TabsContent>

          <TabsContent value="team" className="mt-6">
            <Card className="p-6">
              <TeamDashboard startDate={startDate} endDate={endDate} />
            </Card>
          </TabsContent>

          <TabsContent value="historical" className="mt-6">
            <Card className="p-6">
              <HistoricalTrend startDate={startDate} endDate={endDate} />
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  );
};

export default Index;