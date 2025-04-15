const controller = require("../controllers/video.controller.js")

const route = require("express").Router()

route.post("/new-entry", controller.createVideoEntry)

module.exports = route
