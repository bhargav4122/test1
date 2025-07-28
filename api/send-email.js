import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'bhargavallu.ba@gmail.com',
      subject: 'Test from Updated Vercel Config',
      html: '<p>Existing routes remain unaffected</p>'
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
