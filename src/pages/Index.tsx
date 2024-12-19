import { useFirstSource, useSecondSource, useThirdSource } from "@/hooks/useDataSources";
import { DataSourceCard } from "@/components/DataSourceCard";
import { FirstSourceChart } from "@/components/FirstSourceChart";
import { SecondSourceStats } from "@/components/SecondSourceStats";
import { ThirdSourceMetrics } from "@/components/ThirdSourceMetrics";
import { Button } from "@/components/ui/button";
import { RefreshCw, LogOut } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const queryClient = useQueryClient();
  const { userData, signOut } = useAuth();
  const firstSource = useFirstSource();
  const secondSource = useSecondSource();
  const thirdSource = useThirdSource();

  const handleRefresh = () => {
    queryClient.invalidateQueries();
  };

  const canEdit = userData?.role === 'administrator' || userData?.role === 'analyst';

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Data Dashboard</h1>
            <p className="text-sm text-gray-500">Logged in as: {userData?.role}</p>
          </div>
          <div className="flex gap-2">
            {canEdit && (
              <Button onClick={handleRefresh} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh All
              </Button>
            )}
            <Button variant="outline" onClick={signOut} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DataSourceCard
            title="Time Series Data"
            isLoading={firstSource.isLoading}
            error={firstSource.error as Error}
          >
            {firstSource.data && <FirstSourceChart data={firstSource.data.data} />}
          </DataSourceCard>

          <DataSourceCard
            title="User Statistics"
            isLoading={secondSource.isLoading}
            error={secondSource.error as Error}
          >
            {secondSource.data && (
              <SecondSourceStats
                users={secondSource.data.users}
                activeNow={secondSource.data.activeNow}
                trend={secondSource.data.trend}
              />
            )}
          </DataSourceCard>

          <DataSourceCard
            title="System Metrics"
            isLoading={thirdSource.isLoading}
            error={thirdSource.error as Error}
          >
            {thirdSource.data && (
              <ThirdSourceMetrics
                status={thirdSource.data.status}
                lastUpdate={thirdSource.data.lastUpdate}
                metrics={thirdSource.data.metrics}
              />
            )}
          </DataSourceCard>
        </div>
      </div>
    </div>
  );
};

export default Index;