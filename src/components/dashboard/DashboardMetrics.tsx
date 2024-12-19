import { MetricsInsight } from "./metrics/MetricsInsight";
import { MetricsOverview } from "./metrics/MetricsOverview";
import { MetricsCharts } from "./metrics/MetricsCharts";

export const DashboardMetrics = () => {
  return (
    <>
      <MetricsInsight />
      <MetricsOverview />
      <MetricsCharts />
    </>
  );
};