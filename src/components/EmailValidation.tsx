import React, { useEffect } from 'react';

interface EmailValidationProps {
  email: string;
  onValid: (isValid: boolean) => void;
}

const EmailValidation: React.FC<EmailValidationProps> = ({ email, onValid }) => {
  useEffect(() => {
    const validateEmail = () => {
      if (!email) {
        onValid(false);
        return;
      }

      // Basic email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        onValid(false);
        return;
      }

      // Check for disposable email domains
      const disposableDomains = [
        'tempmail', 'mailinator', '10minutemail', 'guerrillamail',
        'yopmail', 'throwawaymail', 'fakeinbox', 'trashmail'
      ];
      
      const domain = email.split('@')[1]?.toLowerCase() || '';
      const isDisposable = disposableDomains.some(d => domain.includes(d));
      
      onValid(!isDisposable);
    };

    const timer = setTimeout(validateEmail, 500);
    return () => clearTimeout(timer);
  }, [email, onValid]);

  if (!email) return null;

  return (
    <div className="text-sm mt-1 h-5">
      {!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? (
        <span className="text-red-500">Please enter a valid email address</span>
      ) : null}
    </div>
  );
};

export default EmailValidation;