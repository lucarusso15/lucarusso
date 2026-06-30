// Fade-in on scroll — project images

document.addEventListener('DOMContentLoaded', () => {
  const imgs = document.querySelectorAll('.project-images img');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, { threshold: 0 });

  imgs.forEach(img => observer.observe(img));
});
