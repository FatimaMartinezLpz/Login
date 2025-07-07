
const RegistroUtils = {
  campoNoVacio: valor => valor.trim() !== "",
  formatearNombre: nombre => nombre.trim().replace(/\s+/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
  validarCorreo: correo => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo),
  validarTelefono: telefono => /^\d{10}$/.test(telefono),
  validarContrasena: contrasena => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(contrasena),
  confirmarContrasena: (c1, c2) => c1 === c2
};

document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formularioRegistro");

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const telefono = document.getElementById("telefono");
    const usuario = document.getElementById("usuario");
    const password = document.getElementById("password");
    const confirmar = document.getElementById("confirmar");

    nombre.value = RegistroUtils.formatearNombre(nombre.value);

    if (!RegistroUtils.campoNoVacio(nombre.value)) return alert("El nombre no puede estar vacío.");
    if (!RegistroUtils.validarCorreo(correo.value)) return alert("Correo no válido.");
    if (!RegistroUtils.validarTelefono(telefono.value)) return alert("Teléfono no válido (10 dígitos).");
    if (!RegistroUtils.campoNoVacio(usuario.value)) return alert("El usuario no puede estar vacío.");
    if (!RegistroUtils.validarContrasena(password.value)) return alert("Contraseña débil.");
    if (!RegistroUtils.confirmarContrasena(password.value, confirmar.value)) return alert("Las contraseñas no coinciden.");

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (usuarios.find(u => u.usuario === usuario.value.trim())) return alert("Nombre de usuario ya registrado.");
    if (usuarios.find(u => u.correo === correo.value.trim())) return alert("Correo ya registrado.");

    usuarios.push({
      nombre: nombre.value.trim(),
      correo: correo.value.trim(),
      telefono: telefono.value.trim(),
      usuario: usuario.value.trim(),
      password: password.value
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("✅ Registro exitoso");
    formulario.reset();
    window.location.href = "login.html";
  });
});
