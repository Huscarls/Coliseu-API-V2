const repo = require("../repositories/weapon.repository.js");

async function getAllWeapons(){
  const weapons = await repo.getAllWeapons();
  return weapons
}

async function getWeaponById(id){
  const weapons = await repo.getWeaponById(id);
  return weapons
}

async function newWeapon(weapon){
  await repo.insertWeapon(weapon)
}

module.exports = {
  getAllWeapons,
  getWeaponById,
  newWeapon
}