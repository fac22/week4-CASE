'use strict';

const model = require('../../database/model');
const layoutHTML = require('../components/html');

function get(request, response) {
  const picId = request.params.picId;

  model
    .getSinglePicture(picId)
    .then((pic) => {
      const html = /*html*/ `
        <h3>Who do you think committed this crime? 🤔 </h3>
        <img src='/picture-temp/${picId}' alt="mystery picture">
        
        <form action="/pictures/${picId}" method="POST">
            <label for="guess">Make your guess!</label>
            <input type="text" id="guess" name="guess" required>
           <button type="submit">Submit</button>
        </form>
        <div class='return'>
          <a href="/">↩ Back to Homepage</a>
        </div>
        `;

      response.send(layoutHTML('Clue Picture', html));
    })
    .catch((error) => {
      console.error(error);
    });
}

function post(request, response) {
  const guess = request.body.guess;
  const picId = request.params.picId;

  model
    .storeGuess(guess, picId)
    .then((result) => {
      const guessObj = result.rows[0];
      return model.getUserById(guessObj.user_id);
    })
    .then((user) => {
      console.log('This is the user:', user);
      if (guess.toLowerCase() === user.name.toLowerCase()) {
        response.send(
          /*html*/ `<h1>Well done, you solved the mystery!</h1> <a href="/">↩ Back to Homepage</a>`
        );
      } else {
        response.send(/*html*/ `<h1>Sorry, no luck 😦 <a href='/pictures/${picId}'>Guess again!</a> OR 
          <a href="/"> Back to Homepage ↩</a>
          </h1>`);
      }
    })
    .catch((error) => {
      console.error('error', error);
      return response.send(
        `<h1>Unable to post your guess! :(</h1><a href="/">↩ Back to Homepage</a>`
      );
    });
}
module.exports = { get, post };
