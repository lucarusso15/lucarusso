// Fade-in on scroll — project grid photos

document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.project-grid__cell img');

  // Set initial state
  cells.forEach(img => {
    img.style.opacity    = '0';
    img.style.transform  = 'translateY(30px)';
    img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
      } else {
        entry.target.style.transition = 'none';
        if (entry.boundingClientRect.top < 0) {
          entry.target.style.opacity   = '0';
          entry.target.style.transform = 'translateY(-30px)';
        } else {
          entry.target.style.opacity   = '0';
          entry.target.style.transform = 'translateY(30px)';
        }
        requestAnimationFrame(() => {
          entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
      }
    });

  }, { threshold: 0.1 });

  cells.forEach(img => observer.observe(img));
});
