/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";

// Use Firebase config to store credentials securely
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

// Create transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Callable function to send confirmation email
export const sendConfirmationEmail = functions.https.onCall(async (data, context) => {
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
    throw new functions.https.HttpsError("internal", "Email failed to send.");
  }
});
