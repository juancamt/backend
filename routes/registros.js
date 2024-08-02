var express = require("express");
const controllerRegistro = require("../controllers/RegistroController");
var router = express.Router();

// rutas datos ingreso
router.post("/guardarRegistro",controllerRegistro.save);
router.get('/mostrarRegistro', controllerRegistro.mostrarRegistros);
// router.get('/listarVacaciones', controllerRegistro.listarRegistros);
// router.delete('/borrarVacaciones/:id', controllerRegistro.borrarRegistro);

//rutas datos salida 
router.post("/guardarRegistroSalida",controllerRegistro.saveSalida);

module.exports = router;