'use strict';

const layoutHTML = require('../components/html');
const model = require('../../database/model');
const auth = require('../../auth');

function get(request, response) {
  const html = /*html*/ `
    <h1 class='signup center'>Log in</h1>

    <main class='center width-sm stack-md'>
    <form action="/log-in" method="POST">

      <label for="email">Email</label>
      <input type="email" id="email" name="email">

      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <br />

      <button type="submit">Log in</button>
    </form>
    <br />
    <div class='return'>
      <a href="/">↩ Back to Homepage</a>
    </div>
    </main>
    `;
  response.send(layoutHTML('Log-in', html));
}

function post(request, response) {
  const { email, password } = request.body;
  auth
    .verifyUser(email, password)
    .then(auth.saveUserSession)
    .then((sid) => {
      response.cookie('sid', sid, auth.COOKIE_OPTIONS).redirect('/');
    })
    .catch((error) => {
      console.error('error', error);
      response.send(
        /*html*/ `<h1>User not found!</h1> <a href="/">Back to Homepage</a>`
      );
    });
}

module.exports = { get, post };
