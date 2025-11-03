// Main.js - interactions: navbar toggle, carousel, scroll reveal

document.addEventListener('DOMContentLoaded', function () {
  // 1) small helpers
  const $ = (q, root=document) => root.querySelector(q);
  const $$ = (q, root=document) => Array.from(root.querySelectorAll(q));

  // 2) Navbar mobile toggle
  const navToggle = $('.nav-toggle');
  const navLinks = $('.nav-links');

  navToggle && navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    navToggle.classList.toggle('open');
  });

  // close nav when clicking a link (mobile)
  $$('.nav-links a').forEach(a => a.addEventListener('click', () => {
    if (navLinks.classList.contains('show')) navLinks.classList.remove('show');
  }));

  // 3) Hero carousel basic
  const slidesWrap = document.querySelector('.card-slider .slides');
  const slides = Array.from(document.querySelectorAll('.card-slider .slide'));
  const prevBtn = document.querySelector('.card-slider .prev');
  const nextBtn = document.querySelector('.card-slider .next');
  const dotsWrap = document.querySelector('.card-slider .dots');

  let index = 0;
  let slideWidth = slidesWrap.clientWidth || 400;
  let autoplayTimer;

  // create dots
  function buildDots(){
    dotsWrap.innerHTML = '';
    slides.forEach((s, i) => {
      const b = document.createElement('button');
      b.dataset.i = i;
      b.addEventListener('click', () => goTo(i));
      if(i === 0) b.style.background = 'rgba(255,255,255,0.9)';
      dotsWrap.appendChild(b);
    });
  }

  function updateDots(){
    Array.from(dotsWrap.children).forEach((d, i) => {
      d.style.background = (i === index) ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.12)';
    });
  }

  function setSlidePos() {
    // ensure the width is used per slide
    const rect = slidesWrap.getBoundingClientRect();
    slideWidth = rect.width;
    slidesWrap.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    setSlidePos();
    updateDots();
    restartAutoplay();
  }

  function next() {
    goTo(index + 1);
  }
  function prev() {
    goTo(index - 1);
  }

  if (slides.length > 0) {
    buildDots();
    setSlidePos();
    window.addEventListener('resize', setSlidePos);
    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    // autoplay
    function startAutoplay(){
      autoplayTimer = setInterval(next, 4200);
    }
    function stopAutoplay(){
      clearInterval(autoplayTimer);
    }
    function restartAutoplay(){
      stopAutoplay();
      startAutoplay();
    }

    // pause on hover
    const sliderEl = document.querySelector('.card-slider');
    sliderEl.addEventListener('mouseenter', stopAutoplay);
    sliderEl.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
  }

  // 4) Scroll reveal (IntersectionObserver)
  const revealElements = $$('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealElements.forEach(el => observer.observe(el));

  // 5) Small nicety: current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // keyboard accessibility for carousel
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

});
