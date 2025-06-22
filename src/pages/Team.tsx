import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamMember from '@/components/TeamMember';

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Chief Technology Officer",
    bio: "15+ years of experience in enterprise software and AI solutions. Led digital transformation projects for Fortune 500 companies.",
    image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=800",
    expertise: ["AI/ML", "Cloud Architecture", "Digital Transformation"],
    socialLinks: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "sarah@example.com"
    }
  },
  {
    name: "Michael Chen",
    role: "Lead Data Scientist",
    bio: "PhD in Computer Science, specializing in machine learning and predictive analytics. Published researcher in AI applications.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
    expertise: ["Machine Learning", "Data Analytics", "Python"],
    socialLinks: {
      linkedin: "https://linkedin.com",
      website: "https://example.com"
    }
  },
  {
    name: "Emily Rodriguez",
    role: "UX Director",
    bio: "Award-winning designer with expertise in user-centered design and accessibility. Former design lead at major tech companies.",
    image: "https://images.pexels.com/photos/3776932/pexels-photo-3776932.jpeg?auto=compress&cs=tinysrgb&w=800",
    expertise: ["UI/UX Design", "User Research", "Design Systems"],
    socialLinks: {
      twitter: "https://twitter.com",
      website: "https://example.com"
    }
  },
  {
    name: "David Kim",
    role: "Solutions Architect",
    bio: "Cloud architecture expert with extensive experience in AWS and Azure. Specialized in scalable enterprise solutions.",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800",
    expertise: ["Cloud Infrastructure", "DevOps", "Security"],
    socialLinks: {
      linkedin: "https://linkedin.com",
      email: "david@example.com"
    }
  },
  {
    name: "Lisa Thompson",
    role: "Product Manager",
    bio: "Strategic product leader with a track record of launching successful enterprise software solutions.",
    image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=800",
    expertise: ["Product Strategy", "Agile", "Market Research"],
    socialLinks: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  {
    name: "James Wilson",
    role: "Security Engineer",
    bio: "Cybersecurity expert with CISSP certification. Specializes in enterprise security architecture and threat prevention.",
    image: "https://images.pexels.com/photos/2379xxx/pexels-photo-2379xxx.jpeg?auto=compress&cs=tinysrgb&w=800",
    expertise: ["Cybersecurity", "Risk Management", "Compliance"],
    socialLinks: {
      linkedin: "https://linkedin.com",
      website: "https://example.com"
    }
  }
];

export default function Team() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    
      <main className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold gradient-text mb-4">Our Team</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Meet our team of experts dedicated to delivering innovative solutions and exceptional results for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              {...member}
            />
          ))}
        </div>
      </main>

    </div>
  );
}