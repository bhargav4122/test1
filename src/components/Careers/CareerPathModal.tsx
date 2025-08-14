import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Calendar, Award, Target, Briefcase } from 'lucide-react';
import { CareerPath } from '@/types/careers';

interface CareerPathModalProps {
  careerPath: CareerPath | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

export function CareerPathModal({ careerPath, isOpen, onClose, onApply }: CareerPathModalProps) {
  const [currentYear, setCurrentYear] = useState(0);

  if (!isOpen || !careerPath) return null;

  const currentYearData = careerPath.years[currentYear];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{careerPath.field} Career Path</h2>
            <p className="text-gray-600 mt-1">{careerPath.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mb-2 text-gray-900 dark:text-black hover:text-black"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Career Path Overview */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Duration</div>
                <div className="text-gray-600">{careerPath.totalDuration}</div>
              </div>
              <div>
                <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Final Role</div>
                <div className="text-gray-600">{careerPath.finalRole}</div>
              </div>
              <div>
                <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Field</div>
                <div className="text-gray-600">{careerPath.field}</div>
              </div>
            </div>
          </div>

          {/* Year Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {careerPath.years.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentYear(index)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    currentYear === index
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Year {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Current Year Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{currentYearData.title}</h3>
                <p className="text-gray-600 mt-1">{currentYearData.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{currentYearData.stipend}</div>
                <div className="text-sm text-gray-500">Monthly Stipend</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Skills */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  Skills to Learn
                </h4>
                <ul className="space-y-2">
                  {currentYearData.skills.map((skill, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Responsibilities */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-green-600" />
                  Responsibilities
                </h4>
                <ul className="space-y-2">
                  {currentYearData.responsibilities.map((resp, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-600" />
                  Project Types
                </h4>
                <ul className="space-y-2">
                  {currentYearData.projects.map((project, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="w-1 h-1 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                      {project}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-orange-600" />
                  Benefits
                </h4>
                <ul className="space-y-2">
                  {currentYearData.benefits.map((benefit, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="w-1 h-1 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setCurrentYear(Math.max(0, currentYear - 1))}
              disabled={currentYear === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentYear === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Year
            </button>

            <div className="text-center">
              <div className="text-sm text-gray-500">Year {currentYear + 1} of {careerPath.years.length}</div>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentYear + 1) / careerPath.years.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={() => setCurrentYear(Math.min(careerPath.years.length - 1, currentYear + 1))}
              disabled={currentYear === careerPath.years.length - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentYear === careerPath.years.length - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Next Year
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Apply Button */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={onApply}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply for {careerPath.field} Track
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}
