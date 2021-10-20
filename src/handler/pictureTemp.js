'use strict';

const model = require('../../database/model');

function get(request, response) {
  const picId = request.params.picId;

  console.log('INSIDE PICTURETEMP!!!!!!!');
  return model
    .getSinglePicture(picId)
    .then((pic) => response.send(pic.picture))
    .catch((error) => {
      console.error(error);
      response.send(/*html*/ `<h1>Sorry, no pictures found!</h1>
      `);
    });
}

module.exports = { get };
