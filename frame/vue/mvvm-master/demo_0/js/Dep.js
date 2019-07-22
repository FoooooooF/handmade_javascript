class Dep {
  constructor() {
    this.subs = []
  }

  depend(_sub) {
    this.subs.push(_sub)
  }

  notify() {
    this.subs.forEach(elem => {
      elem.update()
    })
  }
}
