const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegistroSalidaSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    fechaFin: Date,
    estado: String,
});

module.exports = mongoose.model("RegistroUsuarioSalida", RegistroSalidaSchema);
