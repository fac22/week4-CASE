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
    <title>${title}</title>
  </head>
  <body>
    ${content}
  </body>
  </html>
    `;
}

module.exports = layoutHTML;
