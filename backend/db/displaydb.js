const { Client } = require("pg");
require("dotenv").config();

const SQL = `
SELECT * FROM users;
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@"+process.env.DB_HOST+":5432/"+process.env.DB_NAME
  });
  await client.connect();
  const data = (await client.query(SQL)).rows;
  console.log(data)
  await client.end();
  console.log("done");
}

main();