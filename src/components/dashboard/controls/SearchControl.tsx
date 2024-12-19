import { AHTSearchFilter } from "@/components/aht/AHTSearchFilter";

interface SearchControlProps {
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
}

export const SearchControl = ({ onSearchChange, onFilterChange }: SearchControlProps) => {
  return (
    <AHTSearchFilter 
      onSearchChange={onSearchChange}
      onFilterChange={onFilterChange}
    />
  );
};