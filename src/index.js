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

app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/api/shorten', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing url in body' });

  try {
    new URL(url);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  let code;
  for (let i = 0; i < 5; i++) {
    code = nanoid(7); 
    try {
      const link = await prisma.link.create({
        data: { code, url },
      });

      const protocol = req.headers['x-forwarded-proto'] || req.protocol;
      const host = req.get('host');
      const shortUrl = `${protocol}://${host}/${link.code}`;

      return res.json({ code: link.code, shortUrl, url: link.url });
    } catch (e) {
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

app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
