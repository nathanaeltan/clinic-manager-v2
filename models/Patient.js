const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  }
});

module.exports = Patient = mongoose.model("patient", PatientSchema);
