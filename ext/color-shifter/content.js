(() => {
  const style = document.createElement('style');
  style.innerHTML = `
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2));
      pointer-events: none;
      mix-blend-mode: screen;
    }
  `;
  document.documentElement.appendChild(style);
})();
