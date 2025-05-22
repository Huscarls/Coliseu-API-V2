const controller = require("../controllers/clan.controller")
const { isStaff, isAdmin, isLeader } = require("../middleware/session.middleware.js")

const route = require("express").Router()

route.post("/new", isAdmin, controller.postClan)

route.get("/with-enabled-swordplayers", isStaff, controller.getClansWithEnabledPlayers)
route.get("/:id", isLeader, controller.getClanById)
route.get("/", isStaff, controller.getAllClans)

route.put("/:id", isAdmin, controller.putClanById)

route.delete("/:id", isAdmin, controller.deleteClanById)

module.exports = route