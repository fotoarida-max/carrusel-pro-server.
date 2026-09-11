const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: "10mb" }));

// Carpeta pública
app.use(express.static(path.join(__dirname, "public")));

// Comprobación del servidor
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "Carrusel Pro Server",
    message: "Servidor funcionando correctamente"
  });
});

// API de IA — prueba de conexión
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
    console.error("Error API IA:", error);

    res.status(500).json({
      ok: false,
      error: "Error interno del servidor"
    });
  }
});

// Fallback para la aplicación web
// Sintaxis compatible con Express 5
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Arranque del servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Carrusel Pro Server funcionando en el puerto ${PORT}`);
});
