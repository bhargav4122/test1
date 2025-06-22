import React, { useState } from 'react';
import { saveFormData } from './firebase';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });
    
    const result = await saveFormData(formData);
    
    if (result.success) {
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', phone: '', service: '' }); // Reset form
    } else {
      setStatus({ loading: false, success: false, error: result.error });
    }
  };

  if (status.success) {
    return (
      <div className="success-message">
        <h3>Thank you!</h3>
        <p>Your submission has been received.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Service Needed</label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option value="">Select a service</option>
          <option value="web-development">Web Development</option>
          <option value="seo">SEO</option>
          <option value="consulting">Consulting</option>
        </select>
      </div>

      <button type="submit" disabled={status.loading}>
        {status.loading ? 'Submitting...' : 'Submit'}
      </button>

      {status.error && (
        <div className="error-message">
          Error: {status.error.message || 'Submission failed'}
        </div>
      )}
    </form>
  );
}

export default ContactForm;