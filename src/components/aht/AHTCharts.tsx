import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AHTBarChart } from "./charts/AHTBarChart";
import { AHTPieChart } from "./charts/AHTPieChart";

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
    fetchData();

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <AHTBarChart 
        data={waveData}
        title="AHT Per Wave"
        layout="vertical"
      />
      <AHTBarChart 
        data={teamData}
        title="AHT per Team Lead"
      />
      <AHTPieChart 
        data={teamData}
        title="AHT per LOB"
      />
    </div>
  );
};