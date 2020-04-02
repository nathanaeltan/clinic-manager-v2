const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "patients"
  },
  date: {
    type: Date,
    required: true
  },
  details: []
});

module.exports = Appointment = mongoose.model("appointment", AppointmentSchema);
