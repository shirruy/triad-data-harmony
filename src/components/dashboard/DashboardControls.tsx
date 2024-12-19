import { motion } from "framer-motion";
import { AHTDateRangeSelector } from "@/components/aht/AHTDateRangeSelector";
import { AHTExportButton } from "@/components/aht/AHTExportButton";
import { AHTDataUpload } from "@/components/AHTDataUpload";
import { AHTSearchFilter } from "@/components/aht/AHTSearchFilter";

interface DashboardControlsProps {
  canUploadData: boolean;
  onDateRangeChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
}

export const DashboardControls = ({ 
  canUploadData, 
  onDateRangeChange, 
  onSearchChange, 
  onFilterChange 
}: DashboardControlsProps) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="space-y-4">
      <motion.div variants={itemVariants}>
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <AHTDateRangeSelector onDateRangeChange={onDateRangeChange} />
          </div>
          {canUploadData && (
            <div className="flex flex-wrap gap-2">
              <AHTExportButton />
              <AHTDataUpload />
            </div>
          )}
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <AHTSearchFilter 
          onSearchChange={onSearchChange}
          onFilterChange={onFilterChange}
        />
      </motion.div>
    </div>
  );
};