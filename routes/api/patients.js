const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Patient = require("../../models/Patient");

router.post(
  "/",
  auth,
  [
    check("first_name", "First Name is required")
      .not()
      .isEmpty(),
    check("last_name", "Last Name is required")
      .not()
      .isEmpty(),
    check("diagnosis", "Diagnosis is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newPatient = new Patient({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        diagnosis: req.body.diagnosis,
        user: req.user.id
      });
      const patient = await newPatient.save();
      res.json(patient);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("SERVER ERROR");
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    const patients = await Patient.find({ user: req.user.id });
    res.json(patients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ msg: "Patient not found" });
    }

    res.json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR");
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ msg: "Patient not found" });
    }

    if (patient.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }
    patient.first_name = req.body.first_name;
    patient.last_name = req.body.last_name;
    patient.diagnosis = req.body.diagnosis;

    await patient.save();
    const patients = await Patient.find({ user: req.user.id });
    res.json(patients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR");
  }
});

router.post("/updateAll", auth, async(req, res) => {
  
})
module.exports = router;
