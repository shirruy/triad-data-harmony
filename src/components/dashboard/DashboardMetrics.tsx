import { motion } from "framer-motion";
import { AHTInsight } from "@/components/AHTInsight";
import { AHTMetrics } from "@/components/AHTMetrics";
import { AHTCharts } from "@/components/AHTCharts";

export const DashboardMetrics = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <>
      <motion.div variants={itemVariants}>
        <AHTInsight />
      </motion.div>

      <motion.div variants={itemVariants}>
        <AHTMetrics />
      </motion.div>

      <motion.div variants={itemVariants}>
        <AHTCharts />
      </motion.div>
    </>
  );
};