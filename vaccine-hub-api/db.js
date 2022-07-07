const { Client } = require("pg");
const { GetDatabaseUri, getDatabaseUri } = require("./config");
require("colors");

const db = new Client({ connectionSring: getDatabaseUri() });

db.connect((err) => {
  if (err) {
    console.error("conncetion error".red, err.stack);
  } else {
    console.log("Successfully connected to postgres db!".blue);
  }
});

module.exports = db;
