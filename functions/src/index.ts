import { onRequest } from "firebase-functions/v2/https";
import * as functions from "firebase-functions";
// import * as logger from "firebase-functions/logger";

import * as nodemailer from "nodemailer";
import * as express from "express";
import * as cors from "cors";
import * as AWS from "aws-sdk";
import * as dotenv from "dotenv";

// Load environment variables from .env file in functions folder
dotenv.config();

// ─────────────────────────────────────────────────────────
// 📩 EMAIL CONFIRMATION FUNCTION (Gmail SMTP)
// ─────────────────────────────────────────────────────────
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

export const sendConfirmationEmail = functions.https.onCall(
  async (data) => {
    const { email, name, company } = data;

    const mailOptions = {
      from: `"Your Company" <${gmailEmail}>`,
      to: email,
      subject: "Thanks for contacting us!",
      html: `
        <p>Hi ${name || "there"},</p>
        <p>Thank you for reaching out to us.</p>
        <p>We received the following details:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Company:</strong> ${company || "N/A"}</li>
        </ul>
        <p>We'll get back to you shortly.</p>
        <br/>
        <p>— Your Company Team</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error("Email Error:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Email failed to send."
      );
    }
  }
);

// ─────────────────────────────────────────────────────────
// ☁️ CLOUDFLARE R2: GENERATE SIGNED UPLOAD URL
// ─────────────────────────────────────────────────────────
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const s3 = new AWS.S3({
  endpoint: process.env.R2_ENDPOINT!,
  accessKeyId: process.env.R2_ACCESS_KEY_ID!,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  region: "auto",
  signatureVersion: "v4",
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME!;

app.post("/get-upload-url", async (req, res) => {
  const { fileName, fileType } = req.body;

  if (!fileName || !fileType) {
    return res.status(400).json({ error: "Missing fileName or fileType" });
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    ContentType: fileType,
    Expires: 300, // 5 minutes
  };

  try {
    const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
    return res.status(200).json({ uploadUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return res.status(500).json({ error: "Failed to generate signed URL" });
  }
});

export const api = onRequest(app);
