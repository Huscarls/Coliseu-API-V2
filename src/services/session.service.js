const repo = require("../repositories/session.repository")

const jwt = require("jsonwebtoken")

const SECRET = process.env.SECRET;

function getToken(userId){
  const token = jwt.sign({userId}, SECRET, {expiresIn: 3600})
  return token
}

function validateToken(token = ""){
  try {
    jwt.verify(token, SECRET)
    return true
  } catch (err) {
    return false
  }
}

async function registerToken(userId, token) {
  await repo.insertToken(userId, token)
}

async function validatePreviousSession(userId, token) {
  return await repo.findSession(userId, token)
}

async function logoffAllSessions(userId) {
  await repo.deleteSessionsFromUser(userId)
}

async function updateToken(userId, oldToken, newToken) {
  await repo.updateSession(userId, oldToken, newToken)
}

module.exports = {
  getToken,
  validateToken,
  registerToken,
  validatePreviousSession,
  logoffAllSessions,
  updateToken
}