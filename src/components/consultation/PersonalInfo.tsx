
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

export const PersonalInfo = ({ formData, handleInputChange }: PersonalInfoProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
        />
      </div>
    </div>
  );
};