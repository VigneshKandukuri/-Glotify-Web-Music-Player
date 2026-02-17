// Floating glow effect follows the cursor
(function() {
  const glow = document.querySelector('.hero-glow');
  if (!glow) return;

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    glow.style.transform = `translate(${x}px, ${y}px)`;
  });
})();

// Icon hover enhancement for nav icons (already defined in CSS, keep a JS backup just in case)
(function() {
  const icons = document.querySelectorAll('.nav-icons i');
  icons.forEach((icon) => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.25) rotate(12deg)';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'scale(1)';
    });
  });
})();
const links = document.querySelectorAll('.nav-links a');
links.forEach(link=>{
  if(link.href === window.location.href){
    link.classList.add('active');
  }
});
