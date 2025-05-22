const weaponServ = require("../services/weapon.service.js")

async function getAllWeapons(req, res) {
  try {
    const weapons = await weaponServ.getAllWeapons()

    const resObj = {data: weapons}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
  }
}

async function getWeaponById(req, res) {
  try {
    const { id } = req.params
    const weapon = await weaponServ.getWeaponById(id)

    const resObj = {data: weapon}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
  }
}

async function postWeapon(req, res) {
  try {
    const { category } = req.body
    await weaponServ.newWeapon(category)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(201).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
  }
}

module.exports = {
  getAllWeapons,
  getWeaponById,
  postWeapon
}