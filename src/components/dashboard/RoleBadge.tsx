import { Badge } from "@/components/ui/badge";
import { Shield, ChartBar, User } from "lucide-react";

interface RoleBadgeProps {
  role: string;
}

export const RoleBadge = ({ role }: RoleBadgeProps) => {
  const getRoleIcon = () => {
    switch (role) {
      case 'administrator':
        return <Shield className="h-4 w-4" />;
      case 'analyst':
        return <ChartBar className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleBadgeColor = () => {
    switch (role) {
      case 'administrator':
        return 'bg-red-100 text-red-800 hover:bg-red-100/80';
      case 'analyst':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100/80';
      default:
        return 'bg-green-100 text-green-800 hover:bg-green-100/80';
    }
  };

  return (
    <Badge 
      variant="secondary"
      className={`flex items-center gap-1 ${getRoleBadgeColor()}`}
    >
      {getRoleIcon()}
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </Badge>
  );
};