const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Patient = require("../../models/Patient");
const Appointment = require("../../models/Appointment");
router.post(
  "/",
  auth,
  [
    check("date", "Date is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const patient = await Patient.findById(req.body.patient);
      const newAppointment = new Appointment({
        user: req.user.id,
        patient: req.body.patient,
        date: req.body.date,
        details: []
      });
      await newAppointment.details.push({ first_name: patient.first_name });
      await newAppointment.details.push({ last_name: patient.last_name });
      await newAppointment.details.push({ diagnosis: patient.diagnosis });

      const appt = await newAppointment.save();
      res.json(appt);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("SERVER ERROR");
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id });
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR");
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (appointment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    appointment.date = req.body.date;
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    if (appointment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User Not authorized" });
    }

    await appointment.remove();

    res.json({ msg: "Appointment Deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Event not found" });
    }
    res.status(500).send("SERVER ERROR");
  }
});

module.exports = router;
