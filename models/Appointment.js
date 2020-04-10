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
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  diagnosis: {
    type: String
  }
});

module.exports = Appointment = mongoose.model("appointment", AppointmentSchema);
