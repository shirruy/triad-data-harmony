import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const SidebarHeader = () => {
  return (
    <motion.div 
      className="h-16 flex items-center justify-between px-4 border-b border-border"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
        WFM Analytics
      </h1>
      <SidebarTrigger>
        <ChevronLeft className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
      </SidebarTrigger>
    </motion.div>
  );
};