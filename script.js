// Add blur to navbar on scroll
window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

// Highlight active nav link based on scroll position
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar a");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove("active"); // Remove active class from all links
          if (link.getAttribute("href").substring(1) === entry.target.id) {
            link.classList.add("active"); // Add active class to the in-view link
          }
        });
      }
    });
  }, {
    threshold: 0.6, // Trigger when 60% of the section is visible
  });

  sections.forEach(section => {
    observer.observe(section); // Observe each section
  });
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission (no page reload)

  const form = event.target;  // The form element itself

  // Create FormData from the form element
  const formData = new FormData(form);

  // Send the form data to Formspree via fetch API
  fetch(form.action, {
    method: form.method,
    body: formData
  })
  .then(response => {
    if (response.ok) {
      // Show success message and reset the form
      document.getElementById('success-message').style.display = 'block';
      form.reset();
    } else {
      throw new Error('Form submission failed');
    }
  })
  .catch(() => {
    // Show error message if something goes wrong
    document.getElementById('error-message').style.display = 'block';
  });
});

