document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header shadow on scroll ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  const closeNav = () => {
    mainNav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile nav after choosing a link
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  /* ---------- Apply section: Tutoring / Course form toggle ---------- */
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const formPanels = {
    'form-tutoring': document.getElementById('form-tutoring'),
    'form-courses': document.getElementById('form-courses'),
  };

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      const target = btn.getAttribute('data-target');
      Object.entries(formPanels).forEach(([id, panel]) => {
        if (!panel) return;
        panel.hidden = id !== target;
      });
    });
  });

  /* ---------- Placeholder form links ----------
     Replace the '#' hrefs below (and the iframe src attributes in index.html)
     with your real Google Form / Airtable / Tally links once ready. */
  const tutoringFormLink = document.getElementById('tutoringFormLink');
  const courseFormLink = document.getElementById('courseFormLink');
  const FORM_URL_TUTORING = '#'; // TODO: replace with real form URL
  const FORM_URL_COURSES = '#';  // TODO: replace with real form URL

  if (tutoringFormLink) tutoringFormLink.setAttribute('href', FORM_URL_TUTORING);
  if (courseFormLink) courseFormLink.setAttribute('href', FORM_URL_COURSES);

  /* ---------- FAQ accordion ---------- */
  const accItems = document.querySelectorAll('.acc-item');

  accItems.forEach(item => {
    const trigger = item.querySelector('.acc-trigger');
    const panel = item.querySelector('.acc-panel');

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // close all others (single-open accordion)
      accItems.forEach(other => {
        const otherTrigger = other.querySelector('.acc-trigger');
        const otherPanel = other.querySelector('.acc-panel');
        otherTrigger.setAttribute('aria-expanded', 'false');
        otherPanel.style.maxHeight = null;
      });

      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

});
