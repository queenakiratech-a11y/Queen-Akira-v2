const stepForm = document.getElementById('step-form');
const stepCode = document.getElementById('step-code');
const stepBlocked = document.getElementById('step-blocked');

const pairForm = document.getElementById('pairForm');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');
const btnLabel = submitBtn.querySelector('.btn-label');
const btnSpinner = submitBtn.querySelector('.btn-spinner');
const formError = document.getElementById('formError');

const codeText = document.getElementById('codeText');
const copyBtn = document.getElementById('copyBtn');
const retryBtn = document.getElementById('retryBtn');
const backBtn = document.getElementById('backBtn');

const blockedTitle = document.getElementById('blockedTitle');
const blockedMsg = document.getElementById('blockedMsg');

let lastPhone = '';

function showStep(step) {
  [stepForm, stepCode, stepBlocked].forEach((s) => (s.hidden = true));
  step.hidden = false;
}

function setLoading(loading) {
  submitBtn.disabled = loading;
  btnSpinner.hidden = !loading;
  btnLabel.style.opacity = loading ? '0.6' : '1';
}

function showError(msg) {
  formError.textContent = msg;
  formError.hidden = false;
}

async function requestCode(phone) {
  formError.hidden = true;
  setLoading(true);
  try {
    const res = await fetch('/api/pair', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json().catch(() => ({}));

    if (res.status === 429) {
      showError(`Patiente ${data.retryAfter || 60}s avant de redemander un code.`);
      return;
    }
    if (res.status === 409 && data.error === 'already_paired') {
      showError('Ce numéro est déjà connecté au bot.');
      return;
    }
    if (!res.ok) {
      blockedTitle.textContent = 'Le serveur est occupé';
      blockedMsg.textContent = data.message || 'Réessaie dans un instant.';
      showStep(stepBlocked);
      return;
    }

    lastPhone = phone;
    codeText.textContent = data.code;
    showStep(stepCode);
  } catch (err) {
    blockedTitle.textContent = 'Connexion impossible';
    blockedMsg.textContent = 'Impossible de joindre le serveur du bot. Vérifie ta connexion.';
    showStep(stepBlocked);
  } finally {
    setLoading(false);
  }
}

pairForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const phone = phoneInput.value.replace(/\D/g, '');
  if (phone.length < 8) {
    showError('Numéro invalide — vérifie l\'indicatif pays et les chiffres.');
    return;
  }
  requestCode(phone);
});

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(codeText.textContent.replace(/\s|—/g, ''));
    copyBtn.textContent = '✓ Copié';
    copyBtn.classList.add('copied');
    setTimeout(() => {
      copyBtn.textContent = 'Copier';
      copyBtn.classList.remove('copied');
    }, 1800);
  } catch {}
});

retryBtn.addEventListener('click', () => {
  if (lastPhone) requestCode(lastPhone);
});

backBtn.addEventListener('click', () => showStep(stepForm));
