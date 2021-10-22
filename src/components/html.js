'use strict';

function layoutHTML(title, content) {
  return /* html */ `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="'Who am I' game" />
    <meta name="keywords" content="Who am I, game, file uploads" />
    <meta name="author" content="cemalokten, cerealenjoyer, elenamarinaki, aaadriana" />
    <link rel="stylesheet" href="/styles.css" /> 
    <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poller+One&display=swap" rel="stylesheet"> 
  <script src='../../index.js'></script>
    <title>${title}</title>
  </head>
  <body>
    ${content}
  </body>
  </html>
    `;
}

module.exports = layoutHTML;
