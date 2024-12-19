import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

interface AHTBarChartProps {
  data: Array<{ name?: string; wave?: string; value: number }>;
  title: string;
  layout?: "vertical" | "horizontal";
}

export const AHTBarChart = ({ data, title, layout = "horizontal" }: AHTBarChartProps) => {
  return (
    <Card className="lg:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <HelpCircle className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart 
            data={data} 
            layout={layout}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {layout === "vertical" ? (
              <>
                <XAxis type="number" />
                <YAxis dataKey={data[0]?.wave ? "wave" : "name"} type="category" width={80} />
              </>
            ) : (
              <>
                <XAxis dataKey={data[0]?.wave ? "wave" : "name"} />
                <YAxis />
              </>
            )}
            <Tooltip />
            <Bar dataKey="value" fill="#0088FE" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};