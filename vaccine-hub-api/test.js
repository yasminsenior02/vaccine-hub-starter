const { Client } = require("pg");

const connectionstr = "postgresql://ysenior@localhost:5432/vaccine_hub";

const db = new Client({
  user: "ysenior",
  host: "localhost",
  database: "vaccine_hub",
  port: 5432,
});

db.connect();

console.log("connected");

db.query("SELECT * FROM users").then((res) => {
  console.log(res.rows);
});
