var express = require("express");
const controllerRegistro = require("../controllers/RegistroController");
var router = express.Router();

// rutas datos ingreso
router.post("/guardarRegistro",controllerRegistro.save);
router.get('/mostrarRegistro', controllerRegistro.mostrarRegistros);
router.get('/listarRegistro', controllerRegistro.listarRegistros);
router.delete('/eliminarRegistro/:id', controllerRegistro.eliminarRegistros);

//rutas datos salida 
router.post("/guardarRegistroSalida",controllerRegistro.saveSalida);
router.get('/mostrarRegistroSalida', controllerRegistro.mostrarRegistrosSalida);
router.delete('/eliminarRegistroSalida/:id', controllerRegistro.eliminarRegistrosSalida);
router.get('/listarRegistroSalida', controllerRegistro.listarRegistrosSalida);


module.exports = router;