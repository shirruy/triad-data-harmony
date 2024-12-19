import { PhoneCall, PhoneForwarded, PhoneOff } from "lucide-react";
import { AHTMetricCard } from "./AHTMetricCard";
import { useAHTMetrics } from "@/hooks/aht/useAHTMetrics";
import { motion } from "framer-motion";

export const AHTMetrics = () => {
  const { metrics } = useAHTMetrics();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
    >
      <AHTMetricCard
        title="Total Calls"
        value={metrics.callsOffered.toLocaleString()}
        icon={PhoneCall}
        color="blue"
        subtitle="Offered calls today"
      />
      <AHTMetricCard
        title="Answered"
        value={metrics.answeredCalls.toLocaleString()}
        icon={PhoneForwarded}
        color="green"
        subtitle="Successfully handled"
      />
      <AHTMetricCard
        title="Abandoned"
        value={metrics.abandonCalls.toLocaleString()}
        icon={PhoneOff}
        color="red"
        subtitle="Missed opportunities"
      />
    </motion.div>
  );
};