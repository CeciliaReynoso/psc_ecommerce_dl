const express = require('express');
const { crearPedido, validarRecepcion } = require('../controllers/productosController');
const router = express.Router();

router.post('/pedidos_proveedor', crearPedido);
router.put('/pedidos_proveedor/:id/validar', validarRecepcion);

module.exports = router;