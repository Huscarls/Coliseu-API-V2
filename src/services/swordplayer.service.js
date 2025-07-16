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

    swordplayers[i].stats = objService.createSwordplayerStatsObject(0, 0, 0, swordplayers[i].combatsDone)
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

async function disablePlayerById(id, userId){
  await repo.disablePlayerById(id, userId)
  return
}

async function deletePlayerById(id){
  await repo.deletePlayerById(id)
}

function mapSwpList(swordplayers){
    const swpListMap = {} 
    for(let i = 0; i < swordplayers.length; i++){
      const id = swordplayers[i].id
      swpListMap[id] = i
    }
    return swpListMap
}

function insertStatsInSwordplayers(swordplayers, combats){
    const swpMap = mapSwpList(swordplayers)
    for(let i = 0; i < swordplayers.length; i++) swordplayers[i].stats = { roundsScored: 0, roundsPlayed: 0, combatsDone: 0, combatsWon: 0 }
    
    for(let i = 0; i < combats.length; i++){
      try {
        const index1 = swpMap[combats[i].swp1.id]
        swordplayers[index1].stats.roundsScored += combats[i].roundsScored1
        swordplayers[index1].stats.roundsPlayed += combats[i].roundsScored1 + combats[i].roundsScored2
        
        swordplayers[index1].stats.combatsDone += 1
        if(combats[i].roundsScored1 > combats[i].roundsScored2) swordplayers[index1].stats.combatsWon += 1
      } catch {}
      
      try {
        const index2 = swpMap[combats[i].swp2.id]
        swordplayers[index2].stats.roundsScored += combats[i].roundsScored2
        swordplayers[index2].stats.roundsPlayed += combats[i].roundsScored1 + combats[i].roundsScored2
        
        swordplayers[index2].stats.combatsDone += 1
        if(combats[i].roundsScored1 < combats[i].roundsScored2) swordplayers[index2].stats.combatsWon += 1
      } catch {}
    }
    return swordplayers

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
  getAllSwordplayersWithFullClanInfo,
  insertStatsInSwordplayers
}