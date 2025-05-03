const controller = require("../controllers/swordplayer.controller.js")

const { validateSession } = require("../middleware/checkSession.middleware.js")
const route = require("express").Router()

//TODO
// route.get("/clan/:id_clan", controller.getPlayersByClanId)
route.get("/combat-count", controller.getSwordplayersAndCombatCount)
route.get("/enabled-swordplayers", controller.getEnabledSwordplayers)
route.get("/enabled-swordplayers/:id_clan", validateSession, controller.getEnabledPlayersByClan)
route.get("/stats", controller.getAllSwordplayersWithFullClanInfo)
route.get("/:id", controller.getPlayerById)
route.get("/", controller.getAllPlayers)

route.post("/new", validateSession, controller.postPlayer)

route.put("/:id", validateSession, controller.putPlayerById)

route.patch("/enable", validateSession, controller.enablePlayerById)
route.patch("/disable", validateSession, controller.disablePlayerById)

//TODO
route.delete("/:id", validateSession, controller.deletePlayerById)


module.exports = route