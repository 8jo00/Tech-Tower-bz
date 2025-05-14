document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  // Toggle menu visibility
  toggleButton.addEventListener('click', function(e) {
    e.stopPropagation();
    mobileMenu.classList.toggle('show');
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!mobileMenu.contains(e.target) && e.target !== toggleButton) {
      mobileMenu.classList.remove('show');
    }
  });

  // Close menu when clicking a link (optional)
  const menuLinks = document.querySelectorAll('.mobile-menu a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('show');
    });
  });
});