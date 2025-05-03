function createSwordplayerObject(full_name, nickname, is_enabled, id){
  const swordplayer = {
      id,
      full_name,
      nickname,
      is_enabled
    }
  return swordplayer
}

function createClanObject(clan_name, clan_abbreviation, clan_id =""){
  const clan = {
      id: clan_id,
      full_name: clan_name,
      abbreviation: clan_abbreviation
    }
  return clan
}

function createWeaponObject(id, name){
  const weapon = {
    id, name
    }
  return weapon
}

function createSwordplayerStatsObject(combatsDone){
  const stats = {
    combatsDone
  }
  return stats
}


module.exports={
  createSwordplayerObject,
  createClanObject,
  createWeaponObject,
  createSwordplayerStatsObject
}