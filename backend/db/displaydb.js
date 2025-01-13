const { Client } = require("pg");
require("dotenv").config();

const SQL = `
SELECT * FROM users;
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@localhost:5432/journalytics",
  });
  await client.connect();
  const data = (await client.query(SQL)).rows;
  console.log(data)
  await client.end();
  console.log("done");
}

main();