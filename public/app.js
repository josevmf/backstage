function log(setor, item, comentario) {
  fetch("/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ setor, item, comentario })
  }).then(() => alert("Registrado ✅"));
}
