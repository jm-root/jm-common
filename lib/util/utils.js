var fs = require('fs');
var fse = require('fs-extra');
var iRandomMax = 200000000000;

var utils = {};

module.exports = utils;

/**
 * Check and invoke callback function
 */
utils.invokeCallback = function (cb) {
    if (!!cb && typeof cb === 'function') {
        cb.apply(null, Array.prototype.slice.call(arguments, 1));
    }
};


utils.erase = function (a, value) {
    var idx = a.indexOf(value);
    if(idx<0) return;
    a.splice(idx, 1);
    //delete a[idx];
};

/**
 * clone an object
 */
utils.clone = function (origin, target, deepClone, cleanClone) {
    if (!origin) {
        return;
    }

    var obj = target;
    if(!target){
        obj = this;
    }

    for (var f in origin) {
        if(deepClone && isObject(origin[f])){
            var t = {};
            if(isArray(origin[f])){
                t = [];
            }
            if(!obj[f]) obj[f] = t;
            if(cleanClone) obj[f] = t;
            utils.clone(origin[f], obj[f], deepClone, cleanClone);
            continue;
        }

        if (origin.hasOwnProperty(f)) {
            obj[f] = origin[f];
        }
    }
};

utils.size = function (obj) {
    if (!obj) {
        return 0;
    }

    var size = 0;
    for (var f in obj) {
        if (obj.hasOwnProperty(f)) {
            size++;
        }
    }

    return size;
};

utils.random = function (min, max, exact) {
    if (arguments.length === 0) {
        return Math.random();
    }
    else if (arguments.length === 1) {
        max = min;
        min = 0;
    }
    var range = min + (Math.random() * (max - min));
    return exact === void(0) ? Math.round(range) : range.toFixed(exact);
};

utils.indexOf = function(arry,value){
    var startIndex=0;
    var stopIndex=arry.length-1;
    var middleIndex=(startIndex+stopIndex)>>>1;
    while(arry[middleIndex]!=value && startIndex<stopIndex){
        if(arry[middleIndex]>value){
            stopIndex=middleIndex-1;
        }else{
            startIndex=middleIndex+1;
        }
        middleIndex=(startIndex+stopIndex)>>>1;
    }
    return arry[middleIndex]!=value ? -1:middleIndex;
};

utils.randomRange = function(range){
    return utils.random(0,iRandomMax) % range;
}

utils.randomOdds = function(range, odds){
    if(utils.randomRange(range) < odds) return 1;
    return 0;
};

utils.readJsonSync = function(fileName, options) {
    return fse.readJsonSync(fileName, options);
};

utils.writeJsonSync = function(fileName, obj, options) {
    return fse.writeJsonSync(fileName, obj, options);
};

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
    return Array.isArray(ar);
}
utils.isArray = isArray;

function isBoolean(arg) {
    return typeof arg === 'boolean';
}
utils.isBoolean = isBoolean;

function isNull(arg) {
    return arg === null;
}
utils.isNull = isNull;

function isNullOrUndefined(arg) {
    return arg == null;
}
utils.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
    return typeof arg === 'number';
}
utils.isNumber = isNumber;

function isString(arg) {
    return typeof arg === 'string';
}
utils.isString = isString;

function isSymbol(arg) {
    return typeof arg === 'symbol';
}
utils.isSymbol = isSymbol;

function isUndefined(arg) {
    return arg === void 0;
}
utils.isUndefined = isUndefined;

function isRegExp(re) {
    return isObject(re) && objectToString(re) === '[object RegExp]';
}
utils.isRegExp = isRegExp;

function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
}
utils.isObject = isObject;

function isDate(d) {
    return isObject(d) && objectToString(d) === '[object Date]';
}
utils.isDate = isDate;

function isError(e) {
    return isObject(e) && objectToString(e) === '[object Error]';
}
utils.isError = isError;

function isFunction(arg) {
    return typeof arg === 'function';
}
utils.isFunction = isFunction;

function isPrimitive(arg) {
    return arg === null ||
        typeof arg === 'boolean' ||
        typeof arg === 'number' ||
        typeof arg === 'string' ||
        typeof arg === 'symbol' ||  // ES6 symbol
        typeof arg === 'undefined';
}
utils.isPrimitive = isPrimitive;

function isBuffer(arg) {
    return arg instanceof Buffer;
}
utils.isBuffer = isBuffer;

function objectToString(o) {
    return Object.prototype.toString.call(o);
}
utils.objectToString = objectToString;
