import { useFirstSource, useSecondSource, useThirdSource } from "@/hooks/useDataSources";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardGrid } from "@/components/DashboardGrid";

const Index = () => {
  const queryClient = useQueryClient();
  const { userData } = useAuth();
  const firstSource = useFirstSource();
  const secondSource = useSecondSource();
  const thirdSource = useThirdSource();

  const handleRefresh = () => {
    queryClient.invalidateQueries();
  };

  const canEdit = userData?.role === 'administrator' || userData?.role === 'analyst';

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader onRefresh={handleRefresh} canEdit={canEdit} />
        <DashboardGrid
          firstSource={firstSource}
          secondSource={secondSource}
          thirdSource={thirdSource}
        />
      </div>
    </div>
  );
};

export default Index;