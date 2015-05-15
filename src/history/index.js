class History {
  constructor() {
    this.index = -1;
    this.stack = [];
  }
  push(state) {
    this.stack.splice(this.index + 1, this.stack.length - (this.index + 1));
    this.stack.push(state);
    this.index++;
  }
  replace(state) {
    this.stack[this.index] = state;
  }
  pop(delta) {
    this.index += delta;
  }
  get current() {
    return this.stack[this.index];
  }
}

module.exports = History;
