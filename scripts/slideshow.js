// Slideshow — Gli alberi non dormono

const overlay  = document.getElementById('project-overlay');
const labelBtn = document.getElementById('project-label-btn');

// Overlay open/close
function openOverlay() {
  const activeSlide = document.querySelector('.slide.active');
  const imgs        = activeSlide.querySelectorAll('img');
  const content     = document.querySelector('.project-overlay__content');

  if (imgs.length > 0) {
    const r = imgs[0].getBoundingClientRect();
    if (r.width  < 430) content.style.width  = r.width  + 'px';
    if (r.height < 430) content.style.height = r.height + 'px';
  } else {
    content.style.width  = '';
    content.style.height = '';
  }

  overlay.classList.add('active');
  labelBtn.textContent = 'Close';
}

function closeOverlay() {
  overlay.classList.remove('active');
  labelBtn.textContent = 'About this project';
}

labelBtn.addEventListener('click', () => {
  overlay.classList.contains('active') ? closeOverlay() : openOverlay();
});

overlay.addEventListener('click', e => {
  if (e.target === overlay) closeOverlay();
});

// Slides
const slides    = document.querySelectorAll('.slide');
const slideshow = document.querySelector('.slideshow');
const total     = slides.length;
let current     = 0;

function goTo(index) {
  slides[current].classList.remove('active');
  current = (index + total) % total;
  slides[current].classList.add('active');
}

// Click navigation
slides.forEach(slide => {
  slide.addEventListener('click', e => {
    const img  = e.target.closest('img');
    const rect = img ? img.getBoundingClientRect() : slide.getBoundingClientRect();
    e.clientX < rect.left + rect.width / 2 ? goTo(current - 1) : goTo(current + 1);
  });
});

// Cursors
document.querySelectorAll('.slide img').forEach(img => {
  img.addEventListener('mousemove', e => {
    const rect = img.getBoundingClientRect();
    img.style.cursor = e.clientX < rect.left + rect.width / 2 ? 'w-resize' : 'e-resize';
  });
  img.addEventListener('mouseleave', () => { img.style.cursor = ''; });
});

document.querySelectorAll('.slide').forEach(slide => {
  slide.addEventListener('mousemove', e => {
    const rect = slide.getBoundingClientRect();
    slide.style.cursor = e.clientX < rect.left + rect.width / 2 ? 'w-resize' : 'e-resize';
  });
  slide.addEventListener('mouseleave', () => { slide.style.cursor = ''; });
});

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (e.key === 'Escape')     closeOverlay();
  if (e.key === 'ArrowLeft')  goTo(current - 1);
  if (e.key === 'ArrowRight') goTo(current + 1);
});

// Autoplay — stops on interaction
let timer = setInterval(() => goTo(current + 1), 5000);

function resetTimer() {
  clearInterval(timer);
  timer = null;
}

slideshow.addEventListener('mouseenter', resetTimer);

goTo(0);
