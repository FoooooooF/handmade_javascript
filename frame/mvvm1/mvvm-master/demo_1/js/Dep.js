"use strict";
var Dep = /** @class */ (function () {
    function Dep() {
        this.deps = [];
    }
    Dep.prototype.depend = function (_dep) {
        this.deps.push(_dep);
    };
    Dep.prototype.notify = function () {
        this.deps.forEach(function (elem) {
            elem.update();
        });
    };
    return Dep;
}());
