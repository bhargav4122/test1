import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CompanyInfoProps {
  formData: {
    company: string;
    industry: string[];
    services: string[];
  };
  handleInputChange: (field: string, value: any) => void;
  industries: string[];
  services: string[];
  
}

export const CompanyInfo = ({ 
  formData, 
  handleInputChange,
  industries,
  services
}: CompanyInfoProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Company Information</h3>
      <div className="space-y-2">
        <Label htmlFor="company">Company Name *</Label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) => handleInputChange("company", e.target.value)}
        />
      </div>
    
      <div className="space-y-2">
        <Label>Industries (Select all that apply) *</Label>
        <Select
          value={formData.industry[0]}
          onValueChange={(value) => handleInputChange("industry", [value])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select industries" />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-[200px]">
              {industries.map((ind) => (
                <SelectItem key={ind} value={ind}>
                  {ind}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Services Required (Select all that apply) *</Label>
        <Select
          value={formData.services[0]}
          onValueChange={(value) => handleInputChange("services", [value])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select services" />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-[200px]">
              {services.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};