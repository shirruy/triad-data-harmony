import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TeamDashboard } from "@/components/team/TeamDashboard";

const Index = () => {
  return (
    <DashboardLayout>
      <TeamDashboard />
    </DashboardLayout>
  );
};

export default Index;