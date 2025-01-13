const { Client } = require("pg");
require("dotenv").config();

const SQL = `
DELETE FROM entries;

DELETE FROM users
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@localhost:5432/journalytics",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
