import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  console.log('Request received'); // Debug log
  
  try {
    const data = await resend.emails.send({
      from: 'bhargav@businessanddatasolutions.com', // Resend's test domain
      to: 'bhargavallu.ba@gmail.com', // Your exact email
      subject: 'Test from Debugged API',
      html: '<p>This should work now</p>'
    });
    
    console.log('Email sent:', data); // Debug log
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error); // Debug log
    return res.status(500).json({ 
      error: error.message,
      stack: error.stack // Include stack trace
    });
  }
};
