import React from 'react';
import { 
  Cloud, BarChart3, TrendingUp, Shield, Brain, Zap, 
  Users, Search, Megaphone, UserCheck, ChevronRight 
} from 'lucide-react';
import { CareerPath } from '@/types/careers';

interface CareerPathCardProps {
  careerPath: CareerPath;
  onViewPath: (path: CareerPath) => void;
}

const iconMap = {
  Cloud,
  BarChart3,
  TrendingUp,
  Shield,
  Brain,
  Zap,
  Users,
  Search,
  Megaphone,
  UserCheck
};

export function CareerPathCard({ careerPath, onViewPath }: CareerPathCardProps) {
  const IconComponent = iconMap[careerPath.icon as keyof typeof iconMap] || Cloud;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{careerPath.field}</h3>
          <p className="text-gray-600 text-sm">{careerPath.totalDuration} • {careerPath.finalRole}</p>
        </div>
      </div>

      <p className="text-gray-600 mb-6">{careerPath.description}</p>

      {/* Year progression preview */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Career Progression</span>
          <span className="text-sm text-gray-500">{careerPath.years.length} Years</span>
        </div>
        <div className="flex gap-1">
          {careerPath.years.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-2 bg-gradient-to-r from-blue-200 to-blue-400 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Stipend range */}
      <div className="bg-green-50 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Stipend Range</span>
          <span className="font-bold text-green-600">
            {careerPath.years[0].stipend} - {careerPath.years[careerPath.years.length - 1].stipend}
          </span>
        </div>
      </div>

      <button
        onClick={() => onViewPath(careerPath)}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        View Career Path
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}