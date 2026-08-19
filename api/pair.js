// Vercel Serverless Function — pwoksi pou QUEEN AKIRA V2
// Browser (HTTPS sou Vercel) -> fonksyon sa a (server-side) -> backend Pterodactyl (HTTP)
// Backend la deja gen CORS aktive, men nou pase pa isit pou evite
// mixed-content block yo lè sit la sèvi ak HTTPS epi backend la HTTP.

const BACKEND_URL = 'http://fi4.bot-hosting.net:20802/api/pair';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  try {
    const phone = req.body?.phone;

    const backendRes = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });

    const data = await backendRes.json().catch(() => ({}));
    res.status(backendRes.status).json(data);
  } catch (err) {
    console.error('❌ Vercel proxy error (AKIRA):', err.message);
    res.status(502).json({
      error: 'server_error',
      message: 'Pa kapab jwenn sèvè bot QUEEN AKIRA V2 la kounye a. Verifye li ap kouri.',
    });
  }
};
