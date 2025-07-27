import { useState } from 'react';
import './EmailSender.css'; // Optional styling

export default function EmailSender() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Test from Vite + Resend');
  const [message, setMessage] = useState('This email was sent via Resend and Vercel!');
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          subject,
          html: `<p>${message}</p>`,
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="email-sender">
      <h2>Send Test Email</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Recipient Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="user@example.com"
          />
        </label>
        <label>
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </label>
        <label>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send Email'}
        </button>
      </form>
      {result && (
        <div className="result">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
