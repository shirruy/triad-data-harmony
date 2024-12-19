import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import * as XLSX from 'xlsx';
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

export const DataExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const exportToExcel = async () => {
    setIsExporting(true);
    try {
      const [metricsResponse, teamResponse, goalsResponse] = await Promise.all([
        supabase.from('aht_metrics').select('*'),
        supabase.from('aht_team_data').select('*'),
        supabase.from('performance_goals').select('*')
      ]);

      const workbook = XLSX.utils.book_new();

      if (metricsResponse.data) {
        const metricsSheet = XLSX.utils.json_to_sheet(metricsResponse.data);
        XLSX.utils.book_append_sheet(workbook, metricsSheet, "Metrics");
      }

      if (teamResponse.data) {
        const teamSheet = XLSX.utils.json_to_sheet(teamResponse.data);
        XLSX.utils.book_append_sheet(workbook, teamSheet, "Team Performance");
      }

      if (goalsResponse.data) {
        const goalsSheet = XLSX.utils.json_to_sheet(goalsResponse.data);
        XLSX.utils.book_append_sheet(workbook, goalsSheet, "Performance Goals");
      }

      XLSX.writeFile(workbook, `Performance_Data_${new Date().toISOString().split('T')[0]}.xlsx`);
      toast({
        title: "Export Successful",
        description: "Your data has been exported to Excel.",
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold">Export Data</h2>
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={exportToExcel}
            disabled={isExporting}
            className="flex items-center gap-2"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export to Excel
          </Button>
          <Button
            disabled={true}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Export to PDF (Coming Soon)
          </Button>
          <Button
            disabled={true}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export to CSV (Coming Soon)
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};