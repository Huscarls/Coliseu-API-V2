const controller = require("../controllers/swordplayer.controller.js")

const route = require("express").Router()

//TODO
// route.get("/full-info/:id", controller.getPlayerFullInfoById)
//TODO
// route.get("/enabled-players/clan/:id_clan", controller.getEnabledPlayersByClan)
//TODO
// route.get("/clan/:id_clan", controller.getPlayersByClanId)
route.get("/:id", controller.getPlayerById)
route.get("/", controller.getAllPlayers)

route.post("/new", controller.postPlayer)

//TODO
route.put("/:id", controller.putPlayerById)

//TODO
route.patch("/enable", controller.enablePlayerById)
route.patch("/disable", controller.disablePlayerById)

//TODO
route.delete("/:id", controller.deletePlayerById)


module.exports = route