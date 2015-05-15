var utils = require("../utils");
var Matcher = require("../utils/matcher");
var AbsLoader = require("./abstract");

function makeRegExp(string) {
  return new RegExp("^" + string.split(/\*/).map((string) => (
      utils.escapeRegExp(string)
    )).join(/.*/.source) + "$");
}

function matcherHandler(input, name) {
  return name.test(input);
}

var _defaultLoader = new AbsLoader();

class Loader extends AbsLoader {
  constructor() {
    super();
    this.types = [];
    this._matcher = new Matcher(matcherHandler);
  }
  _getLoader(file) {
    return this._matcher.match(file) || _defaultLoader;
  }
  use(type, loader) {
    if(Array.isArray(type)) {
      type.forEach((type) => {
        this.use(type, loader);
      });
    } else {
      this.types.push(type);
      this._matcher.addRule(makeRegExp(type), loader);
    }
  }
  load(files) {
    if(Array.isArray(files)) {
      return Promise.all(files.map((file) => (
        this.load(file)
      )));
    } else if(utils.isPlainObject(files)) {
      let names = Object.keys(files);
      let values = names.map((name) => files[name]);
      return this.load(values).then((results) => {
        var object = {};
        names.forEach((name, index) => {
          object[name] = results[index];
        });
        return object;
      });
    } else {
      return this._getLoader(files).load(files);
    }
  }
}

module.exports = Loader;
