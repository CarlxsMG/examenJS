const mysql = require("mysql");

const { promisify } = require("util");

const { database_des, database_prod } = require("./keys");

let database;

if (process.env.NODE_ENV === "produccion") {
  database = database_prod;
} else {
  database = database_des;
}

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    console.log("error");
  }

  if (connection) {
    console.log("Estás conectado a la bbdd: ", process.env.NODE_ENV);
  }
  return;
});

pool.query = promisify(pool.query);

module.exports = pool;
