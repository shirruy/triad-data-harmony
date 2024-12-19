import { motion } from "framer-motion";
import { AHTCharts } from "@/components/AHTCharts";

export const MetricsCharts = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }}
    >
      <AHTCharts />
    </motion.div>
  );
};