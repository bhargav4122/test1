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
      try {
        const emailResponse = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: formData.email,
            subject: `Application Received for ${job.title}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2563eb;">Thank You for Your Application!</h2>
                <p>Dear ${formData.name},</p>
                <p>We've received your application for the <strong>${job.title}</strong> position.</p>
                
                ${job.id === 'university-talent-program' ? `
                <p>As part of our University Talent Program, we'll review your application and get back to you within 2-3 weeks.</p>
                ` : `
                <p>Our team will review your qualifications and contact you if there's a match with our current needs.</p>
                `}
                
                <p><strong>Application Details:</strong></p>
                <ul>
                  <li>Position: ${job.title}</li>
                  <li>Submitted: ${new Date().toLocaleDateString()}</li>
                  ${formData.phone ? `<li>Contact: ${formData.phone}</li>` : ''}
                </ul>
                
                <p>If you have any questions, please reply to this email.</p>
                
                <p>Best regards,<br/>
                The Hiring Team<br/>
                Business & Data Solutions</p>
                
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
                  <p>This is an automated message. Please do not reply directly to this email.</p>
                </div>
              </div>
            `,
          }),
        });

        if (!emailResponse.ok) {
          throw new Error('Failed to send confirmation email');
        }

        // Optional: Send internal notification
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: 'bhargav@businessanddatasolutions.com',
            subject: `New Application: ${formData.name} for ${job.title}`,
            html: `
              <div style="font-family: Arial, sans-serif;">
                <h3>New Job Application Received</h3>
                <p><strong>Candidate:</strong> ${formData.name}</p>
                <p><strong>Position:</strong> ${job.title}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
                <p><strong>University:</strong> ${formData.university || 'N/A'}</p>
                <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
                <p><a href="https://console.firebase.google.com/u/0/project/YOUR_PROJECT_ID/database/firestore/data/~2Fmodel1Applications~2F${applicationResult.applicationId}">View in Firebase</a></p>
              </div>
            `,
          }),
        });

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
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
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
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4" />
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
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
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn Profile
              </label>
              <input
                type="url"
                value={formData.linkedIn}
                onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4" />
                Portfolio/Website
              </label>
              <input
                type="url"
                value={formData.portfolio}
                onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>

          {isUniversityProgram && (
            <div className="grid md:grid-cols-3 gap-4 mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <GraduationCap className="w-4 h-4" />
                  University/College *
                </label>
                <input
                  type="text"
                  required={isUniversityProgram}
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Your university name"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <GraduationCap className="w-4 h-4" />
                  Current Year *
                </label>
                <select
                  required={isUniversityProgram}
                  value={formData.currentYear}
                  onChange={(e) => setFormData({ ...formData, currentYear: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <GraduationCap className="w-4 h-4" />
                  Expected Graduation *
                </label>
                <select
                  required={isUniversityProgram}
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select year</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <GraduationCap className="w-4 h-4" />
                  Preferred Career Track *
                </label>
                <select
                  required={isUniversityProgram}
                  value={formData.preferredField}
                  onChange={(e) => setFormData({ ...formData, preferredField: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4" />
              Cover Letter / Why are you interested in this position? *
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={isUniversityProgram 
                ? "Tell us why you're interested in our university program and what you hope to achieve..."
                : "Tell us why you're interested in this position and what makes you a great fit..."
              }
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              Salary Expectation (optional)
            </label>
            <input
              type="text"
              value={formData.salaryExpectation}
              onChange={(e) => setFormData({ ...formData, salaryExpectation: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
