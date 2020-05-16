const User = require("../models/user");
const localeManager = require("../utils/locales/localeManager");

exports.signUp = (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
  };

  const locale = localeManager(req.body.language).USER.SIGN_UP;

  if (!data.username || !data.password) {
    res.status(500).json(locale.EMPTY_FIELDS);
  }

  User.create(data)
    .then((user) => {
      res.json(locale.SUCCESS);
    })
    .catch(() => {
      res.status(500).json(locale.USERNAME_ALREADY_EXISTS);
    });
};

exports.signIn = (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
  };

  const locale = localeManager(req.body.language).USER.SIGN_IN;

  if (!data.username || !data.password) {
    res.status(500).json(locale.EMPTY_FIELDS);
    return;
  }

  User.findOne({
    username: data.username,
  }).then((user) => {
    if (!user) {
      res.status(500).json(locale.USERNAME_NOT_FOUND);
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
