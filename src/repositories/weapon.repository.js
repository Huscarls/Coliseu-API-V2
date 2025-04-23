const { db } = require("../database/dbConnect.js")

async function getAllWeapons(){
  const query = "SELECT id, name FROM weapons;"
  const [weapons, _] = await db.query(query)
  return weapons
}

async function getWeaponById(id){
  const query = "SELECT id, name FROM weapons WHERE id = ?"
  const [weapons, _] = await db.query(query, [id])
  return weapons[0]
}

async function insertWeapon(name){
  const query = "INSERT weapons (name) VALUES (?)"
  await db.query(query, [name])
  return
}

module.exports = {
  getAllWeapons,
  getWeaponById,
  insertWeapon
}