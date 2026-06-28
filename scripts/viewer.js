// Image viewer — project grid

document.addEventListener('DOMContentLoaded', () => {
  const viewer    = document.getElementById('viewer');
  const viewerImg = document.getElementById('viewer-img');
  const closeBtn  = document.getElementById('viewer-close');

  const imgs  = Array.from(document.querySelectorAll('.project-grid__cell img'));
  let current = 0;

  function open(index) {
    current = (index + imgs.length) % imgs.length;
    viewerImg.src = imgs[current].src;
    viewer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    viewer.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Open on click
  imgs.forEach((img, i) => {
    img.addEventListener('click', () => open(i));
  });

  // Close button
  closeBtn.addEventListener('click', close);

  // Click on viewer: left half = prev, right half = next
  viewer.addEventListener('click', e => {
    if (e.target === closeBtn) return;
    const mid = viewer.getBoundingClientRect().width / 2;
    e.clientX < mid ? open(current - 1) : open(current + 1);
  });

  // Cursor — changes based on mouse position
  viewer.addEventListener('mousemove', e => {
    if (e.target === closeBtn) { viewer.style.cursor = ''; return; }
    const mid = viewer.getBoundingClientRect().width / 2;
    viewer.style.cursor = e.clientX < mid ? 'w-resize' : 'e-resize';
  });

  viewer.addEventListener('mouseleave', () => { viewer.style.cursor = ''; });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (!viewer.classList.contains('active')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  open(current - 1);
    if (e.key === 'ArrowRight') open(current + 1);
  });
});
