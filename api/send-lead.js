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
  console.log('[send-lead] Richiesta ricevuta, method:', req.method);

  if (req.method !== 'POST') {
    console.log('[send-lead] Method non consentito');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body || {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}');
    } catch (e) {
      console.error('[send-lead] Body JSON non valido:', e.message);
      return res.status(400).json({ error: 'Richiesta non valida' });
    }
  }
  console.log('[send-lead] Body ricevuto:', { ...body, message: body.message ? '[presente]' : '[vuoto]' });

  if (!GMAIL_APP_PASSWORD) {
    console.error('[send-lead] GMAIL_APP_PASSWORD non configurata');
    return res.status(500).json({ error: 'Configurazione email mancante. Imposta GMAIL_APP_PASSWORD su Vercel.' });
  }

  const { name, email, phone, company, service, otherService, budget, message: messageText, timeline } = body;

  if (!name || !email || !messageText) {
    console.log('[send-lead] Campi mancanti: name=', !!name, 'email=', !!email, 'message=', !!messageText);
    return res.status(400).json({ error: 'Campi obbligatori: nome, email, messaggio' });
  }

  console.log('[send-lead] Creazione transporter SMTP da', FROM_EMAIL);
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
    console.log('[send-lead] Invio email in corso...');
    await transporter.sendMail({
      from: `"Webbitz Lead" <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Lead in arrivo - ${name}`,
      text: textBody,
      html: `<pre style="font-family: sans-serif; white-space: pre-wrap;">${textBody.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`,
    });
    console.log('[send-lead] Email inviata con successo a', TO_EMAIL);
    return res.status(200).json({ success: true });
  } catch (err) {
    const errMsg = err.message || String(err);
    console.error('[send-lead] Errore invio email:', errMsg);
    console.error('[send-lead] Stack:', err.stack);
    return res.status(500).json({
      error: 'Invio fallito. Riprova più tardi o contattaci direttamente.',
      detail: errMsg,
    });
  }
}
