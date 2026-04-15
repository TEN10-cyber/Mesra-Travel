// script.js — All interactivity for Mesra Travel

console.log('Mesra Travel loaded!');

// ===== NAVIGATION =====

function initNav() {
  var navbar     = document.getElementById('navbar');
  var hamburger  = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  // Navbar transparent at top, solid when scrolled
  window.addEventListener('scroll', function() {
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(245,243,238,0.96)';
      navbar.style.boxShadow  = '0 1px 3px rgba(0,0,0,0.07)';
    } else {
      navbar.style.background = 'transparent';
      navbar.style.boxShadow  = 'none';
    }
  });

  // Hamburger: show/hide mobile menu
  hamburger.addEventListener('click', function() {
    mobileMenu.classList.toggle('open');
  });
}

initNav();

// ===== SCROLL REVEAL ANIMATION =====

function initScrollReveal() {
  var elements = document.querySelectorAll('.reveal');

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(function(el) {
    observer.observe(el);
  });
}

initScrollReveal();

// ===== FILTER BUTTONS (destinations page only) =====

function initFilter() {
  var buttons = document.querySelectorAll('.filter-btn');
  var cards   = document.querySelectorAll('.dest-card');

  if (!buttons.length) return; // stops here if not on destinations page

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {

      // Highlight clicked button
      buttons.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.dataset.filter;

      // Show or hide each card
      cards.forEach(function(card) {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

initFilter();

// ===== CONTACT FORM VALIDATION (about page only) =====

function initContactForm() {
  var form    = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');

  if (!form) return; // stops here if not on about page

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // stop page from reloading

    var name    = document.getElementById('name').value.trim();
    var email   = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();

    // Basic checks
    if (name === '') {
      alert('Please enter your full name.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      alert('Please enter a valid email address.');
      return;
    }

    if (message.length < 10) {
      alert('Please enter a message (at least 10 characters).');
      return;
    }

    // All good — show success message and clear form
    success.style.display = 'block';
    form.reset();
  });
}

initContactForm();