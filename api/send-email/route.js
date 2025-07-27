import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { to } = await request.json();
    const { data, error } = await resend.emails.send({
      from: 'bhargav@businessanddatasolutions.com',
      to,
      subject: 'Test Email',
      html: '<p>Test email from Vercel!</p>'
    });

    if (error) throw error;
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
