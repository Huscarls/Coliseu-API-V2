const repo = require("../repositories/clan.repository.js")

const authServ = require("./auth.service.js")

async function getAllClans(){
  const clans = await repo.getAllClans()
  return clans
}

async function getClanById(id){
  const clan = await repo.getClanById(id)
  return clan
}

async function getClanByFullName(full_name){
  const clan = await repo.getClanByFullName(full_name.toLowerCase())
  return clan
}

async function getClansWithEnabledPlayers(){
  const clans = await repo.getClansWithEnabledPlayers()
  return clans
}

async function newClan(full_name, abbreviation){
  const id = authServ.createUuid([full_name, abbreviation])
  await repo.insertClan(id, full_name.toLowerCase(), abbreviation.toLowerCase())
  return
}

async function editClan(id, full_name, abbreviation){
  await repo.updateClan(id, full_name.toLowerCase(), abbreviation.toLowerCase())
  return
}

async function deleteClanById (id){
  await repo.deleteClanById(id)
  return
}

module.exports = {
  getAllClans,
  getClanById,
  getClanByFullName,
  getClansWithEnabledPlayers,
  newClan,
  editClan,
  deleteClanById
}