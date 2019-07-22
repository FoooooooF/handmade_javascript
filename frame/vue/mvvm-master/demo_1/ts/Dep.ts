class Dep {
  private deps: Watcher[];
  constructor() {
    this.deps = [];
  }

  depend(_dep: Watcher) {
    this.deps.push(_dep);
  }

  notify() {
    this.deps.forEach(elem => {
      elem.update();
    });
  }
}
