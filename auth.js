'use strict';

const model = require('./database/model');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 600000,
  sameSite: 'strict',
  signed: true,
};

function verifyUser(email, password) {
  return model.getUser(email).then((user) => {
    return bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        throw new Error('Wrong password!');
      } else {
        return user;
      }
    });
  });
}

function saveUserSession(user) {
  const randomSid = crypto.randomBytes(18).toString('base64');
  return model.createSession(randomSid, { user });
}

module.exports = { COOKIE_OPTIONS, verifyUser, saveUserSession };
