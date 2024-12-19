import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface WaveData {
  wave: string;
  value: number;
}

interface TeamData {
  name: string;
  value: number;
}

export const AHTCharts = () => {
  const [waveData, setWaveData] = useState<WaveData[]>([]);
  const [teamData, setTeamData] = useState<TeamData[]>([]);

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up real-time subscription for wave data
    const waveChannel = supabase
      .channel('wave-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'aht_wave_data'
        },
        () => {
          fetchWaveData();
        }
      )
      .subscribe();

    // Set up real-time subscription for team data
    const teamChannel = supabase
      .channel('team-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'aht_team_data'
        },
        () => {
          fetchTeamData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(waveChannel);
      supabase.removeChannel(teamChannel);
    };
  }, []);

  const fetchData = async () => {
    await Promise.all([fetchWaveData(), fetchTeamData()]);
  };

  const fetchWaveData = async () => {
    const { data, error } = await supabase
      .from('aht_wave_data')
      .select('wave, value')
      .order('value', { ascending: false });

    if (error) {
      console.error('Error fetching wave data:', error);
      return;
    }

    if (data) {
      setWaveData(data);
    }
  };

  const fetchTeamData = async () => {
    const { data, error } = await supabase
      .from('aht_team_data')
      .select('name, value')
      .order('value', { ascending: true });

    if (error) {
      console.error('Error fetching team data:', error);
      return;
    }

    if (data) {
      setTeamData(data);
    }
  };

  const COLORS = ['#00C49F', '#0088FE', '#FFBB28'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">AHT Per Wave</CardTitle>
          <HelpCircle className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={waveData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="wave" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="value" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">AHT per Team Lead</CardTitle>
          <HelpCircle className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={teamData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">AHT per LOB</CardTitle>
          <HelpCircle className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={teamData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {teamData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};