import React from 'react';

export default function ServiceLayout({ children, title, description }) {
  return (
    <div className="service-page">
      <header className="service-header">
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      
      <main className="service-content">
        {children}
      </main>
      
      <footer className="service-footer">
        <p>Contact us for more information</p>
      </footer>
    </div>
  );
}