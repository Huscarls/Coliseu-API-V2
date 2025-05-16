const authServ = require("./auth.service.js")
const objService = require("./object.service.js")
const repo = require("../repositories/user.repository.js")

async function getUsers() {
  const users = await repo.selectAllUsers()
  for(let i = 0; i < users.length; i++){
    users[i].clan = objService.createClanObject(users[i].clan_name, users[i].clan_abbreviation)
    delete users[i].clan_name
    delete users[i].clan_abbreviation
  }
  return users
}

async function findUserByUsername(username) {
  const user = await repo.selectUserByUsername(username)
  user.clan = {}
  user.clan.id = user.id_clan
  delete user.id_clan
  return user
}

async function findUserById(id) {
  const userFound = await repo.selectUserById(id)
  if(!userFound) return userFound
  userFound.clan = objService.createClanObject(userFound.clan_name, userFound.clan_abbreviation, userFound.id_clan)
  delete userFound.clan_name
  delete userFound.clan_abbreviation
  delete userFound.id_clan
  return userFound
}

async function findUserEnabledById(id) {
  const userFound = await repo.selectEnabledUserById(id)
  if(!userFound) return userFound
  userFound.clan = {}
  userFound.clan.id = userFound.id_clan
  delete userFound.id_clan
  return userFound
}

async function createUser(full_name, username, passwordHash, id_clan, profile) {
  let leader = 0
  let staff = 0
  let admin = 0
  switch (profile) {
    case "leader":
      leader = 1
      break
    case "staff":
      staff = 1
      break
    case "admin":
      admin = 1
      break
  }
  const id = authServ.createUuid([full_name, username])
  await repo.insertUser(id, username, passwordHash, full_name, id_clan, leader, staff, admin)
}

async function updateUser(id, full_name, username, profile) {
  let leader = 0
  let staff = 0
  let admin = 0
  switch (profile) {
    case "leader":
      leader = 1
      break
    case "staff":
      staff = 1
      break
    case "admin":
      admin = 1
      break
  }
  await repo.updateUser(id, full_name, username, leader, staff, admin)
  
}

async function enableUserById(id){
  await repo.updateUserStatusById(id, true)
  return
}

async function disableUserById(id){
  await repo.updateUserStatusById(id, false)
  return
}

async function changePasswordOverride(id, passwordHash) {
  await repo.updateUserPassword(id, passwordHash)
  return
}

async function deleteUserById(id){
  await repo.deleteById(id)
  return
}

module.exports = {
  findUserByUsername,
  createUser,
  getUsers,
  enableUserById,
  disableUserById,
  findUserEnabledById,
  deleteUserById,
  updateUser,
  findUserById,
  changePasswordOverride
}