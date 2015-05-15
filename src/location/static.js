var Location = require("./index");
var Type = require("./type");

class StaticLocation extends Location {
  init() {
    this.emit("change", Type.PUSH, {
      path: "/"
    });
  }
}

module.exports = StaticLocation;
