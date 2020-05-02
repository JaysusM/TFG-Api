const Measurement = require('../models/measurement');
const localeManager = require('../utils/locales/localeManager');

exports.new = (req, res) => {
    const measurement = {
        userId: req.body.userId,
        coordenates: req.body.coordenates,
        value: req.body.value
    }

    const locale = localeManager(req.body.language);
    const measurementLocale = locale.MEASUREMENT.NEW;

    if (!measurement.userId || !measurement.coordenates || !measurement.value) {
        res.json(measurementLocale.EMPTY_FIELDS);
    }

    Measurement
        .create(measurement)
        .then(newMeasurement => {
            if (!newMeasurement) {
                res.json(locale.GENERAL.COMMON_ERROR);
            } else {
                res.json(measurementLocale.SUCCESS);
            }
        })
};

exports.list = (req, res) => {
    Measurement
        .find({})
        .then(measurements => {
            res.json(measurements);
        })
};