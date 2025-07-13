// pages/api/team-image.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verify authentication
  const token = req.headers.authorization;
  if (!token || token !== process.env.IMAGE_ACCESS_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  
  try {
    // Fetch original image
    const imageUrl = `https://your-storage-bucket.com/team/${id}.jpg`;
    const imageRes = await fetch(imageUrl);
    
    if (!imageRes.ok) throw new Error('Image not found');
    
    // Set security headers
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Add watermark (you'd need a proper image processing library)
    const imageBuffer = await imageRes.buffer();
    res.send(imageBuffer);
  } catch (error) {
    res.status(404).json({ error: 'Image not found' });
  }
}