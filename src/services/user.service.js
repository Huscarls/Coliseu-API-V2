const authServ = require("./auth.service.js")
const repo = require("../repositories/user.repository.js")

async function getUsers() {
  const users = await repo.selectAllUsers()
  return users
}

async function findUser(username) {
  const user = await repo.selectUserByUsername(username)
  return user
}

async function createUser(full_name, username, passwordHash, id_clan) {
  const id = authServ.createUuid([full_name, username])
  await repo.insertUser(id, username, passwordHash, full_name, id_clan)
}

module.exports = {
  findUser,
  createUser
}