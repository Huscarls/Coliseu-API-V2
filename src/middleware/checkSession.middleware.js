const sessionServ = require("../services/session.service.js")
const userServ = require("../services/user.service.js")


async function validateSession(req, res, next){
  const bearer = req.headers["authorization"]
  if(!bearer) return res.status(401).json({})
  const token = bearer.split(" ")[1]
  if(!token) return res.status(401).json({})
  const userId = req.headers["user-id"]
  req.userId = userId
  const validToken = sessionServ.validateToken(token)
  if(validToken) return next()

  const session = await sessionServ.validatePreviousSession(userId, token)
  if(!session) {
    await sessionServ.logoffAllSessions(userId)
    return res.status(401).json({})
  }

  const newToken = sessionServ.getToken(userId)
  await sessionServ.updateToken(userId, token, newToken)
  req.newToken = newToken
  return next()
}

async function isAdmin(req,res,next) {
  const { userId } = req
  const userFound = await userServ.findUserById(userId)
  if(userFound && userFound.is_admin) return next()
  if(req.newToken) resObj.token = req.newToken
  return res.status(403).send()
}

async function isStaff(req,res,next) {
  const { userId } = req
  const userFound = await userServ.findUserById(userId)
  if(userFound && (userFound.is_staff || userFound.is_admin)) return next()
  if(req.newToken) resObj.token = req.newToken
  return res.status(403).send()
}

async function isLeader(req,res,next) {
  const { userId } = req
  const userFound = await userServ.findUserById(userId)
  if(userFound && (userFound.is_leader || userFound.is_admin)) return next()
  if(req.newToken) resObj.token = req.newToken
  return res.status(403).send()
}

module.exports = {
  validateSession,
  isAdmin,
  isStaff,
  isLeader
}

