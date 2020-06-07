const Measurement = require("../models/measurement");
const localeManager = require("../utils/locales/localeManager");

exports.new = (req, res) => {
  const measurement = {
    userId: req.body.userId,
    position: req.body.position,
    value: req.body.value,
  };

  const locale = localeManager(req.body.language);
  const measurementLocale = locale.MEASUREMENT.NEW;

  if (!measurement.userId || !measurement.position || !measurement.value) {
    res.json(measurementLocale.EMPTY_FIELDS);
  }

  measurement.date = new Date();

  Measurement.create(measurement).then((newMeasurement) => {
    if (!newMeasurement) {
      res.json(locale.GENERAL.COMMON_ERROR);
    } else {
      res.json(measurementLocale.SUCCESS);
    }
  });
};

exports.list = (req, res) => {
  let from = req.query.from;
  let to = req.query.to;

  let date = {};

  if (from) {
    date = {date: {}}
    date.date["$gte"] = from;
  }

  if (to) {
    if (!date.date) {
        date = {date: {}}
    }
    date.date["$lte"] = to;
  } 

  Measurement.find(date).then((measurements) => {
    res.json(measurements);
  });
};
