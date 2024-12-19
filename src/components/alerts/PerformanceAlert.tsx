import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";

interface PerformanceAlertProps {
  type: string;
  message: string;
  threshold: number;
}

export const PerformanceAlert = ({ type, message, threshold }: PerformanceAlertProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Alert variant="destructive" className="bg-destructive/20 border-destructive/50">
        <Bell className="h-4 w-4" />
        <AlertTitle className="ml-2">{type}</AlertTitle>
        <AlertDescription className="ml-2">
          {message} (Threshold: {threshold})
        </AlertDescription>
      </Alert>
    </motion.div>
  );
};