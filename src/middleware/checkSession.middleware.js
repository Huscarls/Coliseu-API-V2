const sessionServ = require("../services/session.service.js")


async function validateSession(req, res, next){
  const bearer = req.headers["authorization"]
  if(!bearer) return res.status(401).send()
  const token = bearer.split(" ")[1]
  const userId = req.headers["user-id"]
  req.userId = userId
  const validToken = sessionServ.validateToken(token)
  if(validToken) return next()

  // const session = await sessionServ.validatePreviousSession(userId, token)
  // if(!session) {
  //   await sessionServ.logoffAllSessions(userId)
  //   return res.status(401).send()
  // }

  const newToken = sessionServ.getToken(userId)
  await sessionServ.updateToken(userId, token, newToken)
  req.newToken = newToken
  next()
}


// UNUSED
// Need to learn to insert data into json body
async function insertNewToken(req, res, next) {
  res.on("finish", ()=> {
    console.log(res.json())
    if(!req.newToken) return next()
        
    const oldJson = res.json
    res.json = (body) => {
      console.log("body", body)
      const newBody = {...body, token: req.newToken}
      oldJson.call(this, newBody)
    }
  })
  next()
}

module.exports = {
  validateSession,
  insertNewToken
}