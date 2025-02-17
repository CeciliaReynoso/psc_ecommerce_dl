const express = require('express');
const { getProductosAdmin, createProductoAdmin, updateProductoAdmin, deleteProductoAdmin } = require('../controllers/productosAdminController');
const { validarTokenMiddleware } = require('../middlewares/middlewares');
const router = express.Router();

router.get('/productos-admin', validarTokenMiddleware, getProductosAdmin);
router.post('/productos-admin', validarTokenMiddleware, createProductoAdmin);
router.put('/productos-admin/:id', validarTokenMiddleware, updateProductoAdmin);
router.delete('/productos-admin/:id', validarTokenMiddleware, deleteProductoAdmin);

module.exports = router;