const express = require('express');
const Measurement = require("../controllers/measurement");

const router = express.Router();

router.post('/new', Measurement.new);
router.get('/', Measurement.list);

module.exports = router;