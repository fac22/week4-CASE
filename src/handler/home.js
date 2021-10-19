'use strict';

const model = require('../../database/model');
const layoutHTML = require('../components/html');

function get(request, response) {
  const sid = request.signedCookies.sid;

  let homeHtml;

  //   having an active user session
  if (sid) {
    response.send(/*html*/ `<h1>Hi!</h1>`).redirect('/');
  } else {
    // user is logged out or not registered
    homeHtml = /*html*/ `
    <header>
        <h1>Hello detective! 🕵️‍♀️</h1>
        <p>Ready to solve a mystery? 🧐</p>
    </header>
    <main>
        <section>
            <div>
                <a href="/sign-up" id='signup'>Sign-Up</a>
                <span> | </span>
                <a href="/log-in" id='login'>Log-in</a>
            </div>    
        </section>
    </main>
    `;

    response.send(layoutHTML('Home', homeHtml));
  }
}

module.exports = { get };
