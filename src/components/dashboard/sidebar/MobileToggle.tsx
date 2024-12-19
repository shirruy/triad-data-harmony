import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const MobileToggle = () => {
  return (
    <motion.div 
      className="fixed bottom-4 right-4 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <SidebarTrigger>
        <button className="p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors animate-glow">
          <ChevronRight className="h-6 w-6" />
        </button>
      </SidebarTrigger>
    </motion.div>
  );
};