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
  const query = `SELECT swp.id id, swp.nickname nickname, swp.full_name full_name, cl.abbreviation clan_abbreviation, cl.full_name cl_name FROM ${TABLE.swordplayer} swp
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


//TODO
async function getPlayersFullInfoById(id){
  const query = `SELECT swp.id, swp.full_name full_name, swp.nickname nickname, cl.full_name clan_name, swp.is_enabled is_enabled FROM ${TABLE.swordplayer} swp
  INNER JOIN ${TABLE.clan} cl ON cl.id = swp.id_clan
  WHERE swp.id = ?;`
  const [swordplayers, _] = await db.query(query, [id])
  return swordplayers[0]
}

async function getPlayerById(id){
  const query = `SELECT swp.id, swp.nickname nickname, swp.full_name full_name, swp.is_enabled is_enabled, swp.id_clan clan_id, cl.full_name clan_name, cl.abbreviation clan_abbreviation FROM ${TABLE.swordplayer} swp
  INNER JOIN ${TABLE.clan} cl ON cl.id = swp.id_clan
  WHERE swp.id = ?;`
  const [swordplayers, _] = await db.query(query, [id])
  return swordplayers[0]
}

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

async function disablePlayerById(id){
  const query = `UPDATE ${TABLE.swordplayer} SET is_enabled = false WHERE id = ?`
  await db.query(query, [id])
  return
}

async function deletePlayerById(id){
  const query = `DELETE FROM ${TABLE.swordplayer} WHERE id = ?;`
  await db.query(query, [id])
}

async function getSwordplayersAndCombatCount() {
  const query = `SELECT swp.id id, swp.nickname nickname, COUNT(swp.id) combatsDone, cl.abbreviation clan_abbreviation, cl.full_name clan_name, swp.full_name full_name FROM ${TABLE.swordplayer} swp
    INNER JOIN ${TABLE.clan} cl ON cl.id = swp.id_clan
    LEFT JOIN ${TABLE.combat} cbt ON cbt.id_swp1=swp.id OR cbt.id_swp2=swp.id
    GROUP BY swp.id
    ORDER BY combatsDone DESC;`
  const [swordplayers, _] = await db.query(query)
  return swordplayers
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
  getSwordplayersAndCombatCount,
  getEnabledSwordplayers
}