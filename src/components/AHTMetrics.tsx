import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface MetricsData {
  callsOffered: number;
  answeredCalls: number;
  abandonCalls: number;
}

export const AHTMetrics = () => {
  const [metrics, setMetrics] = useState<MetricsData>({
    callsOffered: 0,
    answeredCalls: 0,
    abandonCalls: 0,
  });

  useEffect(() => {
    // Simulating data fetch - replace with actual API call
    const fetchMetrics = () => {
      setMetrics({
        callsOffered: 95715,
        answeredCalls: 92739,
        abandonCalls: 2976,
      });
    };
    fetchMetrics();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        title="Calls Offered"
        value={metrics.callsOffered.toLocaleString()}
      />
      <MetricCard
        title="Answered Calls"
        value={metrics.answeredCalls.toLocaleString()}
      />
      <MetricCard
        title="Abandon Calls"
        value={metrics.abandonCalls.toLocaleString()}
      />
    </div>
  );
};

const MetricCard = ({ title, value }: { title: string; value: string }) => (
  <Card className="bg-blue-600 text-white">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-white">{title}</CardTitle>
      <HelpCircle className="h-4 w-4 text-white/70" />
    </CardHeader>
    <CardContent>
      <div className="text-4xl font-bold">{value}</div>
    </CardContent>
  </Card>
);