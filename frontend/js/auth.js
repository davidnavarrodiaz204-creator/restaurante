function verificarSesion() {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Debes iniciar sesión');
    window.location.href = 'login.html';
  }
}

// se ejecuta apenas entra a la página
verificarSesion();
