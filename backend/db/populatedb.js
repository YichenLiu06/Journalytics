#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  password VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS entries (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  author_id VARCHAR ( 255 ),
  created_at TIMESTAMPTZ,
  title VARCHAR ( 255 ),
  content TEXT
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@"+process.env.DB_HOST+":5432/"+process.env.DB_NAME
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
