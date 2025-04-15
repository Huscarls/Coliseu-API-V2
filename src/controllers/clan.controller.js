const clanServ = require("../services/clan.service.js")
const playerServ = require("../services/swordplayer.service.js")
const combatServ = require("../services/combat.service.js")

async function getAllClans(req, res) {
  try {
    const clans = await clanServ.getAllClans()
    return res.status(200).json(clans)
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
}

//TODO
async function getClanById(req, res) {
  try {
    const { id } = req.params
    if (!id) return res.status(400).send()
    const clan = await clanServ.getClanById(id)
    if (!clan) return res.status(404).send()
    return res.status(200).json(clan)
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
}

//TODO
async function getClansWithEnabledPlayers(req, res) {
  try {
    const clans = await clanServ.getClansWithEnabledPlayers()
    return res.status(200).json(clans)
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
}

async function postClan(req, res) {
  try {
    const { full_name, abbreviation } = req.body
    if (!full_name || !abbreviation) return res.status(400).send()

    const foundClan = await clanServ.getClanByFullName(full_name)
    if (foundClan) return res.status(409).send()

    await clanServ.newClan(full_name, abbreviation)
    return res.status(201).json()
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
}

//TODO
async function putClanById(req, res) {
  try {
    const { id } = req.params
    if (!id) return res.status(400).send()
    const { full_name, abbreviation } = req.body
    if (!full_name || !abbreviation) return res.status(400).send()
    await clanServ.editClan(id, full_name, abbreviation)
    return res.status(204).json()
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
}

async function deleteClanById(req, res) {
  try {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: "Insert a clan id" })
    await clanServ.deleteClanById(id)
    res.status(204).json({ message: "Clan deleted with all respecives players and combats" })
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
}

module.exports = {
  getAllClans,
  getClanById,
  getClansWithEnabledPlayers,
  postClan,
  putClanById,
  deleteClanById
}