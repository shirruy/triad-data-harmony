import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { AHTDateRangeSelector } from "./AHTDateRangeSelector";
import { TeamPerformanceTable } from "./total-calls/TeamPerformanceTable";
import { AgentPerformanceTable } from "./total-calls/AgentPerformanceTable";
import { useTotalCallsData } from "@/hooks/aht/useTotalCallsData";

export const TotalCallsView = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const { teamData, agentData, isLoading } = useTotalCallsData(startDate, endDate);

  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      toast.success(`Data filtered from ${format(start, 'MMM d, yyyy')} to ${format(end, 'MMM d, yyyy')}`);
    }
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <AHTDateRangeSelector onDateRangeChange={handleDateRangeChange} />
      </div>

      {teamData && <TeamPerformanceTable teamData={teamData} />}
      {agentData && <AgentPerformanceTable agentData={agentData} />}
    </div>
  );
};