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
    console.log(err)
    return res.status(500).json(err.message)
  }
}

async function getAllSwordplayersWithFullClanInfo(req, res) {
  try {
    const swordplayers = await swordplayerServ.getAllSwordplayersWithFullClanInfo()

    const resObj = {data: swordplayers}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json( resObj )
  } catch (err) {
    console.log(err)
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
    return res.status(500).json(err.message)
  }
}

async function getEnabledPlayersByClan(req, res) {
  try {
    const { id_clan } = req.params
    if(!id_clan)return res.status(400).json({})
    const swordplayers = await swordplayerServ.getEnabledPlayersByClan(id_clan)

    const resObj = {data: swordplayers}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json( resObj )
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
  }
}

async function getPlayerById(req, res) {
  try {
    const { id } = req.params
    const swordplayer = await swordplayerServ.getPlayerById(id)
    if(!swordplayer) return res.status(400).json({})

    const resObj = {data: swordplayer}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json( resObj )
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
  }
}

async function getSwordplayersByClanId(req, res) {
  try {
    const { id_clan } = req.params
    const swordplayers = await swordplayerServ.getSwordplayersByClanId(id_clan)

    const resObj = {data: swordplayers}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json( resObj )
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
  }
}

async function postPlayer(req, res) {
  try {
    const { full_name, nickname, clanId, userId } = req.body
    if(!full_name || !nickname || !clanId || !userId ) return res.status(400).json({})
    const findClan = await clanServ.getClanById(clanId)
    if (!findClan) return res.status(404).json({})
    await swordplayerServ.newPlayer(full_name, nickname, clanId, userId)

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
    if(!id) return res.status(404).json({})
    if(!full_name || !nickname || !idClan) return res.status(400).json({})
    const findPlayer = await swordplayerServ.getPlayerById(id)
    if(!findPlayer) return res.status(404).json({})
    await swordplayerServ.updatePlayerById(id, idClan, full_name, nickname)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
  }
}

async function enablePlayerById(req, res) {
  try {
    const { id } = req.body
    if(!id) return res.status(400).json({})
    await swordplayerServ.enablePlayerById(id)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
  }
}

async function disablePlayerById(req, res) {
  try {
    const { id } = req.body
    if(!id) return res.status(400).json({})
    await swordplayerServ.disablePlayerById(id)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
  }
}

async function deletePlayerById(req, res) {
  try {
    const { id } = req.params
    if(!id) return res.status(400).json({})
    await swordplayerServ.deletePlayerById(id)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
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
    return res.status(500).json({})
  }
}

module.exports = {
  getAllPlayers,
  getEnabledPlayersByClan,
  getPlayerById,
  postPlayer,
  putPlayerById,
  enablePlayerById,
  disablePlayerById,
  deletePlayerById,
  getSwordplayersAndCombatCount,
  getEnabledSwordplayers,
  getAllSwordplayersWithFullClanInfo,
  getSwordplayersByClanId
}