'use strict';

const model = require('../../database/model');
const layoutHTML = require('../components/html');

function get(request, response) {
  const picId = request.params.picId;

  model.getSinglePicture(picId).then((pic) => {
    const html = /*html*/ `
        <h1>Who do you think committed this crime? 🤔 </h1>
        <img src='/picture-temp/${picId}' alt="mystery picture">
        
        <form action="/pictures/:picid" method="POST">
            <label for="guess">Make your guess!</label>
            <input type="text" id="guess" name="guess" required>
           <button type="submit">Submit</button>
        </form>
        <a href="/">↩ Back to Homepage</a>
        `;

    response.send(layoutHTML('Clue Picture', html)).catch((error) => {
      console.error(error);
    });
  });
}

function post(request, response) {}
module.exports = { get, post };
