import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { format, addDays, isBefore } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import 'react-day-picker/dist/style.css';
import { enUS } from 'date-fns/locale';


interface SchedulingInfoProps {
  formData: {
    date: Date | undefined;
    timeSlot: string;
  };
  handleInputChange: (field: string, value: any) => void;
  timeSlots: string[];
  theme?: string;
}

export const SchedulingInfo = ({ formData, handleInputChange, timeSlots, theme }: SchedulingInfoProps) => {
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const dateInView = useInView(dateRef, { once: true });
  const timeInView = useInView(timeRef, { once: true });

  return (
    <div className="space-y-4">
      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className={cn(
          "text-lg font-semibold mb-4",
          theme === "dark" ? "text-white" : ""
        )}
      >
        Schedule Your Call
      </motion.h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          ref={dateRef}
          initial={{ opacity: 0, x: -20 }}
          animate={dateInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-2"
        >
          <Label className={theme === "dark" ? "text-gray-300" : ""}>Select Date *</Label>
          <Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className={cn(
        "w-full justify-start text-left font-normal",
        !formData.date && "text-muted-foreground",
        theme === "dark" ? "border-gray-600 hover:bg-gray-600" : "",
        "hover:scale-[1.01] transition-transform duration-200"
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {formData.date ? format(formData.date, "PPP") : "Pick a date"}
    </Button>
  </PopoverTrigger>
  <PopoverContent 
    className="w-auto p-0" 
    align="start"
    sideOffset={5}
  >
    <Calendar
      mode="single"
      selected={formData.date}
      onSelect={(date) => handleInputChange("date", date)}
      disabled={(date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return isBefore(date!, today);
      }}
      initialFocus
      locale={enUS} // Add locale
      modifiers={{
        today: new Date() // Highlight today
      }}
      modifiersStyles={{
        today: {
          border: '2px solid currentColor'
        }
      }}
    />
  </PopoverContent>
</Popover>
        </motion.div>
        
        <motion.div
          ref={timeRef}
          initial={{ opacity: 0, x: 20 }}
          animate={timeInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-2"
        >
          <Label className={theme === "dark" ? "text-gray-300" : ""}>Select Time *</Label>
          <Select 
            value={formData.timeSlot} 
            onValueChange={(value) => handleInputChange("timeSlot", value)}
          >
            <SelectTrigger 
              className={cn(
                theme === "dark" ? "border-gray-600" : "",
                "hover:scale-[1.01] transition-transform duration-200"
              )}
            >
              <SelectValue placeholder="Choose a time slot" />
            </SelectTrigger>
            <SelectContent className={cn(
              theme === "dark" ? "bg-gray-700 border-gray-600" : "",
              "animate-popover"
            )}>
              {timeSlots.map((time, index) => (
                <SelectItem 
                  key={time} 
                  value={time}
                  className={cn(
                    theme === "dark" ? "hover:bg-gray-600" : "",
                    "transition-colors duration-150"
                  )}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {time}
                  </motion.div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={cn(
          "mt-4 p-4 rounded-lg border",
          theme === "dark" ? "bg-gray-600 border-gray-500" : "bg-accent",
          "hover:shadow-lg transition-shadow duration-300"
        )}
      >
        <h4 className={cn(
          "font-semibold mb-2",
          theme === "dark" ? "text-white" : ""
        )}>Meeting Details</h4>
        <ul className={cn(
          "space-y-2 text-sm",
          theme === "dark" ? "text-gray-300" : ""
        )}>
          {[
            "45-minute consultation",
            "Video conference via Teams/Zoom",
            "Personalized solution discussion",
            "Free proposal & recommendations"
          ].map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-start"
            >
              <span className="mr-2">•</span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};