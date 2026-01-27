// /api/send-unsubscribe.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { email, name } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const htmlContent = `
      <div style="font-family:Inter,sans-serif; max-width:600px; margin:auto; padding:20px; background:#fff; border-radius:15px;">
        <h2 style="color:#ef4444;">Unsubscribe Confirmation</h2>
        <p>Hi ${name || email},</p>
        <p>You have successfully unsubscribed from <strong>Business & Data Solutions Newsletter</strong>.</p>
        <p>If this was a mistake, you can <a href="https://www.businessanddatasolutions.com/blog/" style="color:#ef4444;">resubscribe here</a>.</p>
        <p>Thank you for being with us.</p>
        <p>— Business & Data Solutions Team</p>
        <p style="font-size:12px; color:#6b7280;">© ${new Date().getFullYear()} Business & Data Solutions Ltd | GDPR & ISO 27001 Compliant</p>
      </div>
    `;

        await resend.emails.send({
            from: "info@businessanddatasolutions.com",
            to: email,
            subject: "You’ve been unsubscribed",
            html: htmlContent,
        });

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error("Resend email error:", err);
        return res.status(500).json({ error: "Failed to send email" });
    }
}
