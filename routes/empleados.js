var express = require("express");
var EmpleadoContoller = require("../controllers/empleadoController");

var router = express.Router();

router.get("/empleados",EmpleadoContoller.listarEmpleado);
router.get("/empleado/:id",EmpleadoContoller.mostrarEmpleado)
router.post("/guardarEmpleado",EmpleadoContoller.save);
router.put("/updateEmpleado/:id",EmpleadoContoller.update); 
router.delete("/deleteEmpleado/:id", EmpleadoContoller.delete); 


module.exports = router;