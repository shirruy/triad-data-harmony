import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface InsightData {
  highestAHT: {
    team: string;
    score: number;
  };
  lowestAHT: {
    team: string;
    score: number;
  };
}

export const AHTInsight = () => {
  const [insightData, setInsightData] = useState<InsightData>({
    highestAHT: { team: "", score: 0 },
    lowestAHT: { team: "", score: 0 },
  });

  useEffect(() => {
    // Simulating data fetch - replace with actual API call
    const fetchInsightData = () => {
      setInsightData({
        highestAHT: { team: "Nudo, Stephany May", score: 1014.65 },
        lowestAHT: { team: "Faderog, Angelica", score: 383.04 },
      });
    };
    fetchInsightData();
  }, []);

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">AHT Insight</h3>
          <HelpCircle className="h-5 w-5 text-gray-400" />
        </div>
        <p className="mt-2 text-gray-700">
          The team with highest AHT is {insightData.highestAHT.team} with the score of{" "}
          {insightData.highestAHT.score.toLocaleString()}.
          The team with lowest AHT is {insightData.lowestAHT.team} with the score of{" "}
          {insightData.lowestAHT.score.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
};