// =================== THEME TOGGLE ===================
const toggle = document.getElementById('modeToggle');
const logoImage = document.getElementById('logoImage');

// Load saved theme preference
if (toggle) {
  const savedMode = localStorage.getItem('theme');
  if (savedMode === 'light') {
    document.body.classList.remove('dark-mode');
    toggle.checked = true;
  } else {
    document.body.classList.add('dark-mode'); // default dark
    toggle.checked = false;
  }
  updateLogo();
  
  toggle.addEventListener('change', () => {
    const isLight = toggle.checked;
    document.body.classList.toggle('dark-mode', !isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateLogo();
    updateFooterLogo();
  });
}

function updateLogo() {
  if (logoImage) {
    const isDark = document.body.classList.contains('dark-mode');
    logoImage.src = isDark ? 'Logo_dark.png' : 'Logo_light.png';
  }
}

function updateFooterLogo() {
  const footerLogo = document.getElementById('footerLogo');
  if (footerLogo) {
    const isDark = document.body.classList.contains('dark-mode');
    footerLogo.src = isDark ? 'Footer/footer_light.png' : 'Footer/footer_dark.png';
  }
}
updateFooterLogo();

// =================== MOBILE MENU TOGGLE ===================
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenu) {
  mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    document.querySelector('.nav-links')?.classList.toggle('mobile-active');
  });
}

// =================== SLIDER ===================
let currentSlide = 0;
const slides = document.querySelectorAll(".full-slider .slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    const isActive = i === index;
    slide.classList.toggle("active", isActive);

    const text = slide.querySelector('.slide-text');
    if (text) {
      text.classList.remove('animate-in');
      void text.offsetWidth; // trigger reflow
      if (isActive) text.classList.add('animate-in');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

if (slides.length > 0) {
  setInterval(nextSlide, 5000);
  showSlide(currentSlide);
}

// =================== SCROLL ANIMATIONS ===================
const fadeElements = document.querySelectorAll('.scroll-fade');
if (fadeElements.length > 0) {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('animate-in', entry.isIntersecting);
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => fadeObserver.observe(el));
}

const importanceBlocks = document.querySelectorAll('.importance-block.animate-top');
if (importanceBlocks.length > 0) {
  const blockObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      const index = [...importanceBlocks].indexOf(el);
      if (entry.isIntersecting) {
        el.style.transitionDelay = `${index * 0.2}s`;
        el.classList.add('animate-in');
      } else {
        el.classList.remove('animate-in');
        el.style.transitionDelay = '0s';
      }
    });
  }, { threshold: 0.2 });

  importanceBlocks.forEach(el => blockObserver.observe(el));
}

// =================== COUNTER ===================
const counters = document.querySelectorAll('.count-number');
if (counters.length > 0) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        let current = 200;
        const step = Math.ceil((current - target) / 50);

        const updateCount = () => {
          if (current > target) {
            current -= step;
            if (current < target) current = target;
            counter.textContent = current;
            requestAnimationFrame(updateCount);
          }
        };
        updateCount();
        countObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => countObserver.observe(counter));
}

// =================== FEEDBACK SLIDER ===================
const feedbackSlider = document.querySelector(".feedback-slider");
if (feedbackSlider) {
  const leftBtn = document.querySelector(".feedback-nav.left");
  const rightBtn = document.querySelector(".feedback-nav.right");
  const scrollStep = 400;

  leftBtn?.addEventListener("click", () => feedbackSlider.scrollLeft -= scrollStep);
  rightBtn?.addEventListener("click", () => feedbackSlider.scrollLeft += scrollStep);
}

// =================== CONTACT POPUP ===================
const contactBtn = document.getElementById("contactBtn");
const contactPopup = document.getElementById("contactPopup");
const closePopup = document.getElementById("closePopup");

if (contactBtn && contactPopup && closePopup) {
  contactBtn.addEventListener("click", () => {
    contactPopup.style.display = "flex";
  });

  closePopup.addEventListener("click", () => {
    contactPopup.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target.id === "contactPopup") {
      contactPopup.style.display = "none";
    }
  });
}

// =================== CONTACT FORM SUBMIT ===================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch("send-email.php", {
      method: "POST",
      body: formData
    })
    .then(res => res.text())
    .then(data => {
      alert(data);
      contactPopup.style.display = "none";
      this.reset();
    })
    .catch(() => alert("Error sending message"));
  });
}

