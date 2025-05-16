const repo = require("../repositories/swordplayer.repository.js")
const objService = require("./object.service.js")

async function getAllPlayers(){
  const swordplayers = await repo.getAllPlayers()
  for(let i = 0; i < swordplayers.length; i++) {
    swordplayers[i].clan = objService.createClanObject(swordplayers[i].clan_name, swordplayers[i].clan_abbreviation)
    delete swordplayers[i].clan_name
    delete swordplayers[i].clan_abbreviation
  }
  return swordplayers
}

async function getEnabledSwordplayers(){
  const swordplayers = await repo.getEnabledSwordplayers()
  for(let i = 0; i < swordplayers.length; i++) {
    swordplayers[i].clan = objService.createClanObject(swordplayers[i].clan_name, swordplayers[i].clan_abbreviation)
    delete swordplayers[i].clan_name
    delete swordplayers[i].clan_abbreviation
  }
  return swordplayers
}

async function getEnabledPlayersByClan(id_clan){
  const swordplayers = await repo.getEnabledPlayersByClan(id_clan)
  return swordplayers
}

//TODO
async function getPlayersFullInfoById(id){
  const swordplayers = await repo.getPlayersFullInfoById(id)
  return swordplayers
}

async function getPlayerById(id){
  const swordplayer = await repo.getPlayerById(id)
  if(!swordplayer) return
  swordplayer.clan = objService.createClanObject(swordplayer.clan_name, swordplayer.clan_abbreviation)
  swordplayer.clan.id = swordplayer.clan_id

  delete swordplayer.clan_name
  delete swordplayer.clan_abbreviation
  return swordplayer
}

async function getSwordplayersByClanId(id_clan){
  const swordplayers = await repo.selectSwordplayersByClanId(id_clan)
  for(let i = 0; i < swordplayers.length; i++) {
    swordplayers[i].clan = {id: swordplayers[i].id_clan}
    delete swordplayers[i].id_clan
  }
  return swordplayers
}

async function getSwordplayersAndCombatCount() {
  const swordplayers = await repo.getSwordplayersAndCombatCount()
  
  for(let i = 0; i < swordplayers.length; i++) {
    swordplayers[i].clan = objService.createClanObject(swordplayers[i].clan_name, swordplayers[i].clan_abbreviation)
    delete swordplayers[i].clan_name
    delete swordplayers[i].clan_abbreviation

    swordplayers[i].stats = objService.createSwordplayerStatsObject(swordplayers[i].combatsDone)
    delete swordplayers[i].combatsDone
  }
  return swordplayers
}

async function getAllSwordplayersWithFullClanInfo() {
  const swordplayers = await repo.getAllSwordplayersWithFullClanInfo()
  for(let i = 0; i < swordplayers.length; i++) {
    swordplayers[i].clan = objService.createClanObject(swordplayers[i].clan_name, swordplayers[i].clan_abbreviation, swordplayers[i].clan_id)
    delete swordplayers[i].clan_id
    delete swordplayers[i].clan_name
    delete swordplayers[i].clan_abbreviation
  }
  return swordplayers
}

async function newPlayer(full_name, nickname, id_clan, userId){
  await repo.insertPlayer(full_name, nickname, id_clan, userId)
  return
}

async function updatePlayerById(id, idClan, full_name, nickname){
  await repo.updatePlayerById(id, idClan, full_name, nickname)
  return
}

async function enablePlayerById(id){
  await repo.enablePlayerById(id)
  return
}

async function disablePlayerById(id){
  await repo.disablePlayerById(id)
  return
}

async function deletePlayerById(id){
  await repo.deletePlayerById(id)
}


module.exports = {
  getAllPlayers,
  getEnabledPlayersByClan,
  getPlayersFullInfoById,
  getPlayerById,
  getSwordplayersByClanId,
  newPlayer,
  updatePlayerById,
  enablePlayerById,
  disablePlayerById,
  deletePlayerById,
  getSwordplayersAndCombatCount,
  getEnabledSwordplayers,
  getAllSwordplayersWithFullClanInfo
}