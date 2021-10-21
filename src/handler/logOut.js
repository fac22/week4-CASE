'use strict';

const model = require('../../database/model');

function post(request, response) {
  const sid = request.signedCookies.sid;
  model
    .deleteSession(sid)
    .then(() => {
      response.clearCookie('sid');
      response.redirect('/');
    })
    .catch((error) => {
      console.error('error', error);
      response.send(`<h1>Unable to logout!</h1>`);
    });
}

module.exports = { post };
