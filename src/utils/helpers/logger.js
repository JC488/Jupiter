"use strict";

const chalk = require("chalk");
const Console = console;

function resolveNum(num) {
    if(!isNaN(num)) {
        return (num > 10 ? num : `0${num}`);
    } else {
        return num;
    }
}

class Logger {
  /**
   * @constructor
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Returns a warn in the console.
   * @param {string} text The log
   */
  warn(text) {
    let date = new Date();
    if(!text) {
      return Console.log(`[${chalk.keyword("green")(resolveNum(date.getDate())+"/"+resolveNum(date.getMonth()+1)+"/"+date.getFullYear())}] [${chalk.keyword("orange")("Warn")}] Vous devez inclure un texte pour afficher un warn`);
    }
    return Console.log(`[${chalk.keyword("green")(resolveNum(date.getDate())+"/"+resolveNum(date.getMonth()+1)+"/"+date.getFullYear())}] [${chalk.keyword("orange")("Warn")}] ${text}`);
  }

  /**
   * Returns a log in the console.
   * @param {string} text The log
   */
  log(text) {    
    let date = new Date();
    if(!text) {
      return Console.log(`[${chalk.keyword("green")(resolveNum(date.getDate())+"/"+resolveNum(date.getMonth()+1)+"/"+date.getFullYear())}] [${chalk.keyword("orange")("Warn")}] Vous devez inclure un texte pour afficher un log`);
    }
    return Console.log(`[${chalk.keyword("green")(resolveNum(date.getDate())+"/"+resolveNum(date.getMonth()+1)+"/"+date.getFullYear())}] [${chalk.keyword("magenta")("Info")}] ${text}`);
  }

  /**
   * Returns an error in the console.
   * @param {string} text The log
   */
  error(text) {    
    let date = new Date();
    if(!text) {
      return Console.log(`[${chalk.keyword("green")(resolveNum(date.getDate())+"/"+resolveNum(date.getMonth()+1)+"/"+date.getFullYear())}] [${chalk.keyword("orange")("Warn")}] Vous devez inclure un texte pour afficher une erreur`);
    }
    return Console.log(`[${chalk.keyword("green")(resolveNum(date.getDate())+"/"+resolveNum(date.getMonth()+1)+"/"+date.getFullYear())}] [${chalk.keyword("red")("Error")}] ${text}`);
  }
}

module.exports = Logger;

