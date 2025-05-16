const clanServ = require("../services/clan.service.js")

async function getAllClans(req, res) {
  try {
    const clans = await clanServ.getAllClans()

    const resObj = {data: clans}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).send()
  }
}

async function getClanById(req, res) {
  try {
    const { id } = req.params
    console.log(id)
    if (!id) return res.status(400).send()
    const clan = await clanServ.getClanById(id)
    if (!clan) return res.status(404).send()

    const resObj = {data: clan}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).send()
  }
}

async function getClansWithEnabledPlayers(req, res) {
  try {
    const clans = await clanServ.getClansWithEnabledPlayers()

    const resObj = {data: clans}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).send()
  }
}

async function postClan(req, res) {
  try {
    const { full_name, abbreviation } = req.body
    if (!full_name || !abbreviation) return res.status(400).send()

    const foundClan = await clanServ.getClanByFullName(full_name)
    if (foundClan) return res.status(409).send()

    await clanServ.newClan(full_name, abbreviation)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(201).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).send()
  }
}

async function putClanById(req, res) {
  try {
    const { id } = req.params
    if (!id) return res.status(400).send()
    const { full_name, abbreviation } = req.body
    if (!full_name || !abbreviation) return res.status(400).send()
    await clanServ.editClan(id, full_name, abbreviation)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(204).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).send()
  }
}

async function deleteClanById(req, res) {
  try {
    const { id } = req.params
    if (!id) return res.status(400).json()
    await clanServ.deleteClanById(id)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    res.status(204).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).send()
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