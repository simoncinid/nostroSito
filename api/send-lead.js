const nodemailer = require('nodemailer');

const TO_EMAIL = 'webbitz.official@gmail.com';
const FROM_EMAIL = process.env.GMAIL_USER || 'reservationwebbitz@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

function buildEmailBody(body) {
  const fields = [
    ['Nome', body.name],
    ['Email', body.email],
    ['Telefono', body.phone || '-'],
    ['Azienda', body.company || '-'],
    ['Servizio richiesto', body.service || '-'],
    ['Altro servizio (se altro)', body.otherService || '-'],
    ['Budget', body.budget || '-'],
    ['Timeline', body.timeline || '-'],
    ['Messaggio / Descrizione progetto', body.message || '-'],
  ];
  return fields.map(([label, value]) => `${label}: ${value}`).join('\n');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!GMAIL_APP_PASSWORD) {
    console.error('GMAIL_APP_PASSWORD non configurata');
    return res.status(500).json({ error: 'Configurazione email mancante' });
  }

  const { name, email, phone, company, service, otherService, budget, message: messageText, timeline } = req.body || {};

  if (!name || !email || !messageText) {
    return res.status(400).json({ error: 'Campi obbligatori: nome, email, messaggio' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: FROM_EMAIL,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  const textBody = buildEmailBody({
    name,
    email,
    phone,
    company,
    service,
    otherService,
    budget,
    message: messageText,
    timeline,
  });

  try {
    await transporter.sendMail({
      from: `"Webbitz Lead" <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Lead in arrivo - ${name}`,
      text: textBody,
      html: `<pre style="font-family: sans-serif; white-space: pre-wrap;">${textBody.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Errore invio email:', err);
    return res.status(500).json({ error: 'Errore durante l\'invio del messaggio' });
  }
}
