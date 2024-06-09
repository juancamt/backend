const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VacacionesSchema = new Schema({
    fechaInicio: Date,
    fechaFin: Date,
    motivo: String,
    // empleado: { type: Schema.Types.ObjectId, ref: 'Empleado' }
});

module.exports = mongoose.model("Vacaciones", VacacionesSchema);
