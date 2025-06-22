import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ProjectDetailsProps {
  formData: {
    projectTimeline: string;
    budget: string;
    additionalInfo: string;
  };
  handleInputChange: (field: string, value: string) => void;
  projectTimelines: string[];
  budgetRanges: string[];
}

export const ProjectDetails = ({
  formData,
  handleInputChange,
  projectTimelines,
  budgetRanges
}: ProjectDetailsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Project Details</h3>
      <div className="space-y-2">
        <Label htmlFor="projectTimeline">Project Timeline *</Label>
        <Select
          value={formData.projectTimeline}
          onValueChange={(value) => handleInputChange("projectTimeline", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select timeline" />
          </SelectTrigger>
          <SelectContent>
            {projectTimelines.map((timeline) => (
              <SelectItem key={timeline} value={timeline}>
                {timeline}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="budget">Budget Range *</Label>
        <Select
          value={formData.budget}
          onValueChange={(value) => handleInputChange("budget", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select budget range" />
          </SelectTrigger>
          <SelectContent>
            {budgetRanges.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Additional Information</Label>
        <Textarea
          id="additionalInfo"
          placeholder="Tell us about your project goals, challenges, or specific requirements..."
          value={formData.additionalInfo}
          onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
          className="h-32"
        />
      </div>
    </div>
  );
};
