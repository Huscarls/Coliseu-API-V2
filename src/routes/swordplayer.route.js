const controller = require("../controllers/swordplayer.controller.js")

const { validateSession, isStaff, isAdmin, isLeader } = require("../middleware/session.middleware.js")
const route = require("express").Router()

route.get("/clan/:id_clan", validateSession, isLeader, controller.getSwordplayersByClanId)
route.get("/combat-count", controller.getSwordplayersAndCombatCount)
route.get("/enabled-swordplayers", controller.getEnabledSwordplayers)
route.get("/enabled-swordplayers/:id_clan", validateSession, isStaff, controller.getEnabledPlayersByClan)
route.get("/stats", validateSession, isAdmin, controller.getAllSwordplayersWithFullClanInfo)
route.get("/:id", controller.getPlayerById)
route.get("/", controller.getAllPlayers)

route.post("/new", validateSession, isStaff, controller.postPlayer)

route.put("/:id", validateSession, isStaff,  controller.putPlayerById)

route.patch("/enable", validateSession, isAdmin, controller.enablePlayerById)
route.patch("/disable", validateSession, isStaff, controller.disablePlayerById)

route.delete("/:id", validateSession, isAdmin, controller.deletePlayerById)


module.exports = route