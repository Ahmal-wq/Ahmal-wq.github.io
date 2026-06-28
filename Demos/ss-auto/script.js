// script.js – S&S Auto Repair Interactive Elements

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navMenu');
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    navList.classList.toggle('active');
  });
  // Close nav on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
      navToggle.setAttribute('aria-expanded', false);
    });
  });

  // --- Scroll fade-up animations ---
  const fadeEls = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach(el => observer.observe(el));

  // --- Gallery Lightbox ---
  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600', alt: 'Before repair' },
    { src: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600', alt: 'After repair' },
    // Add more placeholder images as needed
  ];
  const galleryGrid = document.getElementById('galleryGrid');
  galleryImages.forEach(img => {
    const el = document.createElement('img');
    el.src = img.src;
    el.alt = img.alt;
    el.loading = 'lazy';
    el.addEventListener('click', () => openLightbox(img.src, img.alt));
    galleryGrid.appendChild(el);
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('active');
  }
  lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });

  // --- Animated Counters (placeholder) ---
  // Could add a years-experience counter when it scrolls into view, using Intersection Observer similar to above.
  // Left as a suggestion for future enhancement.
});
