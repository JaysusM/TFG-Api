const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('useCreateIndex', true);
const connection = mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true});

module.exports = connection;