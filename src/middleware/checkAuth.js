'use strict';

function checkAuth(request, response, next) {
  const user = request.signedCookies.sid;
  if (!user) {
    response.status(401).send(`
        <h1>Please log in to view this page</h1>
        <a href="/log-in">Log in</a>
      `);
  } else {
    next();
  }
}

module.exports = checkAuth;
