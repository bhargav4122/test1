// src/app/careers/page.tsx
import React, { useState } from 'react';
import { Briefcase, Users, GraduationCap, Target, Award, Globe, ArrowRight, CheckCircle, Building, Star, Filter, MapPin, Clock } from 'lucide-react';
import { JobCard } from '@/components/Careers/JobCard';
import { CareerPathCard } from '@/components/Careers/CareerPathCard';
import { CareerPathModal } from '@/components/Careers/CareerPathModal';
import { JobDetailsModal } from '@/components/Careers/JobDetailsModal';
import { ApplicationModal1 } from '@/components/Careers/ApplicationModal1';
import { jobListings, careerPaths } from '@/data/careers';
import { JobListing, CareerPath } from '@/types/careers';

export default function Care() {
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [selectedCareerPath, setSelectedCareerPath] = useState<CareerPath | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isCareerPathModalOpen, setIsCareerPathModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleViewDetails = (job: JobListing) => {
    setSelectedJob(job);
    setIsDetailsModalOpen(true);
  };

  const handleApply = (job: JobListing) => {
    setSelectedJob(job);
    setIsApplicationModalOpen(true);
  };

  const handleViewCareerPath = (path: CareerPath) => {
    setSelectedCareerPath(path);
    setIsCareerPathModalOpen(true);
  };

  const handleApplyFromCareerPath = () => {
    setIsCareerPathModalOpen(false);
    handleApply(jobListings.find(job => job.id === 'university-talent-program')!);
  };

const handleApplicationSubmit = async (applicationData: any) => {
  try {
    const result = await submitJobApplication({
      name: applicationData.applicantName,
      email: applicationData.email,
      phone: applicationData.phone,
      message: applicationData.coverLetter,
      jobTitle: selectedJob?.title || '',
      jobId: selectedJob?.id || '',
      university: applicationData.university,
      graduationYear: applicationData.graduationYear,
      currentYear: applicationData.currentYear,
      preferredField: applicationData.preferredField,
      resumeFile: applicationData.resume
    });

    if (result.success) {
      alert('Application submitted successfully!');
    } else {
      throw new Error(result.message);
    }
  } catch (error: any) {
    alert(`Error: ${error.message}`);
  }
};

  const filteredJobs = activeFilter === 'all' 
    ? jobListings 
    : jobListings.filter(job => 
        activeFilter === 'university' 
          ? job.type === 'University Program'
          : job.type.toLowerCase().includes(activeFilter.toLowerCase())
      );

  return (
    <div className="pt-20 dark:bg-black dark:text-gray-100">
      {/* Hero Section */}
      <div className="bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Join Our Growing Team
              <span className="block text-blue-600 dark:text-blue-400 mt-3">
                Skills Matter More Than Credentials
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're a dynamic technology company that values talent and potential over traditional backgrounds. 
              From full-time roles to our innovative university partnership program, we offer diverse opportunities for growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 dark:bg-blue-700 dark:hover:bg-blue-800">
                <Briefcase className="w-5 h-5" />
                Browse Positions
              </button>
              <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800">
                <GraduationCap className="w-5 h-5" />
                University Program
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-md transition-all">
              <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">25+</div>
              <div className="text-blue-600 dark:text-blue-400">Team Members</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-md transition-all">
              <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">50+</div>
              <div className="text-blue-600 dark:text-blue-400">Projects Delivered</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-md transition-all">
              <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">15+</div>
              <div className="text-blue-600 dark:text-blue-400">Countries Served</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-md transition-all">
              <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">30+</div>
              <div className="text-blue-600 dark:text-blue-400">University Partners</div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="max-w-7xl mx-auto p-5">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white mb-4">Current Opportunities</h2>
          <p className="text-xl mb-2 text-gray-900 dark:text-white max-w-3xl mx-auto">
            Explore diverse opportunities from full-time positions to flexible freelance work. 
            We offer roles that match your career stage and lifestyle preferences.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Opportunities
          </button>
          <button
            onClick={() => setActiveFilter('full-time')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeFilter === 'full-time'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Full-time
          </button>
          <button
            onClick={() => setActiveFilter('part-time')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeFilter === 'part-time'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Part-time
          </button>
          <button
            onClick={() => setActiveFilter('internship')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeFilter === 'internship'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Internships
          </button>
          <button
            onClick={() => setActiveFilter('freelance')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeFilter === 'freelance'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Freelance
          </button>
        </div>

        {/* Conditional rendering based on active filter */}
        {activeFilter !== 'internship' ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={handleApply}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careerPaths.map((path) => (
              <CareerPathCard 
                key={path.field} 
                careerPath={path} 
                onViewPath={handleViewCareerPath}
              />
            ))}
          </div>
        )}

        {/* University Program Section (shown when 'all' filter is active) */}
        {activeFilter === 'all' && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white mb-4">
                University Talent Program
              </h3>
              <p className="text-lg mb-2 text-gray-900 dark:text-white max-w-3xl mx-auto">
                Our structured 4-year development path combines progressive learning with real project experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {careerPaths.map((path) => (
                <CareerPathCard 
                  key={path.field} 
                  careerPath={path} 
                  onViewPath={handleViewCareerPath}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Company Culture Section */}
      <div className="bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Experience a culture that prioritizes talent development and practical skills</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg">
              <Star className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Skills Over Credentials</h3>
              <p className="text-gray-600 dark:text-gray-300">We hire based on demonstrated abilities and potential, not just degrees or previous experience.</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg">
              <Globe className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Diverse Opportunities</h3>
              <p className="text-gray-600 dark:text-gray-300">From full-time roles to flexible freelance work, we offer positions that fit your lifestyle and career goals.</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg">
              <Building className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Strategic Talent Development</h3>
              <p className="text-gray-600 dark:text-gray-300">Our university program creates a pipeline of skilled professionals while providing students real-world experience.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-4">Start Your Journey With Us</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're seeking full-time employment, flexible work arrangements, or want to start your career 
            while studying, we have the right opportunity for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => handleApply(jobListings.find(job => job.id === 'university-talent-program')!)}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              Join University Program
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Browse All Positions
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CareerPathModal
        careerPath={selectedCareerPath}
        isOpen={isCareerPathModalOpen}
        onClose={() => setIsCareerPathModalOpen(false)}
        onApply={handleApplyFromCareerPath}
      />

      <JobDetailsModal
        job={selectedJob}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onApply={handleApply}
      />

      <ApplicationModal1
        job={selectedJob}
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        onSubmit={handleApplicationSubmit}
      />
    </div>
  );

}
