"use strict";
var Watcher = /** @class */ (function () {
    function Watcher(_data, _exp, _cb) {
        this.data = _data;
        this.cb = _cb;
        this.getter = parsePath(_exp);
    }
    Watcher.prototype.get = function () {
        window.target = this;
        var val = this.getter.call(this.data, this.data);
        window.target = undefined;
        return val;
    };
    Watcher.prototype.update = function () {
        this.cb(this.get());
    };
    return Watcher;
}());
function parsePath(path) {
    var keys = path.split(".");
    return function (obj) {
        keys.forEach(function (elem) {
            elem = elem.replace(/\s*/g, "");
            if (!obj)
                return;
            obj = obj[elem];
        });
        return obj;
    };
}
function setter(_path, _val) {
    var keys = _path.split(".");
    var res;
    var key;
    return function (obj) {
        keys.forEach(function (elem) {
            elem = elem.replace(/\s*/g, "");
            if (!obj)
                return;
            res = obj;
            key = elem;
            obj = obj[elem];
        });
        res[key] = _val;
    };
}
