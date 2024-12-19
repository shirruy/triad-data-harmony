import { 
  BarChart2, 
  Users, 
  Clock, 
  Settings, 
  HelpCircle,
  Phone,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

const getMenuItems = (role: string) => {
  const items = [
    {
      title: "Dashboard",
      icon: BarChart2,
      url: "/",
      tooltip: "View main dashboard"
    },
    {
      title: "Team Performance",
      icon: Users,
      url: "/team",
      tooltip: "Monitor team metrics"
    },
    {
      title: "AHT Analysis",
      icon: Clock,
      url: "/aht",
      tooltip: "Average Handle Time analysis"
    },
    {
      title: "Call Metrics",
      icon: Phone,
      url: "/calls",
      tooltip: "Call volume and statistics"
    }
  ];

  if (role === 'administrator') {
    items.push({
      title: "Settings",
      icon: Settings,
      url: "/settings",
      tooltip: "System settings"
    });
  }

  items.push({
    title: "Help",
    icon: HelpCircle,
    url: "/help",
    tooltip: "Get help and documentation"
  });

  return items;
};

export function AppSidebar() {
  const { userData } = useAuth();
  const items = getMenuItems(userData?.role || '');
  const isMobile = useIsMobile();
  const { state } = useSidebar();

  return (
    <>
      <Sidebar className="border-r border-border bg-sidebar">
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
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-muted-foreground">Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SidebarMenuItem>
                      <Tooltip>
                        <TooltipTrigger>
                          <SidebarMenuButton className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors group">
                            <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-muted-foreground group-hover:text-primary transition-colors">{item.title}</span>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-popover text-popover-foreground">
                          {item.tooltip}
                        </TooltipContent>
                      </Tooltip>
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </SidebarMenu>
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
      {isMobile && (
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
      )}
    </>
  );
}
