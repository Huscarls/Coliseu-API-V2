const { db } = require(`../database/dbConnect.js`)
const { TABLE } = require(`../services/constant.service.js`)


async function insertUser(id, username, passwordHash, full_name, id_clan){
  const query = `INSERT ${TABLE.user} (id, username, password_hash, full_name, id_clan) 
    VALUES (?, ?, ?, ?, ?)`
  await db.query(query, [id, username, passwordHash, full_name, id_clan])
  return
}

async function selectUserByUsername(username) {
  const query = `SELECT id, password_hash, is_leader, is_staff, is_admin, id_clan FROM ${TABLE.user}
  WHERE username=? AND is_enabled=TRUE`
  const [users, _] = await db.query(query, [username])
  return users[0]
}

async function selectUserById(id) {
  const query = `SELECT id, is_leader, is_staff, is_admin, id_clan FROM ${TABLE.user}
  WHERE id=? AND is_enabled=TRUE`
  const [users, _] = await db.query(query, [id])
  return users[0]
}

async function selectAllUsers() {
  const query = `SELECT us.id id, us.full_name full_name, us.username username, us.is_enabled is_enabled, us.is_leader is_leader, us.is_staff is_staff, is_admin, cl.full_name clan_name, cl.abbreviation clan_abbreviation FROM ${TABLE.user} us
                INNER JOIN ${TABLE.clan} cl ON cl.id = us.id_clan`
  const [users, _] = await db.query(query)
  return users
}

async function updateUserStatusById(id, status){
  const query = `UPDATE ${TABLE.user} SET is_enabled = ? WHERE id = ?`
  await db.query(query, [status, id])
  return
}

module.exports = {
  selectUserByUsername,
  insertUser,
  selectAllUsers,
  updateUserStatusById,
  selectUserById
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