const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "Carrusel Pro Server",
    message: "Servidor funcionando correctamente"
  });
});

// Punto de entrada para futuras funciones de IA.
// Por ahora devuelve una respuesta de prueba.
app.post("/api/ai", async (req, res) => {
  try {
    const { prompt } = req.body || {};

    if (!prompt) {
      return res.status(400).json({
        ok: false,
        error: "Falta el campo 'prompt'"
      });
    }

    res.json({
      ok: true,
      response: `IA Carrusel Pro: recibido "${prompt}"`,
      note: "La conexión con el servidor funciona. La API de IA se conectará después mediante una variable de entorno."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error: "Error interno del servidor"
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Carrusel Pro Server funcionando en el puerto ${PORT}`);
});
