import { useAuth } from "@/contexts/AuthContext";
import { DashboardHeader } from "@/components/DashboardHeader";

const Index = () => {
  const { userData } = useAuth();
  const canEdit = userData?.role === 'administrator' || userData?.role === 'analyst';

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader canEdit={canEdit} />
      </div>
    </div>
  );
};

export default Index;