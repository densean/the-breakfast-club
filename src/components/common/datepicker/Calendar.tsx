import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import "./Calendar.less";

interface CalendarProps {
  label: string;
  errorMessage?: string;
  value: Date | undefined;
  onChange: (date: Date) => void;
}

export default function WebCalendar({
  label,
  errorMessage,
  value,
  onChange,
}: CalendarProps) {
  const [date, setDate] = useState<Date | undefined>(value);

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      onChange(newDate);
    }
  };

  return (
    <div className="">
      <span className="font-medium text-md">{label}</span>
      <Popover>
        <PopoverTrigger asChild className="">
          <div className=" calendar-button">
            <Button
              variant="default"
              className={cn(
                "w-full justify-between items-center text-left font-normal text-sm flex h-9 whitespace-nowrap border border-input bg-transparent px-3 py-2 shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                !date && "text-muted-foreground",
                errorMessage ? "border border-red-500" : "" // ✅ Fixed
              )}
              size="sm"
            >
              <span>{date ? format(date, "PPP") : "Pick a date"}</span>
              <CalendarIcon />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex items-center flex-col space-y-2 p-6 bg-white"
        >
          <Select
            onValueChange={(value: string) => {
              const newDate = addDays(new Date(), parseInt(value));
              handleDateChange(newDate);
            }}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper" className="bg-white">
              <SelectItem value="0">Today</SelectItem>
              <SelectItem value="1">Tomorrow</SelectItem>
              <SelectItem value="3">In 3 days</SelectItem>
              <SelectItem value="7">In a week</SelectItem>
            </SelectContent>
          </Select>
          <div className="rounded-md border">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
            />
          </div>
        </PopoverContent>
      </Popover>
      {errorMessage && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
    </div>
  );
}
