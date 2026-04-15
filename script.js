// script.js — All interactivity for Mesra Travel
console.log('Mesra Travel loaded!');

// ===== 1. NAVIGATION =====
function initNav() {
  var navbar     = document.getElementById('navbar');
  var hamburger  = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  if (!navbar) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(245,243,238,0.96)';
      navbar.style.boxShadow  = '0 1px 3px rgba(0,0,0,0.07)';
    } else {
      navbar.style.background = 'transparent';
      navbar.style.boxShadow  = 'none';
    }
  });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
    });
  }
}

initNav();

// ===== 2. SCROLL PROGRESS BAR =====
function initProgressBar() {
  var bar = document.createElement('div');
  bar.id = 'progressBar';
  document.body.appendChild(bar);

  window.addEventListener('scroll', function() {
    var scrollTop    = window.scrollY;
    var docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    var progress     = (scrollTop / docHeight) * 100;
    bar.style.width  = progress + '%';
  });
}

initProgressBar();

// ===== 3. TYPING ANIMATION =====
function initTyping() {
  var el = document.querySelector('.hero-content h1');
  if (!el) return;

  var text    = el.innerHTML;
  var words   = ['Malaysia', 'Sabah', 'the World'];
  var wordEl  = document.createElement('span');
  wordEl.className = 'typed-word';
  el.appendChild(wordEl);

  var i = 0;
  var charIndex = 0;
  var isDeleting = false;

  function type() {
    var current = words[i % words.length];
    if (isDeleting) {
      wordEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      wordEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    var speed = isDeleting ? 60 : 110;

    if (!isDeleting && charIndex === current.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      i++;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

initTyping();

// ===== 4. SCROLL REVEAL ANIMATION =====
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

// ===== 5. ANIMATED NUMBER COUNTER =====
function initCounters() {
  var counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var el      = entry.target;
        var target  = el.getAttribute('data-target');
        var suffix  = el.getAttribute('data-suffix') || '';
        var count   = 0;
        var step    = Math.ceil(target / 60);

        var timer = setInterval(function() {
          count += step;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          el.textContent = count + suffix;
        }, 30);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function(counter) {
    observer.observe(counter);
  });
}

initCounters();

// ===== 6. BACK TO TOP BUTTON =====
function initBackToTop() {
  var btn = document.createElement('button');
  btn.id = 'backToTop';
  btn.innerHTML = '&#8679;';
  btn.title = 'Back to top';
  document.body.appendChild(btn);

  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

initBackToTop();

// ===== 7. SMOOTH SCROLL FOR NAV LINKS =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

initSmoothScroll();

// ===== 8. FILTER BUTTONS (destinations page only) =====
function initFilter() {
  var buttons = document.querySelectorAll('.filter-btn');
  var cards   = document.querySelectorAll('.card');

  if (!buttons.length) return;

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      buttons.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.dataset.filter;

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

// ===== 9. CONTACT FORM VALIDATION (about page only) =====
function initContactForm() {
  var form    = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var name    = document.getElementById('name').value.trim();
    var email   = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();

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

    success.style.display = 'block';
    form.reset();
  });
}

initContactForm();
