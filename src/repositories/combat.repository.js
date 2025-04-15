const { db } = require("../database/dbConnect.js")

async function getAllCombats() {
  const query = "SELECT id, id_swp1, rounds_scored1, id_swp2, rounds_scored2 FROM combats;"
  const [combats, _] = await db.query(query)
  return combats
}

// TODO
async function getSwordplayerCombats(id_swp){
  const query = `SELECT p1.id id_swp1, p1.nickname nickname1, cbt.rounds_scored1 rounds_scored1, p2.id id_swp2, p2.nickname nickname2, cbt.rounds_scored2 rounds_scored2 FROM combats cbt
  JOIN_swps p1 ON cbt.id_swp1 = p1.id
  JOIN_swps p2 ON cbt.id_swp2 = p2.id
  WHERE cbt.id_swp1 = ? OR cbt.id_swp2 = ?;`
  const [combats, _] = await db.query(query, [id_swp, id_swp])
  return combats
}

// TODO
async function getCombatBySwordplayers(id_swp1, id_swp2){
  const query = `SELECT id_swp1, id_swp2, rounds_scored1, rounds_scored2 FROM combats
  WHERE id_swp1 = ? AND id_swp2 = ?;`
  const [combat, _] = await db.query(query, [id_swp1, id_swp2])
  return combat[0]
}

// TODO
async function getCombatById(id){
  const query = `SELECT p1.id id_swp1, p1.nickname nickname1, c1.full_name clan_name1, cbt.rounds_scored1, wp1.id id_weapon1, wp1.name weapon1, p2.id id_swp2, p2.nickname nickname2, c2.full_name clan_name2, cbt.rounds_scored2, wp2.id id_weapon2, wp2.name weapon2 FROM combats cbt
  INNER JOIN swordplayers p1 on cbt.id_swp1 = p1.id
  INNER JOIN swordplayers p2 on cbt.id_swp2 = p2.id
  INNER JOIN clans c1 ON p1.id_clan = c1.id
  INNER JOIN clans c2 ON p2.id_clan = c2.id
  INNER JOIN weapons wp1 ON wp1.id = cbt.id_weapon1
  INNER JOIN weapons wp2 ON wp2.id = cbt.id_weapon2
  WHERE cbt.id = ?`
  const [combats, _] = await db.query(query, [id])
  return combats[0]
}

async function insertCombat(id_swp1, id_weapon1, rounds_scored1, id_swp2, id_weapon2, rounds_scored2){
  const query = `INSERT combats (id_swp1, id_weapon1, rounds_scored1, id_swp2, id_weapon2, rounds_scored2)
  VALUES (?, ?, ?, ?, ?, ?)`
  await db.query(query, [id_swp1, id_weapon1, rounds_scored1, id_swp2, id_weapon2, rounds_scored2])
  return
}

// TODO
async function updateCombatById(id_weapon1, rounds_scored1, id_weapon2, rounds_scored2, id_swp1, id_swp2){
  const query = "UPDATE combats SET id_weapon1 = ?, rounds_scored1 = ?, id_weapon2 = ?, rounds_scored2 = ? WHERE id_swp1 = ? AND id_swp2 = ?;"
  await db.query(query, [id_weapon1, rounds_scored1, id_weapon2, rounds_scored2, id_swp1, id_swp2])
  return
}

// TODO
async function deleteCombatById(id_swp1, id_swp2){
  const query = "DELETE FROM combats WHERE id_swp1 = ? AND id_swp2 = ?;"
  await db.query(query, [id_swp1, id_swp2])
  return
}

// TODO
async function deleteCombatsBySwordplayerId(id_swp){
  const query = "DELETE FROM combats WHERE id_swp1 = ? OR id_swp2 = ?;"
  await db.query(query, [id_swp, id_swp])
  return
}

module.exports = {
  getAllCombats,
  getSwordplayerCombats,
  getCombatBySwordplayers,
  getCombatById,
  insertCombat,
  updateCombatById,
  deleteCombatById,
  deleteCombatsBySwordplayerId
}