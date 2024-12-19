import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

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
    // Initial fetch
    fetchInsightData();

    // Set up real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'aht_team_data'
        },
        () => {
          fetchInsightData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchInsightData = async () => {
    const { data, error } = await supabase
      .from('aht_team_data')
      .select('name, value')
      .order('value', { ascending: true });

    if (error) {
      console.error('Error fetching insight data:', error);
      return;
    }

    if (data && data.length > 0) {
      setInsightData({
        highestAHT: {
          team: data[data.length - 1].name,
          score: data[data.length - 1].value,
        },
        lowestAHT: {
          team: data[0].name,
          score: data[0].value,
        },
      });
    }
  };

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