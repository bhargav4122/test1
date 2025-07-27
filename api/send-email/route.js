// /api/send-email/route.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {  // ← Critical check
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to } = req.body;
    const { data } = await resend.emails.send({
      from: 'bhargav@businessanddatasolutions.com',
      to,
      subject: 'Test Email',
      html: '<p>Test content</p>'
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
