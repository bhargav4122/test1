//#applicationmodel1

import React, { useState, useEffect } from 'react';
import { X, Upload, User, Mail, Phone, FileText, GraduationCap, Loader2, Linkedin, Globe } from 'lucide-react';
import { JobListing } from '@/types/careers';
import { useToast } from '@/hooks/use-toast';
import { submitModel1Application, uploadModel1Resume } from "@/firebase";
import { useJobApplicationAuth } from '@/hooks/useJobApplicationAuth';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  requirements: string[];
  preferredSkills: string[];
}

interface ApplicationModalProps {
  job: JobListing | null;
  isOpen: boolean;
  onClose: () => void;
  theme?: string;
}

export function ApplicationModal1({ job, isOpen, onClose, theme }: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    university: '',
    graduationYear: '',
    currentYear: '',
    preferredField: '',
    linkedIn: '',
    portfolio: '',
    salaryExpectation: '',
    hearAboutUs: '',
    availableStartDate: '',
    workAuthorization: '',
    disabilityStatus: '',
    gender: '',
    ethnicity: '',
    veteranStatus: ''
  });
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user, loading: authLoading, error: authError, signIn } = useJobApplicationAuth();

  useEffect(() => {
    if (job) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        university: '',
        graduationYear: '',
        currentYear: '',
        preferredField: '',
        linkedIn: '',
        portfolio: '',
        salaryExpectation: '',
        hearAboutUs: '',
        availableStartDate: '',
        workAuthorization: '',
        disabilityStatus: '',
        gender: '',
        ethnicity: '',
        veteranStatus: ''
      });
      setResume(null);
    }
  }, [job]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job || !user) return;

    setIsSubmitting(true);

    try {
      let resumeUrl = '';
      
      // Step 1: Upload resume if exists
      if (resume) {
        const uploadResult = await uploadModel1Resume(resume, user.uid);
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'Failed to upload resume');
        }
        resumeUrl = uploadResult.downloadURL || '';
      }

      // Collect metadata
      const metadata = {
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        referrer: document.referrer || null,
        isUniversityProgram: job.id === 'university-talent-program',
        ipAddress: null 
      };

      // Step 2: Submit application data to Firebase
      const applicationResult = await submitModel1Application({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        jobTitle: job.title,
        jobId: job.id,
        university: formData.university,
        graduationYear: formData.graduationYear,
        currentYear: formData.currentYear,
        preferredField: formData.preferredField,
        linkedIn: formData.linkedIn,
        portfolio: formData.portfolio,
        salaryExpectation: formData.salaryExpectation,
        resumeUrl,
        userId: user.uid,
        status: 'submitted',
        timestamp: Date.now(),
        metadata,
        theme: theme || 'default'
      });

      if (!applicationResult.success) {
        throw new Error(applicationResult.message || 'Failed to submit application');
      }

      // Step 3: Send confirmation email via Resend
  // Updated email notification section in handleSubmit function

