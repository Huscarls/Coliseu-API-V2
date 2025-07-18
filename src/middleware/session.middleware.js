const sessionServ = require("../services/session.service.js")
const userServ = require("../services/user.service.js")


async function validateSession(req, res, next){
  try{

    const bearer = req.headers["authorization"]
    if(!bearer) {
      return res.status(401).send()
    }
    const token = bearer.split(" ")[1]
    if(!token) {
      return res.status(401).send()
    }
    const userId = req.headers["user-id"]
    req.userId = userId
    const validToken = sessionServ.validateToken(token)
    if(validToken) return next()
      
    const session = await sessionServ.validatePreviousSession(userId, token)
    if(!session) {
      await sessionServ.logoffAllSessions(userId)
      return res.status(401).send()
    }
  
    const newToken = sessionServ.getToken(userId)
    await sessionServ.updateToken(userId, token, newToken)
    req.newToken = newToken

    return next()
  }
  catch(err){
    console.log(err)
    return res.status(500).json({})
  }
}

async function isAdmin(req,res,next) {
  try {
    const { userId } = req
    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    const userFound = await userServ.findUserEnabledById(userId)
    if(!userFound) return res.status(401).json(resObj)
    if (userFound.is_admin) return next()
    return res.status(403).json(resObj)
  }
  catch(err){
    console.log(err)
    return res.status(500).json({})
  }
}

async function isStaff(req,res,next) {
  try{
    const { userId } = req
    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    const userFound = await userServ.findUserEnabledById(userId)
    if(!userFound) return res.status(401).json(resObj)
    if (userFound.is_staff || userFound.is_admin) return next()
    return res.status(403).json(resObj)
  }
  catch(err){
    console.log(err)
    return res.status(500).json({})
  }
}

async function isLeader(req,res,next) {
  try{
    const { userId } = req
    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    const userFound = await userServ.findUserEnabledById(userId)
    if(!userFound) return res.status(401).json(resObj)
    if (userFound.is_leader || userFound.is_admin) return next()
    return res.status(403).json(resObj)
  }
  catch(err){
    console.log(err)
    return res.status(500).json({})
  }
}

async function logger(req, res, next) {
  console.log(req.originalUrl)
  return next()
}

module.exports = {
  validateSession,
  isAdmin,
  isStaff,
  isLeader,
  logger
}

