import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TeamDashboard } from "@/components/team/TeamDashboard";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <TeamDashboard />
      </div>
    </DashboardLayout>
  );
};

export default Index;