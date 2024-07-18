const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VacacionesSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    fechaInicio: Date,
    fechaFin: Date,
    estado: String,
});

module.exports = mongoose.model("Vacaciones", VacacionesSchema);
