const swordplayerServ = require("../services/swordplayer.service.js")
const combatServ = require("../services/combat.service.js")
const clanServ = require("../services/clan.service.js")
const combatDataServ = require("../services/combatData.service.js")


async function getAllPlayers(req, res) {
  try {
    const players = await swordplayerServ.getAllPlayers()
    // const combats = await combatServ.getAllCombats()
    // const playersCombatData = combatDataServ.countCombatsPerPlayer(players, combats)
    return res.status(200).json( players )
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

//TODO
async function getEnabledPlayersByClan(req, res) {
  try {
    const { id_clan } = req.params
    const players = await swordplayerServ.getEnabledPlayersByClan(id_clan)
    return res.status(200).json( players )
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function getPlayerById(req, res) {
  try {
    const { id } = req.params
    const player = await swordplayerServ.getPlayerById(id)
    return res.status(200).json( player )
  } catch (err) {
    res.status(500).json(err.message)
  }
}

//TODO
async function getPlayerFullInfoById(req, res){
  try{
    const { id } = req.params
    const player = await swordplayerServ.getPlayersFullInfoById(id)
    return res.status(200).json( player )
  } catch (err) {
    res.status(500).json(err.message)
  }
}

//TODO
async function getPlayersByClanId(req, res) {
  try {
    const { id_clan } = req.params
    const players = await swordplayerServ.getPlayersByClanId(id_clan)
    return res.status(200).json( players )
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function postPlayer(req, res) {
  try {
    const { full_name, nickname, clanId } = req.body
    if(!full_name || !nickname || !clanId ) return res.status(400).send()
    const findClan = await clanServ.getClanById(clanId)
    if (!findClan) return res.status(400).send()
    await swordplayerServ.newPlayer(full_name, nickname, clanId)
    return res.status(201).json()
  } catch (err) {
    console.log(err)
    res.status(500).json("Erro no servidor")
  }
}

//TODO
async function putPlayerById(req, res) {
  try {
    const { id } = req.params
    const { idClan, full_name, nickname } = req.body
    if(!id) return res.status(404).send()
    if(!full_name || !nickname || !idClan) return res.status(400).send()
    const findPlayer = await swordplayerServ.getPlayerById(id)
    if(!findPlayer) return res.status(404).send()
    await swordplayerServ.updatePlayerById(id, idClan, full_name, nickname)
    return res.status(200).json()
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function enablePlayerById(req, res) {
  try {
    const { id } = req.body
    console.log(id)
    if(!id) return res.status(400).send()
    await swordplayerServ.enablePlayerById(id)
    return res.status(200).json()
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function disablePlayerById(req, res) {
  try {
    const { id } = req.body
    console.log(id)
    if(!id) return res.status(400).send()
    await swordplayerServ.disablePlayerById(id)
    return res.status(200).json()
  } catch (err) {
    res.status(500).json(err.message)
  }
}

//TODO
async function deletePlayerById(req, res) {
  try {
    const { id } = req.params
    await swordplayerServ.deletePlayerById(id)
    return res.status(200).json()
  } catch (err) {
    res.status(500).json(err.message)
  }
}

module.exports = {
  getAllPlayers,
  getEnabledPlayersByClan,
  getPlayerById,
  getPlayerFullInfoById,
  getPlayersByClanId,
  postPlayer,
  putPlayerById,
  enablePlayerById,
  disablePlayerById,
  deletePlayerById
}