const root = document.documentElement;

const eye = document.getElementById("eyeball");
const beam = document.getElementById("beam");
const passwordInput = document.getElementById("password");

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");


// ===============================
// EFEITO DO FEIXE DE LUZ
// ===============================

root.addEventListener("mousemove", (e) => {

  const rect = beam.getBoundingClientRect();

  const mouseX = rect.right + (rect.width / 2);
  const mouseY = rect.top + (rect.height / 2);

  const rad = Math.atan2(
    mouseX - e.pageX,
    mouseY - e.pageY
  );

  const degrees =
    (rad * (20 / Math.PI) * -1) - 350;

  root.style.setProperty(
    "--beamDegrees",
    `${degrees}deg`
  );

});


// ===============================
// MOSTRAR / ESCONDER SENHA
// ===============================

eye.addEventListener("click", () => {

  document.body.classList.toggle("show-password");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }

  passwordInput.focus();

});


// ===============================
// LOGIN
// ===============================

loginForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const username =
    document.getElementById("username").value.trim();

  const password =
    passwordInput.value;


  // LOGIN CORRETO
  if (
    username === "Amorzinho" &&
    password === "Euteamo"
  ) {

    // Salva que o usuário entrou
    sessionStorage.setItem(
      "loggedIn",
      "true"
    );

    message.textContent = "";

    // Vai para a Torre de Blocos
    window.location.href =
      "../02%20-%20TORRE%20DE%20BLOCOS/index.html";

  }

  // LOGIN INCORRETO
  else {

    message.textContent =
      "Nome de usuário ou senha incorretos.";

  }

});
