import { PhoneCall, PhoneForwarded, PhoneOff } from "lucide-react";
import { AHTMetricCard } from "./AHTMetricCard";
import { useAHTMetrics } from "@/hooks/aht/useAHTMetrics";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AHTMetricsProps {
  startDate?: Date;
  endDate?: Date;
}

export const AHTMetrics = ({ startDate, endDate }: AHTMetricsProps) => {
  const { metrics } = useAHTMetrics(startDate, endDate);
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const handleMetricClick = (type: 'total' | 'answered' | 'abandoned') => {
    switch(type) {
      case 'total':
        navigate('/total-calls');
        toast.info("Viewing total calls breakdown by team and agent");
        break;
      case 'answered':
        navigate('/agent-performance');
        toast.success("Viewing answered calls by agent");
        break;
      case 'abandoned':
        navigate('/wave-performance');
        toast.warning("Viewing abandoned calls by wave");
        break;
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
        onClick={() => handleMetricClick('total')}
      />
      <AHTMetricCard
        title="Answered"
        value={metrics.answeredCalls.toLocaleString()}
        icon={PhoneForwarded}
        color="green"
        subtitle="Successfully handled"
        onClick={() => handleMetricClick('answered')}
      />
      <AHTMetricCard
        title="Abandoned"
        value={metrics.abandonCalls.toLocaleString()}
        icon={PhoneOff}
        color="red"
        subtitle="Missed opportunities"
        onClick={() => handleMetricClick('abandoned')}
      />
    </motion.div>
  );
};