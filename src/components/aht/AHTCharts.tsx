import { useState } from "react";
import { AHTSearchFilter } from "./AHTSearchFilter";
import { FilteredCharts } from "./charts/FilteredCharts";
import { useChartsData } from "@/hooks/aht/useChartsData";

export const AHTCharts = () => {
  const { waveData, teamData } = useChartsData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase());
  };

  const handleFilterChange = (value: string) => {
    setFilterType(value);
  };

  return (
    <div className="space-y-4">
      <AHTSearchFilter 
        onSearchChange={handleSearch}
        onFilterChange={handleFilterChange}
      />
      
      <FilteredCharts 
        waveData={waveData}
        teamData={teamData}
        filterType={filterType}
        searchTerm={searchTerm}
      />
    </div>
  );
};