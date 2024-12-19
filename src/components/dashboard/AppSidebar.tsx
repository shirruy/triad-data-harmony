import { 
  BarChart2, 
  Users, 
  Clock, 
  Settings, 
  HelpCircle,
  Phone
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
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton asChild>
                        <a href={item.url} className="flex items-center gap-2">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {item.tooltip}
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}