import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('http://72.5.42.40:3102/network-data');
    const data = await response.json();
    res.status(200).json(data); // Forward the response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
