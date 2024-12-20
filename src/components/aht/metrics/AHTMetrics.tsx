import { PhoneCall, PhoneForwarded, PhoneOff } from "lucide-react";
import { AHTMetricCard } from "./AHTMetricCard";
import { useAHTMetrics } from "@/hooks/aht/useAHTMetrics";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ReloadIcon } from "@radix-ui/react-icons";

interface AHTMetricsProps {
  startDate?: Date;
  endDate?: Date;
}

export const AHTMetrics = ({ startDate, endDate }: AHTMetricsProps) => {
  const { metrics, isLoading, error, refetch } = useAHTMetrics(startDate, endDate);
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

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertDescription className="flex items-center justify-between">
          <span>Error loading metrics data. Please try again.</span>
          <button 
            onClick={() => refetch()} 
            className="flex items-center gap-2 text-sm underline"
          >
            <ReloadIcon className="h-4 w-4" />
            Retry
          </button>
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-card/50 animate-pulse rounded-lg" />
        ))}
      </motion.div>
    );
  }

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