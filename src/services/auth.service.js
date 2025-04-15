const uuid = require("uuid")

const NAMESPACE = process.env.NAMESPACE

const cripServ = require("./criptography.service")

function createUuid(...args){
  args.push(Date.now())
  const argsString = args.join("")
  const id = uuid.v5(argsString, NAMESPACE)
  return id
}

function verifyPassword(password, passwordHash){
  const correctPassword = cripServ.compareToHash(password, passwordHash)
  return correctPassword
}

module.exports = {
  createUuid,
  verifyPassword
}