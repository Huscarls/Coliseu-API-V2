const repo = require("../repositories/combat.repository.js")

async function getAllCombats(){
  const combats = await repo.getAllCombats();
  return combats
}

async function getCombatById(id) {
  const combat = await repo.getCombatById(id)
  return combat
}

async function getSwordplayerCombats(id_swordplayer){
  const combats = await repo.getSwordplayerCombats(id_swordplayer);
  return combats
}

async function getCombatBySwordplayers(id_swordplayer1, id_swordplayer2){
  const [id_swp1, id_swp2] = [id_swordplayer1, id_swordplayer2].sort(sortSwordplayersIds)
  const combat = await repo.getCombatBySwordplayers(id_swp1, id_swp2);
  return combat
}

async function newCombat(id_swordplayer1, id_weapon1, rounds_scored1, id_swordplayer2, id_weapon2, rounds_scored2){
  const [id_swp1, id_swp2] = [id_swordplayer1, id_swordplayer2].sort(sortSwordplayersIds)

  await repo.insertCombat(id_swp1, id_weapon1, rounds_scored1, id_swp2, id_weapon2, rounds_scored2);
  return
}

async function updateCombatById(id, id_weapon1, rounds_scored1, id_weapon2, rounds_scored2){
  await repo.updateCombatById(id, id_weapon1, rounds_scored1, id_weapon2, rounds_scored2)
  return
}

async function deleteCombatById(id_swordplayer1, id_swordplayer2){
  const [id_pl1, id_pl2] = [id_swordplayer1, id_swordplayer2].sort()
  await repo.deleteCombatById(id_pl1, id_pl2)
  return
}

async function deleteCombatsBySwordplayerId(id_swordplayer){
  await repo.deleteCombatsBySwordplayerId(id_swordplayer)
  return
}

async function sortSwordplayersIds(id1, id2) {
  return id1 - id2
}

module.exports = {
  getAllCombats,
  getSwordplayerCombats,
  getCombatBySwordplayers,
  newCombat,
  updateCombatById,
  deleteCombatById,
  deleteCombatsBySwordplayerId,
  getCombatById
}