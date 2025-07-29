// api/send-email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { to, name, phone, jobTitle } = req.body;

  if (!to) {
    return res.status(400).json({ error: 'Missing recipient email' });
  }

  try {
    const data = await resend.emails.send({
      from: 'bhargav@businessanddatasolutions.com',
      to,
      subject: `Application Received for ${jobTitle || 'a Role'}`,
      html: `<strong>Thank you, ${name}!</strong><br/>We received your application.<br/>Phone: ${phone}`,
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error('Email sending failed:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
