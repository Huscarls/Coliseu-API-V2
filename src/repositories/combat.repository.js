const { db } = require(`../database/dbConnect.js`)
const { TABLE } = require(`../services/constant.service.js`)

async function getAllCombats() {
  const query = `SELECT cbt.id id, cl1.abbreviation clanAbbreviation1, cl2.abbreviation clanAbbreviation2, swp1.nickname nickname1, swp2.nickname nickname2, wp1.name wpName1, wp2.name wpName2, cbt.rounds_scored1 roundsScored1, cbt.rounds_scored2 roundsScored2 FROM ${TABLE.combat} cbt
INNER JOIN swordplayers swp1 ON swp1.id = cbt.id_swp1
INNER JOIN swordplayers swp2 ON swp2.id = cbt.id_swp2
INNER JOIN weapons wp1 ON cbt.id_weapon1 = wp1.id
INNER JOIN weapons wp2 ON cbt.id_weapon2 = wp2.id
INNER JOIN clans cl1 ON swp1.id_clan = cl1.id
INNER JOIN clans cl2 ON swp2.id_clan = cl2.id;`
  const [combats, _] = await db.query(query)
  return combats
}

async function getSwordplayerCombats(id_swp){
  const query = `SELECT c1.full_name clan_name1, c1.abbreviation clan_abbreviation1, swp1.nickname nickname1, cbt.rounds_scored1 roundsScored1, c2.full_name clan_name2, c2.abbreviation clan_abbreviation2, swp2.nickname nickname2, cbt.rounds_scored2 roundsScored2 FROM ${TABLE.combat} cbt
  INNER JOIN swordplayers swp1 ON cbt.id_swp1 = swp1.id
  INNER JOIN swordplayers swp2 ON cbt.id_swp2 = swp2.id
  INNER JOIN clans c1 ON c1.id = swp1.id_clan
  INNER JOIN clans c2 ON c2.id = swp2.id_clan
  WHERE cbt.id_swp1 = ? OR cbt.id_swp2 = ?;`
  const [combats, _] = await db.query(query, [id_swp, id_swp])
  return combats
}

// TODO
async function getCombatBySwordplayers(id_swp1, id_swp2){
  const query = `SELECT id_swp1, id_swp2, rounds_scored1, rounds_scored2 FROM ${TABLE.combat}
  WHERE id_swp1 = ? AND id_swp2 = ?;`
  const [combat, _] = await db.query(query, [id_swp1, id_swp2])
  return combat[0]
}

async function getCombatById(id){
  const query = `SELECT p1.nickname nickname1, c1.full_name clan_name1, c1.abbreviation clan_abbreviation1, cbt.rounds_scored1 roundsScored1, wp1.id id_weapon1, wp1.name weapon_name1, p2.nickname nickname2, c2.full_name clan_name2, c1.abbreviation clan_abbreviation1, cbt.rounds_scored2 roundsScored2, wp2.id id_weapon2, wp2.name weapon_name2 FROM ${TABLE.combat} cbt
  INNER JOIN ${TABLE.swordplayer} p1 on cbt.id_swp1 = p1.id
  INNER JOIN ${TABLE.swordplayer} p2 on cbt.id_swp2 = p2.id
  INNER JOIN ${TABLE.clan} c1 ON p1.id_clan = c1.id
  INNER JOIN ${TABLE.clan} c2 ON p2.id_clan = c2.id
  INNER JOIN ${TABLE.weapon} wp1 ON wp1.id = cbt.id_weapon1
  INNER JOIN ${TABLE.weapon} wp2 ON wp2.id = cbt.id_weapon2
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

async function updateCombatById(id, id_weapon1, rounds_scored1, id_weapon2, rounds_scored2){
  const query = `UPDATE combats SET id_weapon1 = ?, rounds_scored1 = ?, id_weapon2 = ?, rounds_scored2 = ? WHERE id = ?;`
  await db.query(query, [id_weapon1, rounds_scored1, id_weapon2, rounds_scored2, id])
  return
}

async function deleteCombatById(id){
  const query = `DELETE FROM ${TABLE.combat} WHERE id = ?;`
  await db.query(query, [id])
  return
}

// TODO
async function deleteCombatsBySwordplayerId(id_swp){
  const query = `DELETE FROM ${TABLE.combat} WHERE id_swp1 = ? OR id_swp2 = ?;`
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