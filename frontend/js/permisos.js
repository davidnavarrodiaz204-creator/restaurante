document.addEventListener('DOMContentLoaded', () => {
  const rol = localStorage.getItem('rol');

  if (!rol) {
    window.location.href = 'login.html';
    return;
  }

  // Ocultar todo primero
  document.querySelectorAll('[data-rol]').forEach(el => {
    el.style.display = 'none';
  });

  // Mostrar solo lo permitido
  document.querySelectorAll(`[data-rol~="${rol}"]`).forEach(el => {
    el.style.display = 'block';
  });
});
