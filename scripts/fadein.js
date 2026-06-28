// Fade-in on scroll — project grid photos

document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.project-grid__cell img');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        // Image fully out of viewport — reset (not visible to user)
        entry.target.classList.remove('is-visible');
      }
    });
  }, { threshold: 0 });

  cells.forEach(img => observer.observe(img));
});
