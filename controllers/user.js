const User = require("../models/user");
const localeManager = require("../utils/locales/localeManager");

exports.signUp = (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  const locale = localeManager(req.body.language).USER.SIGN_UP;

  if (!data.email || !data.password) {
    res.status(500).json(locale.EMPTY_FIELDS);
  }

  User.create(data)
    .then((user) => {
      res.json(locale.SUCCESS);
    })
    .catch(() => {
      res.status(500).json(locale.EMAIL_ALREADY_EXISTS);
    });
};

exports.signIn = (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  const locale = localeManager(req.body.language).USER.SIGN_IN;

  if (!data.email || !data.password) {
    res.status(500).json(locale.EMPTY_FIELDS);
  }

  User.findOne({
    email: data.email,
  }).then((user) => {
    if (!user) {
      res.status(500).json(locale.EMAIL_NOT_FOUND);
    } else {
      user.verifyPassword(data.password, (_, valid) => {
        if (!valid) res.status(500).json(locale.WRONG_CREDENTIALS);
        else {
          const response = {
            ...locale.SUCCESS,
            data: {
              userId: user._id
            }
          }
          res.json(response);
        }
      });
    }
  });
};

exports.list = (req, res) => {
  User.find().then((users) => {
    res.json(users);
  });
};
