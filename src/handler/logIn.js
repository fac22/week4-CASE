'use strict';

const layoutHTML = require('../components/html');
const model = require('../../database/model');
const auth = require('../../auth');

function get(request, response) {
  const html = /*html*/ `
    <h1 class='signup center'>Log in</h1>

    <main class='center width-sm stack-md'>
    <form action="/log-in" method="POST">

      <label for="email">Email <span aria-hidden="true">*</span> </label>
      <input id="email" type="email" aria-describedby="emailError" required />
      <div id="emailError" class="error"></div>

      <label for="password">
        Password
        <span aria-hidden="true">*</span>
      </label>
      <div id="passwordRequirements" class="requirements">
        Passwords must contain at least one number, and be at least 8 characters
        long.
      </div>
      <input
        id="password"
        type="password"
        aria-describedby="passwordRequirements passwordError"
        required
        pattern=".*\d.*"
        minlength="8"
      />
      <div id="passwordError" class="error"></div>
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
