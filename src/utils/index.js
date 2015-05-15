function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isPlainObject(object) {
  return object && typeof object == "object" && object.constructor === Object;
}

module.exports = {
  escapeRegExp,
  isPlainObject
};
