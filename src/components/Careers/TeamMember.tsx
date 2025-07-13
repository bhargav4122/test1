// src/components/Careers/TeamMember.tsx
import React, { useEffect, useRef, useState } from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  expertise?: string[];
  socialLinks?: Record<string, string>;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, bio, image }) => {
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
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/70 text-white text-xs p-2 rounded">
            Image protected by copyright
          </div>
        </div>
      </div>
      
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-blue-600 font-medium">{role}</p>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{bio}</p>
      </div>
      
      <div className="absolute top-2 right-2 bg-black/80 text-white text-[8px] px-1 py-0.5 rounded">
        © {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default TeamMember;