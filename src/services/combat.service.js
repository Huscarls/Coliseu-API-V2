const repo = require("../repositories/combat.repository.js")
const objService = require("./object.service.js")

async function getAllCombats(){
  const combats = await repo.getAllCombats();
  for(let i = 0; i < combats.length; i++) {
    combats[i].weapon1 = objService.createWeaponObject(0, combats[i].wpName1)
    combats[i].weapon2 = objService.createWeaponObject(0, combats[i].wpName2)

    combats[i].swp1 = objService.createSwordplayerObject("", combats[i].nickname1, 1)
    combats[i].swp2 = objService.createSwordplayerObject("", combats[i].nickname2, 1)
    combats[i].swp1.clan = objService.createClanObject("", combats[i].clanAbbreviation1)
    combats[i].swp2.clan = objService.createClanObject("", combats[i].clanAbbreviation2)

    delete combats[i].wpName1
    delete combats[i].wpName2

    delete combats[i].nickname1
    delete combats[i].nickname2
    
    delete combats[i].clanAbbreviation1
    delete combats[i].clanAbbreviation2
  }
  
  return combats
}

async function getCombatById(id) {
  const combat = await repo.getCombatById(id)
  combat.swp1 = objService.createSwordplayerObject("", combat.nickname1, 1)
  combat.swp1.clan = objService.createClanObject(combat.clan_name1, combat.clan_abbreviation1)
  combat.weapon1 = objService.createWeaponObject(combat.id_weapon1, combat.weapon_name1)

  combat.swp2 = objService.createSwordplayerObject("", combat.nickname2, 1)
  combat.swp2.clan = objService.createClanObject(combat.clan_name2, combat.clan_abbreviation2)
  combat.weapon2 = objService.createWeaponObject(combat.id_weapon2, combat.weapon_name2)

  delete combat.nickname1
  delete combat.clan_name1
  delete combat.clan_abbreviation1
  delete combat.id_weapon1
  delete combat.weapon_name1
  
  delete combat.nickname2
  delete combat.clan_name2
  delete combat.clan_abbreviation2
  delete combat.id_weapon2
  delete combat.weapon_name2

  return combat
}

async function getSwordplayerCombats(id_swordplayer){
  const combats = await repo.getSwordplayerCombats(id_swordplayer)
  for(let i = 0; i < combats.length; i++){
    
  combats[i].swp1 = objService.createSwordplayerObject("", combats[i].nickname1, 1)
  combats[i].swp1.clan = objService.createClanObject(combats[i].clan_name1, combats[i].clan_abbreviation1)
  combats[i].weapon1 = objService.createWeaponObject(combats[i].id_weapon1, combats[i].weapon_name1)

  combats[i].swp2 = objService.createSwordplayerObject("", combats[i].nickname2, 1)
  combats[i].swp2.clan = objService.createClanObject(combats[i].clan_name2, combats[i].clan_abbreviation2)
  combats[i].weapon2 = objService.createWeaponObject(combats[i].id_weapon2, combats[i].weapon_name2)

  delete combats[i].nickname1
  delete combats[i].clan_name1
  delete combats[i].clan_abbreviation1
  delete combats[i].id_weapon1
  delete combats[i].weapon_name1
  
  delete combats[i].nickname2
  delete combats[i].clan_name2
  delete combats[i].clan_abbreviation2
  delete combats[i].id_weapon2
  delete combats[i].weapon_name2
  }

  return combats
}

async function getCombatBySwordplayers(id_swordplayer1, id_swordplayer2){
  const [id_swp1, id_swp2] = [id_swordplayer1, id_swordplayer2].sort()
  const combat = await repo.getCombatBySwordplayers(id_swp1, id_swp2);
  return combat
}

async function newCombat(id_swordplayer1, id_weapon1, rounds_scored1, id_swordplayer2, id_weapon2, rounds_scored2){
  if(id_swordplayer1 < id_swordplayer2) await repo.insertCombat(id_swordplayer1, id_weapon1, rounds_scored1, id_swordplayer2, id_weapon2, rounds_scored2);
  else await repo.insertCombat(id_swordplayer2, id_weapon2, rounds_scored2, id_swordplayer1, id_weapon1, rounds_scored1);
  return
}

async function updateCombatById(id, id_weapon1, rounds_scored1, id_weapon2, rounds_scored2){
  await repo.updateCombatById(id, id_weapon1, rounds_scored1, id_weapon2, rounds_scored2)
  return
}

async function deleteCombatById(id){
  await repo.deleteCombatById(id)
  return
}

async function deleteCombatsBySwordplayerId(id_swordplayer){
  await repo.deleteCombatsBySwordplayerId(id_swordplayer)
  return
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