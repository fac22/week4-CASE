'use strict';

const auth = require('../../auth');
const layoutHTML = require('../components/html');

function get(request, response) {
  let mainContent = /*html*/ `
    <h1>Sign up</h1>
    <form action='/sign-up' method='POST'>
    <label for='name'>Name <span aria-hidden="true">*</span></label>
      <input type="name" id='name' name='name' required />
      <label for='email'>Email <span aria-hidden="true">*</span></label>
      <input type="email" id='email' name='email' required />
      <label for='password'>Password <span aria-hidden="true">*</span></label>
      <input type="password" id='password' name='password' required />
      <button>Submit</button>
    </form><br><br>
    <a href="/">Back to Homepage</a>
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
