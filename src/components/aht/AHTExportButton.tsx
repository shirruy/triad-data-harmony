import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';
import { supabase } from "@/integrations/supabase/client";

export const AHTExportButton = () => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const exportData = async () => {
    setIsExporting(true);
    try {
      // Fetch all necessary data
      const [metricsResponse, teamResponse, waveResponse] = await Promise.all([
        supabase.from('aht_metrics').select('*').order('created_at', { ascending: false }),
        supabase.from('aht_team_data').select('*'),
        supabase.from('aht_wave_data').select('*')
      ]);

      const workbook = XLSX.utils.book_new();

      // Add metrics sheet
      if (metricsResponse.data) {
        const metricsSheet = XLSX.utils.json_to_sheet(metricsResponse.data);
        XLSX.utils.book_append_sheet(workbook, metricsSheet, "Metrics");
      }

      // Add team data sheet
      if (teamResponse.data) {
        const teamSheet = XLSX.utils.json_to_sheet(teamResponse.data);
        XLSX.utils.book_append_sheet(workbook, teamSheet, "Team Data");
      }

      // Add wave data sheet
      if (waveResponse.data) {
        const waveSheet = XLSX.utils.json_to_sheet(waveResponse.data);
        XLSX.utils.book_append_sheet(workbook, waveSheet, "Wave Data");
      }

      // Generate and download file
      XLSX.writeFile(workbook, `AHT_Data_${new Date().toISOString().split('T')[0]}.xlsx`);

      toast({
        title: "Export Successful",
        description: "Your data has been exported successfully.",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={exportData}
      disabled={isExporting}
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      {isExporting ? "Exporting..." : "Export Data"}
    </Button>
  );
};