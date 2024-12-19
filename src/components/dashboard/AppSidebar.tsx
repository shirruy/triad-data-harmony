import { Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";
import { MobileToggle } from "./sidebar/MobileToggle";

export function AppSidebar() {
  const { userData } = useAuth();
  const isMobile = useIsMobile();
  const { state } = useSidebar();

  return (
    <>
      <Sidebar className="border-r border-border bg-sidebar">
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-muted-foreground">Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarNavigation role={userData?.role || ''} />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Visible toggle button when sidebar is collapsed */}
      {!isMobile && state === "collapsed" && (
        <motion.div 
          className="fixed top-4 left-0 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SidebarTrigger>
            <button className="flex items-center gap-2 bg-card border border-border shadow-lg rounded-r-lg px-3 py-2 text-primary hover:bg-secondary/50 transition-all duration-300 hover:shadow-purple-500/20">
              <Menu className="h-5 w-5" />
              <span className="text-sm font-medium">Menu</span>
            </button>
          </SidebarTrigger>
        </motion.div>
      )}

      {/* Mobile trigger */}
      {isMobile && <MobileToggle />}
    </>
  );
}