const { db } = require("../database/dbConnect.js")

async function insertStaff(id, full_name, nickname, id_role, passwordHash, username){
  const query = `INSERT staffs (id, full_name, nickname, id_role, password_hash, username) 
    VALUES (?, ?, ?, ?, ?, ?)`
  await db.query(query, [id, full_name, nickname, id_role, passwordHash, username])
  return
}

module.exports = {
  insertStaff
}