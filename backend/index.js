const express = require('express');
const cors = require('cors');
const { manejarErroresMiddleware } = require("./middlewares/middlewares");
const usuariosRoutes = require('./routes/usuariosRoutes');
const productosRoutes = require('./routes/productosRoutes');
const proveedoresRoutes = require('./routes/proveedoresRoutes'); // Importar proveedoresRoutes
const subcategoriasRoutes = require('./routes/subcategoriasRoutes'); // Importar subcategoriasRoutes

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", usuariosRoutes);
app.use("/", productosRoutes);
app.use("/", proveedoresRoutes); // Usar proveedoresRoutes
app.use("/", subcategoriasRoutes); // Usar subcategoriasRoutes

// Middleware de manejo de errores
app.use(manejarErroresMiddleware);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`¡Servidor encendido en el puerto ${PORT}!`);
});

module.exports = { app, server };