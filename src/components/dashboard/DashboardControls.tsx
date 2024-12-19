import { motion } from "framer-motion";
import { AHTDateRangeSelector } from "@/components/aht/AHTDateRangeSelector";
import { AHTExportButton } from "@/components/aht/AHTExportButton";
import { AHTUploadButton } from "@/components/aht/AHTUploadButton";
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
    <>
      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <AHTDateRangeSelector onDateRangeChange={onDateRangeChange} />
          <div className="flex gap-4">
            {canUploadData && <AHTExportButton />}
            {canUploadData && <AHTUploadButton />}
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <AHTSearchFilter 
          onSearchChange={onSearchChange}
          onFilterChange={onFilterChange}
        />
      </motion.div>
    </>
  );
};