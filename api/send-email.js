// api/send-email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { 
    to, 
    name, 
    phone, 
    jobTitle, 
    jobId,
    university,
    graduationYear,
    currentYear,
    preferredField,
    linkedIn,
    portfolio,
    message 
  } = req.body;

  if (!to) {
    return res.status(400).json({ error: 'Missing recipient email' });
  }

  try {
    const isUniversityProgram = jobId === 'university-talent-program';
    const emailSubject = isUniversityProgram 
      ? `Application Received for ${jobTitle} (University Program)`
      : `Application Received for ${jobTitle}`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Application Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { color: #2563eb; font-size: 24px; margin-bottom: 20px; }
          .content { margin-bottom: 30px; }
          .details { background: #f8fafc; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .detail-item { margin-bottom: 10px; }
          .footer { font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 15px; }
          .button { 
            display: inline-block; 
            padding: 10px 20px; 
            background: #2563eb; 
            color: white; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 15px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">Application Received</div>
        
        <div class="content">
          <p>Dear ${name},</p>
          
          <p>Thank you for applying for the <strong>${jobTitle}</strong> position at Business & Data Solutions.</p>
          
          <div class="details">
            <div class="detail-item"><strong>Application Details:</strong></div>
            <div class="detail-item">Name: ${name}</div>
            <div class="detail-item">Email: ${to}</div>
            ${phone ? `<div class="detail-item">Phone: ${phone}</div>` : ''}
            ${isUniversityProgram ? `
              <div class="detail-item">University: ${university || 'Not provided'}</div>
              <div class="detail-item">Current Year: ${currentYear || 'Not provided'}</div>
              <div class="detail-item">Graduation Year: ${graduationYear || 'Not provided'}</div>
              <div class="detail-item">Preferred Field: ${preferredField || 'Not provided'}</div>
            ` : ''}
            ${linkedIn ? `<div class="detail-item">LinkedIn: <a href="${linkedIn}">View Profile</a></div>` : ''}
            ${portfolio ? `<div class="detail-item">Portfolio: <a href="${portfolio}">View Portfolio</a></div>` : ''}
          </div>

          ${message ? `
            <p><strong>Your Message:</strong></p>
            <div style="background: #f1f5f9; padding: 10px; border-left: 3px solid #2563eb; margin: 10px 0;">
              ${message}
            </div>
          ` : ''}
          
          <p>We've received your application and will review it carefully. ${isUniversityProgram ? 
            'The university program team will get back to you within 2-3 weeks.' : 
            'Our hiring team will contact you if your qualifications match our requirements.'}
          </p>
          
          <a href="https://businessanddatasolutions.com" class="button">Visit Our Website</a>
        </div>
        
        <div class="footer">
          <p>This is an automated message. Please do not reply directly to this email.</p>
          <p>© ${new Date().getFullYear()} Business & Data Solutions. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: 'Business & Data Solutions <Info@businessanddatasolutions.com>',
      to,
      subject: emailSubject,
      html: emailHtml,
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error('Email sending failed:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
