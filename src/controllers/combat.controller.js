const combatServ = require("../services/combat.service.js")

async function getAllCombats(req, res) {
  try {
    const combats = await combatServ.getAllCombats()

    const resObj = {data: combats}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

async function getCombatById(req, res) {
  try {
    const { id } = req.params
    const combat = await combatServ.getCombatById(id)
    if(!combat) return res.status(404).send()

    const resObj = {data: combat}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function getAllCombatsFromPlayer(req, res) {
  try {
    const { id_player } = req.params
    if(!id_player) return res.status(400).send()
    const combats = await combatServ.getSwordplayerCombats(id_player)
    if(!combats) return res.status(404).send()

    const resObj = {data: combats}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function getCombatByPlayers(req, res) {
  try {
    const { idSwp1, idSwp2 } = req.query
    if (!idSwp1 || !idSwp2) return res.status(400).send()
    const combat = await combatServ.getCombatByPlayers(idSwp1, idSwp2)
    if (!combat) return res.status(404).json()

    const resObj = {data: combat}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    res.status(500)
    return next()
  }
}

async function getCombatsByClanId(req, res) {
  try {
    const { id_clan } = req.params
    if(!id_clan) return res.status(400).send()
    
    const combat = await combatServ.getCombatsByClanId(id_clan)
    const resObj = {data: combat}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)

  } catch (err) {
    
  }
}

async function postCombat(req, res) {
  try {
    const { idSwp1, idWeapon1, roundsScored1, idSwp2, idWeapon2, roundsScored2, userId } = req.body

    if(!idSwp1 || !idWeapon1 || !idSwp2 || !idWeapon2 || !userId) return res.status(400).send()
    if(idSwp1 == idSwp2 || roundsScored1 == roundsScored2) return res.status(400).send()
      
    const foundCombat = await combatServ.getCombatBySwordplayers(idSwp1, idSwp2)
    if(foundCombat) return res.status(409).send()
    await combatServ.newCombat(idSwp1, idWeapon1, roundsScored1, idSwp2, idWeapon2, roundsScored2)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(201).json(resObj)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

async function patchCombatById(req, res) {
  try {
    const { id } = req.params
    const { id_weapon1, roundsScored1, id_weapon2, roundsScored2 } = req.body
    await combatServ.updateCombatById(id, id_weapon1, roundsScored1, id_weapon2, roundsScored2)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function deleteCombatById(req, res) {
  try {
    const { id } = req.params
    if(!id) return res.status(400).send()
    await combatServ.deleteCombatById(id)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

module.exports = {
  getAllCombats,
  getAllCombatsFromPlayer,
  getCombatByPlayers,
  postCombat,
  patchCombatById,
  deleteCombatById,
  getCombatById,
  getCombatsByClanId
}