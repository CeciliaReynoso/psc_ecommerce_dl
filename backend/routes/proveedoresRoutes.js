const express = require('express');
const { getProveedores, createProveedor, deleteProveedor, updateProveedor } = require('../controllers/proveedoresController');
const { validarTokenMiddleware } = require('../middlewares/middlewares');
const router = express.Router();

router.get('/proveedores', validarTokenMiddleware, getProveedores);
router.post('/proveedores', validarTokenMiddleware, createProveedor);
router.delete('/proveedores/:id', validarTokenMiddleware, deleteProveedor);
router.put('/proveedores/:id', validarTokenMiddleware, updateProveedor);

module.exports = router;