// Step 3: Send confirmation email to applicant and detailed notification to internal team
try {
  // Send confirmation to applicant
  const emailResponse = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: formData.email,
      name: formData.name,
      phone: formData.phone,
      jobTitle: job.title,
      jobId: job.id,
      university: formData.university,
      graduationYear: formData.graduationYear,
      currentYear: formData.currentYear,
      preferredField: formData.preferredField,
      linkedIn: formData.linkedIn,
      portfolio: formData.portfolio,
      message: formData.message
    }),
  });
  
  if (!emailResponse.ok) {
    throw new Error('Failed to send confirmation email');
  }

  // Send detailed internal notification
  const internalEmailResponse = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: 'bhargav@businessanddatasolutions.com',
      subject: `New Application: ${formData.name} for ${job.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Job Application Received
          </h2>
          
          <h3 style="color: #374151;">Candidate Information</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb; width: 30%;"><strong>Name:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb;"><strong>Email:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;"><a href="mailto:${formData.email}">${formData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb;"><strong>Phone:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.phone || 'Not provided'}</td>
            </tr>
            ${formData.linkedIn ? `
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb;"><strong>LinkedIn:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;"><a href="${formData.linkedIn}" target="_blank">${formData.linkedIn}</a></td>
            </tr>
            ` : ''}
            ${formData.portfolio ? `
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb;"><strong>Portfolio:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;"><a href="${formData.portfolio}" target="_blank">${formData.portfolio}</a></td>
            </tr>
            ` : ''}
          </table>

          <h3 style="color: #374151;">Position Information</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb; width: 30%;"><strong>Job Title:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${job.title}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb;"><strong>Job ID:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${job.id}</td>
            </tr>
            ${formData.salaryExpectation ? `
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb;"><strong>Salary Expectation:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.salaryExpectation}</td>
            </tr>
            ` : ''}
          </table>

          ${isUniversityProgram ? `
          <h3 style="color: #374151;">University Program Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb; width: 30%;"><strong>University:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.university || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb;"><strong>Current Year:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.currentYear || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb;"><strong>Graduation Year:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.graduationYear || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb;"><strong>Preferred Field:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.preferredField || 'Not provided'}</td>
            </tr>
          </table>
          ` : ''}

          <h3 style="color: #374151;">Cover Letter</h3>
          <div style="padding: 15px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 4px; margin-bottom: 20px;">
            ${formData.message || 'No cover letter provided'}
          </div>

          <h3 style="color: #374151;">Application Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb; width: 30%;"><strong>Submitted at:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${new Date().toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb;"><strong>Resume:</strong></td>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">
                ${resumeUrl ? `<a href="${resumeUrl}" target="_blank">Download Resume</a>` : 'No resume uploaded'}
              </td>
            </tr>
          </table>

          <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
            <p>This email was automatically generated from the career portal.</p>
            <p><a href="https://console.firebase.google.com/u/0/project/YOUR_PROJECT_ID/database/firestore/data/~2Fmodel1Applications~2F${applicationResult.applicationId}" style="color: #2563eb; text-decoration: none;">View full application in Firebase</a></p>
          </div>
        </div>
      `,
    }),
  });

  if (!internalEmailResponse.ok) {
    console.error('Internal notification failed');
    // Don't throw an error, as we don't want to fail the submission
  }

} catch (emailError) {
  console.error('Email notification failed:', emailError);
  // Fail silently - don't show error to user
}

      // Step 4: Handle success
      toast({
        title: 'Application Submitted',
        description: 'Your application has been successfully submitted! You should receive a confirmation email shortly.',
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

  if (!isOpen || !job) return null;

  const isUniversityProgram = job.id === 'university-talent-program';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-black rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal header */}
        <div className="sticky top-0 bg-white dark:bg-black p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Apply for {job.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Fill out the form below to submit your application</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2text-gray-900 dark:text-white">
                <User className="w-4 h-4 text-gray-900 dark:text-white" />
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
               dark:bg-black dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                placeholder="Enter your full name"
              />
            </div>

          <div>
  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 text-gray-900 dark:text-white">
    <Mail className="w-4 h-4 text-gray-900 dark:text-white" />
    Email Address *
  </label>
  <input
    type="email"
    required
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
               dark:bg-black dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
    placeholder="your.email@example.com"
  />
</div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 text-gray-900 dark:text-white">
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
               dark:bg-black dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 text-gray-900 dark:text-white">
                <Upload className="w-4 h-4" />
                Resume/CV *
              </label>
              <input
                type="file"
                required
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 text-gray-900 dark:text-white">
                <Linkedin className="w-4 h-4" />
                LinkedIn Profile
              </label>
              <input
                type="url"
                value={formData.linkedIn}
                onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
               dark:bg-black dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 text-gray-900 dark:text-white">
                <Globe className="w-4 h-4" />
                Portfolio/Website
              </label>
              <input
                type="url"
                value={formData.portfolio}
                onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
               dark:bg-black dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>

          {isUniversityProgram && (
            <div className="grid md:grid-cols-3 gap-4 mb-6 p-4 rounded-lg border border-purple-200">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 text-gray-900 dark:text-white">
                  <GraduationCap className="w-4 h-4" /> 
                  University Name*
                </label>
                <input
                  type="text"
                  required={isUniversityProgram}
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
               dark:bg-black dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
           placeholder="Your university name"
                />
              </div>

              <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 text-gray-900 dark:text-white">
                  <GraduationCap className="w-4 h-4" />
                  Current Year *
                </label>
                <select
                  required={isUniversityProgram}
                  value={formData.currentYear}
                  onChange={(e) => setFormData({ ...formData, currentYear: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
               dark:bg-black dark:text-white dark:border-gray-600 dark:placeholder-gray-400">
                  <option value="">Select year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 text-gray-900 dark:text-white">
                  <GraduationCap className="w-4 h-4" />
                  Expected Graduation *
                </label>
                <select
                  required={isUniversityProgram}
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
               dark:bg-black dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                >
                  <option value="">Select year</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 text-gray-900 dark:text-white">
                  <GraduationCap className="w-4 h-4" />
                  Preferred Career Track *
                </label>
                <select
                  required={isUniversityProgram}
                  value={formData.preferredField}
                  onChange={(e) => setFormData({ ...formData, preferredField: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
               dark:bg-black dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                >
                  <option value="">Select your preferred field</option>
                  <option value="Cloud Engineering">Cloud Engineering</option>
                  <option value="Data Science & Analytics">Data Science & Analytics</option>
                  <option value="Business Intelligence">Business Intelligence</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="AI Engineering">AI Engineering</option>
                  <option value="Digital Transformation">Digital Transformation</option>
                </select>
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 text-gray-900 dark:text-white">
              <FileText className="w-4 h-4" />
              Cover Letter / Why are you interested in this position? *
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
               dark:bg-black dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
              placeholder={isUniversityProgram 
                ? "Tell us why you're interested in our university program and what you hope to achieve..."
                : "Tell us why you're interested in this position and what makes you a great fit..."
              }
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 text-gray-900 dark:text-white">
              Salary Expectation (optional)
            </label>
            <input
              type="text"
              value={formData.salaryExpectation}
              onChange={(e) => setFormData({ ...formData, salaryExpectation: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
               dark:bg-black dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
              placeholder="Example: ₹8,00,000 or Negotiable"
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

