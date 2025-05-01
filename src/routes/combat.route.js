const controller = require("../controllers/combat.controller.js")

const { validateSession } = require("../middleware/checkSession.middleware.js")
const route = require("express").Router()

// route.get("/clan/:id_clan", controller.getCombatsByClanId)
// route.get("/players", controller.getCombatByPlayers)
route.get("/swordplayer/:id_player", controller.getAllCombatsFromPlayer)
route.get("/:id", validateSession, controller.getCombatById)
route.get("/", validateSession, controller.getAllCombats)

route.post("/new", validateSession, controller.postCombat)

route.patch("/:id", validateSession, controller.patchCombatById)

route.delete("/:id", validateSession, controller.deleteCombatById)

module.exports = route