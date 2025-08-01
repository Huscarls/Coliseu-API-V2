const { db } = require(`../database/dbConnect.js`)
const { TABLE } = require(`../services/constant.service.js`)


async function getAllPlayers(){
  const query = `SELECT swp.id id, swp.nickname nickname, swp.is_enabled is_enabled, swp.full_name full_name, cl.full_name clan_name, cl.abbreviation clan_abbreviation FROM ${TABLE.swordplayer} swp
  INNER JOIN ${TABLE.clan} cl ON cl.id = swp.id_clan
  ORDER BY cl.abbreviation, swp.full_name;`
  const [swordplayers, _] = await db.query(query)
  return swordplayers
}

async function getEnabledSwordplayers() {
  const query = `SELECT swp.id id, swp.nickname nickname, swp.full_name full_name, cl.abbreviation clan_abbreviation, cl.full_name clan_name FROM ${TABLE.swordplayer} swp
  INNER JOIN ${TABLE.clan} cl ON swp.id_clan = cl.id
  WHERE swp.is_enabled = true`
  const [swordplayers, _] = await db.query(query)
  return swordplayers
}

async function getEnabledPlayersByClan(id_clan){
  const query = `SELECT swp.id id, swp.nickname nickname FROM ${TABLE.swordplayer} swp
  WHERE swp.is_enabled = true AND id_clan = ?`
  const [swordplayers, _] = await db.query(query, [id_clan])
  return swordplayers
}

async function getAllSwordplayersWithFullClanInfo(){
  const query = `SELECT swp.id id, swp.nickname nickname, swp.is_enabled is_enabled, swp.full_name full_name, swp.id_clan clan_id, cl.full_name clan_name, cl.abbreviation clan_abbreviation FROM ${TABLE.swordplayer} swp
  INNER JOIN ${TABLE.clan} cl ON cl.id = swp.id_clan;`
  const [swordplayers, _] = await db.query(query)
  return swordplayers
}

async function getPlayerById(id){
  const query = `SELECT swp.id, swp.nickname nickname, swp.full_name full_name, swp.is_enabled is_enabled, swp.id_clan clan_id, cl.full_name clan_name, cl.abbreviation clan_abbreviation, us.username disabler FROM ${TABLE.swordplayer} swp
  INNER JOIN ${TABLE.clan} cl ON cl.id = swp.id_clan
  LEFT JOIN ${TABLE.user} us on us.id = swp.id_staff_disable
  WHERE swp.id = ?;`
  const [swordplayers, _] = await db.query(query, [id])
  return swordplayers[0]
}

async function selectSwordplayersByClanId(id_clan){
  const query = `SELECT id, full_name, nickname, is_enabled, id_clan FROM ${TABLE.swordplayer} WHERE id_clan = ?;`
  const [swordplayers, _] = await db.query(query, [id_clan])
  return swordplayers
}

async function insertPlayer(full_name, nickname, id_clan, userId){
  const query = `INSERT ${TABLE.swordplayer} (full_name, nickname, id_clan, id_creator)
  VALUES (?, ?, ?, ?);`
  await db.query(query, [full_name, nickname, id_clan, userId])
  return 
}

async function updatePlayerById(id, id_clan, full_name, nickname){
  const query = `UPDATE ${TABLE.swordplayer} SET full_name = ?, nickname = ?, id_clan = ? WHERE id = ?;`
  await db.query(query, [full_name, nickname, id_clan, id])
  return
}

async function enablePlayerById(id){
  const query = `UPDATE ${TABLE.swordplayer} SET is_enabled = true WHERE id = ?`
  await db.query(query, [id])
  return
}

async function disablePlayerById(id, userId){
  const query = `UPDATE ${TABLE.swordplayer} SET is_enabled = false, id_staff_disable = ? WHERE id = ?`
  await db.query(query, [userId, id])
  return
}

async function deletePlayerById(id){
  const query = `DELETE FROM ${TABLE.swordplayer} WHERE id = ?;`
  await db.query(query, [id])
}

async function getSwordplayersAndCombatCount() {
  const query = `SELECT swp.id id, swp.nickname nickname, COALESCE(ls.combatsDone, 0) combatsDone, cl.abbreviation clan_abbreviation, cl.full_name clan_name, swp.full_name full_name
  FROM ${TABLE.swordplayer} swp 
  LEFT JOIN (SELECT id_swp, COUNT(*) AS combatsDone FROM (SELECT id_swp1 AS id_swp FROM combats UNION ALL SELECT id_swp2 AS id_swp FROM combats) AS all_matches GROUP BY id_swp) ls ON swp.id = ls.id_swp
  INNER JOIN ${TABLE.clan} cl ON swp.id_clan = cl.id
  ORDER BY combatsDone DESC;`
  const [swordplayers, _] = await db.query(query)
  return swordplayers
}

module.exports = {
  getAllPlayers,
  getEnabledPlayersByClan,
  getAllSwordplayersWithFullClanInfo,
  getPlayerById,
  selectSwordplayersByClanId,
  insertPlayer,
  updatePlayerById,
  enablePlayerById,
  disablePlayerById,
  deletePlayerById,
  getSwordplayersAndCombatCount,
  getEnabledSwordplayers,
}