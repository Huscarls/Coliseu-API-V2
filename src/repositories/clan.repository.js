const { db } = require(`../database/dbConnect.js`)
const { TABLE } = require(`../services/constant.service.js`)

async function getAllClans() {
  const query = `SELECT id, full_name, abbreviation FROM ${TABLE.clan} ORDER BY full_name;`
  const [clans, _] = await db.query(query)
  return clans
}

async function getClanById(id) {
  const query = `SELECT full_name, abbreviation, id FROM ${TABLE.clan} WHERE id = ?`;
  const [clan, _] = await db.query(query, [id])
  return clan[0]
}

//TODO
async function getClanByFullName(full_name) {
  const query = `SELECT full_name FROM ${TABLE.clan} WHERE id = ?`
  const [clan, _] = await db.query(query, [full_name])
  return clan[0]
}

//TODO
async function getClansWithEnabledPlayers() {
  const query = `SELECT cl.full_name full_name, cl.id id FROM ${TABLE.clan} cl
  INNER JOIN ${TABLE.swordplayer} swp on cl.id = swp.id_clan
  WHERE swp.is_enabled = true
  GROUP BY id_clan;`
  const [clans] = await db.query(query)
  return clans
}

async function insertClan(id, full_name, abbreviation) {
  const query = `INSERT INTO ${TABLE.clan} (id, full_name, abbreviation) VALUES (?,?,?);`
  const a = await db.query(query, [id, full_name, abbreviation])
  return
}

//TODO
async function updateClan(id, full_name, abbreviation) {
  const query = `UPDATE ${TABLE.clan} SET full_name = ?, abbreviation = ? WHERE id = ?;`
  await db.query(query, [full_name, abbreviation, id]);
  return
}

//TODO
async function deleteClanById(id) {
  const query = `DELETE FROM ${TABLE.clan} WHERE id = ?`
  await db.query(query, [id]);
  return
}

module.exports = {
  getAllClans,
  getClanById,
  getClanByFullName,
  getClansWithEnabledPlayers,
  insertClan,
  updateClan,
  deleteClanById
}