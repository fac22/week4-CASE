'use strict';

function getUser(req, res, next) {
  const sid = req.signedCookies.sid;
  const sessionInfo = getSession(sid);
  if (sessionInfo) {
    req.session = sessionInfo;
  }
  next();
}

module.exports = getUser;
