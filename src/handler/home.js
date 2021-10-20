'use strict';

const model = require('../../database/model');
const layoutHTML = require('../components/html');

function get(request, response) {
  const sid = request.signedCookies.sid;

  let homeHtml;

  //   having an active user session
  if (sid) {
    const getUserData = model.getSession(sid);
    const getPictureData = model.getPictureData();

    Promise.all([getUserData, getPictureData])
      .then((values) => {
        const userName = values[0].user.name;
        const picturesData = values[1];

        homeHtml = /*html*/ `
        <h1>Hello ${userName}</h1>
        <p>Let's solve the mystery!!!</p>
        <p>Choose a picture and figure out the felon 👺 </p>
        <p>OR add your own mystery picture!</p>
            <a href="/add-picture">Add your file</a>;
        <form action="/log-out" method="POST">
            <button>Log out</button>
        </form>
         <ul>
            ${picturesData
              .map(
                (image) =>
                  ` <li>
                <a href="/pictures/${image.id}">
                    <img src="/picture-temp/${image.id}" alt="" class="image_homepage">
                </a>
              </li>
            `
              )
              .join('')}
            </ul> 
        `;
      })
      .catch((error) => {
        console.error('error', error);
        response.send(`<h1>Something has gone wrong!</h1>`);
      });
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
  }
  response.send(layoutHTML('Home', homeHtml));
}

module.exports = { get };
