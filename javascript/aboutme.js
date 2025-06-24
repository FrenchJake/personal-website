const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero-education');
  const leftArrow = document.querySelector('.hero-arrow.left');
  const rightArrow = document.querySelector('.hero-arrow.right');

  // Image paths (use forward slashes for consistency)
  const images = [
    "../images/experiences/Fast.jpg",
    "../images/experiences/PersonCoding.jpg",
    "../images/experiences/CodeImg.jpg",
  ];

  let currentIndex = 0;
  let interval;

  // Set background image based on current index
  const setBackground = index => {
    hero.style.backgroundImage = `url('${images[index]}')`;
  };

  // Show next image in rotation
  const nextImage = () => {
    currentIndex = (currentIndex + 1) % images.length;
    setBackground(currentIndex);
  };

  // Show previous image in rotation
  const prevImage = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    setBackground(currentIndex);
  };

  // Start automatic rotation every 45 seconds
  const startRotation = () => {
    interval = setInterval(nextImage, 45000);
  };

  // Restart rotation timer after manual navigation
  const resetRotation = () => {
    clearInterval(interval);
    startRotation();
  };

  // Event listeners for arrows
  leftArrow.addEventListener('click', () => {
    prevImage();
    resetRotation();
  });

  rightArrow.addEventListener('click', () => {
    nextImage();
    resetRotation();
  });

  // Initialize slider
  setBackground(currentIndex);
  startRotation();
});

function copyPhone(event) {
  event.preventDefault();
  const phoneNumber = "(224) - 548 - 1264";

  navigator.clipboard.writeText(phoneNumber)
    .then(() => {
      alert("Phone number copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy phone number: ", err);
    });
}