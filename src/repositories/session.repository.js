const { db } = require("../database/dbConnect.js")
const { TABLE } = require(`../services/constant.service.js`)

async function insertToken(userId, token) {
  const query = `INSERT ${TABLE.session} (id_user, token) VALUES (? , ?);`
  await db.query(query, [userId, token])
}

async function findSession(userId, token) {
  const query = `SELECT * FROM ${TABLE.session} WHERE id_user=? AND token=?`
  const [session, _] = await db.query(query, [userId, token])
  return session[0]
}

async function deleteSessionsFromUser(userId) {
  const query = `DELETE FROM ${TABLE.session} WHERE id_user=?`
  await db.query(query, [userId])
}

async function updateSession(userId, oldToken, newToken) {
  const query = `UPDATE ${TABLE.session} SET token=? WHERE id_user=? AND token=?;`
  await db.query(query, [newToken, userId, oldToken])
}

module.exports = {
  insertToken,
  findSession,
  deleteSessionsFromUser,
  updateSession
}