const { Pool } = require("pg");
require("dotenv").config();

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
  host: "localhost", // or wherever the db is hosted
  user: process.env.DB_USER,
  database: "journalytics",
  password: process.env.DB_PASSWORD,
  port: 5432 // The default port
});
