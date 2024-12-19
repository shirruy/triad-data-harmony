import { WaveData, TeamData } from "@/hooks/aht/useChartsData";
import { AHTBarChart } from "./AHTBarChart";
import { AHTPieChart } from "./AHTPieChart";

interface FilteredChartsProps {
  waveData: WaveData[];
  teamData: TeamData[];
  filterType: string;
  searchTerm: string;
}

export const FilteredCharts = ({ waveData, teamData, filterType, searchTerm }: FilteredChartsProps) => {
  const filteredWaveData = waveData.filter(item => {
    if (filterType !== "all" && filterType !== "wave") return false;
    if (!searchTerm) return true;
    return item.wave.toLowerCase().includes(searchTerm);
  });

  const filteredTeamData = teamData.filter(item => {
    if (filterType !== "all" && filterType !== "team") return false;
    if (!searchTerm) return true;
    return item.name.toLowerCase().includes(searchTerm);
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {(filterType === "all" || filterType === "wave") && (
        <AHTBarChart 
          data={filteredWaveData}
          title="AHT Per Wave"
          layout="vertical"
        />
      )}
      {(filterType === "all" || filterType === "team") && (
        <>
          <AHTBarChart 
            data={filteredTeamData}
            title="AHT per Team Lead"
          />
          <AHTPieChart 
            data={filteredTeamData}
            title="AHT per LOB"
          />
        </>
      )}
    </div>
  );
};