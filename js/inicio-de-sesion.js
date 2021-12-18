"use strict";
window.addEventListener("load", () => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  // TODO: Swap login/signup
  const btnIniciarSesion = $("#btn__iniciar-sesion");
  const btnRegistrarse = $("#btn__registrarse");
  const contenedor_login_register = $(".contenedor__login-register");
  const formulario_login = $(".formulario__login");
  const formulario_register = $(".formulario__register");
  const caja_trasera_login = $(".caja__trasera-login");
  const caja_trasera_register = $(".caja__trasera-register");

  // TODO: Auht
  const formRegister = $("#form-register");
  const formLogin = $("#form-login");
  const emailAuth = $("#email_auth");

  // TODO: Funciones
  const anchoPagina = () => {
    if (window.innerWidth > 850) {
      caja_trasera_login.style.display = "block";
      caja_trasera_register.style.display = "block";
    } else {
      caja_trasera_register.style.display = "block";
      caja_trasera_register.style.opacity = "1";
      caja_trasera_login.style.display = "none";
      formulario_login.style.display = "block";
      formulario_register.style.display = "none";
      contenedor_login_register.style.left = "0px";
    }
  };

  const showLoginForm = () => {
    if (window.innerWidth > 850) {
      formulario_register.style.display = "none";
      contenedor_login_register.style.left = "10px";
      formulario_login.style.display = "block";
      caja_trasera_register.style.opacity = "1";
      caja_trasera_login.style.opacity = "0";
    } else {
      formulario_register.style.display = "none";
      contenedor_login_register.style.left = "0px";
      formulario_login.style.display = "block";
      caja_trasera_register.style.display = "block";
      caja_trasera_login.style.display = "none";
    }
  };

  const showRegisterForm = () => {
    if (window.innerWidth > 850) {
      formulario_register.style.display = "block";
      contenedor_login_register.style.left = "410px";
      formulario_login.style.display = "none";
      caja_trasera_register.style.opacity = "0";
      caja_trasera_login.style.opacity = "1";
    } else {
      formulario_register.style.display = "block";
      contenedor_login_register.style.left = "0px";
      formulario_login.style.display = "none";
      caja_trasera_register.style.display = "none";
      caja_trasera_login.style.display = "block";
      caja_trasera_login.style.opacity = "1";
    }
  };

  const registerUser = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(formRegister);
      const name = formData.get("name");
      const lastname = formData.get("lastname");
      const email = formData.get("email");
      const password = formData.get("password");
      const username = formData.get("username");
      const user = {
        name,
        lastname,
        email,
        password,
        username,
      };
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.ok == true) {
        Swal.fire({
          icon: "success",
          title: "Ok!",
          text: data.message,
        });
        formRegister.reset();
        emailAuth.value = data.user.email;
        showLoginForm();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error al intentar comunicarse con el servidor",
      });
    }
  };

  const loginWithUser = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(formLogin);
      const email = formData.get("email");
      const password = formData.get("password");
      const auth = {
        email,
        password,
      };
      const res = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        body: JSON.stringify(auth),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.ok == true) {
        Swal.fire({
          icon: "success",
          title: "Ok!",
          text: data.message,
        });
        // Guardar en localStorage
        localStorage.setItem("user", data);
        // redireccionar a la pagina principal
        window.location.href = "../index.html";
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error al intentar comunicarse con el servidor",
      });
    }
  };

  // TODO: Functions from Swap login/signup
  btnIniciarSesion.addEventListener("click", showLoginForm);
  btnRegistrarse.addEventListener("click", showRegisterForm);
  window.addEventListener("resize", anchoPagina);

  // TODO: Functions from Auth
  formRegister.addEventListener("submit", registerUser);
  formLogin.addEventListener("submit", loginWithUser);
});
