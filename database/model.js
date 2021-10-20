/* eslint-disable camelcase */

'use strict';

const db = require('./connection');

function createUser(name, email, password) {
  const INSERT_USER = `
INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
RETURNING id, email, name;
`;
  return db
    .query(INSERT_USER, [name, email, password])
    .then((result) => result.rows[0]);
}

function getUser(email) {
  const selectUser = `
  SELECT * FROM users WHERE email=$1;`;
  return db.query(selectUser, [email]).then((result) => {
    return result.rows[0];
  });
}

function createSession(sid, data) {
  const INSERT_SESSION = `
INSERT INTO sessions (sid, data) VALUES ($1, $2)
RETURNING sid;`;

  return db
    .query(INSERT_SESSION, [sid, data])
    .then((result) => result.rows[0].sid);
}

function getSession(sid) {
  const SELECT_SESSION = 'SELECT data FROM sessions WHERE sid=$1';
  return db.query(SELECT_SESSION, [sid]).then((result) => {
    const singleResult = result.rows[0];
    return singleResult && singleResult.data;
  });
}

function createPictureData(picture, user_id) {
  const INSERT_PICTURE = ` INSERT INTO pictures (picture, user_id, created_at) VALUES ($1, $2, (SELECT CURRENT_TIMESTAMP))`;
  return db.query(INSERT_PICTURE, [picture, user_id]);
}

function getPictureData() {
  const GET_PICTURE_IMG = `SELECT * FROM pictures;`;
  return db.query(GET_PICTURE_IMG).then((result) => {
    return result.rows;
  });
}

function getSinglePicture(id) {
  const GET_PICTURE_IMG = `SELECT * FROM pictures WHERE id=$1;`;
  return db.query(GET_PICTURE_IMG, [id]).then((result) => {
    return result.rows[0];
  });
}

module.exports = {
  createUser,
  getUser,
  createSession,
  getSession,
  createPictureData,
  getPictureData,
  getSinglePicture,
};
