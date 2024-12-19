import { motion } from "framer-motion";
import { AHTMetrics } from "@/components/aht/metrics/AHTMetrics";

export const MetricsOverview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.1
      }}
    >
      <AHTMetrics />
    </motion.div>
  );
};