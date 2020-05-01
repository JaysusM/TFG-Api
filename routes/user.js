const express = require('express');
const User = require("../controllers/user");

const router = express.Router();

router.post('/signUp', User.signUp);
router.post('/signIn', User.signIn);
router.get('/list', User.list);

module.exports = router;
