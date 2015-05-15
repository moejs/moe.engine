var _array = (typeof Uint8Array != "undefined") ? new Uint8Array(32) : new Array(32);

var random = (typeof crypto != "undefined" && crypto.getRandomValues) ? (function() {
  crypto.getRandomValues(_array);
}) : (function() {
  for(var i = 0; i < _array.length; i++) {
    _array[i] = Math.floor(Math.random() * 0x10);
  }
});

var _template = "00000000-0000-0000-0000-000000000000";

function uuid() {
  random();
  _array[12] = 4;
  _array[16] = _array[16] & 0b0011 | 0b1000;
  var index = 0;
  return _template.replace(/0/g, () => {
    return (_array[index++] & 0xf).toString(16);
  });
}

module.exports = uuid;
