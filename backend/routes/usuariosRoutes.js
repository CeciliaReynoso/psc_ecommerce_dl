const express = require('express');
const router = express.Router();
const { obtenerUsuarioPorEmail } = require('../models/consultas');
const {
  postLogin,
  registrarCliente,
  registrarPersonal,
  asignarRolUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  modificarUsuarioPorId,
  eliminarUsuarioPorId
} = require("../controllers/usuariosController");
const { verificarCredencialesMiddleware, validarTokenMiddleware, validarRolMiddleware, reportarConsultasMiddleware } = require("../middlewares/middlewares");

router.use(reportarConsultasMiddleware);

// Rutas públicas
router.post("/login", verificarCredencialesMiddleware, postLogin);
router.post("/register", verificarCredencialesMiddleware, registrarCliente);

// Rutas privadas (requieren autenticación)
router.get("/usuarios", validarTokenMiddleware, obtenerTodosLosUsuarios);
router.get("/usuarios/:id", validarTokenMiddleware, obtenerUsuarioPorId);
router.put("/usuarios/:id", validarTokenMiddleware, modificarUsuarioPorId);
router.delete("/usuarios/:id", validarTokenMiddleware, eliminarUsuarioPorId);


router.get('/usuario', async (req, res) => {
  const { email } = req.query;
  try {
    const dataUsuario = await obtenerUsuarioPorEmail(email);
    res.json(dataUsuario);
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
});

// Rutas protegidas para el personal
router.post("/register-personal", validarTokenMiddleware, validarRolMiddleware(['Administrador']), registrarPersonal);
router.post("/asignar-rol", validarTokenMiddleware, validarRolMiddleware(['Administrador']), asignarRolUsuario);

module.exports = router;