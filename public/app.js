const loginBox = document.getElementById("loginBox");
const app = document.getElementById("app");

let user = localStorage.getItem("user");

if (user) {
  loginBox.style.display = "none";
  app.style.display = "block";
}

function login() {
  const name = document.getElementById("usernameInput").value;
  if (!name) return alert("Digite seu nome");
  localStorage.setItem("user", name);
  location.reload();
}

function log(area, item, status) {
  const history = JSON.parse(localStorage.getItem("history")) || [];

  history.push({
    user,
    area,
    item,
    status,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  });

  localStorage.setItem("history", JSON.stringify(history));
  alert(`${item} registrado por ${user}`);
}

