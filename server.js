'use strict';

// --------------------------------- MODULES
const express = require('express');
const server = express();

const staticHandler = express.static('public');

const cookieParser = require('cookie-parser');
const bodyParser = express.urlencoded({ extended: false });

const multer = require('multer');
const upload = multer();

const dotenv = require('dotenv');
dotenv.config();

// --------------------------------- HANDLERS
const home = require('./src/handler/home');
const login = require('./src/handler/logIn');
const signup = require('./src/handler/signUp');

server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(staticHandler);
server.use(bodyParser);

server.get('/', home.get);

server.get('/sign-up', signup.get);
server.post('/sign-up', signup.post);

server.get('/log-in', login.get);
server.post('/log-in', login.post);

const PORT = process.env.PORT || 3000;

// Error-handling fail safe
process.on('unhandledRejection', (error) => {
  console.error(error);
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
