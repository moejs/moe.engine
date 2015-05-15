function defaultHandler(input, name) {
  return input === name;
}

class Matcher {
  constructor(handler = defaultHandler) {
    this._handler = handler;
    this._names = [];
    this._values = [];
  }
  addRule(name, value) {
    this._names.push(name);
    this._values.push(value);
  }
  match(input) {
    var index = this._names.findIndex((name) => (
      this._handler(input, name)
    ));
    if(index != -1) {
      return this._values[index];
    } else {
      return null;
    }
  }
}

module.exports = Matcher;
