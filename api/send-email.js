// api/send-email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const INTERNAL_TEAM_EMAIL = 'hr@businessanddatasolutions.com';

const generateApplicantEmail = (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Confirmation</title>
  <style>
    body { 
      font-family: 'Segoe UI', system-ui, sans-serif; 
      line-height: 1.6; 
      color: #1e293b; 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 24px;
      background-color: #f8fafc;
    }
    .email-container {
      background: white;
      border-radius: 8px;
      padding: 32px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .header {
      color: #1d4ed8;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 24px;
    }
    .divider {
      border-top: 1px solid #e2e8f0;
      margin: 24px 0;
    }
    .detail-card {
      background: #f1f5f9;
      padding: 16px;
      border-radius: 6px;
      border-left: 4px solid #1d4ed8;
      margin: 20px 0;
    }
    .detail-row {
      display: flex;
      margin-bottom: 12px;
    }
    .detail-label {
      font-weight: 600;
      min-width: 120px;
      color: #475569;
    }
    .footer {
      font-size: 12px;
      color: #64748b;
      margin-top: 32px;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background: #1d4ed8;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      margin: 16px 0;
    }
    .message-block {
      background: #f8fafc;
      padding: 16px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      margin: 16px 0;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Application Received</div>
    
    <p>Dear ${data.name},</p>
    
    <p>Thank you for applying for the <strong>${data.jobTitle}</strong> position.</p>
    
    <div class="detail-card">
      <div class="detail-row">
        <span class="detail-label">Reference ID:</span>
        <span>${data.jobId}</span>
      </div>
      ${data.phone && `
      <div class="detail-row">
        <span class="detail-label">Phone:</span>
        <span>${data.phone}</span>
      </div>
      `}
      ${data.university && `
      <div class="detail-row">
        <span class="detail-label">University:</span>
        <span>${data.university}</span>
      </div>
      `}
      ${data.preferredField && `
      <div class="detail-row">
        <span class="detail-label">Field of Interest:</span>
        <span>${data.preferredField}</span>
      </div>
      `}
    </div>

    ${data.message && `
    <p><strong>Your Message:</strong></p>
    <div class="message-block">
      ${data.message}
    </div>
    `}
    
    <p>We've received your application and will review it carefully. You can expect to hear back from us within 10-14 business days.</p>
    
    <a href="https://businessanddatasolutions.com/careers" class="button">View Career Portal</a>
    
    <div class="divider"></div>
    
    <div class="footer">
      <p>Business & Data Solutions</p>
      <p>This is an automated message. For inquiries, please contact <a href="mailto:hr@businessanddatasolutions.com">hr@businessanddatasolutions.com</a></p>
    </div>
  </div>
</body>
</html>
`;

const generateInternalNotification = (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Application: ${data.jobTitle}</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; line-height: 1.6; color: #334155; }
    .container { max-width: 800px; margin: 0 auto; padding: 20px; }
    h2 { color: #1e40af; margin-bottom: 8px; }
    h3 { color: #475569; margin-top: 0; }
    .info-grid { display: grid; grid-template-columns: 150px 1fr; gap: 12px; margin: 20px 0; }
    .info-label { font-weight: 600; color: #475569; }
    .message-box { background: #f8fafc; padding: 16px; border-radius: 6px; margin: 16px 0; }
    .footer { font-size: 12px; color: #64748b; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>New Application Received</h2>
    <h3>${data.jobTitle} (${data.jobId})</h3>
    
    <div class="info-grid">
      <div class="info-label">Candidate:</div>
      <div>${data.name}</div>
      
      <div class="info-label">Email:</div>
      <div>${data.to}</div>
      
      ${data.phone && `
      <div class="info-label">Phone:</div>
      <div>${data.phone}</div>
      `}
      
      ${data.university && `
      <div class="info-label">University:</div>
      <div>${data.university}</div>
      `}
      
      ${data.linkedIn && `
      <div class="info-label">LinkedIn:</div>
      <div><a href="${data.linkedIn}">View Profile</a></div>
      `}
    </div>
    
    ${data.message && `
    <h4>Candidate Message:</h4>
    <div class="message-box">
      ${data.message}
    </div>
    `}
    
    <div class="footer">
      <p>This application was submitted via the careers portal.</p>
    </div>
  </div>
</body>
</html>
`;

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
    preferredField,
    linkedIn,
    message 
  } = req.body;

  if (!to || !name || !jobTitle) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1. Send to applicant
    await resend.emails.send({
      from: 'Business & Data Solutions <careers@businessanddatasolutions.com>',
      to,
      subject: `Application Confirmation: ${jobTitle}`,
      html: generateApplicantEmail({
        name,
        jobTitle,
        jobId,
        phone,
        university,
        preferredField,
        message
      }),
    });

    // 2. Send internal notification (basic info only)
    await resend.emails.send({
      from: 'Careers Portal <noreply@businessanddatasolutions.com>',
      to: INTERNAL_TEAM_EMAIL,
      subject: `[New Application] ${name} - ${jobTitle}`,
      html: generateInternalNotification({
        to,
        name,
        phone,
        jobTitle,
        jobId,
        university,
        linkedIn,
        message
      }),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ 
      error: 'Emails queued but delivery not confirmed',
      details: error.message 
    });
  }
}
