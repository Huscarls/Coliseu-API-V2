const swordplayerServ = require("../services/swordplayer.service.js")
const combatServ = require("../services/combat.service.js")
const clanServ = require("../services/clan.service.js")


async function getAllPlayers(req, res) {
  try {
    const swordplayers = await swordplayerServ.getAllPlayers()

    const resObj = {data: swordplayers}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json( resObj )
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

async function getEnabledSwordplayers(req, res) {
  try {
    const swordplayers = await swordplayerServ.getEnabledSwordplayers()

    const resObj = {data: swordplayers}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json( resObj )
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

async function getEnabledPlayersByClan(req, res) {
  try {
    const { id_clan } = req.params
    const swordplayers = await swordplayerServ.getEnabledPlayersByClan(id_clan)

    const resObj = {data: swordplayers}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json( resObj )
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function getPlayerById(req, res) {
  try {
    const { id } = req.params
    const swordplayer = await swordplayerServ.getPlayerById(id)
    if(!swordplayer) return res.status(400).send()

    const resObj = {data: swordplayer}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json( resObj )
  } catch (err) {
    res.status(500).json(err.message)
  }
}

//TODO
async function getPlayerFullInfoById(req, res){
  try{
    const { id } = req.params
    const swordplayer = await swordplayerServ.getPlayersFullInfoById(id)

    const resObj = {data: swordplayer}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json( resObj )
  } catch (err) {
    res.status(500).json(err.message)
  }
}

//TODO
async function getPlayersByClanId(req, res) {
  try {
    const { id_clan } = req.params
    const swordplayer = await swordplayerServ.getPlayersByClanId(id_clan)

    const resObj = {data: swordplayer}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json( resObj )
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

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(201).json(resObj)
  } catch (err) {
    console.log(err)
    res.status(500).json("Erro no servidor")
  }
}

async function putPlayerById(req, res) {
  try {
    const { id } = req.params
    const { idClan, full_name, nickname } = req.body
    if(!id) return res.status(404).send()
    if(!full_name || !nickname || !idClan) return res.status(400).send()
    const findPlayer = await swordplayerServ.getPlayerById(id)
    if(!findPlayer) return res.status(404).send()
    await swordplayerServ.updatePlayerById(id, idClan, full_name, nickname)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

async function enablePlayerById(req, res) {
  try {
    const { id } = req.body
    if(!id) return res.status(400).send()
    await swordplayerServ.enablePlayerById(id)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function disablePlayerById(req, res) {
  try {
    const { id } = req.body
    if(!id) return res.status(400).send()
    await swordplayerServ.disablePlayerById(id)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function deletePlayerById(req, res) {
  try {
    const { id } = req.params
    await swordplayerServ.deletePlayerById(id)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function getSwordplayersAndCombatCount(req, res) {
  try {
    const swordplayers = await swordplayerServ.getSwordplayersAndCombatCount() 

    const resObj = {data: swordplayers}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
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
  deletePlayerById,
  getSwordplayersAndCombatCount,
  getEnabledSwordplayers
}