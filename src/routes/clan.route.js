const controller = require("../controllers/clan.controller")
const { isStaff, isAdmin, isLeader } = require("../middleware/checkSession.middleware.js")

const route = require("express").Router()

route.post("/new",  controller.postClan)

route.get("/withEnabledSwordplayers", isStaff, controller.getClansWithEnabledPlayers)
route.get("/:id", isLeader, controller.getClanById)
route.get("/", isStaff, controller.getAllClans)

//TODO
route.put("/:id", isAdmin, controller.putClanById)

//TODO
route.delete("/:id", isAdmin, controller.deleteClanById)

module.exports = route