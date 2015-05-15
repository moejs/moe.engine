var utils = require("./index");

class Walker {
  constructor(object, depth = -1) {
    this.object = object;
    this.depth = depth;
  }
  _loop(object, handler, depth, path, map = false) {
    if(this.depth != -1 && depth > this.depth) {
      return handler(object, path, depth);
    }
    if(Array.isArray(object)) {
      if(map) {
        let result = [];
        object.forEach((value, index) => {
          result.push(this._loop(value, handler, depth + 1, path.concat(index), map));
        });
        return result;
      } else {
        object.forEach((value, index) => {
          this._loop(value, handler, depth + 1, path.concat(index), map);
        });
      }
    } else if(utils.isPlainObject(object)) {
      if(map) {
        let result = {};
        Object.keys(object).forEach((key) => {
          result[key] = this._loop(object[key], handler, depth + 1, path.concat(key), map);
        });
        return result;
      } else {
        Object.keys(object).forEach((key) => {
          this._loop(object[key], handler, depth + 1, path.concat(key), map);
        });
      }
    } else {
      return handler(object, path, depth);
    }
  }
  forEach(handler) {
    this._loop(this.object, handler, 0, []);
  }
  map(handler) {
    return this._loop(this.object, handler, 0, [], true);
  }
  flatMap(handler) {
    var result = [];
    this._loop(this.object, (object, path, depth) => {
      result.push(handler(object, path, depth));
    }, 0, []);
    return result;
  }
}

module.exports = Walker;
