var immutable = require("../immutable");
var EventEmitter = require("../utils/event").EventEmitter;
var History = require("../history");
var Location = require("../location");
var Type = require("../location/type");

class Navigator extends EventEmitter {
  constructor(router, location = Location) {
    super();
    this.history = new History();
    this.router = router;
    this.location = new location();
    this.location.on("change", (type, data) => {
      this._onLocationChange(type, data);
    });
    this.location.init();
  }
  _match(path) {
    return this.router.match(path) || {};
  }
  _onLocationChange(type, data) {
    var state;
    switch(type) {
      case Type.PUSH:
        state = immutable(this._match(data.path));
        this.history.push(state);
        break;
      case Type.REPLACE:
        state = immutable(this._match(data.path));
        this.history.replace(state);
        break;
      case Type.POP:
        this.history.pop(data.delta);
        break;
    }
    if(this.history.current) {
      this.emit("change", this.history.current);
    }
  }
  push(state) {
    this.location.action(Type.PUSH, {
      path: this.router.expand(state)
    });
  }
  replace(state) {
    this.location.action(Type.REPLACE, {
      path: this.router.expand(state)
    });
  }
  pop(delta) {
    this.location.action(Type.POP, {
      delta: delta
    });
  }
}

module.exports = Navigator;
