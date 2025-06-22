import React from 'react';
import { motion } from 'framer-motion';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  expertise: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    website?: string;
    email?: string;
  };
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  bio,
  image,
  expertise,
  socialLinks
}) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-blue-600 dark:text-blue-400 mb-2">{role}</p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{bio}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {expertise.map((skill, i) => (
            <span 
              key={i}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex space-x-4">
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} className="text-blue-500 hover:text-blue-700">
              LinkedIn
            </a>
          )}
          {socialLinks.twitter && (
            <a href={socialLinks.twitter} className="text-blue-400 hover:text-blue-600">
              Twitter
            </a>
          )}
          {socialLinks.website && (
            <a href={socialLinks.website} className="text-blue-600 hover:text-blue-800">
              Website
            </a>
          )}
          {socialLinks.email && (
            <a href={`mailto:${socialLinks.email}`} className="text-blue-500 hover:text-blue-700">
              Email
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMember;