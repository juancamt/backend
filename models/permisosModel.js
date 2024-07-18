const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  content: { type: String, required: true }
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
