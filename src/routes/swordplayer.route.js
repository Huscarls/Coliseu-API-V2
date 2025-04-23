const controller = require("../controllers/swordplayer.controller.js")

const route = require("express").Router()

//TODO
// route.get("/clan/:id_clan", controller.getPlayersByClanId)
route.get("/combat-count", controller.getSwordplayersAndCombatCount)
route.get("/enabled-swordplayers", controller.getEnabledSwordplayers)
route.get("/enabled-swordplayers/:id_clan", controller.getEnabledPlayersByClan)
route.get("/:id", controller.getPlayerById)
route.get("/", controller.getAllPlayers)

route.post("/new", controller.postPlayer)

route.put("/:id", controller.putPlayerById)

route.patch("/enable", controller.enablePlayerById)
route.patch("/disable", controller.disablePlayerById)

//TODO
route.delete("/:id", controller.deletePlayerById)


module.exports = route