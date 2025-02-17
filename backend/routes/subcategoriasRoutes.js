const express = require('express');
const {getSubcategorias, createSubcategoria, deleteSubcategoria } = require('../controllers/subcategoriasController');
const { validarTokenMiddleware } = require('../middlewares/middlewares');
const router = express.Router();

router.get('/subcategorias', validarTokenMiddleware, getSubcategorias);
router.post('/subcategorias', validarTokenMiddleware, createSubcategoria);
router.delete('/subcategorias/:id', validarTokenMiddleware, deleteSubcategoria);

module.exports = router;