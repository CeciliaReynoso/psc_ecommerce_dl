const express = require('express');
const router = express.Router();
const { crearNuevoPedido, obtenerTodosLosPedidos } = require('../controllers/pedidosCotroller');
const { validarTokenMiddleware } = require('../middlewares/middlewares');
// Ruta para crear un nuevo pedido
router.post('/pedidos', validarTokenMiddleware , crearNuevoPedido);

// Ruta para obtener todos los pedidos
router.get('/pedidos', validarTokenMiddleware, obtenerTodosLosPedidos);

module.exports = router;