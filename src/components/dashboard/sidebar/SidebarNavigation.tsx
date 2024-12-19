import { motion } from "framer-motion";
import { 
  BarChart2, 
  Users, 
  Clock, 
  Settings, 
  HelpCircle,
  Phone
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface MenuItem {
  title: string;
  icon: any;
  url: string;
  tooltip: string;
}

interface SidebarNavigationProps {
  role: string;
}

export const SidebarNavigation = ({ role }: SidebarNavigationProps) => {
  const getMenuItems = (role: string): MenuItem[] => {
    const items: MenuItem[] = [
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

  const items = getMenuItems(role);

  return (
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
  );
};