import { AHTDateRangeSelector } from "@/components/aht/AHTDateRangeSelector";

interface DateRangeControlProps {
  onDateRangeChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
}

export const DateRangeControl = ({ onDateRangeChange }: DateRangeControlProps) => {
  return (
    <div className="w-full">
      <AHTDateRangeSelector onDateRangeChange={onDateRangeChange} />
    </div>
  );
};