class Mvvm {
  constructor(_options = {}) {
    this.$options = _options;
    let data = (this._data = _options.data);
    observe(this._data);

    Object.keys(data).forEach(elem => {
      Object.defineProperty(this, elem, {
        enumerable: true,
        configurable: true,
        get() {
          return this._data[elem];
        },
        set(newVal) {
          if (newVal === this._data[elem]) return;
          this._data[elem] = newVal;
        }
      });
    });

    new Compile(_options.el, _options.data);
  }
}

function observe(_data) {
  if (typeof _data !== "object") return;
  return new Observe(_data);
}

class Observe {
  constructor(_data = {}) {
    let dep = new Dep();

    Object.keys(_data).forEach(elem => {
      let val = _data[elem];
      observe(val);
      Object.defineProperty(_data, elem, {
        enumerable: true,
        configurable: true,
        get() {
          window.target && dep.depend(window.target);
          return val;
        },
        set(newVal) {
          if (newVal === val) return;
          val = newVal;
          observe(newVal);
          dep.notify();
        }
      });
    });
  }
}

class Compile {
  constructor(_el, _data) {
    this.data = _data;
    let el = document.querySelector(_el);
    let fragement = document.createDocumentFragment();
    let child = null;
    while ((child = el.firstChild)) {
      fragement.appendChild(child);
    }
    this.replace(fragement);
    el.appendChild(fragement);
  }

  replace(_el) {
    let exp = /\{\{(.*)\}\}/;
    Array.from(_el.childNodes).forEach(node => {
      let text = node.textContent;
      if (node.nodeType === 3 && exp.test(text)) {
        let watcher = new Watcher(this.data, RegExp.$1, newVal => {
          node.textContent = text.replace(exp, newVal);
        });
        watcher.update();
      }
      if (node.childNodes) {
        this.replace(node);
      }
    });
  }
}
