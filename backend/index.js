const express = require('express');
const cors = require('cors');
const { manejarErroresMiddleware } = require("./middlewares/middlewares");
const usuariosRoutes = require('./routes/usuariosRoutes');
const productosRoutes = require('./routes/productosRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", usuariosRoutes);
app.use("/", productosRoutes);
app.use("/", proveedoresRoutes);
app.use("/", subcategoriasRoutes);

// Middleware de manejo de errores
app.use(manejarErroresMiddleware);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`¡Servidor encendido en el puerto ${PORT}!`);
});

module.exports = { app, server };