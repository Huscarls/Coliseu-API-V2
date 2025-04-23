require("dotenv").config();

const { createDatabase } = require("./database/dbCreation")

createDatabase()

const express = require("express")
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors());

// const userRoutes = require("./routes/user.route.js")
// app.use("/user", userRoutes)

const clanRoutes = require("./routes/clan.route.js")
app.use("/clan", clanRoutes)

const swordplayerRoutes = require("./routes/swordplayer.route.js")
app.use("/swordplayer", swordplayerRoutes)

const combatRoutes = require("./routes/combat.route.js")
app.use("/combat", combatRoutes)

const weaponRoutes = require("./routes/weapon.route.js")
app.use("/weapon", weaponRoutes)

app.get("/health", async (req, res) => {
  const healthData = {
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: "OK",
    timestamp: Date.now()
  }
  try {
    res.status(200).json(healthData)
  } catch (err) {
    res.status(500).json({ msg: "Not healthy" })
  }
})

module.exports = app