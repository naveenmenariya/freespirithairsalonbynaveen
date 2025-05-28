// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Handle submenu interactions
document.querySelectorAll(".has-submenu").forEach((item) => {
  const link = item.querySelector("a");
  const submenu = item.querySelector(".submenu");

  // Show submenu on hover for desktop
  if (window.innerWidth > 768) {
    item.addEventListener("mouseenter", () => {
      submenu.style.display = "block";
    });

    item.addEventListener("mouseleave", () => {
      submenu.style.display = "none";
    });
  }

  // Toggle submenu on click for mobile
  if (window.innerWidth <= 768) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = submenu.style.display === "block";
      submenu.style.display = isOpen ? "none" : "block";
    });
  }
});

// Update active menu item based on scroll position
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

function updateActiveMenu() {
  const scrollPosition = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveMenu);

// Track CTA button clicks
document.querySelectorAll(".cta-button").forEach((button) => {
  button.addEventListener("click", () => {
    // You can add analytics tracking here
    console.log("CTA button clicked:", button.getAttribute("href"));
  });
});

// Handle window resize
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Update submenu behavior based on screen size
    document.querySelectorAll(".has-submenu").forEach((item) => {
      const submenu = item.querySelector(".submenu");
      if (window.innerWidth <= 768) {
        submenu.style.display = "none";
      }
    });
  }, 250);
});

// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('.header');
const menuOverlay = document.querySelector('.menu-overlay');
const body = document.body;

function toggleMenu() {
  menuToggle.classList.toggle('active');
  header.classList.toggle('active');
  menuOverlay.classList.toggle('active');
  body.style.overflow = header.classList.contains('active') ? 'hidden' : '';
}

menuToggle.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

// Close menu when clicking a nav link on mobile
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 600) {
      toggleMenu();
    }
  });
});

// Close menu on window resize if open
window.addEventListener('resize', () => {
  if (window.innerWidth > 600 && header.classList.contains('active')) {
    toggleMenu();
  }
});

// Service cards hover effect
const serviceCards = document.querySelectorAll(".service-card");
serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.boxShadow = "0 10px 30px rgba(139, 69, 19, 0.2)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.boxShadow = "none";
  });
});

// Testimonial Carousel Logic
(function() {
  const testimonials = document.querySelectorAll('.testimonial-card');
  let current = 0;
  function showTestimonial(idx) {
    testimonials.forEach((el, i) => {
      el.classList.toggle('active', i === idx);
    });
  }
  function nextTestimonial() {
    current = (current + 1) % testimonials.length;
    showTestimonial(current);
  }
  showTestimonial(current);
  setInterval(nextTestimonial, 4000);
})();
