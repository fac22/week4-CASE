'use strict'

const db = require("./connection");

function getSession(sid) {
    const SELECT_SESSION = "SELECT data FROM sessions WHERE sid=$1";
    return db.query(SELECT_SESSION, [sid]).then((result) => {
        const singleResult = result.rows[0];
        return singleResult && singleResult.data;
    });
  };

  function getPictureData(){
    const GET_PICTURE_IMG = `SELECT * FROM pictures;`
    return db.query(GET_PICTURE_IMG)
    .then((result) => {
      return result.rows})
   }

 module.exports = {getSession, getPictureData};
