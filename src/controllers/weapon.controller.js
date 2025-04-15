const weaponServ = require("../services/weapon.service.js")

async function getAllWeapons(req, res) {
  try {
    const weapons = await weaponServ.getAllWeapons()
    return res.status(200).json(weapons)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function getWeaponById(req, res) {
  try {
    const { id } = req.params
    const weapon = await weaponServ.getWeaponById(id)
    return res.status(200).json(weapon)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

async function postWeapon(req, res) {
  try {
    const { category } = req.body
    await weaponServ.newWeapon(category)
    return res.status(201).json()
  } catch (err) {
    res.status(500).json(err.message)
  }
}

module.exports = {
  getAllWeapons,
  getWeaponById,
  postWeapon
}