const { db } = require(`../database/dbConnect.js`)
const { TABLE } = require(`../services/constant.service.js`)


async function insertUser(id, username, passwordHash, full_name, id_clan){
  const query = `INSERT ${TABLE.user} (id, username, password_hash, full_name, id_clan) 
    VALUES (?, ?, ?, ?, ?)`
  await db.query(query, [id, username, passwordHash, full_name, id_clan])
  return
}

async function selectUserByUsername(username) {
  const query = `SELECT id, password_hash FROM ${TABLE.user} WHERE username=? AND is_enabled=TRUE`
  const [users, _] = await db.query(query, [username])
  return users[0]
}

module.exports = {
  selectUserByUsername,
  insertUser
}


// 'users': `CREATE TABLE users (
// 	id CHAR(36) NOT NULL UNIQUE PRIMARY KEY,
//   password_hash CHAR(60) NOT NULL,
//     full_name VARCHAR(50) NOT NULL,
//     nickname VARCHAR(30) NOT NULL,
//     id_clan CHAR(36) NOT NULL,
//       FOREIGN KEY (id_clan) REFERENCES clans(id) ON DELETE CASCADE,
//     is_enabled BOOL NOT NULL DEFAULT TRUE,
//     creation_timestamp DATETIME NOT NULL DEFAULT NOW()
// );`,