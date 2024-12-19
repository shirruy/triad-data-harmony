import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface MetricsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: "blue" | "green" | "red";
}

export const AHTMetricsCard = ({ title, value, icon: Icon, color }: MetricsCardProps) => {
  const colorClasses = {
    blue: "bg-blue-600 text-white",
    green: "bg-emerald-600 text-white",
    red: "bg-rose-600 text-white"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`${colorClasses[color]} shadow-lg hover:scale-105 transition-transform duration-300`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-white/90">{title}</CardTitle>
          <Icon className="h-5 w-5 text-white/70" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{value}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
};