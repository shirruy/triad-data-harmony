import { useAuth } from "@/contexts/AuthContext";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AHTInsight } from "@/components/AHTInsight";
import { AHTMetrics } from "@/components/AHTMetrics";
import { AHTCharts } from "@/components/AHTCharts";
import { AHTDataUpload } from "@/components/AHTDataUpload";

const Index = () => {
  const { userData } = useAuth();
  const canUploadData = userData?.role === 'administrator' || userData?.role === 'analyst';

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader canEdit={canUploadData} />
        
        {/* Last Updated Info */}
        <div className="bg-blue-600 text-white p-3 rounded-lg">
          <p className="text-sm">Data was updated 4 hours ago</p>
        </div>

        {/* Data Upload Section - Only visible to admin and analysts */}
        {canUploadData && <AHTDataUpload />}

        {/* AHT Insight Card */}
        <AHTInsight />

        {/* Metrics Cards */}
        <AHTMetrics />

        {/* Charts Section */}
        <AHTCharts />
      </div>
    </div>
  );
};

export default Index;