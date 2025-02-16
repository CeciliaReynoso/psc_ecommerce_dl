const express = require('express');
const { crearPedido, validarRecepcion, obtenerDetallesPedidos } = require('../controllers/productosController');
const { validarTokenMiddleware } = require('../middlewares/middlewares');
const router = express.Router();

router.post('/pedidos_proveedor', validarTokenMiddleware, crearPedido);
router.put('/pedidos_proveedor/:id/validar', validarTokenMiddleware, validarRecepcion);
router.get('/pedidos_proveedor', validarTokenMiddleware, obtenerDetallesPedidos);

module.exports = router;