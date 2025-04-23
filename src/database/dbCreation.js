const { db } = require("./dbConnect.js")

const TABLES = ["clans", "users", "swordplayers", "weapons", "combats"]

async function getAllNames(){
  
  const query = "SHOW TABLES;"
  const [tablesObj, _] = await db.query(query)
  const tables = tablesObj.map( tb => tb["Tables_in_" + process.env.DB_DATABASE])
  return tables
}

const creationQuery = {

  'users': `CREATE TABLE users (
	id CHAR(36) NOT NULL UNIQUE PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL UNIQUE,
    nickname VARCHAR(30) NOT NULL,
    id_clan CHAR(36) NOT NULL,
      FOREIGN KEY (id_clan) REFERENCES clans(id) ON DELETE CASCADE,
    is_enabled BOOL NOT NULL DEFAULT TRUE,
    creation_timestamp DATETIME NOT NULL DEFAULT NOW()
);`,

  'clans': `CREATE TABLE clans (
    id CHAR(36) NOT NULL UNIQUE PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL UNIQUE,
    abbreviation VARCHAR(6) NOT NULL UNIQUE,
    creation_timestamp DATETIME NOT NULL DEFAULT NOW()
);`,

  'swordplayers': `CREATE TABLE swordplayers (
    id INT NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(70) NOT NULL,
    nickname VARCHAR(30) NOT NULL,
    id_clan CHAR(36) NOT NULL,
      FOREIGN KEY (id_clan) REFERENCES clans(id) ON DELETE CASCADE,
    is_enabled BOOL NOT NULL DEFAULT TRUE,
    creation_timestamp DATETIME NOT NULL DEFAULT NOW(),
    id_creator CHAR(36),
      FOREIGN KEY (id_creator) REFERENCES users(id) ON DELETE CASCADE
);`,

  'weapons': `CREATE TABLE weapons (
    id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    \`name\` VARCHAR(20)
    );`,

  'combats': `CREATE TABLE combats (
    id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    id_swp1 INT NOT NULL,
      FOREIGN KEY (id_swp1) REFERENCES swordplayers(id) ON DELETE CASCADE,
    id_weapon1 INT NOT NULL,
      FOREIGN KEY (id_weapon1) REFERENCES weapons(id) ON DELETE CASCADE,
    rounds_scored1 INT NOT NULL,
      CHECK (rounds_scored1 > -1),
    id_swp2 INT NOT NULL,
      FOREIGN KEY (id_swp2) REFERENCES swordplayers(id) ON DELETE CASCADE,
    id_weapon2 INT NOT NULL,
      FOREIGN KEY (id_weapon2) REFERENCES weapons(id) ON DELETE CASCADE,
    rounds_scored2 INT NOT NULL,
      CHECK (rounds_scored2 > -1),
    id_creator CHAR(36),
      FOREIGN KEY (id_creator) REFERENCES users(id) ON DELETE CASCADE,
    CHECK (id_swp1 < id_swp2)
);`
}

async function createDatabase(){
  try {
    const tablesFound = await getAllNames();

    for (const table of TABLES){
      if (tablesFound.includes(table)) continue
      const query = creationQuery[table]
      await db.query(query)
      console.log(`Created table: ${table}`)
    }
    console.log("Database online")
  } catch (err) {
    console.log(err)
    console.log("Please create the database on MySQL manually")
    process.exit(1)
  }
}

async function populateDatabase() {
  
}

module.exports = {
  createDatabase
}