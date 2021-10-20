'use strict';

const model = require('../../database/model');
const layoutHTML = require('../components/html');

const MAX_SIZE = 1000 * 1000 * 5;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

function get(request, response) {
  const html = /* html */ `<h1> please upload an image that represents you <h1>
    <h2> <em> please </em> do not upload a photo of yourself to the internet, that is an extremely irresponsible thing to do! </h2>
    <form enctype="multipart/form-data" method="post">
    <label for="clueImage" style="cursor: pointer">Upload Image</label>
    <input
    type="file"
    accept="image/*"
    name="clueImage"
    id="clueImage"
    required
    />
    <img style="width: 150px" id="output" />
    <button type="submit">Leave a mystery!</button> </form>
    <a href="/"> Go back </a>
    <script> function imgPreview(event) {
      const image = event.target.files[0];
      const preview = document.getElementById("output");
      preview.src = URL.createObjectURL(image);
    }
    const imageInput = document.querySelector("#clueImage");
    imageInput.addEventListener("change", imgPreview); </script>`;
  response.send(layoutHTML('Upload Image', html));
}
function post(request, response) {
  const file = request.file;
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    response.status(400).send(
      `<h1> Bad file extension! </h1><p>Please upload an image file</p>
        <a href="/add-picture">Try uploading again</a>`
    );
  } else if (file.size > MAX_SIZE) {
    response.status(400).send(
      `<h1> That's way too big! </h1><p>Picture must be < 5MB</p>
          <a href="/add-picture">Try uploading again!</a>`
    );
  } else {
    const sid = request.signedCookies.sid;
    model
      .getSession(sid)
      .then((session) => model.getUser(session.user.email))
      .then((user) => model.createPictureData(file.buffer, user.id))
      .then(() => response.redirect('/'))
      .catch((error) => {
        console.error('error', error);
        response.send(
          `<h1>Something has gone wrong!</h1>
            <a href="/">Back to Homepage</a>`
        );
      });
  }
}

module.exports = { get, post };
