import { ArrowUpIcon, ArrowDownIcon, UsersIcon } from "lucide-react";

interface SecondSourceStatsProps {
  users: number;
  activeNow: number;
  trend: string;
}

export const SecondSourceStats = ({ users, activeNow, trend }: SecondSourceStatsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <UsersIcon className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">Total Users</span>
        </div>
        <span className="text-2xl font-bold">{users.toLocaleString()}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Active Now</span>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">{activeNow}</span>
          {trend === "up" ? (
            <ArrowUpIcon className="h-5 w-5 text-success" />
          ) : (
            <ArrowDownIcon className="h-5 w-5 text-destructive" />
          )}
        </div>
      </div>
    </div>
  );
};