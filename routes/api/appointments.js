const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("APPT ROUTE")
})


module.exports = router