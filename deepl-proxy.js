const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/translate', async (req, res) => {
  const { text, target_lang } = req.body;
  const params = new URLSearchParams();
  params.append('auth_key', '23c31e7f-1b11-4257-95c1-819bcfb40fee:fx');
  params.append('text', text);
  params.append('target_lang', target_lang);

  try {
    const deeplRes = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    const data = await deeplRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Errore nella traduzione' });
  }
});

app.listen(3001, () => console.log('Proxy listening on port 3001')); 