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
  const isMenuOpen = header.classList.contains('active');

  // Toggle classes
  menuToggle.classList.toggle('active', !isMenuOpen);
  header.classList.toggle('active', !isMenuOpen);
  menuOverlay.classList.toggle('active', !isMenuOpen);
  body.classList.toggle('menu-open', !isMenuOpen);
  
  // Directly control header display for mobile
  if (window.innerWidth <= 600) {
    if (!isMenuOpen) {
      header.style.display = 'flex'; // Show menu
    } else {
      header.style.display = 'none'; // Hide menu
    }
  }
  
  // Prevent scrolling when menu is open
  if (!isMenuOpen) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }
}

// Show menu toggle button on mobile and manage desktop menu display
function updateMenuDisplay() {
  if (window.innerWidth <= 600) {
    menuToggle.style.display = 'block';
    // On resize to mobile, ensure menu is hidden if not active
    if (!header.classList.contains('active')) {
        header.style.display = 'none';
    }
  } else {
    menuToggle.style.display = 'none';
    header.style.display = 'block'; // Ensure header is visible on desktop
    // Ensure body overflow is reset when switching to desktop view
    body.style.overflow = '';
    // Remove mobile-specific classes on desktop
    menuToggle.classList.remove('active');
    header.classList.remove('active');
    menuOverlay.classList.remove('active');
    body.classList.remove('menu-open');
  }
}

// Initial check and update on page load
updateMenuDisplay();

// Add event listener to menu toggle button
if (menuToggle) { // Check if the element exists
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });
}

// Add event listener to menu overlay
if (menuOverlay) { // Check if the element exists
  menuOverlay.addEventListener('click', toggleMenu);
}

// Close menu when clicking a nav link on mobile
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 600) {
      toggleMenu();
    }
  });
});

// Update menu visibility and state on window resize
window.addEventListener('resize', () => {
  updateMenuDisplay();
  
  // Reset submenu display on desktop
  if (window.innerWidth > 600) {
    document.querySelectorAll('.submenu').forEach((submenu) => {
      submenu.style.display = '';
    });
  }
});

// Handle submenu interactions for mobile
document.querySelectorAll('.has-submenu').forEach((item) => {
  const link = item.querySelector('a');
  const submenu = item.querySelector('.submenu');

  if (window.innerWidth <= 600) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = submenu.style.display === 'block';
      
      // Close all other submenus
      document.querySelectorAll('.submenu').forEach((sub) => {
        if (sub !== submenu) {
          sub.style.display = 'none';
        }
      });
      
      submenu.style.display = isOpen ? 'none' : 'block';
    });
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

document.addEventListener('DOMContentLoaded', function() {
    // Get all menu items with submenus
    const submenuItems = document.querySelectorAll('.has-submenu > a');
    
    // Add click event listener to each submenu item
    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the parent li element
            const parent = this.parentElement;
            
            // Toggle active class
            parent.classList.toggle('active');
            
            // Close other open submenus
            submenuItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.parentElement.classList.remove('active');
                }
            });
        });
    });

    // Close submenus when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.has-submenu')) {
            document.querySelectorAll('.has-submenu').forEach(item => {
                item.classList.remove('active');
            });
        }
    });
});
