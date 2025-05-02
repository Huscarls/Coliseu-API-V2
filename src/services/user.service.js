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

async function findUser(username) {
  const user = await repo.selectUserByUsername(username)
  user.clan = {}
  user.clan.id = user.id_clan
  delete user.id_clan
  return user
}

async function createUser(full_name, username, passwordHash, id_clan) {
  const id = authServ.createUuid([full_name, username])
  await repo.insertUser(id, username, passwordHash, full_name, id_clan)
}

async function enableUserById(id){
  await repo.updateUserStatusById(id, true)
  return
}

async function disableUserById(id){
  await repo.updateUserStatusById(id, false)
  return
}

module.exports = {
  findUser,
  createUser,
  getUsers,
  enableUserById,
  disableUserById
}