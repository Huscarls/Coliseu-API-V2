const repo = require("../repositories/swordplayer.repository.js")

//TODO
async function getAllPlayers(){
  const swordplayers = await repo.getAllPlayers()
  for (let i = 0; i < swordplayers.length; i++){
    swordplayers[i].clan = {
      full_name: swordplayers[i].clan_name,
      abbreviation: swordplayers[i].clan_abbreviation
    }
    delete swordplayers[i].clan_name
    delete swordplayers[i].clan_abbreviation
  }
  return swordplayers
}

//TODO
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
  swordplayer.clan = {
    full_name: swordplayer.clan_name,
    abbreviation: swordplayer.clan_abbreviation
  }
  delete swordplayer.clan_name
  delete swordplayer.clan_abbreviation
  return swordplayer
}

//TODO
async function getPlayersByClanId(id_clan){
  const swordplayer = await repo.getPlayersByClanId(id_clan)
  return swordplayer
}

//TODO
async function newPlayer(full_name, nickname, id_clan){
  await repo.insertPlayer(full_name, nickname, id_clan)
  return
}

//TODO
async function updatePlayerById(id, idClan, full_name, nickname){
  await repo.updatePlayerById(id, idClan, full_name, nickname)
  return
}

//TODO
async function enablePlayerById(id){
  await repo.enablePlayerById(id)
  return
}

//TODO
async function disablePlayerById(id){
  await repo.disablePlayerById(id)
  return
}

//TODO
async function deletePlayerById(id){
  await repo.deletePlayerById(id)
}

module.exports = {
  getAllPlayers,
  getEnabledPlayersByClan,
  getPlayersFullInfoById,
  getPlayerById,
  getPlayersByClanId,
  newPlayer,
  updatePlayerById,
  enablePlayerById,
  disablePlayerById,
  deletePlayerById
}