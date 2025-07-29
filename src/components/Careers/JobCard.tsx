import React from 'react';
import { MapPin, Clock, Users, DollarSign, ChevronRight } from 'lucide-react';
import { JobListing } from '@/types/careers';

interface JobCardProps {
  job: JobListing;
  onApply: (job: JobListing) => void;
  onViewDetails: (job: JobListing) => void;
}

export function JobCard({ job, onApply, onViewDetails }: JobCardProps) {
  return (
    <div className=" rounded-lg p-6 hover:shadow-md transition-all border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white-900 mb-2">{job.title}</h3>
          <div className="flex items-center gap-4 text-sm text-blue-600 dark:text-blue-400">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{job.department}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{job.type}</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          job.type === 'University Program' 
            ? 'bg-purple-100 text-purple-800'
            : 'bg-blue-100 text-blue-800'
        }`}>
          {job.experience}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3 text-gray-600 dark:text-white">{job.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {job.salary && (
            <div className="flex items-center gap-1 text-green-600 font-medium">
              <DollarSign className="w-4 h-4" />
              <span>{job.salary}</span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(job)}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1"
          >
            Details
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onApply(job)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}