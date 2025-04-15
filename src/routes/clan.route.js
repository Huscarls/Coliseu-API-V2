const controller = require("../controllers/clan.controller")

const route = require("express").Router()

route.post("/new", controller.postClan)

//TODO
route.get("/withEnabledPlayers", controller.getClansWithEnabledPlayers)
route.get("/:id", controller.getClanById)
route.get("/", controller.getAllClans)


//TODO
route.put("/:id", controller.putClanById)

//TODO
route.delete("/:id", controller.deleteClanById)

module.exports = route