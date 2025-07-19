// src/components/Careers/TeamMember.tsx
import React, { useEffect, useRef, useState } from 'react';

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  website?: string;
  email?: string;
}

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  expertise?: string[];
  socialLinks?: SocialLinks;
}

const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, 
  role, 
  bio, 
  image, 
  expertise = [], 
  socialLinks = {} 
}) => {
  const [imageUrl, setImageUrl] = useState(image);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shouldFetch = !image.startsWith('http') && !image.startsWith('/');

    const fetchImage = async () => {
      try {
        const res = await fetch(`/api/team-image?id=${image}`);
        if (res.ok) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
        }
      } catch (error) {
        console.error('Error loading image:', error);
        setImageUrl('/default-profile.jpg');
      }
    };

    if (shouldFetch) {
      fetchImage();
    }

    const handleContextMenu = (e: MouseEvent) => {
      if (imageRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      if (imageRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      if (imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [image, imageUrl]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition hover:shadow-xl relative">
      <div 
        ref={imageRef}
        className="relative w-full h-56 overflow-hidden group bg-gray-200 dark:bg-gray-700"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-10 pointer-events-none" />
        
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover select-none"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            loading="lazy"
            onError={() => setImageUrl('/default-profile.jpg')}
          />
        )}
        
      
      </div>
      
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-blue-600 font-medium">{role}</p>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{bio}</p>
        
        {/* Expertise Tags */}
        {expertise?.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {expertise.map((skill, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
        
        {/* Social Links */}
        {Object.keys(socialLinks).length > 0 && (
          <div className="mt-4 flex justify-center space-x-3">
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon className="h-5 w-5 text-gray-500 hover:text-blue-700 dark:hover:text-blue-400" />
              </a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                <TwitterIcon className="h-5 w-5 text-gray-500 hover:text-blue-400" />
              </a>
            )}
            {socialLinks.website && (
              <a href={socialLinks.website} target="_blank" rel="noopener noreferrer">
                <GlobeIcon className="h-5 w-5 text-gray-500 hover:text-blue-600" />
              </a>
            )}
            {socialLinks.email && (
              <a href={`mailto:${socialLinks.email}`}>
                <MailIcon className="h-5 w-5 text-gray-500 hover:text-red-600" />
              </a>
            )}
          </div>
        )}
      </div>
      
      <div className="absolute top-2 right-2 bg-black/80 text-white text-[8px] px-1 py-0.5 rounded">
        © {new Date().getFullYear()}
      </div>
    </div>
  );
};

// Simple icon components (or import from your icon library)
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0a12 12 0 100 24 12 12 0 000-24zm0 22a10 10 0 110-20 10 10 0 010 20zm1-17h-2v2h2V5zm0 4h-2v6h2V9z"/>
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
  </svg>
);

export default TeamMember;