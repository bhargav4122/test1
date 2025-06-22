import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';
import Hero from '../components/Hero2';

const Hp = () => {
  const [activeSection, setActiveSection] = useState(0);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Video segments for different sections
  const videoSegments = [
    '/videos/digital-transformation-intro.mp4',
    '/videos/data-analytics.mp4',
    '/videos/cloud-migration.mp4',
    '/videos/bi-dashboard.mp4',
    '/videos/ai-integration.mp4'
  ];

  // Section content
  const sections = [
    {
      title: "Digital Transformation Solutions",
      description: "Empower your business with cutting-edge digital strategies.",
      cta: "Explore Services"
    },
    {
      title: "Data Analytics & Insights",
      description: "Turn your data into actionable business intelligence.",
      cta: "Learn More"
    },
    {
      title: "Cloud Migration Services",
      description: "Seamlessly transition to scalable cloud infrastructure.",
      cta: "Our Approach"
    },
    {
      title: "Business Intelligence",
      description: "Interactive dashboards for real-time decision making.",
      cta: "See Examples"
    },
    {
      title: "AI Integration",
      description: "Leverage artificial intelligence to automate and optimize.",
      cta: "Discover Possibilities"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionHeight = windowHeight;
      const newActiveSection = Math.floor(scrollPosition / sectionHeight);
      
      if (newActiveSection !== activeSection && newActiveSection < sections.length) {
        setActiveSection(newActiveSection);
        
        // Change video source when section changes
        if (videoRef.current) {
          videoRef.current.src = videoSegments[newActiveSection];
          videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <div className="home-container" ref={containerRef}>
      {/* Background video element */}
      <div className="video-background">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          loop 
          playsInline
          key={activeSection} // Force re-render when changing
        >
          <source src={videoSegments[activeSection]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>
 <Hero />
      {/* Content sections */}
      {sections.map((section, index) => (
        <section 
          key={index}
          className={`content-section ${index === activeSection ? 'active' : ''}`}
          style={{ height: '100vh' }}
        >
          <div className="section-content">
            <h1>{section.title}</h1>
            <p>{section.description}</p>
            <button className="cta-button">{section.cta}</button>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Hp;