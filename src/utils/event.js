class EventEmitter {
  constructor() {
    this._listeners = {};
  }
  on(type, handler) {
    if(!this._listeners[type]) {
      this._listeners[type] = [];
    }
    this._listeners[type].push(handler);
  }
  off(type, handler) {
    if(this._listeners[type]) {
      var index = this._listeners[type].indexOf(handler);
      if(index != -1) {
        this._listeners[type].splice(index, 1);
      }
    }
  }
  emit(type, ...args) {
    if(this._listeners && this._listeners[type]) {
      this._listeners[type].slice(0).forEach((fn) => {
        fn.apply(this, args);
      });
    }
  }
}

module.exports = {
  EventEmitter
};
