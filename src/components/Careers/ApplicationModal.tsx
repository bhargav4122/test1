import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UploadCloud, Loader2, X, FileText, Linkedin, Globe, DollarSign, User, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { submitJobApplicationForm, uploadFileToStorage } from "@/firebase";
import { useJobApplicationAuth } from '@/hooks/useJobApplicationAuth';

interface ApplicationModalProps {
  open: boolean;
  onClose: () => void;
  job: {
    title: string;
    id: string;
  };
  theme?: string;
}

const ApplicationModal = ({ open, onClose, job, theme }: ApplicationModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    linkedIn: '',
    portfolio: '',
    salaryExpectation: '',
    file: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user, loading: authLoading, error: authError, signIn } = useJobApplicationAuth();

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.displayName || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!validTypes.includes(file.type)) {
        toast({
          title: 'Invalid File Type',
          description: 'Please upload a PDF or Word document',
          variant: 'destructive'
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File Too Large',
          description: 'Maximum file size is 5MB',
          variant: 'destructive'
        });
        return;
      }

      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn();
    } catch (error: any) {
      toast({
        title: 'Authentication Failed',
        description: error.message || 'Could not authenticate with Google',
        variant: 'destructive'
      });
    }
  };


  
    //File upload

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    let cvUrl = '';
    let cvMetadata = null;

    // File upload logic
    if (formData.file) {
      const uploadToast = toast({
        title: 'Uploading CV...',
        description: 'Please wait while we upload your file',
        duration: 45000,
      });

      try {
        // Use sanitized email as user identifier
        const sanitizedEmail = formData.email.replace(/[^a-zA-Z0-9]/g, '_');
        const uploadResult = await uploadFileToStorage(formData.file, sanitizedEmail);
        
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'File upload failed');
        }
        
        cvUrl = uploadResult.downloadURL || '';
        uploadToast.dismiss();
        
        toast({
          title: 'CV Uploaded',
          description: 'Your resume has been successfully uploaded',
          duration: 3000
        });
      } catch (error: any) {
        uploadToast.dismiss();
        throw new Error(`CV upload failed: ${error.message}`);
      }
    }

    // Form submission
    const applicationResult = await submitJobApplicationForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      jobTitle: job.title,
      jobId: job.id,
      linkedIn: formData.linkedIn,
      portfolio: formData.portfolio,
      salaryExpectation: formData.salaryExpectation,
      theme,
      cvUrl,
      userId: user?.uid || generateUserId(formData.email)
    });

    if (!applicationResult.success) {
      throw new Error(applicationResult.message || 'Failed to submit application');
    }

    // Send notification (add your notification logic here)
    await sendApplicationNotification({
      applicationId: applicationResult.applicationId,
      applicantName: formData.name,
      applicantEmail: formData.email,
      jobTitle: job.title,
      resumeUrl: cvUrl
    });

    toast({
      title: 'Application Submitted',
      description: 'Your application has been successfully submitted!',
    });
    onClose();
  } catch (error: any) {
    console.error('Submission error:', error);
    toast({
      title: 'Error',
      description: error.message || 'Something went wrong',
      variant: 'destructive',
    });
  } finally {
    setIsSubmitting(false);
  }
};

// Add this helper function (implement according to your notification system)
const sendApplicationNotification = async (data: {
  applicationId: string;
  applicantName: string;
  applicantEmail: string;
  jobTitle: string;
  resumeUrl?: string;
}) => {
  // Implementation for Zapier/webhook/email notification
  // Example:
  await fetch('https://hooks.zapier.com/hooks/catch/...', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md md:max-w-lg rounded-lg p-0 overflow-hidden">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Apply for {job?.title}
            </DialogTitle>
            <DialogDescription className="text-blue-100">
              Job ID: {job?.id || 'N/A'}
            </DialogDescription>
          </DialogHeader>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1 hover:bg-black/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!user ? (
          <div className="p-6 space-y-6">
            <div className="space-y-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Sign in to apply
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We require Google authentication to submit job applications.
              </p>
              
              <Button
                onClick={handleGoogleSignIn}
                className="w-full py-3 text-lg font-medium flex items-center justify-center gap-2"
                disabled={authLoading}
              >
                {authLoading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    <img 
                      src="https://www.google.com/favicon.ico" 
                      alt="Google" 
                      className="w-5 h-5" 
                    />
                    Sign in with Google
                  </>
                )}
              </Button>
              
              {authError && (
                <p className="text-red-500 text-sm">{authError}</p>
              )}
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We'll only use your email for this application process.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* User info header */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="font-medium">{formData.name || 'User'}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{formData.email}</p>
              </div>
            </div>

            {/* Personal Info Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <User className="w-5 h-5" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name *
                  </label>
                  <div className="relative">
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="pl-9"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email *
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="pl-9"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone (Optional)
                  </label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="+1 234 567 8900"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-9"
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="salaryExpectation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Salary Expectation
                  </label>
                  <div className="relative">
                    <Input
                      id="salaryExpectation"
                      name="salaryExpectation"
                      placeholder="e.g. $80,000 or Negotiable"
                      value={formData.salaryExpectation}
                      onChange={handleInputChange}
                      className="pl-9"
                    />
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Links Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Globe className="w-5 h-5" />
                Professional Links
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    LinkedIn Profile
                  </label>
                  <div className="relative">
                    <Input
                      id="linkedIn"
                      name="linkedIn"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.linkedIn}
                      onChange={handleInputChange}
                      className="pl-9"
                    />
                    <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Portfolio/Website
                  </label>
                  <div className="relative">
                    <Input
                      id="portfolio"
                      name="portfolio"
                      placeholder="https://yourportfolio.com"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className="pl-9"
                    />
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <UploadCloud className="w-5 h-5" />
                Resume/CV
              </h3>
              
              <div className="space-y-2">
                <label htmlFor="cv-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Upload Resume (PDF, DOC, DOCX - max 5MB)
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center transition-colors hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label htmlFor="cv-upload" className="flex flex-col items-center gap-2 cursor-pointer">
                    <UploadCloud className="h-10 w-10 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {formData.file ? formData.file.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formData.file ? 
                          `${(formData.file.size / 1024 / 1024).toFixed(2)} MB` : 
                          'PDF or Word documents only'}
                      </p>
                    </div>
                  </label>
                </div>
                {formData.file && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, file: null }))}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remove File
                  </Button>
                )}
              </div>
            </div>

            {/* Cover Letter Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FileText className="w-5 h-5" />
                Cover Letter
              </h3>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tell us why you're a great fit (Optional)
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="I'm excited about this opportunity because..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="min-h-[120px]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full py-3 text-lg font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;