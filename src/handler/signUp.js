'use strict';

const auth = require('../../auth');
const layoutHTML = require('../components/html');

function get(request, response) {
  let mainContent = /*html*/ `
    <h1 class='signup center'>Sign up</h1>
    <main class='center width-sm stack-md'>
    <form action='/sign-up' method='POST'>
      <p>Please use your real name, otherwise the game doesn't work 🤷 </p>
      <label for='name'>Name <span aria-hidden="true">*</span></label>
      <input type="name" id='name' name='name' required />

      <label for='email'>Email <span aria-hidden="true">*</span></label>
      <input type="email" id='email' name='email' aria-describedby="emailError" required />
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
        minlength="8"
      />
      <div id="passwordError" class="error"></div>
      <br />
      <button type="submit">Submit</button>
    </form><br><br>
    <div class='return'>
      <a href="/">↩ Back to Homepage</a>
    </div>
    </main>
    
    `;

  response.send(layoutHTML('Sign-up', mainContent));
}

function post(request, response) {
  const { name, email, password } = request.body;

  auth
    .createUser(name, email, password)
    .then((user) => auth.saveUserSession(user))
    .then((sid) => {
      response.cookie('sid', sid, auth.COOKIE_OPTIONS);
      response.redirect('/');
    })
    .catch((error) => {
      console.error(error);
      response.send(
        `<h1>Please try again! Go back to the homepage <a href="/">here</a></h1>`
      );
    });
}

module.exports = { get, post };
