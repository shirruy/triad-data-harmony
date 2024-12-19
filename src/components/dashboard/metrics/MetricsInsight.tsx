import { motion } from "framer-motion";
import { AHTInsight } from "@/components/AHTInsight";

export const MetricsInsight = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
      <AHTInsight />
    </motion.div>
  );
};