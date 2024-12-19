import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface AHTSearchFilterProps {
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
}

export const AHTSearchFilter = ({ onSearchChange, onFilterChange }: AHTSearchFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search teams or waves..."
          className="pl-10"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select onValueChange={onFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Data</SelectItem>
          <SelectItem value="team">Team Data</SelectItem>
          <SelectItem value="wave">Wave Data</SelectItem>
          <SelectItem value="metrics">Metrics</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};