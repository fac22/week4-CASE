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

        homeHtml = /* html */ `
        <section class='center width-md'>
        <h1 class='signup'>Hello ${userName}</h1>
        <form action="/log-out" method="POST">
                <button>Log out</button>
        </form>
        <h3>Let's solve the mystery!!! Choose a picture and figure out the felon 👺 OR add your own mystery picture! </h3> 
        </section>

        <section class='center width-md'>
          <div class='row'>
            <div class='add-file'>
              <a href="/add-picture">Add your file</a>;
            </div>
            
          </div>
        </section>
        
       <ul class='center grid'>
          ${picturesData
            .map(
              (image) => /*html*/ ` <li>
                <a href="/pictures/${image.id}">
                  <img src="/picture-temp/${image.id}" alt="" class="image_homepage">
                </a>
            </li>
          `
            )
            .join('')}
          </ul>
         
        `;

        return homeHtml;
      })
      .then((html) => response.send(layoutHTML('Home', html)))
      .catch((error) => {
        console.error('error', error);
        response.send(`<h1>Something has gone wrong!</h1>`);
      });
  } else {
    // user is logged out or not registered
    homeHtml = /* html */ `
    <header>
      <div class='row center width-lg stack-mg'>
        <img src="../../assets/detective.png" alt="detective" class='detective left'/>
        <h1 class="center">Hello detective!</h1>
        <img src="../../assets/detective.png" alt="detective" class='detective'/>
      </div>
        <h2 class='center width-sm'>Ready to solve a mystery? 🧐</h2>
    </header>
    <main>
        <section>
            <div class="center width-sm row">
                <p class='home'><a href="/sign-up" id='signup'>Sign-Up</a></p>
                <p class='line'><span> | </span></p>
                <p class='home'><a href="/log-in" id='login' class='home'>Log-in</a></p>
            </div>    
        </section>
    </main>
    `;
    response.send(layoutHTML('Home', homeHtml));
  }
}

module.exports = { get };
