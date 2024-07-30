var express = require("express");
const controllerVacaciones = require("../controllers/VacacionesController");
var router = express.Router();

//rutas 
router.post("/guardarVacaciones",controllerVacaciones.save);
router.get('/mostrarVacaciones', controllerVacaciones.mostrarVacaciones);
router.get('/listarVacaciones', controllerVacaciones.listarVacaciones);
router.delete('/borrarVacaciones/:id', controllerVacaciones.borrarVacacion);


module.exports = router;