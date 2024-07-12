var express = require("express");
const controllerPermiso = require("../controllers/PermisoController");
var router = express.Router();


router.post("/guardarPermiso",controllerPermiso.save);
router.get('/mostrarPermisos', controllerPermiso.mostrarPermiso);
router.delete('/borrarPermisos/:id', controllerPermiso.borrarPermiso);


module.exports = router;