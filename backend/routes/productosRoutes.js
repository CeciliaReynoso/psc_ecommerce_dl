const express = require('express');
const { crearPedido, validarRecepcion } = require('../controllers/productosController');
const { validarTokenMiddleware } = require('../middlewares/middlewares');
const router = express.Router();

router.post('/pedidos_proveedor', validarTokenMiddleware, crearPedido);
router.put('/pedidos_proveedor/:id/validar', validarTokenMiddleware, validarRecepcion);

module.exports = router;