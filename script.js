// script.js – Demo preview portal with code validation and smooth interactions

// ---------- Demo Routes ----------
const previews = {
  "KERRY25": "Demos/kerrykay/",
  "SSAUTO11": "Demos/ss-auto/",
  "INSKIN08": "Demos/in-skin/",
  "KEVITAAH13": "Demos/kevitaah/"
};

// ---------- DOM Elements ----------
const form = document.getElementById('previewForm');
const codeInput = document.getElementById('codeInput');
const errorMessage = document.getElementById('errorMessage');
const previewCard = document.getElementById('previewCard');
const submitBtn = document.getElementById('submitBtn');

// ---------- State ----------
let isRedirecting = false; // prevent double submission during redirect

// ---------- Card entrance animation on load ----------
window.addEventListener('DOMContentLoaded', () => {
  // Small delay ensures the initial render is done before animating
  setTimeout(() => {
    previewCard.classList.add('visible');
  }, 100);
});

// ---------- Clear error on user interaction ----------
function clearError() {
  codeInput.classList.remove('error');
  errorMessage.classList.remove('visible');
  errorMessage.textContent = '';
  previewCard.classList.remove('shake');
}

codeInput.addEventListener('focus', clearError);
codeInput.addEventListener('input', clearError);

// ---------- Show animated error ----------
function showError(message) {
  // Prevent multiple overlapping animations
  if (errorMessage.classList.contains('visible')) return;

  codeInput.classList.add('error');
  errorMessage.textContent = message;
  errorMessage.classList.add('visible');

  // Trigger shake on the card
  previewCard.classList.remove('shake');
  // Force reflow to restart animation
  void previewCard.offsetWidth;
  previewCard.classList.add('shake');

  // Focus back to input for immediate correction
  codeInput.focus();
}

// ---------- Handle form submission ----------
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (isRedirecting) return;

  const rawCode = codeInput.value.trim().toUpperCase();

  // Empty input check
  if (!rawCode) {
    showError('Please enter a preview code.');
    return;
  }

  // Check against predefined routes
  if (previews.hasOwnProperty(rawCode)) {
    isRedirecting = true;
    submitBtn.textContent = 'Loading...';
    submitBtn.disabled = true;

    // Clean redirect to the demo folder
    window.location.href = previews[rawCode];
  } else {
    showError('Code not recognised. Please check and try again.');
  }
});

// Allow disabling button state reset if user navigates back (optional)
window.addEventListener('pageshow', (event) => {
  // If the page is loaded from bfcache, reset UI
  if (event.persisted) {
    isRedirecting = false;
    submitBtn.textContent = 'View My Preview';
    submitBtn.disabled = false;
    clearError();
  }
});
