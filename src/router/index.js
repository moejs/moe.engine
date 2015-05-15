var Walker = require("../utils/walker");
var URLPattern = require("../url/pattern");

class Route {
  constructor(name, template) {
    this.name = name;
    this.template = new URLPattern(template);
  }
  match(path) {
    return this.template.match(path);
  }
  expand(params, query, hash) {
    return this.template.expand(params, query, hash);
  }
}

class Router {
  constructor(routes) {
    this.map = {};
    this.routes = [];
    (new Walker(routes)).forEach((value, path) => {
      var route = new Route(path.join("/"), value);
      this.map[route.name] = route;
      this.routes.push(route);
    });
  }
  match(path) {
    var state = {};
    this.routes.some((route) => {
      state = route.match(path);
      if(state) {
        state.name = route.name;
        return true;
      }
    });
    return state;
  }
  expand(state) {
    return this.route(state.name).expand(
      state.params,
      state.query,
      state.hash
    );
  }
  route(name) {
    return this.map[name];
  }
}

module.exports = Router;
