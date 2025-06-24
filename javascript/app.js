// =========================
// Mobile Menu Toggle
// =========================
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu?.addEventListener('click', () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
});

// =========================
// Phone Copy to Clipboard
// =========================
function copyPhone(event) {
  event.preventDefault();
  const phoneNumber = "(224) - 548 - 1264";

  navigator.clipboard.writeText(phoneNumber)
    .then(() => alert("Phone number copied to clipboard!"))
    .catch(err => console.error("Failed to copy phone number: ", err));
}

