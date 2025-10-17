import express from 'express';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

const app = express();
const port = process.env.PORT ?? 3030;

app.get('/api/rss', async (req, res) => {
  const feedUrl = req.query.feedUrl as string;
  if (!feedUrl) {
    res.status(400).json({ error: 'feedUrl query parameter is required' });
    return;
  }

  try {
    const response = await axios.get(feedUrl);
    const parsed = await parseStringPromise(response.data, {
      explicitArray: false,
      trim: true
    });
    const channel = parsed?.rss?.channel;
    const items = Array.isArray(channel?.item) ? channel.item : [channel?.item].filter(Boolean);

    res.json({
      title: channel?.title ?? 'Flux',
      items: items.map((item: any) => ({
        title: item.title,
        link: item.link,
        source: channel?.title ?? 'Flux'
      }))
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch RSS feed', details: String(error) });
  }
});

app.listen(port, () => {
  console.log(`RSS proxy listening on http://localhost:${port}`);
});
