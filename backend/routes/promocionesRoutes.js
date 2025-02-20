const express = require('express');
const { obtenerProductosPromocion } = require('../controllers/promocionesController');
const router = express.Router();

router.get('/productos/promocion', obtenerProductosPromocion);

module.exports = router;