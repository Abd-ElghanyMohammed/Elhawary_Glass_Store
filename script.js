
// Logo click sound effect
const logoImg = document.querySelector('.logo img');
logoImg.addEventListener('click', () => {
  const audio = document.getElementById('glassBreakSound');
  audio.currentTime = 0; // reset to start
  audio.play();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
});

// Language toggle
const langToggle = document.getElementById('langToggle');
const htmlElement = document.documentElement;

function switchLanguage(lang) {
  const elements = document.querySelectorAll('[data-en], [data-ar]');
  elements.forEach(element => {
    if (lang === 'ar') {
      element.textContent = element.getAttribute('data-ar') || element.textContent;
      element.placeholder = element.getAttribute('data-ar') || element.placeholder;
      element.style.direction = 'rtl';
    } else {
      element.textContent = element.getAttribute('data-en') || element.textContent;
      element.placeholder = element.getAttribute('data-en') || element.placeholder;
      element.style.direction = 'ltr';
    }
  });

  // Update HTML attributes
  htmlElement.lang = lang;

  // Update toggle button text
  langToggle.textContent = lang === 'ar' ? 'عربي | EN' : 'EN | AR';

  // Toggle RTL class for location popup
  const locationContent = document.querySelector('.location-content');
  if (locationContent) {
    locationContent.classList.toggle('rtl', lang === 'ar');
  }
}

langToggle.addEventListener('click', () => {
  const currentLang = htmlElement.lang;
  const newLang = currentLang === 'en' ? 'ar' : 'en';
  switchLanguage(newLang);
  langToggle.classList.toggle('active');
});

// Initialize with English
switchLanguage('en');

// Fade-in animation on scroll removed as per user request
// Glass effect on scroll removed as per user request

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-section');
  if (hero) {
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
  }
 
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (scrolled > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Back to top button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Basic form validation
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return;
  }

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Here you would typically send the form data to a server
  alert('Thank you for your message! We will get back to you soon.');
  contactForm.reset();
});

// Location popup functionality
const locationLink = document.querySelector('.location-link');
const locationPopup = document.getElementById('locationPopup');
const closeLocationBtn = document.getElementById('closeLocation');

locationLink.addEventListener('click', (e) => {
  e.preventDefault();
  locationPopup.classList.remove('hidden');
});

closeLocationBtn.addEventListener('click', () => {
  locationPopup.classList.add('hidden');
});

// Close popup when clicking on background
locationPopup.addEventListener('click', (e) => {
  if (e.target === locationPopup) {
    locationPopup.classList.add('hidden');
  }
});

// Testimonials carousel auto-scroll (optional)
let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
const testimonialsContainer = document.querySelector('.testimonials-carousel');

function autoScrollTestimonials() {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  testimonialsContainer.scrollTo({
    left: testimonials[testimonialIndex].offsetLeft,
    behavior: 'smooth'
  });
}

// Auto-scroll testimonials every 5 seconds
setInterval(autoScrollTestimonials, 5000);

// Projects gallery auto-scroll disabled for manual arrow control

// Projects gallery carousel functionality
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
const projects = document.querySelectorAll('.project-slide');
let currentProjectIndex = 0;

function showProject(index) {
  projects.forEach((project, i) => {
    if (i === index) {
      project.style.opacity = '0';
      project.style.transform = 'translateX(100%) scale(0.8)';
      project.style.display = 'block';
      setTimeout(() => {
        project.style.opacity = '1';
        project.style.transform = 'translateX(0) scale(1)';
      }, 50);
    } else {
      project.style.opacity = '0';
      project.style.transform = 'translateX(-100%) scale(0.8)';
      setTimeout(() => {
        project.style.display = 'none';
      }, 500);
    }
  });
}

leftArrow.addEventListener('click', () => {
  currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
  showProject(currentProjectIndex);
  clearInterval(autoFlipInterval);
  autoFlipInterval = setInterval(() => {
    currentProjectIndex = (currentProjectIndex + 1) % projects.length;
    showProject(currentProjectIndex);
  }, 10000);
});

rightArrow.addEventListener('click', () => {
  currentProjectIndex = (currentProjectIndex + 1) % projects.length;
  showProject(currentProjectIndex);
  clearInterval(autoFlipInterval);
  autoFlipInterval = setInterval(() => {
    currentProjectIndex = (currentProjectIndex + 1) % projects.length;
    showProject(currentProjectIndex);
  }, 10000);
});

// Initialize with first project visible
showProject(currentProjectIndex);

// Auto-flip projects every 10 seconds if no interaction
let autoFlipInterval = setInterval(() => {
  currentProjectIndex = (currentProjectIndex + 1) % projects.length;
  showProject(currentProjectIndex);
}, 10000);

// WhatsApp button shake animation every 10 seconds
setInterval(() => {
  const whatsappBtn = document.querySelector('.whatsapp-float');
  whatsappBtn.classList.add('shake');
  setTimeout(() => {
    whatsappBtn.classList.remove('shake');
  }, 500);
}, 10000);




/* -------------------
   Language Popup Logic
-------------------- */
yesBtn.addEventListener('click', () => {
  if (htmlElement.lang === 'ar') {
    switchLanguage('en');
  }
  languagePopup.classList.add('hidden');
});

noBtn.addEventListener('click', () => {
  languagePopup.classList.add('hidden');
});

/* -------------------
   Notification Bar
-------------------- */
const notificationBar = document.getElementById('notificationBar');
const closeNotificationBtn = document.getElementById('closeNotification');

closeNotificationBtn.addEventListener('click', () => {
  notificationBar.style.display = 'none';
});

/* -------------------
   Offer Slide Bar
-------------------- */
const offerSlideBar = document.getElementById('offerSlideBar');

document.querySelectorAll('.offer-card-close-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.product-card');
    if (card) {
      card.style.display = 'none';
      offerSlideBar.classList.remove('hidden');
    }
  });
});

offerSlideBar.addEventListener('click', () => {
  const firstCard = document.querySelector('.product-card');
  if (firstCard) {
    firstCard.style.display = 'block';
    offerSlideBar.classList.add('hidden');
  }
});

offerSlideBar.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    offerSlideBar.click();
  }
});

/* -------------------
   Language Bar
-------------------- */
const languageBar = document.getElementById('languageBar');
const closeLanguageBtn = document.getElementById('closeLanguage');

// Show language bar every 10s
setInterval(() => {
  languageBar.classList.add('show');
}, 10000);


// New event listener to minimize offer card when clicking outside
document.addEventListener('click', (e) => {
  const offerCards = document.querySelectorAll('.product-card');
  const offerSlideBar = document.getElementById('offerSlideBar');
  let clickedInsideOfferCard = false;

  offerCards.forEach(card => {
    if (card.contains(e.target)) {
      clickedInsideOfferCard = true;
    }
  });

  if (!clickedInsideOfferCard) {
    // Hide all offer cards and show slide bar
    offerCards.forEach(card => {
      card.style.display = 'none';
    });
    if (offerSlideBar) {
      offerSlideBar.classList.remove('hidden');
    }
  }
});










