const I18N = {
  fr: {
    'hero.eyebrow': 'Aucun Telegram requis',
    'hero.title': 'Your queen.<br>Your rules.',
    'hero.lede': "Entre ton numéro WhatsApp, reçois un code de pairing, colle-le dans <strong data-i18n=\"hero.ledeStrong\">Appareils liés</strong>. Moins d'une minute — aucun compte Telegram nécessaire.",
    'step1.label': 'Étape 1',
    'step1.title': 'Entre ton numéro WhatsApp',
    'step1.hint': 'Indicatif pays inclus, sans « + » et sans le « 0 » initial. Exemple : <span class="mono">50943014307</span>',
    'step1.fieldLabel': 'Numéro WhatsApp',
    'step1.button': 'Générer le code',
    'step2.label': 'Étape 2',
    'step2.title': 'Colle ce code dans WhatsApp',
    'step2.hint': 'Ouvre <strong>WhatsApp → Paramètres → Appareils liés → Lier un appareil</strong>, puis choisis « Lier avec le numéro de téléphone ».',
    'step2.copy': 'Copier',
    'step2.expiry': "Ce code expire rapidement — redemande-en un s'il ne fonctionne plus.",
    'step2.retry': 'Demander un autre code',
    'blocked.label': 'Indisponible',
    'blocked.title': 'Le serveur est occupé',
    'blocked.msg': 'Réessaie dans un instant.',
    'blocked.back': 'Retour',
    'how.title': 'Comment ça marche',
    'how.step1': 'Tu entres ton numéro, le site demande un code directement au bot.',
    'how.step2': 'WhatsApp te donne un code à 8 caractères pour confirmer que c\'est toi.',
    'how.step3': 'Colle le code dans Appareils liés — le bot est actif sur ton numéro.',
    'social.title': 'Nous retrouver ailleurs',
    'social.whatsapp': 'Canal WhatsApp',
    'social.group': 'Groupe WhatsApp',
    'footer.credit': 'QUEEN AKIRA V2 — powered by',
  },
  en: {
    'hero.eyebrow': 'No Telegram required',
    'hero.title': 'Your queen.<br>Your rules.',
    'hero.lede': 'Enter your WhatsApp number, get a pairing code, paste it into <strong data-i18n="hero.ledeStrong">Linked Devices</strong>. Takes less than a minute — no Telegram account needed.',
    'step1.label': 'Step 1',
    'step1.title': 'Enter your WhatsApp number',
    'step1.hint': 'Include the country code, no "+" and no leading "0". Example: <span class="mono">50943014307</span>',
    'step1.fieldLabel': 'WhatsApp number',
    'step1.button': 'Generate code',
    'step2.label': 'Step 2',
    'step2.title': 'Paste this code into WhatsApp',
    'step2.hint': 'Open <strong>WhatsApp → Settings → Linked Devices → Link a Device</strong>, then choose "Link with phone number instead".',
    'step2.copy': 'Copy',
    'step2.expiry': 'This code expires shortly — request a new one if it does.',
    'step2.retry': 'Request another code',
    'blocked.label': 'Not available',
    'blocked.title': 'Server is full',
    'blocked.msg': 'Please try again later.',
    'blocked.back': 'Go back',
    'how.title': 'How it works',
    'how.step1': 'You enter your number, the site requests a code directly from the bot.',
    'how.step2': "WhatsApp gives you an 8-character code to confirm it's you.",
    'how.step3': 'Paste the code into Linked Devices — the bot is now active on your number.',
    'social.title': 'Find us elsewhere',
    'social.whatsapp': 'WhatsApp Channel',
    'social.group': 'WhatsApp Group',
    'footer.credit': 'QUEEN AKIRA V2 — powered by',
  },
};

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const val = I18N[lang]?.[key];
    if (val !== undefined) el.innerHTML = val;
  });
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
  });
  localStorage.setItem('qa_lang', lang);
}

document.querySelectorAll('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

applyLang(localStorage.getItem('qa_lang') || 'fr');
