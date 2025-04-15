const combatServ = require("../services/combat.service.js")

async function getAllCombats(req, res) {
  try {
    const combats = await combatServ.getAllCombats()
    return res.status(200).json(combats)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function getCombatById(req, res) {
  try {
    const { id } = req.params
    const combat = await combatServ.getCombatById(id)
    return res.status(200).json(combat)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function getAllCombatsFromPlayer(req, res) {
  try {
    const { id_player } = req.params
    const combats = await combatServ.getPlayerCombats(id_player)
    return res.status(200).json(combats)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function getCombatByPlayers(req, res) {
  try {
    const { id_player1, id_player2 } = req.query
    if (!id_player1) return res.status(400).json({ message: "Please insert an id_player1", error: "No id_player1" })
    if (!id_player2) return res.status(400).json({ message: "Please insert an id_player2", error: "No id_player2" })
    const combat = await combatServ.getCombatByPlayers(id_player1, id_player2)
    if (!combat) return res.status(404).json({ message: "Combat not found", error: "No combat found" })
    return res.status(200).json(combat)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function postCombat(req, res) {
  try {
    const { id_player1, id_weapon1, rounds_scored1, id_player2, id_weapon2, rounds_scored2 } = req.body
    if(!id_player1 || !id_weapon1 || !id_player2 || !id_weapon2) return res.status(400).send()
    if(id_player1 == id_player2 || rounds_scored1 == rounds_scored2) return res.status(400).send()
    await combatServ.newCombat(id_player1, id_weapon1, rounds_scored1, id_player2, id_weapon2, rounds_scored2)
    return res.status(201).json()
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function putCombatById(req, res) {
  try {
    const { id_player1, id_weapon1, rounds_scored1, id_player2, id_weapon2, rounds_scored2 } = req.body
    await combatServ.updateCombatById(id_player1, id_weapon1, rounds_scored1, id_player2, id_weapon2, rounds_scored2)
    return(200).json()
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function deleteCombatById(req, res) {
  try {
    const { id_player1, id_player2 } = req.body
    await combatServ.deleteCombatById(id_player1, id_player2)
    return res.status(200).json()
  } catch (err) {
    res.status(500).json(err.message)
  }
}

module.exports = {
  getAllCombats,
  getAllCombatsFromPlayer,
  getCombatByPlayers,
  postCombat,
  putCombatById,
  deleteCombatById,
  getCombatById
}