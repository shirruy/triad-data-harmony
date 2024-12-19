import { 
  BarChart2, 
  Users, 
  Clock, 
  Settings, 
  HelpCircle,
  Phone,
  ChevronLeft,
  ChevronRight
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
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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

  return (
    <>
      <Sidebar className="border-r border-slate-200">
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-900">WFM Analytics</h1>
          <SidebarTrigger>
            <ChevronLeft className="h-5 w-5" />
          </SidebarTrigger>
        </div>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger>
                        <SidebarMenuButton>
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
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
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-50">
          <SidebarTrigger>
            <ChevronRight className="h-6 w-6" />
          </SidebarTrigger>
        </div>
      )}
    </>
  );
}
