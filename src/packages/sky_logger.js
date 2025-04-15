const fs = require("fs")

// CONSTANTS
const MINUTES_IN_MILISSECONDS = 60 * 1000
const TIMEZOME_MINUTES_OFFSET = -180 // GMT -3
//----------------------------

// FUNCTIONS
//----------------------------

class Logger{
  constructor(executionLevel){
    switch (executionLevel.toUpperCase()) {
      case "DEBUG":
        this.#_EXECUTION_LEVEL = 0
        break;
      case "INFO":
        this.#_EXECUTION_LEVEL = 1
        break;
      case "WARNING":
        this.#_EXECUTION_LEVEL = 2
        break;
      case "ERROR":
        this.#_EXECUTION_LEVEL = 3
        break;
      case "CRITICAL":
        this.#_EXECUTION_LEVEL = 4
        break;
      default:
        this.#_EXECUTION_LEVEL = 0
        break;
    }
  }

  // UTILS
  #printError = function(err) {
    return console.log(err)
  }
  
  createLogsDirectory = function(){
    try{
      fs.mkdirSync("./logs", this.#printError)
    }
    catch{
      console.log("Logs directory already exists")
    }
  }
  
  #newTimestamp = function() {
    let timestamp = new Date(Date.now() + (TIMEZOME_MINUTES_OFFSET * MINUTES_IN_MILISSECONDS))
    timestamp = timestamp.toISOString()
    timestamp = timestamp.replace("Z", "").replace(":", "h").replace(":", "m")
    return timestamp
  }
  //---------------------------

  #_DEBUG = 0
  #_INFO = 1
  #_WARNING = 2
  #_ERROR = 3
  #_CRITICAL = 4
  #_EXECUTION_LEVEL = 0

  #_MAX_LOG_LINES = 10_000

  #_countLogLines = 0

  #_fileTimestamp = this.#newTimestamp()

  // Logging private utils
  #getFunctionInformation = function(){
    const err = new Error()
    const callerInformationString = err.stack.split("\n")[4].trim().split(" ")
    const caller = {
      function: callerInformationString[1],
      location: callerInformationString[2].replace("(", "").replace(")", "")
    }
    return caller
  }
  #prepareLogMessage = function(logLevel, message){
    const timestamp = this.#newTimestamp()
    const caller = this.#getFunctionInformation()
    const logMessage = `${timestamp} - ${logLevel} | ${caller.location} > ${caller.function} - ${message}`
    return logMessage
  }
  #writeLogMessage = function(logMessage){
    // TODO write on the right folder/file
    fs.writeFileSync(`./logs/Servi_System_${this.#_fileTimestamp}.log`, `\n${logMessage}`, { flag: "a" }, this.#printError)
    this.#_countLogLines += 1
  }
  #createNewLogFile = function(lineCount){
    if (this.#_countLogLines < this.#_MAX_LOG_LINES) return
    this.#_fileTimestamp = this.#newTimestamp()
    this.#_countLogLines = 0
  }
  //---------------------

  // Logging functions
  debug = function(message) {
    if (this.#_EXECUTION_LEVEL > this.#_DEBUG) return
    const logMessage = this.#prepareLogMessage("DEBUG", message)
    this.#writeLogMessage(logMessage)
    this.#createNewLogFile(this.#_countLogLines)
  }
  info = function(message) {
    if (this.#_EXECUTION_LEVEL > this.#_INFO) return
    const logMessage = this.#prepareLogMessage("INFO", message)
    this.#writeLogMessage(logMessage)
    this.#createNewLogFile(this.#_countLogLines)
  }
  warning = function(message) {
    if (this.#_EXECUTION_LEVEL > this.#_WARNING) return
    const logMessage = this.#prepareLogMessage("WARNING", message)
    this.#writeLogMessage(logMessage)
    this.#createNewLogFile(this.#_countLogLines)
  }
  error = function(message) {
    if (this.#_EXECUTION_LEVEL > this.#_ERROR) return
    const logMessage = this.#prepareLogMessage("ERROR", message)
    this.#writeLogMessage(logMessage)
    this.#createNewLogFile(this.#_countLogLines)
  }
  critical = function(message) {
    if (this.#_EXECUTION_LEVEL > this.#_CRITICAL) return
    const logMessage = this.#prepareLogMessage("CRITICAL", message)
    this.#writeLogMessage(logMessage)
    this.#createNewLogFile(this.#_countLogLines)
  }
  //---------------------
}

const LOGGER = new Logger("debug")
// LOGGER.debug("DEBUG")
// LOGGER.info("INFO")
// LOGGER.warning("WARNING")
// LOGGER.error("ERROR")
// LOGGER.critical("CRITICAL")

module.exports = LOGGER