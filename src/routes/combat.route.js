const controller = require("../controllers/combat.controller.js")

const route = require("express").Router()

// route.get("/player/:id_player", controller.getAllCombatsFromPlayer) //
// route.get("/clan/:id_clan", controller.getCombatsByClanId)
// route.get("/players", controller.getCombatByPlayers)
route.get("/:id", controller.getCombatById)
route.get("/", controller.getAllCombats) //

route.post("/new", controller.postCombat)

// route.put("/:id", controller.putCombatById)

// route.delete("/delete", controller.deleteCombatById)

module.exports = route