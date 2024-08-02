const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegistroSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    fechaInicio: Date,
    estado: String,
});

module.exports = mongoose.model("RegistroUsuario", RegistroSchema);
