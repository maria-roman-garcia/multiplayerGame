const { v4 } = require("uuid");

module.exports = class Player {
  name = "";
  id = -1;

  constructor(name) {
    this.name = name;
    id = v4();
  }
}