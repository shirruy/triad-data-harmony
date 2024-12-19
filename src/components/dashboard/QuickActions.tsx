import { Button } from "@/components/ui/button";
import { Upload, Download, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface QuickActionsProps {
  canUploadData: boolean;
}

export const QuickActions = ({ canUploadData }: QuickActionsProps) => {
  const handleRefresh = () => {
    toast.success("Data refreshed successfully");
  };

  const handleExport = () => {
    toast.success("Exporting data...");
  };

  const handleUpload = () => {
    if (!canUploadData) {
      toast.error("You don't have permission to upload data");
      return;
    }
    toast.success("Upload dialog opened");
  };

  return (
    <motion.div 
      className="flex flex-wrap gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={handleRefresh}
        className="flex items-center gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        Refresh Data
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleExport}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Export
      </Button>

      {canUploadData && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleUpload}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload
        </Button>
      )}
    </motion.div>
  );
};