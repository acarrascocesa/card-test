const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Obtener la ruta completa al archivo 'cards.json' en el directorio actual
const cardsFilePath = path.join(__dirname, "cards.json");

// Funcion para leer las tarjetas de credito desde el archivo 'cards.json'
const readCards = () => {
  const data = fs.readFileSync(cardsFilePath);
  return JSON.parse(data);
};

// Funcion para escribir las tarjetas de credito en el archivo 'cards.json'
const writeCards = (cards) => {
  fs.writeFileSync(cardsFilePath, JSON.stringify(cards, null, 2));
};

// GET: Recupera todas las tarjetas
app.get("/cards", (req, res) => {
  const cards = readCards();
  res.json(cards);
});

// POST: Agrega una nueva tarjeta
app.post("/cards", (req, res) => {
  const cards = readCards();
  const card = req.body;
  card.id = new Date().getTime();
  cards.push(card);
  writeCards(cards);
  res.status(201).json(card);
});

// PUT: Actualiza una tarjeta por ID
app.put("/cards/:id", (req, res) => {
  const cards = readCards();
  const id = parseInt(req.params.id);
  const index = cards.findIndex((card) => card.id === id);
  if (index !== -1) {
    cards[index] = { ...req.body, id };
    writeCards(cards);
    res.json(cards[index]);
  } else {
    res.status(404).json({ error: "Tarjeta no encontrada" });
  }
});

// DELETE: Elimina una tarjeta por ID
app.delete("/cards/:id", (req, res) => {
  const cards = readCards();
  const id = parseInt(req.params.id);
  const index = cards.findIndex((card) => card.id === id);
  if (index !== -1) {
    const deletedCard = cards.splice(index, 1);
    writeCards(cards);
    res.json(deletedCard);
  } else {
    res.status(404).json({ error: "Tarjeta no encontrada" });
  }
});

// Inicia el servidor en el puerto especificado y muestra un mensaje en la consola una vez que esta escuchando
app.listen(port, () => {
  console.log(`El servidor esta corriendo en el puerto: ${port}`);
});
