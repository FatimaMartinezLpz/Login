
function login() {
  const correoInput = document.getElementById("loginCorreo").value.trim();
  const passwordInput = document.getElementById("loginPassword").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioEncontrado = usuarios.find(u => u.correo === correoInput && u.password === passwordInput);

  if (usuarioEncontrado) {
    alert("✅ Inicio de sesión exitoso");
    window.location.href = "bienvenida.html";
  } else {
    alert("❌ Correo o contraseña incorrectos");
  }
}
