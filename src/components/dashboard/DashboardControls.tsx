import { motion } from "framer-motion";
import { DateRangeControl } from "./controls/DateRangeControl";
import { DataControls } from "./controls/DataControls";
import { SearchControl } from "./controls/SearchControl";

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
          <DateRangeControl onDateRangeChange={onDateRangeChange} />
          <DataControls canUploadData={canUploadData} />
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <SearchControl 
          onSearchChange={onSearchChange}
          onFilterChange={onFilterChange}
        />
      </motion.div>
    </div>
  );
};