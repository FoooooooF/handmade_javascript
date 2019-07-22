"use strict";
var Mvvm = /** @class */ (function () {
    function Mvvm(_options) {
        var _this = this;
        this.$options = _options;
        this.$data = _options.data;
        observe(this.$data);
        var data = this.$data;
        Object.keys(data).forEach(function (key) {
            Object.defineProperty(_this, key, {
                enumerable: true,
                configurable: true,
                get: function () {
                    return this.$data[key];
                },
                set: function (newVal) {
                    this.$data[key] = newVal;
                }
            });
        });
        new Compile(_options.el, this.$data);
    }
    return Mvvm;
}());
var Observe = /** @class */ (function () {
    function Observe(_data) {
        this.data = _data;
        this.dep = new Dep();
        this.defineProperty();
    }
    Observe.prototype.defineProperty = function () {
        var that = this;
        Object.keys(that.data).forEach(function (elem) {
            var val = that.data[elem];
            observe(val);
            Object.defineProperty(that.data, elem, {
                enumerable: true,
                configurable: true,
                get: function () {
                    window.target && that.dep.depend(window.target);
                    return val;
                },
                set: function (newVal) {
                    if (newVal === val)
                        return;
                    val = newVal;
                    that.dep.notify();
                    observe(val);
                }
            });
        });
    };
    return Observe;
}());
var Compile = /** @class */ (function () {
    function Compile(_selector, _data) {
        this.el = document.querySelector(_selector);
        this.data = _data;
        var fragement = document.createDocumentFragment();
        var child = null;
        while ((child = this.el && this.el.firstElementChild))
            fragement.appendChild(child);
        this.replace(fragement);
        this.el && this.el.appendChild(fragement);
    }
    Compile.prototype.replace = function (frgmt) {
        var _this = this;
        var EXP = /\{\{(.*)\}\}/;
        var nodes = frgmt.children;
        var _loop_1 = function (i) {
            var node = nodes[i];
            var text = node.textContent;
            if (text && EXP.test(text) && node.nodeName.toLowerCase() !== "input") {
                var watcher = new Watcher(this_1.data, RegExp.$1, function (newVal) {
                    node.textContent = text && text.replace(EXP, newVal);
                });
                watcher.update();
            }
            if (node.nodeName.toLowerCase() === "input") {
                var _loop_2 = function (j) {
                    var attribute = node.attributes.item(j);
                    if (attribute && attribute.name.indexOf("v-") === 0) {
                        var exp_1 = attribute.value;
                        var newVal_1 = parsePath(exp_1).call(this_1.data, this_1.data);
                        exp_1 = exp_1.replace(/\s*/g, "");
                        new Watcher(this_1.data, exp_1, function () {
                            node.setAttribute("value", newVal_1);
                        });
                        node.setAttribute("value", newVal_1);
                        node.addEventListener("input", function (e) {
                            var newVal = e.target.value;
                            setter(exp_1, newVal).call(_this.data, _this.data);
                        });
                        return "break";
                    }
                };
                for (var j = 0; j < node.attributes.length; ++j) {
                    var state_1 = _loop_2(j);
                    if (state_1 === "break")
                        break;
                }
            }
            if (node.children)
                this_1.replace(node);
        };
        var this_1 = this;
        for (var i = 0; i < nodes.length; ++i) {
            _loop_1(i);
        }
    };
    return Compile;
}());
function observe(_data) {
    if (typeof _data !== "object")
        return null;
    return new Observe(_data);
}
