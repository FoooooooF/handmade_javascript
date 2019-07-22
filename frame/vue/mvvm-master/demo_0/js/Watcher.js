class Watcher {
  constructor(_vm, _exp, _cb) {
    this.vm = _vm;
    this.cb = _cb;
    this.getter = parsePath(_exp);
    this.val = this.get();
  }

  get() {
    window.target = this;
    let val = this.getter.call(this.vm, this.vm);
    window.target = undefined;
    return val;
  }

  update() {
    this.cb(this.get());
  }
}
