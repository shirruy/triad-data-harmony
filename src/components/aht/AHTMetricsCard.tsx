import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface MetricsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: "blue" | "green" | "red";
  subtitle?: string;
}

export const AHTMetricsCard = ({ title, value, icon: Icon, color, subtitle }: MetricsCardProps) => {
  const colorClasses = {
    blue: "from-blue-600/20 to-blue-700/20 text-blue-500",
    green: "from-emerald-600/20 to-emerald-700/20 text-emerald-500",
    red: "from-rose-600/20 to-rose-700/20 text-rose-500"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`bg-gradient-to-br ${colorClasses[color]} border-0 shadow-xl hover:scale-105 transition-transform duration-300`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <Icon className="h-5 w-5 opacity-70" />
        </CardHeader>
        <CardContent>
          <div className="mt-2">
            <span className="text-4xl font-bold tracking-tight">{value}</span>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};