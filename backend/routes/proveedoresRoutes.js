const express = require('express');
const { obtenerProveedores, crearProveedor, eliminarProveedor, actualizarProveedor } = require('../controllers/proveedoresController');
const { validarTokenMiddleware } = require('../middlewares/middlewares');
const router = express.Router();

router.get('/proveedores', validarTokenMiddleware, obtenerProveedores);
router.post('/proveedores', validarTokenMiddleware, crearProveedor);
router.delete('/proveedores/:id', validarTokenMiddleware, eliminarProveedor);
router.put('/proveedores/:id', validarTokenMiddleware, actualizarProveedor);

module.exports = router;