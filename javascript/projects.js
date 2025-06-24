// =========================
// Mobile Menu Toggle
// =========================
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
});

// =========================
// Hero Background Image Carousel & Controls
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero-education');
  const bgDivs = hero.querySelectorAll('.hero-bg');
  const leftArrow = document.querySelector('.hero-arrow.left');
  const rightArrow = document.querySelector('.hero-arrow.right');

  const images = [
    "../images/projects/WebsiteProject.png",
    "../images/projects/schedule.jpg",
    "../images/projects/meeting.png",
  ];

  let currentIndex = 0;
  let interval;

  // Initialize backgrounds
  bgDivs[0].style.backgroundImage = `url('${images[0]}')`;
  bgDivs[1].style.backgroundImage = '';

  const setBackground = index => {
    if (index === currentIndex) return;
    const activeDiv = hero.querySelector('.hero-bg.active');
    const inactiveDiv = [...bgDivs].find(div => div !== activeDiv);

    inactiveDiv.style.backgroundImage = `url('${images[index]}')`;
    inactiveDiv.classList.add('active');
    activeDiv.classList.remove('active');

    currentIndex = index;
  };

  const nextImage = () => {
    const nextIdx = (currentIndex + 1) % images.length;
    setBackground(nextIdx);
  };

  const prevImage = () => {
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    setBackground(prevIdx);
  };

  const startRotation = () => {
    interval = setInterval(nextImage, 45000);
  };

  const resetRotation = () => {
    clearInterval(interval);
    startRotation();
  };

  leftArrow.addEventListener('click', () => {
    prevImage();
    resetRotation();
  });

  rightArrow.addEventListener('click', () => {
    nextImage();
    resetRotation();
  });

  startRotation();
});

// =========================
// Scroll Reveal for education cards
// =========================
const educationCards = document.querySelectorAll('.education-card');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  educationCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    const revealPoint = 150;

    if (cardTop < windowHeight - revealPoint) {
      card.classList.add('reveal');
    } else {
      card.classList.remove('reveal');
    }
  });
}

window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', () => {
  revealOnScroll();
  handleScrollJiggle();
});

// =========================
// Jiggle on Scroll Based on Scroll Speed
// =========================
let lastScrollY = window.scrollY;
let jiggleTimeout;

function handleScrollJiggle() {
  const currentY = window.scrollY;
  const deltaY = Math.abs(currentY - lastScrollY);
  lastScrollY = currentY;

  // Adjust intensity and clamp max value
  const jiggleAmount = Math.min(10, deltaY * 0.8); // multiplier can be tweaked

  educationCards.forEach(card => {
    card.style.transition = 'transform 0.15s ease-out';
    card.style.transform = `translateY(${(Math.random() > 0.5 ? -1 : 1) * jiggleAmount}px)`;
  });

  clearTimeout(jiggleTimeout);
  jiggleTimeout = setTimeout(() => {
    educationCards.forEach(card => {
      card.style.transition = 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)';
      card.style.transform = 'translateY(0)';
    });
  }, 80); // time after last scroll movement before returning to neutral
}