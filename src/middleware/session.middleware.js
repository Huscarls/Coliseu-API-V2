const sessionServ = require("../services/session.service.js")
const userServ = require("../services/user.service.js")


async function validateSession(req, res, next){
  const bearer = req.headers["authorization"]
  if(!bearer) {
    res.status(401)
    return next("route")
  }
  const token = bearer.split(" ")[1]
  if(!token) {
    res.status(401)
    return next("route")
  }
  const userId = req.headers["user-id"]
  req.userId = userId
  const validToken = sessionServ.validateToken(token)
  if(validToken) return next()

  const session = await sessionServ.validatePreviousSession(userId, token)
  if(!session) {
    await sessionServ.logoffAllSessions(userId)
    res.status(401)
    return next("route")
  }

  const newToken = sessionServ.getToken(userId)
  await sessionServ.updateToken(userId, token, newToken)
  req.newToken = newToken
  return next()
}

async function isAdmin(req,res,next) {
  const { userId } = req
  const resObj = {}
  if(req.newToken) resObj.token = req.newToken
  const userFound = await userServ.findUserEnabledById(userId)
  if(!userFound) return res.status(401).json(resObj)
  if (userFound.is_admin) return next()
  return res.status(403).json(resObj)
}

async function isStaff(req,res,next) {
  const { userId } = req
  const resObj = {}
  if(req.newToken) resObj.token = req.newToken
  const userFound = await userServ.findUserEnabledById(userId)
  if(!userFound) return res.status(401).json(resObj)
  if (userFound.is_staff || userFound.is_admin) return next()
  return res.status(403).json(resObj)
}

async function isLeader(req,res,next) {
  const { userId } = req
  const resObj = {}
  if(req.newToken) resObj.token = req.newToken
  const userFound = await userServ.findUserEnabledById(userId)
  if(!userFound) return res.status(401).json(resObj)
  if (userFound.is_leader || userFound.is_admin) return next()
  return res.status(403).json(resObj)
}

async function insertToken(req, res) {
  const resObj = {}
  if(req.stsCode < 400 && req.resData) resObj.data = req.resData
  if(req.newToken) resObj.token = req.newToken
  return res.status(req.stsCode).json(resObj)
}

module.exports = {
  validateSession,
  isAdmin,
  isStaff,
  isLeader,
  insertToken
}

