import React, { useEffect } from 'react';

interface MobileValidationProps {
  value: string;
  country: 'UK' | 'US' | 'IN'; // Supported countries
  onChange: (value: string) => void;
  onValid: (isValid: boolean) => void;
  className?: string;
  placeholder?: string;
}

const MobileValidation: React.FC<MobileValidationProps> = ({
  value,
  country,
  onChange,
  onValid,
  className,
  placeholder
}) => {
  useEffect(() => {
    const validatePhoneNumber = () => {
      if (!value) {
        onValid(true); // Consider empty as valid (optional field)
        return;
      }

      // Remove all non-digit characters
      const digitsOnly = value.replace(/\D/g, '');

      let isValid = false;
      
      switch (country) {
       
        case 'UK':
          // UK: starts with 0 or +44 followed by 9-10 digits
          isValid = /^(0|44)\d{9,10}$/.test(digitsOnly);
          break;
        case 'IN':
          // India: 10 digits starting with 6-9
          isValid = /^[6-9]\d{9}$/.test(digitsOnly);
          break;
           case 'US':
          // US: 10 digits (optionally starts with 1)
          isValid = /^1?\d{10}$/.test(digitsOnly);
          break;
        default:
          isValid = digitsOnly.length >= 10;
      }

      onValid(isValid);
    };

    validatePhoneNumber();
  }, [value, country, onValid]);

  const getPlaceholder = () => {
    switch (country) {
     
      case 'UK': return 'e.g., 07400 123456';
      case 'IN': return 'e.g., 9876543210';
      case 'US': return 'e.g., (555) 123-4567';
      default: return 'Enter phone number';
    }
  };

  return (
    <div className="w-full">
      <input
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
        placeholder={placeholder || getPlaceholder()}
      />
      {value && !/^\d+$/.test(value.replace(/\D/g, '')) && (
        <p className="text-red-500 text-xs mt-1">Please enter only numbers and formatting characters</p>
      )}
    </div>
  );
};

export default MobileValidation;