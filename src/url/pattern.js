var utils = require("../utils");
var url = require("./index");

function getNames(template) {
  var regexp = /\{(.*?)\}/g;
  var names = [];
  var match;
  while(match = regexp.exec(template)) {
    names.push(match[1]);
  }
  return names;
}

function makeRegExp(template) {
  return new RegExp("^" + template.split(/\{.*?\}/).map((string) => (
      utils.escapeRegExp(string)
    )).join(/([^\/]*?)/.source) + "$");
}

class URLPattern {
  constructor(template) {
    this.template = template;
    this.names = getNames(template);
    this.regexp = makeRegExp(template);
  }
  expand(params, query, hash) {
    params = params || {};
    var string = this.template.replace(/\{(.*?)\}/g, (_, name) => (
      url.encode(params[name] || "")
    ));
    if(query) {
      var queryString = url.makeQueryString(query);
      if(queryString) {
        string += "?" + queryString;
      }
    }
    if(hash) {
      string += "#" + hash;
    }
    return string;
  }
  match(url) {
    var query = {};
    var hash = "";
    var index;
    index = url.indexOf("#");
    if(index != -1) {
      hash = url.slice(index + 1);
      url = url.slice(0, index);
    }
    index = url.indexOf("?");
    if(index != -1) {
      query = url.parseQueryString(url.slice(index + 1));
      url = url.slice(0, index);
    }
    var match = url.match(this.regexp);
    if(!match) {
      return null;
    }
    var params = {};
    this.names.forEach((name, index) => {
      params[name] = match[index + 1];
    });
    return {
      params, query, hash
    };
  }
}

module.exports = URLPattern;
