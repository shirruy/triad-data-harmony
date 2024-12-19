import { DataSourceCard } from "@/components/DataSourceCard";
import { FirstSourceChart } from "@/components/FirstSourceChart";
import { SecondSourceStats } from "@/components/SecondSourceStats";
import { ThirdSourceMetrics } from "@/components/ThirdSourceMetrics";
import { UseQueryResult } from "@tanstack/react-query";

interface DashboardGridProps {
  firstSource: UseQueryResult<{ data: number[] }, Error>;
  secondSource: UseQueryResult<{
    users: number;
    activeNow: number;
    trend: string;
  }, Error>;
  thirdSource: UseQueryResult<{
    status: string;
    lastUpdate: string;
    metrics: { cpu: number; memory: number };
  }, Error>;
}

export const DashboardGrid = ({
  firstSource,
  secondSource,
  thirdSource,
}: DashboardGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DataSourceCard
        title="Time Series Data"
        isLoading={firstSource.isLoading}
        error={firstSource.error}
      >
        {firstSource.data && <FirstSourceChart data={firstSource.data.data} />}
      </DataSourceCard>

      <DataSourceCard
        title="User Statistics"
        isLoading={secondSource.isLoading}
        error={secondSource.error}
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
        error={thirdSource.error}
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
  );
};