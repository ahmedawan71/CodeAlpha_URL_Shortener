const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { nanoid } = require('nanoid');
const cors = require('cors');
const path = require('path');

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/api/shorten', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing url in body' });

  // Validate URL
  try {
    // throws if invalid
    new URL(url);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  // Try to create unique code (retry on collision)
  let code;
  for (let i = 0; i < 5; i++) {
    code = nanoid(7); // 7-char short code
    try {
      const link = await prisma.link.create({
        data: { code, url },
      });

      const protocol = req.headers['x-forwarded-proto'] || req.protocol;
      const host = req.get('host');
      const shortUrl = `${protocol}://${host}/${link.code}`;

      return res.json({ code: link.code, shortUrl, url: link.url });
    } catch (e) {
      // If unique constraint fail (rare), loop and generate another code
      if (e.code === 'P2002') continue;
      console.error(e);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  return res.status(500).json({ error: 'Could not generate unique code' });
});

app.get('/:code', async (req, res) => {
  const { code } = req.params;
  const link = await prisma.link.findUnique({ where: { code } });
  if (!link) return res.status(404).send('Short URL not found');

  return res.redirect(link.url);
});

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
