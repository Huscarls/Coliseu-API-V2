function countCombatsPerPlayer(players, combats){
  const playersMap = {}

  for (let i = 0; i < players.length; i++) {
    players[i].combat_data = {
      rounds_scored: 0,
      combats_total: 0,
      combats_won: 0
    }

    playersMap[players[i].id] = i
  }
  for (const combat of combats) {
    const indexPl1 = playersMap[combat.id_player1]
    const indexPl2 = playersMap[combat.id_player2]

    players[indexPl1].combat_data.rounds_scored += combat.rounds_scored1
    players[indexPl2].combat_data.rounds_scored += combat.rounds_scored2
    
    players[indexPl1].combat_data.combats_total += 1
    players[indexPl2].combat_data.combats_total += 1
    
    if(combat.rounds_scored1 > combat.rounds_scored2) players[indexPl1].combat_data.combats_won += 1
    else players[indexPl2].combat_data.combats_won += 1
  }

  return players
}

function createCombatsScoresArray(player, players, combats){

  player.combat_data = {
    combats_scores: [],
    rounds_scored: 0,
    combats_total: 0,
    combats_won: 0
  }

  const playersMap = {}
  for (let i = 0; i < players.length; i++) {
    playersMap[players[i].id] = i
    player.combat_data.combats_scores.push(-1)
  }
  
  for (const combat of combats){
  
    if (combat.id_player1 == player.id) {
      const indexPl2 = playersMap[combat.id_player2]
      player.combat_data.combats_scores[indexPl2] = combat.rounds_scored1
    }
    else{
      const indexPl1 = playersMap[combat.id_player1]
      player.combat_data.combats_scores[indexPl1] = combat.rounds_scored2
    }
    const indexPl2 = playersMap[combat.id_player2]
  }
  
}

module.exports = {
  countCombatsPerPlayer
}