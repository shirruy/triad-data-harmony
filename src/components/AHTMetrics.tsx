import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export const AHTMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        title="Calls Offered"
        value="95,715"
      />
      <MetricCard
        title="Answered Calls"
        value="92,739"
      />
      <MetricCard
        title="Abandon Calls"
        value="2,976"
      />
    </div>
  );
};

const MetricCard = ({ title, value }: { title: string; value: string }) => (
  <Card className="bg-blue-600 text-white">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-white">{title}</CardTitle>
      <HelpCircle className="h-4 w-4 text-white/70" />
    </CardHeader>
    <CardContent>
      <div className="text-4xl font-bold">{value}</div>
    </CardContent>
  </Card>
);