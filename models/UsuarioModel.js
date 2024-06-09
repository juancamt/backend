const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    rol: String,
    nombre: String,
    contraseña: String,
    correo: String,
    apellido:String,
    telefono: Number,
    genero: String,
    años: Number
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
