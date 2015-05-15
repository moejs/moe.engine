var uuid = require("../utils/uuid");

var _id = "__immutable_id__";

function immutable(object) {
  if(!(_id in object)) {
    object[_id] = uuid();
  }
  return object;
}

immutable.equals = function(a, b) {
  return a && (_id in a) && b && (_id in b) && (a[_id] === b[_id]);
};

module.exports = immutable;
