const checklist = [
  {
    area: "SOM",
    items: [
      "Troca de pilhas – In-Ear Pastor",
      "Troca de pilhas – In-Ear Ministro",
      "Mic sem fio 1 – Pastor",
      "Mic sem fio 2 – Ministro",
      "Mic sem fio – Guia",
      "Back vocal Verde (cabo)",
      "Back vocal Rosa (cabo)",
      "Back vocal Laranja (cabo)",
      "Fones posicionados nos retornos"
    ]
  },
  {
    area: "LUZ",
    items: [
      "Mesa ligada",
      "Cena correta carregada",
      "Luz frontal ok",
      "Luz de palco ok"
    ]
  },
  {
    area: "PROJEÇÃO",
    items: [
      "PC ligado",
      "Software aberto",
      "Slides carregados",
      "Tela ok"
    ]
  }
];

const today = new Date().toLocaleDateString();
const savedDay = localStorage.getItem("checklistDay");

if (savedDay !== today) {
  localStorage.clear();
  localStorage.setItem("checklistDay", today);
}

const app = document.getElementById("app");

checklist.forEach(section => {
  const h2 = document.createElement("h2");
  h2.textContent = section.area;
  app.appendChild(h2);

  section.items.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";

    const checked = localStorage.getItem(item) === "true";

    div.innerHTML = `
      <label>
        <input type="checkbox" ${checked ? "checked" : ""}>
        ${item}
      </label>
      <input type="text" placeholder="comentário..." value="${localStorage.getItem(item + "_comment") || ""}">
    `;

    const checkbox = div.querySelector("input[type=checkbox]");
    const comment = div.querySelector("input[type=text]");

    checkbox.addEventListener("change", () => {
      localStorage.setItem(item, checkbox.checked);
      if (item.toLowerCase().includes("pilha")) {
        localStorage.setItem(item + "_log", new Date().toLocaleString());
      }
    });

    comment.addEventListener("input", () => {
      localStorage.setItem(item + "_comment", comment.value);
    });

    app.appendChild(div);
  });
});
