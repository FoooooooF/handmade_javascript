//https://github.com/browserify/browser-pack
(function outer(modules, cache, entry) {
    // Save the require from previous bundle to this closure if any
    var previousRequire = typeof require == "function" && require;

    function newRequire(name, jumped) {
        if (!cache[name]) {
            if (!modules[name]) {
                // if we cannot find the module within our internal map or
                // cache jump to the current global require ie. the last bundle
                // that was added to the page.
                var currentRequire = typeof require == "function" && require;
                if (!jumped && currentRequire) return currentRequire(name, true);

                // If there are other bundles on this page the require from the
                // previous one is saved to 'previousRequire'. Repeat this as
                // many times as there are bundles until the module is found or
                // we exhaust the require chain.
                if (previousRequire) return previousRequire(name, true);
                var err = new Error('Cannot find module \'' + name + '\'');
                err.code = 'MODULE_NOT_FOUND';
                throw err;
            }
            var m = cache[name] = {
                exports: {}
            };
            modules[name][0].call(m.exports, function (x) {
                var id = modules[name][1][x];
                return newRequire(id ? id : x);
            }, m, m.exports, outer, modules, cache, entry);
        }
        return cache[name].exports;
    }
    for (var i = 0; i < entry.length; i++) newRequire(entry[i]);

    // Override the current require with this new one
    return newRequire;
})({
    1: [function (require, module, exports) {
        "use strict";
        // var _require = require("add.js");
        var _require = require("../utils/add.js"),
            add = _require.add;

        var a = 1213;
        var b = 3456;
        console.log(add(a, b));
    }, {
        "../utils/add.js": 2
    }],
    2: [function (require, module, exports) {
        exports.add = function (a, b) {
            return a + b
        }
    }, {}]
}, {}, [1])
