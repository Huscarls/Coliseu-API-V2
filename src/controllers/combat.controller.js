const combatServ = require("../services/combat.service.js")

async function getAllCombats(req, res) {
  try {
    const combats = await combatServ.getAllCombats()

    const resObj = {data: combats}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
  }
}

async function getCombatById(req, res) {
  try {
    const resObj = {}
    if(req.newToken) resObj.token = req.newToken

    const { id } = req.params
    const combat = await combatServ.getCombatById(id)
    if(!combat) return res.status(404).json(resObj)


    resObj.data = combat
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
  }
}

async function getAllCombatsFromPlayer(req, res) {
  try {
    const resObj = {}
    if(req.newToken) resObj.token = req.newToken

    const { id_player } = req.params
    if(!id_player) return res.status(400).json(resObj)
    const combats = await combatServ.getSwordplayerCombats(id_player)
    if(!combats) return res.status(404).json(resObj)

    resObj.data = combats
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
  }
}

async function getCombatByPlayers(req, res) {
  try {
    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    const { idSwp1, idSwp2 } = req.query
    if (!idSwp1 || !idSwp2) return res.status(400).json(resObj)
    const combat = await combatServ.getCombatByPlayers(idSwp1, idSwp2)
    if (!combat) return res.status(404).json(resObj)

    resObj.data = combat
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
  }
}

async function getCombatsByClanId(req, res) {
  try {
    const resObj = {}
    if(req.newToken) resObj.token = req.newToken

    const { id_clan } = req.params
    if(!id_clan) return res.status(400).json(resObj)
    
    const combat = await combatServ.getCombatsByClanId(id_clan)
    resObj.data = combat
    return res.status(200).json(resObj)

  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
  }
}

async function getCombatBySwordplayers(req, res) {
  try {
    const resObj = {}
    if(req.newToken) resObj.token = req.newToken

    const { swp1, swp2 } = req.params
    if(!swp1 || !swp2) return res.status(400).json(resObj)
    const combat = await combatServ.getCombatsBySwordplayers(swp1, swp2)
    if(!combat) return res.status(404).json({token: req.newToken})

    resObj.data = combat
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)

  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
  }
}

async function postCombat(req, res) {
  try {
    const resObj = {}
    if(req.newToken) resObj.token = req.newToken

    const { idSwp1, idWeapon1, roundsScored1, idSwp2, idWeapon2, roundsScored2, userId } = req.body

    if(!idSwp1 || !idWeapon1 || !idSwp2 || !idWeapon2 || !userId) return res.status(400).json(resObj)
    if(idSwp1 == idSwp2 || roundsScored1 == roundsScored2) return res.status(400).json(resObj)
      
    const foundCombat = await combatServ.getCombatBySwordplayers(idSwp1, idSwp2)
    if(foundCombat) return res.status(409).json(resObj)
    await combatServ.newCombat(idSwp1, idWeapon1, roundsScored1, idSwp2, idWeapon2, roundsScored2, userId)

    return res.status(201).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
  }
}

async function patchCombatById(req, res) {
  try {
    const resObj = {}
    if(req.newToken) resObj.token = req.newToken

    const { id } = req.params
    const { id_weapon1, roundsScored1, id_weapon2, roundsScored2, userId } = req.body
    console.log(userId)
    if(!userId) return res.status(400).json(resObj)
    await combatServ.updateCombatById(id, id_weapon1, roundsScored1, id_weapon2, roundsScored2, userId)

    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
  }
}

async function deleteCombatById(req, res) {
  try {
    const resObj = {}
    if(req.newToken) resObj.token = req.newToken

    const { id } = req.params
    if(!id) return res.status(400).json(resObj)
    await combatServ.deleteCombatById(id)

    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
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
  getCombatsByClanId,
  getCombatBySwordplayers
}