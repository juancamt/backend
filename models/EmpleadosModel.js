const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmpleadosSchema = Schema({
    nombre: String,
    apellido:String,
    telefono: Number,
    correo: String,
    contraseña: String,
    genero: String,
});

module.exports = mongoose.model("Empleado", EmpleadosSchema);
