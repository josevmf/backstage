const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();

app.use(express.json());
app.use(express.static("public"));

const db = new sqlite3.Database("database.db");

db.run(`
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    setor TEXT,
    item TEXT,
    comentario TEXT,
    data DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

app.post("/log", (req, res) => {
  const { setor, item, comentario } = req.body;
  db.run(
    "INSERT INTO logs (setor, item, comentario) VALUES (?, ?, ?)",
    [setor, item, comentario]
  );
  res.sendStatus(200);
});

app.get("/logs", (req, res) => {
  db.all("SELECT * FROM logs ORDER BY data DESC", (err, rows) => {
    res.json(rows);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log("Backstage rodando na porta", PORT)
);
