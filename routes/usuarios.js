var express = require("express");
var UsuarioContoller = require("../controllers/usuarioController");


var router = express.Router();

router.get("/usuarios",UsuarioContoller.listarUsuarios);
router.get("/usuarios/:id",UsuarioContoller.mostrarUsuario)
router.post("/guardarUsuario",UsuarioContoller.save);
router.put("/updateUsuario/:id",UsuarioContoller.update); 
router.delete("/deleteUsuario/:id", UsuarioContoller.delete); 



module.exports = router;