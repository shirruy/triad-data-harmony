import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

interface DateRangeSelectorProps {
  onDateRangeChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
}

export const AHTDateRangeSelector = ({ onDateRangeChange }: DateRangeSelectorProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    onDateRangeChange(range?.from, range?.to);
  };

  return (
    <div className="flex items-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                `${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}`
              ) : (
                `From ${format(dateRange.from, 'MMM d, yyyy')}`
              )
            ) : (
              'Select Date Range'
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};