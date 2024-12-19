import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export const AHTInsight = () => {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">AHT Insight</h3>
          <HelpCircle className="h-5 w-5 text-gray-400" />
        </div>
        <p className="mt-2 text-gray-700">
          The team with highest AHT is Nudo, Stephany May with the score of 1,014.65.
          The team with lowest AHT is Faderog, Angelica with the score of 383.04
        </p>
      </CardContent>
    </Card>
  );
};