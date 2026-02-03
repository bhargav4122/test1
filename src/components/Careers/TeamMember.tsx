// src/components/Careers/TeamMember.tsx
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Linkedin, Mail, Globe, Sparkles, Award, Star } from 'lucide-react';
import { useState } from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
  linkedin?: string;
  email?: string;
  website?: string;
  premiumLayout?: boolean;
  expertise?: string[];
}

const TeamMember = ({
  name,
  role,
  department,
  image,
  bio,
  linkedin,
  email,
  website,
  expertise = [],
  premiumLayout = false
}: TeamMemberProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Function to get initials for fallback avatar
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (premiumLayout) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8, scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={cn(
          "group relative rounded-3xl overflow-hidden",
          "bg-gradient-to-br from-white to-gray-50 dark:from-gray-900/90 dark:to-gray-800/90",

          "shadow-lg hover:shadow-2xl transition-all duration-500 h-full",
          "backdrop-blur-sm"
        )}
      >
        {/* Premium background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />



        {/* Content */}
        <div className="relative p-8 flex flex-col h-full z-10">
          {/* Premium Avatar Section */}
          <div className="relative mb-8 flex-shrink-0">
            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 z-20">
              <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse" />
            </div>

            <div className="relative w-48 h-48 mx-auto">
              {/* Outer decorative ring */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin-slow opacity-30"></div>
                <div className="absolute inset-[3px] rounded-full bg-white dark:bg-gray-900"></div>
              </div>

              {/* Avatar container */}
              <div className="relative w-full h-full z-10">
                {/* Premium avatar frame */}
                <div className="absolute inset-0 rounded-full p-1">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 p-[2px]">
                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 overflow-hidden border-4 border-white/50 dark:border-gray-800/50 shadow-2xl">
                      {/* Image with fixed positioning */}
                      {imgError ? (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                          <span className="text-white text-3xl font-bold tracking-wider">
                            {getInitials(name)}
                          </span>
                        </div>
                      ) : (
                        <div className="w-full h-full relative">
                          <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            style={{
                              objectPosition: '50% 20%',
                            }}
                            onContextMenu={(e) => e.preventDefault()}
                            onError={() => setImgError(true)}
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-full" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative dots */}

            </div>

            {/* Department badge with premium style */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-20">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-70"></div>
                <span className="relative px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl border border-white/20 whitespace-nowrap">
                  {department}
                </span>
              </div>
            </div>
          </div>

          {/* Name and Role - Premium styling */}
          <div className="text-center mb-6 flex-shrink-0">


            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
              {name}
            </h3>
            <div className="relative inline-block">
              <p className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 animate-gradient-x">
                {role}
              </p>
            </div>
          </div>

          {/* Bio - Premium styling */}
          <div className="mb-8 flex-grow">
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed pl-4 line-clamp-3 font-medium">
                {bio}
              </p>
            </div>
          </div>

          {/* Expertise Tags - Premium */}
          {expertise.length > 0 && (
            <div className="mb-6 flex-shrink-0">
              <div className="flex flex-wrap gap-2 justify-center">
                {expertise.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50"
                  >
                    {skill}
                  </span>
                ))}
                {expertise.length > 3 && (
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-600 dark:text-gray-400">
                    +{expertise.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Social Links - Premium styling */}
          <div className="flex justify-center gap-4 flex-shrink-0">
            {linkedin && (
              <motion.a
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-12 h-12 rounded-2xl flex items-center justify-center group/social"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/50 group-hover/social:scale-110 transition-transform duration-300"></div>
                <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </motion.a>
            )}
            {email && (
              <motion.a
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                href={`mailto:${email}`}
                className="relative w-12 h-12 rounded-2xl flex items-center justify-center group/social"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-600/10 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl border border-red-200/50 dark:border-red-700/50 group-hover/social:scale-110 transition-transform duration-300"></div>
                <Mail className="h-5 w-5 text-red-600 dark:text-red-400" />
              </motion.a>
            )}
            {website && (
              <motion.a
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-12 h-12 rounded-2xl flex items-center justify-center group/social"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/10 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl border border-green-200/50 dark:border-green-700/50 group-hover/social:scale-110 transition-transform duration-300"></div>
                <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
              </motion.a>
            )}
          </div>


        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl"></div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-transparent transform rotate-45 translate-x-8 -translate-y-8"></div>
        </div>
      </motion.div>
    );
  }

  // Original layout (if needed for other pages)
  return (
    <div className="text-center p-4">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1">
          <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              style={{ objectPosition: '50% 20%' }}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600 dark:text-gray-400">{role}</p>
      <p className="text-sm text-gray-500 dark:text-gray-500">{department}</p>
    </div>
  );
};

export default TeamMember;
