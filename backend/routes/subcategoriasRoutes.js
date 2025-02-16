const express = require('express');
const { obtenerSubcategorias, crearSubcategoria, eliminarSubcategoria } = require('../controllers/subcategoriasController');
const { validarTokenMiddleware } = require('../middlewares/middlewares');
const router = express.Router();

router.get('/subcategorias', validarTokenMiddleware, obtenerSubcategorias);
router.post('/subcategorias', validarTokenMiddleware, crearSubcategoria);
router.delete('/subcategorias/:id', validarTokenMiddleware, eliminarSubcategoria);

module.exports = router;