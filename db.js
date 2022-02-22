const mysql = require("mysql");
const { promisify } = require("util");

const { db_dev, db_prod } = require("./databases");
let db;

if (process.env.NODE_ENV === "prod") {
    db = db_prod;
} else {
    db = db_dev;
}

const pool = mysql.createPool(db);

pool.getConnection((err, connection) => {
  if (err) {
    console.log("error");
  }

  if (connection) {
    console.log("Connected port: ", process.env.NODE_ENV);
  }
  return;
});

pool.query = promisify(pool.query);
module.exports = pool;
