var immutable = require("../immutable");
var History = require("../history");
var Location = require("./index");
var Type = require("./type");

class HistoryLocation extends Location {
  constructor() {
    super();
    this.history = new History();
  }
  _getPath() {
    return location.pathname + location.search + location.hash;
  }
  _buildPath(path) {
    return path;
  }
  _buildState(path) {
    return {
      path: path
    };
  }
  _onPopState() {
    if(!history.state) {
      return;
    }
    var index = this.history.stack.findIndex((state) => (
      immutable.equals(history.state, state)
    ));
    if(index != -1) {
      var diff = index - this.history.index;
      if(diff != 0) {
        this.history.index = index;
        this.emit("change", Type.POP, {
          delta: diff
        });
      }
    }
  }
  _onHashChange() {
    if(history.state) {
      return;
    }
    this.history.push(null);
    var data = {
      path: this._getPath()
    };
    this.action(Type.REPLACE, data, false);
    this.emit("change", Type.PUSH, data);
  }
  init() {
    window.addEventListener("popstate", () => {
      this._onPopState();
    });
    window.addEventListener("hashchange", () => {
      this._onHashChange();
    });

    this.history.push(null);
    var data = {
      path: this._getPath()
    };
    this.action(Type.REPLACE, data, false);
    this.emit("change", Type.PUSH, data);
  }
  action(type, data, emit = true) {
    var state;
    switch(type) {
      case Type.PUSH:
        state = immutable(this._buildState(data.path));
        this.history.push(state);
        history.pushState(state, "", this._buildPath(data.path));
        break;
      case Type.REPLACE:
        state = immutable(this._buildState(data.path));
        this.history.replace(state);
        history.replaceState(state, "", this._buildPath(data.path));
        break;
      case Type.POP:
        this.history.pop(data.delta);
        history.go(data.delta);
        break;
    }
    if(emit) {
      this.emit("change", type, data);
    }
  }
}

module.exports = HistoryLocation;
