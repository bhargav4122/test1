// api/send-email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  // Only extract fields needed for applicant confirmation
  const { 
    to,        // Required
    name,      // Required
    jobTitle,  // Required
    phone = '', // Optional
    message = '' // Optional
  } = req.body;

  // Basic validation
  if (!to || !name || !jobTitle) {
    return res.status(400).json({ 
      error: 'Missing required fields (to, name, jobTitle)' 
    });
  }

  try {
    // Professional applicant confirmation only
    await resend.emails.send({
      from: 'Business & Data Solutions <careers@businessanddatasolutions.com>',
      to,
      reply_to: 'hr@businessanddatasolutions.com',
      subject: `Application Confirmation: ${jobTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { color: #1e40af; font-size: 24px; margin-bottom: 20px; }
            .details { background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .footer { font-size: 12px; color: #64748b; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">Application Received</div>
          <p>Dear ${name},</p>
          
          <p>Thank you for applying for the <strong>${jobTitle}</strong> position.</p>
          
          <div class="details">
            <p><strong>Application Summary:</strong></p>
            ${phone ? `<p>Phone: ${phone}</p>` : ''}
            ${message ? `<p>Your message: <em>${message}</em></p>` : ''}
          </div>
          
          <p>We'll review your application and contact you within 10-14 business days.</p>
          
          <div class="footer">
            <p>Business & Data Solutions</p>
            <p>This is an automated message. Please don't reply directly.</p>
          </div>
        </body>
        </html>
      `
    });

    return res.status(200).json({ success: true });
    
  } catch (error) {
    console.error('Email failed (non-critical):', error);
    return res.status(200).json({ 
      success: false,
      message: 'Confirmation queued but not sent' // Non-blocking error
    });
  }
}
