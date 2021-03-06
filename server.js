'use strict';

// --------------------------------- MODULES
const express = require('express');
const server = express();

const staticHandler = express.static('public');

const cookieParser = require('cookie-parser');
const bodyParser = express.urlencoded({ extended: false });

const multer = require('multer');
const upload = multer();
// const upload = multer({ storage: multer.diskStorage( { destination: function (req, file, cb) {  cb(null, 'picture-temp/');  }, filename: function (req, file, cb) { cb(null,new Date().valueOf() + '_' + file.originalname); }}),})

const dotenv = require('dotenv');
dotenv.config();

// --------------------------------- HANDLERS
const home = require('./src/handler/home');
const login = require('./src/handler/logIn');
const signup = require('./src/handler/signUp');
const addPictures = require('./src/handler/addPicture');
const pictureTemp = require('./src/handler/pictureTemp');
const pictures = require('./src/handler/pictures');
const logOut = require('./src/handler/logOut');

// --------------------------------- MIDDLEWARE
const logger = require('./src/middleware/logger');
const checkAuth = require('./src/middleware/checkAuth');
const handleErrors = require('./src/middleware/handleErrors');

server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(staticHandler);
server.use(bodyParser);
server.use(logger);

server.get('/', home.get);

server.get('/sign-up', signup.get);
server.post('/sign-up', signup.post);

server.get('/log-in', login.get);
server.post('/log-in', login.post);

server.get('/add-picture', checkAuth, addPictures.get);
server.post('/add-picture', upload.single('clueImage'), addPictures.post);

server.get('/picture-temp/:picId', pictureTemp.get);

server.get('/pictures/:picId', pictures.get);
server.post('/pictures/:picId', pictures.post);

server.post('/log-out', logOut.post);

server.get('/error', (req, res, next) => {
  const fakeError = new Error('This is the error!');
  fakeError.status = 403;
  next(fakeError);
});

server.use(handleErrors);

const PORT = process.env.PORT || 3000;

// Error-handling fail safe
process.on('unhandledRejection', (error) => {
  console.error(error);
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
