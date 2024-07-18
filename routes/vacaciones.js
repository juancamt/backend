var express = require("express");
const controllerVacaciones = require("../controllers/VacacionesController");
var router = express.Router();


router.post("/guardarVacaciones",controllerVacaciones.save);
router.get('/mostrarVacaciones', controllerVacaciones.mostrarVacaciones);
// router.get('/listarVacaciones', controllerVacaciones.listarVacaciones);
// router.delete('/borrarVacaciones/:id', controllerVacaciones.borrarVacaciones);


module.exports = router;