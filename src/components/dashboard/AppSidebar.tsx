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

      {/* Visible toggle button when sidebar is collapsed */}
      {!isMobile && state === "collapsed" && (
        <div className="fixed top-4 left-0 z-50">
          <SidebarTrigger>
            <button className="flex items-center gap-2 bg-white border border-slate-200 shadow-sm rounded-r-lg px-3 py-2 text-slate-600 hover:bg-slate-50 transition-colors">
              <Menu className="h-5 w-5" />
              <span className="text-sm font-medium">Menu</span>
            </button>
          </SidebarTrigger>
        </div>
      )}

      {/* Mobile trigger */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-50">
          <SidebarTrigger>
            <button className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors">
              <ChevronRight className="h-6 w-6" />
            </button>
          </SidebarTrigger>
        </div>
      )}
    </>
  );
}