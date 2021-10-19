'use strict';

const express = require('express');
const server = express();

const staticHandler = express.static('public');

const cookieParser = require('cookie-parser');
const bodyParser = express.urlencoded({ extended: false });

const multer = require('multer');
const upload = multer();

const dotenv = require('dotenv');
dotenv.config();

server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(staticHandler);
server.use(bodyParser);

server.get('/', (req, res) => {
  res.send(/*html*/ `<h1>Hello!!</h1>`);
});

const PORT = process.env.PORT || 3000;

// Error-handling fail safe
process.on('unhandledRejection', (error) => {
  console.error(error);
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
