const controller = require("../controllers/combat.controller.js")

const route = require("express").Router()

// route.get("/clan/:id_clan", controller.getCombatsByClanId)
// route.get("/players", controller.getCombatByPlayers)
route.get("/swordplayer/:id_player", controller.getAllCombatsFromPlayer)
route.get("/:id", controller.getCombatById)
route.get("/", controller.getAllCombats)

route.post("/new", controller.postCombat)

route.patch("/:id", controller.patchCombatById)

route.delete("/:id", controller.deleteCombatById)

module.exports = route