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
          import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const INTERNAL_NOTIFICATION_EMAIL = 'bhargav@businessanddatasolutions.com';

const generateApplicantEmail = (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { color: #1e40af; font-size: 24px; font-weight: 600; margin-bottom: 20px; }
    .logo { max-width: 150px; margin-bottom: 20px; }
    .content { margin-bottom: 25px; }
    .details-card { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1e40af; }
    .detail-item { margin-bottom: 12px; display: flex; }
    .detail-label { font-weight: 600; min-width: 120px; }
    .footer { font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 15px; margin-top: 25px; }
    .button { display: inline-block; padding: 12px 24px; background: #1e40af; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; }
    .message-block { background: #f1f5f9; padding: 15px; border-radius: 6px; margin: 15px 0; font-style: italic; }
  </style>
</head>
<body>
  <img src="https://businessanddatasolutions.com/logo.png" alt="Company Logo" class="logo">
  <div class="header">Application Confirmation</div>
  
  <div class="content">
    <p>Dear ${data.name},</p>
    
    <p>Thank you for applying for the <strong>${data.jobTitle}</strong> position at Business & Data Solutions.</p>
    
    <div class="details-card">
      <div class="detail-item">
        <span class="detail-label">Reference ID:</span>
        <span>${data.jobId}</span>
      </div>
      ${data.phone && `
      <div class="detail-item">
        <span class="detail-label">Phone:</span>
        <span>${data.phone}</span>
      </div>
      `}
      ${data.university && `
      <div class="detail-item">
        <span class="detail-label">University:</span>
        <span>${data.university}</span>
      </div>
      `}
      ${data.preferredField && `
      <div class="detail-item">
        <span class="detail-label">Field:</span>
        <span>${data.preferredField}</span>
      </div>
      `}
    </div>

    ${data.message && `
    <p><strong>Your Message:</strong></p>
    <div class="message-block">${data.message}</div>
    `}
    
    <p>We've received your application and our team will review it carefully. 
    ${data.jobId === 'university-talent-program' 
      ? 'The university program committee will contact you within 2-3 weeks.' 
      : 'You can expect to hear back from us within 10-14 business days.'}
    </p>
    
    <a href="https://businessanddatasolutions.com/careers" class="button">View Job Status</a>
  </div>
  
  <div class="footer">
    <p>This is an automated message. Please do not reply directly to this email.</p>
    <p>© ${new Date().getFullYear()} Business & Data Solutions. All rights reserved.</p>
    <p>${data.jobId}</p>
  </div>
</body>
</html>
`;

const generateInternalEmail = (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Application: ${data.jobTitle}</title>
</head>
<body>
  <h2>New Application Received</h2>
  <h3>${data.jobTitle} (${data.jobId})</h3>
  
  <table style="width: 100%; border-collapse: collapse;">
    <tr style="background: #f3f4f6;">
      <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Field</th>
      <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Value</th>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">${data.name}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td>
    </tr>
    ${data.phone && `
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">${data.phone}</td>
    </tr>
    `}
    ${data.university && `
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>University</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">${data.university}</td>
    </tr>
    `}
    ${data.linkedIn && `
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>LinkedIn</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;"><a href="${data.linkedIn}">View Profile</a></td>
    </tr>
    `}
  </table>

  ${data.message && `
  <h4 style="margin-top: 20px;">Candidate Message:</h4>
  <div style="background: #f9fafb; padding: 15px; border-radius: 4px;">
    ${data.message}
  </div>
  `}

  <p style="margin-top: 20px;">
    <a href="https://console.firebase.google.com/u/0/project/YOUR_PROJECT_ID/database/firestore/data/~2Fapplications~2F${data.applicationId}" 
       style="color: #3b82f6; text-decoration: underline;">
      View Full Application in Firebase
    </a>
  </p>
</body>
</html>
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const applicationData = req.body;

  if (!applicationData.to) {
    return res.status(400).json({ error: 'Missing recipient email' });
  }

  try {
    // Send to applicant
    await resend.emails.send({
      from: 'Business & Data Solutions <bhargav@businessanddatasolutions.com>',
      to: applicationData.email,
      subject: `Application Received: ${applicationData.jobTitle}`,
      html: generateApplicantEmail(applicationData),
    });

    // Send internal notification
    await resend.emails.send({
      from: 'Business & Data Solutions <bhargav@businessanddatasolutions.com>',
      to: INTERNAL_NOTIFICATION_EMAIL,
      subject: `[New Application] ${applicationData.name} - ${applicationData.jobTitle}`
     
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email sending failed:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
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
      from: 'Business & Data Solutions <hr@businessanddatasolutions.com>',
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
