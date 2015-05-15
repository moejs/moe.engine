var HistoryLocation = require("./history");

class HashLocation extends HistoryLocation {
  _getPath() {
    return location.hash.replace(/^#!/, "") || "/";
  }
  _buildPath(path) {
    return "#!" + path;
  }
}

module.exports = HashLocation;
