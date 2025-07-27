
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  
  if (req.method !== 'POST') {  // Reject non-POST requests
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, subject, html } = req.body;
    const data = await resend.emails.send({
      from: 'onboarding@businessanddatasolutions.com', // Your verified domain
      to,
      subject,
      html,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
