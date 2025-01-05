const pool = require("./pool");

//USERS TABLE

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

async function getUserByID(id) {
  const {rows} = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
  return rows[0];
}

async function getUserByUsername(username) {
  const {rows} = await pool.query("SELECT * FROM users WHERE username=$1", [username]);
  return rows[0];
}

async function insertUser(username, hashedPassword) {
  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword])
}

//ENTRIES TABLE

async function getAllEntries() {
  const {rows} = await pool.query("SELECT * FROM entries");
  return rows;
}

async function getAllEntriesByAuthorID(author_id) {
  const {rows} = await pool.query("SELECT * FROM entries WHERE author_id=$1", [id]) 
}

async function insertEntry(authorID, createdAt, content) {
  await pool.query ("INSERT INTO entries (author_id, created_at, content VALUES ($1, $2, $3)", [authorID, createdAt, content])
}



module.exports = {
  getAllUsernames,
  getUserByID,
  getUserByUsername,
  insertUser,
  getAllEntries,
  getAllEntriesByAuthorID,
  insertEntry
};
