import { PhoneCall, PhoneForwarded, PhoneOff } from "lucide-react";
import { AHTMetricsCard } from "./AHTMetricsCard";
import { useAHTMetrics } from "@/hooks/aht/useAHTMetrics";

export const AHTMetrics = () => {
  const { metrics } = useAHTMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <AHTMetricsCard
        title="Calls Offered"
        value={metrics.callsOffered.toLocaleString()}
        icon={PhoneCall}
        color="blue"
      />
      <AHTMetricsCard
        title="Answered Calls"
        value={metrics.answeredCalls.toLocaleString()}
        icon={PhoneForwarded}
        color="green"
      />
      <AHTMetricsCard
        title="Abandon Calls"
        value={metrics.abandonCalls.toLocaleString()}
        icon={PhoneOff}
        color="red"
      />
    </div>
  );
};