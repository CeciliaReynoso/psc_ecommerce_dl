const express = require('express');
const {getSubcategorias, createSubcategoria, updateSubcategoria, deleteSubcategoria } = require('../controllers/subcategoriasController');
const { validarTokenMiddleware } = require('../middlewares/middlewares');
const router = express.Router();

router.get('/subcategorias', validarTokenMiddleware, getSubcategorias);
router.post('/subcategorias', validarTokenMiddleware, createSubcategoria);
router.put('/subcategorias/:id', validarTokenMiddleware, updateSubcategoria);
router.delete('/subcategorias/:id', validarTokenMiddleware, deleteSubcategoria);

module.exports = router;