function encode(string) {
  return encodeURIComponent(string);
}

function decode(string) {
  return decodeURIComponent(string);
}

function makeQueryString(query) {
  return Object.keys(query).map((key) => (
    encode(key) + "=" + encode(query[key])
  )).join("&");
}

function parseQueryString(string) {
  var query = {};
  string.split("&").forEach((pair) => {
    var match = pair.match(/^(.*?)=(.*?)$/);
    if(match) {
      query[decode(match[1])] = decode(match[2]);
    } else {
      query[decode(pair)] = "";
    }
  });
  return query;
}

module.exports = {
  encode,
  decode,
  makeQueryString,
  parseQueryString
};
