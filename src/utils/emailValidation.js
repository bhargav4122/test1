export const validateEmail = (email) => {
  // 1. Basic format check (blocks malformed emails)
  const re = /^[a-zA-Z0-9._%+-]{2,}@([a-zA-Z0-9-]{4,}\.)+[a-zA-Z]{2,}$/;
  
  // 2. Domain quality check (blocks gma.com, yopmail.com, etc.)
  const [_, domain] = email.split('@') || [];
  const [mainDomain] = domain?.split('.') || [];
  
  // 3. Minimum length requirements
  return (
    re.test(email) &&
    mainDomain?.length >= 5 &&  // Blocks "gma" in "gma.com"
    
    !isDisposableEmail(email)    // Optional disposable check
  );
};

// Optional: Add to block free/disposable emails
export const isDisposableEmail = (email) => {
  const disposableDomains = ['gma.com', 'yopmail.com', 'mailinator.com'];
  return disposableDomains.includes(email.split('@')[1]?.toLowerCase());
};