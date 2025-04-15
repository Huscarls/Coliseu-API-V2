const { db } = require(`../database/dbConnect.js`)
const { TABLE } = require(`../services/constant.service.js`)


async function getAllPlayers(){
  const query = `SELECT swp.id id, swp.nickname nickname, swp.is_enabled is_enabled, swp.full_name full_name, cl.full_name clan_name, cl.abbreviation clan_abbreviation FROM ${TABLE.swordplayer} swp
  INNER JOIN ${TABLE.clan} cl ON cl.id = swp.id_clan
  ORDER BY swp.id;`
  const [swordplayers, _] = await db.query(query)
  return swordplayers
}

//TODO
async function getEnabledPlayersByClan(id_clan){
  const query = `SELECT swp.id id, swp.nickname nickname FROM ${TABLE.swordplayer} swp
  WHERE swp.is_enabled = true AND id_clan = ?`
  const [swordplayers, _] = await db.query(query, [id_clan])
  return swordplayers
}


//TODO// STAFF INFO AFTER LOGIN
async function getPlayersFullInfoById(id){
  const query = `SELECT swp.id, swp.full_name full_name, swp.nickname nickname, cl.full_name clan_name, swp.is_enabled is_enabled FROM ${TABLE.swordplayer} swp
  INNER JOIN ${TABLE.clan} cl ON cl.id = swp.id_clan
  WHERE swp.id = ?;`
  const [swordplayers, _] = await db.query(query, [id])
  return swordplayers[0]
}

async function getPlayerById(id){
  const query = `SELECT swp.id, swp.nickname nickname, swp.full_name full_name, swp.is_enabled is_enabled, cl.full_name clan_name, cl.abbreviation clan_abbreviation FROM ${TABLE.swordplayer} swp
  INNER JOIN ${TABLE.clan} cl ON cl.id = swp.id_clan
  WHERE swp.id = ?;`
  const [swordplayers, _] = await db.query(query, [id])
  return swordplayers[0]
}

//TODO
async function getPlayersByClanId(id_clan){
  const query = `SELECT id, nickname, is_enabled FROM ${TABLE.swordplayer} WHERE id_clan = ?;`
  const [swordplayers, _] = await db.query(query, [id_clan])
  return swordplayers
}

async function insertPlayer(full_name, nickname, id_clan){
  const query = `INSERT ${TABLE.swordplayer} (full_name, nickname, id_clan)
  VALUES (?, ?, ?);`
  await db.query(query, [full_name, nickname, id_clan])
  return 
}

//TODO
async function updatePlayerById(id, id_clan, full_name, nickname){
  const query = `UPDATE ${TABLE.swordplayer} SET full_name = ?, nickname = ?, id_clan = ? WHERE id = ?;`
  await db.query(query, [full_name, nickname, id_clan, id])
  return
}

//TODO
async function enablePlayerById(id){
  const query = `UPDATE ${TABLE.swordplayer} SET is_enabled = true WHERE id = ?`
  await db.query(query, [id])
  return
}

//TODO
async function disablePlayerById(id){
  const query = `UPDATE ${TABLE.swordplayer} SET is_enabled = false WHERE id = ?`
  await db.query(query, [id])
  return
}

//TODO//
async function deletePlayerById2(id){
  const query1 = `DELETE FROM combats WHERE id_player1 = ? OR id_player2 = ?`
  await db.query(query1, [id, id])
  const query = `DELETE FROM ${TABLE.swordplayer} WHERE id = ?;`
  await db.query(query, [id])
}

//TODO// SWITCH AFTER REFACTORING TO THIS ONE
async function deletePlayerById(id){
  const query = `DELETE FROM ${TABLE.swordplayer} WHERE id = ?;`
  await db.query(query, [id])
}

module.exports = {
  getAllPlayers,
  getEnabledPlayersByClan,
  getPlayersFullInfoById,
  getPlayerById,
  getPlayersByClanId,
  insertPlayer,
  updatePlayerById,
  enablePlayerById,
  disablePlayerById,
  deletePlayerById,
  deletePlayerById2
}