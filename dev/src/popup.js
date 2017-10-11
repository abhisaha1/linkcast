/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "src";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 129);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js
//! version : 2.18.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.moment = factory();
})(undefined, function () {
    'use strict';

    var hookCallback;

    function hooks() {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback(callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        var k;
        for (k in obj) {
            // even if its not own property I'd still call it non-empty
            return false;
        }
        return true;
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [],
            i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function some(fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    var some$1 = some;

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some$1.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidMonth && !flags.invalidWeekday && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);

            if (m._strict) {
                isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            } else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        } else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment(obj) {
        return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
    }

    function absFloor(number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (_typeof(arguments[i]) === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + new Error().stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set(config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig),
            prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function keys(obj) {
            var i,
                res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var keys$1 = keys;

    var defaultCalendar = {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L'
    };

    function calendar(key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS: 'h:mm:ss A',
        LT: 'h:mm A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat(key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate() {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal(number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years'
    };

    function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
    }

    function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({ unit: u, priority: priorities[u] });
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function makeGetSet(unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get(mom, unit) {
        return mom.isValid() ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1(mom, unit, value) {
        if (mom.isValid()) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    // MOMENTS

    function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }

    function stringSet(units, value) {
        if ((typeof units === 'undefined' ? 'undefined' : _typeof(units)) === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? forceSign ? '+' : '' : '-') + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function func() {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens),
            i,
            length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '',
                i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1 = /\d/; //       0 - 9
    var match2 = /\d\d/; //      00 - 99
    var match3 = /\d{3}/; //     000 - 999
    var match4 = /\d{4}/; //    0000 - 9999
    var match6 = /[+-]?\d{6}/; // -999999 - 999999
    var match1to2 = /\d\d?/; //       0 - 99
    var match3to4 = /\d\d\d\d?/; //     999 - 9999
    var match5to6 = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3 = /\d{1,3}/; //       0 - 999
    var match1to4 = /\d{1,4}/; //       0 - 9999
    var match1to6 = /[+-]?\d{1,6}/; // -999999 - 999999

    var matchUnsigned = /\d+/; //       0 - inf
    var matchSigned = /[+-]?\d+/; //    -inf - inf

    var matchOffset = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;

    var regexes = {};

    function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return isStrict && strictRegex ? strictRegex : regex;
        };
    }

    function getParseRegexForToken(token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken(token, callback) {
        var i,
            func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function func(input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken(token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function indexOf(o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    var indexOf$1 = indexOf;

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M', match1to2);
    addRegexToken('MM', match1to2, match2);
    addRegexToken('MMM', function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths(m, format) {
        if (!m) {
            return isArray(this._months) ? this._months : this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort(m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i,
            ii,
            mom,
            llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf$1.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf$1.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf$1.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf$1.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth(mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth(value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY', 4], 0, 'year');
    addFormatToken(0, ['YYYYY', 5], 0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y', matchSigned);
    addRegexToken('YY', match1to2, match2);
    addRegexToken('YYYY', match1to4, match4);
    addRegexToken('YYYYY', match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear() {
        return isLeapYear(this.year());
    }

    function createDate(y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date = new Date(y, m, d, h, M, s, ms);

        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,

        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear,
            resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek,
            resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w', match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W', match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow: 0, // Sunday is the first day of the week.
        doy: 6 // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek() {
        return this._week.dow;
    }

    function localeFirstDayOfYear() {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d', match1to2);
    addRegexToken('e', match1to2);
    addRegexToken('E', match1to2);
    addRegexToken('dd', function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd', function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd', function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays(m, format) {
        if (!m) {
            return isArray(this._weekdays) ? this._weekdays : this._weekdays['standalone'];
        }
        return isArray(this._weekdays) ? this._weekdays[m.day()] : this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort(m) {
        return m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin(m) {
        return m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i,
            ii,
            mom,
            llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf$1.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf$1.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf$1.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf$1.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf$1.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf$1.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse(weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }

    function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [],
            shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom,
            minp,
            shortp,
            longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
    });

    function meridiem(token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a', matchMeridiem);
    addRegexToken('A', matchMeridiem);
    addRegexToken('H', match1to2);
    addRegexToken('h', match1to2);
    addRegexToken('k', match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM(input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return (input + '').toLowerCase().charAt(0) === 'p';
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem(hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }

    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    // months
    // week
    // weekdays
    // meridiem
    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0,
            j,
            next,
            locale,
            split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && typeof module !== 'undefined' && module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                __webpack_require__(164)("./" + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                getSetGlobalLocale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            } else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale(name, config) {
        if (config !== null) {
            var parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride', 'use moment.updateLocale(localeName, config) to change ' + 'an existing locale. moment.defineLocale(localeName, ' + 'config) should only be used for creating a new locale ' + 'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    if (!localeFamilies[config.parentLocale]) {
                        localeFamilies[config.parentLocale] = [];
                    }
                    localeFamilies[config.parentLocale].push({
                        name: name,
                        config: config
                    });
                    return null;
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale,
                parentConfig = baseConfig;
            // MERGE
            if (locales[name] != null) {
                parentConfig = locales[name]._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale(key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys$1(locales);
    }

    function checkOverflow(m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/], ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/], ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/], ['GGGG-[W]WW', /\d{4}-W\d\d/, false], ['YYYY-DDD', /\d{4}-\d{3}/], ['YYYY-MM', /\d{4}-\d\d/, false], ['YYYYYYMMDD', /[+-]\d{10}/], ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/], ['GGGG[W]WW', /\d{4}W\d{2}/, false], ['YYYYDDD', /\d{7}/]];

    // iso time formats and regexes
    var isoTimes = [['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/], ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/], ['HH:mm:ss', /\d\d:\d\d:\d\d/], ['HH:mm', /\d\d:\d\d/], ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/], ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/], ['HHmmss', /\d\d\d\d\d\d/], ['HHmm', /\d\d\d\d/], ['HH', /\d\d/]];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i,
            l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime,
            dateFormat,
            timeFormat,
            tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var basicRfcRegex = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var string, match, dayFormat, dateFormat, timeFormat, tzFormat;
        var timezones = {
            ' GMT': ' +0000',
            ' EDT': ' -0400',
            ' EST': ' -0500',
            ' CDT': ' -0500',
            ' CST': ' -0600',
            ' MDT': ' -0600',
            ' MST': ' -0700',
            ' PDT': ' -0700',
            ' PST': ' -0800'
        };
        var military = 'YXWVUTSRQPONZABCDEFGHIKLM';
        var timezone, timezoneIndex;

        string = config._i.replace(/\([^\)]*\)|[\n\t]/g, ' ') // Remove comments and folding whitespace
        .replace(/(\s\s+)/g, ' ') // Replace multiple-spaces with a single space
        .replace(/^\s|\s$/g, ''); // Remove leading and trailing spaces
        match = basicRfcRegex.exec(string);

        if (match) {
            dayFormat = match[1] ? 'ddd' + (match[1].length === 5 ? ', ' : ' ') : '';
            dateFormat = 'D MMM ' + (match[2].length > 10 ? 'YYYY ' : 'YY ');
            timeFormat = 'HH:mm' + (match[4] ? ':ss' : '');

            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            if (match[1]) {
                // day of week given
                var momentDate = new Date(match[2]);
                var momentDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][momentDate.getDay()];

                if (match[1].substr(0, 3) !== momentDay) {
                    getParsingFlags(config).weekdayMismatch = true;
                    config._isValid = false;
                    return;
                }
            }

            switch (match[5].length) {
                case 2:
                    // military
                    if (timezoneIndex === 0) {
                        timezone = ' +0000';
                    } else {
                        timezoneIndex = military.indexOf(match[5][1].toUpperCase()) - 12;
                        timezone = (timezoneIndex < 0 ? ' -' : ' +') + ('' + timezoneIndex).replace(/^-?/, '0').match(/..$/)[0] + '00';
                    }
                    break;
                case 4:
                    // Zone
                    timezone = timezones[match[5]];
                    break;
                default:
                    // UT or +/-9999
                    timezone = timezones[' GMT'];
            }
            match[5] = timezone;
            config._i = match.splice(1).join('');
            tzFormat = ' ZZ';
            config._f = dayFormat + dateFormat + timeFormat + tzFormat;
            configFromStringAndFormat(config);
            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate('value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' + 'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' + 'discouraged and will be removed in an upcoming major release. Please refer to ' + 'http://momentjs.com/guides/#/warnings/js-date/ for more info.', function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    });

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray(config) {
        var i,
            date,
            input = [],
            currentDate,
            yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i,
            parsedInput,
            tokens,
            token,
            skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                } else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            } else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }

    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig(config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || format === undefined && input === '') {
            return createInvalid({ nullInput: true });
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate('moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    });

    var prototypeMax = deprecate('moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
    });

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function now() {
        return Date.now ? Date.now() : +new Date();
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(ordering.indexOf(key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds + seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days + weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months + quarters * 3 + years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration(obj) {
        return obj instanceof Duration;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset(token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z', matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk = matches[matches.length - 1] || [];
        var parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset(m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone(input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset() {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            } else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset(input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
    }

    function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal() {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

    function createDuration(input, key) {
        var duration = input,

        // matching against regexp is expensive, do it on demand
        match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: parseIso(match[2], sign),
                M: parseIso(match[3], sign),
                w: parseIso(match[4], sign),
                d: parseIso(match[5], sign),
                h: parseIso(match[6], sign),
                m: parseIso(match[7], sign),
                s: parseIso(match[8], sign)
            };
        } else if (duration == null) {
            // checks for null or undefined
            duration = {};
        } else if ((typeof duration === 'undefined' ? 'undefined' : _typeof(duration)) === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso(inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = { milliseconds: 0, months: 0 };

        res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +base.clone().add(res.months, 'M');

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return { milliseconds: 0, months: 0 };
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' + 'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val;val = period;period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1(time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone() {
        return new Moment(this);
    }

    function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween(from, to, units, inclusivity) {
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) && (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
    }

    function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff(input, units, asFloat) {
        var that, zoneDelta, delta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
            units === 'minute' ? delta / 6e4 : // 1000 * 60
            units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
            units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
            units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
            delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff(a, b) {
        // difference in months
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),

        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2,
            adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString() {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString() {
        if (!this.isValid()) {
            return null;
        }
        var m = this.clone().utc();
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            return this.toDate().toISOString();
        }
        return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect() {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format(inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
            return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
            return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale(key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    });

    function localeData() {
        return this._locale;
    }

    function startOf(units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
            case 'year':
                this.month(0);
            /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
            /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
            case 'date':
                this.hours(0);
            /* falls through */
            case 'hour':
                this.minutes(0);
            /* falls through */
            case 'minute':
                this.seconds(0);
            /* falls through */
            case 'second':
                this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf(units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }

        // 'date' is an alias for 'day', so it should be considered as such.
        if (units === 'date') {
            units = 'day';
        }

        return this.startOf(units).add(1, units === 'isoWeek' ? 'week' : units).subtract(1, 'ms');
    }

    function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 60000;
    }

    function unix() {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate() {
        return new Date(this.valueOf());
    }

    function toArray() {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject() {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON() {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2() {
        return isValid(this);
    }

    function parsingFlags() {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt() {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg', 'weekYear');
    addWeekYearFormatToken('ggggg', 'weekYear');
    addWeekYearFormatToken('GGGG', 'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);

    // PARSING

    addRegexToken('G', matchSigned);
    addRegexToken('g', matchSigned);
    addRegexToken('GG', match1to2, match2);
    addRegexToken('gg', match1to2, match2);
    addRegexToken('GGGG', match1to4, match4);
    addRegexToken('gggg', match1to4, match4);
    addRegexToken('GGGGG', match1to6, match6);
    addRegexToken('ggggg', match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
    }

    function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter(input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIOROITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D', match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ? locale._dayOfMonthOrdinalParse || locale._ordinalParse : locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD', match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear(input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m', match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s', match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });

    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S', match1to3, match1);
    addRegexToken('SS', match1to3, match2);
    addRegexToken('SSS', match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z', 0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr() {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName() {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.format = format;
    proto.from = from;
    proto.fromNow = fromNow;
    proto.to = to;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;

    // Year
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;

    // Week Year
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    proto.quarter = proto.quarters = getSetQuarter;

    // Month
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;

    // Week
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;

    // Hour
    proto.hour = proto.hours = getSetHour;

    // Minute
    proto.minute = proto.minutes = getSetMinute;

    // Second
    proto.second = proto.seconds = getSetSecond;

    // Millisecond
    proto.millisecond = proto.milliseconds = getSetMillisecond;

    // Offset
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;

    // Timezone
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;

    // Deprecations
    proto.dates = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix(input) {
        return createLocal(input * 1000);
    }

    function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat(string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set;

    // Month
    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;

    // Week
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;

    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;

    // Hours
    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1(format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl(format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl(localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths(format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort(format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function ordinal(number) {
            var b = number % 10,
                output = toInt(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs() {
        var data = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);

        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);

        return this;
    }

    function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil(number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble() {
        var milliseconds = this._milliseconds;
        var days = this._days;
        var months = this._months;
        var data = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds = absFloor(milliseconds / 1000);
        data.seconds = seconds % 60;

        minutes = absFloor(seconds / 60);
        data.minutes = minutes % 60;

        hours = absFloor(minutes / 60);
        data.hours = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days = days;
        data.months = months;
        data.years = years;

        return this;
    }

    function daysToMonths(days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays(months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as(units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week':
                    return days / 7 + milliseconds / 6048e5;
                case 'day':
                    return days + milliseconds / 864e5;
                case 'hour':
                    return days * 24 + milliseconds / 36e5;
                case 'minute':
                    return days * 1440 + milliseconds / 6e4;
                case 'second':
                    return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond':
                    return Math.floor(days * 864e5) + milliseconds;
                default:
                    throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1() {
        if (!this.isValid()) {
            return NaN;
        }
        return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
    }

    function makeAs(alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds = makeAs('s');
    var asMinutes = makeAs('m');
    var asHours = makeAs('h');
    var asDays = makeAs('d');
    var asWeeks = makeAs('w');
    var asMonths = makeAs('M');
    var asYears = makeAs('y');

    function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds = makeGetter('seconds');
    var minutes = makeGetter('minutes');
    var hours = makeGetter('hours');
    var days = makeGetter('days');
    var months = makeGetter('months');
    var years = makeGetter('years');

    function weeks() {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44, // a few seconds to seconds
        s: 45, // seconds to minute
        m: 45, // minutes to hour
        h: 22, // hours to day
        d: 26, // days to month
        M: 11 // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1(posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds = round(duration.as('s'));
        var minutes = round(duration.as('m'));
        var hours = round(duration.as('h'));
        var days = round(duration.as('d'));
        var months = round(duration.as('M'));
        var years = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds] || seconds < thresholds.s && ['ss', seconds] || minutes <= 1 && ['m'] || minutes < thresholds.m && ['mm', minutes] || hours <= 1 && ['h'] || hours < thresholds.h && ['hh', hours] || days <= 1 && ['d'] || days < thresholds.d && ['dd', days] || months <= 1 && ['M'] || months < thresholds.M && ['MM', months] || years <= 1 && ['y'] || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof roundingFunction === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize(withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days = abs$1(this._days);
        var months = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes = absFloor(seconds / 60);
        hours = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds;
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') + 'P' + (Y ? Y + 'Y' : '') + (M ? M + 'M' : '') + (D ? D + 'D' : '') + (h || m || s ? 'T' : '') + (h ? h + 'H' : '') + (m ? m + 'M' : '') + (s ? s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds;
    proto$2.seconds = seconds;
    proto$2.minutes = minutes;
    proto$2.hours = hours;
    proto$2.days = days;
    proto$2.weeks = weeks;
    proto$2.months = months;
    proto$2.years = years;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale;
    proto$2.localeData = localeData;

    // Deprecations
    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    hooks.version = '2.18.1';

    setHookCallback(createLocal);

    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;

    return hooks;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(163)(module)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _h = __webpack_require__(131);

Object.defineProperty(exports, "h", {
  enumerable: true,
  get: function get() {
    return _h.h;
  }
});

var _app = __webpack_require__(132);

Object.defineProperty(exports, "app", {
  enumerable: true,
  get: function get() {
    return _app.app;
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.request = undefined;

var _config = __webpack_require__(134);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var queryParams = function queryParams(params) {
    var esc = encodeURIComponent;
    return Object.keys(params).map(function (k) {
        return esc(k) + "=" + esc(params[k]);
    }).join("&");
};

var request = exports.request = function request() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var url = _config2.default.endpoint;
    options = Object.assign({
        credentials: "same-origin",
        redirect: "error"
    }, options);
    if (options.queryParams) {
        if (options.method == "POST") {
            options.headers = {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            };

            options.body = getFormData(options.queryParams);
        } else {
            url += (url.indexOf("?") === -1 ? "?" : "&") + queryParams(options.queryParams);
        }
        delete options.queryParams;
    }
    return fetch(url, options).then(function (data) {
        return data.json();
    });
};

var getFormData = function getFormData(params) {
    return Object.keys(params).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    }).join("&");
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

var _LinkItem = __webpack_require__(6);

var _LinkItem2 = _interopRequireDefault(_LinkItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Links = function Links(props) {
    var items = props.tab.data.rows.map(function (item, i) {
        return (0, _hyperapp.h)(_LinkItem2.default, {
            key: i,
            actions: props.actions,
            user_id: props.state.user.data.id,
            item: item
        });
    });
    return (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
            "div",
            {
                model: props.model,
                "class": "scroll",
                onscroll: function onscroll(e) {
                    return props.actions.onScroll({
                        e: e,
                        callback: props.loadMore
                    });
                }
            },
            items
        )
    );
};

exports.default = Links;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TabComponent = undefined;

var _hyperapp = __webpack_require__(1);

var TabComponent = exports.TabComponent = function TabComponent(_ref) {
    var type = _ref.type,
        state = _ref.state,
        stateKey = _ref.stateKey,
        classes = _ref.classes,
        onChange = _ref.onChange,
        html = _ref.html,
        onBeforeLabelSet = _ref.onBeforeLabelSet;

    return (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
            "ul",
            { "class": "nav " + type + " " + classes },
            Object.keys(state[stateKey].tabs).map(function (tab_id) {
                var tab = state[stateKey].tabs[tab_id];
                if (tab.authorized && !localStorage.loggedIn) {
                    return false;
                }
                var active = state[stateKey].active == tab_id ? "active" : "";
                var label = tab.name;
                if (typeof onBeforeLabelSet == "function") {
                    label = onBeforeLabelSet(label);
                }
                return (0, _hyperapp.h)(
                    "li",
                    { "class": active },
                    (0, _hyperapp.h)(
                        "a",
                        {
                            href: "#",
                            onclick: function onclick(e) {
                                return onChange({ stateKey: stateKey, tab_id: tab_id });
                            }
                        },
                        label
                    ),
                    (0, _hyperapp.h)("span", { "class": "short-border" })
                );
            })
        ),
        (0, _hyperapp.h)(
            "div",
            {
                "class": "tab-content " + classes + " " + state[stateKey].active
            },
            (0, _hyperapp.h)(
                "div",
                { "class": "tab-pane fade active in" },
                html
            )
        )
    );
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _hyperapp = __webpack_require__(1);

var ScrollHoc = function ScrollHoc(Component) {
    return function (props) {
        var onScroll = function onScroll(e) {
            props.onScroll({
                e: e,
                callback: props.loadMore
            });
        };

        return (0, _hyperapp.h)(Component, _extends({}, props, { onScroll: onScroll }));
    };
};

exports.default = ScrollHoc;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hyperapp = __webpack_require__(1);

var _Comments = __webpack_require__(146);

var _Comments2 = _interopRequireDefault(_Comments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkItem = function LinkItem(_ref) {
    var item = _ref.item,
        user_id = _ref.user_id,
        actions = _ref.actions,
        key = _ref.key;
    return (0, _hyperapp.h)(
        "div",
        { "class": "left clearfix item" },
        (0, _hyperapp.h)(
            "span",
            { "class": "items-img pull-left" },
            (0, _hyperapp.h)("span", {
                "class": "favourite fa fa-" + (item.favourite == "1" ? "star" : "star-o"),
                onclick: function onclick(e) {
                    return actions.handleFavourite({ e: e, key: key });
                }
            }),
            (0, _hyperapp.h)("img", {
                width: "60",
                oncreate: function oncreate(e) {
                    return actions.lazyLoad({ e: e, image: item.thumbnail });
                },
                src: "../../public/images/default.png"
            })
        ),
        (0, _hyperapp.h)(
            "div",
            { "class": "items-body clearfix" },
            (0, _hyperapp.h)(
                "div",
                { "class": "header" },
                (0, _hyperapp.h)(
                    "a",
                    {
                        href: "#",
                        "class": "username",
                        onclick: function onclick(e) {
                            return actions.showProfile({ e: e, user_id: item.uid });
                        }
                    },
                    (0, _hyperapp.h)(
                        "strong",
                        {
                            "class": "primary-font",
                            color: item.color,
                            style: { color: item.color }
                        },
                        item.nickname
                    )
                ),
                (0, _hyperapp.h)(
                    "span",
                    { "class": "label label-default" },
                    item.group_name
                ),
                (0, _hyperapp.h)(
                    "small",
                    { "class": "pull-right text-muted" },
                    (0, _hyperapp.h)("i", { "class": "fa fa-clock-o" }),
                    moment(item.created_at).add(moment().utcOffset(), "minutes").fromNow()
                )
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "item-body" },
                (0, _hyperapp.h)(
                    "div",
                    null,
                    (0, _hyperapp.h)(
                        "a",
                        {
                            href: item.url,
                            target: "_blank",
                            "class": "item-link",
                            onclick: function onclick() {
                                return actions.itemClicked({ e: e, key: key });
                            }
                        },
                        item.title
                    )
                ),
                (0, _hyperapp.h)(
                    "div",
                    null,
                    (0, _hyperapp.h)(
                        "span",
                        { "class": "item-comments" },
                        item.comments
                    )
                ),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "action-items" },
                    (0, _hyperapp.h)(
                        "a",
                        {
                            href: "#",
                            "class": "grey likes-item action-links",
                            onclick: function onclick(e) {
                                return actions.handleLike({ e: e, key: key });
                            }
                        },
                        (0, _hyperapp.h)("i", {
                            "class": "fa fa-" + (item.liked == 1 ? "heart" : "heart-o"),
                            "aria-hidden": "true"
                        }),
                        (0, _hyperapp.h)(
                            "span",
                            { "class": "term likes" },
                            " ",
                            item.likes_count
                        )
                    ),
                    (0, _hyperapp.h)(
                        "a",
                        {
                            href: "#",
                            "class": "grey comments-item action-links",
                            onclick: function onclick(e) {
                                return actions.showComments({ e: e, key: key });
                            }
                        },
                        (0, _hyperapp.h)("i", {
                            "class": "fa fa-" + (item.comments_count > 0 ? "comment" : "comment-o"),
                            "aria-hidden": "true"
                        }),
                        (0, _hyperapp.h)(
                            "span",
                            { "class": "term" },
                            " ",
                            item.comments_count
                        )
                    ),
                    (0, _hyperapp.h)(
                        "a",
                        {
                            href: "#",
                            "class": "grey forward-item action-links",
                            onclick: function onclick(e) {
                                return actions.handleShare({ e: e, key: key });
                            }
                        },
                        (0, _hyperapp.h)("i", { "class": "fa fa-share", "aria-hidden": "true" })
                    ),
                    (0, _hyperapp.h)(
                        "a",
                        { "class": "grey action-links" },
                        (0, _hyperapp.h)("i", { "class": "fa fa-eye", "aria-hidden": "true" }),
                        (0, _hyperapp.h)(
                            "span",
                            { "class": "term" },
                            item.times_clicked
                        )
                    ),
                    item.uid == user_id && (0, _hyperapp.h)(
                        "a",
                        {
                            href: "#",
                            "class": "delete-item grey action-links",
                            onclick: function onclick(e) {
                                return actions.handleDelete({ e: e, key: key });
                            }
                        },
                        (0, _hyperapp.h)("i", { "class": "fa fa-trash", "aria-hidden": "true" })
                    )
                ),
                item.showComments && (0, _hyperapp.h)(
                    "div",
                    { "class": "comments-section" },
                    (0, _hyperapp.h)(
                        "div",
                        { "class": "comment-wrapper" },
                        (0, _hyperapp.h)("input", {
                            placeholder: "Comment here..",
                            "class": "form-control comment-input",
                            maxlength: "140",
                            type: "text",
                            onkeypress: function onkeypress(e) {
                                return actions.handleCommentInput({ e: e, key: key });
                            }
                        })
                    ),
                    (0, _hyperapp.h)(_Comments2.default, {
                        actions: actions,
                        key: key,
                        data: item.commentList
                    })
                )
            )
        )
    );
};

module.exports = LinkItem;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

var DropDown = function DropDown(_ref) {
    var data = _ref.data,
        selected = _ref.selected,
        onChange = _ref.onChange,
        _ref$classes = _ref.classes,
        classes = _ref$classes === undefined ? "" : _ref$classes,
        identifier = _ref.identifier;

    var options = data.map(function (item) {
        if (selected == item.group_id) {
            return (0, _hyperapp.h)(
                "option",
                { selected: "selected", value: item[identifier] },
                item.name
            );
        }
        return (0, _hyperapp.h)(
            "option",
            { value: item[identifier] },
            item.name
        );
    });

    return (0, _hyperapp.h)(
        "select",
        { "class": classes, onchange: onChange },
        options
    );
};

exports.default = DropDown;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

var ModalHoc = function ModalHoc(Component) {
    return function (props) {
        return (0, _hyperapp.h)(
            "div",
            {
                "class": "modal fade in",
                tabindex: "-1",
                role: "dialog",
                style: { display: "block" }
            },
            (0, _hyperapp.h)(
                "div",
                { "class": "modal-dialog", role: "document" },
                (0, _hyperapp.h)(
                    "div",
                    { "class": "modal-content" },
                    (0, _hyperapp.h)(
                        "div",
                        { "class": "modal-header" },
                        (0, _hyperapp.h)(
                            "button",
                            {
                                type: "button",
                                "class": "close",
                                onclick: function onclick() {
                                    return props.actions.closeModal(props.name);
                                }
                            },
                            (0, _hyperapp.h)(
                                "span",
                                { "aria-hidden": "true" },
                                "\xD7"
                            )
                        ),
                        (0, _hyperapp.h)(
                            "h4",
                            { "class": "modal-title" },
                            "Modal title"
                        )
                    ),
                    (0, _hyperapp.h)(
                        "div",
                        { "class": "modal-body" },
                        (0, _hyperapp.h)(
                            "p",
                            null,
                            (0, _hyperapp.h)(Component, props)
                        )
                    )
                )
            )
        );
    };
};

exports.default = ModalHoc;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Radio = undefined;

var _hyperapp = __webpack_require__(1);

var Radio = exports.Radio = function Radio(_ref) {
    var type = _ref.type,
        classes = _ref.classes,
        value = _ref.value,
        checked = _ref.checked,
        name = _ref.name,
        onclick = _ref.onclick;

    var props = {
        class: classes,
        type: type,
        value: value,
        name: name,
        onclick: onclick
    };
    if (checked) {
        props.checked = true;
    }
    return (0, _hyperapp.h)("input", props);
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.unescape = exports.escape = exports.deepFind = exports.setVersion = exports.closeModal = exports.onScroll = exports.navClicked = undefined;

var _request = __webpack_require__(2);

var navClicked = exports.navClicked = function navClicked(state, actions, data) {
    var id = data.currentTarget.dataset.id;
    state.nav.main.active = id;
    return state;
};

var onScroll = exports.onScroll = function onScroll(state, actions, _ref) {
    var e = _ref.e,
        callback = _ref.callback;

    var ele = e.currentTarget;
    var height = ele.clientHeight;
    var scroll_top = ele.scrollTop;
    var scrollHeight = ele.scrollHeight;

    if (scroll_top + height >= scrollHeight) {
        if (typeof callback == "function") callback(e);
    }
    e.stopPropagation();
    e.preventDefault();
    return false;
};

var closeModal = exports.closeModal = function closeModal(state, actions, name) {
    state.modals[name].open = false;
    return state;
};

var setVersion = exports.setVersion = function setVersion(state, actions, version) {
    state.version = version;
    return state;
};

var deepFind = exports.deepFind = function deepFind(obj, path) {
    for (var i = 0, path = path.split("."), len = path.length; i < len; i++) {
        obj = obj[path[i]];
    }
    return obj;
};

var basePropertyOf = function basePropertyOf(object) {
    return function (key) {
        return object == null ? undefined : object[key];
    };
};

var escape = exports.escape = function escape(str) {
    /** Used to map characters to HTML entities. */
    var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    };

    var escapeHtmlChar = basePropertyOf(htmlEscapes);
    var reUnescapedHtml = /[&<>"']/g;
    return str.replace(reUnescapedHtml, escapeHtmlChar);
};

var unescape = exports.unescape = function unescape(str) {
    /** Used to map HTML entities to characters. */
    var htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
    };
    var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g;
    return str.replace(reEscapedHtml, unescapeHtmlChar);
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Afrikaans [af]
//! author : Werner Mollentze : https://github.com/wernerm

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var af = moment.defineLocale('af', {
        months: 'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split('_'),
        monthsShort: 'Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
        weekdays: 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
        weekdaysShort: 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
        weekdaysMin: 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
        meridiemParse: /vm|nm/i,
        isPM: function isPM(input) {
            return (/^nm$/i.test(input)
            );
        },
        meridiem: function meridiem(hours, minutes, isLower) {
            if (hours < 12) {
                return isLower ? 'vm' : 'VM';
            } else {
                return isLower ? 'nm' : 'NM';
            }
        },
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Vandag om] LT',
            nextDay: '[Môre om] LT',
            nextWeek: 'dddd [om] LT',
            lastDay: '[Gister om] LT',
            lastWeek: '[Laas] dddd [om] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'oor %s',
            past: '%s gelede',
            s: '\'n paar sekondes',
            m: '\'n minuut',
            mm: '%d minute',
            h: '\'n uur',
            hh: '%d ure',
            d: '\'n dag',
            dd: '%d dae',
            M: '\'n maand',
            MM: '%d maande',
            y: '\'n jaar',
            yy: '%d jaar'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal: function ordinal(number) {
            return number + (number === 1 || number === 8 || number >= 20 ? 'ste' : 'de'); // Thanks to Joris Röling : https://github.com/jjupiter
        },
        week: {
            dow: 1, // Maandag is die eerste dag van die week.
            doy: 4 // Die week wat die 4de Januarie bevat is die eerste week van die jaar.
        }
    });

    return af;
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Arabic [ar]
//! author : Abdel Said: https://github.com/abdelsaid
//! author : Ahmed Elkhatib
//! author : forabi https://github.com/forabi

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '١',
        '2': '٢',
        '3': '٣',
        '4': '٤',
        '5': '٥',
        '6': '٦',
        '7': '٧',
        '8': '٨',
        '9': '٩',
        '0': '٠'
    };
    var numberMap = {
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9',
        '٠': '0'
    };
    var pluralForm = function pluralForm(n) {
        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
    };
    var plurals = {
        s: ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
        m: ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
        h: ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
        d: ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
        M: ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
        y: ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
    };
    var pluralize = function pluralize(u) {
        return function (number, withoutSuffix, string, isFuture) {
            var f = pluralForm(number),
                str = plurals[u][pluralForm(number)];
            if (f === 2) {
                str = str[withoutSuffix ? 0 : 1];
            }
            return str.replace(/%d/i, number);
        };
    };
    var months = ['كانون الثاني يناير', 'شباط فبراير', 'آذار مارس', 'نيسان أبريل', 'أيار مايو', 'حزيران يونيو', 'تموز يوليو', 'آب أغسطس', 'أيلول سبتمبر', 'تشرين الأول أكتوبر', 'تشرين الثاني نوفمبر', 'كانون الأول ديسمبر'];

    var ar = moment.defineLocale('ar', {
        months: months,
        monthsShort: months,
        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'D/\u200FM/\u200FYYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /ص|م/,
        isPM: function isPM(input) {
            return 'م' === input;
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 12) {
                return 'ص';
            } else {
                return 'م';
            }
        },
        calendar: {
            sameDay: '[اليوم عند الساعة] LT',
            nextDay: '[غدًا عند الساعة] LT',
            nextWeek: 'dddd [عند الساعة] LT',
            lastDay: '[أمس عند الساعة] LT',
            lastWeek: 'dddd [عند الساعة] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'بعد %s',
            past: 'منذ %s',
            s: pluralize('s'),
            m: pluralize('m'),
            mm: pluralize('m'),
            h: pluralize('h'),
            hh: pluralize('h'),
            d: pluralize('d'),
            dd: pluralize('d'),
            M: pluralize('M'),
            MM: pluralize('M'),
            y: pluralize('y'),
            yy: pluralize('y')
        },
        preparse: function preparse(string) {
            return string.replace(/\u200f/g, '').replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
                return numberMap[match];
            }).replace(/،/g, ',');
        },
        postformat: function postformat(string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            }).replace(/,/g, '،');
        },
        week: {
            dow: 6, // Saturday is the first day of the week.
            doy: 12 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ar;
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Arabic (Algeria) [ar-dz]
//! author : Noureddine LOUAHEDJ : https://github.com/noureddineme

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var arDz = moment.defineLocale('ar-dz', {
        months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort: 'احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin: 'أح_إث_ثلا_أر_خم_جم_سب'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[اليوم على الساعة] LT',
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'في %s',
            past: 'منذ %s',
            s: 'ثوان',
            m: 'دقيقة',
            mm: '%d دقائق',
            h: 'ساعة',
            hh: '%d ساعات',
            d: 'يوم',
            dd: '%d أيام',
            M: 'شهر',
            MM: '%d أشهر',
            y: 'سنة',
            yy: '%d سنوات'
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 4 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return arDz;
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Arabic (Kuwait) [ar-kw]
//! author : Nusret Parlak: https://github.com/nusretparlak

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var arKw = moment.defineLocale('ar-kw', {
        months: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
        monthsShort: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
        weekdays: 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort: 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[اليوم على الساعة] LT',
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'في %s',
            past: 'منذ %s',
            s: 'ثوان',
            m: 'دقيقة',
            mm: '%d دقائق',
            h: 'ساعة',
            hh: '%d ساعات',
            d: 'يوم',
            dd: '%d أيام',
            M: 'شهر',
            MM: '%d أشهر',
            y: 'سنة',
            yy: '%d سنوات'
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 12 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return arKw;
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Arabic (Lybia) [ar-ly]
//! author : Ali Hmer: https://github.com/kikoanis

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '0': '0'
    };
    var pluralForm = function pluralForm(n) {
        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
    };
    var plurals = {
        s: ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
        m: ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
        h: ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
        d: ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
        M: ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
        y: ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
    };
    var pluralize = function pluralize(u) {
        return function (number, withoutSuffix, string, isFuture) {
            var f = pluralForm(number),
                str = plurals[u][pluralForm(number)];
            if (f === 2) {
                str = str[withoutSuffix ? 0 : 1];
            }
            return str.replace(/%d/i, number);
        };
    };
    var months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

    var arLy = moment.defineLocale('ar-ly', {
        months: months,
        monthsShort: months,
        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'D/\u200FM/\u200FYYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /ص|م/,
        isPM: function isPM(input) {
            return 'م' === input;
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 12) {
                return 'ص';
            } else {
                return 'م';
            }
        },
        calendar: {
            sameDay: '[اليوم عند الساعة] LT',
            nextDay: '[غدًا عند الساعة] LT',
            nextWeek: 'dddd [عند الساعة] LT',
            lastDay: '[أمس عند الساعة] LT',
            lastWeek: 'dddd [عند الساعة] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'بعد %s',
            past: 'منذ %s',
            s: pluralize('s'),
            m: pluralize('m'),
            mm: pluralize('m'),
            h: pluralize('h'),
            hh: pluralize('h'),
            d: pluralize('d'),
            dd: pluralize('d'),
            M: pluralize('M'),
            MM: pluralize('M'),
            y: pluralize('y'),
            yy: pluralize('y')
        },
        preparse: function preparse(string) {
            return string.replace(/\u200f/g, '').replace(/،/g, ',');
        },
        postformat: function postformat(string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            }).replace(/,/g, '،');
        },
        week: {
            dow: 6, // Saturday is the first day of the week.
            doy: 12 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return arLy;
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Arabic (Morocco) [ar-ma]
//! author : ElFadili Yassine : https://github.com/ElFadiliY
//! author : Abdel Said : https://github.com/abdelsaid

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var arMa = moment.defineLocale('ar-ma', {
        months: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
        monthsShort: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
        weekdays: 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort: 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[اليوم على الساعة] LT',
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'في %s',
            past: 'منذ %s',
            s: 'ثوان',
            m: 'دقيقة',
            mm: '%d دقائق',
            h: 'ساعة',
            hh: '%d ساعات',
            d: 'يوم',
            dd: '%d أيام',
            M: 'شهر',
            MM: '%d أشهر',
            y: 'سنة',
            yy: '%d سنوات'
        },
        week: {
            dow: 6, // Saturday is the first day of the week.
            doy: 12 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return arMa;
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Arabic (Saudi Arabia) [ar-sa]
//! author : Suhail Alkowaileet : https://github.com/xsoh

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '١',
        '2': '٢',
        '3': '٣',
        '4': '٤',
        '5': '٥',
        '6': '٦',
        '7': '٧',
        '8': '٨',
        '9': '٩',
        '0': '٠'
    };
    var numberMap = {
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9',
        '٠': '0'
    };

    var arSa = moment.defineLocale('ar-sa', {
        months: 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        monthsShort: 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /ص|م/,
        isPM: function isPM(input) {
            return 'م' === input;
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 12) {
                return 'ص';
            } else {
                return 'م';
            }
        },
        calendar: {
            sameDay: '[اليوم على الساعة] LT',
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'في %s',
            past: 'منذ %s',
            s: 'ثوان',
            m: 'دقيقة',
            mm: '%d دقائق',
            h: 'ساعة',
            hh: '%d ساعات',
            d: 'يوم',
            dd: '%d أيام',
            M: 'شهر',
            MM: '%d أشهر',
            y: 'سنة',
            yy: '%d سنوات'
        },
        preparse: function preparse(string) {
            return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
                return numberMap[match];
            }).replace(/،/g, ',');
        },
        postformat: function postformat(string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            }).replace(/,/g, '،');
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return arSa;
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale  :  Arabic (Tunisia) [ar-tn]
//! author : Nader Toukabri : https://github.com/naderio

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var arTn = moment.defineLocale('ar-tn', {
        months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[اليوم على الساعة] LT',
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'في %s',
            past: 'منذ %s',
            s: 'ثوان',
            m: 'دقيقة',
            mm: '%d دقائق',
            h: 'ساعة',
            hh: '%d ساعات',
            d: 'يوم',
            dd: '%d أيام',
            M: 'شهر',
            MM: '%d أشهر',
            y: 'سنة',
            yy: '%d سنوات'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return arTn;
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Azerbaijani [az]
//! author : topchiyev : https://github.com/topchiyev

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var suffixes = {
        1: '-inci',
        5: '-inci',
        8: '-inci',
        70: '-inci',
        80: '-inci',
        2: '-nci',
        7: '-nci',
        20: '-nci',
        50: '-nci',
        3: '-üncü',
        4: '-üncü',
        100: '-üncü',
        6: '-ncı',
        9: '-uncu',
        10: '-uncu',
        30: '-uncu',
        60: '-ıncı',
        90: '-ıncı'
    };

    var az = moment.defineLocale('az', {
        months: 'yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr'.split('_'),
        monthsShort: 'yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek'.split('_'),
        weekdays: 'Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə'.split('_'),
        weekdaysShort: 'Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən'.split('_'),
        weekdaysMin: 'Bz_BE_ÇA_Çə_CA_Cü_Şə'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[bugün saat] LT',
            nextDay: '[sabah saat] LT',
            nextWeek: '[gələn həftə] dddd [saat] LT',
            lastDay: '[dünən] LT',
            lastWeek: '[keçən həftə] dddd [saat] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s sonra',
            past: '%s əvvəl',
            s: 'birneçə saniyyə',
            m: 'bir dəqiqə',
            mm: '%d dəqiqə',
            h: 'bir saat',
            hh: '%d saat',
            d: 'bir gün',
            dd: '%d gün',
            M: 'bir ay',
            MM: '%d ay',
            y: 'bir il',
            yy: '%d il'
        },
        meridiemParse: /gecə|səhər|gündüz|axşam/,
        isPM: function isPM(input) {
            return (/^(gündüz|axşam)$/.test(input)
            );
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 4) {
                return 'gecə';
            } else if (hour < 12) {
                return 'səhər';
            } else if (hour < 17) {
                return 'gündüz';
            } else {
                return 'axşam';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
        ordinal: function ordinal(number) {
            if (number === 0) {
                // special case for zero
                return number + '-ıncı';
            }
            var a = number % 10,
                b = number % 100 - a,
                c = number >= 100 ? 100 : null;
            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return az;
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Belarusian [be]
//! author : Dmitry Demidov : https://github.com/demidov91
//! author: Praleska: http://praleska.pro/
//! Author : Menelion Elensúle : https://github.com/Oire

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    function plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
    }
    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'mm': withoutSuffix ? 'хвіліна_хвіліны_хвілін' : 'хвіліну_хвіліны_хвілін',
            'hh': withoutSuffix ? 'гадзіна_гадзіны_гадзін' : 'гадзіну_гадзіны_гадзін',
            'dd': 'дзень_дні_дзён',
            'MM': 'месяц_месяцы_месяцаў',
            'yy': 'год_гады_гадоў'
        };
        if (key === 'm') {
            return withoutSuffix ? 'хвіліна' : 'хвіліну';
        } else if (key === 'h') {
            return withoutSuffix ? 'гадзіна' : 'гадзіну';
        } else {
            return number + ' ' + plural(format[key], +number);
        }
    }

    var be = moment.defineLocale('be', {
        months: {
            format: 'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split('_'),
            standalone: 'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split('_')
        },
        monthsShort: 'студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж'.split('_'),
        weekdays: {
            format: 'нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу'.split('_'),
            standalone: 'нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота'.split('_'),
            isFormat: /\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/
        },
        weekdaysShort: 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
        weekdaysMin: 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY г.',
            LLL: 'D MMMM YYYY г., HH:mm',
            LLLL: 'dddd, D MMMM YYYY г., HH:mm'
        },
        calendar: {
            sameDay: '[Сёння ў] LT',
            nextDay: '[Заўтра ў] LT',
            lastDay: '[Учора ў] LT',
            nextWeek: function nextWeek() {
                return '[У] dddd [ў] LT';
            },
            lastWeek: function lastWeek() {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 5:
                    case 6:
                        return '[У мінулую] dddd [ў] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[У мінулы] dddd [ў] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'праз %s',
            past: '%s таму',
            s: 'некалькі секунд',
            m: relativeTimeWithPlural,
            mm: relativeTimeWithPlural,
            h: relativeTimeWithPlural,
            hh: relativeTimeWithPlural,
            d: 'дзень',
            dd: relativeTimeWithPlural,
            M: 'месяц',
            MM: relativeTimeWithPlural,
            y: 'год',
            yy: relativeTimeWithPlural
        },
        meridiemParse: /ночы|раніцы|дня|вечара/,
        isPM: function isPM(input) {
            return (/^(дня|вечара)$/.test(input)
            );
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 4) {
                return 'ночы';
            } else if (hour < 12) {
                return 'раніцы';
            } else if (hour < 17) {
                return 'дня';
            } else {
                return 'вечара';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(і|ы|га)/,
        ordinal: function ordinal(number, period) {
            switch (period) {
                case 'M':
                case 'd':
                case 'DDD':
                case 'w':
                case 'W':
                    return (number % 10 === 2 || number % 10 === 3) && number % 100 !== 12 && number % 100 !== 13 ? number + '-і' : number + '-ы';
                case 'D':
                    return number + '-га';
                default:
                    return number;
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return be;
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Bulgarian [bg]
//! author : Krasen Borisov : https://github.com/kraz

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var bg = moment.defineLocale('bg', {
        months: 'януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември'.split('_'),
        monthsShort: 'янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек'.split('_'),
        weekdays: 'неделя_понеделник_вторник_сряда_четвъртък_петък_събота'.split('_'),
        weekdaysShort: 'нед_пон_вто_сря_чет_пет_съб'.split('_'),
        weekdaysMin: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'D.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY H:mm',
            LLLL: 'dddd, D MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[Днес в] LT',
            nextDay: '[Утре в] LT',
            nextWeek: 'dddd [в] LT',
            lastDay: '[Вчера в] LT',
            lastWeek: function lastWeek() {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 6:
                        return '[В изминалата] dddd [в] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[В изминалия] dddd [в] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'след %s',
            past: 'преди %s',
            s: 'няколко секунди',
            m: 'минута',
            mm: '%d минути',
            h: 'час',
            hh: '%d часа',
            d: 'ден',
            dd: '%d дни',
            M: 'месец',
            MM: '%d месеца',
            y: 'година',
            yy: '%d години'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
        ordinal: function ordinal(number) {
            var lastDigit = number % 10,
                last2Digits = number % 100;
            if (number === 0) {
                return number + '-ев';
            } else if (last2Digits === 0) {
                return number + '-ен';
            } else if (last2Digits > 10 && last2Digits < 20) {
                return number + '-ти';
            } else if (lastDigit === 1) {
                return number + '-ви';
            } else if (lastDigit === 2) {
                return number + '-ри';
            } else if (lastDigit === 7 || lastDigit === 8) {
                return number + '-ми';
            } else {
                return number + '-ти';
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return bg;
});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Bengali [bn]
//! author : Kaushik Gandhi : https://github.com/kaushikgandhi

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '১',
        '2': '২',
        '3': '৩',
        '4': '৪',
        '5': '৫',
        '6': '৬',
        '7': '৭',
        '8': '৮',
        '9': '৯',
        '0': '০'
    };
    var numberMap = {
        '১': '1',
        '২': '2',
        '৩': '3',
        '৪': '4',
        '৫': '5',
        '৬': '6',
        '৭': '7',
        '৮': '8',
        '৯': '9',
        '০': '0'
    };

    var bn = moment.defineLocale('bn', {
        months: 'জানুয়ারী_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split('_'),
        monthsShort: 'জানু_ফেব_মার্চ_এপ্র_মে_জুন_জুল_আগ_সেপ্ট_অক্টো_নভে_ডিসে'.split('_'),
        weekdays: 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার'.split('_'),
        weekdaysShort: 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি'.split('_'),
        weekdaysMin: 'রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি'.split('_'),
        longDateFormat: {
            LT: 'A h:mm সময়',
            LTS: 'A h:mm:ss সময়',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, A h:mm সময়',
            LLLL: 'dddd, D MMMM YYYY, A h:mm সময়'
        },
        calendar: {
            sameDay: '[আজ] LT',
            nextDay: '[আগামীকাল] LT',
            nextWeek: 'dddd, LT',
            lastDay: '[গতকাল] LT',
            lastWeek: '[গত] dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s পরে',
            past: '%s আগে',
            s: 'কয়েক সেকেন্ড',
            m: 'এক মিনিট',
            mm: '%d মিনিট',
            h: 'এক ঘন্টা',
            hh: '%d ঘন্টা',
            d: 'এক দিন',
            dd: '%d দিন',
            M: 'এক মাস',
            MM: '%d মাস',
            y: 'এক বছর',
            yy: '%d বছর'
        },
        preparse: function preparse(string) {
            return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function postformat(string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
        meridiemHour: function meridiemHour(hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'রাত' && hour >= 4 || meridiem === 'দুপুর' && hour < 5 || meridiem === 'বিকাল') {
                return hour + 12;
            } else {
                return hour;
            }
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 4) {
                return 'রাত';
            } else if (hour < 10) {
                return 'সকাল';
            } else if (hour < 17) {
                return 'দুপুর';
            } else if (hour < 20) {
                return 'বিকাল';
            } else {
                return 'রাত';
            }
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return bn;
});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Tibetan [bo]
//! author : Thupten N. Chakrishar : https://github.com/vajradog

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '༡',
        '2': '༢',
        '3': '༣',
        '4': '༤',
        '5': '༥',
        '6': '༦',
        '7': '༧',
        '8': '༨',
        '9': '༩',
        '0': '༠'
    };
    var numberMap = {
        '༡': '1',
        '༢': '2',
        '༣': '3',
        '༤': '4',
        '༥': '5',
        '༦': '6',
        '༧': '7',
        '༨': '8',
        '༩': '9',
        '༠': '0'
    };

    var bo = moment.defineLocale('bo', {
        months: 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
        monthsShort: 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
        weekdays: 'གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་'.split('_'),
        weekdaysShort: 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
        weekdaysMin: 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
        longDateFormat: {
            LT: 'A h:mm',
            LTS: 'A h:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, A h:mm',
            LLLL: 'dddd, D MMMM YYYY, A h:mm'
        },
        calendar: {
            sameDay: '[དི་རིང] LT',
            nextDay: '[སང་ཉིན] LT',
            nextWeek: '[བདུན་ཕྲག་རྗེས་མ], LT',
            lastDay: '[ཁ་སང] LT',
            lastWeek: '[བདུན་ཕྲག་མཐའ་མ] dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s ལ་',
            past: '%s སྔན་ལ',
            s: 'ལམ་སང',
            m: 'སྐར་མ་གཅིག',
            mm: '%d སྐར་མ',
            h: 'ཆུ་ཚོད་གཅིག',
            hh: '%d ཆུ་ཚོད',
            d: 'ཉིན་གཅིག',
            dd: '%d ཉིན་',
            M: 'ཟླ་བ་གཅིག',
            MM: '%d ཟླ་བ',
            y: 'ལོ་གཅིག',
            yy: '%d ལོ'
        },
        preparse: function preparse(string) {
            return string.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function postformat(string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
        meridiemHour: function meridiemHour(hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'མཚན་མོ' && hour >= 4 || meridiem === 'ཉིན་གུང' && hour < 5 || meridiem === 'དགོང་དག') {
                return hour + 12;
            } else {
                return hour;
            }
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 4) {
                return 'མཚན་མོ';
            } else if (hour < 10) {
                return 'ཞོགས་ཀས';
            } else if (hour < 17) {
                return 'ཉིན་གུང';
            } else if (hour < 20) {
                return 'དགོང་དག';
            } else {
                return 'མཚན་མོ';
            }
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return bo;
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Breton [br]
//! author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    function relativeTimeWithMutation(number, withoutSuffix, key) {
        var format = {
            'mm': 'munutenn',
            'MM': 'miz',
            'dd': 'devezh'
        };
        return number + ' ' + mutation(format[key], number);
    }
    function specialMutationForYears(number) {
        switch (lastNumber(number)) {
            case 1:
            case 3:
            case 4:
            case 5:
            case 9:
                return number + ' bloaz';
            default:
                return number + ' vloaz';
        }
    }
    function lastNumber(number) {
        if (number > 9) {
            return lastNumber(number % 10);
        }
        return number;
    }
    function mutation(text, number) {
        if (number === 2) {
            return softMutation(text);
        }
        return text;
    }
    function softMutation(text) {
        var mutationTable = {
            'm': 'v',
            'b': 'v',
            'd': 'z'
        };
        if (mutationTable[text.charAt(0)] === undefined) {
            return text;
        }
        return mutationTable[text.charAt(0)] + text.substring(1);
    }

    var br = moment.defineLocale('br', {
        months: 'Genver_C\'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split('_'),
        monthsShort: 'Gen_C\'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split('_'),
        weekdays: 'Sul_Lun_Meurzh_Merc\'her_Yaou_Gwener_Sadorn'.split('_'),
        weekdaysShort: 'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split('_'),
        weekdaysMin: 'Su_Lu_Me_Mer_Ya_Gw_Sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'h[e]mm A',
            LTS: 'h[e]mm:ss A',
            L: 'DD/MM/YYYY',
            LL: 'D [a viz] MMMM YYYY',
            LLL: 'D [a viz] MMMM YYYY h[e]mm A',
            LLLL: 'dddd, D [a viz] MMMM YYYY h[e]mm A'
        },
        calendar: {
            sameDay: '[Hiziv da] LT',
            nextDay: '[Warc\'hoazh da] LT',
            nextWeek: 'dddd [da] LT',
            lastDay: '[Dec\'h da] LT',
            lastWeek: 'dddd [paset da] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'a-benn %s',
            past: '%s \'zo',
            s: 'un nebeud segondennoù',
            m: 'ur vunutenn',
            mm: relativeTimeWithMutation,
            h: 'un eur',
            hh: '%d eur',
            d: 'un devezh',
            dd: relativeTimeWithMutation,
            M: 'ur miz',
            MM: relativeTimeWithMutation,
            y: 'ur bloaz',
            yy: specialMutationForYears
        },
        dayOfMonthOrdinalParse: /\d{1,2}(añ|vet)/,
        ordinal: function ordinal(number) {
            var output = number === 1 ? 'añ' : 'vet';
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return br;
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Bosnian [bs]
//! author : Nedim Cholich : https://github.com/frontyard
//! based on (hr) translation by Bojan Marković

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    function translate(number, withoutSuffix, key) {
        var result = number + ' ';
        switch (key) {
            case 'm':
                return withoutSuffix ? 'jedna minuta' : 'jedne minute';
            case 'mm':
                if (number === 1) {
                    result += 'minuta';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'minute';
                } else {
                    result += 'minuta';
                }
                return result;
            case 'h':
                return withoutSuffix ? 'jedan sat' : 'jednog sata';
            case 'hh':
                if (number === 1) {
                    result += 'sat';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'sata';
                } else {
                    result += 'sati';
                }
                return result;
            case 'dd':
                if (number === 1) {
                    result += 'dan';
                } else {
                    result += 'dana';
                }
                return result;
            case 'MM':
                if (number === 1) {
                    result += 'mjesec';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'mjeseca';
                } else {
                    result += 'mjeseci';
                }
                return result;
            case 'yy':
                if (number === 1) {
                    result += 'godina';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'godine';
                } else {
                    result += 'godina';
                }
                return result;
        }
    }

    var bs = moment.defineLocale('bs', {
        months: 'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split('_'),
        monthsShort: 'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
        weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[danas u] LT',
            nextDay: '[sutra u] LT',
            nextWeek: function nextWeek() {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedjelju] [u] LT';
                    case 3:
                        return '[u] [srijedu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay: '[jučer u] LT',
            lastWeek: function lastWeek() {
                switch (this.day()) {
                    case 0:
                    case 3:
                        return '[prošlu] dddd [u] LT';
                    case 6:
                        return '[prošle] [subote] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[prošli] dddd [u] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'za %s',
            past: 'prije %s',
            s: 'par sekundi',
            m: translate,
            mm: translate,
            h: translate,
            hh: translate,
            d: 'dan',
            dd: translate,
            M: 'mjesec',
            MM: translate,
            y: 'godinu',
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return bs;
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Catalan [ca]
//! author : Juan G. Hurtado : https://github.com/juanghurtado

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var ca = moment.defineLocale('ca', {
        months: {
            standalone: 'gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
            format: 'de gener_de febrer_de març_d\'abril_de maig_de juny_de juliol_d\'agost_de setembre_d\'octubre_de novembre_de desembre'.split('_'),
            isFormat: /D[oD]?(\s)+MMMM/
        },
        monthsShort: 'gen._febr._març_abr._maig_juny_jul._ag._set._oct._nov._des.'.split('_'),
        monthsParseExact: true,
        weekdays: 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
        weekdaysShort: 'dg._dl._dt._dc._dj._dv._ds.'.split('_'),
        weekdaysMin: 'Dg_Dl_Dt_Dc_Dj_Dv_Ds'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD/MM/YYYY',
            LL: '[el] D MMMM [de] YYYY',
            ll: 'D MMM YYYY',
            LLL: '[el] D MMMM [de] YYYY [a les] H:mm',
            lll: 'D MMM YYYY, H:mm',
            LLLL: '[el] dddd D MMMM [de] YYYY [a les] H:mm',
            llll: 'ddd D MMM YYYY, H:mm'
        },
        calendar: {
            sameDay: function sameDay() {
                return '[avui a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
            },
            nextDay: function nextDay() {
                return '[demà a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
            },
            nextWeek: function nextWeek() {
                return 'dddd [a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
            },
            lastDay: function lastDay() {
                return '[ahir a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
            },
            lastWeek: function lastWeek() {
                return '[el] dddd [passat a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'd\'aquí %s',
            past: 'fa %s',
            s: 'uns segons',
            m: 'un minut',
            mm: '%d minuts',
            h: 'una hora',
            hh: '%d hores',
            d: 'un dia',
            dd: '%d dies',
            M: 'un mes',
            MM: '%d mesos',
            y: 'un any',
            yy: '%d anys'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|è|a)/,
        ordinal: function ordinal(number, period) {
            var output = number === 1 ? 'r' : number === 2 ? 'n' : number === 3 ? 'r' : number === 4 ? 't' : 'è';
            if (period === 'w' || period === 'W') {
                output = 'a';
            }
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return ca;
});

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Czech [cs]
//! author : petrbela : https://github.com/petrbela

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var months = 'leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec'.split('_');
    var monthsShort = 'led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro'.split('_');
    function plural(n) {
        return n > 1 && n < 5 && ~~(n / 10) !== 1;
    }
    function translate(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':
                // a few seconds / in a few seconds / a few seconds ago
                return withoutSuffix || isFuture ? 'pár sekund' : 'pár sekundami';
            case 'm':
                // a minute / in a minute / a minute ago
                return withoutSuffix ? 'minuta' : isFuture ? 'minutu' : 'minutou';
            case 'mm':
                // 9 minutes / in 9 minutes / 9 minutes ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'minuty' : 'minut');
                } else {
                    return result + 'minutami';
                }
                break;
            case 'h':
                // an hour / in an hour / an hour ago
                return withoutSuffix ? 'hodina' : isFuture ? 'hodinu' : 'hodinou';
            case 'hh':
                // 9 hours / in 9 hours / 9 hours ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'hodiny' : 'hodin');
                } else {
                    return result + 'hodinami';
                }
                break;
            case 'd':
                // a day / in a day / a day ago
                return withoutSuffix || isFuture ? 'den' : 'dnem';
            case 'dd':
                // 9 days / in 9 days / 9 days ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'dny' : 'dní');
                } else {
                    return result + 'dny';
                }
                break;
            case 'M':
                // a month / in a month / a month ago
                return withoutSuffix || isFuture ? 'měsíc' : 'měsícem';
            case 'MM':
                // 9 months / in 9 months / 9 months ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'měsíce' : 'měsíců');
                } else {
                    return result + 'měsíci';
                }
                break;
            case 'y':
                // a year / in a year / a year ago
                return withoutSuffix || isFuture ? 'rok' : 'rokem';
            case 'yy':
                // 9 years / in 9 years / 9 years ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'roky' : 'let');
                } else {
                    return result + 'lety';
                }
                break;
        }
    }

    var cs = moment.defineLocale('cs', {
        months: months,
        monthsShort: monthsShort,
        monthsParse: function (months, monthsShort) {
            var i,
                _monthsParse = [];
            for (i = 0; i < 12; i++) {
                // use custom parser to solve problem with July (červenec)
                _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
            }
            return _monthsParse;
        }(months, monthsShort),
        shortMonthsParse: function (monthsShort) {
            var i,
                _shortMonthsParse = [];
            for (i = 0; i < 12; i++) {
                _shortMonthsParse[i] = new RegExp('^' + monthsShort[i] + '$', 'i');
            }
            return _shortMonthsParse;
        }(monthsShort),
        longMonthsParse: function (months) {
            var i,
                _longMonthsParse = [];
            for (i = 0; i < 12; i++) {
                _longMonthsParse[i] = new RegExp('^' + months[i] + '$', 'i');
            }
            return _longMonthsParse;
        }(months),
        weekdays: 'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'.split('_'),
        weekdaysShort: 'ne_po_út_st_čt_pá_so'.split('_'),
        weekdaysMin: 'ne_po_út_st_čt_pá_so'.split('_'),
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd D. MMMM YYYY H:mm',
            l: 'D. M. YYYY'
        },
        calendar: {
            sameDay: '[dnes v] LT',
            nextDay: '[zítra v] LT',
            nextWeek: function nextWeek() {
                switch (this.day()) {
                    case 0:
                        return '[v neděli v] LT';
                    case 1:
                    case 2:
                        return '[v] dddd [v] LT';
                    case 3:
                        return '[ve středu v] LT';
                    case 4:
                        return '[ve čtvrtek v] LT';
                    case 5:
                        return '[v pátek v] LT';
                    case 6:
                        return '[v sobotu v] LT';
                }
            },
            lastDay: '[včera v] LT',
            lastWeek: function lastWeek() {
                switch (this.day()) {
                    case 0:
                        return '[minulou neděli v] LT';
                    case 1:
                    case 2:
                        return '[minulé] dddd [v] LT';
                    case 3:
                        return '[minulou středu v] LT';
                    case 4:
                    case 5:
                        return '[minulý] dddd [v] LT';
                    case 6:
                        return '[minulou sobotu v] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'za %s',
            past: 'před %s',
            s: translate,
            m: translate,
            mm: translate,
            h: translate,
            hh: translate,
            d: translate,
            dd: translate,
            M: translate,
            MM: translate,
            y: translate,
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return cs;
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Chuvash [cv]
//! author : Anatoly Mironov : https://github.com/mirontoli

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var cv = moment.defineLocale('cv', {
        months: 'кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав'.split('_'),
        monthsShort: 'кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш'.split('_'),
        weekdays: 'вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун'.split('_'),
        weekdaysShort: 'выр_тун_ытл_юн_кӗҫ_эрн_шӑм'.split('_'),
        weekdaysMin: 'вр_тн_ыт_юн_кҫ_эр_шм'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD-MM-YYYY',
            LL: 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]',
            LLL: 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
            LLLL: 'dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm'
        },
        calendar: {
            sameDay: '[Паян] LT [сехетре]',
            nextDay: '[Ыран] LT [сехетре]',
            lastDay: '[Ӗнер] LT [сехетре]',
            nextWeek: '[Ҫитес] dddd LT [сехетре]',
            lastWeek: '[Иртнӗ] dddd LT [сехетре]',
            sameElse: 'L'
        },
        relativeTime: {
            future: function future(output) {
                var affix = /сехет$/i.exec(output) ? 'рен' : /ҫул$/i.exec(output) ? 'тан' : 'ран';
                return output + affix;
            },
            past: '%s каялла',
            s: 'пӗр-ик ҫеккунт',
            m: 'пӗр минут',
            mm: '%d минут',
            h: 'пӗр сехет',
            hh: '%d сехет',
            d: 'пӗр кун',
            dd: '%d кун',
            M: 'пӗр уйӑх',
            MM: '%d уйӑх',
            y: 'пӗр ҫул',
            yy: '%d ҫул'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-мӗш/,
        ordinal: '%d-мӗш',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return cv;
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Welsh [cy]
//! author : Robert Allen : https://github.com/robgallen
//! author : https://github.com/ryangreaves

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var cy = moment.defineLocale('cy', {
        months: 'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split('_'),
        monthsShort: 'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
        weekdays: 'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split('_'),
        weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
        weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
        weekdaysParseExact: true,
        // time formats are the same as en-gb
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Heddiw am] LT',
            nextDay: '[Yfory am] LT',
            nextWeek: 'dddd [am] LT',
            lastDay: '[Ddoe am] LT',
            lastWeek: 'dddd [diwethaf am] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'mewn %s',
            past: '%s yn ôl',
            s: 'ychydig eiliadau',
            m: 'munud',
            mm: '%d munud',
            h: 'awr',
            hh: '%d awr',
            d: 'diwrnod',
            dd: '%d diwrnod',
            M: 'mis',
            MM: '%d mis',
            y: 'blwyddyn',
            yy: '%d flynedd'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
        // traditional ordinal numbers above 31 are not commonly used in colloquial Welsh
        ordinal: function ordinal(number) {
            var b = number,
                output = '',
                lookup = ['', 'af', 'il', 'ydd', 'ydd', 'ed', 'ed', 'ed', 'fed', 'fed', 'fed', // 1af to 10fed
            'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'fed' // 11eg to 20fed
            ];
            if (b > 20) {
                if (b === 40 || b === 50 || b === 60 || b === 80 || b === 100) {
                    output = 'fed'; // not 30ain, 70ain or 90ain
                } else {
                    output = 'ain';
                }
            } else if (b > 0) {
                output = lookup[b];
            }
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return cy;
});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Danish [da]
//! author : Ulrik Nielsen : https://github.com/mrbase

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var da = moment.defineLocale('da', {
        months: 'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split('_'),
        monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
        weekdays: 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
        weekdaysShort: 'søn_man_tir_ons_tor_fre_lør'.split('_'),
        weekdaysMin: 'sø_ma_ti_on_to_fr_lø'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY HH:mm',
            LLLL: 'dddd [d.] D. MMMM YYYY [kl.] HH:mm'
        },
        calendar: {
            sameDay: '[i dag kl.] LT',
            nextDay: '[i morgen kl.] LT',
            nextWeek: 'på dddd [kl.] LT',
            lastDay: '[i går kl.] LT',
            lastWeek: '[i] dddd[s kl.] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'om %s',
            past: '%s siden',
            s: 'få sekunder',
            m: 'et minut',
            mm: '%d minutter',
            h: 'en time',
            hh: '%d timer',
            d: 'en dag',
            dd: '%d dage',
            M: 'en måned',
            MM: '%d måneder',
            y: 'et år',
            yy: '%d år'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return da;
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : German [de]
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
//! author : Mikolaj Dadela : https://github.com/mik01aj

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eine Minute', 'einer Minute'],
            'h': ['eine Stunde', 'einer Stunde'],
            'd': ['ein Tag', 'einem Tag'],
            'dd': [number + ' Tage', number + ' Tagen'],
            'M': ['ein Monat', 'einem Monat'],
            'MM': [number + ' Monate', number + ' Monaten'],
            'y': ['ein Jahr', 'einem Jahr'],
            'yy': [number + ' Jahre', number + ' Jahren']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    var de = moment.defineLocale('de', {
        months: 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort: 'Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
        monthsParseExact: true,
        weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
        weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
        weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY HH:mm',
            LLLL: 'dddd, D. MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[heute um] LT [Uhr]',
            sameElse: 'L',
            nextDay: '[morgen um] LT [Uhr]',
            nextWeek: 'dddd [um] LT [Uhr]',
            lastDay: '[gestern um] LT [Uhr]',
            lastWeek: '[letzten] dddd [um] LT [Uhr]'
        },
        relativeTime: {
            future: 'in %s',
            past: 'vor %s',
            s: 'ein paar Sekunden',
            m: processRelativeTime,
            mm: '%d Minuten',
            h: processRelativeTime,
            hh: '%d Stunden',
            d: processRelativeTime,
            dd: processRelativeTime,
            M: processRelativeTime,
            MM: processRelativeTime,
            y: processRelativeTime,
            yy: processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return de;
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : German (Austria) [de-at]
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
//! author : Martin Groller : https://github.com/MadMG
//! author : Mikolaj Dadela : https://github.com/mik01aj

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eine Minute', 'einer Minute'],
            'h': ['eine Stunde', 'einer Stunde'],
            'd': ['ein Tag', 'einem Tag'],
            'dd': [number + ' Tage', number + ' Tagen'],
            'M': ['ein Monat', 'einem Monat'],
            'MM': [number + ' Monate', number + ' Monaten'],
            'y': ['ein Jahr', 'einem Jahr'],
            'yy': [number + ' Jahre', number + ' Jahren']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    var deAt = moment.defineLocale('de-at', {
        months: 'Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort: 'Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
        monthsParseExact: true,
        weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
        weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
        weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY HH:mm',
            LLLL: 'dddd, D. MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[heute um] LT [Uhr]',
            sameElse: 'L',
            nextDay: '[morgen um] LT [Uhr]',
            nextWeek: 'dddd [um] LT [Uhr]',
            lastDay: '[gestern um] LT [Uhr]',
            lastWeek: '[letzten] dddd [um] LT [Uhr]'
        },
        relativeTime: {
            future: 'in %s',
            past: 'vor %s',
            s: 'ein paar Sekunden',
            m: processRelativeTime,
            mm: '%d Minuten',
            h: processRelativeTime,
            hh: '%d Stunden',
            d: processRelativeTime,
            dd: processRelativeTime,
            M: processRelativeTime,
            MM: processRelativeTime,
            y: processRelativeTime,
            yy: processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return deAt;
});

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : German (Switzerland) [de-ch]
//! author : sschueller : https://github.com/sschueller

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    // based on: https://www.bk.admin.ch/dokumentation/sprachen/04915/05016/index.html?lang=de#

    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eine Minute', 'einer Minute'],
            'h': ['eine Stunde', 'einer Stunde'],
            'd': ['ein Tag', 'einem Tag'],
            'dd': [number + ' Tage', number + ' Tagen'],
            'M': ['ein Monat', 'einem Monat'],
            'MM': [number + ' Monate', number + ' Monaten'],
            'y': ['ein Jahr', 'einem Jahr'],
            'yy': [number + ' Jahre', number + ' Jahren']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    var deCh = moment.defineLocale('de-ch', {
        months: 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort: 'Jan._Febr._März_April_Mai_Juni_Juli_Aug._Sept._Okt._Nov._Dez.'.split('_'),
        monthsParseExact: true,
        weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
        weekdaysShort: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH.mm',
            LTS: 'HH.mm.ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY HH.mm',
            LLLL: 'dddd, D. MMMM YYYY HH.mm'
        },
        calendar: {
            sameDay: '[heute um] LT [Uhr]',
            sameElse: 'L',
            nextDay: '[morgen um] LT [Uhr]',
            nextWeek: 'dddd [um] LT [Uhr]',
            lastDay: '[gestern um] LT [Uhr]',
            lastWeek: '[letzten] dddd [um] LT [Uhr]'
        },
        relativeTime: {
            future: 'in %s',
            past: 'vor %s',
            s: 'ein paar Sekunden',
            m: processRelativeTime,
            mm: '%d Minuten',
            h: processRelativeTime,
            hh: '%d Stunden',
            d: processRelativeTime,
            dd: processRelativeTime,
            M: processRelativeTime,
            MM: processRelativeTime,
            y: processRelativeTime,
            yy: processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return deCh;
});

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Maldivian [dv]
//! author : Jawish Hameed : https://github.com/jawish

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var months = ['ޖެނުއަރީ', 'ފެބްރުއަރީ', 'މާރިޗު', 'އޭޕްރީލު', 'މޭ', 'ޖޫން', 'ޖުލައި', 'އޯގަސްޓު', 'ސެޕްޓެމްބަރު', 'އޮކްޓޯބަރު', 'ނޮވެމްބަރު', 'ޑިސެމްބަރު'];
    var weekdays = ['އާދިއްތަ', 'ހޯމަ', 'އަންގާރަ', 'ބުދަ', 'ބުރާސްފަތި', 'ހުކުރު', 'ހޮނިހިރު'];

    var dv = moment.defineLocale('dv', {
        months: months,
        monthsShort: months,
        weekdays: weekdays,
        weekdaysShort: weekdays,
        weekdaysMin: 'އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި'.split('_'),
        longDateFormat: {

            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'D/M/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /މކ|މފ/,
        isPM: function isPM(input) {
            return 'މފ' === input;
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 12) {
                return 'މކ';
            } else {
                return 'މފ';
            }
        },
        calendar: {
            sameDay: '[މިއަދު] LT',
            nextDay: '[މާދަމާ] LT',
            nextWeek: 'dddd LT',
            lastDay: '[އިއްޔެ] LT',
            lastWeek: '[ފާއިތުވި] dddd LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'ތެރޭގައި %s',
            past: 'ކުރިން %s',
            s: 'ސިކުންތުކޮޅެއް',
            m: 'މިނިޓެއް',
            mm: 'މިނިޓު %d',
            h: 'ގަޑިއިރެއް',
            hh: 'ގަޑިއިރު %d',
            d: 'ދުވަހެއް',
            dd: 'ދުވަސް %d',
            M: 'މަހެއް',
            MM: 'މަސް %d',
            y: 'އަހަރެއް',
            yy: 'އަހަރު %d'
        },
        preparse: function preparse(string) {
            return string.replace(/،/g, ',');
        },
        postformat: function postformat(string) {
            return string.replace(/,/g, '،');
        },
        week: {
            dow: 7, // Sunday is the first day of the week.
            doy: 12 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return dv;
});

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Greek [el]
//! author : Aggelos Karalias : https://github.com/mehiel

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    var el = moment.defineLocale('el', {
        monthsNominativeEl: 'Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος'.split('_'),
        monthsGenitiveEl: 'Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου'.split('_'),
        months: function months(momentToFormat, format) {
            if (!momentToFormat) {
                return this._monthsNominativeEl;
            } else if (/D/.test(format.substring(0, format.indexOf('MMMM')))) {
                // if there is a day number before 'MMMM'
                return this._monthsGenitiveEl[momentToFormat.month()];
            } else {
                return this._monthsNominativeEl[momentToFormat.month()];
            }
        },
        monthsShort: 'Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ'.split('_'),
        weekdays: 'Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο'.split('_'),
        weekdaysShort: 'Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ'.split('_'),
        weekdaysMin: 'Κυ_Δε_Τρ_Τε_Πε_Πα_Σα'.split('_'),
        meridiem: function meridiem(hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'μμ' : 'ΜΜ';
            } else {
                return isLower ? 'πμ' : 'ΠΜ';
            }
        },
        isPM: function isPM(input) {
            return (input + '').toLowerCase()[0] === 'μ';
        },
        meridiemParse: /[ΠΜ]\.?Μ?\.?/i,
        longDateFormat: {
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY h:mm A',
            LLLL: 'dddd, D MMMM YYYY h:mm A'
        },
        calendarEl: {
            sameDay: '[Σήμερα {}] LT',
            nextDay: '[Αύριο {}] LT',
            nextWeek: 'dddd [{}] LT',
            lastDay: '[Χθες {}] LT',
            lastWeek: function lastWeek() {
                switch (this.day()) {
                    case 6:
                        return '[το προηγούμενο] dddd [{}] LT';
                    default:
                        return '[την προηγούμενη] dddd [{}] LT';
                }
            },
            sameElse: 'L'
        },
        calendar: function calendar(key, mom) {
            var output = this._calendarEl[key],
                hours = mom && mom.hours();
            if (isFunction(output)) {
                output = output.apply(mom);
            }
            return output.replace('{}', hours % 12 === 1 ? 'στη' : 'στις');
        },
        relativeTime: {
            future: 'σε %s',
            past: '%s πριν',
            s: 'λίγα δευτερόλεπτα',
            m: 'ένα λεπτό',
            mm: '%d λεπτά',
            h: 'μία ώρα',
            hh: '%d ώρες',
            d: 'μία μέρα',
            dd: '%d μέρες',
            M: 'ένας μήνας',
            MM: '%d μήνες',
            y: 'ένας χρόνος',
            yy: '%d χρόνια'
        },
        dayOfMonthOrdinalParse: /\d{1,2}η/,
        ordinal: '%dη',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4st is the first week of the year.
        }
    });

    return el;
});

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : English (Australia) [en-au]
//! author : Jared Morse : https://github.com/jarcoal

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var enAu = moment.defineLocale('en-au', {
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat: {
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY h:mm A',
            LLLL: 'dddd, D MMMM YYYY h:mm A'
        },
        calendar: {
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Yesterday at] LT',
            lastWeek: '[Last] dddd [at] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'in %s',
            past: '%s ago',
            s: 'a few seconds',
            m: 'a minute',
            mm: '%d minutes',
            h: 'an hour',
            hh: '%d hours',
            d: 'a day',
            dd: '%d days',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function ordinal(number) {
            var b = number % 10,
                output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return enAu;
});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : English (Canada) [en-ca]
//! author : Jonathan Abourbih : https://github.com/jonbca

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var enCa = moment.defineLocale('en-ca', {
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat: {
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            L: 'YYYY-MM-DD',
            LL: 'MMMM D, YYYY',
            LLL: 'MMMM D, YYYY h:mm A',
            LLLL: 'dddd, MMMM D, YYYY h:mm A'
        },
        calendar: {
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Yesterday at] LT',
            lastWeek: '[Last] dddd [at] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'in %s',
            past: '%s ago',
            s: 'a few seconds',
            m: 'a minute',
            mm: '%d minutes',
            h: 'an hour',
            hh: '%d hours',
            d: 'a day',
            dd: '%d days',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function ordinal(number) {
            var b = number % 10,
                output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return number + output;
        }
    });

    return enCa;
});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : English (United Kingdom) [en-gb]
//! author : Chris Gedrim : https://github.com/chrisgedrim

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var enGb = moment.defineLocale('en-gb', {
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Yesterday at] LT',
            lastWeek: '[Last] dddd [at] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'in %s',
            past: '%s ago',
            s: 'a few seconds',
            m: 'a minute',
            mm: '%d minutes',
            h: 'an hour',
            hh: '%d hours',
            d: 'a day',
            dd: '%d days',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function ordinal(number) {
            var b = number % 10,
                output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return enGb;
});

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : English (Ireland) [en-ie]
//! author : Chris Cartlidge : https://github.com/chriscartlidge

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var enIe = moment.defineLocale('en-ie', {
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD-MM-YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Yesterday at] LT',
            lastWeek: '[Last] dddd [at] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'in %s',
            past: '%s ago',
            s: 'a few seconds',
            m: 'a minute',
            mm: '%d minutes',
            h: 'an hour',
            hh: '%d hours',
            d: 'a day',
            dd: '%d days',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function ordinal(number) {
            var b = number % 10,
                output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return enIe;
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : English (New Zealand) [en-nz]
//! author : Luke McGregor : https://github.com/lukemcgregor

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var enNz = moment.defineLocale('en-nz', {
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat: {
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY h:mm A',
            LLLL: 'dddd, D MMMM YYYY h:mm A'
        },
        calendar: {
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Yesterday at] LT',
            lastWeek: '[Last] dddd [at] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'in %s',
            past: '%s ago',
            s: 'a few seconds',
            m: 'a minute',
            mm: '%d minutes',
            h: 'an hour',
            hh: '%d hours',
            d: 'a day',
            dd: '%d days',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function ordinal(number) {
            var b = number % 10,
                output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return enNz;
});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Esperanto [eo]
//! author : Colin Dean : https://github.com/colindean
//! author : Mia Nordentoft Imperatori : https://github.com/miestasmia
//! comment : miestasmia corrected the translation by colindean

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var eo = moment.defineLocale('eo', {
        months: 'januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro'.split('_'),
        monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec'.split('_'),
        weekdays: 'dimanĉo_lundo_mardo_merkredo_ĵaŭdo_vendredo_sabato'.split('_'),
        weekdaysShort: 'dim_lun_mard_merk_ĵaŭ_ven_sab'.split('_'),
        weekdaysMin: 'di_lu_ma_me_ĵa_ve_sa'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY-MM-DD',
            LL: 'D[-a de] MMMM, YYYY',
            LLL: 'D[-a de] MMMM, YYYY HH:mm',
            LLLL: 'dddd, [la] D[-a de] MMMM, YYYY HH:mm'
        },
        meridiemParse: /[ap]\.t\.m/i,
        isPM: function isPM(input) {
            return input.charAt(0).toLowerCase() === 'p';
        },
        meridiem: function meridiem(hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'p.t.m.' : 'P.T.M.';
            } else {
                return isLower ? 'a.t.m.' : 'A.T.M.';
            }
        },
        calendar: {
            sameDay: '[Hodiaŭ je] LT',
            nextDay: '[Morgaŭ je] LT',
            nextWeek: 'dddd [je] LT',
            lastDay: '[Hieraŭ je] LT',
            lastWeek: '[pasinta] dddd [je] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'post %s',
            past: 'antaŭ %s',
            s: 'sekundoj',
            m: 'minuto',
            mm: '%d minutoj',
            h: 'horo',
            hh: '%d horoj',
            d: 'tago', //ne 'diurno', ĉar estas uzita por proksimumo
            dd: '%d tagoj',
            M: 'monato',
            MM: '%d monatoj',
            y: 'jaro',
            yy: '%d jaroj'
        },
        dayOfMonthOrdinalParse: /\d{1,2}a/,
        ordinal: '%da',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return eo;
});

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Spanish [es]
//! author : Julio Napurí : https://github.com/julionc

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_');
    var _monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

    var es = moment.defineLocale('es', {
        months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
        monthsShort: function monthsShort(m, format) {
            if (!m) {
                return monthsShortDot;
            } else if (/-MMM-/.test(format)) {
                return _monthsShort[m.month()];
            } else {
                return monthsShortDot[m.month()];
            }
        },
        monthsParseExact: true,
        weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
        weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
        weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D [de] MMMM [de] YYYY',
            LLL: 'D [de] MMMM [de] YYYY H:mm',
            LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
        },
        calendar: {
            sameDay: function sameDay() {
                return '[hoy a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            nextDay: function nextDay() {
                return '[mañana a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            nextWeek: function nextWeek() {
                return 'dddd [a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            lastDay: function lastDay() {
                return '[ayer a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            lastWeek: function lastWeek() {
                return '[el] dddd [pasado a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'en %s',
            past: 'hace %s',
            s: 'unos segundos',
            m: 'un minuto',
            mm: '%d minutos',
            h: 'una hora',
            hh: '%d horas',
            d: 'un día',
            dd: '%d días',
            M: 'un mes',
            MM: '%d meses',
            y: 'un año',
            yy: '%d años'
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: '%dº',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return es;
});

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Spanish (Dominican Republic) [es-do]

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_');
    var _monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

    var esDo = moment.defineLocale('es-do', {
        months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
        monthsShort: function monthsShort(m, format) {
            if (!m) {
                return monthsShortDot;
            } else if (/-MMM-/.test(format)) {
                return _monthsShort[m.month()];
            } else {
                return monthsShortDot[m.month()];
            }
        },
        monthsParseExact: true,
        weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
        weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
        weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            L: 'DD/MM/YYYY',
            LL: 'D [de] MMMM [de] YYYY',
            LLL: 'D [de] MMMM [de] YYYY h:mm A',
            LLLL: 'dddd, D [de] MMMM [de] YYYY h:mm A'
        },
        calendar: {
            sameDay: function sameDay() {
                return '[hoy a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            nextDay: function nextDay() {
                return '[mañana a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            nextWeek: function nextWeek() {
                return 'dddd [a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            lastDay: function lastDay() {
                return '[ayer a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            lastWeek: function lastWeek() {
                return '[el] dddd [pasado a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'en %s',
            past: 'hace %s',
            s: 'unos segundos',
            m: 'un minuto',
            mm: '%d minutos',
            h: 'una hora',
            hh: '%d horas',
            d: 'un día',
            dd: '%d días',
            M: 'un mes',
            MM: '%d meses',
            y: 'un año',
            yy: '%d años'
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: '%dº',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return esDo;
});

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Estonian [et]
//! author : Henry Kehlmann : https://github.com/madhenry
//! improvements : Illimar Tambek : https://github.com/ragulka

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            's': ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
            'm': ['ühe minuti', 'üks minut'],
            'mm': [number + ' minuti', number + ' minutit'],
            'h': ['ühe tunni', 'tund aega', 'üks tund'],
            'hh': [number + ' tunni', number + ' tundi'],
            'd': ['ühe päeva', 'üks päev'],
            'M': ['kuu aja', 'kuu aega', 'üks kuu'],
            'MM': [number + ' kuu', number + ' kuud'],
            'y': ['ühe aasta', 'aasta', 'üks aasta'],
            'yy': [number + ' aasta', number + ' aastat']
        };
        if (withoutSuffix) {
            return format[key][2] ? format[key][2] : format[key][1];
        }
        return isFuture ? format[key][0] : format[key][1];
    }

    var et = moment.defineLocale('et', {
        months: 'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
        monthsShort: 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
        weekdays: 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
        weekdaysShort: 'P_E_T_K_N_R_L'.split('_'),
        weekdaysMin: 'P_E_T_K_N_R_L'.split('_'),
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[Täna,] LT',
            nextDay: '[Homme,] LT',
            nextWeek: '[Järgmine] dddd LT',
            lastDay: '[Eile,] LT',
            lastWeek: '[Eelmine] dddd LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s pärast',
            past: '%s tagasi',
            s: processRelativeTime,
            m: processRelativeTime,
            mm: processRelativeTime,
            h: processRelativeTime,
            hh: processRelativeTime,
            d: processRelativeTime,
            dd: '%d päeva',
            M: processRelativeTime,
            MM: processRelativeTime,
            y: processRelativeTime,
            yy: processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return et;
});

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Basque [eu]
//! author : Eneko Illarramendi : https://github.com/eillarra

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var eu = moment.defineLocale('eu', {
        months: 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
        monthsShort: 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
        monthsParseExact: true,
        weekdays: 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
        weekdaysShort: 'ig._al._ar._az._og._ol._lr.'.split('_'),
        weekdaysMin: 'ig_al_ar_az_og_ol_lr'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY-MM-DD',
            LL: 'YYYY[ko] MMMM[ren] D[a]',
            LLL: 'YYYY[ko] MMMM[ren] D[a] HH:mm',
            LLLL: 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm',
            l: 'YYYY-M-D',
            ll: 'YYYY[ko] MMM D[a]',
            lll: 'YYYY[ko] MMM D[a] HH:mm',
            llll: 'ddd, YYYY[ko] MMM D[a] HH:mm'
        },
        calendar: {
            sameDay: '[gaur] LT[etan]',
            nextDay: '[bihar] LT[etan]',
            nextWeek: 'dddd LT[etan]',
            lastDay: '[atzo] LT[etan]',
            lastWeek: '[aurreko] dddd LT[etan]',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s barru',
            past: 'duela %s',
            s: 'segundo batzuk',
            m: 'minutu bat',
            mm: '%d minutu',
            h: 'ordu bat',
            hh: '%d ordu',
            d: 'egun bat',
            dd: '%d egun',
            M: 'hilabete bat',
            MM: '%d hilabete',
            y: 'urte bat',
            yy: '%d urte'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return eu;
});

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Persian [fa]
//! author : Ebrahim Byagowi : https://github.com/ebraminio

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '۱',
        '2': '۲',
        '3': '۳',
        '4': '۴',
        '5': '۵',
        '6': '۶',
        '7': '۷',
        '8': '۸',
        '9': '۹',
        '0': '۰'
    };
    var numberMap = {
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',
        '۰': '0'
    };

    var fa = moment.defineLocale('fa', {
        months: 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
        monthsShort: 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
        weekdays: '\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647'.split('_'),
        weekdaysShort: '\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647'.split('_'),
        weekdaysMin: 'ی_د_س_چ_پ_ج_ش'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        meridiemParse: /قبل از ظهر|بعد از ظهر/,
        isPM: function isPM(input) {
            return (/بعد از ظهر/.test(input)
            );
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 12) {
                return 'قبل از ظهر';
            } else {
                return 'بعد از ظهر';
            }
        },
        calendar: {
            sameDay: '[امروز ساعت] LT',
            nextDay: '[فردا ساعت] LT',
            nextWeek: 'dddd [ساعت] LT',
            lastDay: '[دیروز ساعت] LT',
            lastWeek: 'dddd [پیش] [ساعت] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'در %s',
            past: '%s پیش',
            s: 'چند ثانیه',
            m: 'یک دقیقه',
            mm: '%d دقیقه',
            h: 'یک ساعت',
            hh: '%d ساعت',
            d: 'یک روز',
            dd: '%d روز',
            M: 'یک ماه',
            MM: '%d ماه',
            y: 'یک سال',
            yy: '%d سال'
        },
        preparse: function preparse(string) {
            return string.replace(/[۰-۹]/g, function (match) {
                return numberMap[match];
            }).replace(/،/g, ',');
        },
        postformat: function postformat(string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            }).replace(/,/g, '،');
        },
        dayOfMonthOrdinalParse: /\d{1,2}م/,
        ordinal: '%dم',
        week: {
            dow: 6, // Saturday is the first day of the week.
            doy: 12 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return fa;
});

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Finnish [fi]
//! author : Tarmo Aidantausta : https://github.com/bleadof

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var numbersPast = 'nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän'.split(' ');
    var numbersFuture = ['nolla', 'yhden', 'kahden', 'kolmen', 'neljän', 'viiden', 'kuuden', numbersPast[7], numbersPast[8], numbersPast[9]];
    function translate(number, withoutSuffix, key, isFuture) {
        var result = '';
        switch (key) {
            case 's':
                return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
            case 'm':
                return isFuture ? 'minuutin' : 'minuutti';
            case 'mm':
                result = isFuture ? 'minuutin' : 'minuuttia';
                break;
            case 'h':
                return isFuture ? 'tunnin' : 'tunti';
            case 'hh':
                result = isFuture ? 'tunnin' : 'tuntia';
                break;
            case 'd':
                return isFuture ? 'päivän' : 'päivä';
            case 'dd':
                result = isFuture ? 'päivän' : 'päivää';
                break;
            case 'M':
                return isFuture ? 'kuukauden' : 'kuukausi';
            case 'MM':
                result = isFuture ? 'kuukauden' : 'kuukautta';
                break;
            case 'y':
                return isFuture ? 'vuoden' : 'vuosi';
            case 'yy':
                result = isFuture ? 'vuoden' : 'vuotta';
                break;
        }
        result = verbalNumber(number, isFuture) + ' ' + result;
        return result;
    }
    function verbalNumber(number, isFuture) {
        return number < 10 ? isFuture ? numbersFuture[number] : numbersPast[number] : number;
    }

    var fi = moment.defineLocale('fi', {
        months: 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
        monthsShort: 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
        weekdays: 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
        weekdaysShort: 'su_ma_ti_ke_to_pe_la'.split('_'),
        weekdaysMin: 'su_ma_ti_ke_to_pe_la'.split('_'),
        longDateFormat: {
            LT: 'HH.mm',
            LTS: 'HH.mm.ss',
            L: 'DD.MM.YYYY',
            LL: 'Do MMMM[ta] YYYY',
            LLL: 'Do MMMM[ta] YYYY, [klo] HH.mm',
            LLLL: 'dddd, Do MMMM[ta] YYYY, [klo] HH.mm',
            l: 'D.M.YYYY',
            ll: 'Do MMM YYYY',
            lll: 'Do MMM YYYY, [klo] HH.mm',
            llll: 'ddd, Do MMM YYYY, [klo] HH.mm'
        },
        calendar: {
            sameDay: '[tänään] [klo] LT',
            nextDay: '[huomenna] [klo] LT',
            nextWeek: 'dddd [klo] LT',
            lastDay: '[eilen] [klo] LT',
            lastWeek: '[viime] dddd[na] [klo] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s päästä',
            past: '%s sitten',
            s: translate,
            m: translate,
            mm: translate,
            h: translate,
            hh: translate,
            d: translate,
            dd: translate,
            M: translate,
            MM: translate,
            y: translate,
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return fi;
});

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Faroese [fo]
//! author : Ragnar Johannesen : https://github.com/ragnar123

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var fo = moment.defineLocale('fo', {
        months: 'januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
        monthsShort: 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
        weekdays: 'sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur'.split('_'),
        weekdaysShort: 'sun_mán_týs_mik_hós_frí_ley'.split('_'),
        weekdaysMin: 'su_má_tý_mi_hó_fr_le'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D. MMMM, YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Í dag kl.] LT',
            nextDay: '[Í morgin kl.] LT',
            nextWeek: 'dddd [kl.] LT',
            lastDay: '[Í gjár kl.] LT',
            lastWeek: '[síðstu] dddd [kl] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'um %s',
            past: '%s síðani',
            s: 'fá sekund',
            m: 'ein minutt',
            mm: '%d minuttir',
            h: 'ein tími',
            hh: '%d tímar',
            d: 'ein dagur',
            dd: '%d dagar',
            M: 'ein mánaði',
            MM: '%d mánaðir',
            y: 'eitt ár',
            yy: '%d ár'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return fo;
});

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : French [fr]
//! author : John Fischer : https://github.com/jfroffice

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var fr = moment.defineLocale('fr', {
        months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
        monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
        monthsParseExact: true,
        weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Aujourd’hui à] LT',
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'dans %s',
            past: 'il y a %s',
            s: 'quelques secondes',
            m: 'une minute',
            mm: '%d minutes',
            h: 'une heure',
            hh: '%d heures',
            d: 'un jour',
            dd: '%d jours',
            M: 'un mois',
            MM: '%d mois',
            y: 'un an',
            yy: '%d ans'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
        ordinal: function ordinal(number, period) {
            switch (period) {
                // TODO: Return 'e' when day of month > 1. Move this case inside
                // block for masculine words below.
                // See https://github.com/moment/moment/issues/3375
                case 'D':
                    return number + (number === 1 ? 'er' : '');

                // Words with masculine grammatical gender: mois, trimestre, jour
                default:
                case 'M':
                case 'Q':
                case 'DDD':
                case 'd':
                    return number + (number === 1 ? 'er' : 'e');

                // Words with feminine grammatical gender: semaine
                case 'w':
                case 'W':
                    return number + (number === 1 ? 're' : 'e');
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return fr;
});

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : French (Canada) [fr-ca]
//! author : Jonathan Abourbih : https://github.com/jonbca

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var frCa = moment.defineLocale('fr-ca', {
        months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
        monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
        monthsParseExact: true,
        weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY-MM-DD',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Aujourd’hui à] LT',
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'dans %s',
            past: 'il y a %s',
            s: 'quelques secondes',
            m: 'une minute',
            mm: '%d minutes',
            h: 'une heure',
            hh: '%d heures',
            d: 'un jour',
            dd: '%d jours',
            M: 'un mois',
            MM: '%d mois',
            y: 'un an',
            yy: '%d ans'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
        ordinal: function ordinal(number, period) {
            switch (period) {
                // Words with masculine grammatical gender: mois, trimestre, jour
                default:
                case 'M':
                case 'Q':
                case 'D':
                case 'DDD':
                case 'd':
                    return number + (number === 1 ? 'er' : 'e');

                // Words with feminine grammatical gender: semaine
                case 'w':
                case 'W':
                    return number + (number === 1 ? 're' : 'e');
            }
        }
    });

    return frCa;
});

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : French (Switzerland) [fr-ch]
//! author : Gaspard Bucher : https://github.com/gaspard

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var frCh = moment.defineLocale('fr-ch', {
        months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
        monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
        monthsParseExact: true,
        weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Aujourd’hui à] LT',
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'dans %s',
            past: 'il y a %s',
            s: 'quelques secondes',
            m: 'une minute',
            mm: '%d minutes',
            h: 'une heure',
            hh: '%d heures',
            d: 'un jour',
            dd: '%d jours',
            M: 'un mois',
            MM: '%d mois',
            y: 'un an',
            yy: '%d ans'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
        ordinal: function ordinal(number, period) {
            switch (period) {
                // Words with masculine grammatical gender: mois, trimestre, jour
                default:
                case 'M':
                case 'Q':
                case 'D':
                case 'DDD':
                case 'd':
                    return number + (number === 1 ? 'er' : 'e');

                // Words with feminine grammatical gender: semaine
                case 'w':
                case 'W':
                    return number + (number === 1 ? 're' : 'e');
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return frCh;
});

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Frisian [fy]
//! author : Robin van der Vliet : https://github.com/robin0van0der0v

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var monthsShortWithDots = 'jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.'.split('_');
    var monthsShortWithoutDots = 'jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_');

    var fy = moment.defineLocale('fy', {
        months: 'jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber'.split('_'),
        monthsShort: function monthsShort(m, format) {
            if (!m) {
                return monthsShortWithDots;
            } else if (/-MMM-/.test(format)) {
                return monthsShortWithoutDots[m.month()];
            } else {
                return monthsShortWithDots[m.month()];
            }
        },
        monthsParseExact: true,
        weekdays: 'snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon'.split('_'),
        weekdaysShort: 'si._mo._ti._wo._to._fr._so.'.split('_'),
        weekdaysMin: 'Si_Mo_Ti_Wo_To_Fr_So'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD-MM-YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[hjoed om] LT',
            nextDay: '[moarn om] LT',
            nextWeek: 'dddd [om] LT',
            lastDay: '[juster om] LT',
            lastWeek: '[ôfrûne] dddd [om] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'oer %s',
            past: '%s lyn',
            s: 'in pear sekonden',
            m: 'ien minút',
            mm: '%d minuten',
            h: 'ien oere',
            hh: '%d oeren',
            d: 'ien dei',
            dd: '%d dagen',
            M: 'ien moanne',
            MM: '%d moannen',
            y: 'ien jier',
            yy: '%d jierren'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal: function ordinal(number) {
            return number + (number === 1 || number === 8 || number >= 20 ? 'ste' : 'de');
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return fy;
});

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Scottish Gaelic [gd]
//! author : Jon Ashdown : https://github.com/jonashdown

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var months = ['Am Faoilleach', 'An Gearran', 'Am Màrt', 'An Giblean', 'An Cèitean', 'An t-Ògmhios', 'An t-Iuchar', 'An Lùnastal', 'An t-Sultain', 'An Dàmhair', 'An t-Samhain', 'An Dùbhlachd'];

    var monthsShort = ['Faoi', 'Gear', 'Màrt', 'Gibl', 'Cèit', 'Ògmh', 'Iuch', 'Lùn', 'Sult', 'Dàmh', 'Samh', 'Dùbh'];

    var weekdays = ['Didòmhnaich', 'Diluain', 'Dimàirt', 'Diciadain', 'Diardaoin', 'Dihaoine', 'Disathairne'];

    var weekdaysShort = ['Did', 'Dil', 'Dim', 'Dic', 'Dia', 'Dih', 'Dis'];

    var weekdaysMin = ['Dò', 'Lu', 'Mà', 'Ci', 'Ar', 'Ha', 'Sa'];

    var gd = moment.defineLocale('gd', {
        months: months,
        monthsShort: monthsShort,
        monthsParseExact: true,
        weekdays: weekdays,
        weekdaysShort: weekdaysShort,
        weekdaysMin: weekdaysMin,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[An-diugh aig] LT',
            nextDay: '[A-màireach aig] LT',
            nextWeek: 'dddd [aig] LT',
            lastDay: '[An-dè aig] LT',
            lastWeek: 'dddd [seo chaidh] [aig] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'ann an %s',
            past: 'bho chionn %s',
            s: 'beagan diogan',
            m: 'mionaid',
            mm: '%d mionaidean',
            h: 'uair',
            hh: '%d uairean',
            d: 'latha',
            dd: '%d latha',
            M: 'mìos',
            MM: '%d mìosan',
            y: 'bliadhna',
            yy: '%d bliadhna'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/,
        ordinal: function ordinal(number) {
            var output = number === 1 ? 'd' : number % 10 === 2 ? 'na' : 'mh';
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return gd;
});

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Galician [gl]
//! author : Juan G. Hurtado : https://github.com/juanghurtado

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var gl = moment.defineLocale('gl', {
        months: 'xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro'.split('_'),
        monthsShort: 'xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays: 'domingo_luns_martes_mércores_xoves_venres_sábado'.split('_'),
        weekdaysShort: 'dom._lun._mar._mér._xov._ven._sáb.'.split('_'),
        weekdaysMin: 'do_lu_ma_mé_xo_ve_sá'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D [de] MMMM [de] YYYY',
            LLL: 'D [de] MMMM [de] YYYY H:mm',
            LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
        },
        calendar: {
            sameDay: function sameDay() {
                return '[hoxe ' + (this.hours() !== 1 ? 'ás' : 'á') + '] LT';
            },
            nextDay: function nextDay() {
                return '[mañá ' + (this.hours() !== 1 ? 'ás' : 'á') + '] LT';
            },
            nextWeek: function nextWeek() {
                return 'dddd [' + (this.hours() !== 1 ? 'ás' : 'a') + '] LT';
            },
            lastDay: function lastDay() {
                return '[onte ' + (this.hours() !== 1 ? 'á' : 'a') + '] LT';
            },
            lastWeek: function lastWeek() {
                return '[o] dddd [pasado ' + (this.hours() !== 1 ? 'ás' : 'a') + '] LT';
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: function future(str) {
                if (str.indexOf('un') === 0) {
                    return 'n' + str;
                }
                return 'en ' + str;
            },
            past: 'hai %s',
            s: 'uns segundos',
            m: 'un minuto',
            mm: '%d minutos',
            h: 'unha hora',
            hh: '%d horas',
            d: 'un día',
            dd: '%d días',
            M: 'un mes',
            MM: '%d meses',
            y: 'un ano',
            yy: '%d anos'
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: '%dº',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return gl;
});

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Konkani Latin script [gom-latn]
//! author : The Discoverer : https://github.com/WikiDiscoverer

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            's': ['thodde secondanim', 'thodde second'],
            'm': ['eka mintan', 'ek minute'],
            'mm': [number + ' mintanim', number + ' mintam'],
            'h': ['eka horan', 'ek hor'],
            'hh': [number + ' horanim', number + ' hor'],
            'd': ['eka disan', 'ek dis'],
            'dd': [number + ' disanim', number + ' dis'],
            'M': ['eka mhoinean', 'ek mhoino'],
            'MM': [number + ' mhoineanim', number + ' mhoine'],
            'y': ['eka vorsan', 'ek voros'],
            'yy': [number + ' vorsanim', number + ' vorsam']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    var gomLatn = moment.defineLocale('gom-latn', {
        months: 'Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr'.split('_'),
        monthsShort: 'Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.'.split('_'),
        monthsParseExact: true,
        weekdays: 'Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son\'var'.split('_'),
        weekdaysShort: 'Ait._Som._Mon._Bud._Bre._Suk._Son.'.split('_'),
        weekdaysMin: 'Ai_Sm_Mo_Bu_Br_Su_Sn'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'A h:mm [vazta]',
            LTS: 'A h:mm:ss [vazta]',
            L: 'DD-MM-YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY A h:mm [vazta]',
            LLLL: 'dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]',
            llll: 'ddd, D MMM YYYY, A h:mm [vazta]'
        },
        calendar: {
            sameDay: '[Aiz] LT',
            nextDay: '[Faleam] LT',
            nextWeek: '[Ieta to] dddd[,] LT',
            lastDay: '[Kal] LT',
            lastWeek: '[Fatlo] dddd[,] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s',
            past: '%s adim',
            s: processRelativeTime,
            m: processRelativeTime,
            mm: processRelativeTime,
            h: processRelativeTime,
            hh: processRelativeTime,
            d: processRelativeTime,
            dd: processRelativeTime,
            M: processRelativeTime,
            MM: processRelativeTime,
            y: processRelativeTime,
            yy: processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er)/,
        ordinal: function ordinal(number, period) {
            switch (period) {
                // the ordinal 'er' only applies to day of the month
                case 'D':
                    return number + 'er';
                default:
                case 'M':
                case 'Q':
                case 'DDD':
                case 'd':
                case 'w':
                case 'W':
                    return number;
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        },
        meridiemParse: /rati|sokalli|donparam|sanje/,
        meridiemHour: function meridiemHour(hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'rati') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'sokalli') {
                return hour;
            } else if (meridiem === 'donparam') {
                return hour > 12 ? hour : hour + 12;
            } else if (meridiem === 'sanje') {
                return hour + 12;
            }
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 4) {
                return 'rati';
            } else if (hour < 12) {
                return 'sokalli';
            } else if (hour < 16) {
                return 'donparam';
            } else if (hour < 20) {
                return 'sanje';
            } else {
                return 'rati';
            }
        }
    });

    return gomLatn;
});

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Hebrew [he]
//! author : Tomer Cohen : https://github.com/tomer
//! author : Moshe Simantov : https://github.com/DevelopmentIL
//! author : Tal Ater : https://github.com/TalAter

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var he = moment.defineLocale('he', {
        months: 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
        monthsShort: 'ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳'.split('_'),
        weekdays: 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
        weekdaysShort: 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
        weekdaysMin: 'א_ב_ג_ד_ה_ו_ש'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D [ב]MMMM YYYY',
            LLL: 'D [ב]MMMM YYYY HH:mm',
            LLLL: 'dddd, D [ב]MMMM YYYY HH:mm',
            l: 'D/M/YYYY',
            ll: 'D MMM YYYY',
            lll: 'D MMM YYYY HH:mm',
            llll: 'ddd, D MMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[היום ב־]LT',
            nextDay: '[מחר ב־]LT',
            nextWeek: 'dddd [בשעה] LT',
            lastDay: '[אתמול ב־]LT',
            lastWeek: '[ביום] dddd [האחרון בשעה] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'בעוד %s',
            past: 'לפני %s',
            s: 'מספר שניות',
            m: 'דקה',
            mm: '%d דקות',
            h: 'שעה',
            hh: function hh(number) {
                if (number === 2) {
                    return 'שעתיים';
                }
                return number + ' שעות';
            },
            d: 'יום',
            dd: function dd(number) {
                if (number === 2) {
                    return 'יומיים';
                }
                return number + ' ימים';
            },
            M: 'חודש',
            MM: function MM(number) {
                if (number === 2) {
                    return 'חודשיים';
                }
                return number + ' חודשים';
            },
            y: 'שנה',
            yy: function yy(number) {
                if (number === 2) {
                    return 'שנתיים';
                } else if (number % 10 === 0 && number !== 10) {
                    return number + ' שנה';
                }
                return number + ' שנים';
            }
        },
        meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
        isPM: function isPM(input) {
            return (/^(אחה"צ|אחרי הצהריים|בערב)$/.test(input)
            );
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 5) {
                return 'לפנות בוקר';
            } else if (hour < 10) {
                return 'בבוקר';
            } else if (hour < 12) {
                return isLower ? 'לפנה"צ' : 'לפני הצהריים';
            } else if (hour < 18) {
                return isLower ? 'אחה"צ' : 'אחרי הצהריים';
            } else {
                return 'בערב';
            }
        }
    });

    return he;
});

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Hindi [hi]
//! author : Mayank Singhal : https://github.com/mayanksinghal

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '१',
        '2': '२',
        '3': '३',
        '4': '४',
        '5': '५',
        '6': '६',
        '7': '७',
        '8': '८',
        '9': '९',
        '0': '०'
    };
    var numberMap = {
        '१': '1',
        '२': '2',
        '३': '3',
        '४': '4',
        '५': '5',
        '६': '6',
        '७': '7',
        '८': '8',
        '९': '9',
        '०': '0'
    };

    var hi = moment.defineLocale('hi', {
        months: 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
        monthsShort: 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
        monthsParseExact: true,
        weekdays: 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
        weekdaysShort: 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
        weekdaysMin: 'र_सो_मं_बु_गु_शु_श'.split('_'),
        longDateFormat: {
            LT: 'A h:mm बजे',
            LTS: 'A h:mm:ss बजे',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, A h:mm बजे',
            LLLL: 'dddd, D MMMM YYYY, A h:mm बजे'
        },
        calendar: {
            sameDay: '[आज] LT',
            nextDay: '[कल] LT',
            nextWeek: 'dddd, LT',
            lastDay: '[कल] LT',
            lastWeek: '[पिछले] dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s में',
            past: '%s पहले',
            s: 'कुछ ही क्षण',
            m: 'एक मिनट',
            mm: '%d मिनट',
            h: 'एक घंटा',
            hh: '%d घंटे',
            d: 'एक दिन',
            dd: '%d दिन',
            M: 'एक महीने',
            MM: '%d महीने',
            y: 'एक वर्ष',
            yy: '%d वर्ष'
        },
        preparse: function preparse(string) {
            return string.replace(/[१२३४५६७८९०]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function postformat(string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        // Hindi notation for meridiems are quite fuzzy in practice. While there exists
        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
        meridiemParse: /रात|सुबह|दोपहर|शाम/,
        meridiemHour: function meridiemHour(hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'रात') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'सुबह') {
                return hour;
            } else if (meridiem === 'दोपहर') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'शाम') {
                return hour + 12;
            }
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 4) {
                return 'रात';
            } else if (hour < 10) {
                return 'सुबह';
            } else if (hour < 17) {
                return 'दोपहर';
            } else if (hour < 20) {
                return 'शाम';
            } else {
                return 'रात';
            }
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return hi;
});

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Croatian [hr]
//! author : Bojan Marković : https://github.com/bmarkovic

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    function translate(number, withoutSuffix, key) {
        var result = number + ' ';
        switch (key) {
            case 'm':
                return withoutSuffix ? 'jedna minuta' : 'jedne minute';
            case 'mm':
                if (number === 1) {
                    result += 'minuta';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'minute';
                } else {
                    result += 'minuta';
                }
                return result;
            case 'h':
                return withoutSuffix ? 'jedan sat' : 'jednog sata';
            case 'hh':
                if (number === 1) {
                    result += 'sat';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'sata';
                } else {
                    result += 'sati';
                }
                return result;
            case 'dd':
                if (number === 1) {
                    result += 'dan';
                } else {
                    result += 'dana';
                }
                return result;
            case 'MM':
                if (number === 1) {
                    result += 'mjesec';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'mjeseca';
                } else {
                    result += 'mjeseci';
                }
                return result;
            case 'yy':
                if (number === 1) {
                    result += 'godina';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'godine';
                } else {
                    result += 'godina';
                }
                return result;
        }
    }

    var hr = moment.defineLocale('hr', {
        months: {
            format: 'siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca'.split('_'),
            standalone: 'siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_')
        },
        monthsShort: 'sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
        monthsParseExact: true,
        weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
        weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[danas u] LT',
            nextDay: '[sutra u] LT',
            nextWeek: function nextWeek() {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedjelju] [u] LT';
                    case 3:
                        return '[u] [srijedu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay: '[jučer u] LT',
            lastWeek: function lastWeek() {
                switch (this.day()) {
                    case 0:
                    case 3:
                        return '[prošlu] dddd [u] LT';
                    case 6:
                        return '[prošle] [subote] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[prošli] dddd [u] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'za %s',
            past: 'prije %s',
            s: 'par sekundi',
            m: translate,
            mm: translate,
            h: translate,
            hh: translate,
            d: 'dan',
            dd: translate,
            M: 'mjesec',
            MM: translate,
            y: 'godinu',
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return hr;
});

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Hungarian [hu]
//! author : Adam Brunner : https://github.com/adambrunner

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var weekEndings = 'vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton'.split(' ');
    function translate(number, withoutSuffix, key, isFuture) {
        var num = number,
            suffix;
        switch (key) {
            case 's':
                return isFuture || withoutSuffix ? 'néhány másodperc' : 'néhány másodperce';
            case 'm':
                return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');
            case 'mm':
                return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
            case 'h':
                return 'egy' + (isFuture || withoutSuffix ? ' óra' : ' órája');
            case 'hh':
                return num + (isFuture || withoutSuffix ? ' óra' : ' órája');
            case 'd':
                return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');
            case 'dd':
                return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
            case 'M':
                return 'egy' + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
            case 'MM':
                return num + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
            case 'y':
                return 'egy' + (isFuture || withoutSuffix ? ' év' : ' éve');
            case 'yy':
                return num + (isFuture || withoutSuffix ? ' év' : ' éve');
        }
        return '';
    }
    function week(isFuture) {
        return (isFuture ? '' : '[múlt] ') + '[' + weekEndings[this.day()] + '] LT[-kor]';
    }

    var hu = moment.defineLocale('hu', {
        months: 'január_február_március_április_május_június_július_augusztus_szeptember_október_november_december'.split('_'),
        monthsShort: 'jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec'.split('_'),
        weekdays: 'vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat'.split('_'),
        weekdaysShort: 'vas_hét_kedd_sze_csüt_pén_szo'.split('_'),
        weekdaysMin: 'v_h_k_sze_cs_p_szo'.split('_'),
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'YYYY.MM.DD.',
            LL: 'YYYY. MMMM D.',
            LLL: 'YYYY. MMMM D. H:mm',
            LLLL: 'YYYY. MMMM D., dddd H:mm'
        },
        meridiemParse: /de|du/i,
        isPM: function isPM(input) {
            return input.charAt(1).toLowerCase() === 'u';
        },
        meridiem: function meridiem(hours, minutes, isLower) {
            if (hours < 12) {
                return isLower === true ? 'de' : 'DE';
            } else {
                return isLower === true ? 'du' : 'DU';
            }
        },
        calendar: {
            sameDay: '[ma] LT[-kor]',
            nextDay: '[holnap] LT[-kor]',
            nextWeek: function nextWeek() {
                return week.call(this, true);
            },
            lastDay: '[tegnap] LT[-kor]',
            lastWeek: function lastWeek() {
                return week.call(this, false);
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s múlva',
            past: '%s',
            s: translate,
            m: translate,
            mm: translate,
            h: translate,
            hh: translate,
            d: translate,
            dd: translate,
            M: translate,
            MM: translate,
            y: translate,
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return hu;
});

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Armenian [hy-am]
//! author : Armendarabyan : https://github.com/armendarabyan

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var hyAm = moment.defineLocale('hy-am', {
        months: {
            format: 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_'),
            standalone: 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_')
        },
        monthsShort: 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
        weekdays: 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_'),
        weekdaysShort: 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
        weekdaysMin: 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY թ.',
            LLL: 'D MMMM YYYY թ., HH:mm',
            LLLL: 'dddd, D MMMM YYYY թ., HH:mm'
        },
        calendar: {
            sameDay: '[այսօր] LT',
            nextDay: '[վաղը] LT',
            lastDay: '[երեկ] LT',
            nextWeek: function nextWeek() {
                return 'dddd [օրը ժամը] LT';
            },
            lastWeek: function lastWeek() {
                return '[անցած] dddd [օրը ժամը] LT';
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s հետո',
            past: '%s առաջ',
            s: 'մի քանի վայրկյան',
            m: 'րոպե',
            mm: '%d րոպե',
            h: 'ժամ',
            hh: '%d ժամ',
            d: 'օր',
            dd: '%d օր',
            M: 'ամիս',
            MM: '%d ամիս',
            y: 'տարի',
            yy: '%d տարի'
        },
        meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
        isPM: function isPM(input) {
            return (/^(ցերեկվա|երեկոյան)$/.test(input)
            );
        },
        meridiem: function meridiem(hour) {
            if (hour < 4) {
                return 'գիշերվա';
            } else if (hour < 12) {
                return 'առավոտվա';
            } else if (hour < 17) {
                return 'ցերեկվա';
            } else {
                return 'երեկոյան';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
        ordinal: function ordinal(number, period) {
            switch (period) {
                case 'DDD':
                case 'w':
                case 'W':
                case 'DDDo':
                    if (number === 1) {
                        return number + '-ին';
                    }
                    return number + '-րդ';
                default:
                    return number;
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return hyAm;
});

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Indonesian [id]
//! author : Mohammad Satrio Utomo : https://github.com/tyok
//! reference: http://id.wikisource.org/wiki/Pedoman_Umum_Ejaan_Bahasa_Indonesia_yang_Disempurnakan

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var id = moment.defineLocale('id', {
        months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des'.split('_'),
        weekdays: 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
        weekdaysShort: 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
        weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
        longDateFormat: {
            LT: 'HH.mm',
            LTS: 'HH.mm.ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY [pukul] HH.mm',
            LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /pagi|siang|sore|malam/,
        meridiemHour: function meridiemHour(hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'pagi') {
                return hour;
            } else if (meridiem === 'siang') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'sore' || meridiem === 'malam') {
                return hour + 12;
            }
        },
        meridiem: function meridiem(hours, minutes, isLower) {
            if (hours < 11) {
                return 'pagi';
            } else if (hours < 15) {
                return 'siang';
            } else if (hours < 19) {
                return 'sore';
            } else {
                return 'malam';
            }
        },
        calendar: {
            sameDay: '[Hari ini pukul] LT',
            nextDay: '[Besok pukul] LT',
            nextWeek: 'dddd [pukul] LT',
            lastDay: '[Kemarin pukul] LT',
            lastWeek: 'dddd [lalu pukul] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'dalam %s',
            past: '%s yang lalu',
            s: 'beberapa detik',
            m: 'semenit',
            mm: '%d menit',
            h: 'sejam',
            hh: '%d jam',
            d: 'sehari',
            dd: '%d hari',
            M: 'sebulan',
            MM: '%d bulan',
            y: 'setahun',
            yy: '%d tahun'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return id;
});

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Icelandic [is]
//! author : Hinrik Örn Sigurðsson : https://github.com/hinrik

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    function plural(n) {
        if (n % 100 === 11) {
            return true;
        } else if (n % 10 === 1) {
            return false;
        }
        return true;
    }
    function translate(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':
                return withoutSuffix || isFuture ? 'nokkrar sekúndur' : 'nokkrum sekúndum';
            case 'm':
                return withoutSuffix ? 'mínúta' : 'mínútu';
            case 'mm':
                if (plural(number)) {
                    return result + (withoutSuffix || isFuture ? 'mínútur' : 'mínútum');
                } else if (withoutSuffix) {
                    return result + 'mínúta';
                }
                return result + 'mínútu';
            case 'hh':
                if (plural(number)) {
                    return result + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum');
                }
                return result + 'klukkustund';
            case 'd':
                if (withoutSuffix) {
                    return 'dagur';
                }
                return isFuture ? 'dag' : 'degi';
            case 'dd':
                if (plural(number)) {
                    if (withoutSuffix) {
                        return result + 'dagar';
                    }
                    return result + (isFuture ? 'daga' : 'dögum');
                } else if (withoutSuffix) {
                    return result + 'dagur';
                }
                return result + (isFuture ? 'dag' : 'degi');
            case 'M':
                if (withoutSuffix) {
                    return 'mánuður';
                }
                return isFuture ? 'mánuð' : 'mánuði';
            case 'MM':
                if (plural(number)) {
                    if (withoutSuffix) {
                        return result + 'mánuðir';
                    }
                    return result + (isFuture ? 'mánuði' : 'mánuðum');
                } else if (withoutSuffix) {
                    return result + 'mánuður';
                }
                return result + (isFuture ? 'mánuð' : 'mánuði');
            case 'y':
                return withoutSuffix || isFuture ? 'ár' : 'ári';
            case 'yy':
                if (plural(number)) {
                    return result + (withoutSuffix || isFuture ? 'ár' : 'árum');
                }
                return result + (withoutSuffix || isFuture ? 'ár' : 'ári');
        }
    }

    var is = moment.defineLocale('is', {
        months: 'janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember'.split('_'),
        monthsShort: 'jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des'.split('_'),
        weekdays: 'sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur'.split('_'),
        weekdaysShort: 'sun_mán_þri_mið_fim_fös_lau'.split('_'),
        weekdaysMin: 'Su_Má_Þr_Mi_Fi_Fö_La'.split('_'),
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY [kl.] H:mm',
            LLLL: 'dddd, D. MMMM YYYY [kl.] H:mm'
        },
        calendar: {
            sameDay: '[í dag kl.] LT',
            nextDay: '[á morgun kl.] LT',
            nextWeek: 'dddd [kl.] LT',
            lastDay: '[í gær kl.] LT',
            lastWeek: '[síðasta] dddd [kl.] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'eftir %s',
            past: 'fyrir %s síðan',
            s: translate,
            m: translate,
            mm: translate,
            h: 'klukkustund',
            hh: translate,
            d: translate,
            dd: translate,
            M: translate,
            MM: translate,
            y: translate,
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return is;
});

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Italian [it]
//! author : Lorenzo : https://github.com/aliem
//! author: Mattia Larentis: https://github.com/nostalgiaz

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var it = moment.defineLocale('it', {
        months: 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
        monthsShort: 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
        weekdays: 'domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato'.split('_'),
        weekdaysShort: 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
        weekdaysMin: 'do_lu_ma_me_gi_ve_sa'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Oggi alle] LT',
            nextDay: '[Domani alle] LT',
            nextWeek: 'dddd [alle] LT',
            lastDay: '[Ieri alle] LT',
            lastWeek: function lastWeek() {
                switch (this.day()) {
                    case 0:
                        return '[la scorsa] dddd [alle] LT';
                    default:
                        return '[lo scorso] dddd [alle] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: function future(s) {
                return (/^[0-9].+$/.test(s) ? 'tra' : 'in') + ' ' + s;
            },
            past: '%s fa',
            s: 'alcuni secondi',
            m: 'un minuto',
            mm: '%d minuti',
            h: 'un\'ora',
            hh: '%d ore',
            d: 'un giorno',
            dd: '%d giorni',
            M: 'un mese',
            MM: '%d mesi',
            y: 'un anno',
            yy: '%d anni'
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: '%dº',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return it;
});

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Japanese [ja]
//! author : LI Long : https://github.com/baryon

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var ja = moment.defineLocale('ja', {
        months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays: '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
        weekdaysShort: '日_月_火_水_木_金_土'.split('_'),
        weekdaysMin: '日_月_火_水_木_金_土'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY/MM/DD',
            LL: 'YYYY年M月D日',
            LLL: 'YYYY年M月D日 HH:mm',
            LLLL: 'YYYY年M月D日 HH:mm dddd',
            l: 'YYYY/MM/DD',
            ll: 'YYYY年M月D日',
            lll: 'YYYY年M月D日 HH:mm',
            llll: 'YYYY年M月D日 HH:mm dddd'
        },
        meridiemParse: /午前|午後/i,
        isPM: function isPM(input) {
            return input === '午後';
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 12) {
                return '午前';
            } else {
                return '午後';
            }
        },
        calendar: {
            sameDay: '[今日] LT',
            nextDay: '[明日] LT',
            nextWeek: '[来週]dddd LT',
            lastDay: '[昨日] LT',
            lastWeek: '[前週]dddd LT',
            sameElse: 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}日/,
        ordinal: function ordinal(number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                default:
                    return number;
            }
        },
        relativeTime: {
            future: '%s後',
            past: '%s前',
            s: '数秒',
            m: '1分',
            mm: '%d分',
            h: '1時間',
            hh: '%d時間',
            d: '1日',
            dd: '%d日',
            M: '1ヶ月',
            MM: '%dヶ月',
            y: '1年',
            yy: '%d年'
        }
    });

    return ja;
});

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Javanese [jv]
//! author : Rony Lantip : https://github.com/lantip
//! reference: http://jv.wikipedia.org/wiki/Basa_Jawa

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var jv = moment.defineLocale('jv', {
        months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des'.split('_'),
        weekdays: 'Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu'.split('_'),
        weekdaysShort: 'Min_Sen_Sel_Reb_Kem_Jem_Sep'.split('_'),
        weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sp'.split('_'),
        longDateFormat: {
            LT: 'HH.mm',
            LTS: 'HH.mm.ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY [pukul] HH.mm',
            LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /enjing|siyang|sonten|ndalu/,
        meridiemHour: function meridiemHour(hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'enjing') {
                return hour;
            } else if (meridiem === 'siyang') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'sonten' || meridiem === 'ndalu') {
                return hour + 12;
            }
        },
        meridiem: function meridiem(hours, minutes, isLower) {
            if (hours < 11) {
                return 'enjing';
            } else if (hours < 15) {
                return 'siyang';
            } else if (hours < 19) {
                return 'sonten';
            } else {
                return 'ndalu';
            }
        },
        calendar: {
            sameDay: '[Dinten puniko pukul] LT',
            nextDay: '[Mbenjang pukul] LT',
            nextWeek: 'dddd [pukul] LT',
            lastDay: '[Kala wingi pukul] LT',
            lastWeek: 'dddd [kepengker pukul] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'wonten ing %s',
            past: '%s ingkang kepengker',
            s: 'sawetawis detik',
            m: 'setunggal menit',
            mm: '%d menit',
            h: 'setunggal jam',
            hh: '%d jam',
            d: 'sedinten',
            dd: '%d dinten',
            M: 'sewulan',
            MM: '%d wulan',
            y: 'setaun',
            yy: '%d taun'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return jv;
});

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Georgian [ka]
//! author : Irakli Janiashvili : https://github.com/irakli-janiashvili

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var ka = moment.defineLocale('ka', {
        months: {
            standalone: 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
            format: 'იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს'.split('_')
        },
        monthsShort: 'იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ'.split('_'),
        weekdays: {
            standalone: 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
            format: 'კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს'.split('_'),
            isFormat: /(წინა|შემდეგ)/
        },
        weekdaysShort: 'კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ'.split('_'),
        weekdaysMin: 'კვ_ორ_სა_ოთ_ხუ_პა_შა'.split('_'),
        longDateFormat: {
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY h:mm A',
            LLLL: 'dddd, D MMMM YYYY h:mm A'
        },
        calendar: {
            sameDay: '[დღეს] LT[-ზე]',
            nextDay: '[ხვალ] LT[-ზე]',
            lastDay: '[გუშინ] LT[-ზე]',
            nextWeek: '[შემდეგ] dddd LT[-ზე]',
            lastWeek: '[წინა] dddd LT-ზე',
            sameElse: 'L'
        },
        relativeTime: {
            future: function future(s) {
                return (/(წამი|წუთი|საათი|წელი)/.test(s) ? s.replace(/ი$/, 'ში') : s + 'ში'
                );
            },
            past: function past(s) {
                if (/(წამი|წუთი|საათი|დღე|თვე)/.test(s)) {
                    return s.replace(/(ი|ე)$/, 'ის უკან');
                }
                if (/წელი/.test(s)) {
                    return s.replace(/წელი$/, 'წლის უკან');
                }
            },
            s: 'რამდენიმე წამი',
            m: 'წუთი',
            mm: '%d წუთი',
            h: 'საათი',
            hh: '%d საათი',
            d: 'დღე',
            dd: '%d დღე',
            M: 'თვე',
            MM: '%d თვე',
            y: 'წელი',
            yy: '%d წელი'
        },
        dayOfMonthOrdinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
        ordinal: function ordinal(number) {
            if (number === 0) {
                return number;
            }
            if (number === 1) {
                return number + '-ლი';
            }
            if (number < 20 || number <= 100 && number % 20 === 0 || number % 100 === 0) {
                return 'მე-' + number;
            }
            return number + '-ე';
        },
        week: {
            dow: 1,
            doy: 7
        }
    });

    return ka;
});

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Kazakh [kk]
//! authors : Nurlan Rakhimzhanov : https://github.com/nurlan

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var suffixes = {
        0: '-ші',
        1: '-ші',
        2: '-ші',
        3: '-ші',
        4: '-ші',
        5: '-ші',
        6: '-шы',
        7: '-ші',
        8: '-ші',
        9: '-шы',
        10: '-шы',
        20: '-шы',
        30: '-шы',
        40: '-шы',
        50: '-ші',
        60: '-шы',
        70: '-ші',
        80: '-ші',
        90: '-шы',
        100: '-ші'
    };

    var kk = moment.defineLocale('kk', {
        months: 'қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан'.split('_'),
        monthsShort: 'қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел'.split('_'),
        weekdays: 'жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі'.split('_'),
        weekdaysShort: 'жек_дүй_сей_сәр_бей_жұм_сен'.split('_'),
        weekdaysMin: 'жк_дй_сй_ср_бй_жм_сн'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Бүгін сағат] LT',
            nextDay: '[Ертең сағат] LT',
            nextWeek: 'dddd [сағат] LT',
            lastDay: '[Кеше сағат] LT',
            lastWeek: '[Өткен аптаның] dddd [сағат] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s ішінде',
            past: '%s бұрын',
            s: 'бірнеше секунд',
            m: 'бір минут',
            mm: '%d минут',
            h: 'бір сағат',
            hh: '%d сағат',
            d: 'бір күн',
            dd: '%d күн',
            M: 'бір ай',
            MM: '%d ай',
            y: 'бір жыл',
            yy: '%d жыл'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(ші|шы)/,
        ordinal: function ordinal(number) {
            var a = number % 10,
                b = number >= 100 ? 100 : null;
            return number + (suffixes[number] || suffixes[a] || suffixes[b]);
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return kk;
});

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Cambodian [km]
//! author : Kruy Vanna : https://github.com/kruyvanna

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var km = moment.defineLocale('km', {
        months: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
        monthsShort: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
        weekdays: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
        weekdaysShort: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
        weekdaysMin: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[ថ្ងៃនេះ ម៉ោង] LT',
            nextDay: '[ស្អែក ម៉ោង] LT',
            nextWeek: 'dddd [ម៉ោង] LT',
            lastDay: '[ម្សិលមិញ ម៉ោង] LT',
            lastWeek: 'dddd [សប្តាហ៍មុន] [ម៉ោង] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%sទៀត',
            past: '%sមុន',
            s: 'ប៉ុន្មានវិនាទី',
            m: 'មួយនាទី',
            mm: '%d នាទី',
            h: 'មួយម៉ោង',
            hh: '%d ម៉ោង',
            d: 'មួយថ្ងៃ',
            dd: '%d ថ្ងៃ',
            M: 'មួយខែ',
            MM: '%d ខែ',
            y: 'មួយឆ្នាំ',
            yy: '%d ឆ្នាំ'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return km;
});

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Kannada [kn]
//! author : Rajeev Naik : https://github.com/rajeevnaikte

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '೧',
        '2': '೨',
        '3': '೩',
        '4': '೪',
        '5': '೫',
        '6': '೬',
        '7': '೭',
        '8': '೮',
        '9': '೯',
        '0': '೦'
    };
    var numberMap = {
        '೧': '1',
        '೨': '2',
        '೩': '3',
        '೪': '4',
        '೫': '5',
        '೬': '6',
        '೭': '7',
        '೮': '8',
        '೯': '9',
        '೦': '0'
    };

    var kn = moment.defineLocale('kn', {
        months: 'ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್'.split('_'),
        monthsShort: 'ಜನ_ಫೆಬ್ರ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬ_ಅಕ್ಟೋಬ_ನವೆಂಬ_ಡಿಸೆಂಬ'.split('_'),
        monthsParseExact: true,
        weekdays: 'ಭಾನುವಾರ_ಸೋಮವಾರ_ಮಂಗಳವಾರ_ಬುಧವಾರ_ಗುರುವಾರ_ಶುಕ್ರವಾರ_ಶನಿವಾರ'.split('_'),
        weekdaysShort: 'ಭಾನು_ಸೋಮ_ಮಂಗಳ_ಬುಧ_ಗುರು_ಶುಕ್ರ_ಶನಿ'.split('_'),
        weekdaysMin: 'ಭಾ_ಸೋ_ಮಂ_ಬು_ಗು_ಶು_ಶ'.split('_'),
        longDateFormat: {
            LT: 'A h:mm',
            LTS: 'A h:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, A h:mm',
            LLLL: 'dddd, D MMMM YYYY, A h:mm'
        },
        calendar: {
            sameDay: '[ಇಂದು] LT',
            nextDay: '[ನಾಳೆ] LT',
            nextWeek: 'dddd, LT',
            lastDay: '[ನಿನ್ನೆ] LT',
            lastWeek: '[ಕೊನೆಯ] dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s ನಂತರ',
            past: '%s ಹಿಂದೆ',
            s: 'ಕೆಲವು ಕ್ಷಣಗಳು',
            m: 'ಒಂದು ನಿಮಿಷ',
            mm: '%d ನಿಮಿಷ',
            h: 'ಒಂದು ಗಂಟೆ',
            hh: '%d ಗಂಟೆ',
            d: 'ಒಂದು ದಿನ',
            dd: '%d ದಿನ',
            M: 'ಒಂದು ತಿಂಗಳು',
            MM: '%d ತಿಂಗಳು',
            y: 'ಒಂದು ವರ್ಷ',
            yy: '%d ವರ್ಷ'
        },
        preparse: function preparse(string) {
            return string.replace(/[೧೨೩೪೫೬೭೮೯೦]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function postformat(string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        meridiemParse: /ರಾತ್ರಿ|ಬೆಳಿಗ್ಗೆ|ಮಧ್ಯಾಹ್ನ|ಸಂಜೆ/,
        meridiemHour: function meridiemHour(hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'ರಾತ್ರಿ') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'ಬೆಳಿಗ್ಗೆ') {
                return hour;
            } else if (meridiem === 'ಮಧ್ಯಾಹ್ನ') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'ಸಂಜೆ') {
                return hour + 12;
            }
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 4) {
                return 'ರಾತ್ರಿ';
            } else if (hour < 10) {
                return 'ಬೆಳಿಗ್ಗೆ';
            } else if (hour < 17) {
                return 'ಮಧ್ಯಾಹ್ನ';
            } else if (hour < 20) {
                return 'ಸಂಜೆ';
            } else {
                return 'ರಾತ್ರಿ';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ನೇ)/,
        ordinal: function ordinal(number) {
            return number + 'ನೇ';
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return kn;
});

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Korean [ko]
//! author : Kyungwook, Park : https://github.com/kyungw00k
//! author : Jeeeyul Lee <jeeeyul@gmail.com>

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var ko = moment.defineLocale('ko', {
        months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
        monthsShort: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
        weekdays: '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
        weekdaysShort: '일_월_화_수_목_금_토'.split('_'),
        weekdaysMin: '일_월_화_수_목_금_토'.split('_'),
        longDateFormat: {
            LT: 'A h:mm',
            LTS: 'A h:mm:ss',
            L: 'YYYY.MM.DD',
            LL: 'YYYY년 MMMM D일',
            LLL: 'YYYY년 MMMM D일 A h:mm',
            LLLL: 'YYYY년 MMMM D일 dddd A h:mm',
            l: 'YYYY.MM.DD',
            ll: 'YYYY년 MMMM D일',
            lll: 'YYYY년 MMMM D일 A h:mm',
            llll: 'YYYY년 MMMM D일 dddd A h:mm'
        },
        calendar: {
            sameDay: '오늘 LT',
            nextDay: '내일 LT',
            nextWeek: 'dddd LT',
            lastDay: '어제 LT',
            lastWeek: '지난주 dddd LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s 후',
            past: '%s 전',
            s: '몇 초',
            ss: '%d초',
            m: '1분',
            mm: '%d분',
            h: '한 시간',
            hh: '%d시간',
            d: '하루',
            dd: '%d일',
            M: '한 달',
            MM: '%d달',
            y: '일 년',
            yy: '%d년'
        },
        dayOfMonthOrdinalParse: /\d{1,2}일/,
        ordinal: '%d일',
        meridiemParse: /오전|오후/,
        isPM: function isPM(token) {
            return token === '오후';
        },
        meridiem: function meridiem(hour, minute, isUpper) {
            return hour < 12 ? '오전' : '오후';
        }
    });

    return ko;
});

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Kyrgyz [ky]
//! author : Chyngyz Arystan uulu : https://github.com/chyngyz

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var suffixes = {
        0: '-чү',
        1: '-чи',
        2: '-чи',
        3: '-чү',
        4: '-чү',
        5: '-чи',
        6: '-чы',
        7: '-чи',
        8: '-чи',
        9: '-чу',
        10: '-чу',
        20: '-чы',
        30: '-чу',
        40: '-чы',
        50: '-чү',
        60: '-чы',
        70: '-чи',
        80: '-чи',
        90: '-чу',
        100: '-чү'
    };

    var ky = moment.defineLocale('ky', {
        months: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
        monthsShort: 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
        weekdays: 'Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби'.split('_'),
        weekdaysShort: 'Жек_Дүй_Шей_Шар_Бей_Жум_Ише'.split('_'),
        weekdaysMin: 'Жк_Дй_Шй_Шр_Бй_Жм_Иш'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Бүгүн саат] LT',
            nextDay: '[Эртең саат] LT',
            nextWeek: 'dddd [саат] LT',
            lastDay: '[Кече саат] LT',
            lastWeek: '[Өткен аптанын] dddd [күнү] [саат] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s ичинде',
            past: '%s мурун',
            s: 'бирнече секунд',
            m: 'бир мүнөт',
            mm: '%d мүнөт',
            h: 'бир саат',
            hh: '%d саат',
            d: 'бир күн',
            dd: '%d күн',
            M: 'бир ай',
            MM: '%d ай',
            y: 'бир жыл',
            yy: '%d жыл'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(чи|чы|чү|чу)/,
        ordinal: function ordinal(number) {
            var a = number % 10,
                b = number >= 100 ? 100 : null;
            return number + (suffixes[number] || suffixes[a] || suffixes[b]);
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ky;
});

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Luxembourgish [lb]
//! author : mweimerskirch : https://github.com/mweimerskirch
//! author : David Raison : https://github.com/kwisatz

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eng Minutt', 'enger Minutt'],
            'h': ['eng Stonn', 'enger Stonn'],
            'd': ['een Dag', 'engem Dag'],
            'M': ['ee Mount', 'engem Mount'],
            'y': ['ee Joer', 'engem Joer']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }
    function processFutureTime(string) {
        var number = string.substr(0, string.indexOf(' '));
        if (eifelerRegelAppliesToNumber(number)) {
            return 'a ' + string;
        }
        return 'an ' + string;
    }
    function processPastTime(string) {
        var number = string.substr(0, string.indexOf(' '));
        if (eifelerRegelAppliesToNumber(number)) {
            return 'viru ' + string;
        }
        return 'virun ' + string;
    }
    /**
     * Returns true if the word before the given number loses the '-n' ending.
     * e.g. 'an 10 Deeg' but 'a 5 Deeg'
     *
     * @param number {integer}
     * @returns {boolean}
     */
    function eifelerRegelAppliesToNumber(number) {
        number = parseInt(number, 10);
        if (isNaN(number)) {
            return false;
        }
        if (number < 0) {
            // Negative Number --> always true
            return true;
        } else if (number < 10) {
            // Only 1 digit
            if (4 <= number && number <= 7) {
                return true;
            }
            return false;
        } else if (number < 100) {
            // 2 digits
            var lastDigit = number % 10,
                firstDigit = number / 10;
            if (lastDigit === 0) {
                return eifelerRegelAppliesToNumber(firstDigit);
            }
            return eifelerRegelAppliesToNumber(lastDigit);
        } else if (number < 10000) {
            // 3 or 4 digits --> recursively check first digit
            while (number >= 10) {
                number = number / 10;
            }
            return eifelerRegelAppliesToNumber(number);
        } else {
            // Anything larger than 4 digits: recursively check first n-3 digits
            number = number / 1000;
            return eifelerRegelAppliesToNumber(number);
        }
    }

    var lb = moment.defineLocale('lb', {
        months: 'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
        monthsParseExact: true,
        weekdays: 'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
        weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
        weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm [Auer]',
            LTS: 'H:mm:ss [Auer]',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm [Auer]',
            LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
        },
        calendar: {
            sameDay: '[Haut um] LT',
            sameElse: 'L',
            nextDay: '[Muer um] LT',
            nextWeek: 'dddd [um] LT',
            lastDay: '[Gëschter um] LT',
            lastWeek: function lastWeek() {
                // Different date string for 'Dënschdeg' (Tuesday) and 'Donneschdeg' (Thursday) due to phonological rule
                switch (this.day()) {
                    case 2:
                    case 4:
                        return '[Leschten] dddd [um] LT';
                    default:
                        return '[Leschte] dddd [um] LT';
                }
            }
        },
        relativeTime: {
            future: processFutureTime,
            past: processPastTime,
            s: 'e puer Sekonnen',
            m: processRelativeTime,
            mm: '%d Minutten',
            h: processRelativeTime,
            hh: '%d Stonnen',
            d: processRelativeTime,
            dd: '%d Deeg',
            M: processRelativeTime,
            MM: '%d Méint',
            y: processRelativeTime,
            yy: '%d Joer'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return lb;
});

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Lao [lo]
//! author : Ryan Hart : https://github.com/ryanhart2

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var lo = moment.defineLocale('lo', {
        months: 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
        monthsShort: 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
        weekdays: 'ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
        weekdaysShort: 'ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
        weekdaysMin: 'ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'ວັນdddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
        isPM: function isPM(input) {
            return input === 'ຕອນແລງ';
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 12) {
                return 'ຕອນເຊົ້າ';
            } else {
                return 'ຕອນແລງ';
            }
        },
        calendar: {
            sameDay: '[ມື້ນີ້ເວລາ] LT',
            nextDay: '[ມື້ອື່ນເວລາ] LT',
            nextWeek: '[ວັນ]dddd[ໜ້າເວລາ] LT',
            lastDay: '[ມື້ວານນີ້ເວລາ] LT',
            lastWeek: '[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'ອີກ %s',
            past: '%sຜ່ານມາ',
            s: 'ບໍ່ເທົ່າໃດວິນາທີ',
            m: '1 ນາທີ',
            mm: '%d ນາທີ',
            h: '1 ຊົ່ວໂມງ',
            hh: '%d ຊົ່ວໂມງ',
            d: '1 ມື້',
            dd: '%d ມື້',
            M: '1 ເດືອນ',
            MM: '%d ເດືອນ',
            y: '1 ປີ',
            yy: '%d ປີ'
        },
        dayOfMonthOrdinalParse: /(ທີ່)\d{1,2}/,
        ordinal: function ordinal(number) {
            return 'ທີ່' + number;
        }
    });

    return lo;
});

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Lithuanian [lt]
//! author : Mindaugas Mozūras : https://github.com/mmozuras

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var units = {
        'm': 'minutė_minutės_minutę',
        'mm': 'minutės_minučių_minutes',
        'h': 'valanda_valandos_valandą',
        'hh': 'valandos_valandų_valandas',
        'd': 'diena_dienos_dieną',
        'dd': 'dienos_dienų_dienas',
        'M': 'mėnuo_mėnesio_mėnesį',
        'MM': 'mėnesiai_mėnesių_mėnesius',
        'y': 'metai_metų_metus',
        'yy': 'metai_metų_metus'
    };
    function translateSeconds(number, withoutSuffix, key, isFuture) {
        if (withoutSuffix) {
            return 'kelios sekundės';
        } else {
            return isFuture ? 'kelių sekundžių' : 'kelias sekundes';
        }
    }
    function translateSingular(number, withoutSuffix, key, isFuture) {
        return withoutSuffix ? forms(key)[0] : isFuture ? forms(key)[1] : forms(key)[2];
    }
    function special(number) {
        return number % 10 === 0 || number > 10 && number < 20;
    }
    function forms(key) {
        return units[key].split('_');
    }
    function translate(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        if (number === 1) {
            return result + translateSingular(number, withoutSuffix, key[0], isFuture);
        } else if (withoutSuffix) {
            return result + (special(number) ? forms(key)[1] : forms(key)[0]);
        } else {
            if (isFuture) {
                return result + forms(key)[1];
            } else {
                return result + (special(number) ? forms(key)[1] : forms(key)[2]);
            }
        }
    }
    var lt = moment.defineLocale('lt', {
        months: {
            format: 'sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio'.split('_'),
            standalone: 'sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis'.split('_'),
            isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
        },
        monthsShort: 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
        weekdays: {
            format: 'sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį'.split('_'),
            standalone: 'sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis'.split('_'),
            isFormat: /dddd HH:mm/
        },
        weekdaysShort: 'Sek_Pir_Ant_Tre_Ket_Pen_Šeš'.split('_'),
        weekdaysMin: 'S_P_A_T_K_Pn_Š'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY-MM-DD',
            LL: 'YYYY [m.] MMMM D [d.]',
            LLL: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
            LLLL: 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
            l: 'YYYY-MM-DD',
            ll: 'YYYY [m.] MMMM D [d.]',
            lll: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
            llll: 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
        },
        calendar: {
            sameDay: '[Šiandien] LT',
            nextDay: '[Rytoj] LT',
            nextWeek: 'dddd LT',
            lastDay: '[Vakar] LT',
            lastWeek: '[Praėjusį] dddd LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'po %s',
            past: 'prieš %s',
            s: translateSeconds,
            m: translateSingular,
            mm: translate,
            h: translateSingular,
            hh: translate,
            d: translateSingular,
            dd: translate,
            M: translateSingular,
            MM: translate,
            y: translateSingular,
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}-oji/,
        ordinal: function ordinal(number) {
            return number + '-oji';
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return lt;
});

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Latvian [lv]
//! author : Kristaps Karlsons : https://github.com/skakri
//! author : Jānis Elmeris : https://github.com/JanisE

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var units = {
        'm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
        'mm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
        'h': 'stundas_stundām_stunda_stundas'.split('_'),
        'hh': 'stundas_stundām_stunda_stundas'.split('_'),
        'd': 'dienas_dienām_diena_dienas'.split('_'),
        'dd': 'dienas_dienām_diena_dienas'.split('_'),
        'M': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
        'MM': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
        'y': 'gada_gadiem_gads_gadi'.split('_'),
        'yy': 'gada_gadiem_gads_gadi'.split('_')
    };
    /**
     * @param withoutSuffix boolean true = a length of time; false = before/after a period of time.
     */
    function format(forms, number, withoutSuffix) {
        if (withoutSuffix) {
            // E.g. "21 minūte", "3 minūtes".
            return number % 10 === 1 && number % 100 !== 11 ? forms[2] : forms[3];
        } else {
            // E.g. "21 minūtes" as in "pēc 21 minūtes".
            // E.g. "3 minūtēm" as in "pēc 3 minūtēm".
            return number % 10 === 1 && number % 100 !== 11 ? forms[0] : forms[1];
        }
    }
    function relativeTimeWithPlural(number, withoutSuffix, key) {
        return number + ' ' + format(units[key], number, withoutSuffix);
    }
    function relativeTimeWithSingular(number, withoutSuffix, key) {
        return format(units[key], number, withoutSuffix);
    }
    function relativeSeconds(number, withoutSuffix) {
        return withoutSuffix ? 'dažas sekundes' : 'dažām sekundēm';
    }

    var lv = moment.defineLocale('lv', {
        months: 'janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
        monthsShort: 'jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec'.split('_'),
        weekdays: 'svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena'.split('_'),
        weekdaysShort: 'Sv_P_O_T_C_Pk_S'.split('_'),
        weekdaysMin: 'Sv_P_O_T_C_Pk_S'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY.',
            LL: 'YYYY. [gada] D. MMMM',
            LLL: 'YYYY. [gada] D. MMMM, HH:mm',
            LLLL: 'YYYY. [gada] D. MMMM, dddd, HH:mm'
        },
        calendar: {
            sameDay: '[Šodien pulksten] LT',
            nextDay: '[Rīt pulksten] LT',
            nextWeek: 'dddd [pulksten] LT',
            lastDay: '[Vakar pulksten] LT',
            lastWeek: '[Pagājušā] dddd [pulksten] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'pēc %s',
            past: 'pirms %s',
            s: relativeSeconds,
            m: relativeTimeWithSingular,
            mm: relativeTimeWithPlural,
            h: relativeTimeWithSingular,
            hh: relativeTimeWithPlural,
            d: relativeTimeWithSingular,
            dd: relativeTimeWithPlural,
            M: relativeTimeWithSingular,
            MM: relativeTimeWithPlural,
            y: relativeTimeWithSingular,
            yy: relativeTimeWithPlural
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return lv;
});

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Montenegrin [me]
//! author : Miodrag Nikač <miodrag@restartit.me> : https://github.com/miodragnikac

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var translator = {
        words: { //Different grammatical cases
            m: ['jedan minut', 'jednog minuta'],
            mm: ['minut', 'minuta', 'minuta'],
            h: ['jedan sat', 'jednog sata'],
            hh: ['sat', 'sata', 'sati'],
            dd: ['dan', 'dana', 'dana'],
            MM: ['mjesec', 'mjeseca', 'mjeseci'],
            yy: ['godina', 'godine', 'godina']
        },
        correctGrammaticalCase: function correctGrammaticalCase(number, wordKey) {
            return number === 1 ? wordKey[0] : number >= 2 && number <= 4 ? wordKey[1] : wordKey[2];
        },
        translate: function translate(number, withoutSuffix, key) {
            var wordKey = translator.words[key];
            if (key.length === 1) {
                return withoutSuffix ? wordKey[0] : wordKey[1];
            } else {
                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
            }
        }
    };

    var me = moment.defineLocale('me', {
        months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
        monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
        weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[danas u] LT',
            nextDay: '[sjutra u] LT',

            nextWeek: function nextWeek() {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedjelju] [u] LT';
                    case 3:
                        return '[u] [srijedu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay: '[juče u] LT',
            lastWeek: function lastWeek() {
                var lastWeekDays = ['[prošle] [nedjelje] [u] LT', '[prošlog] [ponedjeljka] [u] LT', '[prošlog] [utorka] [u] LT', '[prošle] [srijede] [u] LT', '[prošlog] [četvrtka] [u] LT', '[prošlog] [petka] [u] LT', '[prošle] [subote] [u] LT'];
                return lastWeekDays[this.day()];
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'za %s',
            past: 'prije %s',
            s: 'nekoliko sekundi',
            m: translator.translate,
            mm: translator.translate,
            h: translator.translate,
            hh: translator.translate,
            d: 'dan',
            dd: translator.translate,
            M: 'mjesec',
            MM: translator.translate,
            y: 'godinu',
            yy: translator.translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return me;
});

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Maori [mi]
//! author : John Corrigan <robbiecloset@gmail.com> : https://github.com/johnideal

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var mi = moment.defineLocale('mi', {
        months: 'Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea'.split('_'),
        monthsShort: 'Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki'.split('_'),
        monthsRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsShortRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsShortStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,
        weekdays: 'Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei'.split('_'),
        weekdaysShort: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
        weekdaysMin: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY [i] HH:mm',
            LLLL: 'dddd, D MMMM YYYY [i] HH:mm'
        },
        calendar: {
            sameDay: '[i teie mahana, i] LT',
            nextDay: '[apopo i] LT',
            nextWeek: 'dddd [i] LT',
            lastDay: '[inanahi i] LT',
            lastWeek: 'dddd [whakamutunga i] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'i roto i %s',
            past: '%s i mua',
            s: 'te hēkona ruarua',
            m: 'he meneti',
            mm: '%d meneti',
            h: 'te haora',
            hh: '%d haora',
            d: 'he ra',
            dd: '%d ra',
            M: 'he marama',
            MM: '%d marama',
            y: 'he tau',
            yy: '%d tau'
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: '%dº',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return mi;
});

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Macedonian [mk]
//! author : Borislav Mickov : https://github.com/B0k0

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var mk = moment.defineLocale('mk', {
        months: 'јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември'.split('_'),
        monthsShort: 'јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек'.split('_'),
        weekdays: 'недела_понеделник_вторник_среда_четврток_петок_сабота'.split('_'),
        weekdaysShort: 'нед_пон_вто_сре_чет_пет_саб'.split('_'),
        weekdaysMin: 'нe_пo_вт_ср_че_пе_сa'.split('_'),
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'D.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY H:mm',
            LLLL: 'dddd, D MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[Денес во] LT',
            nextDay: '[Утре во] LT',
            nextWeek: '[Во] dddd [во] LT',
            lastDay: '[Вчера во] LT',
            lastWeek: function lastWeek() {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 6:
                        return '[Изминатата] dddd [во] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[Изминатиот] dddd [во] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'после %s',
            past: 'пред %s',
            s: 'неколку секунди',
            m: 'минута',
            mm: '%d минути',
            h: 'час',
            hh: '%d часа',
            d: 'ден',
            dd: '%d дена',
            M: 'месец',
            MM: '%d месеци',
            y: 'година',
            yy: '%d години'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
        ordinal: function ordinal(number) {
            var lastDigit = number % 10,
                last2Digits = number % 100;
            if (number === 0) {
                return number + '-ев';
            } else if (last2Digits === 0) {
                return number + '-ен';
            } else if (last2Digits > 10 && last2Digits < 20) {
                return number + '-ти';
            } else if (lastDigit === 1) {
                return number + '-ви';
            } else if (lastDigit === 2) {
                return number + '-ри';
            } else if (lastDigit === 7 || lastDigit === 8) {
                return number + '-ми';
            } else {
                return number + '-ти';
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return mk;
});

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Malayalam [ml]
//! author : Floyd Pink : https://github.com/floydpink

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var ml = moment.defineLocale('ml', {
        months: 'ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ'.split('_'),
        monthsShort: 'ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.'.split('_'),
        monthsParseExact: true,
        weekdays: 'ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച'.split('_'),
        weekdaysShort: 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split('_'),
        weekdaysMin: 'ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ'.split('_'),
        longDateFormat: {
            LT: 'A h:mm -നു',
            LTS: 'A h:mm:ss -നു',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, A h:mm -നു',
            LLLL: 'dddd, D MMMM YYYY, A h:mm -നു'
        },
        calendar: {
            sameDay: '[ഇന്ന്] LT',
            nextDay: '[നാളെ] LT',
            nextWeek: 'dddd, LT',
            lastDay: '[ഇന്നലെ] LT',
            lastWeek: '[കഴിഞ്ഞ] dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s കഴിഞ്ഞ്',
            past: '%s മുൻപ്',
            s: 'അൽപ നിമിഷങ്ങൾ',
            m: 'ഒരു മിനിറ്റ്',
            mm: '%d മിനിറ്റ്',
            h: 'ഒരു മണിക്കൂർ',
            hh: '%d മണിക്കൂർ',
            d: 'ഒരു ദിവസം',
            dd: '%d ദിവസം',
            M: 'ഒരു മാസം',
            MM: '%d മാസം',
            y: 'ഒരു വർഷം',
            yy: '%d വർഷം'
        },
        meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
        meridiemHour: function meridiemHour(hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'രാത്രി' && hour >= 4 || meridiem === 'ഉച്ച കഴിഞ്ഞ്' || meridiem === 'വൈകുന്നേരം') {
                return hour + 12;
            } else {
                return hour;
            }
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 4) {
                return 'രാത്രി';
            } else if (hour < 12) {
                return 'രാവിലെ';
            } else if (hour < 17) {
                return 'ഉച്ച കഴിഞ്ഞ്';
            } else if (hour < 20) {
                return 'വൈകുന്നേരം';
            } else {
                return 'രാത്രി';
            }
        }
    });

    return ml;
});

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Marathi [mr]
//! author : Harshad Kale : https://github.com/kalehv
//! author : Vivek Athalye : https://github.com/vnathalye

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '१',
        '2': '२',
        '3': '३',
        '4': '४',
        '5': '५',
        '6': '६',
        '7': '७',
        '8': '८',
        '9': '९',
        '0': '०'
    };
    var numberMap = {
        '१': '1',
        '२': '2',
        '३': '3',
        '४': '4',
        '५': '5',
        '६': '6',
        '७': '7',
        '८': '8',
        '९': '9',
        '०': '0'
    };

    function relativeTimeMr(number, withoutSuffix, string, isFuture) {
        var output = '';
        if (withoutSuffix) {
            switch (string) {
                case 's':
                    output = 'काही सेकंद';break;
                case 'm':
                    output = 'एक मिनिट';break;
                case 'mm':
                    output = '%d मिनिटे';break;
                case 'h':
                    output = 'एक तास';break;
                case 'hh':
                    output = '%d तास';break;
                case 'd':
                    output = 'एक दिवस';break;
                case 'dd':
                    output = '%d दिवस';break;
                case 'M':
                    output = 'एक महिना';break;
                case 'MM':
                    output = '%d महिने';break;
                case 'y':
                    output = 'एक वर्ष';break;
                case 'yy':
                    output = '%d वर्षे';break;
            }
        } else {
            switch (string) {
                case 's':
                    output = 'काही सेकंदां';break;
                case 'm':
                    output = 'एका मिनिटा';break;
                case 'mm':
                    output = '%d मिनिटां';break;
                case 'h':
                    output = 'एका तासा';break;
                case 'hh':
                    output = '%d तासां';break;
                case 'd':
                    output = 'एका दिवसा';break;
                case 'dd':
                    output = '%d दिवसां';break;
                case 'M':
                    output = 'एका महिन्या';break;
                case 'MM':
                    output = '%d महिन्यां';break;
                case 'y':
                    output = 'एका वर्षा';break;
                case 'yy':
                    output = '%d वर्षां';break;
            }
        }
        return output.replace(/%d/i, number);
    }

    var mr = moment.defineLocale('mr', {
        months: 'जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर'.split('_'),
        monthsShort: 'जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.'.split('_'),
        monthsParseExact: true,
        weekdays: 'रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
        weekdaysShort: 'रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि'.split('_'),
        weekdaysMin: 'र_सो_मं_बु_गु_शु_श'.split('_'),
        longDateFormat: {
            LT: 'A h:mm वाजता',
            LTS: 'A h:mm:ss वाजता',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, A h:mm वाजता',
            LLLL: 'dddd, D MMMM YYYY, A h:mm वाजता'
        },
        calendar: {
            sameDay: '[आज] LT',
            nextDay: '[उद्या] LT',
            nextWeek: 'dddd, LT',
            lastDay: '[काल] LT',
            lastWeek: '[मागील] dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%sमध्ये',
            past: '%sपूर्वी',
            s: relativeTimeMr,
            m: relativeTimeMr,
            mm: relativeTimeMr,
            h: relativeTimeMr,
            hh: relativeTimeMr,
            d: relativeTimeMr,
            dd: relativeTimeMr,
            M: relativeTimeMr,
            MM: relativeTimeMr,
            y: relativeTimeMr,
            yy: relativeTimeMr
        },
        preparse: function preparse(string) {
            return string.replace(/[१२३४५६७८९०]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function postformat(string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
        meridiemHour: function meridiemHour(hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'रात्री') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'सकाळी') {
                return hour;
            } else if (meridiem === 'दुपारी') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'सायंकाळी') {
                return hour + 12;
            }
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 4) {
                return 'रात्री';
            } else if (hour < 10) {
                return 'सकाळी';
            } else if (hour < 17) {
                return 'दुपारी';
            } else if (hour < 20) {
                return 'सायंकाळी';
            } else {
                return 'रात्री';
            }
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return mr;
});

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Malay [ms]
//! author : Weldan Jamili : https://github.com/weldan

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var ms = moment.defineLocale('ms', {
        months: 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
        monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
        weekdays: 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
        weekdaysShort: 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
        weekdaysMin: 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
        longDateFormat: {
            LT: 'HH.mm',
            LTS: 'HH.mm.ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY [pukul] HH.mm',
            LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /pagi|tengahari|petang|malam/,
        meridiemHour: function meridiemHour(hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'pagi') {
                return hour;
            } else if (meridiem === 'tengahari') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'petang' || meridiem === 'malam') {
                return hour + 12;
            }
        },
        meridiem: function meridiem(hours, minutes, isLower) {
            if (hours < 11) {
                return 'pagi';
            } else if (hours < 15) {
                return 'tengahari';
            } else if (hours < 19) {
                return 'petang';
            } else {
                return 'malam';
            }
        },
        calendar: {
            sameDay: '[Hari ini pukul] LT',
            nextDay: '[Esok pukul] LT',
            nextWeek: 'dddd [pukul] LT',
            lastDay: '[Kelmarin pukul] LT',
            lastWeek: 'dddd [lepas pukul] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'dalam %s',
            past: '%s yang lepas',
            s: 'beberapa saat',
            m: 'seminit',
            mm: '%d minit',
            h: 'sejam',
            hh: '%d jam',
            d: 'sehari',
            dd: '%d hari',
            M: 'sebulan',
            MM: '%d bulan',
            y: 'setahun',
            yy: '%d tahun'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ms;
});

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Malay [ms-my]
//! note : DEPRECATED, the correct one is [ms]
//! author : Weldan Jamili : https://github.com/weldan

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var msMy = moment.defineLocale('ms-my', {
        months: 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
        monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
        weekdays: 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
        weekdaysShort: 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
        weekdaysMin: 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
        longDateFormat: {
            LT: 'HH.mm',
            LTS: 'HH.mm.ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY [pukul] HH.mm',
            LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /pagi|tengahari|petang|malam/,
        meridiemHour: function meridiemHour(hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'pagi') {
                return hour;
            } else if (meridiem === 'tengahari') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'petang' || meridiem === 'malam') {
                return hour + 12;
            }
        },
        meridiem: function meridiem(hours, minutes, isLower) {
            if (hours < 11) {
                return 'pagi';
            } else if (hours < 15) {
                return 'tengahari';
            } else if (hours < 19) {
                return 'petang';
            } else {
                return 'malam';
            }
        },
        calendar: {
            sameDay: '[Hari ini pukul] LT',
            nextDay: '[Esok pukul] LT',
            nextWeek: 'dddd [pukul] LT',
            lastDay: '[Kelmarin pukul] LT',
            lastWeek: 'dddd [lepas pukul] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'dalam %s',
            past: '%s yang lepas',
            s: 'beberapa saat',
            m: 'seminit',
            mm: '%d minit',
            h: 'sejam',
            hh: '%d jam',
            d: 'sehari',
            dd: '%d hari',
            M: 'sebulan',
            MM: '%d bulan',
            y: 'setahun',
            yy: '%d tahun'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return msMy;
});

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Burmese [my]
//! author : Squar team, mysquar.com
//! author : David Rossellat : https://github.com/gholadr
//! author : Tin Aung Lin : https://github.com/thanyawzinmin

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '၁',
        '2': '၂',
        '3': '၃',
        '4': '၄',
        '5': '၅',
        '6': '၆',
        '7': '၇',
        '8': '၈',
        '9': '၉',
        '0': '၀'
    };
    var numberMap = {
        '၁': '1',
        '၂': '2',
        '၃': '3',
        '၄': '4',
        '၅': '5',
        '၆': '6',
        '၇': '7',
        '၈': '8',
        '၉': '9',
        '၀': '0'
    };

    var my = moment.defineLocale('my', {
        months: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split('_'),
        monthsShort: 'ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ'.split('_'),
        weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split('_'),
        weekdaysShort: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
        weekdaysMin: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),

        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[ယနေ.] LT [မှာ]',
            nextDay: '[မနက်ဖြန်] LT [မှာ]',
            nextWeek: 'dddd LT [မှာ]',
            lastDay: '[မနေ.က] LT [မှာ]',
            lastWeek: '[ပြီးခဲ့သော] dddd LT [မှာ]',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'လာမည့် %s မှာ',
            past: 'လွန်ခဲ့သော %s က',
            s: 'စက္ကန်.အနည်းငယ်',
            m: 'တစ်မိနစ်',
            mm: '%d မိနစ်',
            h: 'တစ်နာရီ',
            hh: '%d နာရီ',
            d: 'တစ်ရက်',
            dd: '%d ရက်',
            M: 'တစ်လ',
            MM: '%d လ',
            y: 'တစ်နှစ်',
            yy: '%d နှစ်'
        },
        preparse: function preparse(string) {
            return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function postformat(string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return my;
});

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Norwegian Bokmål [nb]
//! authors : Espen Hovlandsdal : https://github.com/rexxars
//!           Sigurd Gartmann : https://github.com/sigurdga

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var nb = moment.defineLocale('nb', {
        months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
        monthsShort: 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
        monthsParseExact: true,
        weekdays: 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
        weekdaysShort: 'sø._ma._ti._on._to._fr._lø.'.split('_'),
        weekdaysMin: 'sø_ma_ti_on_to_fr_lø'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY [kl.] HH:mm',
            LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm'
        },
        calendar: {
            sameDay: '[i dag kl.] LT',
            nextDay: '[i morgen kl.] LT',
            nextWeek: 'dddd [kl.] LT',
            lastDay: '[i går kl.] LT',
            lastWeek: '[forrige] dddd [kl.] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'om %s',
            past: '%s siden',
            s: 'noen sekunder',
            m: 'ett minutt',
            mm: '%d minutter',
            h: 'en time',
            hh: '%d timer',
            d: 'en dag',
            dd: '%d dager',
            M: 'en måned',
            MM: '%d måneder',
            y: 'ett år',
            yy: '%d år'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return nb;
});

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Nepalese [ne]
//! author : suvash : https://github.com/suvash

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '१',
        '2': '२',
        '3': '३',
        '4': '४',
        '5': '५',
        '6': '६',
        '7': '७',
        '8': '८',
        '9': '९',
        '0': '०'
    };
    var numberMap = {
        '१': '1',
        '२': '2',
        '३': '3',
        '४': '4',
        '५': '5',
        '६': '6',
        '७': '7',
        '८': '8',
        '९': '9',
        '०': '0'
    };

    var ne = moment.defineLocale('ne', {
        months: 'जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split('_'),
        monthsShort: 'जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.'.split('_'),
        monthsParseExact: true,
        weekdays: 'आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार'.split('_'),
        weekdaysShort: 'आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.'.split('_'),
        weekdaysMin: 'आ._सो._मं._बु._बि._शु._श.'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'Aको h:mm बजे',
            LTS: 'Aको h:mm:ss बजे',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, Aको h:mm बजे',
            LLLL: 'dddd, D MMMM YYYY, Aको h:mm बजे'
        },
        preparse: function preparse(string) {
            return string.replace(/[१२३४५६७८९०]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function postformat(string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
        meridiemHour: function meridiemHour(hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'राति') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'बिहान') {
                return hour;
            } else if (meridiem === 'दिउँसो') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'साँझ') {
                return hour + 12;
            }
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 3) {
                return 'राति';
            } else if (hour < 12) {
                return 'बिहान';
            } else if (hour < 16) {
                return 'दिउँसो';
            } else if (hour < 20) {
                return 'साँझ';
            } else {
                return 'राति';
            }
        },
        calendar: {
            sameDay: '[आज] LT',
            nextDay: '[भोलि] LT',
            nextWeek: '[आउँदो] dddd[,] LT',
            lastDay: '[हिजो] LT',
            lastWeek: '[गएको] dddd[,] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%sमा',
            past: '%s अगाडि',
            s: 'केही क्षण',
            m: 'एक मिनेट',
            mm: '%d मिनेट',
            h: 'एक घण्टा',
            hh: '%d घण्टा',
            d: 'एक दिन',
            dd: '%d दिन',
            M: 'एक महिना',
            MM: '%d महिना',
            y: 'एक बर्ष',
            yy: '%d बर्ष'
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ne;
});

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Dutch [nl]
//! author : Joris Röling : https://github.com/jorisroling
//! author : Jacob Middag : https://github.com/middagj

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_');
    var monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

    var monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
    var monthsRegex = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

    var nl = moment.defineLocale('nl', {
        months: 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
        monthsShort: function monthsShort(m, format) {
            if (!m) {
                return monthsShortWithDots;
            } else if (/-MMM-/.test(format)) {
                return monthsShortWithoutDots[m.month()];
            } else {
                return monthsShortWithDots[m.month()];
            }
        },

        monthsRegex: monthsRegex,
        monthsShortRegex: monthsRegex,
        monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
        monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,

        monthsParse: monthsParse,
        longMonthsParse: monthsParse,
        shortMonthsParse: monthsParse,

        weekdays: 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
        weekdaysShort: 'zo._ma._di._wo._do._vr._za.'.split('_'),
        weekdaysMin: 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD-MM-YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[vandaag om] LT',
            nextDay: '[morgen om] LT',
            nextWeek: 'dddd [om] LT',
            lastDay: '[gisteren om] LT',
            lastWeek: '[afgelopen] dddd [om] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'over %s',
            past: '%s geleden',
            s: 'een paar seconden',
            m: 'één minuut',
            mm: '%d minuten',
            h: 'één uur',
            hh: '%d uur',
            d: 'één dag',
            dd: '%d dagen',
            M: 'één maand',
            MM: '%d maanden',
            y: 'één jaar',
            yy: '%d jaar'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal: function ordinal(number) {
            return number + (number === 1 || number === 8 || number >= 20 ? 'ste' : 'de');
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return nl;
});

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Dutch (Belgium) [nl-be]
//! author : Joris Röling : https://github.com/jorisroling
//! author : Jacob Middag : https://github.com/middagj

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_');
    var monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

    var monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
    var monthsRegex = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

    var nlBe = moment.defineLocale('nl-be', {
        months: 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
        monthsShort: function monthsShort(m, format) {
            if (!m) {
                return monthsShortWithDots;
            } else if (/-MMM-/.test(format)) {
                return monthsShortWithoutDots[m.month()];
            } else {
                return monthsShortWithDots[m.month()];
            }
        },

        monthsRegex: monthsRegex,
        monthsShortRegex: monthsRegex,
        monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
        monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,

        monthsParse: monthsParse,
        longMonthsParse: monthsParse,
        shortMonthsParse: monthsParse,

        weekdays: 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
        weekdaysShort: 'zo._ma._di._wo._do._vr._za.'.split('_'),
        weekdaysMin: 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[vandaag om] LT',
            nextDay: '[morgen om] LT',
            nextWeek: 'dddd [om] LT',
            lastDay: '[gisteren om] LT',
            lastWeek: '[afgelopen] dddd [om] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'over %s',
            past: '%s geleden',
            s: 'een paar seconden',
            m: 'één minuut',
            mm: '%d minuten',
            h: 'één uur',
            hh: '%d uur',
            d: 'één dag',
            dd: '%d dagen',
            M: 'één maand',
            MM: '%d maanden',
            y: 'één jaar',
            yy: '%d jaar'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal: function ordinal(number) {
            return number + (number === 1 || number === 8 || number >= 20 ? 'ste' : 'de');
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return nlBe;
});

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Nynorsk [nn]
//! author : https://github.com/mechuwind

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var nn = moment.defineLocale('nn', {
        months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
        monthsShort: 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
        weekdays: 'sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag'.split('_'),
        weekdaysShort: 'sun_mån_tys_ons_tor_fre_lau'.split('_'),
        weekdaysMin: 'su_må_ty_on_to_fr_lø'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY [kl.] H:mm',
            LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm'
        },
        calendar: {
            sameDay: '[I dag klokka] LT',
            nextDay: '[I morgon klokka] LT',
            nextWeek: 'dddd [klokka] LT',
            lastDay: '[I går klokka] LT',
            lastWeek: '[Føregåande] dddd [klokka] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'om %s',
            past: '%s sidan',
            s: 'nokre sekund',
            m: 'eit minutt',
            mm: '%d minutt',
            h: 'ein time',
            hh: '%d timar',
            d: 'ein dag',
            dd: '%d dagar',
            M: 'ein månad',
            MM: '%d månader',
            y: 'eit år',
            yy: '%d år'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return nn;
});

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Punjabi (India) [pa-in]
//! author : Harpreet Singh : https://github.com/harpreetkhalsagtbit

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '੧',
        '2': '੨',
        '3': '੩',
        '4': '੪',
        '5': '੫',
        '6': '੬',
        '7': '੭',
        '8': '੮',
        '9': '੯',
        '0': '੦'
    };
    var numberMap = {
        '੧': '1',
        '੨': '2',
        '੩': '3',
        '੪': '4',
        '੫': '5',
        '੬': '6',
        '੭': '7',
        '੮': '8',
        '੯': '9',
        '੦': '0'
    };

    var paIn = moment.defineLocale('pa-in', {
        // There are months name as per Nanakshahi Calender but they are not used as rigidly in modern Punjabi.
        months: 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
        monthsShort: 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
        weekdays: 'ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ'.split('_'),
        weekdaysShort: 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
        weekdaysMin: 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
        longDateFormat: {
            LT: 'A h:mm ਵਜੇ',
            LTS: 'A h:mm:ss ਵਜੇ',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, A h:mm ਵਜੇ',
            LLLL: 'dddd, D MMMM YYYY, A h:mm ਵਜੇ'
        },
        calendar: {
            sameDay: '[ਅਜ] LT',
            nextDay: '[ਕਲ] LT',
            nextWeek: 'dddd, LT',
            lastDay: '[ਕਲ] LT',
            lastWeek: '[ਪਿਛਲੇ] dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s ਵਿੱਚ',
            past: '%s ਪਿਛਲੇ',
            s: 'ਕੁਝ ਸਕਿੰਟ',
            m: 'ਇਕ ਮਿੰਟ',
            mm: '%d ਮਿੰਟ',
            h: 'ਇੱਕ ਘੰਟਾ',
            hh: '%d ਘੰਟੇ',
            d: 'ਇੱਕ ਦਿਨ',
            dd: '%d ਦਿਨ',
            M: 'ਇੱਕ ਮਹੀਨਾ',
            MM: '%d ਮਹੀਨੇ',
            y: 'ਇੱਕ ਸਾਲ',
            yy: '%d ਸਾਲ'
        },
        preparse: function preparse(string) {
            return string.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function postformat(string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        // Punjabi notation for meridiems are quite fuzzy in practice. While there exists
        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Punjabi.
        meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
        meridiemHour: function meridiemHour(hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'ਰਾਤ') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'ਸਵੇਰ') {
                return hour;
            } else if (meridiem === 'ਦੁਪਹਿਰ') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'ਸ਼ਾਮ') {
                return hour + 12;
            }
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 4) {
                return 'ਰਾਤ';
            } else if (hour < 10) {
                return 'ਸਵੇਰ';
            } else if (hour < 17) {
                return 'ਦੁਪਹਿਰ';
            } else if (hour < 20) {
                return 'ਸ਼ਾਮ';
            } else {
                return 'ਰਾਤ';
            }
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return paIn;
});

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Polish [pl]
//! author : Rafal Hirsz : https://github.com/evoL

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var monthsNominative = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_');
    var monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');
    function plural(n) {
        return n % 10 < 5 && n % 10 > 1 && ~~(n / 10) % 10 !== 1;
    }
    function translate(number, withoutSuffix, key) {
        var result = number + ' ';
        switch (key) {
            case 'm':
                return withoutSuffix ? 'minuta' : 'minutę';
            case 'mm':
                return result + (plural(number) ? 'minuty' : 'minut');
            case 'h':
                return withoutSuffix ? 'godzina' : 'godzinę';
            case 'hh':
                return result + (plural(number) ? 'godziny' : 'godzin');
            case 'MM':
                return result + (plural(number) ? 'miesiące' : 'miesięcy');
            case 'yy':
                return result + (plural(number) ? 'lata' : 'lat');
        }
    }

    var pl = moment.defineLocale('pl', {
        months: function months(momentToFormat, format) {
            if (!momentToFormat) {
                return monthsNominative;
            } else if (format === '') {
                // Hack: if format empty we know this is used to generate
                // RegExp by moment. Give then back both valid forms of months
                // in RegExp ready format.
                return '(' + monthsSubjective[momentToFormat.month()] + '|' + monthsNominative[momentToFormat.month()] + ')';
            } else if (/D MMMM/.test(format)) {
                return monthsSubjective[momentToFormat.month()];
            } else {
                return monthsNominative[momentToFormat.month()];
            }
        },
        monthsShort: 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
        weekdays: 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
        weekdaysShort: 'ndz_pon_wt_śr_czw_pt_sob'.split('_'),
        weekdaysMin: 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Dziś o] LT',
            nextDay: '[Jutro o] LT',
            nextWeek: '[W] dddd [o] LT',
            lastDay: '[Wczoraj o] LT',
            lastWeek: function lastWeek() {
                switch (this.day()) {
                    case 0:
                        return '[W zeszłą niedzielę o] LT';
                    case 3:
                        return '[W zeszłą środę o] LT';
                    case 6:
                        return '[W zeszłą sobotę o] LT';
                    default:
                        return '[W zeszły] dddd [o] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'za %s',
            past: '%s temu',
            s: 'kilka sekund',
            m: translate,
            mm: translate,
            h: translate,
            hh: translate,
            d: '1 dzień',
            dd: '%d dni',
            M: 'miesiąc',
            MM: translate,
            y: 'rok',
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return pl;
});

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Portuguese [pt]
//! author : Jefferson : https://github.com/jalex79

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var pt = moment.defineLocale('pt', {
        months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
        monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
        weekdays: 'Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado'.split('_'),
        weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
        weekdaysMin: 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D [de] MMMM [de] YYYY',
            LLL: 'D [de] MMMM [de] YYYY HH:mm',
            LLLL: 'dddd, D [de] MMMM [de] YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Hoje às] LT',
            nextDay: '[Amanhã às] LT',
            nextWeek: 'dddd [às] LT',
            lastDay: '[Ontem às] LT',
            lastWeek: function lastWeek() {
                return this.day() === 0 || this.day() === 6 ? '[Último] dddd [às] LT' : // Saturday + Sunday
                '[Última] dddd [às] LT'; // Monday - Friday
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'em %s',
            past: 'há %s',
            s: 'segundos',
            m: 'um minuto',
            mm: '%d minutos',
            h: 'uma hora',
            hh: '%d horas',
            d: 'um dia',
            dd: '%d dias',
            M: 'um mês',
            MM: '%d meses',
            y: 'um ano',
            yy: '%d anos'
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: '%dº',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return pt;
});

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Portuguese (Brazil) [pt-br]
//! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var ptBr = moment.defineLocale('pt-br', {
        months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
        monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
        weekdays: 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
        weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
        weekdaysMin: 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D [de] MMMM [de] YYYY',
            LLL: 'D [de] MMMM [de] YYYY [às] HH:mm',
            LLLL: 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
        },
        calendar: {
            sameDay: '[Hoje às] LT',
            nextDay: '[Amanhã às] LT',
            nextWeek: 'dddd [às] LT',
            lastDay: '[Ontem às] LT',
            lastWeek: function lastWeek() {
                return this.day() === 0 || this.day() === 6 ? '[Último] dddd [às] LT' : // Saturday + Sunday
                '[Última] dddd [às] LT'; // Monday - Friday
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'em %s',
            past: '%s atrás',
            s: 'poucos segundos',
            m: 'um minuto',
            mm: '%d minutos',
            h: 'uma hora',
            hh: '%d horas',
            d: 'um dia',
            dd: '%d dias',
            M: 'um mês',
            MM: '%d meses',
            y: 'um ano',
            yy: '%d anos'
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: '%dº'
    });

    return ptBr;
});

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Romanian [ro]
//! author : Vlad Gurdiga : https://github.com/gurdiga
//! author : Valentin Agachi : https://github.com/avaly

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'mm': 'minute',
            'hh': 'ore',
            'dd': 'zile',
            'MM': 'luni',
            'yy': 'ani'
        },
            separator = ' ';
        if (number % 100 >= 20 || number >= 100 && number % 100 === 0) {
            separator = ' de ';
        }
        return number + separator + format[key];
    }

    var ro = moment.defineLocale('ro', {
        months: 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
        monthsShort: 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays: 'duminică_luni_marți_miercuri_joi_vineri_sâmbătă'.split('_'),
        weekdaysShort: 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
        weekdaysMin: 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY H:mm',
            LLLL: 'dddd, D MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[azi la] LT',
            nextDay: '[mâine la] LT',
            nextWeek: 'dddd [la] LT',
            lastDay: '[ieri la] LT',
            lastWeek: '[fosta] dddd [la] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'peste %s',
            past: '%s în urmă',
            s: 'câteva secunde',
            m: 'un minut',
            mm: relativeTimeWithPlural,
            h: 'o oră',
            hh: relativeTimeWithPlural,
            d: 'o zi',
            dd: relativeTimeWithPlural,
            M: 'o lună',
            MM: relativeTimeWithPlural,
            y: 'un an',
            yy: relativeTimeWithPlural
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ro;
});

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Russian [ru]
//! author : Viktorminator : https://github.com/Viktorminator
//! Author : Menelion Elensúle : https://github.com/Oire
//! author : Коренберг Марк : https://github.com/socketpair

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    function plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
    }
    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
            'hh': 'час_часа_часов',
            'dd': 'день_дня_дней',
            'MM': 'месяц_месяца_месяцев',
            'yy': 'год_года_лет'
        };
        if (key === 'm') {
            return withoutSuffix ? 'минута' : 'минуту';
        } else {
            return number + ' ' + plural(format[key], +number);
        }
    }
    var monthsParse = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];

    // http://new.gramota.ru/spravka/rules/139-prop : § 103
    // Сокращения месяцев: http://new.gramota.ru/spravka/buro/search-answer?s=242637
    // CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
    var ru = moment.defineLocale('ru', {
        months: {
            format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
            standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
        },
        monthsShort: {
            // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку ?
            format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'),
            standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_')
        },
        weekdays: {
            standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
            format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_'),
            isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
        },
        weekdaysShort: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
        weekdaysMin: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
        monthsParse: monthsParse,
        longMonthsParse: monthsParse,
        shortMonthsParse: monthsParse,

        // полные названия с падежами, по три буквы, для некоторых, по 4 буквы, сокращения с точкой и без точки
        monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

        // копия предыдущего
        monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

        // полные названия с падежами
        monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,

        // Выражение, которое соотвествует только сокращённым формам
        monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY г.',
            LLL: 'D MMMM YYYY г., HH:mm',
            LLLL: 'dddd, D MMMM YYYY г., HH:mm'
        },
        calendar: {
            sameDay: '[Сегодня в] LT',
            nextDay: '[Завтра в] LT',
            lastDay: '[Вчера в] LT',
            nextWeek: function nextWeek(now) {
                if (now.week() !== this.week()) {
                    switch (this.day()) {
                        case 0:
                            return '[В следующее] dddd [в] LT';
                        case 1:
                        case 2:
                        case 4:
                            return '[В следующий] dddd [в] LT';
                        case 3:
                        case 5:
                        case 6:
                            return '[В следующую] dddd [в] LT';
                    }
                } else {
                    if (this.day() === 2) {
                        return '[Во] dddd [в] LT';
                    } else {
                        return '[В] dddd [в] LT';
                    }
                }
            },
            lastWeek: function lastWeek(now) {
                if (now.week() !== this.week()) {
                    switch (this.day()) {
                        case 0:
                            return '[В прошлое] dddd [в] LT';
                        case 1:
                        case 2:
                        case 4:
                            return '[В прошлый] dddd [в] LT';
                        case 3:
                        case 5:
                        case 6:
                            return '[В прошлую] dddd [в] LT';
                    }
                } else {
                    if (this.day() === 2) {
                        return '[Во] dddd [в] LT';
                    } else {
                        return '[В] dddd [в] LT';
                    }
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'через %s',
            past: '%s назад',
            s: 'несколько секунд',
            m: relativeTimeWithPlural,
            mm: relativeTimeWithPlural,
            h: 'час',
            hh: relativeTimeWithPlural,
            d: 'день',
            dd: relativeTimeWithPlural,
            M: 'месяц',
            MM: relativeTimeWithPlural,
            y: 'год',
            yy: relativeTimeWithPlural
        },
        meridiemParse: /ночи|утра|дня|вечера/i,
        isPM: function isPM(input) {
            return (/^(дня|вечера)$/.test(input)
            );
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 4) {
                return 'ночи';
            } else if (hour < 12) {
                return 'утра';
            } else if (hour < 17) {
                return 'дня';
            } else {
                return 'вечера';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
        ordinal: function ordinal(number, period) {
            switch (period) {
                case 'M':
                case 'd':
                case 'DDD':
                    return number + '-й';
                case 'D':
                    return number + '-го';
                case 'w':
                case 'W':
                    return number + '-я';
                default:
                    return number;
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ru;
});

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Sindhi [sd]
//! author : Narain Sagar : https://github.com/narainsagar

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var months = ['جنوري', 'فيبروري', 'مارچ', 'اپريل', 'مئي', 'جون', 'جولاءِ', 'آگسٽ', 'سيپٽمبر', 'آڪٽوبر', 'نومبر', 'ڊسمبر'];
    var days = ['آچر', 'سومر', 'اڱارو', 'اربع', 'خميس', 'جمع', 'ڇنڇر'];

    var sd = moment.defineLocale('sd', {
        months: months,
        monthsShort: months,
        weekdays: days,
        weekdaysShort: days,
        weekdaysMin: days,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd، D MMMM YYYY HH:mm'
        },
        meridiemParse: /صبح|شام/,
        isPM: function isPM(input) {
            return 'شام' === input;
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 12) {
                return 'صبح';
            }
            return 'شام';
        },
        calendar: {
            sameDay: '[اڄ] LT',
            nextDay: '[سڀاڻي] LT',
            nextWeek: 'dddd [اڳين هفتي تي] LT',
            lastDay: '[ڪالهه] LT',
            lastWeek: '[گزريل هفتي] dddd [تي] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s پوء',
            past: '%s اڳ',
            s: 'چند سيڪنڊ',
            m: 'هڪ منٽ',
            mm: '%d منٽ',
            h: 'هڪ ڪلاڪ',
            hh: '%d ڪلاڪ',
            d: 'هڪ ڏينهن',
            dd: '%d ڏينهن',
            M: 'هڪ مهينو',
            MM: '%d مهينا',
            y: 'هڪ سال',
            yy: '%d سال'
        },
        preparse: function preparse(string) {
            return string.replace(/،/g, ',');
        },
        postformat: function postformat(string) {
            return string.replace(/,/g, '،');
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return sd;
});

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Northern Sami [se]
//! authors : Bård Rolstad Henriksen : https://github.com/karamell

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var se = moment.defineLocale('se', {
        months: 'ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu'.split('_'),
        monthsShort: 'ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov'.split('_'),
        weekdays: 'sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat'.split('_'),
        weekdaysShort: 'sotn_vuos_maŋ_gask_duor_bear_láv'.split('_'),
        weekdaysMin: 's_v_m_g_d_b_L'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'MMMM D. [b.] YYYY',
            LLL: 'MMMM D. [b.] YYYY [ti.] HH:mm',
            LLLL: 'dddd, MMMM D. [b.] YYYY [ti.] HH:mm'
        },
        calendar: {
            sameDay: '[otne ti] LT',
            nextDay: '[ihttin ti] LT',
            nextWeek: 'dddd [ti] LT',
            lastDay: '[ikte ti] LT',
            lastWeek: '[ovddit] dddd [ti] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s geažes',
            past: 'maŋit %s',
            s: 'moadde sekunddat',
            m: 'okta minuhta',
            mm: '%d minuhtat',
            h: 'okta diimmu',
            hh: '%d diimmut',
            d: 'okta beaivi',
            dd: '%d beaivvit',
            M: 'okta mánnu',
            MM: '%d mánut',
            y: 'okta jahki',
            yy: '%d jagit'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return se;
});

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Sinhalese [si]
//! author : Sampath Sitinamaluwa : https://github.com/sampathsris

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    /*jshint -W100*/

    var si = moment.defineLocale('si', {
        months: 'ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්'.split('_'),
        monthsShort: 'ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ'.split('_'),
        weekdays: 'ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා'.split('_'),
        weekdaysShort: 'ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන'.split('_'),
        weekdaysMin: 'ඉ_ස_අ_බ_බ්‍ර_සි_සෙ'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'a h:mm',
            LTS: 'a h:mm:ss',
            L: 'YYYY/MM/DD',
            LL: 'YYYY MMMM D',
            LLL: 'YYYY MMMM D, a h:mm',
            LLLL: 'YYYY MMMM D [වැනි] dddd, a h:mm:ss'
        },
        calendar: {
            sameDay: '[අද] LT[ට]',
            nextDay: '[හෙට] LT[ට]',
            nextWeek: 'dddd LT[ට]',
            lastDay: '[ඊයේ] LT[ට]',
            lastWeek: '[පසුගිය] dddd LT[ට]',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%sකින්',
            past: '%sකට පෙර',
            s: 'තත්පර කිහිපය',
            m: 'මිනිත්තුව',
            mm: 'මිනිත්තු %d',
            h: 'පැය',
            hh: 'පැය %d',
            d: 'දිනය',
            dd: 'දින %d',
            M: 'මාසය',
            MM: 'මාස %d',
            y: 'වසර',
            yy: 'වසර %d'
        },
        dayOfMonthOrdinalParse: /\d{1,2} වැනි/,
        ordinal: function ordinal(number) {
            return number + ' වැනි';
        },
        meridiemParse: /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
        isPM: function isPM(input) {
            return input === 'ප.ව.' || input === 'පස් වරු';
        },
        meridiem: function meridiem(hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'ප.ව.' : 'පස් වරු';
            } else {
                return isLower ? 'පෙ.ව.' : 'පෙර වරු';
            }
        }
    });

    return si;
});

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Slovak [sk]
//! author : Martin Minka : https://github.com/k2s
//! based on work of petrbela : https://github.com/petrbela

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var months = 'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split('_');
    var monthsShort = 'jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec'.split('_');
    function plural(n) {
        return n > 1 && n < 5;
    }
    function translate(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':
                // a few seconds / in a few seconds / a few seconds ago
                return withoutSuffix || isFuture ? 'pár sekúnd' : 'pár sekundami';
            case 'm':
                // a minute / in a minute / a minute ago
                return withoutSuffix ? 'minúta' : isFuture ? 'minútu' : 'minútou';
            case 'mm':
                // 9 minutes / in 9 minutes / 9 minutes ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'minúty' : 'minút');
                } else {
                    return result + 'minútami';
                }
                break;
            case 'h':
                // an hour / in an hour / an hour ago
                return withoutSuffix ? 'hodina' : isFuture ? 'hodinu' : 'hodinou';
            case 'hh':
                // 9 hours / in 9 hours / 9 hours ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'hodiny' : 'hodín');
                } else {
                    return result + 'hodinami';
                }
                break;
            case 'd':
                // a day / in a day / a day ago
                return withoutSuffix || isFuture ? 'deň' : 'dňom';
            case 'dd':
                // 9 days / in 9 days / 9 days ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'dni' : 'dní');
                } else {
                    return result + 'dňami';
                }
                break;
            case 'M':
                // a month / in a month / a month ago
                return withoutSuffix || isFuture ? 'mesiac' : 'mesiacom';
            case 'MM':
                // 9 months / in 9 months / 9 months ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'mesiace' : 'mesiacov');
                } else {
                    return result + 'mesiacmi';
                }
                break;
            case 'y':
                // a year / in a year / a year ago
                return withoutSuffix || isFuture ? 'rok' : 'rokom';
            case 'yy':
                // 9 years / in 9 years / 9 years ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'roky' : 'rokov');
                } else {
                    return result + 'rokmi';
                }
                break;
        }
    }

    var sk = moment.defineLocale('sk', {
        months: months,
        monthsShort: monthsShort,
        weekdays: 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
        weekdaysShort: 'ne_po_ut_st_št_pi_so'.split('_'),
        weekdaysMin: 'ne_po_ut_st_št_pi_so'.split('_'),
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[dnes o] LT',
            nextDay: '[zajtra o] LT',
            nextWeek: function nextWeek() {
                switch (this.day()) {
                    case 0:
                        return '[v nedeľu o] LT';
                    case 1:
                    case 2:
                        return '[v] dddd [o] LT';
                    case 3:
                        return '[v stredu o] LT';
                    case 4:
                        return '[vo štvrtok o] LT';
                    case 5:
                        return '[v piatok o] LT';
                    case 6:
                        return '[v sobotu o] LT';
                }
            },
            lastDay: '[včera o] LT',
            lastWeek: function lastWeek() {
                switch (this.day()) {
                    case 0:
                        return '[minulú nedeľu o] LT';
                    case 1:
                    case 2:
                        return '[minulý] dddd [o] LT';
                    case 3:
                        return '[minulú stredu o] LT';
                    case 4:
                    case 5:
                        return '[minulý] dddd [o] LT';
                    case 6:
                        return '[minulú sobotu o] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'za %s',
            past: 'pred %s',
            s: translate,
            m: translate,
            mm: translate,
            h: translate,
            hh: translate,
            d: translate,
            dd: translate,
            M: translate,
            MM: translate,
            y: translate,
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return sk;
});

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Slovenian [sl]
//! author : Robert Sedovšek : https://github.com/sedovsek

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':
                return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami';
            case 'm':
                return withoutSuffix ? 'ena minuta' : 'eno minuto';
            case 'mm':
                if (number === 1) {
                    result += withoutSuffix ? 'minuta' : 'minuto';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'minuti' : 'minutama';
                } else if (number < 5) {
                    result += withoutSuffix || isFuture ? 'minute' : 'minutami';
                } else {
                    result += withoutSuffix || isFuture ? 'minut' : 'minutami';
                }
                return result;
            case 'h':
                return withoutSuffix ? 'ena ura' : 'eno uro';
            case 'hh':
                if (number === 1) {
                    result += withoutSuffix ? 'ura' : 'uro';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'uri' : 'urama';
                } else if (number < 5) {
                    result += withoutSuffix || isFuture ? 'ure' : 'urami';
                } else {
                    result += withoutSuffix || isFuture ? 'ur' : 'urami';
                }
                return result;
            case 'd':
                return withoutSuffix || isFuture ? 'en dan' : 'enim dnem';
            case 'dd':
                if (number === 1) {
                    result += withoutSuffix || isFuture ? 'dan' : 'dnem';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'dni' : 'dnevoma';
                } else {
                    result += withoutSuffix || isFuture ? 'dni' : 'dnevi';
                }
                return result;
            case 'M':
                return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem';
            case 'MM':
                if (number === 1) {
                    result += withoutSuffix || isFuture ? 'mesec' : 'mesecem';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'meseca' : 'mesecema';
                } else if (number < 5) {
                    result += withoutSuffix || isFuture ? 'mesece' : 'meseci';
                } else {
                    result += withoutSuffix || isFuture ? 'mesecev' : 'meseci';
                }
                return result;
            case 'y':
                return withoutSuffix || isFuture ? 'eno leto' : 'enim letom';
            case 'yy':
                if (number === 1) {
                    result += withoutSuffix || isFuture ? 'leto' : 'letom';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'leti' : 'letoma';
                } else if (number < 5) {
                    result += withoutSuffix || isFuture ? 'leta' : 'leti';
                } else {
                    result += withoutSuffix || isFuture ? 'let' : 'leti';
                }
                return result;
        }
    }

    var sl = moment.defineLocale('sl', {
        months: 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
        monthsShort: 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays: 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
        weekdaysShort: 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
        weekdaysMin: 'ne_po_to_sr_če_pe_so'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[danes ob] LT',
            nextDay: '[jutri ob] LT',

            nextWeek: function nextWeek() {
                switch (this.day()) {
                    case 0:
                        return '[v] [nedeljo] [ob] LT';
                    case 3:
                        return '[v] [sredo] [ob] LT';
                    case 6:
                        return '[v] [soboto] [ob] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[v] dddd [ob] LT';
                }
            },
            lastDay: '[včeraj ob] LT',
            lastWeek: function lastWeek() {
                switch (this.day()) {
                    case 0:
                        return '[prejšnjo] [nedeljo] [ob] LT';
                    case 3:
                        return '[prejšnjo] [sredo] [ob] LT';
                    case 6:
                        return '[prejšnjo] [soboto] [ob] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[prejšnji] dddd [ob] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'čez %s',
            past: 'pred %s',
            s: processRelativeTime,
            m: processRelativeTime,
            mm: processRelativeTime,
            h: processRelativeTime,
            hh: processRelativeTime,
            d: processRelativeTime,
            dd: processRelativeTime,
            M: processRelativeTime,
            MM: processRelativeTime,
            y: processRelativeTime,
            yy: processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return sl;
});

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Albanian [sq]
//! author : Flakërim Ismani : https://github.com/flakerimi
//! author : Menelion Elensúle : https://github.com/Oire
//! author : Oerd Cukalla : https://github.com/oerd

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var sq = moment.defineLocale('sq', {
        months: 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor'.split('_'),
        monthsShort: 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj'.split('_'),
        weekdays: 'E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë'.split('_'),
        weekdaysShort: 'Die_Hën_Mar_Mër_Enj_Pre_Sht'.split('_'),
        weekdaysMin: 'D_H_Ma_Më_E_P_Sh'.split('_'),
        weekdaysParseExact: true,
        meridiemParse: /PD|MD/,
        isPM: function isPM(input) {
            return input.charAt(0) === 'M';
        },
        meridiem: function meridiem(hours, minutes, isLower) {
            return hours < 12 ? 'PD' : 'MD';
        },
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Sot në] LT',
            nextDay: '[Nesër në] LT',
            nextWeek: 'dddd [në] LT',
            lastDay: '[Dje në] LT',
            lastWeek: 'dddd [e kaluar në] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'në %s',
            past: '%s më parë',
            s: 'disa sekonda',
            m: 'një minutë',
            mm: '%d minuta',
            h: 'një orë',
            hh: '%d orë',
            d: 'një ditë',
            dd: '%d ditë',
            M: 'një muaj',
            MM: '%d muaj',
            y: 'një vit',
            yy: '%d vite'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return sq;
});

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Serbian [sr]
//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var translator = {
        words: { //Different grammatical cases
            m: ['jedan minut', 'jedne minute'],
            mm: ['minut', 'minute', 'minuta'],
            h: ['jedan sat', 'jednog sata'],
            hh: ['sat', 'sata', 'sati'],
            dd: ['dan', 'dana', 'dana'],
            MM: ['mesec', 'meseca', 'meseci'],
            yy: ['godina', 'godine', 'godina']
        },
        correctGrammaticalCase: function correctGrammaticalCase(number, wordKey) {
            return number === 1 ? wordKey[0] : number >= 2 && number <= 4 ? wordKey[1] : wordKey[2];
        },
        translate: function translate(number, withoutSuffix, key) {
            var wordKey = translator.words[key];
            if (key.length === 1) {
                return withoutSuffix ? wordKey[0] : wordKey[1];
            } else {
                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
            }
        }
    };

    var sr = moment.defineLocale('sr', {
        months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
        monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays: 'nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota'.split('_'),
        weekdaysShort: 'ned._pon._uto._sre._čet._pet._sub.'.split('_'),
        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[danas u] LT',
            nextDay: '[sutra u] LT',
            nextWeek: function nextWeek() {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedelju] [u] LT';
                    case 3:
                        return '[u] [sredu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay: '[juče u] LT',
            lastWeek: function lastWeek() {
                var lastWeekDays = ['[prošle] [nedelje] [u] LT', '[prošlog] [ponedeljka] [u] LT', '[prošlog] [utorka] [u] LT', '[prošle] [srede] [u] LT', '[prošlog] [četvrtka] [u] LT', '[prošlog] [petka] [u] LT', '[prošle] [subote] [u] LT'];
                return lastWeekDays[this.day()];
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'za %s',
            past: 'pre %s',
            s: 'nekoliko sekundi',
            m: translator.translate,
            mm: translator.translate,
            h: translator.translate,
            hh: translator.translate,
            d: 'dan',
            dd: translator.translate,
            M: 'mesec',
            MM: translator.translate,
            y: 'godinu',
            yy: translator.translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return sr;
});

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Serbian Cyrillic [sr-cyrl]
//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var translator = {
        words: { //Different grammatical cases
            m: ['један минут', 'једне минуте'],
            mm: ['минут', 'минуте', 'минута'],
            h: ['један сат', 'једног сата'],
            hh: ['сат', 'сата', 'сати'],
            dd: ['дан', 'дана', 'дана'],
            MM: ['месец', 'месеца', 'месеци'],
            yy: ['година', 'године', 'година']
        },
        correctGrammaticalCase: function correctGrammaticalCase(number, wordKey) {
            return number === 1 ? wordKey[0] : number >= 2 && number <= 4 ? wordKey[1] : wordKey[2];
        },
        translate: function translate(number, withoutSuffix, key) {
            var wordKey = translator.words[key];
            if (key.length === 1) {
                return withoutSuffix ? wordKey[0] : wordKey[1];
            } else {
                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
            }
        }
    };

    var srCyrl = moment.defineLocale('sr-cyrl', {
        months: 'јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар'.split('_'),
        monthsShort: 'јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.'.split('_'),
        monthsParseExact: true,
        weekdays: 'недеља_понедељак_уторак_среда_четвртак_петак_субота'.split('_'),
        weekdaysShort: 'нед._пон._уто._сре._чет._пет._суб.'.split('_'),
        weekdaysMin: 'не_по_ут_ср_че_пе_су'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[данас у] LT',
            nextDay: '[сутра у] LT',
            nextWeek: function nextWeek() {
                switch (this.day()) {
                    case 0:
                        return '[у] [недељу] [у] LT';
                    case 3:
                        return '[у] [среду] [у] LT';
                    case 6:
                        return '[у] [суботу] [у] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[у] dddd [у] LT';
                }
            },
            lastDay: '[јуче у] LT',
            lastWeek: function lastWeek() {
                var lastWeekDays = ['[прошле] [недеље] [у] LT', '[прошлог] [понедељка] [у] LT', '[прошлог] [уторка] [у] LT', '[прошле] [среде] [у] LT', '[прошлог] [четвртка] [у] LT', '[прошлог] [петка] [у] LT', '[прошле] [суботе] [у] LT'];
                return lastWeekDays[this.day()];
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'за %s',
            past: 'пре %s',
            s: 'неколико секунди',
            m: translator.translate,
            mm: translator.translate,
            h: translator.translate,
            hh: translator.translate,
            d: 'дан',
            dd: translator.translate,
            M: 'месец',
            MM: translator.translate,
            y: 'годину',
            yy: translator.translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return srCyrl;
});

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : siSwati [ss]
//! author : Nicolai Davies<mail@nicolai.io> : https://github.com/nicolaidavies

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var ss = moment.defineLocale('ss', {
        months: "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split('_'),
        monthsShort: 'Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo'.split('_'),
        weekdays: 'Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo'.split('_'),
        weekdaysShort: 'Lis_Umb_Lsb_Les_Lsi_Lsh_Umg'.split('_'),
        weekdaysMin: 'Li_Us_Lb_Lt_Ls_Lh_Ug'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY h:mm A',
            LLLL: 'dddd, D MMMM YYYY h:mm A'
        },
        calendar: {
            sameDay: '[Namuhla nga] LT',
            nextDay: '[Kusasa nga] LT',
            nextWeek: 'dddd [nga] LT',
            lastDay: '[Itolo nga] LT',
            lastWeek: 'dddd [leliphelile] [nga] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'nga %s',
            past: 'wenteka nga %s',
            s: 'emizuzwana lomcane',
            m: 'umzuzu',
            mm: '%d emizuzu',
            h: 'lihora',
            hh: '%d emahora',
            d: 'lilanga',
            dd: '%d emalanga',
            M: 'inyanga',
            MM: '%d tinyanga',
            y: 'umnyaka',
            yy: '%d iminyaka'
        },
        meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
        meridiem: function meridiem(hours, minutes, isLower) {
            if (hours < 11) {
                return 'ekuseni';
            } else if (hours < 15) {
                return 'emini';
            } else if (hours < 19) {
                return 'entsambama';
            } else {
                return 'ebusuku';
            }
        },
        meridiemHour: function meridiemHour(hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'ekuseni') {
                return hour;
            } else if (meridiem === 'emini') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'entsambama' || meridiem === 'ebusuku') {
                if (hour === 0) {
                    return 0;
                }
                return hour + 12;
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}/,
        ordinal: '%d',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return ss;
});

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Swedish [sv]
//! author : Jens Alm : https://github.com/ulmus

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var sv = moment.defineLocale('sv', {
        months: 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
        monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
        weekdays: 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
        weekdaysShort: 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
        weekdaysMin: 'sö_må_ti_on_to_fr_lö'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY-MM-DD',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY [kl.] HH:mm',
            LLLL: 'dddd D MMMM YYYY [kl.] HH:mm',
            lll: 'D MMM YYYY HH:mm',
            llll: 'ddd D MMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Idag] LT',
            nextDay: '[Imorgon] LT',
            lastDay: '[Igår] LT',
            nextWeek: '[På] dddd LT',
            lastWeek: '[I] dddd[s] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'om %s',
            past: 'för %s sedan',
            s: 'några sekunder',
            m: 'en minut',
            mm: '%d minuter',
            h: 'en timme',
            hh: '%d timmar',
            d: 'en dag',
            dd: '%d dagar',
            M: 'en månad',
            MM: '%d månader',
            y: 'ett år',
            yy: '%d år'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(e|a)/,
        ordinal: function ordinal(number) {
            var b = number % 10,
                output = ~~(number % 100 / 10) === 1 ? 'e' : b === 1 ? 'a' : b === 2 ? 'a' : b === 3 ? 'e' : 'e';
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return sv;
});

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Swahili [sw]
//! author : Fahad Kassim : https://github.com/fadsel

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var sw = moment.defineLocale('sw', {
        months: 'Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba'.split('_'),
        monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des'.split('_'),
        weekdays: 'Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi'.split('_'),
        weekdaysShort: 'Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos'.split('_'),
        weekdaysMin: 'J2_J3_J4_J5_Al_Ij_J1'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[leo saa] LT',
            nextDay: '[kesho saa] LT',
            nextWeek: '[wiki ijayo] dddd [saat] LT',
            lastDay: '[jana] LT',
            lastWeek: '[wiki iliyopita] dddd [saat] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s baadaye',
            past: 'tokea %s',
            s: 'hivi punde',
            m: 'dakika moja',
            mm: 'dakika %d',
            h: 'saa limoja',
            hh: 'masaa %d',
            d: 'siku moja',
            dd: 'masiku %d',
            M: 'mwezi mmoja',
            MM: 'miezi %d',
            y: 'mwaka mmoja',
            yy: 'miaka %d'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return sw;
});

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Tamil [ta]
//! author : Arjunkumar Krishnamoorthy : https://github.com/tk120404

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '௧',
        '2': '௨',
        '3': '௩',
        '4': '௪',
        '5': '௫',
        '6': '௬',
        '7': '௭',
        '8': '௮',
        '9': '௯',
        '0': '௦'
    };
    var numberMap = {
        '௧': '1',
        '௨': '2',
        '௩': '3',
        '௪': '4',
        '௫': '5',
        '௬': '6',
        '௭': '7',
        '௮': '8',
        '௯': '9',
        '௦': '0'
    };

    var ta = moment.defineLocale('ta', {
        months: 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
        monthsShort: 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
        weekdays: 'ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை'.split('_'),
        weekdaysShort: 'ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி'.split('_'),
        weekdaysMin: 'ஞா_தி_செ_பு_வி_வெ_ச'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, HH:mm',
            LLLL: 'dddd, D MMMM YYYY, HH:mm'
        },
        calendar: {
            sameDay: '[இன்று] LT',
            nextDay: '[நாளை] LT',
            nextWeek: 'dddd, LT',
            lastDay: '[நேற்று] LT',
            lastWeek: '[கடந்த வாரம்] dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s இல்',
            past: '%s முன்',
            s: 'ஒரு சில விநாடிகள்',
            m: 'ஒரு நிமிடம்',
            mm: '%d நிமிடங்கள்',
            h: 'ஒரு மணி நேரம்',
            hh: '%d மணி நேரம்',
            d: 'ஒரு நாள்',
            dd: '%d நாட்கள்',
            M: 'ஒரு மாதம்',
            MM: '%d மாதங்கள்',
            y: 'ஒரு வருடம்',
            yy: '%d ஆண்டுகள்'
        },
        dayOfMonthOrdinalParse: /\d{1,2}வது/,
        ordinal: function ordinal(number) {
            return number + 'வது';
        },
        preparse: function preparse(string) {
            return string.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function postformat(string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        // refer http://ta.wikipedia.org/s/1er1
        meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 2) {
                return ' யாமம்';
            } else if (hour < 6) {
                return ' வைகறை'; // வைகறை
            } else if (hour < 10) {
                return ' காலை'; // காலை
            } else if (hour < 14) {
                return ' நண்பகல்'; // நண்பகல்
            } else if (hour < 18) {
                return ' எற்பாடு'; // எற்பாடு
            } else if (hour < 22) {
                return ' மாலை'; // மாலை
            } else {
                return ' யாமம்';
            }
        },
        meridiemHour: function meridiemHour(hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'யாமம்') {
                return hour < 2 ? hour : hour + 12;
            } else if (meridiem === 'வைகறை' || meridiem === 'காலை') {
                return hour;
            } else if (meridiem === 'நண்பகல்') {
                return hour >= 10 ? hour : hour + 12;
            } else {
                return hour + 12;
            }
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ta;
});

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Telugu [te]
//! author : Krishna Chaitanya Thota : https://github.com/kcthota

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var te = moment.defineLocale('te', {
        months: 'జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్'.split('_'),
        monthsShort: 'జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.'.split('_'),
        monthsParseExact: true,
        weekdays: 'ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం'.split('_'),
        weekdaysShort: 'ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని'.split('_'),
        weekdaysMin: 'ఆ_సో_మం_బు_గు_శు_శ'.split('_'),
        longDateFormat: {
            LT: 'A h:mm',
            LTS: 'A h:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, A h:mm',
            LLLL: 'dddd, D MMMM YYYY, A h:mm'
        },
        calendar: {
            sameDay: '[నేడు] LT',
            nextDay: '[రేపు] LT',
            nextWeek: 'dddd, LT',
            lastDay: '[నిన్న] LT',
            lastWeek: '[గత] dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s లో',
            past: '%s క్రితం',
            s: 'కొన్ని క్షణాలు',
            m: 'ఒక నిమిషం',
            mm: '%d నిమిషాలు',
            h: 'ఒక గంట',
            hh: '%d గంటలు',
            d: 'ఒక రోజు',
            dd: '%d రోజులు',
            M: 'ఒక నెల',
            MM: '%d నెలలు',
            y: 'ఒక సంవత్సరం',
            yy: '%d సంవత్సరాలు'
        },
        dayOfMonthOrdinalParse: /\d{1,2}వ/,
        ordinal: '%dవ',
        meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
        meridiemHour: function meridiemHour(hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'రాత్రి') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'ఉదయం') {
                return hour;
            } else if (meridiem === 'మధ్యాహ్నం') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'సాయంత్రం') {
                return hour + 12;
            }
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 4) {
                return 'రాత్రి';
            } else if (hour < 10) {
                return 'ఉదయం';
            } else if (hour < 17) {
                return 'మధ్యాహ్నం';
            } else if (hour < 20) {
                return 'సాయంత్రం';
            } else {
                return 'రాత్రి';
            }
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return te;
});

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Tetun Dili (East Timor) [tet]
//! author : Joshua Brooks : https://github.com/joshbrooks
//! author : Onorio De J. Afonso : https://github.com/marobo

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var tet = moment.defineLocale('tet', {
        months: 'Janeiru_Fevereiru_Marsu_Abril_Maiu_Juniu_Juliu_Augustu_Setembru_Outubru_Novembru_Dezembru'.split('_'),
        monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Aug_Set_Out_Nov_Dez'.split('_'),
        weekdays: 'Domingu_Segunda_Tersa_Kuarta_Kinta_Sexta_Sabadu'.split('_'),
        weekdaysShort: 'Dom_Seg_Ters_Kua_Kint_Sext_Sab'.split('_'),
        weekdaysMin: 'Do_Seg_Te_Ku_Ki_Sex_Sa'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Ohin iha] LT',
            nextDay: '[Aban iha] LT',
            nextWeek: 'dddd [iha] LT',
            lastDay: '[Horiseik iha] LT',
            lastWeek: 'dddd [semana kotuk] [iha] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'iha %s',
            past: '%s liuba',
            s: 'minutu balun',
            m: 'minutu ida',
            mm: 'minutus %d',
            h: 'horas ida',
            hh: 'horas %d',
            d: 'loron ida',
            dd: 'loron %d',
            M: 'fulan ida',
            MM: 'fulan %d',
            y: 'tinan ida',
            yy: 'tinan %d'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function ordinal(number) {
            var b = number % 10,
                output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return tet;
});

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Thai [th]
//! author : Kridsada Thanabulpong : https://github.com/sirn

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var th = moment.defineLocale('th', {
        months: 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
        monthsShort: 'ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.'.split('_'),
        monthsParseExact: true,
        weekdays: 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
        weekdaysShort: 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์'.split('_'), // yes, three characters difference
        weekdaysMin: 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY เวลา H:mm',
            LLLL: 'วันddddที่ D MMMM YYYY เวลา H:mm'
        },
        meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
        isPM: function isPM(input) {
            return input === 'หลังเที่ยง';
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 12) {
                return 'ก่อนเที่ยง';
            } else {
                return 'หลังเที่ยง';
            }
        },
        calendar: {
            sameDay: '[วันนี้ เวลา] LT',
            nextDay: '[พรุ่งนี้ เวลา] LT',
            nextWeek: 'dddd[หน้า เวลา] LT',
            lastDay: '[เมื่อวานนี้ เวลา] LT',
            lastWeek: '[วัน]dddd[ที่แล้ว เวลา] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'อีก %s',
            past: '%sที่แล้ว',
            s: 'ไม่กี่วินาที',
            m: '1 นาที',
            mm: '%d นาที',
            h: '1 ชั่วโมง',
            hh: '%d ชั่วโมง',
            d: '1 วัน',
            dd: '%d วัน',
            M: '1 เดือน',
            MM: '%d เดือน',
            y: '1 ปี',
            yy: '%d ปี'
        }
    });

    return th;
});

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Tagalog (Philippines) [tl-ph]
//! author : Dan Hagman : https://github.com/hagmandan

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var tlPh = moment.defineLocale('tl-ph', {
        months: 'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre'.split('_'),
        monthsShort: 'Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis'.split('_'),
        weekdays: 'Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado'.split('_'),
        weekdaysShort: 'Lin_Lun_Mar_Miy_Huw_Biy_Sab'.split('_'),
        weekdaysMin: 'Li_Lu_Ma_Mi_Hu_Bi_Sab'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'MM/D/YYYY',
            LL: 'MMMM D, YYYY',
            LLL: 'MMMM D, YYYY HH:mm',
            LLLL: 'dddd, MMMM DD, YYYY HH:mm'
        },
        calendar: {
            sameDay: 'LT [ngayong araw]',
            nextDay: '[Bukas ng] LT',
            nextWeek: 'LT [sa susunod na] dddd',
            lastDay: 'LT [kahapon]',
            lastWeek: 'LT [noong nakaraang] dddd',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'sa loob ng %s',
            past: '%s ang nakalipas',
            s: 'ilang segundo',
            m: 'isang minuto',
            mm: '%d minuto',
            h: 'isang oras',
            hh: '%d oras',
            d: 'isang araw',
            dd: '%d araw',
            M: 'isang buwan',
            MM: '%d buwan',
            y: 'isang taon',
            yy: '%d taon'
        },
        dayOfMonthOrdinalParse: /\d{1,2}/,
        ordinal: function ordinal(number) {
            return number;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return tlPh;
});

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Klingon [tlh]
//! author : Dominika Kruk : https://github.com/amaranthrose

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var numbersNouns = 'pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut'.split('_');

    function translateFuture(output) {
        var time = output;
        time = output.indexOf('jaj') !== -1 ? time.slice(0, -3) + 'leS' : output.indexOf('jar') !== -1 ? time.slice(0, -3) + 'waQ' : output.indexOf('DIS') !== -1 ? time.slice(0, -3) + 'nem' : time + ' pIq';
        return time;
    }

    function translatePast(output) {
        var time = output;
        time = output.indexOf('jaj') !== -1 ? time.slice(0, -3) + 'Hu’' : output.indexOf('jar') !== -1 ? time.slice(0, -3) + 'wen' : output.indexOf('DIS') !== -1 ? time.slice(0, -3) + 'ben' : time + ' ret';
        return time;
    }

    function translate(number, withoutSuffix, string, isFuture) {
        var numberNoun = numberAsNoun(number);
        switch (string) {
            case 'mm':
                return numberNoun + ' tup';
            case 'hh':
                return numberNoun + ' rep';
            case 'dd':
                return numberNoun + ' jaj';
            case 'MM':
                return numberNoun + ' jar';
            case 'yy':
                return numberNoun + ' DIS';
        }
    }

    function numberAsNoun(number) {
        var hundred = Math.floor(number % 1000 / 100),
            ten = Math.floor(number % 100 / 10),
            one = number % 10,
            word = '';
        if (hundred > 0) {
            word += numbersNouns[hundred] + 'vatlh';
        }
        if (ten > 0) {
            word += (word !== '' ? ' ' : '') + numbersNouns[ten] + 'maH';
        }
        if (one > 0) {
            word += (word !== '' ? ' ' : '') + numbersNouns[one];
        }
        return word === '' ? 'pagh' : word;
    }

    var tlh = moment.defineLocale('tlh', {
        months: 'tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’'.split('_'),
        monthsShort: 'jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’'.split('_'),
        monthsParseExact: true,
        weekdays: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
        weekdaysShort: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
        weekdaysMin: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[DaHjaj] LT',
            nextDay: '[wa’leS] LT',
            nextWeek: 'LLL',
            lastDay: '[wa’Hu’] LT',
            lastWeek: 'LLL',
            sameElse: 'L'
        },
        relativeTime: {
            future: translateFuture,
            past: translatePast,
            s: 'puS lup',
            m: 'wa’ tup',
            mm: translate,
            h: 'wa’ rep',
            hh: translate,
            d: 'wa’ jaj',
            dd: translate,
            M: 'wa’ jar',
            MM: translate,
            y: 'wa’ DIS',
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return tlh;
});

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Turkish [tr]
//! authors : Erhan Gundogan : https://github.com/erhangundogan,
//!           Burak Yiğit Kaya: https://github.com/BYK

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var suffixes = {
        1: '\'inci',
        5: '\'inci',
        8: '\'inci',
        70: '\'inci',
        80: '\'inci',
        2: '\'nci',
        7: '\'nci',
        20: '\'nci',
        50: '\'nci',
        3: '\'üncü',
        4: '\'üncü',
        100: '\'üncü',
        6: '\'ncı',
        9: '\'uncu',
        10: '\'uncu',
        30: '\'uncu',
        60: '\'ıncı',
        90: '\'ıncı'
    };

    var tr = moment.defineLocale('tr', {
        months: 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
        monthsShort: 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
        weekdays: 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
        weekdaysShort: 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
        weekdaysMin: 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[bugün saat] LT',
            nextDay: '[yarın saat] LT',
            nextWeek: '[haftaya] dddd [saat] LT',
            lastDay: '[dün] LT',
            lastWeek: '[geçen hafta] dddd [saat] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s sonra',
            past: '%s önce',
            s: 'birkaç saniye',
            m: 'bir dakika',
            mm: '%d dakika',
            h: 'bir saat',
            hh: '%d saat',
            d: 'bir gün',
            dd: '%d gün',
            M: 'bir ay',
            MM: '%d ay',
            y: 'bir yıl',
            yy: '%d yıl'
        },
        dayOfMonthOrdinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
        ordinal: function ordinal(number) {
            if (number === 0) {
                // special case for zero
                return number + '\'ıncı';
            }
            var a = number % 10,
                b = number % 100 - a,
                c = number >= 100 ? 100 : null;
            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return tr;
});

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Talossan [tzl]
//! author : Robin van der Vliet : https://github.com/robin0van0der0v
//! author : Iustì Canun

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    // After the year there should be a slash and the amount of years since December 26, 1979 in Roman numerals.
    // This is currently too difficult (maybe even impossible) to add.

    var tzl = moment.defineLocale('tzl', {
        months: 'Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar'.split('_'),
        monthsShort: 'Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec'.split('_'),
        weekdays: 'Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi'.split('_'),
        weekdaysShort: 'Súl_Lún_Mai_Már_Xhú_Vié_Sát'.split('_'),
        weekdaysMin: 'Sú_Lú_Ma_Má_Xh_Vi_Sá'.split('_'),
        longDateFormat: {
            LT: 'HH.mm',
            LTS: 'HH.mm.ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM [dallas] YYYY',
            LLL: 'D. MMMM [dallas] YYYY HH.mm',
            LLLL: 'dddd, [li] D. MMMM [dallas] YYYY HH.mm'
        },
        meridiemParse: /d\'o|d\'a/i,
        isPM: function isPM(input) {
            return 'd\'o' === input.toLowerCase();
        },
        meridiem: function meridiem(hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'd\'o' : 'D\'O';
            } else {
                return isLower ? 'd\'a' : 'D\'A';
            }
        },
        calendar: {
            sameDay: '[oxhi à] LT',
            nextDay: '[demà à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[ieiri à] LT',
            lastWeek: '[sür el] dddd [lasteu à] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'osprei %s',
            past: 'ja%s',
            s: processRelativeTime,
            m: processRelativeTime,
            mm: processRelativeTime,
            h: processRelativeTime,
            hh: processRelativeTime,
            d: processRelativeTime,
            dd: processRelativeTime,
            M: processRelativeTime,
            MM: processRelativeTime,
            y: processRelativeTime,
            yy: processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            's': ['viensas secunds', '\'iensas secunds'],
            'm': ['\'n míut', '\'iens míut'],
            'mm': [number + ' míuts', '' + number + ' míuts'],
            'h': ['\'n þora', '\'iensa þora'],
            'hh': [number + ' þoras', '' + number + ' þoras'],
            'd': ['\'n ziua', '\'iensa ziua'],
            'dd': [number + ' ziuas', '' + number + ' ziuas'],
            'M': ['\'n mes', '\'iens mes'],
            'MM': [number + ' mesen', '' + number + ' mesen'],
            'y': ['\'n ar', '\'iens ar'],
            'yy': [number + ' ars', '' + number + ' ars']
        };
        return isFuture ? format[key][0] : withoutSuffix ? format[key][0] : format[key][1];
    }

    return tzl;
});

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Central Atlas Tamazight [tzm]
//! author : Abdel Said : https://github.com/abdelsaid

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var tzm = moment.defineLocale('tzm', {
        months: 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
        monthsShort: 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
        weekdays: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
        weekdaysShort: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
        weekdaysMin: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[ⴰⵙⴷⵅ ⴴ] LT',
            nextDay: '[ⴰⵙⴽⴰ ⴴ] LT',
            nextWeek: 'dddd [ⴴ] LT',
            lastDay: '[ⴰⵚⴰⵏⵜ ⴴ] LT',
            lastWeek: 'dddd [ⴴ] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s',
            past: 'ⵢⴰⵏ %s',
            s: 'ⵉⵎⵉⴽ',
            m: 'ⵎⵉⵏⵓⴺ',
            mm: '%d ⵎⵉⵏⵓⴺ',
            h: 'ⵙⴰⵄⴰ',
            hh: '%d ⵜⴰⵙⵙⴰⵄⵉⵏ',
            d: 'ⴰⵙⵙ',
            dd: '%d oⵙⵙⴰⵏ',
            M: 'ⴰⵢoⵓⵔ',
            MM: '%d ⵉⵢⵢⵉⵔⵏ',
            y: 'ⴰⵙⴳⴰⵙ',
            yy: '%d ⵉⵙⴳⴰⵙⵏ'
        },
        week: {
            dow: 6, // Saturday is the first day of the week.
            doy: 12 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return tzm;
});

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Central Atlas Tamazight Latin [tzm-latn]
//! author : Abdel Said : https://github.com/abdelsaid

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var tzmLatn = moment.defineLocale('tzm-latn', {
        months: 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
        monthsShort: 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
        weekdays: 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
        weekdaysShort: 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
        weekdaysMin: 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[asdkh g] LT',
            nextDay: '[aska g] LT',
            nextWeek: 'dddd [g] LT',
            lastDay: '[assant g] LT',
            lastWeek: 'dddd [g] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'dadkh s yan %s',
            past: 'yan %s',
            s: 'imik',
            m: 'minuḍ',
            mm: '%d minuḍ',
            h: 'saɛa',
            hh: '%d tassaɛin',
            d: 'ass',
            dd: '%d ossan',
            M: 'ayowr',
            MM: '%d iyyirn',
            y: 'asgas',
            yy: '%d isgasn'
        },
        week: {
            dow: 6, // Saturday is the first day of the week.
            doy: 12 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return tzmLatn;
});

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Ukrainian [uk]
//! author : zemlanin : https://github.com/zemlanin
//! Author : Menelion Elensúle : https://github.com/Oire

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    function plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
    }
    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'mm': withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
            'hh': withoutSuffix ? 'година_години_годин' : 'годину_години_годин',
            'dd': 'день_дні_днів',
            'MM': 'місяць_місяці_місяців',
            'yy': 'рік_роки_років'
        };
        if (key === 'm') {
            return withoutSuffix ? 'хвилина' : 'хвилину';
        } else if (key === 'h') {
            return withoutSuffix ? 'година' : 'годину';
        } else {
            return number + ' ' + plural(format[key], +number);
        }
    }
    function weekdaysCaseReplace(m, format) {
        var weekdays = {
            'nominative': 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
            'accusative': 'неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу'.split('_'),
            'genitive': 'неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи'.split('_')
        };

        if (!m) {
            return weekdays['nominative'];
        }

        var nounCase = /(\[[ВвУу]\]) ?dddd/.test(format) ? 'accusative' : /\[?(?:минулої|наступної)? ?\] ?dddd/.test(format) ? 'genitive' : 'nominative';
        return weekdays[nounCase][m.day()];
    }
    function processHoursFunction(str) {
        return function () {
            return str + 'о' + (this.hours() === 11 ? 'б' : '') + '] LT';
        };
    }

    var uk = moment.defineLocale('uk', {
        months: {
            'format': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_'),
            'standalone': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_')
        },
        monthsShort: 'січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
        weekdays: weekdaysCaseReplace,
        weekdaysShort: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
        weekdaysMin: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY р.',
            LLL: 'D MMMM YYYY р., HH:mm',
            LLLL: 'dddd, D MMMM YYYY р., HH:mm'
        },
        calendar: {
            sameDay: processHoursFunction('[Сьогодні '),
            nextDay: processHoursFunction('[Завтра '),
            lastDay: processHoursFunction('[Вчора '),
            nextWeek: processHoursFunction('[У] dddd ['),
            lastWeek: function lastWeek() {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 5:
                    case 6:
                        return processHoursFunction('[Минулої] dddd [').call(this);
                    case 1:
                    case 2:
                    case 4:
                        return processHoursFunction('[Минулого] dddd [').call(this);
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'за %s',
            past: '%s тому',
            s: 'декілька секунд',
            m: relativeTimeWithPlural,
            mm: relativeTimeWithPlural,
            h: 'годину',
            hh: relativeTimeWithPlural,
            d: 'день',
            dd: relativeTimeWithPlural,
            M: 'місяць',
            MM: relativeTimeWithPlural,
            y: 'рік',
            yy: relativeTimeWithPlural
        },
        // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
        meridiemParse: /ночі|ранку|дня|вечора/,
        isPM: function isPM(input) {
            return (/^(дня|вечора)$/.test(input)
            );
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 4) {
                return 'ночі';
            } else if (hour < 12) {
                return 'ранку';
            } else if (hour < 17) {
                return 'дня';
            } else {
                return 'вечора';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(й|го)/,
        ordinal: function ordinal(number, period) {
            switch (period) {
                case 'M':
                case 'd':
                case 'DDD':
                case 'w':
                case 'W':
                    return number + '-й';
                case 'D':
                    return number + '-го';
                default:
                    return number;
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return uk;
});

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Urdu [ur]
//! author : Sawood Alam : https://github.com/ibnesayeed
//! author : Zack : https://github.com/ZackVision

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var months = ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'];
    var days = ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'];

    var ur = moment.defineLocale('ur', {
        months: months,
        monthsShort: months,
        weekdays: days,
        weekdaysShort: days,
        weekdaysMin: days,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd، D MMMM YYYY HH:mm'
        },
        meridiemParse: /صبح|شام/,
        isPM: function isPM(input) {
            return 'شام' === input;
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 12) {
                return 'صبح';
            }
            return 'شام';
        },
        calendar: {
            sameDay: '[آج بوقت] LT',
            nextDay: '[کل بوقت] LT',
            nextWeek: 'dddd [بوقت] LT',
            lastDay: '[گذشتہ روز بوقت] LT',
            lastWeek: '[گذشتہ] dddd [بوقت] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s بعد',
            past: '%s قبل',
            s: 'چند سیکنڈ',
            m: 'ایک منٹ',
            mm: '%d منٹ',
            h: 'ایک گھنٹہ',
            hh: '%d گھنٹے',
            d: 'ایک دن',
            dd: '%d دن',
            M: 'ایک ماہ',
            MM: '%d ماہ',
            y: 'ایک سال',
            yy: '%d سال'
        },
        preparse: function preparse(string) {
            return string.replace(/،/g, ',');
        },
        postformat: function postformat(string) {
            return string.replace(/,/g, '،');
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return ur;
});

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Uzbek [uz]
//! author : Sardor Muminov : https://github.com/muminoff

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var uz = moment.defineLocale('uz', {
        months: 'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
        monthsShort: 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
        weekdays: 'Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба'.split('_'),
        weekdaysShort: 'Якш_Душ_Сеш_Чор_Пай_Жум_Шан'.split('_'),
        weekdaysMin: 'Як_Ду_Се_Чо_Па_Жу_Ша'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'D MMMM YYYY, dddd HH:mm'
        },
        calendar: {
            sameDay: '[Бугун соат] LT [да]',
            nextDay: '[Эртага] LT [да]',
            nextWeek: 'dddd [куни соат] LT [да]',
            lastDay: '[Кеча соат] LT [да]',
            lastWeek: '[Утган] dddd [куни соат] LT [да]',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'Якин %s ичида',
            past: 'Бир неча %s олдин',
            s: 'фурсат',
            m: 'бир дакика',
            mm: '%d дакика',
            h: 'бир соат',
            hh: '%d соат',
            d: 'бир кун',
            dd: '%d кун',
            M: 'бир ой',
            MM: '%d ой',
            y: 'бир йил',
            yy: '%d йил'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return uz;
});

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Uzbek Latin [uz-latn]
//! author : Rasulbek Mirzayev : github.com/Rasulbeeek

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var uzLatn = moment.defineLocale('uz-latn', {
        months: 'Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr'.split('_'),
        monthsShort: 'Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek'.split('_'),
        weekdays: 'Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba'.split('_'),
        weekdaysShort: 'Yak_Dush_Sesh_Chor_Pay_Jum_Shan'.split('_'),
        weekdaysMin: 'Ya_Du_Se_Cho_Pa_Ju_Sha'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'D MMMM YYYY, dddd HH:mm'
        },
        calendar: {
            sameDay: '[Bugun soat] LT [da]',
            nextDay: '[Ertaga] LT [da]',
            nextWeek: 'dddd [kuni soat] LT [da]',
            lastDay: '[Kecha soat] LT [da]',
            lastWeek: '[O\'tgan] dddd [kuni soat] LT [da]',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'Yaqin %s ichida',
            past: 'Bir necha %s oldin',
            s: 'soniya',
            m: 'bir daqiqa',
            mm: '%d daqiqa',
            h: 'bir soat',
            hh: '%d soat',
            d: 'bir kun',
            dd: '%d kun',
            M: 'bir oy',
            MM: '%d oy',
            y: 'bir yil',
            yy: '%d yil'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return uzLatn;
});

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Vietnamese [vi]
//! author : Bang Nguyen : https://github.com/bangnk

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var vi = moment.defineLocale('vi', {
        months: 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'),
        monthsShort: 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
        monthsParseExact: true,
        weekdays: 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
        weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
        weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
        weekdaysParseExact: true,
        meridiemParse: /sa|ch/i,
        isPM: function isPM(input) {
            return (/^ch$/i.test(input)
            );
        },
        meridiem: function meridiem(hours, minutes, isLower) {
            if (hours < 12) {
                return isLower ? 'sa' : 'SA';
            } else {
                return isLower ? 'ch' : 'CH';
            }
        },
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM [năm] YYYY',
            LLL: 'D MMMM [năm] YYYY HH:mm',
            LLLL: 'dddd, D MMMM [năm] YYYY HH:mm',
            l: 'DD/M/YYYY',
            ll: 'D MMM YYYY',
            lll: 'D MMM YYYY HH:mm',
            llll: 'ddd, D MMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Hôm nay lúc] LT',
            nextDay: '[Ngày mai lúc] LT',
            nextWeek: 'dddd [tuần tới lúc] LT',
            lastDay: '[Hôm qua lúc] LT',
            lastWeek: 'dddd [tuần rồi lúc] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s tới',
            past: '%s trước',
            s: 'vài giây',
            m: 'một phút',
            mm: '%d phút',
            h: 'một giờ',
            hh: '%d giờ',
            d: 'một ngày',
            dd: '%d ngày',
            M: 'một tháng',
            MM: '%d tháng',
            y: 'một năm',
            yy: '%d năm'
        },
        dayOfMonthOrdinalParse: /\d{1,2}/,
        ordinal: function ordinal(number) {
            return number;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return vi;
});

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Pseudo [x-pseudo]
//! author : Andrew Hood : https://github.com/andrewhood125

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var xPseudo = moment.defineLocale('x-pseudo', {
        months: 'J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér'.split('_'),
        monthsShort: 'J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc'.split('_'),
        monthsParseExact: true,
        weekdays: 'S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý'.split('_'),
        weekdaysShort: 'S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát'.split('_'),
        weekdaysMin: 'S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[T~ódá~ý át] LT',
            nextDay: '[T~ómó~rró~w át] LT',
            nextWeek: 'dddd [át] LT',
            lastDay: '[Ý~ést~érdá~ý át] LT',
            lastWeek: '[L~ást] dddd [át] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'í~ñ %s',
            past: '%s á~gó',
            s: 'á ~féw ~sécó~ñds',
            m: 'á ~míñ~úté',
            mm: '%d m~íñú~tés',
            h: 'á~ñ hó~úr',
            hh: '%d h~óúrs',
            d: 'á ~dáý',
            dd: '%d d~áýs',
            M: 'á ~móñ~th',
            MM: '%d m~óñt~hs',
            y: 'á ~ýéár',
            yy: '%d ý~éárs'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function ordinal(number) {
            var b = number % 10,
                output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return xPseudo;
});

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Yoruba Nigeria [yo]
//! author : Atolagbe Abisoye : https://github.com/andela-batolagbe

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var yo = moment.defineLocale('yo', {
        months: 'Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀'.split('_'),
        monthsShort: 'Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀'.split('_'),
        weekdays: 'Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta'.split('_'),
        weekdaysShort: 'Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá'.split('_'),
        weekdaysMin: 'Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb'.split('_'),
        longDateFormat: {
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY h:mm A',
            LLLL: 'dddd, D MMMM YYYY h:mm A'
        },
        calendar: {
            sameDay: '[Ònì ni] LT',
            nextDay: '[Ọ̀la ni] LT',
            nextWeek: 'dddd [Ọsẹ̀ tón\'bọ] [ni] LT',
            lastDay: '[Àna ni] LT',
            lastWeek: 'dddd [Ọsẹ̀ tólọ́] [ni] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'ní %s',
            past: '%s kọjá',
            s: 'ìsẹjú aayá die',
            m: 'ìsẹjú kan',
            mm: 'ìsẹjú %d',
            h: 'wákati kan',
            hh: 'wákati %d',
            d: 'ọjọ́ kan',
            dd: 'ọjọ́ %d',
            M: 'osù kan',
            MM: 'osù %d',
            y: 'ọdún kan',
            yy: 'ọdún %d'
        },
        dayOfMonthOrdinalParse: /ọjọ́\s\d{1,2}/,
        ordinal: 'ọjọ́ %d',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return yo;
});

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Chinese (China) [zh-cn]
//! author : suupic : https://github.com/suupic
//! author : Zeno Zeng : https://github.com/zenozeng

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var zhCn = moment.defineLocale('zh-cn', {
        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY年MMMD日',
            LL: 'YYYY年MMMD日',
            LLL: 'YYYY年MMMD日Ah点mm分',
            LLLL: 'YYYY年MMMD日ddddAh点mm分',
            l: 'YYYY年MMMD日',
            ll: 'YYYY年MMMD日',
            lll: 'YYYY年MMMD日 HH:mm',
            llll: 'YYYY年MMMD日dddd HH:mm'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function meridiemHour(hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
                return hour;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            } else {
                // '中午'
                return hour >= 11 ? hour : hour + 12;
            }
        },
        meridiem: function meridiem(hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar: {
            sameDay: '[今天]LT',
            nextDay: '[明天]LT',
            nextWeek: '[下]ddddLT',
            lastDay: '[昨天]LT',
            lastWeek: '[上]ddddLT',
            sameElse: 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
        ordinal: function ordinal(number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                case 'M':
                    return number + '月';
                case 'w':
                case 'W':
                    return number + '周';
                default:
                    return number;
            }
        },
        relativeTime: {
            future: '%s内',
            past: '%s前',
            s: '几秒',
            m: '1 分钟',
            mm: '%d 分钟',
            h: '1 小时',
            hh: '%d 小时',
            d: '1 天',
            dd: '%d 天',
            M: '1 个月',
            MM: '%d 个月',
            y: '1 年',
            yy: '%d 年'
        },
        week: {
            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return zhCn;
});

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Chinese (Hong Kong) [zh-hk]
//! author : Ben : https://github.com/ben-lin
//! author : Chris Lam : https://github.com/hehachris
//! author : Konstantin : https://github.com/skfd

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var zhHk = moment.defineLocale('zh-hk', {
        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort: '週日_週一_週二_週三_週四_週五_週六'.split('_'),
        weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY年MMMD日',
            LL: 'YYYY年MMMD日',
            LLL: 'YYYY年MMMD日 HH:mm',
            LLLL: 'YYYY年MMMD日dddd HH:mm',
            l: 'YYYY年MMMD日',
            ll: 'YYYY年MMMD日',
            lll: 'YYYY年MMMD日 HH:mm',
            llll: 'YYYY年MMMD日dddd HH:mm'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function meridiemHour(hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
                return hour;
            } else if (meridiem === '中午') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            }
        },
        meridiem: function meridiem(hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar: {
            sameDay: '[今天]LT',
            nextDay: '[明天]LT',
            nextWeek: '[下]ddddLT',
            lastDay: '[昨天]LT',
            lastWeek: '[上]ddddLT',
            sameElse: 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
        ordinal: function ordinal(number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                case 'M':
                    return number + '月';
                case 'w':
                case 'W':
                    return number + '週';
                default:
                    return number;
            }
        },
        relativeTime: {
            future: '%s內',
            past: '%s前',
            s: '幾秒',
            m: '1 分鐘',
            mm: '%d 分鐘',
            h: '1 小時',
            hh: '%d 小時',
            d: '1 天',
            dd: '%d 天',
            M: '1 個月',
            MM: '%d 個月',
            y: '1 年',
            yy: '%d 年'
        }
    });

    return zhHk;
});

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js locale configuration
//! locale : Chinese (Taiwan) [zh-tw]
//! author : Ben : https://github.com/ben-lin
//! author : Chris Lam : https://github.com/hehachris

;(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
})(undefined, function (moment) {
    'use strict';

    var zhTw = moment.defineLocale('zh-tw', {
        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort: '週日_週一_週二_週三_週四_週五_週六'.split('_'),
        weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY年MMMD日',
            LL: 'YYYY年MMMD日',
            LLL: 'YYYY年MMMD日 HH:mm',
            LLLL: 'YYYY年MMMD日dddd HH:mm',
            l: 'YYYY年MMMD日',
            ll: 'YYYY年MMMD日',
            lll: 'YYYY年MMMD日 HH:mm',
            llll: 'YYYY年MMMD日dddd HH:mm'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function meridiemHour(hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
                return hour;
            } else if (meridiem === '中午') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            }
        },
        meridiem: function meridiem(hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar: {
            sameDay: '[今天]LT',
            nextDay: '[明天]LT',
            nextWeek: '[下]ddddLT',
            lastDay: '[昨天]LT',
            lastWeek: '[上]ddddLT',
            sameElse: 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
        ordinal: function ordinal(number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                case 'M':
                    return number + '月';
                case 'w':
                case 'W':
                    return number + '週';
                default:
                    return number;
            }
        },
        relativeTime: {
            future: '%s內',
            past: '%s前',
            s: '幾秒',
            m: '1 分鐘',
            mm: '%d 分鐘',
            h: '1 小時',
            hh: '%d 小時',
            d: '1 天',
            dd: '%d 天',
            M: '1 個月',
            MM: '%d 個月',
            y: '1 年',
            yy: '%d 年'
        }
    });

    return zhTw;
});

/***/ }),
/* 128 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(130);
__webpack_require__(11);
module.exports = __webpack_require__(12);


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hyperapp = __webpack_require__(1);

var _actions = __webpack_require__(133);

var _actions2 = _interopRequireDefault(_actions);

var _state = __webpack_require__(142);

var _state2 = _interopRequireDefault(_state);

var _Main = __webpack_require__(143);

var _Main2 = _interopRequireDefault(_Main);

var _events = __webpack_require__(167);

var _events2 = _interopRequireDefault(_events);

var _logger = __webpack_require__(168);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _hyperapp.app)({ state: _state2.default, events: _events2.default, actions: _actions2.default, view: _Main2.default, mixins: [(0, _logger2.default)()] });

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.h = h;
var i;
var stack = [];

function h(tag, data) {
  var node;
  var children = [];

  for (i = arguments.length; i-- > 2;) {
    stack.push(arguments[i]);
  }

  while (stack.length) {
    if (Array.isArray(node = stack.pop())) {
      for (i = node.length; i--;) {
        stack.push(node[i]);
      }
    } else if (node != null && node !== true && node !== false) {
      if (typeof node === "number") {
        node = node + "";
      }
      children.push(node);
    }
  }

  return typeof tag === "string" ? {
    tag: tag,
    data: data || {},
    children: children
  } : tag(data, children);
}

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = app;
var globalInvokeLaterStack = [];

function app(props) {
  var appState;
  var appView = props.view;
  var appActions = {};
  var appEvents = {};
  var appMixins = props.mixins || [];
  var appRoot = props.root || document.body;
  var element;
  var oldNode;
  var renderLock;

  appMixins.concat(props).map(function (mixin) {
    mixin = typeof mixin === "function" ? mixin(emit) : mixin;

    Object.keys(mixin.events || []).map(function (key) {
      appEvents[key] = (appEvents[key] || []).concat(mixin.events[key]);
    });

    appState = merge(appState, mixin.state);
    initialize(appActions, mixin.actions);
  });

  requestRender((oldNode = emit("load", element = appRoot.children[0])) === element && (oldNode = element = null));

  return emit;

  function initialize(actions, withActions, lastName) {
    Object.keys(withActions || []).map(function (key) {
      var action = withActions[key];
      var name = lastName ? lastName + "." + key : key;

      if (typeof action === "function") {
        actions[key] = function (data) {
          emit("action", { name: name, data: data });

          var result = emit("resolve", action(appState, appActions, data));

          return typeof result === "function" ? result(update) : update(result);
        };
      } else {
        initialize(actions[key] || (actions[key] = {}), action, name);
      }
    });
  }

  function render(cb) {
    element = patch(appRoot, element, oldNode, oldNode = emit("render", appView)(appState, appActions), renderLock = !renderLock);
    while (cb = globalInvokeLaterStack.pop()) {
      cb();
    }
  }

  function requestRender() {
    if (appView && !renderLock) {
      requestAnimationFrame(render, renderLock = !renderLock);
    }
  }

  function update(withState) {
    if (typeof withState === "function") {
      return update(withState(appState));
    }
    if (withState && (withState = emit("update", merge(appState, withState)))) {
      requestRender(appState = withState);
    }
    return appState;
  }

  function emit(name, data) {
    return (appEvents[name] || []).map(function (cb) {
      var result = cb(appState, appActions, data);
      if (result != null) {
        data = result;
      }
    }), data;
  }

  function merge(a, b) {
    var obj = {};

    for (var i in a) {
      obj[i] = a[i];
    }

    for (var i in b) {
      obj[i] = b[i];
    }

    return obj;
  }

  function getKey(node) {
    if (node && (node = node.data)) {
      return node.key;
    }
  }

  function createElement(node, isSVG) {
    if (typeof node === "string") {
      var element = document.createTextNode(node);
    } else {
      var element = (isSVG = isSVG || node.tag === "svg") ? document.createElementNS("http://www.w3.org/2000/svg", node.tag) : document.createElement(node.tag);

      if (node.data && node.data.oncreate) {
        globalInvokeLaterStack.push(function () {
          node.data.oncreate(element);
        });
      }

      for (var i in node.data) {
        setData(element, i, node.data[i]);
      }

      for (var i = 0; i < node.children.length;) {
        element.appendChild(createElement(node.children[i++], isSVG));
      }
    }

    return element;
  }

  function setData(element, name, value, oldValue) {
    if (name === "key") {} else if (name === "style") {
      for (var i in merge(oldValue, value = value || {})) {
        element.style[i] = value[i] || "";
      }
    } else {
      try {
        element[name] = value;
      } catch (_) {}

      if (typeof value !== "function") {
        if (value) {
          element.setAttribute(name, value);
        } else {
          element.removeAttribute(name);
        }
      }
    }
  }

  function updateElement(element, oldData, data) {
    for (var i in merge(oldData, data)) {
      var value = data[i];
      var oldValue = i === "value" || i === "checked" ? element[i] : oldData[i];

      if (value !== oldValue) {
        setData(element, i, value, oldValue);
      }
    }

    if (data && data.onupdate) {
      globalInvokeLaterStack.push(function () {
        data.onupdate(element, oldData);
      });
    }
  }

  function removeElement(parent, element, data) {
    if (data && data.onremove) {
      data.onremove(element);
    } else {
      parent.removeChild(element);
    }
  }

  function patch(parent, element, oldNode, node, isSVG, nextSibling) {
    if (oldNode == null) {
      element = parent.insertBefore(createElement(node, isSVG), element);
    } else if (node.tag != null && node.tag === oldNode.tag) {
      updateElement(element, oldNode.data, node.data);

      isSVG = isSVG || node.tag === "svg";

      var len = node.children.length;
      var oldLen = oldNode.children.length;
      var oldKeyed = {};
      var oldElements = [];
      var keyed = {};

      for (var i = 0; i < oldLen; i++) {
        var oldElement = oldElements[i] = element.childNodes[i];
        var oldChild = oldNode.children[i];
        var oldKey = getKey(oldChild);

        if (null != oldKey) {
          oldKeyed[oldKey] = [oldElement, oldChild];
        }
      }

      var i = 0;
      var j = 0;

      while (j < len) {
        var oldElement = oldElements[i];
        var oldChild = oldNode.children[i];
        var newChild = node.children[j];

        var oldKey = getKey(oldChild);
        if (keyed[oldKey]) {
          i++;
          continue;
        }

        var newKey = getKey(newChild);

        var keyedNode = oldKeyed[newKey] || [];

        if (null == newKey) {
          if (null == oldKey) {
            patch(element, oldElement, oldChild, newChild, isSVG);
            j++;
          }
          i++;
        } else {
          if (oldKey === newKey) {
            patch(element, keyedNode[0], keyedNode[1], newChild, isSVG);
            i++;
          } else if (keyedNode[0]) {
            element.insertBefore(keyedNode[0], oldElement);
            patch(element, keyedNode[0], keyedNode[1], newChild, isSVG);
          } else {
            patch(element, oldElement, null, newChild, isSVG);
          }

          j++;
          keyed[newKey] = newChild;
        }
      }

      while (i < oldLen) {
        var oldChild = oldNode.children[i];
        var oldKey = getKey(oldChild);
        if (null == oldKey) {
          removeElement(element, oldElements[i], oldChild.data);
        }
        i++;
      }

      for (var i in oldKeyed) {
        var keyedNode = oldKeyed[i];
        var reusableNode = keyedNode[1];
        if (!keyed[reusableNode.data.key]) {
          removeElement(element, keyedNode[0], reusableNode.data);
        }
      }
    } else if (element && node !== element.nodeValue) {
      if (typeof node === "string" && typeof oldNode === "string") {
        element.nodeValue = node;
      } else {
        element = parent.insertBefore(createElement(node, isSVG), nextSibling = element);
        removeElement(parent, nextSibling, oldNode.data);
      }
    }

    return element;
  }
}

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = __webpack_require__(10);

var _notification = __webpack_require__(135);

var _group = __webpack_require__(136);

var _tab = __webpack_require__(137);

var _items = __webpack_require__(138);

var _user = __webpack_require__(139);

var _post = __webpack_require__(140);

var _invite = __webpack_require__(141);

exports.default = {
    initialize: _user.initialize,
    navClicked: _common.navClicked,
    fetchNotifications: _notification.fetchNotifications,
    fetchGroups: _group.fetchGroups,
    setGroups: _group.setGroups,
    fetchItems: _items.fetchItems,
    onTabChange: _tab.onTabChange,
    onScroll: _common.onScroll,
    loadMore: _items.loadMore,
    fetchAllGroups: _group.fetchAllGroups,
    fetchGroupUsers: _group.fetchGroupUsers,
    doLogin: _user.doLogin,
    doLogout: _user.doLogout,
    doRegister: _user.doRegister,
    saveProfile: _user.saveProfile,
    saveCustomization: _user.saveCustomization,
    handleFavourite: _items.handleFavourite,
    handleLike: _items.handleLike,
    showComments: _items.showComments,
    handleShare: _items.handleShare,
    handleDelete: _items.handleDelete,
    fetchComments: _items.fetchComments,
    detectSite: _post.detectSite,
    doPost: _post.doPost,
    setDefaultGroup: _group.setDefaultGroup,
    notificationClicked: _notification.notificationClicked,
    closeModal: _common.closeModal,
    handleCommentInput: _items.handleCommentInput,
    itemClicked: _items.itemClicked,
    joinGroup: _group.joinGroup,
    leaveGroup: _group.leaveGroup,
    lazyLoad: _items.lazyLoad,
    showProfile: _user.showProfile,
    getUserLinks: _user.getUserLinks,
    setNotificationCount: _notification.setNotificationCount,
    setVersion: _common.setVersion,
    showInviteModal: _invite.showInviteModal,
    setInviteList: _invite.setInviteList,
    sendInvites: _invite.sendInvites,
    withdrawInvite: _invite.withdrawInvite,
    notificationJoinedGroup: _notification.notificationJoinedGroup,
    acceptGroupInvite: _group.acceptGroupInvite,
    rejectGroupInvite: _group.rejectGroupInvite
};

/***/ }),
/* 134 */
/***/ (function(module, exports) {

module.exports = {"endpoint":"http://localhost:8000"}

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.notificationJoinedGroup = exports.setNotificationCount = exports.notificationClicked = exports.fetchNotifications = undefined;

var _request = __webpack_require__(2);

var fetchNotifications = exports.fetchNotifications = function fetchNotifications(state, actions, tab_id) {
    var tab = state.notificationTabs.tabs[tab_id];

    if (tab.data.rows.length > 0) {
        return;
    }
    return function (update) {
        var params = {
            queryParams: {
                handle: "tab-" + tab_id,
                page: 1,
                chrome_id: state.chrome_id,
                group: state.groups.defaultGroup,
                action: "readTracks",
                count: null
            }
        };
        (0, _request.request)(params).then(function (result) {
            result.page = tab.data.page;
            tab.data = result;
            tab.isFetching = false;
            state.notificationTabs.tabs[tab_id] = tab;
            update(state);
        });
    };
};

var notificationClicked = exports.notificationClicked = function notificationClicked(state, actions, _ref) {
    var active = _ref.active,
        index = _ref.index;

    return function (update) {
        var item = state.notificationTabs.tabs[active].data.rows[index];
        var params = {
            queryParams: {
                handle: "itemId",
                chrome_id: state.chrome_id,
                group: item.group_id,
                action: "readTracks",
                item_id: item.item_id
            }
        };
        (0, _request.request)(params).then(function (result) {
            state.modals.notification.open = true;
            state.modals.notification.data = result;
            update(state);
        });
    };
};

var setNotificationCount = exports.setNotificationCount = function setNotificationCount(state, actions, data) {
    state.notificationStatus = data;
    return state;
};

var notificationJoinedGroup = exports.notificationJoinedGroup = function notificationJoinedGroup(state, actions, index) {
    state.notificationTabs.tabs.notGroups.data.rows[index].accepted = 1;
    return state;
};

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rejectGroupInvite = exports.acceptGroupInvite = exports.joinGroup = exports.leaveGroup = exports.setDefaultGroup = exports.setGroups = exports.fetchGroupUsers = exports.fetchAllGroups = exports.fetchGroups = undefined;

var _request = __webpack_require__(2);

var fetchGroups = exports.fetchGroups = function fetchGroups(state, actions, tab_id) {
    var params = {
        queryParams: {
            chrome_id: state.chrome_id,
            action: "fetchUserGroups"
        }
    };
    (0, _request.request)(params).then(function (result) {
        var groupsData = result.map(function (group) {
            group.name = group.gname;
            delete group["gname"];
            return group;
        });
        actions.setGroups({
            action: "",
            payload: groupsData
        });
    });
};

var fetchAllGroups = exports.fetchAllGroups = function fetchAllGroups(state, actions, tab_id) {
    return function (update) {
        var params = {
            queryParams: {
                chrome_id: state.chrome_id,
                action: "getAllGroups"
            }
        };
        (0, _request.request)(params).then(function (result) {
            state.allGroups.isFetching = false;
            state.allGroups.data = result;
            update(state);
        });
    };
};

var fetchGroupUsers = exports.fetchGroupUsers = function fetchGroupUsers(state, actions, e) {
    return function (update) {
        var params = {
            queryParams: {
                chrome_id: state.chrome_id,
                action: "getGroupUsers",
                group: e.currentTarget.value
            }
        };
        (0, _request.request)(params).then(function (result) {
            state.groupUsers.isFetching = false;
            state.groupUsers.data = result;
            state.groupUsers.group_id = e.target.value;
            state.groupUsers.admin_id = state.allGroups.data[e.target.options.selectedIndex].admin;
            update(state);
        });
    };
};

var setGroups = exports.setGroups = function setGroups(state, actions, data) {
    state.groups.isFetching = false;
    state.groups.data = data.payload;
    return state;
};

var setDefaultGroup = exports.setDefaultGroup = function setDefaultGroup(state, actions, index) {
    state.groups.defaultGroup = parseInt(state.groups.data[index].group_id);
    localStorage.defaultGroup = state.groups.defaultGroup;
    state.mainNav.tabs.feed.data = {
        rows: [],
        page: 1,
        pages: 0,
        total: 0
    };
    actions.fetchItems({ stateKey: "mainNav", tab_id: "feed" });
    return state;
};

var leaveGroup = exports.leaveGroup = function leaveGroup(state, actions, _ref) {
    var e = _ref.e,
        key = _ref.key;

    var group = state.allGroups.data[key];
    return function (update) {
        var params = {
            method: "POST",
            queryParams: {
                chrome_id: state.chrome_id,
                action: "leaveGroup",
                group_id: group.id
            }
        };
        (0, _request.request)(params).then(function (result) {
            if (result.flag == 1) {
                actions.fetchAllGroups();
            }
        });
    };
};
var joinGroup = exports.joinGroup = function joinGroup(state, actions, _ref2) {
    var group = _ref2.group,
        callback = _ref2.callback;

    return function (update) {
        var params = {
            method: "POST",
            queryParams: {
                chrome_id: state.chrome_id,
                action: parseInt(group.is_public) ? "joinPublicGroup" : "joinPrivateGroupRequest",
                group_id: group.group_id
            }
        };
        (0, _request.request)(params).then(function (result) {
            if (result.flag == 1) {
                actions.fetchAllGroups();
                if (typeof callback == "function") callback();
            }
        });
    };
};

var acceptGroupInvite = exports.acceptGroupInvite = function acceptGroupInvite(state, actions, _ref3) {
    var e = _ref3.e,
        index = _ref3.index,
        activity = _ref3.activity;

    return function (update) {
        var params = {
            method: "POST",
            queryParams: {
                chrome_id: state.chrome_id,
                action: "acceptGroupInvite",
                group_id: activity.group_id,
                activity_id: activity.activity_id
            }
        };
        (0, _request.request)(params).then(function (result) {
            if (result.flag == 1) {
                delete state.notificationTabs.tabs.notGroups.data.rows[index];
                update(state);
            }
        });
    };
};
var rejectGroupInvite = exports.rejectGroupInvite = function rejectGroupInvite(state, actions, _ref4) {
    var e = _ref4.e,
        index = _ref4.index,
        activity = _ref4.activity;

    return function (update) {
        var params = {
            method: "POST",
            queryParams: {
                chrome_id: state.chrome_id,
                action: "rejectGroupInvite",
                group_id: activity.group_id,
                activity_id: activity.activity_id
            }
        };
        (0, _request.request)(params).then(function (result) {
            if (result.flag == 1) {
                delete state.notificationTabs.tabs.notGroups.data.rows[index];
                update(state);
            }
        });
    };
};

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var onTabChange = exports.onTabChange = function onTabChange(state, actions, _ref) {
    var stateKey = _ref.stateKey,
        tab_id = _ref.tab_id;

    state[stateKey].tabs[tab_id].isFetching = true;
    state[stateKey].active = tab_id;
    var params = { stateKey: stateKey, tab_id: tab_id };

    switch (tab_id) {
        case "notification":
            actions.onTabChange({
                stateKey: "notificationTabs",
                tab_id: state.notificationTabs.active
            });
            break;
        case "notLinks":
            actions.fetchNotifications(tab_id);
            break;
        case "notGroups":
            actions.fetchNotifications(tab_id);
            break;
        case "feed":
            actions.fetchItems(params);
            break;
        case "search":
            state[stateKey].tabs[tab_id].q = "";
            state[stateKey].tabs[tab_id].data = {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            };
            break;
        case "links":
            actions.onTabChange({
                stateKey: "linkTabs",
                tab_id: state.linkTabs.active
            });
            break;
        case "groups":
            actions.onTabChange({
                stateKey: "groupTabs",
                tab_id: state.groupTabs.active
            });
            break;
        case "favourites":
            actions.fetchItems(params);
            break;
        case "sent":
            actions.fetchItems(params);
            break;
        case "public":
            actions.fetchAllGroups(params);
            break;
        case "manage":
        //actions.fetchAllGroups(params);
    }

    return state;
};

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lazyLoad = exports.itemClicked = exports.handleCommentInput = exports.handleDelete = exports.handleShare = exports.showComments = exports.handleLike = exports.handleFavourite = exports.fetchComments = exports.loadMore = exports.fetchItems = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _request = __webpack_require__(2);

var _common = __webpack_require__(10);

var fetchItems = exports.fetchItems = function fetchItems(state, actions, _ref) {
    var stateKey = _ref.stateKey,
        tab_id = _ref.tab_id,
        q = _ref.q;

    var tab = state[stateKey].tabs[tab_id];
    if (tab.data.rows.length > 0) {
        return;
    }
    return function (update) {
        var params = {
            queryParams: {
                handle: "tab-" + tab_id,
                page: 1,
                chrome_id: state.chrome_id,
                group: state.groups.defaultGroup,
                action: "readTracks",
                count: null
            }
        };
        if (q) {
            params.queryParams.q = q;
            state[stateKey].tabs[tab_id].q = q;
        }
        (0, _request.request)(params).then(function (result) {
            result.page = tab.data.page;
            tab.data = result;
            tab.isFetching = false;
            state[stateKey].tabs[tab_id] = tab;
            update(state);
        });
    };
};

var loadMore = exports.loadMore = function loadMore(state, actions, e) {
    return function (update) {
        var modelStr = e.currentTarget.getAttribute("model");
        var tab = (0, _common.deepFind)(state, modelStr);

        if (parseInt(tab.data.pages) < parseInt(tab.data.page)) {
            // enough.. dont fetch any more. because there is none.
            return;
        }

        var tabName = modelStr.split(".").pop();
        tab.loadMore = true;
        state[modelStr.split(".")[0]].tabs[tabName] = tab;
        update(state);
        var params = {
            queryParams: {
                chrome_id: state.chrome_id,
                group: state.groups.defaultGroup,
                action: "readTracks",
                handle: "tab-" + tabName,
                page: tab.data.page + 1,
                count: null
            }
        };
        if (tabName == "search") {
            params.queryParams.q = tab.q;
        }
        (0, _request.request)(params).then(function (result) {
            tab.data.page++;
            tab.data.rows = tab.data.rows.concat(result.rows);
            tab.loadMore = false;
            state[modelStr.split(".")[0]].tabs[tabName] = tab;
            update(state);
        });
    };
};

var fetchComments = exports.fetchComments = function fetchComments(state, actions, _ref2) {
    var item = _ref2.item,
        model = _ref2.model,
        key = _ref2.key;

    return function (update) {
        var params = {
            queryParams: {
                commentsPage: 1,
                item_id: item.id,
                chrome_id: state.chrome_id,
                action: "commentsItem"
            }
        };
        (0, _request.request)(params).then(function (result) {
            var _model$split = model.split("."),
                _model$split2 = _slicedToArray(_model$split, 1),
                root = _model$split2[0];

            item.commentList = result.rows;
            if (root == "modals") {
                state[root].notification.data.rows[key] = item;
            } else {
                state[root].tabs[state[root].active].data.rows[key] = item;
            }
            update(state);
        });
    };
};

var handleFavourite = exports.handleFavourite = function handleFavourite(state, actions, _ref3) {
    var e = _ref3.e,
        key = _ref3.key;

    var model = e.target.parentElement.closest("[model]").model;
    var item = (0, _common.deepFind)(state, model).data.rows[key];
    var favourite = parseInt(item.favourite);
    item.favourite = favourite ? 0 : 1;
    state.mainNav.tabs[state.mainNav.active].data.rows[key] = item;

    var params = {
        queryParams: {
            chrome_id: state.chrome_id,
            item_id: item.id,
            action: favourite ? "removeFromFavourite" : "addToFavourite"
        }
    };
    return function (update) {
        (0, _request.request)(params).then(function (result) {
            if (result.flag) {
                update(state);
            }
        });
    };
};
var handleLike = exports.handleLike = function handleLike(state, actions, _ref4) {
    var e = _ref4.e,
        key = _ref4.key;

    var model = e.target.parentElement.closest("[model]").model;
    var item = (0, _common.deepFind)(state, model).data.rows[key];
    item.liked = parseInt(item.liked) ? 0 : 1;
    item.likes_count = parseInt(item.likes_count) + (item.liked ? 1 : -1);

    var _model$split3 = model.split("."),
        _model$split4 = _slicedToArray(_model$split3, 1),
        root = _model$split4[0];

    if (root == "modals") {
        state[root].notification.data.rows[key] = item;
    } else {
        state[root].tabs[state[root].active].data.rows[key] = item;
    }
    var params = {
        queryParams: {
            chrome_id: state.chrome_id,
            item_id: item.id,
            action: "likeClicked"
        }
    };
    return function (update) {
        (0, _request.request)(params).then(function (result) {
            if (result.flag) {
                update(state);
            }
        });
    };
};

var showComments = exports.showComments = function showComments(state, actions, _ref5) {
    var e = _ref5.e,
        key = _ref5.key;

    var model = e.target.parentElement.closest("[model]").model;
    var item = (0, _common.deepFind)(state, model).data.rows[key];
    item.showComments = 1;

    var _model$split5 = model.split("."),
        _model$split6 = _slicedToArray(_model$split5, 1),
        root = _model$split6[0];

    if (root == "modals") {
        state[root].notification.data.rows[key] = item;
    } else {
        state[root].tabs[state[root].active].data.rows[key] = item;
    }
    actions.fetchComments({ item: item, model: model, key: key });

    return state;
};
var handleShare = exports.handleShare = function handleShare(state, actions, _ref6) {
    var e = _ref6.e,
        key = _ref6.key;

    var model = e.target.parentElement.closest("[model]").model;
    var item = (0, _common.deepFind)(state, model).data.rows[key];
    state.post.title = item.title;
    state.post.url = item.url;
    state.post.thumbnail = item.thumbnail;
    state.mainNav.active = "post";
    state.modals.notification.open = false;
    return state;
};
var handleDelete = exports.handleDelete = function handleDelete(state, actions, _ref7) {
    var e = _ref7.e,
        key = _ref7.key;

    var model = e.target.parentElement.closest("[model]").model;
    var item = (0, _common.deepFind)(state, model).data.rows[key];

    var _model$split7 = model.split("."),
        _model$split8 = _slicedToArray(_model$split7, 1),
        root = _model$split8[0];

    if (root == "modals") {
        delete state[root].notification.data.rows[key];
        state[root].notification.open = false;
    } else {
        delete state[root].tabs[state[root].active].data.rows[key];
    }

    var params = {
        queryParams: {
            chrome_id: state.chrome_id,
            item_id: item.id,
            action: "deleteItem"
        }
    };
    return function (update) {
        (0, _request.request)(params).then(function (result) {
            if (result.flag) {
                update(state);
            }
        });
    };
};

var handleCommentInput = exports.handleCommentInput = function handleCommentInput(state, actions, _ref8) {
    var e = _ref8.e,
        key = _ref8.key;

    if (e.keyCode != 13) return;
    var model = e.target.parentElement.closest("[model]").model;
    var comment = e.target.value;
    var item = (0, _common.deepFind)(state, model).data.rows[key];

    var _model$split9 = model.split("."),
        _model$split10 = _slicedToArray(_model$split9, 1),
        root = _model$split10[0];

    if (!item.commentList) {
        item.commentList = [];
    }
    e.target.value = "";
    var params = {
        method: "POST",
        queryParams: {
            chrome_id: state.chrome_id,
            item_id: item.id,
            comment: comment,
            action: "insertComment"
        }
    };
    return function (update) {
        (0, _request.request)(params).then(function (result) {
            if (result.flag == 1) {
                var newComment = {
                    color: state.user.data.color,
                    comment: (0, _common.escape)(comment),
                    created_at: "now",
                    id: result.id,
                    item_id: item.id,
                    nickname: state.user.data.nickname,
                    user_id: state.user.data.id
                };
                if (root == "modals") {
                    state[root].notification.data.rows[key].commentList.unshift(newComment);
                } else {
                    state[root].tabs[state[root].active].data.rows[key].commentList.unshift(newComment);
                }
                update(state);
            }
        });
    };
};

var itemClicked = exports.itemClicked = function itemClicked(state, actions, _ref9) {
    var e = _ref9.e,
        key = _ref9.key;

    var model = e.target.parentElement.closest("[model]").model;
    var item = (0, _common.deepFind)(state, model).data.rows[key];

    var _model$split11 = model.split("."),
        _model$split12 = _slicedToArray(_model$split11, 1),
        root = _model$split12[0];

    if (item.uid != state.user.data.id) {
        var count = parseInt(item.times_clicked) + 1;
        if (root == "modals") {
            state[root].notification.data.rows[key].times_clicked = count;
        } else {
            state[root].tabs[state[root].active].data.rows[key].times_clicked = count;
        }
    }
    var params = {
        chrome_id: state.chrome_id,
        item_id: item.id,
        action: "itemClicked"
    };
    if (chrome.extension) {
        var bgPage = chrome.extension.getBackgroundPage();
        bgPage.sendClickedStat(params);
    }
    window.open(e.target.href);
    return state;
};

var lazyLoad = exports.lazyLoad = function lazyLoad(state, actions, _ref10) {
    var e = _ref10.e,
        image = _ref10.image;

    var ele = document.createElement("img");
    ele.src = image;
    ele.onload = function () {
        e.src = image;
    };
};

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.doRegister = exports.doLogin = exports.doLogout = exports.saveCustomization = exports.initialize = exports.getUserLinks = exports.showProfile = exports.saveProfile = undefined;

var _request = __webpack_require__(2);

var saveProfile = exports.saveProfile = function saveProfile(state, actions, _ref) {
    var e = _ref.e,
        data = _ref.data;

    e.preventDefault();
    data = Object.assign(state.user.data, data);
    return function (update) {
        var params = {
            queryParams: {
                chrome_id: state.chrome_id,
                nickname: data.nickname,
                color: data.color,
                bio: data.bio,
                action: "saveProfile"
            }
        };
        (0, _request.request)(params).then(function (result) {
            state.user.data = data;
            update(state);
        });
    };
};
var showProfile = exports.showProfile = function showProfile(state, actions, _ref2) {
    var e = _ref2.e,
        user_id = _ref2.user_id;

    e.preventDefault();
    return function (update) {
        state.modals.profile.links.isFetching = true;
        state.modals.profile.open = 1;
        update(state);
        var params1 = {
            queryParams: {
                chrome_id: state.chrome_id,
                target_id: user_id,
                action: "getProfile"
            }
        };
        (0, _request.request)(params1).then(function (result) {
            state.modals.profile.user = result;
            state.modals.profile.user.id = user_id;
            state.modals.profile.links.data.page = 0;
            update(state);
        });
        actions.getUserLinks({ e: e, user_id: user_id });
    };
};

var getUserLinks = exports.getUserLinks = function getUserLinks(state, actions, _ref3) {
    var e = _ref3.e,
        user_id = _ref3.user_id;

    e.preventDefault();
    return function (update) {
        state.modals.profile.links.isFetching = true;
        state.modals.profile.open = 1;
        update(state);
        var newPage = parseInt(state.modals.profile.links.data.page) + 1;
        var params2 = {
            queryParams: {
                chrome_id: state.chrome_id,
                target_id: user_id,
                action: "getOtherUserTracks",
                page: newPage,
                count: 5
            }
        };

        (0, _request.request)(params2).then(function (result) {
            state.modals.profile.links.isFetching = false;
            if (newPage == 1) {
                state.modals.profile.links.data.rows = result.rows;
            } else {
                state.modals.profile.links.data.rows = state.modals.profile.links.data.rows.concat(result.rows);
            }
            state.modals.profile.links.data.page = newPage;
            update(state);
        });
    };
};

var initialize = exports.initialize = function initialize(state, actions, _ref4) {
    var chrome_id = _ref4.chrome_id,
        callback = _ref4.callback;

    return function (update) {
        var params = {
            queryParams: {
                chrome_id: chrome_id,
                action: "fetchUserInfo"
            }
        };
        (0, _request.request)(params).then(function (result) {
            if (result.flag == 1) {
                state.chrome_id = chrome_id;
                state.user.data = result.data;
                state.user.loggedIn = true;
                state.groups.defaultGroup = localStorage.defaultGroup;
                update(state);
                callback();
            }
        });
    };
};

var saveCustomization = exports.saveCustomization = function saveCustomization(state, actions, _ref5) {
    var e = _ref5.e,
        key = _ref5.key;

    e.preventDefault();
    state.user.customize[key] = parseInt(e.target.value);
    localStorage[key] = parseInt(e.target.value);
    return state;
};
var doLogout = exports.doLogout = function doLogout(state, ctions, data) {
    state.user.loggedIn = false;
    localStorage.clear();
    return state;
};

var doLogin = exports.doLogin = function doLogin(state, actions, data) {
    return function (update) {
        var params = {
            method: "POST",
            queryParams: {
                chrome_id: state.chrome_id,
                nickname: data.nickname,
                password: data.password,
                action: "loginUser"
            }
        };

        if (data.nickname.length > 0 && data.password.length > 0) {
            state.user.login.requesting = true;
            update(state);
            (0, _request.request)(params).then(function (result) {
                if (result.flag == 1) {
                    if (!localStorage.defaultGroup) {
                        localStorage.defaultGroup = 1;
                    }
                    //update localstorage
                    localStorage.nickname = data.nickname;
                    localStorage.loggedIn = true;
                    localStorage.chrome_id = result.data.chrome_id;
                    actions.fetchGroups();
                    //update the state
                    state.user.data = result.data;
                    state.user.loggedIn = true;

                    if (chrome.storage) {
                        chrome.storage.sync.set({
                            userid: result.data.chrome_id
                        });
                    }
                }
                state.user.login.requesting = false;
                state.user.login.msg = result.msg;
                state.user.login.flag = result.flag;
                update(state);
            });
        }
    };
};

var doRegister = exports.doRegister = function doRegister(state, actions, data) {
    return function (update) {
        var params = {
            queryParams: {
                chrome_id: state.chrome_id,
                nickname: data.nickname,
                password: data.password,
                email: data.email,
                action: "registerUser"
            }
        };
        if (data.nickname.length > 0 && data.password.length > 0) {
            state.user.register.requesting = true;
            update(state);
            (0, _request.request)(params).then(function (result) {
                if (result.flag == 1) {
                    //update localstorage
                    localStorage.nickname = data.nickname;
                    localStorage.loggedIn = true;
                    localStorage.chrome_id = result.data.chrome_id;
                    localStorage.defaultGroup = 1;
                    actions.fetchGroups();
                    //update the state
                    state.user.data = result.data;
                    state.user.loggedIn = true;

                    if (chrome.storage) {
                        chrome.storage.sync.set({
                            userid: response.data.chrome_id
                        });
                    }
                }
            });
        }
    };
};

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.detectSite = exports.doPost = undefined;

var _request = __webpack_require__(2);

var doPost = exports.doPost = function doPost(state, actions, data) {
    return function (update) {
        state.post.posting = true;
        update(state);
        data.action = "insertTrack";
        data.chrome_id = state.chrome_id;
        var params = {
            method: "POST",
            queryParams: data
        };
        (0, _request.request)(params).then(function (result) {
            state.post.posting = false;
            state.groups.defaultGroup = data.group;
            update(state);
        });
    };
};

var detectSite = exports.detectSite = function detectSite(state, actions) {
    return function (update) {
        if (chrome.tabs) {
            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                //var url = tabs[0].url;

                var payload = { action: "get-meta" };

                chrome.extension.getBackgroundPage().retrieveSiteMeta(payload, function (data) {
                    if (data && data.url) {
                        state.post.title = data.title;
                        state.post.url = data.url;
                        state.post.thumbnail = data.thumbUrl;
                        update(state);
                    }
                });
            });
        }
    };
};

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendInvites = exports.withdrawInvite = exports.setInviteList = exports.showInviteModal = undefined;

var _request = __webpack_require__(2);

var invites = [];

var showInviteModal = exports.showInviteModal = function showInviteModal(state, actions, _ref) {
    var e = _ref.e,
        group_id = _ref.group_id;

    e.preventDefault();
    return function (update) {
        state.modals.invite.open = true;
        state.modals.invite.group_id = group_id;
        update(state);
        var params = {
            queryParams: {
                chrome_id: state.chrome_id,
                group_id: group_id,
                action: "getUsersToInvite"
            }
        };
        (0, _request.request)(params).then(function (result) {
            state.modals.invite.data = result;
            update(state);
            actions.setInviteList({
                data: state.modals.invite.data.users,
                resetInvites: true
            });
            //actions.editInvites({ data: data.invites });
        });
    };
};

var ele = function ele(selector) {
    return document.querySelector(selector);
};
var setInviteList = exports.setInviteList = function setInviteList(state, actions, _ref2) {
    var data = _ref2.data,
        resetInvites = _ref2.resetInvites;

    var dataClone = data;
    if (resetInvites) {
        invites = [];
    }
    var init = function init() {
        dataClone = dataClone.sort(function (a, b) {
            return b.nickname - a.nickname;
        });
        var list = ele(".token-input-list-facebook");
        var dd = ele(".token-input-dropdown-facebook");
        list && list.remove();
        dd && dd.remove();

        $("#tags-input-send-invites").tokenInput(dataClone, {
            theme: "facebook",
            preventDuplicates: true,
            searchDelay: 0,
            propertyToSearch: "nickname",
            prePopulate: invites,
            resultsLimit: 5,
            onAdd: function onAdd(user) {
                dataClone = dataClone.filter(function (item) {
                    return item.id != user.id;
                });
                invites.push(user);
                init();
            },
            onDelete: function onDelete(user) {
                invites = invites.filter(function (item) {
                    return user.id !== item.id;
                });
                data.map(function (item) {
                    if (item.id == user.id) {
                        dataClone.push(item);
                        init();
                        return false;
                    }
                });
            },
            onResult: function onResult(results) {
                var tagsearch = $("#token-input-tags-input-send-invites").val();
                return results.filter(function (item) {
                    return item.nickname.toLowerCase().indexOf(tagsearch.toLowerCase()) === 0;
                });
            }
        });
        $("#tags-input-send-invites").focus();
    };
    init();
};

var withdrawInvite = exports.withdrawInvite = function withdrawInvite(state, actions, _ref3) {
    var e = _ref3.e,
        invite_id = _ref3.invite_id,
        index = _ref3.index;

    var user = state.modals.invite.data.invites[index];
    delete state.modals.invite.data.invites[index];
    return function (update) {
        var params = {
            queryParams: {
                chrome_id: state.chrome_id,
                group_id: state.modals.invite.group_id,
                invite_id: invite_id,
                action: "withdrawInvite"
            }
        };
        (0, _request.request)(params).then(function (result) {
            state.modals.invite.data.users.push(user);
            update(state);
            actions.setInviteList({
                data: state.modals.invite.data.users,
                resetInvites: false
            });
        });
    };
};

var sendInvites = exports.sendInvites = function sendInvites(state, actions) {
    var data = invites.map(function (user) {
        return user.id;
    });

    return function (update) {
        var params = {
            queryParams: {
                chrome_id: state.chrome_id,
                group_id: state.modals.invite.group_id,
                users: JSON.stringify(data),
                action: "sendInvites"
            }
        };
        (0, _request.request)(params).then(function (result) {
            state.modals.invite.open = false;
            update(state);
        });
    };
};

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var mainNav = {
    tabs: {
        notification: {
            name: "Notifications",
            isFetching: true,
            loadMore: false,
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            },
            authorized: true
        },
        feed: {
            name: "Feed",
            isFetching: false,
            loadMore: false,
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            },
            authorized: true
        },
        post: {
            name: "Post",
            isFetching: false,
            loadMore: false,
            data: [],
            authorized: true
        },
        links: {
            name: "Links",
            isFetching: false,
            loadMore: false,
            data: [],
            authorized: true
        },
        search: {
            name: "Search",
            isFetching: false,
            loadMore: false,
            q: "",
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            },
            authorized: true
        },
        groups: {
            name: "Groups",
            isFetching: false,
            loadMore: false,
            data: [],
            authorized: true
        },
        settings: {
            name: "Settings",
            isFetching: false,
            loadMore: false,
            data: []
        }
    },
    active: "notification"
};
var notificationTabs = {
    tabs: {
        notLinks: {
            name: "Links",
            isFetching: true,
            loadMore: false,
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            }
        },
        notGroups: {
            name: "Groups",
            isFetching: false,
            loadMore: false,
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            }
        }
    },
    active: "notLinks"
};
var linkTabs = {
    tabs: {
        sent: {
            name: "Sent",
            isFetching: false,
            loadMore: false,
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            }
        },
        favourites: {
            name: "Favourites",
            isFetching: true,
            loadMore: false,
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            }
        }
    },
    active: "sent"
};

var settingsTabs = {
    tabs: {
        profile: {
            name: "Profile",
            isFetching: false,
            loadMore: false,
            data: []
        },
        customize: {
            name: "Customize",
            isFetching: true,
            loadMore: false,
            data: []
        },
        about: {
            name: "About",
            isFetching: false,
            loadMore: false,
            data: []
        }
    },
    active: "profile"
};

var groupTabs = {
    tabs: {
        public: {
            name: "Public",
            isFetching: true,
            loadMore: false,
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            }
        },
        manage: {
            name: "Manage",
            isFetching: true,
            loadMore: false,
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            }
        },
        create: {
            name: "Create",
            isFetching: false,
            loadMore: false,
            data: {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            }
        }
    },
    active: "public"
};

exports.default = {
    num: 0,
    mainNav: mainNav,
    notificationTabs: notificationTabs,
    linkTabs: linkTabs,
    groupTabs: groupTabs,
    settingsTabs: settingsTabs,
    version: "1.0.0",
    notificationStatus: {
        count: 0,
        links: { rows: [] },
        groups: { rows: [] },
        lastUpdateId: 0
    },
    modals: {
        notification: {
            open: false,
            data: []
        },
        invite: {
            open: false,
            group_id: 0,
            data: {
                users: [],
                invites: []
            }
        },
        profile: {
            open: false,
            links: {
                isFetching: false,
                data: {
                    rows: [],
                    page: 0,
                    pages: 0,
                    total: 0
                }
            },
            user: {
                id: 0
            }
        }
    },
    allGroups: {
        data: [],
        isFetching: false
    },
    groupUsers: {
        isFetching: false,
        data: [],
        group_id: 0,
        admin_id: 0
    },
    groups: {
        loadMore: false,
        defaultGroup: 0,
        data: [{
            uid: "1",
            admin: "1",
            group_id: "20",
            nickname: "Redsnow",
            gname: "Algorithms",
            desc: "Share interesting algorithms, logics, gists. Any language.",
            is_public: "1",
            group_rights: "can_post"
        }]
    },
    chrome_id: null,
    user: {
        login: {
            requesting: false,
            msg: "",
            flag: 1
        },
        register: {
            requesting: false,
            msg: "",
            flag: 1
        },
        data: {
            id: "1",
            nickname: "Redsnow",
            last_seen: "2017-09-30 11:25:05",
            color: "hsl(138, 69%, 53%)",
            bio: "Always give ur 100%, unless you'r donating blood",
            email: "abhisheksaha11@gmai.com",
            verified: "1"
        },
        customize: {
            sound: 1,
            notification: 0,
            theme: "dark"
        },
        loggedIn: false,
        isFetching: false
    },
    post: {
        title: "",
        url: "",
        comments: "",
        thumbnail: "",
        group: 2,
        posting: false
    }
};

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

var _TabComponent = __webpack_require__(4);

var _Notifications = __webpack_require__(144);

var _Notifications2 = _interopRequireDefault(_Notifications);

var _Feed = __webpack_require__(147);

var _Feed2 = _interopRequireDefault(_Feed);

var _Post = __webpack_require__(148);

var _Post2 = _interopRequireDefault(_Post);

var _MyLinks = __webpack_require__(149);

var _MyLinks2 = _interopRequireDefault(_MyLinks);

var _Groups = __webpack_require__(150);

var _Groups2 = _interopRequireDefault(_Groups);

var _Settings = __webpack_require__(155);

var _Settings2 = _interopRequireDefault(_Settings);

var _Search = __webpack_require__(160);

var _Search2 = _interopRequireDefault(_Search);

var _request = __webpack_require__(2);

var _request2 = _interopRequireDefault(_request);

var _ProfileModal = __webpack_require__(161);

var _ProfileModal2 = _interopRequireDefault(_ProfileModal);

var _InviteModal = __webpack_require__(162);

var _InviteModal2 = _interopRequireDefault(_InviteModal);

__webpack_require__(11);

__webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.moment = __webpack_require__(0);
__webpack_require__(165);
__webpack_require__(166);

var main = function main(state, actions) {
    var data = null;
    switch (state.mainNav.active) {
        case "notification":
            data = (0, _hyperapp.h)(_Notifications2.default, {
                tabs: state.notificationTabs.tabs,
                active: state.notificationTabs.active,
                state: state,
                loadMore: actions.loadMore,
                onScroll: actions.onScroll,
                onTabChange: actions.onTabChange,
                actions: actions,
                name: "notification"
            });
            break;
        case "feed":
            data = (0, _hyperapp.h)(_Feed2.default, {
                tab: state.mainNav.tabs[state.mainNav.active],
                actions: actions,
                onScroll: actions.onScroll,
                loadMore: actions.loadMore,
                state: state
            });
            break;
        case "search":
            data = (0, _hyperapp.h)(_Search2.default, {
                tab: state.mainNav.tabs[state.mainNav.active],
                actions: actions,
                onScroll: actions.onScroll,
                loadMore: actions.loadMore,
                state: state
            });
            break;
        case "post":
            data = (0, _hyperapp.h)(_Post2.default, { state: state, actions: actions });
            break;
        case "links":
            data = (0, _hyperapp.h)(_MyLinks2.default, {
                tabs: state.linkTabs.tabs,
                active: state.linkTabs.active,
                state: state,
                loadMore: actions.loadMore,
                onScroll: actions.onScroll,
                onTabChange: actions.onTabChange,
                actions: actions
            });
            break;
        case "groups":
            data = (0, _hyperapp.h)(_Groups2.default, {
                actions: actions,
                tabs: state.groupTabs.tabs,
                active: state.groupTabs.active,
                state: state
            });
            break;
        case "settings":
            data = (0, _hyperapp.h)(_Settings2.default, {
                tabs: state.settingsTabs.tabs,
                active: state.settingsTabs.active,
                state: state,
                actions: actions
            });
            break;
        default:
            console.log(state);
    }

    return (0, _hyperapp.h)(
        "div",
        { "class": "container" },
        (0, _hyperapp.h)(_TabComponent.TabComponent, {
            classes: "main-nav",
            type: "nav-tabs",
            state: state,
            stateKey: "mainNav",
            onChange: actions.onTabChange,
            html: data
        }),
        state.modals.profile.open && (0, _hyperapp.h)(_ProfileModal2.default, {
            onScroll: actions.onScroll,
            state: state,
            actions: actions,
            name: "profile"
        }),
        state.modals.invite.open && (0, _hyperapp.h)(_InviteModal2.default, { state: state, actions: actions, name: "invite" })
    );
};

exports.default = main;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NotificationItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _hyperapp = __webpack_require__(1);

var _NotificationItems = __webpack_require__(145);

var _TabComponent = __webpack_require__(4);

var _ScrollHoc = __webpack_require__(5);

var _ScrollHoc2 = _interopRequireDefault(_ScrollHoc);

var _ModalHoc = __webpack_require__(8);

var _ModalHoc2 = _interopRequireDefault(_ModalHoc);

var _LinkItem = __webpack_require__(6);

var _LinkItem2 = _interopRequireDefault(_LinkItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notifications = function Notifications(props) {
    var data = null;

    var joinGroup = function joinGroup(_ref) {
        var e = _ref.e,
            index = _ref.index,
            group = _ref.group;

        e.preventDefault();
        props.actions.joinGroup({
            group: group,
            callback: function callback() {
                props.actions.notificationJoinedGroup(index);
            }
        });
    };
    switch (props.active) {
        case "notLinks":
            data = props.tabs[props.active].data.rows.map(function (item, i) {
                return (0, _hyperapp.h)(
                    "div",
                    {
                        key: i,
                        "class": "notification-item clearfix",
                        "data-id": item.id,
                        onclick: function onclick() {
                            return props.actions.notificationClicked({
                                active: props.active,
                                index: i
                            });
                        }
                    },
                    (0, _hyperapp.h)(NotificationItem, item)
                );
            });
            data = (0, _hyperapp.h)(
                "div",
                {
                    model: "notificationTabs.tabs.notLinks",
                    "class": "scroll",
                    onscroll: props.onScroll
                },
                data,
                props.state.modals.notification.open && (0, _ModalHoc2.default)(function () {
                    return (0, _hyperapp.h)(
                        "div",
                        { model: "modals.notification" },
                        (0, _hyperapp.h)(_LinkItem2.default, {
                            key: "0",
                            actions: props.actions,
                            user_id: props.state.user.data.id,
                            item: props.state.modals.notification.data.rows[0]
                        })
                    );
                })(props)
            );
            break;
        case "notGroups":
            data = props.tabs[props.active].data.rows.map(function (item, i) {
                return (0, _hyperapp.h)(
                    "div",
                    {
                        key: i,
                        "class": "notification-item clearfix",
                        "data-id": item.id,
                        onclick: function onclick() {
                            return props.actions.notificationClicked({
                                active: props.active,
                                index: i
                            });
                        }
                    },
                    (0, _hyperapp.h)(NotificationItem, _extends({
                        key: i,
                        acceptGroupInvite: props.actions.acceptGroupInvite,
                        rejectGroupInvite: props.actions.rejectGroupInvite,
                        joinGroupFromNotification: joinGroup
                    }, item))
                );
            });
            data = (0, _hyperapp.h)(
                "div",
                {
                    model: "notificationTabs.tabs.notGroups",
                    "class": "scroll",
                    onscroll: props.onScroll
                },
                data
            );
            break;
        default:
        //console.log(state);
    }
    var status = props.state.notificationStatus;
    return (0, _hyperapp.h)(_TabComponent.TabComponent, {
        classes: "secondary-nav",
        type: "nav-pills",
        state: props.state,
        stateKey: "notificationTabs",
        onChange: props.onTabChange,
        html: data,
        onBeforeLabelSet: function onBeforeLabelSet(label) {
            if (label == "Links" && status.links.rows.length > 0) {
                return label + " (" + status.links.rows.length + ")";
            } else if (label == "Groups" && status.groups.rows.length > 0) {
                return label + " (" + status.groups.rows.length + ")";
            }
            return label;
        }
    });
};

var NotificationItem = exports.NotificationItem = function NotificationItem(item) {
    if (item.type == "joined_group") return (0, _hyperapp.h)(_NotificationItems.JoinedGroup, item);else if (item.type == "link") return (0, _hyperapp.h)(_NotificationItems.Link, item);else if (item.type == "like") return (0, _hyperapp.h)(_NotificationItems.Like, item);else if (item.type == "comment") return (0, _hyperapp.h)(_NotificationItems.Comment, item);else if (item.type == "joined_linkcast") return (0, _hyperapp.h)(_NotificationItems.JoinedLinkcast, item);else if (item.type == "new_group") return (0, _hyperapp.h)(_NotificationItems.NewGroup, item);else if (item.type == "group_invite") return (0, _hyperapp.h)(_NotificationItems.GroupInvite, item);
};

exports.default = (0, _ScrollHoc2.default)(Notifications);

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Linkcast = exports.GroupInvite = exports.NewGroup = exports.JoinedLinkcast = exports.JoinedGroup = exports.Like = exports.Comment = exports.Link = undefined;

var _hyperapp = __webpack_require__(1);

var getTimeAgo = function getTimeAgo(created_at) {
    return moment(created_at).add(moment().utcOffset(), "minutes").fromNow();
};
var Link = exports.Link = function Link(data) {
    return (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
            "a",
            { href: "", "class": "link", "data-id": "{ITEM_ID}" },
            (0, _hyperapp.h)(
                "div",
                null,
                (0, _hyperapp.h)(
                    "span",
                    { "class": "strong" },
                    data.actors,
                    " "
                ),
                (0, _hyperapp.h)(
                    "span",
                    { "class": "activity" },
                    "posted a link",
                    (0, _hyperapp.h)(
                        "span",
                        { "class": "link strong" },
                        " ",
                        data.title
                    ),
                    (0, _hyperapp.h)(
                        "span",
                        { "class": "group" },
                        " ",
                        "in ",
                        (0, _hyperapp.h)("i", { "class": "fa fa-users", "aria-hidden": "true" }),
                        " ",
                        data.group_name
                    )
                )
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "item-meta" },
                (0, _hyperapp.h)("i", { "class": "fa fa-link", "aria-hidden": "true" }),
                (0, _hyperapp.h)(
                    "span",
                    { "class": "comment-date grey" },
                    getTimeAgo(data.created_at)
                )
            )
        )
    );
};

var Comment = exports.Comment = function Comment(data) {
    return (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
            "a",
            { href: "", "class": "link", "data-id": "{ITEM_ID}" },
            (0, _hyperapp.h)(
                "div",
                null,
                (0, _hyperapp.h)(
                    "span",
                    { "class": "strong" },
                    data.actors,
                    " "
                ),
                (0, _hyperapp.h)(
                    "span",
                    { "class": "activity" },
                    "commented on ",
                    (0, _hyperapp.h)(
                        "span",
                        { "class": "strong" },
                        data.poster,
                        "'s"
                    ),
                    " ",
                    "link",
                    (0, _hyperapp.h)(
                        "span",
                        {
                            style: "font-weight: bold; color: #CECECE",
                            "class": "comment"
                        },
                        " ",
                        data.comment,
                        " "
                    ),
                    (0, _hyperapp.h)(
                        "span",
                        { "class": "group" },
                        "in ",
                        (0, _hyperapp.h)("i", { "class": "fa fa-users", "aria-hidden": "true" }),
                        " ",
                        " ",
                        data.group_name,
                        " "
                    )
                )
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "item-meta" },
                (0, _hyperapp.h)("i", { "class": "fa fa-comment", "aria-hidden": "true" }),
                (0, _hyperapp.h)(
                    "span",
                    { "class": "comment-date grey" },
                    getTimeAgo(data.created_at)
                )
            )
        )
    );
};

var Like = exports.Like = function Like(data) {
    return (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
            "a",
            { href: "", "class": "link", "data-id": "{ITEM_ID}" },
            (0, _hyperapp.h)(
                "div",
                null,
                (0, _hyperapp.h)(
                    "span",
                    { "class": "strong" },
                    data.actors,
                    " "
                ),
                (0, _hyperapp.h)(
                    "span",
                    { "class": "activity" },
                    "liked ",
                    (0, _hyperapp.h)(
                        "span",
                        { "class": "strong" },
                        data.poster,
                        "'s"
                    ),
                    " link",
                    (0, _hyperapp.h)(
                        "span",
                        {
                            style: "font-weight: bold; color: #CECECE",
                            "class": "link"
                        },
                        " ",
                        "\"",
                        data.title,
                        "\""
                    ),
                    (0, _hyperapp.h)(
                        "span",
                        { "class": "group" },
                        "in ",
                        (0, _hyperapp.h)("i", { "class": "fa fa-users", "aria-hidden": "true" }),
                        " ",
                        data.group_name
                    )
                )
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "item-meta" },
                (0, _hyperapp.h)("i", { "class": "fa fa-heart", "aria-hidden": "true" }),
                (0, _hyperapp.h)(
                    "span",
                    { "class": "comment-date grey" },
                    getTimeAgo(data.created_at)
                )
            )
        )
    );
};

var JoinedGroup = exports.JoinedGroup = function JoinedGroup(data) {
    return (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
            "div",
            null,
            (0, _hyperapp.h)(
                "span",
                { "class": "strong" },
                data.actors,
                " "
            ),
            (0, _hyperapp.h)(
                "span",
                { "class": "activity" },
                "joined",
                (0, _hyperapp.h)(
                    "span",
                    { "class": "group" },
                    " ",
                    (0, _hyperapp.h)("i", { "class": "fa fa-users", "aria-hidden": "true" }),
                    " ",
                    data.group_name
                )
            )
        ),
        (0, _hyperapp.h)(
            "div",
            { "class": "item-meta" },
            (0, _hyperapp.h)("i", { "class": "fa fa-sign-in", "aria-hidden": "true" }),
            (0, _hyperapp.h)(
                "span",
                { "class": "comment-date grey" },
                getTimeAgo(data.created_at)
            )
        )
    );
};

var JoinedLinkcast = exports.JoinedLinkcast = function JoinedLinkcast(data) {
    return (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
            "div",
            null,
            (0, _hyperapp.h)(
                "span",
                { "class": "strong" },
                data.actors
            ),
            (0, _hyperapp.h)(
                "span",
                { "class": "activity" },
                " ",
                "joined",
                " ",
                (0, _hyperapp.h)(
                    "span",
                    { style: "color:#c53333; font-weight: bold" },
                    " LinkCast"
                )
            )
        ),
        (0, _hyperapp.h)(
            "div",
            { "class": "item-meta" },
            (0, _hyperapp.h)("i", { "class": "fa fa-user", "aria-hidden": "true" }),
            (0, _hyperapp.h)(
                "span",
                { "class": "comment-date grey" },
                getTimeAgo(data.created_at)
            )
        )
    );
};

var NewGroup = exports.NewGroup = function NewGroup(data) {
    return (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
            "div",
            { "class": "group_row" },
            (0, _hyperapp.h)(
                "span",
                { "class": "strong" },
                data.actors,
                " "
            ),
            (0, _hyperapp.h)(
                "span",
                { "class": "activity" },
                "created a new group ",
                (0, _hyperapp.h)("i", {
                    "class": "fa fa-users",
                    "aria-hidden": "true"
                }),
                " ",
                (0, _hyperapp.h)(
                    "span",
                    { style: "color:#c53333; font-weight: bold" },
                    " ",
                    data.group_name,
                    ".",
                    " "
                ),
                data.accepted == "0" && (0, _hyperapp.h)(
                    "a",
                    {
                        href: "#",
                        "class": "group-join green",
                        onclick: function onclick(e) {
                            return data.joinGroupFromNotification({
                                e: e,
                                index: data.key,
                                group: {
                                    group_id: data.group_id,
                                    is_public: 1
                                }
                            });
                        }
                    },
                    "Join Now"
                )
            ),
            (0, _hyperapp.h)(
                "div",
                null,
                (0, _hyperapp.h)(
                    "i",
                    null,
                    data.desc
                )
            )
        ),
        (0, _hyperapp.h)(
            "div",
            { "class": "item-meta" },
            (0, _hyperapp.h)("i", { "class": "fa fa-users", "aria-hidden": "true" }),
            (0, _hyperapp.h)(
                "span",
                { "class": "comment-date grey" },
                getTimeAgo(data.created_at)
            )
        )
    );
};

var GroupInvite = exports.GroupInvite = function GroupInvite(data) {
    return (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
            "div",
            { "class": "group_row", "data-aid": "{ID}", "data-group_id": "{group_id}" },
            (0, _hyperapp.h)(
                "span",
                { "class": "strong" },
                data.admin
            ),
            (0, _hyperapp.h)(
                "span",
                { "class": "activity" },
                " ",
                "invited you to join",
                " ",
                (0, _hyperapp.h)(
                    "span",
                    { style: "font-weight: bold" },
                    " ",
                    data.group_name,
                    "."
                ),
                (0, _hyperapp.h)(
                    "a",
                    {
                        href: "#",
                        "class": "group-accept green",
                        onclick: function onclick(e) {
                            return data.acceptGroupInvite({
                                e: e,
                                index: data.key,
                                activity: {
                                    group_id: data.group_id,
                                    activity_id: data.id
                                }
                            });
                        }
                    },
                    " ",
                    "Accept"
                ),
                " ",
                "|",
                (0, _hyperapp.h)(
                    "a",
                    {
                        href: "#",
                        "class": "group-reject red",
                        onclick: function onclick(e) {
                            return data.rejectGroupInvite({
                                e: e,
                                index: data.key,
                                activity: {
                                    group_id: data.group_id,
                                    activity_id: data.id
                                }
                            });
                        }
                    },
                    " ",
                    "Reject"
                )
            )
        ),
        (0, _hyperapp.h)(
            "div",
            { "class": "item-meta" },
            (0, _hyperapp.h)("i", { "class": "fa fa-users", "aria-hidden": "true" }),
            (0, _hyperapp.h)(
                "span",
                { "class": "comment-date grey" },
                getTimeAgo(data.created_at)
            )
        )
    );
};

var Linkcast = exports.Linkcast = function Linkcast(data) {
    return (0, _hyperapp.h)(
        "div",
        { "class": "announcement" },
        (0, _hyperapp.h)(
            "div",
            { "class": "linkcast-msg", style: "color:{LCOLOR}" },
            data.actors,
            " - ",
            data.title
        ),
        (0, _hyperapp.h)(
            "div",
            { "class": "item-meta" },
            (0, _hyperapp.h)("i", { "class": "fa fa-bullhorn blink_me", "aria-hidden": "true" }),
            (0, _hyperapp.h)(
                "span",
                { "class": "comment-date grey" },
                getTimeAgo(data.created_at)
            )
        )
    );
};

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

var Comments = function Comments(props) {
    var comments = typeof props.data == "undefined" ? [] : props.data;

    var markup = comments.map(function (item) {
        return (0, _hyperapp.h)(
            "div",
            { "class": "left clearfix" },
            (0, _hyperapp.h)(
                "span",
                { "class": "comment-user", style: { color: item.color } },
                item.nickname
            ),
            " ",
            "- ",
            (0, _hyperapp.h)(
                "span",
                { "class": "user-comment" },
                item.comment
            ),
            (0, _hyperapp.h)(
                "span",
                { "class": "comment-meta" },
                (0, _hyperapp.h)(
                    "span",
                    { "class": "comment-date grey" },
                    " ",
                    "-",
                    function () {
                        var d = "now";
                        if (item.created_at != "now") {
                            d = moment(item.created_at).add(moment().utcOffset(), "minutes").fromNow();
                        }
                        return d;
                    }()
                )
            )
        );
    });

    return (0, _hyperapp.h)(
        "div",
        { "class": "comments" },
        markup
    );
};
exports.default = Comments;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

var _DropDown = __webpack_require__(7);

var _DropDown2 = _interopRequireDefault(_DropDown);

var _LinkItem = __webpack_require__(6);

var _LinkItem2 = _interopRequireDefault(_LinkItem);

var _Links = __webpack_require__(3);

var _Links2 = _interopRequireDefault(_Links);

var _ScrollHoc = __webpack_require__(5);

var _ScrollHoc2 = _interopRequireDefault(_ScrollHoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Feed = function Feed(props) {
    var onGroupChange = function onGroupChange(e) {
        props.actions.setDefaultGroup(e.target.options.selectedIndex);
    };
    return (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
            "div",
            { "class": "footer" },
            (0, _hyperapp.h)(
                "div",
                { "class": "pull-left" },
                "Group:"
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "pull-left" },
                (0, _hyperapp.h)(_DropDown2.default, {
                    classes: "groups-dd",
                    identifier: "group_id",
                    selected: props.state.groups.defaultGroup,
                    data: props.state.groups.data,
                    onChange: onGroupChange
                })
            ),
            (0, _hyperapp.h)("span", { "class": "clearfix" })
        ),
        (0, _hyperapp.h)(_Links2.default, {
            model: "mainNav.tabs.feed",
            tab: props.tab,
            actions: props.actions,
            loadMore: props.actions.loadMore,
            onScroll: props.onScroll,
            state: props.state
        })
    );
};
exports.default = (0, _ScrollHoc2.default)(Feed);

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

var _DropDown = __webpack_require__(7);

var _DropDown2 = _interopRequireDefault(_DropDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Post = function Post(_ref) {
    var state = _ref.state,
        actions = _ref.actions;

    var params = {
        title: state.post.title,
        url: state.post.url,
        comments: state.post.comments,
        thumbnail: state.post.thumbnail,
        group: state.groups.defaultGroup
    };
    var _onChange = function _onChange(e, key) {
        params[key] = e.target.value;

        if (e.target.tagName == "SELECT") {
            var selectedIdx = e.target.options.selectedIndex;
            params[key] = state.groups.data[selectedIdx].group_id;
        }
    };
    var handlePost = function handlePost(e) {
        e.preventDefault();
        actions.doPost(params);
    };

    return (0, _hyperapp.h)(
        "div",
        { "class": "col-sm-12 pt20 form-horizontal" },
        (0, _hyperapp.h)(
            "div",
            { "class": "form-group" },
            (0, _hyperapp.h)(
                "label",
                { "class": "control-label col-sm-3 required", "for": "item-name" },
                "Name"
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "col-sm-9" },
                (0, _hyperapp.h)("input", {
                    type: "text",
                    "class": "form-control",
                    value: state.post.title,
                    onblur: function onblur(e) {
                        return _onChange(e, "title");
                    }
                })
            )
        ),
        (0, _hyperapp.h)(
            "div",
            { "class": "form-group" },
            (0, _hyperapp.h)(
                "label",
                { "class": "control-label col-sm-3 required", "for": "item-url" },
                "URL"
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "col-sm-9" },
                (0, _hyperapp.h)("input", {
                    name: "url",
                    type: "text",
                    "class": "form-control",
                    value: state.post.url,
                    onblur: function onblur(e) {
                        return _onChange(e, "url");
                    }
                })
            )
        ),
        (0, _hyperapp.h)(
            "div",
            { "class": "form-group" },
            (0, _hyperapp.h)(
                "label",
                { "class": "control-label col-sm-3", "for": "item-comments" },
                "Comments"
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "col-sm-9" },
                (0, _hyperapp.h)("input", {
                    name: "comments",
                    type: "text",
                    "class": "form-control",
                    value: state.post.comments,
                    onblur: function onblur(e) {
                        return _onChange(e, "comments");
                    }
                })
            )
        ),
        (0, _hyperapp.h)("input", { type: "hidden", id: "item-thumb" }),
        (0, _hyperapp.h)(
            "div",
            { "class": "form-group" },
            (0, _hyperapp.h)(
                "label",
                { "for": "groups-dd", "class": "control-label col-sm-3" },
                "Select Group"
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "col-sm-9" },
                (0, _hyperapp.h)(_DropDown2.default, {
                    classes: "form-control",
                    data: state.groups.data,
                    selected: state.groups.defaultGroup,
                    onChange: function onChange(e) {
                        return _onChange(e, "group");
                    },
                    identifier: "group_id"
                })
            )
        ),
        (0, _hyperapp.h)(
            "div",
            { "class": "col-sm-9 col-sm-offset-3" },
            (0, _hyperapp.h)(
                "button",
                {
                    id: "post-btn",
                    type: "submit",
                    "class": "btn btn-default btn-sm",
                    onclick: handlePost
                },
                "Post"
            )
        )
    );
};
exports.default = Post;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

var _Links = __webpack_require__(3);

var _Links2 = _interopRequireDefault(_Links);

var _TabComponent = __webpack_require__(4);

var _ScrollHoc = __webpack_require__(5);

var _ScrollHoc2 = _interopRequireDefault(_ScrollHoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyLinks = function MyLinks(props) {
    var onGroupChange = function onGroupChange(e) {
        return (0, _hyperapp.h)("div", null);
    };
    var data = null;
    switch (props.active) {
        case "favourites":
            data = (0, _hyperapp.h)(_Links2.default, {
                model: "linkTabs.tabs.favourites",
                tab: props.tabs[props.active],
                onScroll: props.onScroll,
                loadMore: props.actions.loadMore,
                state: props.state,
                actions: props.actions
            });
        case "sent":
            data = (0, _hyperapp.h)(
                "div",
                null,
                (0, _hyperapp.h)(_Links2.default, {
                    model: "linkTabs.tabs.sent",
                    tab: props.tabs[props.active],
                    onScroll: props.onScroll,
                    loadMore: props.actions.loadMore,
                    state: props.state,
                    actions: props.actions
                })
            );
            break;
        default:
            console.log(state);
    }

    return (0, _hyperapp.h)(_TabComponent.TabComponent, {
        classes: "secondary-nav",
        type: "nav-pills",
        state: props.state,
        stateKey: "linkTabs",
        onChange: props.onTabChange,
        html: data
    });
};
exports.default = (0, _ScrollHoc2.default)(MyLinks);

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

var _Links = __webpack_require__(3);

var _Links2 = _interopRequireDefault(_Links);

var _TabComponent = __webpack_require__(4);

var _ScrollHoc = __webpack_require__(5);

var _ScrollHoc2 = _interopRequireDefault(_ScrollHoc);

var _PublicGroups = __webpack_require__(151);

var _PublicGroups2 = _interopRequireDefault(_PublicGroups);

var _ManageGroups = __webpack_require__(152);

var _ManageGroups2 = _interopRequireDefault(_ManageGroups);

var _CreateGroup = __webpack_require__(154);

var _CreateGroup2 = _interopRequireDefault(_CreateGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Groups = function Groups(_ref) {
    var active = _ref.active,
        actions = _ref.actions,
        tabs = _ref.tabs,
        state = _ref.state;

    var onGroupChange = function onGroupChange(e) {
        return (0, _hyperapp.h)("div", null);
    };
    var data = null;
    switch (active) {
        case "manage":
            data = (0, _hyperapp.h)(_ManageGroups2.default, {
                actions: actions,
                state: state,
                tab: tabs[active]
            });
            break;
        case "public":
            data = (0, _hyperapp.h)(_PublicGroups2.default, {
                actions: actions,
                state: state,
                tab: tabs[active]
            });
            break;
        case "create":
            data = (0, _hyperapp.h)(_CreateGroup2.default, {
                actions: actions,
                state: state,
                tab: tabs[active]
            });
            break;
    }

    return (0, _hyperapp.h)(_TabComponent.TabComponent, {
        classes: "secondary-nav",
        state: state,
        type: "nav-pills",
        stateKey: "groupTabs",
        onChange: actions.onTabChange,
        html: data
    });
};
exports.default = Groups;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

var PublicGroups = function PublicGroups(_ref) {
    var actions = _ref.actions,
        state = _ref.state,
        tab = _ref.tab;

    var groups = state.allGroups.data.map(function (group, key) {
        return (0, _hyperapp.h)(PublicGroupsTable, { actions: actions, key: key, item: group });
    });
    return (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
            "p",
            null,
            "These are the public group. You can join and start posting links if you have the permission."
        ),
        (0, _hyperapp.h)(
            "div",
            { "class": "scroll" },
            (0, _hyperapp.h)(
                "table",
                { style: "margin-bottom:0px;", "class": "table table-hover" },
                (0, _hyperapp.h)(
                    "thead",
                    null,
                    (0, _hyperapp.h)(
                        "tr",
                        null,
                        (0, _hyperapp.h)(
                            "th",
                            { width: "160" },
                            "Name"
                        ),
                        (0, _hyperapp.h)(
                            "th",
                            null,
                            "Type"
                        ),
                        (0, _hyperapp.h)(
                            "th",
                            null,
                            "Description"
                        ),
                        (0, _hyperapp.h)(
                            "th",
                            null,
                            "Access"
                        ),
                        (0, _hyperapp.h)(
                            "th",
                            null,
                            "Users"
                        ),
                        (0, _hyperapp.h)(
                            "th",
                            null,
                            "Action"
                        )
                    )
                ),
                (0, _hyperapp.h)(
                    "tbody",
                    { "class": "items" },
                    groups
                )
            )
        )
    );
};

var PublicGroupsTable = function PublicGroupsTable(_ref2) {
    var actions = _ref2.actions,
        item = _ref2.item,
        key = _ref2.key;

    var isPublic = parseInt(item.is_public);
    var joinGroup = function joinGroup(e, group) {
        e.preventDefault();
        actions.joinGroup(group);
    };
    return (0, _hyperapp.h)(
        "tr",
        { "class": "group_row" },
        (0, _hyperapp.h)(
            "td",
            null,
            (0, _hyperapp.h)(
                "a",
                { href: "#", "class": "group-name" },
                (0, _hyperapp.h)(
                    "strong",
                    null,
                    item.name
                )
            )
        ),
        (0, _hyperapp.h)(
            "td",
            null,
            isPublic ? "Public" : "Private"
        ),
        (0, _hyperapp.h)(
            "td",
            null,
            item.desc
        ),
        (0, _hyperapp.h)(
            "td",
            null,
            item.group_rights
        ),
        (0, _hyperapp.h)(
            "td",
            null,
            item.total
        ),
        (0, _hyperapp.h)(
            "td",
            null,
            function () {
                return item.status == "1" ? (0, _hyperapp.h)(
                    "a",
                    {
                        href: "#",
                        "class": "red group-leave",
                        onclick: function onclick(e) {
                            return actions.leaveGroup({ e: e, key: key });
                        }
                    },
                    "Leave"
                ) : (0, _hyperapp.h)(
                    "a",
                    {
                        href: "#",
                        "class": "green group-join",
                        onclick: function onclick(e) {
                            return joinGroup({
                                e: e,
                                group: {
                                    group_id: item.id,
                                    is_public: item.is_public
                                }
                            });
                        }
                    },
                    isPublic ? "Join" : "Request"
                );
            }()
        )
    );
};
exports.default = PublicGroups;

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

var _Users = __webpack_require__(153);

var _Users2 = _interopRequireDefault(_Users);

var _DropDown = __webpack_require__(7);

var _DropDown2 = _interopRequireDefault(_DropDown);

var _Radio = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ManageGroups = function ManageGroups(_ref) {
    var state = _ref.state,
        actions = _ref.actions;

    var GroupUsers = state.groupUsers.data.map(function (item) {
        return (0, _hyperapp.h)(_Users2.default, { item: item, isAdmin: item.id == state.groupUsers.admin_id });
    });
    var groups = [];

    state.allGroups.data.map(function (item) {
        if (item.admin == state.user.data.id) {
            groups.push(item);
        }
    });
    var selected = groups[0] ? groups[0].id : 0;
    return (0, _hyperapp.h)(
        "div",
        { "class": "tab-pane", id: "tab-manage-groups" },
        (0, _hyperapp.h)(
            "p",
            null,
            "You can manage the groups for which are you are the admin.",
            (0, _hyperapp.h)(
                "button",
                {
                    "class": "invite-btn btn btn-xs btn-success pull-right",
                    onclick: function onclick(e) {
                        return actions.showInviteModal({
                            e: e,
                            group_id: state.groupUsers.group_id
                        });
                    }
                },
                "Invite"
            )
        ),
        (0, _hyperapp.h)(
            "div",
            { "class": "row" },
            (0, _hyperapp.h)(
                "div",
                { "class": "col-sm-6 form-horizontal" },
                (0, _hyperapp.h)(
                    "div",
                    {
                        "class": "form-group",
                        oncreate: function oncreate() {
                            var evObj = document.createEvent("HTMLEvents");
                            evObj.initEvent("change", true, true);
                            var elem = document.querySelector(".manage-gdd");
                            elem.dispatchEvent(evObj);
                        }
                    },
                    (0, _hyperapp.h)(
                        "label",
                        { "class": "control-label col-sm-3" },
                        "Groups:"
                    ),
                    (0, _hyperapp.h)(
                        "div",
                        { "class": "col-sm-9" },
                        (0, _hyperapp.h)(_DropDown2.default, {
                            classes: "form-control manage-gdd",
                            identifier: "id",
                            data: groups,
                            selected: selected,
                            onChange: actions.fetchGroupUsers
                        })
                    )
                ),
                (0, _hyperapp.h)(GroupEditForm, { state: state })
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "col-sm-6 form-group scroll", id: "group-users-block" },
                (0, _hyperapp.h)(
                    "label",
                    null,
                    "Group Users:"
                ),
                (0, _hyperapp.h)(
                    "table",
                    { "class": "table table-hover", id: "group-users-table" },
                    (0, _hyperapp.h)(
                        "thead",
                        null,
                        (0, _hyperapp.h)(
                            "tr",
                            null,
                            (0, _hyperapp.h)(
                                "th",
                                null,
                                "Name"
                            ),
                            (0, _hyperapp.h)(
                                "th",
                                null,
                                "Access"
                            ),
                            (0, _hyperapp.h)(
                                "th",
                                null,
                                "Remove"
                            )
                        )
                    ),
                    (0, _hyperapp.h)(
                        "tbody",
                        null,
                        GroupUsers
                    )
                )
            )
        )
    );
};

var GroupEditForm = function GroupEditForm(_ref2) {
    var state = _ref2.state;

    var selectedGroup = {};
    state.allGroups.data.map(function (group) {
        if (state.groupUsers.group_id == group.id) selectedGroup = group;
    });
    var can_post = selectedGroup.group_rights == "can_post";
    var can_read = selectedGroup.group_rights == "can_read";
    return (0, _hyperapp.h)(
        "div",
        { "class": "editgroup-block" },
        (0, _hyperapp.h)(
            "div",
            { "class": "form-group" },
            (0, _hyperapp.h)(
                "label",
                {
                    "class": "control-label col-sm-3 required",
                    "for": "inputGroupCreate"
                },
                "Name"
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "col-sm-9" },
                (0, _hyperapp.h)("input", {
                    "class": "form-control",
                    value: selectedGroup.name,
                    type: "text"
                })
            )
        ),
        (0, _hyperapp.h)(
            "div",
            { "class": "form-group" },
            (0, _hyperapp.h)(
                "label",
                {
                    "class": "control-label col-sm-3 required",
                    "for": "inputGrpDesc"
                },
                "Desc"
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "col-sm-9" },
                (0, _hyperapp.h)("input", {
                    size: "140",
                    "class": "form-control",
                    value: selectedGroup.desc,
                    type: "text"
                })
            )
        ),
        (0, _hyperapp.h)(
            "div",
            { "class": "form-group", id: "group-visibility" },
            (0, _hyperapp.h)(
                "label",
                { "class": "control-label col-sm-3", "for": "inputDefault" },
                "Visibility"
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "col-sm-9" },
                (0, _hyperapp.h)(
                    "label",
                    { "class": "radio-inline" },
                    (0, _hyperapp.h)(_Radio.Radio, {
                        "class": "radio",
                        type: "radio",
                        value: "1",
                        name: "group-visibility",
                        checked: selectedGroup.is_public == "1"
                    }),
                    "Public"
                ),
                (0, _hyperapp.h)(
                    "label",
                    { "class": "radio-inline" },
                    (0, _hyperapp.h)(_Radio.Radio, {
                        "class": "radio",
                        type: "radio",
                        value: "0",
                        name: "group-visibility",
                        checked: selectedGroup.is_public == "0"
                    }),
                    "Private"
                )
            )
        ),
        (0, _hyperapp.h)(
            "div",
            { id: "group-private", "class": "hide" },
            (0, _hyperapp.h)(
                "div",
                { "class": "form-group" },
                (0, _hyperapp.h)(
                    "label",
                    { "class": "control-label col-sm-3", "for": "group-password" },
                    "Password:"
                ),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "col-sm-9" },
                    (0, _hyperapp.h)("input", {
                        type: "password",
                        id: "group-password",
                        "class": "form-control group-private"
                    })
                )
            )
        ),
        (0, _hyperapp.h)(
            "div",
            { "class": "form-group", id: "group-rights" },
            (0, _hyperapp.h)(
                "label",
                { "class": "control-label col-sm-3" },
                "Permissions:"
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "col-sm-9" },
                (0, _hyperapp.h)(
                    "div",
                    { "class": "btn-group", "data-toggle": "buttons" },
                    (0, _hyperapp.h)(
                        "label",
                        {
                            "class": "btn btn-default btn-sm " + (can_post && "active")
                        },
                        (0, _hyperapp.h)(_Radio.Radio, {
                            "class": "radio",
                            type: "radio",
                            value: "can_post",
                            name: "optradio",
                            checked: selectedGroup.group_rights == "can_post"
                        }),
                        "Can Post"
                    ),
                    (0, _hyperapp.h)(
                        "label",
                        {
                            "class": "btn btn-default btn-sm " + (can_read && "active")
                        },
                        (0, _hyperapp.h)(_Radio.Radio, {
                            "class": "radio",
                            type: "radio",
                            value: "can_read",
                            name: "optradio",
                            checked: selectedGroup.group_rights == "can_post"
                        }),
                        "Can Read"
                    )
                )
            )
        ),
        (0, _hyperapp.h)(
            "div",
            { "class": "col-xs-offset-3 col-xs-9" },
            (0, _hyperapp.h)(
                "button",
                {
                    "data-action": "edit",
                    type: "submit",
                    id: "edit-group-save-btn",
                    "class": "btn btn-default btn-sm"
                },
                "Save"
            )
        )
    );
};

exports.default = ManageGroups;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

var _Radio = __webpack_require__(9);

var Users = function Users(_ref) {
    var actions = _ref.actions,
        item = _ref.item,
        isAdmin = _ref.isAdmin;

    var remove = isAdmin ? "" : "remove";
    var can_post = item.group_rights == "can_post";
    var can_read = item.group_rights == "can_read";

    return (0, _hyperapp.h)(
        "tr",
        { "class": "user-item", "data-id": "{USER_ID}" },
        (0, _hyperapp.h)(
            "td",
            null,
            item.nickname
        ),
        (0, _hyperapp.h)(
            "td",
            null,
            (0, _hyperapp.h)(
                "div",
                { "class": "btn-group", "data-toggle": "buttons" },
                (0, _hyperapp.h)(
                    "label",
                    {
                        "class": "btn btn-default btn-xs " + (can_post && "active")
                    },
                    (0, _hyperapp.h)(_Radio.Radio, {
                        "class": "radio",
                        type: "radio",
                        value: "can_post",
                        name: "optradio",
                        checked: can_post
                    }),
                    "Can Post"
                ),
                (0, _hyperapp.h)(
                    "label",
                    {
                        "class": "btn btn-default btn-xs " + (can_read && "active")
                    },
                    (0, _hyperapp.h)(_Radio.Radio, {
                        "class": "radio",
                        type: "radio",
                        value: "can_read",
                        name: "optradio",
                        checked: can_read
                    }),
                    "Can Read"
                )
            )
        ),
        (0, _hyperapp.h)(
            "td",
            null,
            (0, _hyperapp.h)(
                "a",
                { href: "#", "class": "remove-user" },
                remove
            )
        )
    );
};
exports.default = Users;

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

var CreateGroup = function CreateGroup(props) {
    return (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
            "p",
            null,
            "You can create a public group which is visible to all users. Any body will be able to join and see the links being shared. For privacy, you can create a private group."
        ),
        (0, _hyperapp.h)(
            "div",
            null,
            (0, _hyperapp.h)(
                "div",
                { "class": " form-horizontal", id: "create-group-block" },
                (0, _hyperapp.h)(
                    "div",
                    { "class": "form-group" },
                    (0, _hyperapp.h)(
                        "label",
                        {
                            "class": "control-label col-sm-3 required",
                            "for": "inputGroupCreate"
                        },
                        "Name"
                    ),
                    (0, _hyperapp.h)(
                        "div",
                        { "class": "col-sm-9" },
                        (0, _hyperapp.h)("input", {
                            "class": "form-control",
                            id: "inputGroupCreate",
                            type: "text"
                        })
                    )
                ),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "form-group" },
                    (0, _hyperapp.h)(
                        "label",
                        {
                            "class": "control-label col-sm-3 required",
                            "for": "inputGrpDesc"
                        },
                        "Desc"
                    ),
                    (0, _hyperapp.h)(
                        "div",
                        { "class": "col-sm-9" },
                        (0, _hyperapp.h)("input", {
                            size: "140",
                            "class": "form-control",
                            id: "inputGrpDesc",
                            type: "text"
                        })
                    )
                ),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "form-group", id: "group-visibility" },
                    (0, _hyperapp.h)(
                        "label",
                        {
                            "class": "control-label col-sm-3",
                            "for": "inputDefault"
                        },
                        "Visibility"
                    ),
                    (0, _hyperapp.h)(
                        "div",
                        { "class": "col-sm-9" },
                        (0, _hyperapp.h)(
                            "label",
                            { "class": "radio-inline" },
                            (0, _hyperapp.h)("input", {
                                "class": "radio",
                                checked: true,
                                type: "radio",
                                value: "1",
                                name: "group-visibility"
                            }),
                            "Public"
                        ),
                        (0, _hyperapp.h)(
                            "label",
                            { "class": "radio-inline" },
                            (0, _hyperapp.h)("input", {
                                "class": "radio",
                                type: "radio",
                                value: "0",
                                name: "group-visibility"
                            }),
                            "Private"
                        )
                    )
                ),
                (0, _hyperapp.h)(
                    "div",
                    { id: "group-private", "class": "hide" },
                    (0, _hyperapp.h)(
                        "div",
                        { "class": "form-group" },
                        (0, _hyperapp.h)(
                            "label",
                            {
                                "class": "control-label col-sm-3",
                                "for": "group-password"
                            },
                            "Password:"
                        ),
                        (0, _hyperapp.h)(
                            "div",
                            { "class": "col-sm-9" },
                            (0, _hyperapp.h)("input", {
                                type: "password",
                                id: "group-password",
                                "class": "form-control group-private"
                            })
                        )
                    )
                ),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "form-group", id: "group-rights" },
                    (0, _hyperapp.h)(
                        "label",
                        { "class": "control-label col-sm-3" },
                        "Permissions:"
                    ),
                    (0, _hyperapp.h)(
                        "div",
                        { "class": "col-sm-9" },
                        (0, _hyperapp.h)(
                            "div",
                            { "class": "btn-group", "data-toggle": "buttons" },
                            (0, _hyperapp.h)(
                                "label",
                                { "class": "btn btn-default btn-sm active" },
                                (0, _hyperapp.h)("input", {
                                    "class": "radio",
                                    type: "radio",
                                    value: "can_post",
                                    name: "optradio"
                                }),
                                "Can Post"
                            ),
                            (0, _hyperapp.h)(
                                "label",
                                { "class": "btn btn-default btn-sm" },
                                (0, _hyperapp.h)("input", {
                                    "class": "radio",
                                    type: "radio",
                                    value: "can_read",
                                    name: "optradio"
                                }),
                                "Can Read"
                            )
                        )
                    )
                ),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "col-xs-offset-3 col-xs-9" },
                    (0, _hyperapp.h)("br", null),
                    (0, _hyperapp.h)(
                        "button",
                        {
                            type: "submit",
                            "data-action": "create",
                            id: "create-group",
                            "class": "actionBtn btn btn-default btn-sm"
                        },
                        "Create Group"
                    )
                )
            ),
            (0, _hyperapp.h)("br", null)
        )
    );
};

exports.default = CreateGroup;

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

var _Links = __webpack_require__(3);

var _Links2 = _interopRequireDefault(_Links);

var _TabComponent = __webpack_require__(4);

var _Profile = __webpack_require__(156);

var _Profile2 = _interopRequireDefault(_Profile);

var _Customize = __webpack_require__(158);

var _Customize2 = _interopRequireDefault(_Customize);

var _About = __webpack_require__(159);

var _About2 = _interopRequireDefault(_About);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Settings = function Settings(_ref) {
    var active = _ref.active,
        state = _ref.state,
        actions = _ref.actions,
        tabs = _ref.tabs;

    var onGroupChange = function onGroupChange(e) {
        return (0, _hyperapp.h)("div", null);
    };
    var data = null;
    switch (active) {
        case "profile":
            data = (0, _hyperapp.h)(_Profile2.default, {
                state: state,
                model: "settingsTabs.tabs.profile",
                tab: tabs[active],
                actions: actions
            });
            break;
        case "customize":
            data = (0, _hyperapp.h)(
                "div",
                null,
                (0, _hyperapp.h)(_Customize2.default, {
                    state: state,
                    model: "settingsTabs.tabs.customize",
                    tab: tabs[active],
                    actions: actions
                })
            );
            break;
        case "about":
            data = (0, _hyperapp.h)(
                "div",
                null,
                (0, _hyperapp.h)(_About2.default, {
                    model: "settingsTabs.tabs.about",
                    state: state,
                    tab: tabs[active]
                })
            );
            break;
        default:
            // onTabChange({
            //     stateKey: "settingsTabs",
            //     tab_id: active
            // });
            break;
    }
    console.log(data);
    return (0, _hyperapp.h)(_TabComponent.TabComponent, {
        classes: "secondary-nav",
        type: "nav-pills",
        state: state,
        stateKey: "settingsTabs",
        onChange: actions.onTabChange,
        html: data
    });
};
exports.default = Settings;

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

__webpack_require__(157);

var Profile = function Profile(_ref) {
    var state = _ref.state,
        actions = _ref.actions;

    return (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(Info, {
            actions: actions,
            state: state,
            loggedIn: state.user.loggedIn
        }),
        (0, _hyperapp.h)(LoginRegistration, {
            actions: actions,
            state: state,
            loggedIn: state.user.loggedIn
        })
    );
};

var Info = function Info(_ref2) {
    var state = _ref2.state,
        actions = _ref2.actions,
        loggedIn = _ref2.loggedIn;

    if (!loggedIn) return null;

    var localState = {};

    var onBlur = function onBlur(e, key) {
        localState[key] = e.target.value;
    };
    return state.user.loggedIn && (0, _hyperapp.h)(
        "div",
        { "class": "authorized " },
        (0, _hyperapp.h)(
            "div",
            { "class": "status" },
            (0, _hyperapp.h)(
                "div",
                null,
                "Connected as",
                (0, _hyperapp.h)(
                    "strong",
                    null,
                    " ",
                    state.user.data.nickname
                ),
                ",",
                (0, _hyperapp.h)(
                    "a",
                    { href: "#", onclick: actions.doLogout },
                    "Logout"
                )
            )
        ),
        (0, _hyperapp.h)(
            "div",
            { id: "edit-profile" },
            (0, _hyperapp.h)(
                "form",
                {
                    "class": "form-horizontal",
                    oncreate: function oncreate(e) {
                        var nicknameStyle = document.querySelector("#nickname").style;
                        nicknameStyle.color = state.user.data.color;
                        ColorPicker(document.getElementById("slide"), document.getElementById("picker"), function (hex, hsv, rgb) {
                            nicknameStyle.color = hex;
                            var e = {
                                target: {
                                    value: hex
                                }
                            };
                            onBlur(e, "color");
                        });
                    }
                },
                (0, _hyperapp.h)(
                    "div",
                    { "class": "form-group", style: "line-height: 44px;" },
                    (0, _hyperapp.h)(
                        "label",
                        {
                            "class": "control-label col-sm-3",
                            "for": "profile-color"
                        },
                        "Profile Color"
                    ),
                    (0, _hyperapp.h)(
                        "div",
                        { "class": "col-sm-9", style: { display: "flex" } },
                        (0, _hyperapp.h)("div", { id: "picker" }),
                        (0, _hyperapp.h)("div", { id: "slide" })
                    )
                ),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "form-group" },
                    (0, _hyperapp.h)(
                        "label",
                        {
                            "class": "control-label col-sm-3",
                            "for": "new-nickname"
                        },
                        "Nickname"
                    ),
                    (0, _hyperapp.h)(
                        "div",
                        { "class": "col-sm-9" },
                        (0, _hyperapp.h)("input", {
                            "class": "form-control",
                            id: "nickname",
                            onblur: function onblur(e) {
                                return onBlur(e, "nickname");
                            },
                            type: "text",
                            value: state.user.data.nickname
                        })
                    )
                ),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "form-group" },
                    (0, _hyperapp.h)(
                        "label",
                        { "class": "control-label col-sm-3", "for": "bio" },
                        "Short Bio"
                    ),
                    (0, _hyperapp.h)(
                        "div",
                        { "class": "col-sm-9" },
                        (0, _hyperapp.h)("input", {
                            "class": "form-control",
                            onblur: function onblur(e) {
                                return onBlur(e, "bio");
                            },
                            type: "text",
                            value: state.user.data.bio
                        })
                    )
                ),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "col-xs-offset-3" },
                    (0, _hyperapp.h)(
                        "button",
                        {
                            type: "submit",
                            style: "margin-left: 14px;",
                            onclick: function onclick(e) {
                                return actions.saveProfile({
                                    e: e,
                                    data: localState
                                });
                            },
                            "class": "profile-btn btn btn-default btn-sm"
                        },
                        "Save"
                    )
                )
            )
        )
    );
};
var LoginRegistration = function LoginRegistration(_ref3) {
    var actions = _ref3.actions,
        state = _ref3.state,
        loggedIn = _ref3.loggedIn;

    if (loggedIn) return null;

    var params = {
        nickname: "",
        password: "",
        email: ""
    };
    var onBlur = function onBlur(e, key) {
        params[key] = e.target.value;
    };
    var handleLogin = function handleLogin() {
        actions.doLogin(params);
    };
    var handleRegistration = function handleRegistration(e, key) {
        actions.doRegister(params);
    };
    return (0, _hyperapp.h)(
        "div",
        { "class": "step form-horizontal" },
        (0, _hyperapp.h)(
            "div",
            { "class": "col-xs-6" },
            (0, _hyperapp.h)(
                "p",
                null,
                "Login"
            ),
            (0, _hyperapp.h)("br", null),
            (0, _hyperapp.h)(
                "div",
                { "class": "form-group" },
                (0, _hyperapp.h)(
                    "label",
                    { "class": "control-label col-sm-3", "for": "nickname" },
                    "Nickname"
                ),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "col-sm-9" },
                    (0, _hyperapp.h)("input", {
                        "class": "form-control",
                        onblur: function onblur(e) {
                            return onBlur(e, "nickname");
                        },
                        type: "text"
                    })
                )
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "form-group" },
                (0, _hyperapp.h)(
                    "label",
                    { "class": "control-label  col-sm-3", "for": "password" },
                    "Password"
                ),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "col-sm-9" },
                    (0, _hyperapp.h)("input", {
                        "class": "form-control",
                        onblur: function onblur(e) {
                            return onBlur(e, "password");
                        },
                        type: "password"
                    })
                )
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "col-sm-9 col-sm-offset-3" },
                (0, _hyperapp.h)(
                    "button",
                    {
                        type: "submit",
                        "class": "login-btn btn btn-default btn-sm",
                        onclick: handleLogin
                    },
                    "Login"
                )
            )
        ),
        (0, _hyperapp.h)(
            "div",
            { "class": "col-xs-6" },
            (0, _hyperapp.h)(
                "p",
                null,
                "Register"
            ),
            (0, _hyperapp.h)("br", null),
            (0, _hyperapp.h)(
                "div",
                { "class": "form-group" },
                (0, _hyperapp.h)(
                    "label",
                    { "class": "control-label col-sm-3", "for": "r-email" },
                    "Email"
                ),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "col-sm-9" },
                    (0, _hyperapp.h)("input", {
                        onblur: function onblur(e) {
                            return onBlur(e, "email");
                        },
                        "class": "form-control",
                        id: "r-email",
                        type: "email"
                    })
                )
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "form-group" },
                (0, _hyperapp.h)(
                    "label",
                    { "class": "control-label  col-sm-3", "for": "r-nickname" },
                    "Nickname"
                ),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "col-sm-9" },
                    (0, _hyperapp.h)("input", {
                        "class": "form-control",
                        id: "r-nickname",
                        type: "text",
                        onblur: function onblur(e) {
                            return onBlur(e, "nickname");
                        }
                    })
                )
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "form-group" },
                (0, _hyperapp.h)(
                    "label",
                    { "class": "control-label col-sm-3", "for": "r-password" },
                    "Password"
                ),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "col-sm-9" },
                    (0, _hyperapp.h)("input", {
                        "class": "form-control",
                        id: "r-password",
                        type: "password",
                        onblur: function onblur(e) {
                            return onBlur(e, "password");
                        }
                    })
                )
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "col-sm-9 col-sm-offset-3" },
                (0, _hyperapp.h)(
                    "button",
                    {
                        type: "submit",
                        "class": "register-btn btn btn-default btn-sm",
                        onclick: handleRegistration
                    },
                    "Register"
                )
            )
        )
    );
};
exports.default = Profile;

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (g, p, n) {
    function v(a) {
        if (g.event && g.event.contentOverflow !== n) return { x: g.event.offsetX, y: g.event.offsetY };if (a.offsetX !== n && a.offsetY !== n) return { x: a.offsetX, y: a.offsetY };var b = a.target.parentNode.parentNode;return { x: a.layerX - b.offsetLeft, y: a.layerY - b.offsetTop };
    }function e(a, b, c) {
        a = p.createElementNS(z, a);for (var d in b) {
            a.setAttribute(d, b[d]);
        }"[object Array]" != Object.prototype.toString.call(c) && (c = [c]);b = 0;for (d = c[0] && c.length || 0; b < d; b++) {
            a.appendChild(c[b]);
        }return a;
    }function h(a) {
        var b,
            c,
            d,
            j,
            e = a.h % 360 / 60;j = a.v * a.s;d = j * (1 - Math.abs(e % 2 - 1));b = c = a = a.v - j;e = ~~e;b += [j, d, 0, 0, d, j][e];c += [d, j, j, d, 0, 0][e];a += [0, 0, d, j, j, d][e];d = Math.floor(255 * b);c = Math.floor(255 * c);a = Math.floor(255 * a);return { r: d, g: c, b: a, hex: "#" + (16777216 | a | c << 8 | d << 16).toString(16).slice(1) };
    }function q(a) {
        var b = a.r,
            c = a.g,
            d = a.b;if (1 < a.r || 1 < a.g || 1 < a.b) b /= 255, c /= 255, d /= 255;var e;a = Math.max(b, c, d);e = a - Math.min(b, c, d);b = 60 * ((0 == e ? 0 : a == b ? (c - d) / e + (c < d ? 6 : 0) : a == c ? (d - b) / e + 2 : (b - c) / e + 4) % 6);return { h: b, s: 0 == e ? 0 : e / a, v: a };
    }function w(a, b, c) {
        return function (d) {
            d = d || g.event;d = v(d);a.h = 360 * (d.y / b.offsetHeight) + s;a.s = a.v = 1;var e = h({ h: a.h, s: 1, v: 1 });c.style.backgroundColor = e.hex;a.callback && a.callback(e.hex, { h: a.h - s, s: a.s, v: a.v }, { r: e.r, g: e.g, b: e.b }, n, d);
        };
    }function x(a, b) {
        return function (c) {
            c = c || g.event;c = v(c);var d = b.offsetHeight;a.s = c.x / b.offsetWidth;a.v = (d - c.y) / d;d = h(a);a.callback && a.callback(d.hex, { h: a.h - s, s: a.s, v: a.v }, { r: d.r, g: d.g, b: d.b }, c);
        };
    }function f(a, b, c) {
        if (!(this instanceof f)) return new f(a, b, c);this.h = 0;this.v = this.s = 1;if (c) this.callback = c, this.pickerElement = b, this.slideElement = a;else {
            a.innerHTML = A;this.slideElement = a.getElementsByClassName("slide")[0];this.pickerElement = a.getElementsByClassName("picker")[0];var d = a.getElementsByClassName("slide-indicator")[0],
                e = a.getElementsByClassName("picker-indicator")[0];f.fixIndicators(d, e);this.callback = function (a, c, g, h, k) {
                f.positionIndicators(d, e, k, h);b(a, c, g);
            };
        }"SVG" == t ? (a = k.getElementsByTagName("linearGradient")[0], c = k.getElementsByTagName("rect")[0], a.id = "gradient-hsv-" + r, c.setAttribute("fill", "url(#" + a.id + ")"), a = l.getElementsByTagName("linearGradient"), c = l.getElementsByTagName("rect"), a[0].id = "gradient-black-" + r, a[1].id = "gradient-white-" + r, c[0].setAttribute("fill", "url(#" + a[1].id + ")"), c[1].setAttribute("fill", "url(#" + a[0].id + ")"), this.slideElement.appendChild(k.cloneNode(!0)), this.pickerElement.appendChild(l.cloneNode(!0)), r++) : (this.slideElement.innerHTML = k, this.pickerElement.innerHTML = l);m(this.slideElement, "click", w(this, this.slideElement, this.pickerElement));m(this.pickerElement, "click", x(this, this.pickerElement));y(this, this.slideElement, w(this, this.slideElement, this.pickerElement));y(this, this.pickerElement, x(this, this.pickerElement));
    }function m(a, b, c) {
        a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener && a.addEventListener(b, c, !1);
    }function y(a, b, c) {
        var d = !1;m(b, "mousedown", function () {
            d = !0;
        });m(b, "mouseup", function () {
            d = !1;
        });m(b, "mouseout", function () {
            d = !1;
        });m(b, "mousemove", function (a) {
            d && c(a);
        });
    }function u(a, b, c, d) {
        a.h = b.h % 360;a.s = b.s;a.v = b.v;b = h(a);var e = { y: a.h * a.slideElement.offsetHeight / 360, x: 0 },
            f = a.pickerElement.offsetHeight,
            f = { x: a.s * a.pickerElement.offsetWidth, y: f - a.v * f };a.pickerElement.style.backgroundColor = h({ h: a.h, s: 1, v: 1 }).hex;a.callback && a.callback(d || b.hex, { h: a.h, s: a.s, v: a.v }, c || { r: b.r, g: b.g, b: b.b }, f, e);return a;
    }var t = g.SVGAngle || p.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML",
        l,
        k,
        s = 15,
        z = "http://www.w3.org/2000/svg",
        A = '<div class="picker-wrapper"><div class="picker"></div><div class="picker-indicator"></div></div><div class="slide-wrapper"><div class="slide"></div><div class="slide-indicator"></div></div>';
    "SVG" == t ? (k = e("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "100%", height: "100%" }, [e("defs", {}, e("linearGradient", { id: "gradient-hsv", x1: "0%", y1: "100%", x2: "0%", y2: "0%" }, [e("stop", { offset: "0%", "stop-color": "#FF0000", "stop-opacity": "1" }), e("stop", { offset: "13%", "stop-color": "#FF00FF", "stop-opacity": "1" }), e("stop", { offset: "25%", "stop-color": "#8000FF", "stop-opacity": "1" }), e("stop", { offset: "38%", "stop-color": "#0040FF", "stop-opacity": "1" }), e("stop", { offset: "50%", "stop-color": "#00FFFF", "stop-opacity": "1" }), e("stop", { offset: "63%", "stop-color": "#00FF40", "stop-opacity": "1" }), e("stop", { offset: "75%", "stop-color": "#0BED00", "stop-opacity": "1" }), e("stop", { offset: "88%", "stop-color": "#FFFF00", "stop-opacity": "1" }), e("stop", { offset: "100%", "stop-color": "#FF0000", "stop-opacity": "1" })])), e("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: "url(#gradient-hsv)" })]), l = e("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "100%", height: "100%" }, [e("defs", {}, [e("linearGradient", { id: "gradient-black", x1: "0%",
        y1: "100%", x2: "0%", y2: "0%" }, [e("stop", { offset: "0%", "stop-color": "#000000", "stop-opacity": "1" }), e("stop", { offset: "100%", "stop-color": "#CC9A81", "stop-opacity": "0" })]), e("linearGradient", { id: "gradient-white", x1: "0%", y1: "100%", x2: "100%", y2: "100%" }, [e("stop", { offset: "0%", "stop-color": "#FFFFFF", "stop-opacity": "1" }), e("stop", { offset: "100%", "stop-color": "#CC9A81", "stop-opacity": "0" })])]), e("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: "url(#gradient-white)" }), e("rect", { x: "0", y: "0", width: "100%", height: "100%",
        fill: "url(#gradient-black)" })])) : "VML" == t && (k = '<DIV style="position: relative; width: 100%; height: 100%"><v:rect style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" stroked="f" filled="t"><v:fill type="gradient" method="none" angle="0" color="red" color2="red" colors="8519f fuchsia;.25 #8000ff;24903f #0040ff;.5 aqua;41287f #00ff40;.75 #0bed00;57671f yellow"></v:fill></v:rect></DIV>', l = '<DIV style="position: relative; width: 100%; height: 100%"><v:rect style="position: absolute; left: -1px; top: -1px; width: 101%; height: 101%" stroked="f" filled="t"><v:fill type="gradient" method="none" angle="270" color="#FFFFFF" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill></v:rect><v:rect style="position: absolute; left: 0px; top: 0px; width: 100%; height: 101%" stroked="f" filled="t"><v:fill type="gradient" method="none" angle="0" color="#000000" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill></v:rect></DIV>', p.namespaces.v || p.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML"));var r = 0;f.hsv2rgb = function (a) {
        a = h(a);delete a.hex;return a;
    };f.hsv2hex = function (a) {
        return h(a).hex;
    };f.rgb2hsv = q;f.rgb2hex = function (a) {
        return h(q(a)).hex;
    };f.hex2hsv = function (a) {
        return q(f.hex2rgb(a));
    };f.hex2rgb = function (a) {
        return { r: parseInt(a.substr(1, 2), 16), g: parseInt(a.substr(3, 2), 16), b: parseInt(a.substr(5, 2), 16) };
    };f.prototype.setHsv = function (a) {
        return u(this, a);
    };f.prototype.setRgb = function (a) {
        return u(this, q(a), a);
    };f.prototype.setHex = function (a) {
        return u(this, f.hex2hsv(a), n, a);
    };f.positionIndicators = function (a, b, c, d) {
        c && (b.style.left = "auto", b.style.right = "0px", b.style.top = "0px", a.style.top = c.y - a.offsetHeight / 2 + "px");d && (b.style.top = d.y - b.offsetHeight / 2 + "px", b.style.left = d.x - b.offsetWidth / 2 + "px");
    };f.fixIndicators = function (a, b) {
        b.style.pointerEvents = "none";a.style.pointerEvents = "none";
    };g.ColorPicker = f;
})(window, window.document);

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

var _Radio = __webpack_require__(9);

var Customize = function Customize(_ref) {
    var state = _ref.state,
        actions = _ref.actions;

    var itemClicked = function itemClicked(e, key) {
        actions.saveCustomization({ e: e, key: key });
    };
    var initialState = state.user.customize;
    return (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
            "div",
            { "class": " form-horizontal" },
            (0, _hyperapp.h)(
                "div",
                { "class": "form-group", id: "sound-setting" },
                (0, _hyperapp.h)(
                    "label",
                    { "class": "control-label col-sm-3" },
                    "Sound"
                ),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "col-sm-9" },
                    (0, _hyperapp.h)(
                        "div",
                        { "class": "btn-group", "data-toggle": "buttons" },
                        (0, _hyperapp.h)(
                            "label",
                            {
                                "data-val": "1",
                                "class": "btn btn-default btn-sm " + (initialState.sound && "active")
                            },
                            (0, _hyperapp.h)(_Radio.Radio, {
                                "class": "radio",
                                type: "radio",
                                value: "1",
                                name: "sound",
                                onclick: function onclick(e) {
                                    return itemClicked(e, "sound");
                                },
                                checked: initialState.sound
                            }),
                            "On"
                        ),
                        (0, _hyperapp.h)(
                            "label",
                            {
                                "data-val": "0",
                                "class": "btn btn-default btn-sm " + (!initialState.sound && "active")
                            },
                            (0, _hyperapp.h)(_Radio.Radio, {
                                "class": "radio",
                                type: "radio",
                                value: "0",
                                name: "sound",
                                onclick: function onclick(e) {
                                    return itemClicked(e, "sound");
                                },
                                checked: !initialState.sound
                            }),
                            "Off"
                        )
                    )
                )
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "form-group", id: "rich-notification" },
                (0, _hyperapp.h)(
                    "label",
                    { "class": "control-label col-sm-3" },
                    "Notification:"
                ),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "col-sm-9" },
                    (0, _hyperapp.h)(
                        "div",
                        { "class": "btn-group", "data-toggle": "buttons" },
                        (0, _hyperapp.h)(
                            "label",
                            {
                                "data-val": "1",
                                "class": "btn btn-default btn-sm " + (initialState.notification && "active")
                            },
                            (0, _hyperapp.h)(_Radio.Radio, {
                                "class": "radio",
                                type: "radio",
                                value: "1",
                                name: "noti",
                                onclick: function onclick(e) {
                                    return itemClicked(e, "notification");
                                },
                                checked: initialState.notification
                            }),
                            "On"
                        ),
                        (0, _hyperapp.h)(
                            "label",
                            {
                                "data-val": "0",
                                "class": "btn btn-default btn-sm " + (!initialState.notification && "active")
                            },
                            (0, _hyperapp.h)(_Radio.Radio, {
                                "class": "radio",
                                type: "radio",
                                value: "0",
                                name: "noti",
                                onclick: function onclick(e) {
                                    return itemClicked(e, "notification");
                                },
                                checked: !initialState.notification
                            }),
                            "Off"
                        )
                    )
                )
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "form-group", id: "theme-setting" },
                (0, _hyperapp.h)(
                    "label",
                    { "class": "control-label col-sm-3" },
                    "Theme:"
                ),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "col-sm-9" },
                    (0, _hyperapp.h)(
                        "div",
                        { "class": "btn-group", "data-toggle": "buttons" },
                        (0, _hyperapp.h)(
                            "label",
                            {
                                "data-val": "1",
                                "class": "btn btn-default btn-sm active"
                            },
                            (0, _hyperapp.h)("input", {
                                "class": "radio",
                                type: "radio",
                                value: "1",
                                name: "noti"
                            }),
                            "Dark"
                        )
                    )
                )
            )
        )
    );
};

exports.default = Customize;

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

var About = function About(_ref) {
    var state = _ref.state;

    return (0, _hyperapp.h)(
        "div",
        { "class": "" },
        "Linkcast v",
        state.version,
        (0, _hyperapp.h)("p", null),
        (0, _hyperapp.h)(
            "p",
            null,
            "Web Linkcast:",
            " ",
            (0, _hyperapp.h)(
                "a",
                {
                    target: "_blank",
                    href: "chrome-extension://" + chrome.runtime.id + "/popup.html",
                    id: "linkcast-web"
                },
                "Click here"
            )
        ),
        (0, _hyperapp.h)("p", null),
        (0, _hyperapp.h)("p", null),
        (0, _hyperapp.h)("span", { id: "random_quote" }),
        (0, _hyperapp.h)(
            "div",
            { style: "position:absolute;bottom: 42px;" },
            "For any bugs, log them",
            " ",
            (0, _hyperapp.h)(
                "a",
                {
                    target: "_blank",
                    href: "https://github.com/ajaxtown/linkcast/issues"
                },
                "here"
            )
        )
    );
};

exports.default = About;

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

var _DropDown = __webpack_require__(7);

var _DropDown2 = _interopRequireDefault(_DropDown);

var _LinkItem = __webpack_require__(6);

var _LinkItem2 = _interopRequireDefault(_LinkItem);

var _Links = __webpack_require__(3);

var _Links2 = _interopRequireDefault(_Links);

var _ScrollHoc = __webpack_require__(5);

var _ScrollHoc2 = _interopRequireDefault(_ScrollHoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Search = function Search(props) {
    var doSearch = function doSearch(e) {
        if (e.keyCode == 13) {
            if (e.target.value.length > 0) {
                props.actions.fetchItems({
                    stateKey: "mainNav",
                    q: e.target.value,
                    tab_id: "search"
                });
            }
        }
    };
    return (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
            "div",
            { "class": "footer" },
            (0, _hyperapp.h)(
                "div",
                { "class": "pull-left" },
                "Search:"
            ),
            (0, _hyperapp.h)(
                "div",
                { "class": "pull-left" },
                (0, _hyperapp.h)("input", {
                    type: "text",
                    "class": "search-box",
                    placeholder: "Search links, titles, hastags, users...almost everything",
                    value: props.state.mainNav.tabs.search.q,
                    onkeypress: doSearch,
                    oncreate: function oncreate(e) {
                        return e.focus();
                    }
                })
            ),
            (0, _hyperapp.h)("span", { "class": "clearfix" })
        ),
        (0, _hyperapp.h)(_Links2.default, {
            model: "mainNav.tabs.search",
            tab: props.tab,
            actions: props.actions,
            loadMore: props.actions.loadMore,
            onScroll: props.onScroll,
            state: props.state
        })
    );
};
exports.default = (0, _ScrollHoc2.default)(Search);

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

var _Links = __webpack_require__(3);

var _Links2 = _interopRequireDefault(_Links);

var _ModalHoc = __webpack_require__(8);

var _ModalHoc2 = _interopRequireDefault(_ModalHoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var P = function P(_ref) {
    var state = _ref.state,
        actions = _ref.actions,
        onScroll = _ref.onScroll,
        loadMore = _ref.loadMore;

    return (0, _hyperapp.h)(
        "div",
        { model: "modals.profile.links", "class": "row" },
        (0, _hyperapp.h)(
            "div",
            { "class": "col-sm-3" },
            (0, _hyperapp.h)(
                "div",
                { "class": "user-groups-list" },
                (0, _hyperapp.h)(
                    "h5",
                    { "class": "group-title" },
                    "Groups"
                ),
                (0, _hyperapp.h)("div", { "class": "groups-wrapper" })
            )
        ),
        (0, _hyperapp.h)(
            "div",
            { "class": "col-sm-9" },
            (0, _hyperapp.h)(_Links2.default, {
                model: "modals.profile.links",
                tab: state.modals.profile.links,
                onScroll: actions.onScroll,
                state: state,
                loadMore: function loadMore(e) {
                    return actions.getUserLinks({
                        e: e,
                        user_id: state.modals.profile.user.id
                    });
                },
                actions: actions
            })
        )
    );
};

exports.default = (0, _ModalHoc2.default)(P);

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hyperapp = __webpack_require__(1);

var _ModalHoc = __webpack_require__(8);

var _ModalHoc2 = _interopRequireDefault(_ModalHoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InviteModal = function InviteModal(_ref) {
    var state = _ref.state,
        actions = _ref.actions,
        onScroll = _ref.onScroll,
        loadMore = _ref.loadMore;

    return (0, _hyperapp.h)(
        "div",
        { model: "modals.profile.invite", "class": "row" },
        (0, _hyperapp.h)(
            "div",
            { "class": "col-xs-6" },
            (0, _hyperapp.h)(
                "h6",
                null,
                "# Send Invites"
            ),
            (0, _hyperapp.h)("input", {
                type: "text",
                id: "tags-input-send-invites",
                "class": "form-control",
                oncreate: function oncreate(e) {
                    e.focus();
                }
            })
        ),
        (0, _hyperapp.h)(
            "div",
            { "class": "col-xs-6" },
            (0, _hyperapp.h)(
                "h6",
                null,
                "# Edit Pending Invites"
            ),
            (0, _hyperapp.h)(
                "div",
                { id: "sent-invites", "class": "scroll" },
                state.modals.invite.data.invites.map(function (user, index) {
                    return (0, _hyperapp.h)(
                        "div",
                        { "class": "invite" },
                        (0, _hyperapp.h)(
                            "span",
                            { style: { color: user.color } },
                            user.nickname
                        ),
                        (0, _hyperapp.h)(
                            "span",
                            null,
                            (0, _hyperapp.h)(
                                "a",
                                {
                                    "class": "withdraw-invite",
                                    href: "#",
                                    onclick: function onclick(e) {
                                        return actions.withdrawInvite({
                                            e: e,
                                            index: index,
                                            invite_id: user.invite_id
                                        });
                                    }
                                },
                                "Withdraw"
                            )
                        )
                    );
                })
            )
        ),
        (0, _hyperapp.h)(
            "div",
            { "class": "col-xs-12" },
            (0, _hyperapp.h)(
                "div",
                { "class": "modal-footer" },
                (0, _hyperapp.h)(
                    "button",
                    {
                        type: "button",
                        onclick: actions.sendInvites,
                        "class": "btn btn-default btn-xs"
                    },
                    "Send Invites"
                ),
                (0, _hyperapp.h)(
                    "button",
                    {
                        type: "button",
                        "class": "btn btn-default btn-xs",
                        "data-dismiss": "modal"
                    },
                    "Cancel"
                )
            )
        )
    );
};

exports.default = (0, _ModalHoc2.default)(InviteModal);

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 13,
	"./af.js": 13,
	"./ar": 14,
	"./ar-dz": 15,
	"./ar-dz.js": 15,
	"./ar-kw": 16,
	"./ar-kw.js": 16,
	"./ar-ly": 17,
	"./ar-ly.js": 17,
	"./ar-ma": 18,
	"./ar-ma.js": 18,
	"./ar-sa": 19,
	"./ar-sa.js": 19,
	"./ar-tn": 20,
	"./ar-tn.js": 20,
	"./ar.js": 14,
	"./az": 21,
	"./az.js": 21,
	"./be": 22,
	"./be.js": 22,
	"./bg": 23,
	"./bg.js": 23,
	"./bn": 24,
	"./bn.js": 24,
	"./bo": 25,
	"./bo.js": 25,
	"./br": 26,
	"./br.js": 26,
	"./bs": 27,
	"./bs.js": 27,
	"./ca": 28,
	"./ca.js": 28,
	"./cs": 29,
	"./cs.js": 29,
	"./cv": 30,
	"./cv.js": 30,
	"./cy": 31,
	"./cy.js": 31,
	"./da": 32,
	"./da.js": 32,
	"./de": 33,
	"./de-at": 34,
	"./de-at.js": 34,
	"./de-ch": 35,
	"./de-ch.js": 35,
	"./de.js": 33,
	"./dv": 36,
	"./dv.js": 36,
	"./el": 37,
	"./el.js": 37,
	"./en-au": 38,
	"./en-au.js": 38,
	"./en-ca": 39,
	"./en-ca.js": 39,
	"./en-gb": 40,
	"./en-gb.js": 40,
	"./en-ie": 41,
	"./en-ie.js": 41,
	"./en-nz": 42,
	"./en-nz.js": 42,
	"./eo": 43,
	"./eo.js": 43,
	"./es": 44,
	"./es-do": 45,
	"./es-do.js": 45,
	"./es.js": 44,
	"./et": 46,
	"./et.js": 46,
	"./eu": 47,
	"./eu.js": 47,
	"./fa": 48,
	"./fa.js": 48,
	"./fi": 49,
	"./fi.js": 49,
	"./fo": 50,
	"./fo.js": 50,
	"./fr": 51,
	"./fr-ca": 52,
	"./fr-ca.js": 52,
	"./fr-ch": 53,
	"./fr-ch.js": 53,
	"./fr.js": 51,
	"./fy": 54,
	"./fy.js": 54,
	"./gd": 55,
	"./gd.js": 55,
	"./gl": 56,
	"./gl.js": 56,
	"./gom-latn": 57,
	"./gom-latn.js": 57,
	"./he": 58,
	"./he.js": 58,
	"./hi": 59,
	"./hi.js": 59,
	"./hr": 60,
	"./hr.js": 60,
	"./hu": 61,
	"./hu.js": 61,
	"./hy-am": 62,
	"./hy-am.js": 62,
	"./id": 63,
	"./id.js": 63,
	"./is": 64,
	"./is.js": 64,
	"./it": 65,
	"./it.js": 65,
	"./ja": 66,
	"./ja.js": 66,
	"./jv": 67,
	"./jv.js": 67,
	"./ka": 68,
	"./ka.js": 68,
	"./kk": 69,
	"./kk.js": 69,
	"./km": 70,
	"./km.js": 70,
	"./kn": 71,
	"./kn.js": 71,
	"./ko": 72,
	"./ko.js": 72,
	"./ky": 73,
	"./ky.js": 73,
	"./lb": 74,
	"./lb.js": 74,
	"./lo": 75,
	"./lo.js": 75,
	"./lt": 76,
	"./lt.js": 76,
	"./lv": 77,
	"./lv.js": 77,
	"./me": 78,
	"./me.js": 78,
	"./mi": 79,
	"./mi.js": 79,
	"./mk": 80,
	"./mk.js": 80,
	"./ml": 81,
	"./ml.js": 81,
	"./mr": 82,
	"./mr.js": 82,
	"./ms": 83,
	"./ms-my": 84,
	"./ms-my.js": 84,
	"./ms.js": 83,
	"./my": 85,
	"./my.js": 85,
	"./nb": 86,
	"./nb.js": 86,
	"./ne": 87,
	"./ne.js": 87,
	"./nl": 88,
	"./nl-be": 89,
	"./nl-be.js": 89,
	"./nl.js": 88,
	"./nn": 90,
	"./nn.js": 90,
	"./pa-in": 91,
	"./pa-in.js": 91,
	"./pl": 92,
	"./pl.js": 92,
	"./pt": 93,
	"./pt-br": 94,
	"./pt-br.js": 94,
	"./pt.js": 93,
	"./ro": 95,
	"./ro.js": 95,
	"./ru": 96,
	"./ru.js": 96,
	"./sd": 97,
	"./sd.js": 97,
	"./se": 98,
	"./se.js": 98,
	"./si": 99,
	"./si.js": 99,
	"./sk": 100,
	"./sk.js": 100,
	"./sl": 101,
	"./sl.js": 101,
	"./sq": 102,
	"./sq.js": 102,
	"./sr": 103,
	"./sr-cyrl": 104,
	"./sr-cyrl.js": 104,
	"./sr.js": 103,
	"./ss": 105,
	"./ss.js": 105,
	"./sv": 106,
	"./sv.js": 106,
	"./sw": 107,
	"./sw.js": 107,
	"./ta": 108,
	"./ta.js": 108,
	"./te": 109,
	"./te.js": 109,
	"./tet": 110,
	"./tet.js": 110,
	"./th": 111,
	"./th.js": 111,
	"./tl-ph": 112,
	"./tl-ph.js": 112,
	"./tlh": 113,
	"./tlh.js": 113,
	"./tr": 114,
	"./tr.js": 114,
	"./tzl": 115,
	"./tzl.js": 115,
	"./tzm": 116,
	"./tzm-latn": 117,
	"./tzm-latn.js": 117,
	"./tzm.js": 116,
	"./uk": 118,
	"./uk.js": 118,
	"./ur": 119,
	"./ur.js": 119,
	"./uz": 120,
	"./uz-latn": 121,
	"./uz-latn.js": 121,
	"./uz.js": 120,
	"./vi": 122,
	"./vi.js": 122,
	"./x-pseudo": 123,
	"./x-pseudo.js": 123,
	"./yo": 124,
	"./yo.js": 124,
	"./zh-cn": 125,
	"./zh-cn.js": 125,
	"./zh-hk": 126,
	"./zh-hk.js": 126,
	"./zh-tw": 127,
	"./zh-tw.js": 127
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 164;

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! jQuery v@1.8.1 jquery.com | jquery.org/license */
(function (a, b) {
  function G(a) {
    var b = F[a] = {};return p.each(a.split(s), function (a, c) {
      b[c] = !0;
    }), b;
  }function J(a, c, d) {
    if (d === b && a.nodeType === 1) {
      var e = "data-" + c.replace(I, "-$1").toLowerCase();d = a.getAttribute(e);if (typeof d == "string") {
        try {
          d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : +d + "" === d ? +d : H.test(d) ? p.parseJSON(d) : d;
        } catch (f) {}p.data(a, c, d);
      } else d = b;
    }return d;
  }function K(a) {
    var b;for (b in a) {
      if (b === "data" && p.isEmptyObject(a[b])) continue;if (b !== "toJSON") return !1;
    }return !0;
  }function ba() {
    return !1;
  }function bb() {
    return !0;
  }function bh(a) {
    return !a || !a.parentNode || a.parentNode.nodeType === 11;
  }function bi(a, b) {
    do {
      a = a[b];
    } while (a && a.nodeType !== 1);return a;
  }function bj(a, b, c) {
    b = b || 0;if (p.isFunction(b)) return p.grep(a, function (a, d) {
      var e = !!b.call(a, d, a);return e === c;
    });if (b.nodeType) return p.grep(a, function (a, d) {
      return a === b === c;
    });if (typeof b == "string") {
      var d = p.grep(a, function (a) {
        return a.nodeType === 1;
      });if (be.test(b)) return p.filter(b, d, !c);b = p.filter(b, d);
    }return p.grep(a, function (a, d) {
      return p.inArray(a, b) >= 0 === c;
    });
  }function bk(a) {
    var b = bl.split("|"),
        c = a.createDocumentFragment();if (c.createElement) while (b.length) {
      c.createElement(b.pop());
    }return c;
  }function bC(a, b) {
    return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b));
  }function bD(a, b) {
    if (b.nodeType !== 1 || !p.hasData(a)) return;var c,
        d,
        e,
        f = p._data(a),
        g = p._data(b, f),
        h = f.events;if (h) {
      delete g.handle, g.events = {};for (c in h) {
        for (d = 0, e = h[c].length; d < e; d++) {
          p.event.add(b, c, h[c][d]);
        }
      }
    }g.data && (g.data = p.extend({}, g.data));
  }function bE(a, b) {
    var c;if (b.nodeType !== 1) return;b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? (b.parentNode && (b.outerHTML = a.outerHTML), p.support.html5Clone && a.innerHTML && !p.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : c === "input" && bv.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text), b.removeAttribute(p.expando);
  }function bF(a) {
    return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : [];
  }function bG(a) {
    bv.test(a.type) && (a.defaultChecked = a.checked);
  }function bY(a, b) {
    if (b in a) return b;var c = b.charAt(0).toUpperCase() + b.slice(1),
        d = b,
        e = bW.length;while (e--) {
      b = bW[e] + c;if (b in a) return b;
    }return d;
  }function bZ(a, b) {
    return a = b || a, p.css(a, "display") === "none" || !p.contains(a.ownerDocument, a);
  }function b$(a, b) {
    var c,
        d,
        e = [],
        f = 0,
        g = a.length;for (; f < g; f++) {
      c = a[f];if (!c.style) continue;e[f] = p._data(c, "olddisplay"), b ? (!e[f] && c.style.display === "none" && (c.style.display = ""), c.style.display === "" && bZ(c) && (e[f] = p._data(c, "olddisplay", cc(c.nodeName)))) : (d = bH(c, "display"), !e[f] && d !== "none" && p._data(c, "olddisplay", d));
    }for (f = 0; f < g; f++) {
      c = a[f];if (!c.style) continue;if (!b || c.style.display === "none" || c.style.display === "") c.style.display = b ? e[f] || "" : "none";
    }return a;
  }function b_(a, b, c) {
    var d = bP.exec(b);return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
  }function ca(a, b, c, d) {
    var e = c === (d ? "border" : "content") ? 4 : b === "width" ? 1 : 0,
        f = 0;for (; e < 4; e += 2) {
      c === "margin" && (f += p.css(a, c + bV[e], !0)), d ? (c === "content" && (f -= parseFloat(bH(a, "padding" + bV[e])) || 0), c !== "margin" && (f -= parseFloat(bH(a, "border" + bV[e] + "Width")) || 0)) : (f += parseFloat(bH(a, "padding" + bV[e])) || 0, c !== "padding" && (f += parseFloat(bH(a, "border" + bV[e] + "Width")) || 0));
    }return f;
  }function cb(a, b, c) {
    var d = b === "width" ? a.offsetWidth : a.offsetHeight,
        e = !0,
        f = p.support.boxSizing && p.css(a, "boxSizing") === "border-box";if (d <= 0 || d == null) {
      d = bH(a, b);if (d < 0 || d == null) d = a.style[b];if (bQ.test(d)) return d;e = f && (p.support.boxSizingReliable || d === a.style[b]), d = parseFloat(d) || 0;
    }return d + ca(a, b, c || (f ? "border" : "content"), e) + "px";
  }function cc(a) {
    if (bS[a]) return bS[a];var b = p("<" + a + ">").appendTo(e.body),
        c = b.css("display");b.remove();if (c === "none" || c === "") {
      bI = e.body.appendChild(bI || p.extend(e.createElement("iframe"), { frameBorder: 0, width: 0, height: 0 }));if (!bJ || !bI.createElement) bJ = (bI.contentWindow || bI.contentDocument).document, bJ.write("<!doctype html><html><body>"), bJ.close();b = bJ.body.appendChild(bJ.createElement(a)), c = bH(b, "display"), e.body.removeChild(bI);
    }return bS[a] = c, c;
  }function ci(a, b, c, d) {
    var e;if (p.isArray(b)) p.each(b, function (b, e) {
      c || ce.test(a) ? d(a, e) : ci(a + "[" + ((typeof e === "undefined" ? "undefined" : _typeof(e)) == "object" ? b : "") + "]", e, c, d);
    });else if (!c && p.type(b) === "object") for (e in b) {
      ci(a + "[" + e + "]", b[e], c, d);
    } else d(a, b);
  }function cz(a) {
    return function (b, c) {
      typeof b != "string" && (c = b, b = "*");var d,
          e,
          f,
          g = b.toLowerCase().split(s),
          h = 0,
          i = g.length;if (p.isFunction(c)) for (; h < i; h++) {
        d = g[h], f = /^\+/.test(d), f && (d = d.substr(1) || "*"), e = a[d] = a[d] || [], e[f ? "unshift" : "push"](c);
      }
    };
  }function cA(a, c, d, e, f, g) {
    f = f || c.dataTypes[0], g = g || {}, g[f] = !0;var h,
        i = a[f],
        j = 0,
        k = i ? i.length : 0,
        l = a === cv;for (; j < k && (l || !h); j++) {
      h = i[j](c, d, e), typeof h == "string" && (!l || g[h] ? h = b : (c.dataTypes.unshift(h), h = cA(a, c, d, e, h, g)));
    }return (l || !h) && !g["*"] && (h = cA(a, c, d, e, "*", g)), h;
  }function cB(a, c) {
    var d,
        e,
        f = p.ajaxSettings.flatOptions || {};for (d in c) {
      c[d] !== b && ((f[d] ? a : e || (e = {}))[d] = c[d]);
    }e && p.extend(!0, a, e);
  }function cC(a, c, d) {
    var e,
        f,
        g,
        h,
        i = a.contents,
        j = a.dataTypes,
        k = a.responseFields;for (f in k) {
      f in d && (c[k[f]] = d[f]);
    }while (j[0] === "*") {
      j.shift(), e === b && (e = a.mimeType || c.getResponseHeader("content-type"));
    }if (e) for (f in i) {
      if (i[f] && i[f].test(e)) {
        j.unshift(f);break;
      }
    }if (j[0] in d) g = j[0];else {
      for (f in d) {
        if (!j[0] || a.converters[f + " " + j[0]]) {
          g = f;break;
        }h || (h = f);
      }g = g || h;
    }if (g) return g !== j[0] && j.unshift(g), d[g];
  }function cD(a, b) {
    var c,
        d,
        e,
        f,
        g = a.dataTypes.slice(),
        h = g[0],
        i = {},
        j = 0;a.dataFilter && (b = a.dataFilter(b, a.dataType));if (g[1]) for (c in a.converters) {
      i[c.toLowerCase()] = a.converters[c];
    }for (; e = g[++j];) {
      if (e !== "*") {
        if (h !== "*" && h !== e) {
          c = i[h + " " + e] || i["* " + e];if (!c) for (d in i) {
            f = d.split(" ");if (f[1] === e) {
              c = i[h + " " + f[0]] || i["* " + f[0]];if (c) {
                c === !0 ? c = i[d] : i[d] !== !0 && (e = f[0], g.splice(j--, 0, e));break;
              }
            }
          }if (c !== !0) if (c && a["throws"]) b = c(b);else try {
            b = c(b);
          } catch (k) {
            return { state: "parsererror", error: c ? k : "No conversion from " + h + " to " + e };
          }
        }h = e;
      }
    }return { state: "success", data: b };
  }function cL() {
    try {
      return new a.XMLHttpRequest();
    } catch (b) {}
  }function cM() {
    try {
      return new a.ActiveXObject("Microsoft.XMLHTTP");
    } catch (b) {}
  }function cU() {
    return setTimeout(function () {
      cN = b;
    }, 0), cN = p.now();
  }function cV(a, b) {
    p.each(b, function (b, c) {
      var d = (cT[b] || []).concat(cT["*"]),
          e = 0,
          f = d.length;for (; e < f; e++) {
        if (d[e].call(a, b, c)) return;
      }
    });
  }function cW(a, b, c) {
    var d,
        e = 0,
        f = 0,
        g = cS.length,
        h = p.Deferred().always(function () {
      delete i.elem;
    }),
        i = function i() {
      var b = cN || cU(),
          c = Math.max(0, j.startTime + j.duration - b),
          d = 1 - (c / j.duration || 0),
          e = 0,
          f = j.tweens.length;for (; e < f; e++) {
        j.tweens[e].run(d);
      }return h.notifyWith(a, [j, d, c]), d < 1 && f ? c : (h.resolveWith(a, [j]), !1);
    },
        j = h.promise({ elem: a, props: p.extend({}, b), opts: p.extend(!0, { specialEasing: {} }, c), originalProperties: b, originalOptions: c, startTime: cN || cU(), duration: c.duration, tweens: [], createTween: function createTween(b, c, d) {
        var e = p.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);return j.tweens.push(e), e;
      }, stop: function stop(b) {
        var c = 0,
            d = b ? j.tweens.length : 0;for (; c < d; c++) {
          j.tweens[c].run(1);
        }return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this;
      } }),
        k = j.props;cX(k, j.opts.specialEasing);for (; e < g; e++) {
      d = cS[e].call(j, a, k, j.opts);if (d) return d;
    }return cV(j, k), p.isFunction(j.opts.start) && j.opts.start.call(a, j), p.fx.timer(p.extend(i, { anim: j, queue: j.opts.queue, elem: a })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
  }function cX(a, b) {
    var c, d, e, f, g;for (c in a) {
      d = p.camelCase(c), e = b[d], f = a[c], p.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = p.cssHooks[d];if (g && "expand" in g) {
        f = g.expand(f), delete a[d];for (c in f) {
          c in a || (a[c] = f[c], b[c] = e);
        }
      } else b[d] = e;
    }
  }function cY(a, b, c) {
    var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l = this,
        m = a.style,
        n = {},
        o = [],
        q = a.nodeType && bZ(a);c.queue || (j = p._queueHooks(a, "fx"), j.unqueued == null && (j.unqueued = 0, k = j.empty.fire, j.empty.fire = function () {
      j.unqueued || k();
    }), j.unqueued++, l.always(function () {
      l.always(function () {
        j.unqueued--, p.queue(a, "fx").length || j.empty.fire();
      });
    })), a.nodeType === 1 && ("height" in b || "width" in b) && (c.overflow = [m.overflow, m.overflowX, m.overflowY], p.css(a, "display") === "inline" && p.css(a, "float") === "none" && (!p.support.inlineBlockNeedsLayout || cc(a.nodeName) === "inline" ? m.display = "inline-block" : m.zoom = 1)), c.overflow && (m.overflow = "hidden", p.support.shrinkWrapBlocks || l.done(function () {
      m.overflow = c.overflow[0], m.overflowX = c.overflow[1], m.overflowY = c.overflow[2];
    }));for (d in b) {
      f = b[d];if (cP.exec(f)) {
        delete b[d];if (f === (q ? "hide" : "show")) continue;o.push(d);
      }
    }g = o.length;if (g) {
      h = p._data(a, "fxshow") || p._data(a, "fxshow", {}), q ? p(a).show() : l.done(function () {
        p(a).hide();
      }), l.done(function () {
        var b;p.removeData(a, "fxshow", !0);for (b in n) {
          p.style(a, b, n[b]);
        }
      });for (d = 0; d < g; d++) {
        e = o[d], i = l.createTween(e, q ? h[e] : 0), n[e] = h[e] || p.style(a, e), e in h || (h[e] = i.start, q && (i.end = i.start, i.start = e === "width" || e === "height" ? 1 : 0));
      }
    }
  }function cZ(a, b, c, d, e) {
    return new cZ.prototype.init(a, b, c, d, e);
  }function c$(a, b) {
    var c,
        d = { height: a },
        e = 0;b = b ? 1 : 0;for (; e < 4; e += 2 - b) {
      c = bV[e], d["margin" + c] = d["padding" + c] = a;
    }return b && (d.opacity = d.width = a), d;
  }function da(a) {
    return p.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1;
  }var c,
      d,
      e = a.document,
      f = a.location,
      g = a.navigator,
      h = a.jQuery,
      i = a.$,
      j = Array.prototype.push,
      k = Array.prototype.slice,
      l = Array.prototype.indexOf,
      m = Object.prototype.toString,
      n = Object.prototype.hasOwnProperty,
      o = String.prototype.trim,
      p = function p(a, b) {
    return new p.fn.init(a, b, c);
  },
      q = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
      r = /\S/,
      s = /\s+/,
      t = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      u = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
      v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      w = /^[\],:{}\s]*$/,
      x = /(?:^|:|,)(?:\s*\[)+/g,
      y = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
      z = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
      A = /^-ms-/,
      B = /-([\da-z])/gi,
      C = function C(a, b) {
    return (b + "").toUpperCase();
  },
      D = function D() {
    e.addEventListener ? (e.removeEventListener("DOMContentLoaded", D, !1), p.ready()) : e.readyState === "complete" && (e.detachEvent("onreadystatechange", D), p.ready());
  },
      E = {};p.fn = p.prototype = { constructor: p, init: function init(a, c, d) {
      var f, g, h, i;if (!a) return this;if (a.nodeType) return this.context = this[0] = a, this.length = 1, this;if (typeof a == "string") {
        a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? f = [null, a, null] : f = u.exec(a);if (f && (f[1] || !c)) {
          if (f[1]) return c = c instanceof p ? c[0] : c, i = c && c.nodeType ? c.ownerDocument || c : e, a = p.parseHTML(f[1], i, !0), v.test(f[1]) && p.isPlainObject(c) && this.attr.call(a, c, !0), p.merge(this, a);g = e.getElementById(f[2]);if (g && g.parentNode) {
            if (g.id !== f[2]) return d.find(a);this.length = 1, this[0] = g;
          }return this.context = e, this.selector = a, this;
        }return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a);
      }return p.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), p.makeArray(a, this));
    }, selector: "", jquery: "1.8.1", length: 0, size: function size() {
      return this.length;
    }, toArray: function toArray() {
      return k.call(this);
    }, get: function get(a) {
      return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a];
    }, pushStack: function pushStack(a, b, c) {
      var d = p.merge(this.constructor(), a);return d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"), d;
    }, each: function each(a, b) {
      return p.each(this, a, b);
    }, ready: function ready(a) {
      return p.ready.promise().done(a), this;
    }, eq: function eq(a) {
      return a = +a, a === -1 ? this.slice(a) : this.slice(a, a + 1);
    }, first: function first() {
      return this.eq(0);
    }, last: function last() {
      return this.eq(-1);
    }, slice: function slice() {
      return this.pushStack(k.apply(this, arguments), "slice", k.call(arguments).join(","));
    }, map: function map(a) {
      return this.pushStack(p.map(this, function (b, c) {
        return a.call(b, c, b);
      }));
    }, end: function end() {
      return this.prevObject || this.constructor(null);
    }, push: j, sort: [].sort, splice: [].splice }, p.fn.init.prototype = p.fn, p.extend = p.fn.extend = function () {
    var a,
        c,
        d,
        e,
        f,
        g,
        h = arguments[0] || {},
        i = 1,
        j = arguments.length,
        k = !1;typeof h == "boolean" && (k = h, h = arguments[1] || {}, i = 2), (typeof h === "undefined" ? "undefined" : _typeof(h)) != "object" && !p.isFunction(h) && (h = {}), j === i && (h = this, --i);for (; i < j; i++) {
      if ((a = arguments[i]) != null) for (c in a) {
        d = h[c], e = a[c];if (h === e) continue;k && e && (p.isPlainObject(e) || (f = p.isArray(e))) ? (f ? (f = !1, g = d && p.isArray(d) ? d : []) : g = d && p.isPlainObject(d) ? d : {}, h[c] = p.extend(k, g, e)) : e !== b && (h[c] = e);
      }
    }return h;
  }, p.extend({ noConflict: function noConflict(b) {
      return a.$ === p && (a.$ = i), b && a.jQuery === p && (a.jQuery = h), p;
    }, isReady: !1, readyWait: 1, holdReady: function holdReady(a) {
      a ? p.readyWait++ : p.ready(!0);
    }, ready: function ready(a) {
      if (a === !0 ? --p.readyWait : p.isReady) return;if (!e.body) return setTimeout(p.ready, 1);p.isReady = !0;if (a !== !0 && --p.readyWait > 0) return;d.resolveWith(e, [p]), p.fn.trigger && p(e).trigger("ready").off("ready");
    }, isFunction: function isFunction(a) {
      return p.type(a) === "function";
    }, isArray: Array.isArray || function (a) {
      return p.type(a) === "array";
    }, isWindow: function isWindow(a) {
      return a != null && a == a.window;
    }, isNumeric: function isNumeric(a) {
      return !isNaN(parseFloat(a)) && isFinite(a);
    }, type: function type(a) {
      return a == null ? String(a) : E[m.call(a)] || "object";
    }, isPlainObject: function isPlainObject(a) {
      if (!a || p.type(a) !== "object" || a.nodeType || p.isWindow(a)) return !1;try {
        if (a.constructor && !n.call(a, "constructor") && !n.call(a.constructor.prototype, "isPrototypeOf")) return !1;
      } catch (c) {
        return !1;
      }var d;for (d in a) {}return d === b || n.call(a, d);
    }, isEmptyObject: function isEmptyObject(a) {
      var b;for (b in a) {
        return !1;
      }return !0;
    }, error: function error(a) {
      throw new Error(a);
    }, parseHTML: function parseHTML(a, b, c) {
      var d;return !a || typeof a != "string" ? null : (typeof b == "boolean" && (c = b, b = 0), b = b || e, (d = v.exec(a)) ? [b.createElement(d[1])] : (d = p.buildFragment([a], b, c ? null : []), p.merge([], (d.cacheable ? p.clone(d.fragment) : d.fragment).childNodes)));
    }, parseJSON: function parseJSON(b) {
      if (!b || typeof b != "string") return null;b = p.trim(b);if (a.JSON && a.JSON.parse) return a.JSON.parse(b);if (w.test(b.replace(y, "@").replace(z, "]").replace(x, ""))) return new Function("return " + b)();p.error("Invalid JSON: " + b);
    }, parseXML: function parseXML(c) {
      var d, e;if (!c || typeof c != "string") return null;try {
        a.DOMParser ? (e = new DOMParser(), d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c));
      } catch (f) {
        d = b;
      }return (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && p.error("Invalid XML: " + c), d;
    }, noop: function noop() {}, globalEval: function globalEval(b) {
      b && r.test(b) && (a.execScript || function (b) {
        a.eval.call(a, b);
      })(b);
    }, camelCase: function camelCase(a) {
      return a.replace(A, "ms-").replace(B, C);
    }, nodeName: function nodeName(a, b) {
      return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase();
    }, each: function each(a, c, d) {
      var e,
          f = 0,
          g = a.length,
          h = g === b || p.isFunction(a);if (d) {
        if (h) {
          for (e in a) {
            if (c.apply(a[e], d) === !1) break;
          }
        } else for (; f < g;) {
          if (c.apply(a[f++], d) === !1) break;
        }
      } else if (h) {
        for (e in a) {
          if (c.call(a[e], e, a[e]) === !1) break;
        }
      } else for (; f < g;) {
        if (c.call(a[f], f, a[f++]) === !1) break;
      }return a;
    }, trim: o && !o.call("﻿ ") ? function (a) {
      return a == null ? "" : o.call(a);
    } : function (a) {
      return a == null ? "" : a.toString().replace(t, "");
    }, makeArray: function makeArray(a, b) {
      var c,
          d = b || [];return a != null && (c = p.type(a), a.length == null || c === "string" || c === "function" || c === "regexp" || p.isWindow(a) ? j.call(d, a) : p.merge(d, a)), d;
    }, inArray: function inArray(a, b, c) {
      var d;if (b) {
        if (l) return l.call(b, a, c);d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;for (; c < d; c++) {
          if (c in b && b[c] === a) return c;
        }
      }return -1;
    }, merge: function merge(a, c) {
      var d = c.length,
          e = a.length,
          f = 0;if (typeof d == "number") for (; f < d; f++) {
        a[e++] = c[f];
      } else while (c[f] !== b) {
        a[e++] = c[f++];
      }return a.length = e, a;
    }, grep: function grep(a, b, c) {
      var d,
          e = [],
          f = 0,
          g = a.length;c = !!c;for (; f < g; f++) {
        d = !!b(a[f], f), c !== d && e.push(a[f]);
      }return e;
    }, map: function map(a, c, d) {
      var e,
          f,
          g = [],
          h = 0,
          i = a.length,
          j = a instanceof p || i !== b && typeof i == "number" && (i > 0 && a[0] && a[i - 1] || i === 0 || p.isArray(a));if (j) for (; h < i; h++) {
        e = c(a[h], h, d), e != null && (g[g.length] = e);
      } else for (f in a) {
        e = c(a[f], f, d), e != null && (g[g.length] = e);
      }return g.concat.apply([], g);
    }, guid: 1, proxy: function proxy(a, c) {
      var d, e, f;return typeof c == "string" && (d = a[c], c = a, a = d), p.isFunction(a) ? (e = k.call(arguments, 2), f = function f() {
        return a.apply(c, e.concat(k.call(arguments)));
      }, f.guid = a.guid = a.guid || f.guid || p.guid++, f) : b;
    }, access: function access(a, c, d, e, f, g, h) {
      var i,
          j = d == null,
          k = 0,
          l = a.length;if (d && (typeof d === "undefined" ? "undefined" : _typeof(d)) == "object") {
        for (k in d) {
          p.access(a, c, k, d[k], 1, g, e);
        }f = 1;
      } else if (e !== b) {
        i = h === b && p.isFunction(e), j && (i ? (i = c, c = function c(a, b, _c) {
          return i.call(p(a), _c);
        }) : (c.call(a, e), c = null));if (c) for (; k < l; k++) {
          c(a[k], d, i ? e.call(a[k], k, c(a[k], d)) : e, h);
        }f = 1;
      }return f ? a : j ? c.call(a) : l ? c(a[0], d) : g;
    }, now: function now() {
      return new Date().getTime();
    } }), p.ready.promise = function (b) {
    if (!d) {
      d = p.Deferred();if (e.readyState === "complete") setTimeout(p.ready, 1);else if (e.addEventListener) e.addEventListener("DOMContentLoaded", D, !1), a.addEventListener("load", p.ready, !1);else {
        e.attachEvent("onreadystatechange", D), a.attachEvent("onload", p.ready);var c = !1;try {
          c = a.frameElement == null && e.documentElement;
        } catch (f) {}c && c.doScroll && function g() {
          if (!p.isReady) {
            try {
              c.doScroll("left");
            } catch (a) {
              return setTimeout(g, 50);
            }p.ready();
          }
        }();
      }
    }return d.promise(b);
  }, p.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
    E["[object " + b + "]"] = b.toLowerCase();
  }), c = p(e);var F = {};p.Callbacks = function (a) {
    a = typeof a == "string" ? F[a] || G(a) : p.extend({}, a);var c,
        d,
        e,
        f,
        g,
        h,
        i = [],
        j = !a.once && [],
        k = function k(b) {
      c = a.memory && b, d = !0, h = f || 0, f = 0, g = i.length, e = !0;for (; i && h < g; h++) {
        if (i[h].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
          c = !1;break;
        }
      }e = !1, i && (j ? j.length && k(j.shift()) : c ? i = [] : l.disable());
    },
        l = { add: function add() {
        if (i) {
          var b = i.length;(function d(b) {
            p.each(b, function (b, c) {
              var e = p.type(c);e === "function" && (!a.unique || !l.has(c)) ? i.push(c) : c && c.length && e !== "string" && d(c);
            });
          })(arguments), e ? g = i.length : c && (f = b, k(c));
        }return this;
      }, remove: function remove() {
        return i && p.each(arguments, function (a, b) {
          var c;while ((c = p.inArray(b, i, c)) > -1) {
            i.splice(c, 1), e && (c <= g && g--, c <= h && h--);
          }
        }), this;
      }, has: function has(a) {
        return p.inArray(a, i) > -1;
      }, empty: function empty() {
        return i = [], this;
      }, disable: function disable() {
        return i = j = c = b, this;
      }, disabled: function disabled() {
        return !i;
      }, lock: function lock() {
        return j = b, c || l.disable(), this;
      }, locked: function locked() {
        return !j;
      }, fireWith: function fireWith(a, b) {
        return b = b || [], b = [a, b.slice ? b.slice() : b], i && (!d || j) && (e ? j.push(b) : k(b)), this;
      }, fire: function fire() {
        return l.fireWith(this, arguments), this;
      }, fired: function fired() {
        return !!d;
      } };return l;
  }, p.extend({ Deferred: function Deferred(a) {
      var b = [["resolve", "done", p.Callbacks("once memory"), "resolved"], ["reject", "fail", p.Callbacks("once memory"), "rejected"], ["notify", "progress", p.Callbacks("memory")]],
          c = "pending",
          d = { state: function state() {
          return c;
        }, always: function always() {
          return e.done(arguments).fail(arguments), this;
        }, then: function then() {
          var a = arguments;return p.Deferred(function (c) {
            p.each(b, function (b, d) {
              var f = d[0],
                  g = a[b];e[d[1]](p.isFunction(g) ? function () {
                var a = g.apply(this, arguments);a && p.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f + "With"](this === e ? c : this, [a]);
              } : c[f]);
            }), a = null;
          }).promise();
        }, promise: function promise(a) {
          return (typeof a === "undefined" ? "undefined" : _typeof(a)) == "object" ? p.extend(a, d) : d;
        } },
          e = {};return d.pipe = d.then, p.each(b, function (a, f) {
        var g = f[2],
            h = f[3];d[f[1]] = g.add, h && g.add(function () {
          c = h;
        }, b[a ^ 1][2].disable, b[2][2].lock), e[f[0]] = g.fire, e[f[0] + "With"] = g.fireWith;
      }), d.promise(e), a && a.call(e, e), e;
    }, when: function when(a) {
      var b = 0,
          c = k.call(arguments),
          d = c.length,
          e = d !== 1 || a && p.isFunction(a.promise) ? d : 0,
          f = e === 1 ? a : p.Deferred(),
          g = function g(a, b, c) {
        return function (d) {
          b[a] = this, c[a] = arguments.length > 1 ? k.call(arguments) : d, c === h ? f.notifyWith(b, c) : --e || f.resolveWith(b, c);
        };
      },
          h,
          i,
          j;if (d > 1) {
        h = new Array(d), i = new Array(d), j = new Array(d);for (; b < d; b++) {
          c[b] && p.isFunction(c[b].promise) ? c[b].promise().done(g(b, j, c)).fail(f.reject).progress(g(b, i, h)) : --e;
        }
      }return e || f.resolveWith(j, c), f.promise();
    } }), p.support = function () {
    var b,
        c,
        d,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n = e.createElement("div");n.setAttribute("className", "t"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c = n.getElementsByTagName("*"), d = n.getElementsByTagName("a")[0], d.style.cssText = "top:1px;float:left;opacity:.5";if (!c || !c.length || !d) return {};f = e.createElement("select"), g = f.appendChild(e.createElement("option")), h = n.getElementsByTagName("input")[0], b = { leadingWhitespace: n.firstChild.nodeType === 3, tbody: !n.getElementsByTagName("tbody").length, htmlSerialize: !!n.getElementsByTagName("link").length, style: /top/.test(d.getAttribute("style")), hrefNormalized: d.getAttribute("href") === "/a", opacity: /^0.5/.test(d.style.opacity), cssFloat: !!d.style.cssFloat, checkOn: h.value === "on", optSelected: g.selected, getSetAttribute: n.className !== "t", enctype: !!e.createElement("form").enctype, html5Clone: e.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>", boxModel: e.compatMode === "CSS1Compat", submitBubbles: !0, changeBubbles: !0, focusinBubbles: !1, deleteExpando: !0, noCloneEvent: !0, inlineBlockNeedsLayout: !1, shrinkWrapBlocks: !1, reliableMarginRight: !0, boxSizingReliable: !0, pixelPosition: !1 }, h.checked = !0, b.noCloneChecked = h.cloneNode(!0).checked, f.disabled = !0, b.optDisabled = !g.disabled;try {
      delete n.test;
    } catch (o) {
      b.deleteExpando = !1;
    }!n.addEventListener && n.attachEvent && n.fireEvent && (n.attachEvent("onclick", m = function m() {
      b.noCloneEvent = !1;
    }), n.cloneNode(!0).fireEvent("onclick"), n.detachEvent("onclick", m)), h = e.createElement("input"), h.value = "t", h.setAttribute("type", "radio"), b.radioValue = h.value === "t", h.setAttribute("checked", "checked"), h.setAttribute("name", "t"), n.appendChild(h), i = e.createDocumentFragment(), i.appendChild(n.lastChild), b.checkClone = i.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = h.checked, i.removeChild(h), i.appendChild(n);if (n.attachEvent) for (k in { submit: !0, change: !0, focusin: !0 }) {
      j = "on" + k, l = j in n, l || (n.setAttribute(j, "return;"), l = typeof n[j] == "function"), b[k + "Bubbles"] = l;
    }return p(function () {
      var c,
          d,
          f,
          g,
          h = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
          i = e.getElementsByTagName("body")[0];if (!i) return;c = e.createElement("div"), c.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", i.insertBefore(c, i.firstChild), d = e.createElement("div"), c.appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", f = d.getElementsByTagName("td"), f[0].style.cssText = "padding:0;margin:0;border:0;display:none", l = f[0].offsetHeight === 0, f[0].style.display = "", f[1].style.display = "none", b.reliableHiddenOffsets = l && f[0].offsetHeight === 0, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", b.boxSizing = d.offsetWidth === 4, b.doesNotIncludeMarginInBodyOffset = i.offsetTop !== 1, a.getComputedStyle && (b.pixelPosition = (a.getComputedStyle(d, null) || {}).top !== "1%", b.boxSizingReliable = (a.getComputedStyle(d, null) || { width: "4px" }).width === "4px", g = e.createElement("div"), g.style.cssText = d.style.cssText = h, g.style.marginRight = g.style.width = "0", d.style.width = "1px", d.appendChild(g), b.reliableMarginRight = !parseFloat((a.getComputedStyle(g, null) || {}).marginRight)), typeof d.style.zoom != "undefined" && (d.innerHTML = "", d.style.cssText = h + "width:1px;padding:1px;display:inline;zoom:1", b.inlineBlockNeedsLayout = d.offsetWidth === 3, d.style.display = "block", d.style.overflow = "visible", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", b.shrinkWrapBlocks = d.offsetWidth !== 3, c.style.zoom = 1), i.removeChild(c), c = d = f = g = null;
    }), i.removeChild(n), c = d = f = g = h = i = n = null, b;
  }();var H = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
      I = /([A-Z])/g;p.extend({ cache: {}, deletedIds: [], uuid: 0, expando: "jQuery" + (p.fn.jquery + Math.random()).replace(/\D/g, ""), noData: { embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0 }, hasData: function hasData(a) {
      return a = a.nodeType ? p.cache[a[p.expando]] : a[p.expando], !!a && !K(a);
    }, data: function data(a, c, d, e) {
      if (!p.acceptData(a)) return;var f,
          g,
          h = p.expando,
          i = typeof c == "string",
          j = a.nodeType,
          k = j ? p.cache : a,
          l = j ? a[h] : a[h] && h;if ((!l || !k[l] || !e && !k[l].data) && i && d === b) return;l || (j ? a[h] = l = p.deletedIds.pop() || ++p.uuid : l = h), k[l] || (k[l] = {}, j || (k[l].toJSON = p.noop));if ((typeof c === "undefined" ? "undefined" : _typeof(c)) == "object" || typeof c == "function") e ? k[l] = p.extend(k[l], c) : k[l].data = p.extend(k[l].data, c);return f = k[l], e || (f.data || (f.data = {}), f = f.data), d !== b && (f[p.camelCase(c)] = d), i ? (g = f[c], g == null && (g = f[p.camelCase(c)])) : g = f, g;
    }, removeData: function removeData(a, b, c) {
      if (!p.acceptData(a)) return;var d,
          e,
          f,
          g = a.nodeType,
          h = g ? p.cache : a,
          i = g ? a[p.expando] : p.expando;if (!h[i]) return;if (b) {
        d = c ? h[i] : h[i].data;if (d) {
          p.isArray(b) || (b in d ? b = [b] : (b = p.camelCase(b), b in d ? b = [b] : b = b.split(" ")));for (e = 0, f = b.length; e < f; e++) {
            delete d[b[e]];
          }if (!(c ? K : p.isEmptyObject)(d)) return;
        }
      }if (!c) {
        delete h[i].data;if (!K(h[i])) return;
      }g ? p.cleanData([a], !0) : p.support.deleteExpando || h != h.window ? delete h[i] : h[i] = null;
    }, _data: function _data(a, b, c) {
      return p.data(a, b, c, !0);
    }, acceptData: function acceptData(a) {
      var b = a.nodeName && p.noData[a.nodeName.toLowerCase()];return !b || b !== !0 && a.getAttribute("classid") === b;
    } }), p.fn.extend({ data: function data(a, c) {
      var d,
          e,
          f,
          g,
          h,
          i = this[0],
          j = 0,
          k = null;if (a === b) {
        if (this.length) {
          k = p.data(i);if (i.nodeType === 1 && !p._data(i, "parsedAttrs")) {
            f = i.attributes;for (h = f.length; j < h; j++) {
              g = f[j].name, g.indexOf("data-") === 0 && (g = p.camelCase(g.substring(5)), J(i, g, k[g]));
            }p._data(i, "parsedAttrs", !0);
          }
        }return k;
      }return (typeof a === "undefined" ? "undefined" : _typeof(a)) == "object" ? this.each(function () {
        p.data(this, a);
      }) : (d = a.split(".", 2), d[1] = d[1] ? "." + d[1] : "", e = d[1] + "!", p.access(this, function (c) {
        if (c === b) return k = this.triggerHandler("getData" + e, [d[0]]), k === b && i && (k = p.data(i, a), k = J(i, a, k)), k === b && d[1] ? this.data(d[0]) : k;d[1] = c, this.each(function () {
          var b = p(this);b.triggerHandler("setData" + e, d), p.data(this, a, c), b.triggerHandler("changeData" + e, d);
        });
      }, null, c, arguments.length > 1, null, !1));
    }, removeData: function removeData(a) {
      return this.each(function () {
        p.removeData(this, a);
      });
    } }), p.extend({ queue: function queue(a, b, c) {
      var d;if (a) return b = (b || "fx") + "queue", d = p._data(a, b), c && (!d || p.isArray(c) ? d = p._data(a, b, p.makeArray(c)) : d.push(c)), d || [];
    }, dequeue: function dequeue(a, b) {
      b = b || "fx";var c = p.queue(a, b),
          d = c.length,
          e = c.shift(),
          f = p._queueHooks(a, b),
          g = function g() {
        p.dequeue(a, b);
      };e === "inprogress" && (e = c.shift(), d--), e && (b === "fx" && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
    }, _queueHooks: function _queueHooks(a, b) {
      var c = b + "queueHooks";return p._data(a, c) || p._data(a, c, { empty: p.Callbacks("once memory").add(function () {
          p.removeData(a, b + "queue", !0), p.removeData(a, c, !0);
        }) });
    } }), p.fn.extend({ queue: function queue(a, c) {
      var d = 2;return typeof a != "string" && (c = a, a = "fx", d--), arguments.length < d ? p.queue(this[0], a) : c === b ? this : this.each(function () {
        var b = p.queue(this, a, c);p._queueHooks(this, a), a === "fx" && b[0] !== "inprogress" && p.dequeue(this, a);
      });
    }, dequeue: function dequeue(a) {
      return this.each(function () {
        p.dequeue(this, a);
      });
    }, delay: function delay(a, b) {
      return a = p.fx ? p.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
        var d = setTimeout(b, a);c.stop = function () {
          clearTimeout(d);
        };
      });
    }, clearQueue: function clearQueue(a) {
      return this.queue(a || "fx", []);
    }, promise: function promise(a, c) {
      var d,
          e = 1,
          f = p.Deferred(),
          g = this,
          h = this.length,
          i = function i() {
        --e || f.resolveWith(g, [g]);
      };typeof a != "string" && (c = a, a = b), a = a || "fx";while (h--) {
        d = p._data(g[h], a + "queueHooks"), d && d.empty && (e++, d.empty.add(i));
      }return i(), f.promise(c);
    } });var L,
      M,
      N,
      O = /[\t\r\n]/g,
      P = /\r/g,
      Q = /^(?:button|input)$/i,
      R = /^(?:button|input|object|select|textarea)$/i,
      S = /^a(?:rea|)$/i,
      T = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
      U = p.support.getSetAttribute;p.fn.extend({ attr: function attr(a, b) {
      return p.access(this, p.attr, a, b, arguments.length > 1);
    }, removeAttr: function removeAttr(a) {
      return this.each(function () {
        p.removeAttr(this, a);
      });
    }, prop: function prop(a, b) {
      return p.access(this, p.prop, a, b, arguments.length > 1);
    }, removeProp: function removeProp(a) {
      return a = p.propFix[a] || a, this.each(function () {
        try {
          this[a] = b, delete this[a];
        } catch (c) {}
      });
    }, addClass: function addClass(a) {
      var b, c, d, e, f, g, h;if (p.isFunction(a)) return this.each(function (b) {
        p(this).addClass(a.call(this, b, this.className));
      });if (a && typeof a == "string") {
        b = a.split(s);for (c = 0, d = this.length; c < d; c++) {
          e = this[c];if (e.nodeType === 1) if (!e.className && b.length === 1) e.className = a;else {
            f = " " + e.className + " ";for (g = 0, h = b.length; g < h; g++) {
              ~f.indexOf(" " + b[g] + " ") || (f += b[g] + " ");
            }e.className = p.trim(f);
          }
        }
      }return this;
    }, removeClass: function removeClass(a) {
      var c, d, e, f, g, h, i;if (p.isFunction(a)) return this.each(function (b) {
        p(this).removeClass(a.call(this, b, this.className));
      });if (a && typeof a == "string" || a === b) {
        c = (a || "").split(s);for (h = 0, i = this.length; h < i; h++) {
          e = this[h];if (e.nodeType === 1 && e.className) {
            d = (" " + e.className + " ").replace(O, " ");for (f = 0, g = c.length; f < g; f++) {
              while (d.indexOf(" " + c[f] + " ") > -1) {
                d = d.replace(" " + c[f] + " ", " ");
              }
            }e.className = a ? p.trim(d) : "";
          }
        }
      }return this;
    }, toggleClass: function toggleClass(a, b) {
      var c = typeof a === "undefined" ? "undefined" : _typeof(a),
          d = typeof b == "boolean";return p.isFunction(a) ? this.each(function (c) {
        p(this).toggleClass(a.call(this, c, this.className, b), b);
      }) : this.each(function () {
        if (c === "string") {
          var e,
              f = 0,
              g = p(this),
              h = b,
              i = a.split(s);while (e = i[f++]) {
            h = d ? h : !g.hasClass(e), g[h ? "addClass" : "removeClass"](e);
          }
        } else if (c === "undefined" || c === "boolean") this.className && p._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : p._data(this, "__className__") || "";
      });
    }, hasClass: function hasClass(a) {
      var b = " " + a + " ",
          c = 0,
          d = this.length;for (; c < d; c++) {
        if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(O, " ").indexOf(b) > -1) return !0;
      }return !1;
    }, val: function val(a) {
      var c,
          d,
          e,
          f = this[0];if (!arguments.length) {
        if (f) return c = p.valHooks[f.type] || p.valHooks[f.nodeName.toLowerCase()], c && "get" in c && (d = c.get(f, "value")) !== b ? d : (d = f.value, typeof d == "string" ? d.replace(P, "") : d == null ? "" : d);return;
      }return e = p.isFunction(a), this.each(function (d) {
        var f,
            g = p(this);if (this.nodeType !== 1) return;e ? f = a.call(this, d, g.val()) : f = a, f == null ? f = "" : typeof f == "number" ? f += "" : p.isArray(f) && (f = p.map(f, function (a) {
          return a == null ? "" : a + "";
        })), c = p.valHooks[this.type] || p.valHooks[this.nodeName.toLowerCase()];if (!c || !("set" in c) || c.set(this, f, "value") === b) this.value = f;
      });
    } }), p.extend({ valHooks: { option: { get: function get(a) {
          var b = a.attributes.value;return !b || b.specified ? a.value : a.text;
        } }, select: { get: function get(a) {
          var b,
              c,
              d,
              e,
              f = a.selectedIndex,
              g = [],
              h = a.options,
              i = a.type === "select-one";if (f < 0) return null;c = i ? f : 0, d = i ? f + 1 : h.length;for (; c < d; c++) {
            e = h[c];if (e.selected && (p.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !p.nodeName(e.parentNode, "optgroup"))) {
              b = p(e).val();if (i) return b;g.push(b);
            }
          }return i && !g.length && h.length ? p(h[f]).val() : g;
        }, set: function set(a, b) {
          var c = p.makeArray(b);return p(a).find("option").each(function () {
            this.selected = p.inArray(p(this).val(), c) >= 0;
          }), c.length || (a.selectedIndex = -1), c;
        } } }, attrFn: {}, attr: function attr(a, c, d, e) {
      var f,
          g,
          h,
          i = a.nodeType;if (!a || i === 3 || i === 8 || i === 2) return;if (e && p.isFunction(p.fn[c])) return p(a)[c](d);if (typeof a.getAttribute == "undefined") return p.prop(a, c, d);h = i !== 1 || !p.isXMLDoc(a), h && (c = c.toLowerCase(), g = p.attrHooks[c] || (T.test(c) ? M : L));if (d !== b) {
        if (d === null) {
          p.removeAttr(a, c);return;
        }return g && "set" in g && h && (f = g.set(a, d, c)) !== b ? f : (a.setAttribute(c, "" + d), d);
      }return g && "get" in g && h && (f = g.get(a, c)) !== null ? f : (f = a.getAttribute(c), f === null ? b : f);
    }, removeAttr: function removeAttr(a, b) {
      var c,
          d,
          e,
          f,
          g = 0;if (b && a.nodeType === 1) {
        d = b.split(s);for (; g < d.length; g++) {
          e = d[g], e && (c = p.propFix[e] || e, f = T.test(e), f || p.attr(a, e, ""), a.removeAttribute(U ? e : c), f && c in a && (a[c] = !1));
        }
      }
    }, attrHooks: { type: { set: function set(a, b) {
          if (Q.test(a.nodeName) && a.parentNode) p.error("type property can't be changed");else if (!p.support.radioValue && b === "radio" && p.nodeName(a, "input")) {
            var c = a.value;return a.setAttribute("type", b), c && (a.value = c), b;
          }
        } }, value: { get: function get(a, b) {
          return L && p.nodeName(a, "button") ? L.get(a, b) : b in a ? a.value : null;
        }, set: function set(a, b, c) {
          if (L && p.nodeName(a, "button")) return L.set(a, b, c);a.value = b;
        } } }, propFix: { tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable" }, prop: function prop(a, c, d) {
      var e,
          f,
          g,
          h = a.nodeType;if (!a || h === 3 || h === 8 || h === 2) return;return g = h !== 1 || !p.isXMLDoc(a), g && (c = p.propFix[c] || c, f = p.propHooks[c]), d !== b ? f && "set" in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get" in f && (e = f.get(a, c)) !== null ? e : a[c];
    }, propHooks: { tabIndex: { get: function get(a) {
          var c = a.getAttributeNode("tabindex");return c && c.specified ? parseInt(c.value, 10) : R.test(a.nodeName) || S.test(a.nodeName) && a.href ? 0 : b;
        } } } }), M = { get: function get(a, c) {
      var d,
          e = p.prop(a, c);return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b;
    }, set: function set(a, b, c) {
      var d;return b === !1 ? p.removeAttr(a, c) : (d = p.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c;
    } }, U || (N = { name: !0, id: !0, coords: !0 }, L = p.valHooks.button = { get: function get(a, c) {
      var d;return d = a.getAttributeNode(c), d && (N[c] ? d.value !== "" : d.specified) ? d.value : b;
    }, set: function set(a, b, c) {
      var d = a.getAttributeNode(c);return d || (d = e.createAttribute(c), a.setAttributeNode(d)), d.value = b + "";
    } }, p.each(["width", "height"], function (a, b) {
    p.attrHooks[b] = p.extend(p.attrHooks[b], { set: function set(a, c) {
        if (c === "") return a.setAttribute(b, "auto"), c;
      } });
  }), p.attrHooks.contenteditable = { get: L.get, set: function set(a, b, c) {
      b === "" && (b = "false"), L.set(a, b, c);
    } }), p.support.hrefNormalized || p.each(["href", "src", "width", "height"], function (a, c) {
    p.attrHooks[c] = p.extend(p.attrHooks[c], { get: function get(a) {
        var d = a.getAttribute(c, 2);return d === null ? b : d;
      } });
  }), p.support.style || (p.attrHooks.style = { get: function get(a) {
      return a.style.cssText.toLowerCase() || b;
    }, set: function set(a, b) {
      return a.style.cssText = "" + b;
    } }), p.support.optSelected || (p.propHooks.selected = p.extend(p.propHooks.selected, { get: function get(a) {
      var b = a.parentNode;return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null;
    } })), p.support.enctype || (p.propFix.enctype = "encoding"), p.support.checkOn || p.each(["radio", "checkbox"], function () {
    p.valHooks[this] = { get: function get(a) {
        return a.getAttribute("value") === null ? "on" : a.value;
      } };
  }), p.each(["radio", "checkbox"], function () {
    p.valHooks[this] = p.extend(p.valHooks[this], { set: function set(a, b) {
        if (p.isArray(b)) return a.checked = p.inArray(p(a).val(), b) >= 0;
      } });
  });var V = /^(?:textarea|input|select)$/i,
      W = /^([^\.]*|)(?:\.(.+)|)$/,
      X = /(?:^|\s)hover(\.\S+|)\b/,
      Y = /^key/,
      Z = /^(?:mouse|contextmenu)|click/,
      $ = /^(?:focusinfocus|focusoutblur)$/,
      _ = function _(a) {
    return p.event.special.hover ? a : a.replace(X, "mouseenter$1 mouseleave$1");
  };p.event = { add: function add(a, c, d, e, f) {
      var g, _h, i, j, k, l, m, n, o, q, r;if (a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(g = p._data(a))) return;d.handler && (o = d, d = o.handler, f = o.selector), d.guid || (d.guid = p.guid++), i = g.events, i || (g.events = i = {}), _h = g.handle, _h || (g.handle = _h = function h(a) {
        return typeof p != "undefined" && (!a || p.event.triggered !== a.type) ? p.event.dispatch.apply(_h.elem, arguments) : b;
      }, _h.elem = a), c = p.trim(_(c)).split(" ");for (j = 0; j < c.length; j++) {
        k = W.exec(c[j]) || [], l = k[1], m = (k[2] || "").split(".").sort(), r = p.event.special[l] || {}, l = (f ? r.delegateType : r.bindType) || l, r = p.event.special[l] || {}, n = p.extend({ type: l, origType: k[1], data: e, handler: d, guid: d.guid, selector: f, namespace: m.join(".") }, o), q = i[l];if (!q) {
          q = i[l] = [], q.delegateCount = 0;if (!r.setup || r.setup.call(a, e, m, _h) === !1) a.addEventListener ? a.addEventListener(l, _h, !1) : a.attachEvent && a.attachEvent("on" + l, _h);
        }r.add && (r.add.call(a, n), n.handler.guid || (n.handler.guid = d.guid)), f ? q.splice(q.delegateCount++, 0, n) : q.push(n), p.event.global[l] = !0;
      }a = null;
    }, global: {}, remove: function remove(a, b, c, d, e) {
      var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          q,
          r = p.hasData(a) && p._data(a);if (!r || !(m = r.events)) return;b = p.trim(_(b || "")).split(" ");for (f = 0; f < b.length; f++) {
        g = W.exec(b[f]) || [], h = i = g[1], j = g[2];if (!h) {
          for (h in m) {
            p.event.remove(a, h + b[f], c, d, !0);
          }continue;
        }n = p.event.special[h] || {}, h = (d ? n.delegateType : n.bindType) || h, o = m[h] || [], k = o.length, j = j ? new RegExp("(^|\\.)" + j.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;for (l = 0; l < o.length; l++) {
          q = o[l], (e || i === q.origType) && (!c || c.guid === q.guid) && (!j || j.test(q.namespace)) && (!d || d === q.selector || d === "**" && q.selector) && (o.splice(l--, 1), q.selector && o.delegateCount--, n.remove && n.remove.call(a, q));
        }o.length === 0 && k !== o.length && ((!n.teardown || n.teardown.call(a, j, r.handle) === !1) && p.removeEvent(a, h, r.handle), delete m[h]);
      }p.isEmptyObject(m) && (delete r.handle, p.removeData(a, "events", !0));
    }, customEvent: { getData: !0, setData: !0, changeData: !0 }, trigger: function trigger(c, d, f, g) {
      if (!f || f.nodeType !== 3 && f.nodeType !== 8) {
        var h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            q,
            r,
            s = c.type || c,
            t = [];if ($.test(s + p.event.triggered)) return;s.indexOf("!") >= 0 && (s = s.slice(0, -1), i = !0), s.indexOf(".") >= 0 && (t = s.split("."), s = t.shift(), t.sort());if ((!f || p.event.customEvent[s]) && !p.event.global[s]) return;c = (typeof c === "undefined" ? "undefined" : _typeof(c)) == "object" ? c[p.expando] ? c : new p.Event(s, c) : new p.Event(s), c.type = s, c.isTrigger = !0, c.exclusive = i, c.namespace = t.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + t.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, m = s.indexOf(":") < 0 ? "on" + s : "";if (!f) {
          h = p.cache;for (j in h) {
            h[j].events && h[j].events[s] && p.event.trigger(c, d, h[j].handle.elem, !0);
          }return;
        }c.result = b, c.target || (c.target = f), d = d != null ? p.makeArray(d) : [], d.unshift(c), n = p.event.special[s] || {};if (n.trigger && n.trigger.apply(f, d) === !1) return;q = [[f, n.bindType || s]];if (!g && !n.noBubble && !p.isWindow(f)) {
          r = n.delegateType || s, k = $.test(r + s) ? f : f.parentNode;for (l = f; k; k = k.parentNode) {
            q.push([k, r]), l = k;
          }l === (f.ownerDocument || e) && q.push([l.defaultView || l.parentWindow || a, r]);
        }for (j = 0; j < q.length && !c.isPropagationStopped(); j++) {
          k = q[j][0], c.type = q[j][1], o = (p._data(k, "events") || {})[c.type] && p._data(k, "handle"), o && o.apply(k, d), o = m && k[m], o && p.acceptData(k) && o.apply(k, d) === !1 && c.preventDefault();
        }return c.type = s, !g && !c.isDefaultPrevented() && (!n._default || n._default.apply(f.ownerDocument, d) === !1) && (s !== "click" || !p.nodeName(f, "a")) && p.acceptData(f) && m && f[s] && (s !== "focus" && s !== "blur" || c.target.offsetWidth !== 0) && !p.isWindow(f) && (l = f[m], l && (f[m] = null), p.event.triggered = s, f[s](), p.event.triggered = b, l && (f[m] = l)), c.result;
      }return;
    }, dispatch: function dispatch(c) {
      c = p.event.fix(c || a.event);var d,
          e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n = (p._data(this, "events") || {})[c.type] || [],
          o = n.delegateCount,
          q = [].slice.call(arguments),
          r = !c.exclusive && !c.namespace,
          s = p.event.special[c.type] || {},
          t = [];q[0] = c, c.delegateTarget = this;if (s.preDispatch && s.preDispatch.call(this, c) === !1) return;if (o && (!c.button || c.type !== "click")) for (f = c.target; f != this; f = f.parentNode || this) {
        if (f.disabled !== !0 || c.type !== "click") {
          h = {}, j = [];for (d = 0; d < o; d++) {
            k = n[d], l = k.selector, h[l] === b && (h[l] = p(l, this).index(f) >= 0), h[l] && j.push(k);
          }j.length && t.push({ elem: f, matches: j });
        }
      }n.length > o && t.push({ elem: this, matches: n.slice(o) });for (d = 0; d < t.length && !c.isPropagationStopped(); d++) {
        i = t[d], c.currentTarget = i.elem;for (e = 0; e < i.matches.length && !c.isImmediatePropagationStopped(); e++) {
          k = i.matches[e];if (r || !c.namespace && !k.namespace || c.namespace_re && c.namespace_re.test(k.namespace)) c.data = k.data, c.handleObj = k, g = ((p.event.special[k.origType] || {}).handle || k.handler).apply(i.elem, q), g !== b && (c.result = g, g === !1 && (c.preventDefault(), c.stopPropagation()));
        }
      }return s.postDispatch && s.postDispatch.call(this, c), c.result;
    }, props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function filter(a, b) {
        return a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode), a;
      } }, mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function filter(a, c) {
        var d,
            f,
            g,
            h = c.button,
            i = c.fromElement;return a.pageX == null && c.clientX != null && (d = a.target.ownerDocument || e, f = d.documentElement, g = d.body, a.pageX = c.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = c.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? c.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0), a;
      } }, fix: function fix(a) {
      if (a[p.expando]) return a;var b,
          c,
          d = a,
          f = p.event.fixHooks[a.type] || {},
          g = f.props ? this.props.concat(f.props) : this.props;a = p.Event(d);for (b = g.length; b;) {
        c = g[--b], a[c] = d[c];
      }return a.target || (a.target = d.srcElement || e), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, f.filter ? f.filter(a, d) : a;
    }, special: { load: { noBubble: !0 }, focus: { delegateType: "focusin" }, blur: { delegateType: "focusout" }, beforeunload: { setup: function setup(a, b, c) {
          p.isWindow(this) && (this.onbeforeunload = c);
        }, teardown: function teardown(a, b) {
          this.onbeforeunload === b && (this.onbeforeunload = null);
        } } }, simulate: function simulate(a, b, c, d) {
      var e = p.extend(new p.Event(), c, { type: a, isSimulated: !0, originalEvent: {} });d ? p.event.trigger(e, null, b) : p.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
    } }, p.event.handle = p.event.dispatch, p.removeEvent = e.removeEventListener ? function (a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c, !1);
  } : function (a, b, c) {
    var d = "on" + b;a.detachEvent && (typeof a[d] == "undefined" && (a[d] = null), a.detachEvent(d, c));
  }, p.Event = function (a, b) {
    if (this instanceof p.Event) a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? bb : ba) : this.type = a, b && p.extend(this, b), this.timeStamp = a && a.timeStamp || p.now(), this[p.expando] = !0;else return new p.Event(a, b);
  }, p.Event.prototype = { preventDefault: function preventDefault() {
      this.isDefaultPrevented = bb;var a = this.originalEvent;if (!a) return;a.preventDefault ? a.preventDefault() : a.returnValue = !1;
    }, stopPropagation: function stopPropagation() {
      this.isPropagationStopped = bb;var a = this.originalEvent;if (!a) return;a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0;
    }, stopImmediatePropagation: function stopImmediatePropagation() {
      this.isImmediatePropagationStopped = bb, this.stopPropagation();
    }, isDefaultPrevented: ba, isPropagationStopped: ba, isImmediatePropagationStopped: ba }, p.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (a, b) {
    p.event.special[a] = { delegateType: b, bindType: b, handle: function handle(a) {
        var c,
            d = this,
            e = a.relatedTarget,
            f = a.handleObj,
            g = f.selector;if (!e || e !== d && !p.contains(d, e)) a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b;return c;
      } };
  }), p.support.submitBubbles || (p.event.special.submit = { setup: function setup() {
      if (p.nodeName(this, "form")) return !1;p.event.add(this, "click._submit keypress._submit", function (a) {
        var c = a.target,
            d = p.nodeName(c, "input") || p.nodeName(c, "button") ? c.form : b;d && !p._data(d, "_submit_attached") && (p.event.add(d, "submit._submit", function (a) {
          a._submit_bubble = !0;
        }), p._data(d, "_submit_attached", !0));
      });
    }, postDispatch: function postDispatch(a) {
      a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && p.event.simulate("submit", this.parentNode, a, !0));
    }, teardown: function teardown() {
      if (p.nodeName(this, "form")) return !1;p.event.remove(this, "._submit");
    } }), p.support.changeBubbles || (p.event.special.change = { setup: function setup() {
      if (V.test(this.nodeName)) {
        if (this.type === "checkbox" || this.type === "radio") p.event.add(this, "propertychange._change", function (a) {
          a.originalEvent.propertyName === "checked" && (this._just_changed = !0);
        }), p.event.add(this, "click._change", function (a) {
          this._just_changed && !a.isTrigger && (this._just_changed = !1), p.event.simulate("change", this, a, !0);
        });return !1;
      }p.event.add(this, "beforeactivate._change", function (a) {
        var b = a.target;V.test(b.nodeName) && !p._data(b, "_change_attached") && (p.event.add(b, "change._change", function (a) {
          this.parentNode && !a.isSimulated && !a.isTrigger && p.event.simulate("change", this.parentNode, a, !0);
        }), p._data(b, "_change_attached", !0));
      });
    }, handle: function handle(a) {
      var b = a.target;if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments);
    }, teardown: function teardown() {
      return p.event.remove(this, "._change"), !V.test(this.nodeName);
    } }), p.support.focusinBubbles || p.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
    var c = 0,
        d = function d(a) {
      p.event.simulate(b, a.target, p.event.fix(a), !0);
    };p.event.special[b] = { setup: function setup() {
        c++ === 0 && e.addEventListener(a, d, !0);
      }, teardown: function teardown() {
        --c === 0 && e.removeEventListener(a, d, !0);
      } };
  }), p.fn.extend({ on: function on(a, c, d, e, f) {
      var g, h;if ((typeof a === "undefined" ? "undefined" : _typeof(a)) == "object") {
        typeof c != "string" && (d = d || c, c = b);for (h in a) {
          this.on(h, c, d, a[h], f);
        }return this;
      }d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));if (e === !1) e = ba;else if (!e) return this;return f === 1 && (g = e, e = function e(a) {
        return p().off(a), g.apply(this, arguments);
      }, e.guid = g.guid || (g.guid = p.guid++)), this.each(function () {
        p.event.add(this, a, e, d, c);
      });
    }, one: function one(a, b, c, d) {
      return this.on(a, b, c, d, 1);
    }, off: function off(a, c, d) {
      var e, f;if (a && a.preventDefault && a.handleObj) return e = a.handleObj, p(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;if ((typeof a === "undefined" ? "undefined" : _typeof(a)) == "object") {
        for (f in a) {
          this.off(f, c, a[f]);
        }return this;
      }if (c === !1 || typeof c == "function") d = c, c = b;return d === !1 && (d = ba), this.each(function () {
        p.event.remove(this, a, d, c);
      });
    }, bind: function bind(a, b, c) {
      return this.on(a, null, b, c);
    }, unbind: function unbind(a, b) {
      return this.off(a, null, b);
    }, live: function live(a, b, c) {
      return p(this.context).on(a, this.selector, b, c), this;
    }, die: function die(a, b) {
      return p(this.context).off(a, this.selector || "**", b), this;
    }, delegate: function delegate(a, b, c, d) {
      return this.on(b, a, c, d);
    }, undelegate: function undelegate(a, b, c) {
      return arguments.length == 1 ? this.off(a, "**") : this.off(b, a || "**", c);
    }, trigger: function trigger(a, b) {
      return this.each(function () {
        p.event.trigger(a, b, this);
      });
    }, triggerHandler: function triggerHandler(a, b) {
      if (this[0]) return p.event.trigger(a, b, this[0], !0);
    }, toggle: function toggle(a) {
      var b = arguments,
          c = a.guid || p.guid++,
          d = 0,
          e = function e(c) {
        var e = (p._data(this, "lastToggle" + a.guid) || 0) % d;return p._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1;
      };e.guid = c;while (d < b.length) {
        b[d++].guid = c;
      }return this.click(e);
    }, hover: function hover(a, b) {
      return this.mouseenter(a).mouseleave(b || a);
    } }), p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
    p.fn[b] = function (a, c) {
      return c == null && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
    }, Y.test(b) && (p.event.fixHooks[b] = p.event.keyHooks), Z.test(b) && (p.event.fixHooks[b] = p.event.mouseHooks);
  }), function (a, b) {
    function $(a, b, c, d) {
      c = c || [], b = b || q;var e,
          f,
          g,
          j,
          k = b.nodeType;if (k !== 1 && k !== 9) return [];if (!a || typeof a != "string") return c;g = h(b);if (!g && !d) if (e = L.exec(a)) if (j = e[1]) {
        if (k === 9) {
          f = b.getElementById(j);if (!f || !f.parentNode) return c;if (f.id === j) return c.push(f), c;
        } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(j)) && i(b, f) && f.id === j) return c.push(f), c;
      } else {
        if (e[2]) return u.apply(c, t.call(b.getElementsByTagName(a), 0)), c;if ((j = e[3]) && X && b.getElementsByClassName) return u.apply(c, t.call(b.getElementsByClassName(j), 0)), c;
      }return bk(a, b, c, d, g);
    }function _(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();return c === "input" && b.type === a;
      };
    }function ba(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();return (c === "input" || c === "button") && b.type === a;
      };
    }function bb(a, b, c) {
      if (a === b) return c;var d = a.nextSibling;while (d) {
        if (d === b) return -1;d = d.nextSibling;
      }return 1;
    }function bc(a, b, c, d) {
      var e,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          p,
          r = !c && b !== q,
          s = (r ? "<s>" : "") + a.replace(H, "$1<s>"),
          u = y[o][s];if (u) return d ? 0 : t.call(u, 0);j = a, k = [], m = 0, n = f.preFilter, p = f.filter;while (j) {
        if (!e || (g = I.exec(j))) g && (j = j.slice(g[0].length), h.selector = l), k.push(h = []), l = "", r && (j = " " + j);e = !1;if (g = J.exec(j)) l += g[0], j = j.slice(g[0].length), e = h.push({ part: g.pop().replace(H, " "), string: g[0], captures: g });for (i in p) {
          (g = S[i].exec(j)) && (!n[i] || (g = n[i](g, b, c))) && (l += g[0], j = j.slice(g[0].length), e = h.push({ part: i, string: g.shift(), captures: g }));
        }if (!e) break;
      }return l && (h.selector = l), d ? j.length : j ? $.error(a) : t.call(y(s, k), 0);
    }function bd(a, b, e, f) {
      var g = b.dir,
          h = s++;return a || (a = function a(_a) {
        return _a === e;
      }), b.first ? function (b) {
        while (b = b[g]) {
          if (b.nodeType === 1) return a(b) && b;
        }
      } : f ? function (b) {
        while (b = b[g]) {
          if (b.nodeType === 1 && a(b)) return b;
        }
      } : function (b) {
        var e,
            f = h + "." + c,
            i = f + "." + d;while (b = b[g]) {
          if (b.nodeType === 1) {
            if ((e = b[o]) === i) return b.sizset;if (typeof e == "string" && e.indexOf(f) === 0) {
              if (b.sizset) return b;
            } else {
              b[o] = i;if (a(b)) return b.sizset = !0, b;b.sizset = !1;
            }
          }
        }
      };
    }function be(a, b) {
      return a ? function (c) {
        var d = b(c);return d && a(d === !0 ? c : d);
      } : b;
    }function bf(a, b, c) {
      var d,
          e,
          g = 0;for (; d = a[g]; g++) {
        f.relative[d.part] ? e = bd(e, f.relative[d.part], b, c) : e = be(e, f.filter[d.part].apply(null, d.captures.concat(b, c)));
      }return e;
    }function bg(a) {
      return function (b) {
        var c,
            d = 0;for (; c = a[d]; d++) {
          if (c(b)) return !0;
        }return !1;
      };
    }function bh(a, b, c, d) {
      var e = 0,
          f = b.length;for (; e < f; e++) {
        $(a, b[e], c, d);
      }
    }function bi(a, b, c, d, e, g) {
      var h,
          i = f.setFilters[b.toLowerCase()];return i || $.error(b), (a || !(h = e)) && bh(a || "*", d, h = [], e), h.length > 0 ? i(h, c, g) : [];
    }function bj(a, c, d, e) {
      var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q,
          r,
          s = 0,
          t = a.length,
          v = S.POS,
          w = new RegExp("^" + v.source + "(?!" + A + ")", "i"),
          x = function x() {
        var a = 1,
            c = arguments.length - 2;for (; a < c; a++) {
          arguments[a] === b && (n[a] = b);
        }
      };for (; s < t; s++) {
        f = a[s], g = "", m = e;for (h = 0, i = f.length; h < i; h++) {
          j = f[h], k = j.string;if (j.part === "PSEUDO") {
            v.exec(""), l = 0;while (n = v.exec(k)) {
              o = !0, p = v.lastIndex = n.index + n[0].length;if (p > l) {
                g += k.slice(l, n.index), l = p, q = [c], J.test(g) && (m && (q = m), m = e);if (r = O.test(g)) g = g.slice(0, -5).replace(J, "$&*"), l++;n.length > 1 && n[0].replace(w, x), m = bi(g, n[1], n[2], q, m, r);
              }g = "";
            }
          }o || (g += k), o = !1;
        }g ? J.test(g) ? bh(g, m || [c], d, e) : $(g, c, d, e ? e.concat(m) : m) : u.apply(d, m);
      }return t === 1 ? d : $.uniqueSort(d);
    }function bk(a, b, e, g, h) {
      a = a.replace(H, "$1");var i,
          k,
          l,
          m,
          n,
          o,
          p,
          q,
          r,
          s,
          v = bc(a, b, h),
          w = b.nodeType;if (S.POS.test(a)) return bj(v, b, e, g);if (g) i = t.call(g, 0);else if (v.length === 1) {
        if ((o = t.call(v[0], 0)).length > 2 && (p = o[0]).part === "ID" && w === 9 && !h && f.relative[o[1].part]) {
          b = f.find.ID(p.captures[0].replace(R, ""), b, h)[0];if (!b) return e;a = a.slice(o.shift().string.length);
        }r = (v = N.exec(o[0].string)) && !v.index && b.parentNode || b, q = "";for (n = o.length - 1; n >= 0; n--) {
          p = o[n], s = p.part, q = p.string + q;if (f.relative[s]) break;if (f.order.test(s)) {
            i = f.find[s](p.captures[0].replace(R, ""), r, h);if (i == null) continue;a = a.slice(0, a.length - q.length) + q.replace(S[s], ""), a || u.apply(e, t.call(i, 0));break;
          }
        }
      }if (a) {
        k = j(a, b, h), c = k.dirruns++, i == null && (i = f.find.TAG("*", N.test(a) && b.parentNode || b));for (n = 0; m = i[n]; n++) {
          d = k.runs++, k(m) && e.push(m);
        }
      }return e;
    }var c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m = !0,
        n = "undefined",
        o = ("sizcache" + Math.random()).replace(".", ""),
        q = a.document,
        r = q.documentElement,
        s = 0,
        t = [].slice,
        u = [].push,
        v = function v(a, b) {
      return a[o] = b || !0, a;
    },
        w = function w() {
      var a = {},
          b = [];return v(function (c, d) {
        return b.push(c) > f.cacheLength && delete a[b.shift()], a[c] = d;
      }, a);
    },
        x = w(),
        y = w(),
        z = w(),
        A = "[\\x20\\t\\r\\n\\f]",
        B = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
        C = B.replace("w", "w#"),
        D = "([*^$|!~]?=)",
        E = "\\[" + A + "*(" + B + ")" + A + "*(?:" + D + A + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + C + ")|)|)" + A + "*\\]",
        F = ":(" + B + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + E + ")|[^:]|\\\\.)*|.*))\\)|)",
        G = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\(((?:-\\d)?\\d*)\\)|)(?=[^-]|$)",
        H = new RegExp("^" + A + "+|((?:^|[^\\\\])(?:\\\\.)*)" + A + "+$", "g"),
        I = new RegExp("^" + A + "*," + A + "*"),
        J = new RegExp("^" + A + "*([\\x20\\t\\r\\n\\f>+~])" + A + "*"),
        K = new RegExp(F),
        L = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
        M = /^:not/,
        N = /[\x20\t\r\n\f]*[+~]/,
        O = /:not\($/,
        P = /h\d/i,
        Q = /input|select|textarea|button/i,
        R = /\\(?!\\)/g,
        S = { ID: new RegExp("^#(" + B + ")"), CLASS: new RegExp("^\\.(" + B + ")"), NAME: new RegExp("^\\[name=['\"]?(" + B + ")['\"]?\\]"), TAG: new RegExp("^(" + B.replace("w", "w*") + ")"), ATTR: new RegExp("^" + E), PSEUDO: new RegExp("^" + F), CHILD: new RegExp("^:(only|nth|last|first)-child(?:\\(" + A + "*(even|odd|(([+-]|)(\\d*)n|)" + A + "*(?:([+-]|)" + A + "*(\\d+)|))" + A + "*\\)|)", "i"), POS: new RegExp(G, "ig"), needsContext: new RegExp("^" + A + "*[>+~]|" + G, "i") },
        T = function T(a) {
      var b = q.createElement("div");try {
        return a(b);
      } catch (c) {
        return !1;
      } finally {
        b = null;
      }
    },
        U = T(function (a) {
      return a.appendChild(q.createComment("")), !a.getElementsByTagName("*").length;
    }),
        V = T(function (a) {
      return a.innerHTML = "<a href='#'></a>", a.firstChild && _typeof(a.firstChild.getAttribute) !== n && a.firstChild.getAttribute("href") === "#";
    }),
        W = T(function (a) {
      a.innerHTML = "<select></select>";var b = _typeof(a.lastChild.getAttribute("multiple"));return b !== "boolean" && b !== "string";
    }),
        X = T(function (a) {
      return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !a.getElementsByClassName || !a.getElementsByClassName("e").length ? !1 : (a.lastChild.className = "e", a.getElementsByClassName("e").length === 2);
    }),
        Y = T(function (a) {
      a.id = o + 0, a.innerHTML = "<a name='" + o + "'></a><div name='" + o + "'></div>", r.insertBefore(a, r.firstChild);var b = q.getElementsByName && q.getElementsByName(o).length === 2 + q.getElementsByName(o + 0).length;return e = !q.getElementById(o), r.removeChild(a), b;
    });try {
      t.call(r.childNodes, 0)[0].nodeType;
    } catch (Z) {
      t = function t(a) {
        var b,
            c = [];for (; b = this[a]; a++) {
          c.push(b);
        }return c;
      };
    }$.matches = function (a, b) {
      return $(a, null, null, b);
    }, $.matchesSelector = function (a, b) {
      return $(b, null, null, [a]).length > 0;
    }, g = $.getText = function (a) {
      var b,
          c = "",
          d = 0,
          e = a.nodeType;if (e) {
        if (e === 1 || e === 9 || e === 11) {
          if (typeof a.textContent == "string") return a.textContent;for (a = a.firstChild; a; a = a.nextSibling) {
            c += g(a);
          }
        } else if (e === 3 || e === 4) return a.nodeValue;
      } else for (; b = a[d]; d++) {
        c += g(b);
      }return c;
    }, h = $.isXML = function (a) {
      var b = a && (a.ownerDocument || a).documentElement;return b ? b.nodeName !== "HTML" : !1;
    }, i = $.contains = r.contains ? function (a, b) {
      var c = a.nodeType === 9 ? a.documentElement : a,
          d = b && b.parentNode;return a === d || !!(d && d.nodeType === 1 && c.contains && c.contains(d));
    } : r.compareDocumentPosition ? function (a, b) {
      return b && !!(a.compareDocumentPosition(b) & 16);
    } : function (a, b) {
      while (b = b.parentNode) {
        if (b === a) return !0;
      }return !1;
    }, $.attr = function (a, b) {
      var c,
          d = h(a);return d || (b = b.toLowerCase()), f.attrHandle[b] ? f.attrHandle[b](a) : W || d ? a.getAttribute(b) : (c = a.getAttributeNode(b), c ? typeof a[b] == "boolean" ? a[b] ? b : null : c.specified ? c.value : null : null);
    }, f = $.selectors = { cacheLength: 50, createPseudo: v, match: S, order: new RegExp("ID|TAG" + (Y ? "|NAME" : "") + (X ? "|CLASS" : "")), attrHandle: V ? {} : { href: function href(a) {
          return a.getAttribute("href", 2);
        }, type: function type(a) {
          return a.getAttribute("type");
        } }, find: { ID: e ? function (a, b, c) {
          if (_typeof(b.getElementById) !== n && !c) {
            var d = b.getElementById(a);return d && d.parentNode ? [d] : [];
          }
        } : function (a, c, d) {
          if (_typeof(c.getElementById) !== n && !d) {
            var e = c.getElementById(a);return e ? e.id === a || _typeof(e.getAttributeNode) !== n && e.getAttributeNode("id").value === a ? [e] : b : [];
          }
        }, TAG: U ? function (a, b) {
          if (_typeof(b.getElementsByTagName) !== n) return b.getElementsByTagName(a);
        } : function (a, b) {
          var c = b.getElementsByTagName(a);if (a === "*") {
            var d,
                e = [],
                f = 0;for (; d = c[f]; f++) {
              d.nodeType === 1 && e.push(d);
            }return e;
          }return c;
        }, NAME: function NAME(a, b) {
          if (_typeof(b.getElementsByName) !== n) return b.getElementsByName(name);
        }, CLASS: function CLASS(a, b, c) {
          if (_typeof(b.getElementsByClassName) !== n && !c) return b.getElementsByClassName(a);
        } }, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(a) {
          return a[1] = a[1].replace(R, ""), a[3] = (a[4] || a[5] || "").replace(R, ""), a[2] === "~=" && (a[3] = " " + a[3] + " "), a.slice(0, 4);
        }, CHILD: function CHILD(a) {
          return a[1] = a[1].toLowerCase(), a[1] === "nth" ? (a[2] || $.error(a[0]), a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * (a[2] === "even" || a[2] === "odd")), a[4] = +(a[6] + a[7] || a[2] === "odd")) : a[2] && $.error(a[0]), a;
        }, PSEUDO: function PSEUDO(a, b, c) {
          var d, e;if (S.CHILD.test(a[0])) return null;if (a[3]) a[2] = a[3];else if (d = a[4]) K.test(d) && (e = bc(d, b, c, !0)) && (e = d.indexOf(")", d.length - e) - d.length) && (d = d.slice(0, e), a[0] = a[0].slice(0, e)), a[2] = d;return a.slice(0, 3);
        } }, filter: { ID: e ? function (a) {
          return a = a.replace(R, ""), function (b) {
            return b.getAttribute("id") === a;
          };
        } : function (a) {
          return a = a.replace(R, ""), function (b) {
            var c = _typeof(b.getAttributeNode) !== n && b.getAttributeNode("id");return c && c.value === a;
          };
        }, TAG: function TAG(a) {
          return a === "*" ? function () {
            return !0;
          } : (a = a.replace(R, "").toLowerCase(), function (b) {
            return b.nodeName && b.nodeName.toLowerCase() === a;
          });
        }, CLASS: function CLASS(a) {
          var b = x[o][a];return b || (b = x(a, new RegExp("(^|" + A + ")" + a + "(" + A + "|$)"))), function (a) {
            return b.test(a.className || _typeof(a.getAttribute) !== n && a.getAttribute("class") || "");
          };
        }, ATTR: function ATTR(a, b, c) {
          return b ? function (d) {
            var e = $.attr(d, a),
                f = e + "";if (e == null) return b === "!=";switch (b) {case "=":
                return f === c;case "!=":
                return f !== c;case "^=":
                return c && f.indexOf(c) === 0;case "*=":
                return c && f.indexOf(c) > -1;case "$=":
                return c && f.substr(f.length - c.length) === c;case "~=":
                return (" " + f + " ").indexOf(c) > -1;case "|=":
                return f === c || f.substr(0, c.length + 1) === c + "-";}
          } : function (b) {
            return $.attr(b, a) != null;
          };
        }, CHILD: function CHILD(a, b, c, d) {
          if (a === "nth") {
            var e = s++;return function (a) {
              var b,
                  f,
                  g = 0,
                  h = a;if (c === 1 && d === 0) return !0;b = a.parentNode;if (b && (b[o] !== e || !a.sizset)) {
                for (h = b.firstChild; h; h = h.nextSibling) {
                  if (h.nodeType === 1) {
                    h.sizset = ++g;if (h === a) break;
                  }
                }b[o] = e;
              }return f = a.sizset - d, c === 0 ? f === 0 : f % c === 0 && f / c >= 0;
            };
          }return function (b) {
            var c = b;switch (a) {case "only":case "first":
                while (c = c.previousSibling) {
                  if (c.nodeType === 1) return !1;
                }if (a === "first") return !0;c = b;case "last":
                while (c = c.nextSibling) {
                  if (c.nodeType === 1) return !1;
                }return !0;}
          };
        }, PSEUDO: function PSEUDO(a, b, c, d) {
          var e,
              g = f.pseudos[a] || f.pseudos[a.toLowerCase()];return g || $.error("unsupported pseudo: " + a), g[o] ? g(b, c, d) : g.length > 1 ? (e = [a, a, "", b], function (a) {
            return g(a, 0, e);
          }) : g;
        } }, pseudos: { not: v(function (a, b, c) {
          var d = j(a.replace(H, "$1"), b, c);return function (a) {
            return !d(a);
          };
        }), enabled: function enabled(a) {
          return a.disabled === !1;
        }, disabled: function disabled(a) {
          return a.disabled === !0;
        }, checked: function checked(a) {
          var b = a.nodeName.toLowerCase();return b === "input" && !!a.checked || b === "option" && !!a.selected;
        }, selected: function selected(a) {
          return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
        }, parent: function parent(a) {
          return !f.pseudos.empty(a);
        }, empty: function empty(a) {
          var b;a = a.firstChild;while (a) {
            if (a.nodeName > "@" || (b = a.nodeType) === 3 || b === 4) return !1;a = a.nextSibling;
          }return !0;
        }, contains: v(function (a) {
          return function (b) {
            return (b.textContent || b.innerText || g(b)).indexOf(a) > -1;
          };
        }), has: v(function (a) {
          return function (b) {
            return $(a, b).length > 0;
          };
        }), header: function header(a) {
          return P.test(a.nodeName);
        }, text: function text(a) {
          var b, c;return a.nodeName.toLowerCase() === "input" && (b = a.type) === "text" && ((c = a.getAttribute("type")) == null || c.toLowerCase() === b);
        }, radio: _("radio"), checkbox: _("checkbox"), file: _("file"), password: _("password"), image: _("image"), submit: ba("submit"), reset: ba("reset"), button: function button(a) {
          var b = a.nodeName.toLowerCase();return b === "input" && a.type === "button" || b === "button";
        }, input: function input(a) {
          return Q.test(a.nodeName);
        }, focus: function focus(a) {
          var b = a.ownerDocument;return a === b.activeElement && (!b.hasFocus || b.hasFocus()) && (!!a.type || !!a.href);
        }, active: function active(a) {
          return a === a.ownerDocument.activeElement;
        } }, setFilters: { first: function first(a, b, c) {
          return c ? a.slice(1) : [a[0]];
        }, last: function last(a, b, c) {
          var d = a.pop();return c ? a : [d];
        }, even: function even(a, b, c) {
          var d = [],
              e = c ? 1 : 0,
              f = a.length;for (; e < f; e = e + 2) {
            d.push(a[e]);
          }return d;
        }, odd: function odd(a, b, c) {
          var d = [],
              e = c ? 0 : 1,
              f = a.length;for (; e < f; e = e + 2) {
            d.push(a[e]);
          }return d;
        }, lt: function lt(a, b, c) {
          return c ? a.slice(+b) : a.slice(0, +b);
        }, gt: function gt(a, b, c) {
          return c ? a.slice(0, +b + 1) : a.slice(+b + 1);
        }, eq: function eq(a, b, c) {
          var d = a.splice(+b, 1);return c ? a : d;
        } } }, k = r.compareDocumentPosition ? function (a, b) {
      return a === b ? (l = !0, 0) : (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1;
    } : function (a, b) {
      if (a === b) return l = !0, 0;if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;var c,
          d,
          e = [],
          f = [],
          g = a.parentNode,
          h = b.parentNode,
          i = g;if (g === h) return bb(a, b);if (!g) return -1;if (!h) return 1;while (i) {
        e.unshift(i), i = i.parentNode;
      }i = h;while (i) {
        f.unshift(i), i = i.parentNode;
      }c = e.length, d = f.length;for (var j = 0; j < c && j < d; j++) {
        if (e[j] !== f[j]) return bb(e[j], f[j]);
      }return j === c ? bb(a, f[j], -1) : bb(e[j], b, 1);
    }, [0, 0].sort(k), m = !l, $.uniqueSort = function (a) {
      var b,
          c = 1;l = m, a.sort(k);if (l) for (; b = a[c]; c++) {
        b === a[c - 1] && a.splice(c--, 1);
      }return a;
    }, $.error = function (a) {
      throw new Error("Syntax error, unrecognized expression: " + a);
    }, j = $.compile = function (a, b, c) {
      var d,
          e,
          f,
          g = z[o][a];if (g && g.context === b) return g;d = bc(a, b, c);for (e = 0, f = d.length; e < f; e++) {
        d[e] = bf(d[e], b, c);
      }return g = z(a, bg(d)), g.context = b, g.runs = g.dirruns = 0, g;
    }, q.querySelectorAll && function () {
      var a,
          b = bk,
          c = /'|\\/g,
          d = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
          e = [],
          f = [":active"],
          g = r.matchesSelector || r.mozMatchesSelector || r.webkitMatchesSelector || r.oMatchesSelector || r.msMatchesSelector;T(function (a) {
        a.innerHTML = "<select><option selected=''></option></select>", a.querySelectorAll("[selected]").length || e.push("\\[" + A + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), a.querySelectorAll(":checked").length || e.push(":checked");
      }), T(function (a) {
        a.innerHTML = "<p test=''></p>", a.querySelectorAll("[test^='']").length && e.push("[*^$]=" + A + "*(?:\"\"|'')"), a.innerHTML = "<input type='hidden'/>", a.querySelectorAll(":enabled").length || e.push(":enabled", ":disabled");
      }), e = e.length && new RegExp(e.join("|")), bk = function bk(a, d, f, g, h) {
        if (!g && !h && (!e || !e.test(a))) if (d.nodeType === 9) try {
          return u.apply(f, t.call(d.querySelectorAll(a), 0)), f;
        } catch (i) {} else if (d.nodeType === 1 && d.nodeName.toLowerCase() !== "object") {
          var j,
              k,
              l,
              m = d.getAttribute("id"),
              n = m || o,
              p = N.test(a) && d.parentNode || d;m ? n = n.replace(c, "\\$&") : d.setAttribute("id", n), j = bc(a, d, h), n = "[id='" + n + "']";for (k = 0, l = j.length; k < l; k++) {
            j[k] = n + j[k].selector;
          }try {
            return u.apply(f, t.call(p.querySelectorAll(j.join(",")), 0)), f;
          } catch (i) {} finally {
            m || d.removeAttribute("id");
          }
        }return b(a, d, f, g, h);
      }, g && (T(function (b) {
        a = g.call(b, "div");try {
          g.call(b, "[test!='']:sizzle"), f.push(S.PSEUDO.source, S.POS.source, "!=");
        } catch (c) {}
      }), f = new RegExp(f.join("|")), $.matchesSelector = function (b, c) {
        c = c.replace(d, "='$1']");if (!h(b) && !f.test(c) && (!e || !e.test(c))) try {
          var i = g.call(b, c);if (i || a || b.document && b.document.nodeType !== 11) return i;
        } catch (j) {}return $(c, null, null, [b]).length > 0;
      });
    }(), f.setFilters.nth = f.setFilters.eq, f.filters = f.pseudos, $.attr = p.attr, p.find = $, p.expr = $.selectors, p.expr[":"] = p.expr.pseudos, p.unique = $.uniqueSort, p.text = $.getText, p.isXMLDoc = $.isXML, p.contains = $.contains;
  }(a);var bc = /Until$/,
      bd = /^(?:parents|prev(?:Until|All))/,
      be = /^.[^:#\[\.,]*$/,
      bf = p.expr.match.needsContext,
      bg = { children: !0, contents: !0, next: !0, prev: !0 };p.fn.extend({ find: function find(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h = this;if (typeof a != "string") return p(a).filter(function () {
        for (b = 0, c = h.length; b < c; b++) {
          if (p.contains(h[b], this)) return !0;
        }
      });g = this.pushStack("", "find", a);for (b = 0, c = this.length; b < c; b++) {
        d = g.length, p.find(a, this[b], g);if (b > 0) for (e = d; e < g.length; e++) {
          for (f = 0; f < d; f++) {
            if (g[f] === g[e]) {
              g.splice(e--, 1);break;
            }
          }
        }
      }return g;
    }, has: function has(a) {
      var b,
          c = p(a, this),
          d = c.length;return this.filter(function () {
        for (b = 0; b < d; b++) {
          if (p.contains(this, c[b])) return !0;
        }
      });
    }, not: function not(a) {
      return this.pushStack(bj(this, a, !1), "not", a);
    }, filter: function filter(a) {
      return this.pushStack(bj(this, a, !0), "filter", a);
    }, is: function is(a) {
      return !!a && (typeof a == "string" ? bf.test(a) ? p(a, this.context).index(this[0]) >= 0 : p.filter(a, this).length > 0 : this.filter(a).length > 0);
    }, closest: function closest(a, b) {
      var c,
          d = 0,
          e = this.length,
          f = [],
          g = bf.test(a) || typeof a != "string" ? p(a, b || this.context) : 0;for (; d < e; d++) {
        c = this[d];while (c && c.ownerDocument && c !== b && c.nodeType !== 11) {
          if (g ? g.index(c) > -1 : p.find.matchesSelector(c, a)) {
            f.push(c);break;
          }c = c.parentNode;
        }
      }return f = f.length > 1 ? p.unique(f) : f, this.pushStack(f, "closest", a);
    }, index: function index(a) {
      return a ? typeof a == "string" ? p.inArray(this[0], p(a)) : p.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1;
    }, add: function add(a, b) {
      var c = typeof a == "string" ? p(a, b) : p.makeArray(a && a.nodeType ? [a] : a),
          d = p.merge(this.get(), c);return this.pushStack(bh(c[0]) || bh(d[0]) ? d : p.unique(d));
    }, addBack: function addBack(a) {
      return this.add(a == null ? this.prevObject : this.prevObject.filter(a));
    } }), p.fn.andSelf = p.fn.addBack, p.each({ parent: function parent(a) {
      var b = a.parentNode;return b && b.nodeType !== 11 ? b : null;
    }, parents: function parents(a) {
      return p.dir(a, "parentNode");
    }, parentsUntil: function parentsUntil(a, b, c) {
      return p.dir(a, "parentNode", c);
    }, next: function next(a) {
      return bi(a, "nextSibling");
    }, prev: function prev(a) {
      return bi(a, "previousSibling");
    }, nextAll: function nextAll(a) {
      return p.dir(a, "nextSibling");
    }, prevAll: function prevAll(a) {
      return p.dir(a, "previousSibling");
    }, nextUntil: function nextUntil(a, b, c) {
      return p.dir(a, "nextSibling", c);
    }, prevUntil: function prevUntil(a, b, c) {
      return p.dir(a, "previousSibling", c);
    }, siblings: function siblings(a) {
      return p.sibling((a.parentNode || {}).firstChild, a);
    }, children: function children(a) {
      return p.sibling(a.firstChild);
    }, contents: function contents(a) {
      return p.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : p.merge([], a.childNodes);
    } }, function (a, b) {
    p.fn[a] = function (c, d) {
      var e = p.map(this, b, c);return bc.test(a) || (d = c), d && typeof d == "string" && (e = p.filter(d, e)), e = this.length > 1 && !bg[a] ? p.unique(e) : e, this.length > 1 && bd.test(a) && (e = e.reverse()), this.pushStack(e, a, k.call(arguments).join(","));
    };
  }), p.extend({ filter: function filter(a, b, c) {
      return c && (a = ":not(" + a + ")"), b.length === 1 ? p.find.matchesSelector(b[0], a) ? [b[0]] : [] : p.find.matches(a, b);
    }, dir: function dir(a, c, d) {
      var e = [],
          f = a[c];while (f && f.nodeType !== 9 && (d === b || f.nodeType !== 1 || !p(f).is(d))) {
        f.nodeType === 1 && e.push(f), f = f[c];
      }return e;
    }, sibling: function sibling(a, b) {
      var c = [];for (; a; a = a.nextSibling) {
        a.nodeType === 1 && a !== b && c.push(a);
      }return c;
    } });var bl = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
      bm = / jQuery\d+="(?:null|\d+)"/g,
      bn = /^\s+/,
      bo = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
      bp = /<([\w:]+)/,
      bq = /<tbody/i,
      br = /<|&#?\w+;/,
      bs = /<(?:script|style|link)/i,
      bt = /<(?:script|object|embed|option|style)/i,
      bu = new RegExp("<(?:" + bl + ")[\\s/>]", "i"),
      bv = /^(?:checkbox|radio)$/,
      bw = /checked\s*(?:[^=]|=\s*.checked.)/i,
      bx = /\/(java|ecma)script/i,
      by = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
      bz = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""] },
      bA = bk(e),
      bB = bA.appendChild(e.createElement("div"));bz.optgroup = bz.option, bz.tbody = bz.tfoot = bz.colgroup = bz.caption = bz.thead, bz.th = bz.td, p.support.htmlSerialize || (bz._default = [1, "X<div>", "</div>"]), p.fn.extend({ text: function text(a) {
      return p.access(this, function (a) {
        return a === b ? p.text(this) : this.empty().append((this[0] && this[0].ownerDocument || e).createTextNode(a));
      }, null, a, arguments.length);
    }, wrapAll: function wrapAll(a) {
      if (p.isFunction(a)) return this.each(function (b) {
        p(this).wrapAll(a.call(this, b));
      });if (this[0]) {
        var b = p(a, this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
          var a = this;while (a.firstChild && a.firstChild.nodeType === 1) {
            a = a.firstChild;
          }return a;
        }).append(this);
      }return this;
    }, wrapInner: function wrapInner(a) {
      return p.isFunction(a) ? this.each(function (b) {
        p(this).wrapInner(a.call(this, b));
      }) : this.each(function () {
        var b = p(this),
            c = b.contents();c.length ? c.wrapAll(a) : b.append(a);
      });
    }, wrap: function wrap(a) {
      var b = p.isFunction(a);return this.each(function (c) {
        p(this).wrapAll(b ? a.call(this, c) : a);
      });
    }, unwrap: function unwrap() {
      return this.parent().each(function () {
        p.nodeName(this, "body") || p(this).replaceWith(this.childNodes);
      }).end();
    }, append: function append() {
      return this.domManip(arguments, !0, function (a) {
        (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(a);
      });
    }, prepend: function prepend() {
      return this.domManip(arguments, !0, function (a) {
        (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(a, this.firstChild);
      });
    }, before: function before() {
      if (!bh(this[0])) return this.domManip(arguments, !1, function (a) {
        this.parentNode.insertBefore(a, this);
      });if (arguments.length) {
        var a = p.clean(arguments);return this.pushStack(p.merge(a, this), "before", this.selector);
      }
    }, after: function after() {
      if (!bh(this[0])) return this.domManip(arguments, !1, function (a) {
        this.parentNode.insertBefore(a, this.nextSibling);
      });if (arguments.length) {
        var a = p.clean(arguments);return this.pushStack(p.merge(this, a), "after", this.selector);
      }
    }, remove: function remove(a, b) {
      var c,
          d = 0;for (; (c = this[d]) != null; d++) {
        if (!a || p.filter(a, [c]).length) !b && c.nodeType === 1 && (p.cleanData(c.getElementsByTagName("*")), p.cleanData([c])), c.parentNode && c.parentNode.removeChild(c);
      }return this;
    }, empty: function empty() {
      var a,
          b = 0;for (; (a = this[b]) != null; b++) {
        a.nodeType === 1 && p.cleanData(a.getElementsByTagName("*"));while (a.firstChild) {
          a.removeChild(a.firstChild);
        }
      }return this;
    }, clone: function clone(a, b) {
      return a = a == null ? !1 : a, b = b == null ? a : b, this.map(function () {
        return p.clone(this, a, b);
      });
    }, html: function html(a) {
      return p.access(this, function (a) {
        var c = this[0] || {},
            d = 0,
            e = this.length;if (a === b) return c.nodeType === 1 ? c.innerHTML.replace(bm, "") : b;if (typeof a == "string" && !bs.test(a) && (p.support.htmlSerialize || !bu.test(a)) && (p.support.leadingWhitespace || !bn.test(a)) && !bz[(bp.exec(a) || ["", ""])[1].toLowerCase()]) {
          a = a.replace(bo, "<$1></$2>");try {
            for (; d < e; d++) {
              c = this[d] || {}, c.nodeType === 1 && (p.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
            }c = 0;
          } catch (f) {}
        }c && this.empty().append(a);
      }, null, a, arguments.length);
    }, replaceWith: function replaceWith(a) {
      return bh(this[0]) ? this.length ? this.pushStack(p(p.isFunction(a) ? a() : a), "replaceWith", a) : this : p.isFunction(a) ? this.each(function (b) {
        var c = p(this),
            d = c.html();c.replaceWith(a.call(this, b, d));
      }) : (typeof a != "string" && (a = p(a).detach()), this.each(function () {
        var b = this.nextSibling,
            c = this.parentNode;p(this).remove(), b ? p(b).before(a) : p(c).append(a);
      }));
    }, detach: function detach(a) {
      return this.remove(a, !0);
    }, domManip: function domManip(a, c, d) {
      a = [].concat.apply([], a);var e,
          f,
          g,
          h,
          i = 0,
          j = a[0],
          k = [],
          l = this.length;if (!p.support.checkClone && l > 1 && typeof j == "string" && bw.test(j)) return this.each(function () {
        p(this).domManip(a, c, d);
      });if (p.isFunction(j)) return this.each(function (e) {
        var f = p(this);a[0] = j.call(this, e, c ? f.html() : b), f.domManip(a, c, d);
      });if (this[0]) {
        e = p.buildFragment(a, this, k), g = e.fragment, f = g.firstChild, g.childNodes.length === 1 && (g = f);if (f) {
          c = c && p.nodeName(f, "tr");for (h = e.cacheable || l - 1; i < l; i++) {
            d.call(c && p.nodeName(this[i], "table") ? bC(this[i], "tbody") : this[i], i === h ? g : p.clone(g, !0, !0));
          }
        }g = f = null, k.length && p.each(k, function (a, b) {
          b.src ? p.ajax ? p.ajax({ url: b.src, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 }) : p.error("no ajax") : p.globalEval((b.text || b.textContent || b.innerHTML || "").replace(by, "")), b.parentNode && b.parentNode.removeChild(b);
        });
      }return this;
    } }), p.buildFragment = function (a, c, d) {
    var f,
        g,
        h,
        i = a[0];return c = c || e, c = !c.nodeType && c[0] || c, c = c.ownerDocument || c, a.length === 1 && typeof i == "string" && i.length < 512 && c === e && i.charAt(0) === "<" && !bt.test(i) && (p.support.checkClone || !bw.test(i)) && (p.support.html5Clone || !bu.test(i)) && (g = !0, f = p.fragments[i], h = f !== b), f || (f = c.createDocumentFragment(), p.clean(a, c, f, d), g && (p.fragments[i] = h && f)), { fragment: f, cacheable: g };
  }, p.fragments = {}, p.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) {
    p.fn[a] = function (c) {
      var d,
          e = 0,
          f = [],
          g = p(c),
          h = g.length,
          i = this.length === 1 && this[0].parentNode;if ((i == null || i && i.nodeType === 11 && i.childNodes.length === 1) && h === 1) return g[b](this[0]), this;for (; e < h; e++) {
        d = (e > 0 ? this.clone(!0) : this).get(), p(g[e])[b](d), f = f.concat(d);
      }return this.pushStack(f, a, g.selector);
    };
  }), p.extend({ clone: function clone(a, b, c) {
      var d, e, f, g;p.support.html5Clone || p.isXMLDoc(a) || !bu.test("<" + a.nodeName + ">") ? g = a.cloneNode(!0) : (bB.innerHTML = a.outerHTML, bB.removeChild(g = bB.firstChild));if ((!p.support.noCloneEvent || !p.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !p.isXMLDoc(a)) {
        bE(a, g), d = bF(a), e = bF(g);for (f = 0; d[f]; ++f) {
          e[f] && bE(d[f], e[f]);
        }
      }if (b) {
        bD(a, g);if (c) {
          d = bF(a), e = bF(g);for (f = 0; d[f]; ++f) {
            bD(d[f], e[f]);
          }
        }
      }return d = e = null, g;
    }, clean: function clean(a, b, c, d) {
      var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          q,
          r,
          s = b === e && bA,
          t = [];if (!b || typeof b.createDocumentFragment == "undefined") b = e;for (f = 0; (h = a[f]) != null; f++) {
        typeof h == "number" && (h += "");if (!h) continue;if (typeof h == "string") if (!br.test(h)) h = b.createTextNode(h);else {
          s = s || bk(b), l = b.createElement("div"), s.appendChild(l), h = h.replace(bo, "<$1></$2>"), i = (bp.exec(h) || ["", ""])[1].toLowerCase(), j = bz[i] || bz._default, k = j[0], l.innerHTML = j[1] + h + j[2];while (k--) {
            l = l.lastChild;
          }if (!p.support.tbody) {
            m = bq.test(h), n = i === "table" && !m ? l.firstChild && l.firstChild.childNodes : j[1] === "<table>" && !m ? l.childNodes : [];for (g = n.length - 1; g >= 0; --g) {
              p.nodeName(n[g], "tbody") && !n[g].childNodes.length && n[g].parentNode.removeChild(n[g]);
            }
          }!p.support.leadingWhitespace && bn.test(h) && l.insertBefore(b.createTextNode(bn.exec(h)[0]), l.firstChild), h = l.childNodes, l.parentNode.removeChild(l);
        }h.nodeType ? t.push(h) : p.merge(t, h);
      }l && (h = l = s = null);if (!p.support.appendChecked) for (f = 0; (h = t[f]) != null; f++) {
        p.nodeName(h, "input") ? bG(h) : typeof h.getElementsByTagName != "undefined" && p.grep(h.getElementsByTagName("input"), bG);
      }if (c) {
        q = function q(a) {
          if (!a.type || bx.test(a.type)) return d ? d.push(a.parentNode ? a.parentNode.removeChild(a) : a) : c.appendChild(a);
        };for (f = 0; (h = t[f]) != null; f++) {
          if (!p.nodeName(h, "script") || !q(h)) c.appendChild(h), typeof h.getElementsByTagName != "undefined" && (r = p.grep(p.merge([], h.getElementsByTagName("script")), q), t.splice.apply(t, [f + 1, 0].concat(r)), f += r.length);
        }
      }return t;
    }, cleanData: function cleanData(a, b) {
      var c,
          d,
          e,
          f,
          g = 0,
          h = p.expando,
          i = p.cache,
          j = p.support.deleteExpando,
          k = p.event.special;for (; (e = a[g]) != null; g++) {
        if (b || p.acceptData(e)) {
          d = e[h], c = d && i[d];if (c) {
            if (c.events) for (f in c.events) {
              k[f] ? p.event.remove(e, f) : p.removeEvent(e, f, c.handle);
            }i[d] && (delete i[d], j ? delete e[h] : e.removeAttribute ? e.removeAttribute(h) : e[h] = null, p.deletedIds.push(d));
          }
        }
      }
    } }), function () {
    var a, b;p.uaMatch = function (a) {
      a = a.toLowerCase();var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];return { browser: b[1] || "", version: b[2] || "0" };
    }, a = p.uaMatch(g.userAgent), b = {}, a.browser && (b[a.browser] = !0, b.version = a.version), b.chrome ? b.webkit = !0 : b.webkit && (b.safari = !0), p.browser = b, p.sub = function () {
      function a(b, c) {
        return new a.fn.init(b, c);
      }p.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function c(c, d) {
        return d && d instanceof p && !(d instanceof a) && (d = a(d)), p.fn.init.call(this, c, d, b);
      }, a.fn.init.prototype = a.fn;var b = a(e);return a;
    };
  }();var bH,
      bI,
      bJ,
      bK = /alpha\([^)]*\)/i,
      bL = /opacity=([^)]*)/,
      bM = /^(top|right|bottom|left)$/,
      bN = /^(none|table(?!-c[ea]).+)/,
      bO = /^margin/,
      bP = new RegExp("^(" + q + ")(.*)$", "i"),
      bQ = new RegExp("^(" + q + ")(?!px)[a-z%]+$", "i"),
      bR = new RegExp("^([-+])=(" + q + ")", "i"),
      bS = {},
      bT = { position: "absolute", visibility: "hidden", display: "block" },
      bU = { letterSpacing: 0, fontWeight: 400 },
      bV = ["Top", "Right", "Bottom", "Left"],
      bW = ["Webkit", "O", "Moz", "ms"],
      bX = p.fn.toggle;p.fn.extend({ css: function css(a, c) {
      return p.access(this, function (a, c, d) {
        return d !== b ? p.style(a, c, d) : p.css(a, c);
      }, a, c, arguments.length > 1);
    }, show: function show() {
      return b$(this, !0);
    }, hide: function hide() {
      return b$(this);
    }, toggle: function toggle(a, b) {
      var c = typeof a == "boolean";return p.isFunction(a) && p.isFunction(b) ? bX.apply(this, arguments) : this.each(function () {
        (c ? a : bZ(this)) ? p(this).show() : p(this).hide();
      });
    } }), p.extend({ cssHooks: { opacity: { get: function get(a, b) {
          if (b) {
            var c = bH(a, "opacity");return c === "" ? "1" : c;
          }
        } } }, cssNumber: { fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": p.support.cssFloat ? "cssFloat" : "styleFloat" }, style: function style(a, c, d, e) {
      if (!a || a.nodeType === 3 || a.nodeType === 8 || !a.style) return;var f,
          g,
          h,
          i = p.camelCase(c),
          j = a.style;c = p.cssProps[i] || (p.cssProps[i] = bY(j, i)), h = p.cssHooks[c] || p.cssHooks[i];if (d === b) return h && "get" in h && (f = h.get(a, !1, e)) !== b ? f : j[c];g = typeof d === "undefined" ? "undefined" : _typeof(d), g === "string" && (f = bR.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat(p.css(a, c)), g = "number");if (d == null || g === "number" && isNaN(d)) return;g === "number" && !p.cssNumber[i] && (d += "px");if (!h || !("set" in h) || (d = h.set(a, d, e)) !== b) try {
        j[c] = d;
      } catch (k) {}
    }, css: function css(a, c, d, e) {
      var f,
          g,
          h,
          i = p.camelCase(c);return c = p.cssProps[i] || (p.cssProps[i] = bY(a.style, i)), h = p.cssHooks[c] || p.cssHooks[i], h && "get" in h && (f = h.get(a, !0, e)), f === b && (f = bH(a, c)), f === "normal" && c in bU && (f = bU[c]), d || e !== b ? (g = parseFloat(f), d || p.isNumeric(g) ? g || 0 : f) : f;
    }, swap: function swap(a, b, c) {
      var d,
          e,
          f = {};for (e in b) {
        f[e] = a.style[e], a.style[e] = b[e];
      }d = c.call(a);for (e in b) {
        a.style[e] = f[e];
      }return d;
    } }), a.getComputedStyle ? bH = function bH(b, c) {
    var d,
        e,
        f,
        g,
        h = a.getComputedStyle(b, null),
        i = b.style;return h && (d = h[c], d === "" && !p.contains(b.ownerDocument, b) && (d = p.style(b, c)), bQ.test(d) && bO.test(c) && (e = i.width, f = i.minWidth, g = i.maxWidth, i.minWidth = i.maxWidth = i.width = d, d = h.width, i.width = e, i.minWidth = f, i.maxWidth = g)), d;
  } : e.documentElement.currentStyle && (bH = function bH(a, b) {
    var c,
        d,
        e = a.currentStyle && a.currentStyle[b],
        f = a.style;return e == null && f && f[b] && (e = f[b]), bQ.test(e) && !bM.test(b) && (c = f.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), f.left = b === "fontSize" ? "1em" : e, e = f.pixelLeft + "px", f.left = c, d && (a.runtimeStyle.left = d)), e === "" ? "auto" : e;
  }), p.each(["height", "width"], function (a, b) {
    p.cssHooks[b] = { get: function get(a, c, d) {
        if (c) return a.offsetWidth === 0 && bN.test(bH(a, "display")) ? p.swap(a, bT, function () {
          return cb(a, b, d);
        }) : cb(a, b, d);
      }, set: function set(a, c, d) {
        return b_(a, c, d ? ca(a, b, d, p.support.boxSizing && p.css(a, "boxSizing") === "border-box") : 0);
      } };
  }), p.support.opacity || (p.cssHooks.opacity = { get: function get(a, b) {
      return bL.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : "";
    }, set: function set(a, b) {
      var c = a.style,
          d = a.currentStyle,
          e = p.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
          f = d && d.filter || c.filter || "";c.zoom = 1;if (b >= 1 && p.trim(f.replace(bK, "")) === "" && c.removeAttribute) {
        c.removeAttribute("filter");if (d && !d.filter) return;
      }c.filter = bK.test(f) ? f.replace(bK, e) : f + " " + e;
    } }), p(function () {
    p.support.reliableMarginRight || (p.cssHooks.marginRight = { get: function get(a, b) {
        return p.swap(a, { display: "inline-block" }, function () {
          if (b) return bH(a, "marginRight");
        });
      } }), !p.support.pixelPosition && p.fn.position && p.each(["top", "left"], function (a, b) {
      p.cssHooks[b] = { get: function get(a, c) {
          if (c) {
            var d = bH(a, b);return bQ.test(d) ? p(a).position()[b] + "px" : d;
          }
        } };
    });
  }), p.expr && p.expr.filters && (p.expr.filters.hidden = function (a) {
    return a.offsetWidth === 0 && a.offsetHeight === 0 || !p.support.reliableHiddenOffsets && (a.style && a.style.display || bH(a, "display")) === "none";
  }, p.expr.filters.visible = function (a) {
    return !p.expr.filters.hidden(a);
  }), p.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
    p.cssHooks[a + b] = { expand: function expand(c) {
        var d,
            e = typeof c == "string" ? c.split(" ") : [c],
            f = {};for (d = 0; d < 4; d++) {
          f[a + bV[d] + b] = e[d] || e[d - 2] || e[0];
        }return f;
      } }, bO.test(a) || (p.cssHooks[a + b].set = b_);
  });var cd = /%20/g,
      ce = /\[\]$/,
      cf = /\r?\n/g,
      cg = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
      ch = /^(?:select|textarea)/i;p.fn.extend({ serialize: function serialize() {
      return p.param(this.serializeArray());
    }, serializeArray: function serializeArray() {
      return this.map(function () {
        return this.elements ? p.makeArray(this.elements) : this;
      }).filter(function () {
        return this.name && !this.disabled && (this.checked || ch.test(this.nodeName) || cg.test(this.type));
      }).map(function (a, b) {
        var c = p(this).val();return c == null ? null : p.isArray(c) ? p.map(c, function (a, c) {
          return { name: b.name, value: a.replace(cf, "\r\n") };
        }) : { name: b.name, value: c.replace(cf, "\r\n") };
      }).get();
    } }), p.param = function (a, c) {
    var d,
        e = [],
        f = function f(a, b) {
      b = p.isFunction(b) ? b() : b == null ? "" : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
    };c === b && (c = p.ajaxSettings && p.ajaxSettings.traditional);if (p.isArray(a) || a.jquery && !p.isPlainObject(a)) p.each(a, function () {
      f(this.name, this.value);
    });else for (d in a) {
      ci(d, a[d], c, f);
    }return e.join("&").replace(cd, "+");
  };var cj,
      ck,
      cl = /#.*$/,
      cm = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
      cn = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
      co = /^(?:GET|HEAD)$/,
      cp = /^\/\//,
      cq = /\?/,
      cr = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      cs = /([?&])_=[^&]*/,
      ct = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
      cu = p.fn.load,
      cv = {},
      cw = {},
      cx = ["*/"] + ["*"];try {
    cj = f.href;
  } catch (cy) {
    cj = e.createElement("a"), cj.href = "", cj = cj.href;
  }ck = ct.exec(cj.toLowerCase()) || [], p.fn.load = function (a, c, d) {
    if (typeof a != "string" && cu) return cu.apply(this, arguments);if (!this.length) return this;var e,
        f,
        g,
        h = this,
        i = a.indexOf(" ");return i >= 0 && (e = a.slice(i, a.length), a = a.slice(0, i)), p.isFunction(c) ? (d = c, c = b) : c && (typeof c === "undefined" ? "undefined" : _typeof(c)) == "object" && (f = "POST"), p.ajax({ url: a, type: f, dataType: "html", data: c, complete: function complete(a, b) {
        d && h.each(d, g || [a.responseText, b, a]);
      } }).done(function (a) {
      g = arguments, h.html(e ? p("<div>").append(a.replace(cr, "")).find(e) : a);
    }), this;
  }, p.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
    p.fn[b] = function (a) {
      return this.on(b, a);
    };
  }), p.each(["get", "post"], function (a, c) {
    p[c] = function (a, d, e, f) {
      return p.isFunction(d) && (f = f || e, e = d, d = b), p.ajax({ type: c, url: a, data: d, success: e, dataType: f });
    };
  }), p.extend({ getScript: function getScript(a, c) {
      return p.get(a, b, c, "script");
    }, getJSON: function getJSON(a, b, c) {
      return p.get(a, b, c, "json");
    }, ajaxSetup: function ajaxSetup(a, b) {
      return b ? cB(a, p.ajaxSettings) : (b = a, a = p.ajaxSettings), cB(a, b), a;
    }, ajaxSettings: { url: cj, isLocal: cn.test(ck[1]), global: !0, type: "GET", contentType: "application/x-www-form-urlencoded; charset=UTF-8", processData: !0, async: !0, accepts: { xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript", "*": cx }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText" }, converters: { "* text": a.String, "text html": !0, "text json": p.parseJSON, "text xml": p.parseXML }, flatOptions: { context: !0, url: !0 } }, ajaxPrefilter: cz(cv), ajaxTransport: cz(cw), ajax: function ajax(a, c) {
      function y(a, c, f, i) {
        var k,
            s,
            t,
            u,
            w,
            y = c;if (v === 2) return;v = 2, h && clearTimeout(h), g = b, e = i || "", x.readyState = a > 0 ? 4 : 0, f && (u = cC(l, x, f));if (a >= 200 && a < 300 || a === 304) l.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (p.lastModified[d] = w), w = x.getResponseHeader("Etag"), w && (p.etag[d] = w)), a === 304 ? (y = "notmodified", k = !0) : (k = cD(l, u), y = k.state, s = k.data, t = k.error, k = !t);else {
          t = y;if (!y || a) y = "error", a < 0 && (a = 0);
        }x.status = a, x.statusText = "" + (c || y), k ? o.resolveWith(m, [s, y, x]) : o.rejectWith(m, [x, y, t]), x.statusCode(r), r = b, j && n.trigger("ajax" + (k ? "Success" : "Error"), [x, l, k ? s : t]), q.fireWith(m, [x, y]), j && (n.trigger("ajaxComplete", [x, l]), --p.active || p.event.trigger("ajaxStop"));
      }(typeof a === "undefined" ? "undefined" : _typeof(a)) == "object" && (c = a, a = b), c = c || {};var d,
          e,
          f,
          g,
          h,
          i,
          j,
          k,
          l = p.ajaxSetup({}, c),
          m = l.context || l,
          n = m !== l && (m.nodeType || m instanceof p) ? p(m) : p.event,
          o = p.Deferred(),
          q = p.Callbacks("once memory"),
          r = l.statusCode || {},
          t = {},
          u = {},
          v = 0,
          w = "canceled",
          x = { readyState: 0, setRequestHeader: function setRequestHeader(a, b) {
          if (!v) {
            var c = a.toLowerCase();a = u[c] = u[c] || a, t[a] = b;
          }return this;
        }, getAllResponseHeaders: function getAllResponseHeaders() {
          return v === 2 ? e : null;
        }, getResponseHeader: function getResponseHeader(a) {
          var c;if (v === 2) {
            if (!f) {
              f = {};while (c = cm.exec(e)) {
                f[c[1].toLowerCase()] = c[2];
              }
            }c = f[a.toLowerCase()];
          }return c === b ? null : c;
        }, overrideMimeType: function overrideMimeType(a) {
          return v || (l.mimeType = a), this;
        }, abort: function abort(a) {
          return a = a || w, g && g.abort(a), y(0, a), this;
        } };o.promise(x), x.success = x.done, x.error = x.fail, x.complete = q.add, x.statusCode = function (a) {
        if (a) {
          var b;if (v < 2) for (b in a) {
            r[b] = [r[b], a[b]];
          } else b = a[x.status], x.always(b);
        }return this;
      }, l.url = ((a || l.url) + "").replace(cl, "").replace(cp, ck[1] + "//"), l.dataTypes = p.trim(l.dataType || "*").toLowerCase().split(s), l.crossDomain == null && (i = ct.exec(l.url.toLowerCase()), l.crossDomain = !(!i || i[1] == ck[1] && i[2] == ck[2] && (i[3] || (i[1] === "http:" ? 80 : 443)) == (ck[3] || (ck[1] === "http:" ? 80 : 443)))), l.data && l.processData && typeof l.data != "string" && (l.data = p.param(l.data, l.traditional)), cA(cv, l, c, x);if (v === 2) return x;j = l.global, l.type = l.type.toUpperCase(), l.hasContent = !co.test(l.type), j && p.active++ === 0 && p.event.trigger("ajaxStart");if (!l.hasContent) {
        l.data && (l.url += (cq.test(l.url) ? "&" : "?") + l.data, delete l.data), d = l.url;if (l.cache === !1) {
          var z = p.now(),
              A = l.url.replace(cs, "$1_=" + z);l.url = A + (A === l.url ? (cq.test(l.url) ? "&" : "?") + "_=" + z : "");
        }
      }(l.data && l.hasContent && l.contentType !== !1 || c.contentType) && x.setRequestHeader("Content-Type", l.contentType), l.ifModified && (d = d || l.url, p.lastModified[d] && x.setRequestHeader("If-Modified-Since", p.lastModified[d]), p.etag[d] && x.setRequestHeader("If-None-Match", p.etag[d])), x.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + (l.dataTypes[0] !== "*" ? ", " + cx + "; q=0.01" : "") : l.accepts["*"]);for (k in l.headers) {
        x.setRequestHeader(k, l.headers[k]);
      }if (!l.beforeSend || l.beforeSend.call(m, x, l) !== !1 && v !== 2) {
        w = "abort";for (k in { success: 1, error: 1, complete: 1 }) {
          x[k](l[k]);
        }g = cA(cw, l, c, x);if (!g) y(-1, "No Transport");else {
          x.readyState = 1, j && n.trigger("ajaxSend", [x, l]), l.async && l.timeout > 0 && (h = setTimeout(function () {
            x.abort("timeout");
          }, l.timeout));try {
            v = 1, g.send(t, y);
          } catch (B) {
            if (v < 2) y(-1, B);else throw B;
          }
        }return x;
      }return x.abort();
    }, active: 0, lastModified: {}, etag: {} });var cE = [],
      cF = /\?/,
      cG = /(=)\?(?=&|$)|\?\?/,
      cH = p.now();p.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
      var a = cE.pop() || p.expando + "_" + cH++;return this[a] = !0, a;
    } }), p.ajaxPrefilter("json jsonp", function (c, d, e) {
    var f,
        g,
        h,
        i = c.data,
        j = c.url,
        k = c.jsonp !== !1,
        l = k && cG.test(j),
        m = k && !l && typeof i == "string" && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && cG.test(i);if (c.dataTypes[0] === "jsonp" || l || m) return f = c.jsonpCallback = p.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, g = a[f], l ? c.url = j.replace(cG, "$1" + f) : m ? c.data = i.replace(cG, "$1" + f) : k && (c.url += (cF.test(j) ? "&" : "?") + c.jsonp + "=" + f), c.converters["script json"] = function () {
      return h || p.error(f + " was not called"), h[0];
    }, c.dataTypes[0] = "json", a[f] = function () {
      h = arguments;
    }, e.always(function () {
      a[f] = g, c[f] && (c.jsonpCallback = d.jsonpCallback, cE.push(f)), h && p.isFunction(g) && g(h[0]), h = g = b;
    }), "script";
  }), p.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /javascript|ecmascript/ }, converters: { "text script": function textScript(a) {
        return p.globalEval(a), a;
      } } }), p.ajaxPrefilter("script", function (a) {
    a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1);
  }), p.ajaxTransport("script", function (a) {
    if (a.crossDomain) {
      var c,
          d = e.head || e.getElementsByTagName("head")[0] || e.documentElement;return { send: function send(f, g) {
          c = e.createElement("script"), c.async = "async", a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function (a, e) {
            if (e || !c.readyState || /loaded|complete/.test(c.readyState)) c.onload = c.onreadystatechange = null, d && c.parentNode && d.removeChild(c), c = b, e || g(200, "success");
          }, d.insertBefore(c, d.firstChild);
        }, abort: function abort() {
          c && c.onload(0, 1);
        } };
    }
  });var cI,
      cJ = a.ActiveXObject ? function () {
    for (var a in cI) {
      cI[a](0, 1);
    }
  } : !1,
      cK = 0;p.ajaxSettings.xhr = a.ActiveXObject ? function () {
    return !this.isLocal && cL() || cM();
  } : cL, function (a) {
    p.extend(p.support, { ajax: !!a, cors: !!a && "withCredentials" in a });
  }(p.ajaxSettings.xhr()), p.support.ajax && p.ajaxTransport(function (c) {
    if (!c.crossDomain || p.support.cors) {
      var _d;return { send: function send(e, f) {
          var g,
              h,
              i = c.xhr();c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async);if (c.xhrFields) for (h in c.xhrFields) {
            i[h] = c.xhrFields[h];
          }c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");try {
            for (h in e) {
              i.setRequestHeader(h, e[h]);
            }
          } catch (j) {}i.send(c.hasContent && c.data || null), _d = function d(a, e) {
            var h, j, k, l, m;try {
              if (_d && (e || i.readyState === 4)) {
                _d = b, g && (i.onreadystatechange = p.noop, cJ && delete cI[g]);if (e) i.readyState !== 4 && i.abort();else {
                  h = i.status, k = i.getAllResponseHeaders(), l = {}, m = i.responseXML, m && m.documentElement && (l.xml = m);try {
                    l.text = i.responseText;
                  } catch (a) {}try {
                    j = i.statusText;
                  } catch (n) {
                    j = "";
                  }!h && c.isLocal && !c.crossDomain ? h = l.text ? 200 : 404 : h === 1223 && (h = 204);
                }
              }
            } catch (o) {
              e || f(-1, o);
            }l && f(h, j, l, k);
          }, c.async ? i.readyState === 4 ? setTimeout(_d, 0) : (g = ++cK, cJ && (cI || (cI = {}, p(a).unload(cJ)), cI[g] = _d), i.onreadystatechange = _d) : _d();
        }, abort: function abort() {
          _d && _d(0, 1);
        } };
    }
  });var cN,
      cO,
      cP = /^(?:toggle|show|hide)$/,
      cQ = new RegExp("^(?:([-+])=|)(" + q + ")([a-z%]*)$", "i"),
      cR = /queueHooks$/,
      cS = [cY],
      cT = { "*": [function (a, b) {
      var c,
          d,
          e,
          f = this.createTween(a, b),
          g = cQ.exec(b),
          h = f.cur(),
          i = +h || 0,
          j = 1;if (g) {
        c = +g[2], d = g[3] || (p.cssNumber[a] ? "" : "px");if (d !== "px" && i) {
          i = p.css(f.elem, a, !0) || c || 1;do {
            e = j = j || ".5", i = i / j, p.style(f.elem, a, i + d), j = f.cur() / h;
          } while (j !== 1 && j !== e);
        }f.unit = d, f.start = i, f.end = g[1] ? i + (g[1] + 1) * c : c;
      }return f;
    }] };p.Animation = p.extend(cW, { tweener: function tweener(a, b) {
      p.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");var c,
          d = 0,
          e = a.length;for (; d < e; d++) {
        c = a[d], cT[c] = cT[c] || [], cT[c].unshift(b);
      }
    }, prefilter: function prefilter(a, b) {
      b ? cS.unshift(a) : cS.push(a);
    } }), p.Tween = cZ, cZ.prototype = { constructor: cZ, init: function init(a, b, c, d, e, f) {
      this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (p.cssNumber[c] ? "" : "px");
    }, cur: function cur() {
      var a = cZ.propHooks[this.prop];return a && a.get ? a.get(this) : cZ.propHooks._default.get(this);
    }, run: function run(a) {
      var b,
          c = cZ.propHooks[this.prop];return this.options.duration ? this.pos = b = p.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : cZ.propHooks._default.set(this), this;
    } }, cZ.prototype.init.prototype = cZ.prototype, cZ.propHooks = { _default: { get: function get(a) {
        var b;return a.elem[a.prop] == null || !!a.elem.style && a.elem.style[a.prop] != null ? (b = p.css(a.elem, a.prop, !1, ""), !b || b === "auto" ? 0 : b) : a.elem[a.prop];
      }, set: function set(a) {
        p.fx.step[a.prop] ? p.fx.step[a.prop](a) : a.elem.style && (a.elem.style[p.cssProps[a.prop]] != null || p.cssHooks[a.prop]) ? p.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now;
      } } }, cZ.propHooks.scrollTop = cZ.propHooks.scrollLeft = { set: function set(a) {
      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
    } }, p.each(["toggle", "show", "hide"], function (a, b) {
    var c = p.fn[b];p.fn[b] = function (d, e, f) {
      return d == null || typeof d == "boolean" || !a && p.isFunction(d) && p.isFunction(e) ? c.apply(this, arguments) : this.animate(c$(b, !0), d, e, f);
    };
  }), p.fn.extend({ fadeTo: function fadeTo(a, b, c, d) {
      return this.filter(bZ).css("opacity", 0).show().end().animate({ opacity: b }, a, c, d);
    }, animate: function animate(a, b, c, d) {
      var e = p.isEmptyObject(a),
          f = p.speed(b, c, d),
          g = function g() {
        var b = cW(this, p.extend({}, a), f);e && b.stop(!0);
      };return e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
    }, stop: function stop(a, c, d) {
      var e = function e(a) {
        var b = a.stop;delete a.stop, b(d);
      };return typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function () {
        var b = !0,
            c = a != null && a + "queueHooks",
            f = p.timers,
            g = p._data(this);if (c) g[c] && g[c].stop && e(g[c]);else for (c in g) {
          g[c] && g[c].stop && cR.test(c) && e(g[c]);
        }for (c = f.length; c--;) {
          f[c].elem === this && (a == null || f[c].queue === a) && (f[c].anim.stop(d), b = !1, f.splice(c, 1));
        }(b || !d) && p.dequeue(this, a);
      });
    } }), p.each({ slideDown: c$("show"), slideUp: c$("hide"), slideToggle: c$("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (a, b) {
    p.fn[a] = function (a, c, d) {
      return this.animate(b, a, c, d);
    };
  }), p.speed = function (a, b, c) {
    var d = a && (typeof a === "undefined" ? "undefined" : _typeof(a)) == "object" ? p.extend({}, a) : { complete: c || !c && b || p.isFunction(a) && a, duration: a, easing: c && b || b && !p.isFunction(b) && b };d.duration = p.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in p.fx.speeds ? p.fx.speeds[d.duration] : p.fx.speeds._default;if (d.queue == null || d.queue === !0) d.queue = "fx";return d.old = d.complete, d.complete = function () {
      p.isFunction(d.old) && d.old.call(this), d.queue && p.dequeue(this, d.queue);
    }, d;
  }, p.easing = { linear: function linear(a) {
      return a;
    }, swing: function swing(a) {
      return .5 - Math.cos(a * Math.PI) / 2;
    } }, p.timers = [], p.fx = cZ.prototype.init, p.fx.tick = function () {
    var a,
        b = p.timers,
        c = 0;for (; c < b.length; c++) {
      a = b[c], !a() && b[c] === a && b.splice(c--, 1);
    }b.length || p.fx.stop();
  }, p.fx.timer = function (a) {
    a() && p.timers.push(a) && !cO && (cO = setInterval(p.fx.tick, p.fx.interval));
  }, p.fx.interval = 13, p.fx.stop = function () {
    clearInterval(cO), cO = null;
  }, p.fx.speeds = { slow: 600, fast: 200, _default: 400 }, p.fx.step = {}, p.expr && p.expr.filters && (p.expr.filters.animated = function (a) {
    return p.grep(p.timers, function (b) {
      return a === b.elem;
    }).length;
  });var c_ = /^(?:body|html)$/i;p.fn.offset = function (a) {
    if (arguments.length) return a === b ? this : this.each(function (b) {
      p.offset.setOffset(this, a, b);
    });var c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m = this[0],
        n = m && m.ownerDocument;if (!n) return;return (e = n.body) === m ? p.offset.bodyOffset(m) : (d = n.documentElement, p.contains(d, m) ? (c = m.getBoundingClientRect(), f = da(n), g = d.clientTop || e.clientTop || 0, h = d.clientLeft || e.clientLeft || 0, i = f.pageYOffset || d.scrollTop, j = f.pageXOffset || d.scrollLeft, k = c.top + i - g, l = c.left + j - h, { top: k, left: l }) : { top: 0, left: 0 });
  }, p.offset = { bodyOffset: function bodyOffset(a) {
      var b = a.offsetTop,
          c = a.offsetLeft;return p.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(p.css(a, "marginTop")) || 0, c += parseFloat(p.css(a, "marginLeft")) || 0), { top: b, left: c };
    }, setOffset: function setOffset(a, b, c) {
      var d = p.css(a, "position");d === "static" && (a.style.position = "relative");var e = p(a),
          f = e.offset(),
          g = p.css(a, "top"),
          h = p.css(a, "left"),
          i = (d === "absolute" || d === "fixed") && p.inArray("auto", [g, h]) > -1,
          j = {},
          k = {},
          l,
          m;i ? (k = e.position(), l = k.top, m = k.left) : (l = parseFloat(g) || 0, m = parseFloat(h) || 0), p.isFunction(b) && (b = b.call(a, c, f)), b.top != null && (j.top = b.top - f.top + l), b.left != null && (j.left = b.left - f.left + m), "using" in b ? b.using.call(a, j) : e.css(j);
    } }, p.fn.extend({ position: function position() {
      if (!this[0]) return;var a = this[0],
          b = this.offsetParent(),
          c = this.offset(),
          d = c_.test(b[0].nodeName) ? { top: 0, left: 0 } : b.offset();return c.top -= parseFloat(p.css(a, "marginTop")) || 0, c.left -= parseFloat(p.css(a, "marginLeft")) || 0, d.top += parseFloat(p.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(p.css(b[0], "borderLeftWidth")) || 0, { top: c.top - d.top, left: c.left - d.left };
    }, offsetParent: function offsetParent() {
      return this.map(function () {
        var a = this.offsetParent || e.body;while (a && !c_.test(a.nodeName) && p.css(a, "position") === "static") {
          a = a.offsetParent;
        }return a || e.body;
      });
    } }), p.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (a, c) {
    var d = /Y/.test(c);p.fn[a] = function (e) {
      return p.access(this, function (a, e, f) {
        var g = da(a);if (f === b) return g ? c in g ? g[c] : g.document.documentElement[e] : a[e];g ? g.scrollTo(d ? p(g).scrollLeft() : f, d ? f : p(g).scrollTop()) : a[e] = f;
      }, a, e, arguments.length, null);
    };
  }), p.each({ Height: "height", Width: "width" }, function (a, c) {
    p.each({ padding: "inner" + a, content: c, "": "outer" + a }, function (d, e) {
      p.fn[e] = function (e, f) {
        var g = arguments.length && (d || typeof e != "boolean"),
            h = d || (e === !0 || f === !0 ? "margin" : "border");return p.access(this, function (c, d, e) {
          var f;return p.isWindow(c) ? c.document.documentElement["client" + a] : c.nodeType === 9 ? (f = c.documentElement, Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? p.css(c, d, e, h) : p.style(c, d, e, h);
        }, c, g ? e : b, g, null);
      };
    });
  }), a.jQuery = a.$ = p, "function" == "function" && __webpack_require__(128) && __webpack_require__(128).jQuery && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
    return p;
  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
})(window);

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * jQuery Plugin: Tokenizing Autocomplete Text Entry
 * Version 1.6.2
 *
 * Copyright (c) 2009 James Smith (http://loopj.com)
 * Licensed jointly under the GPL and MIT licenses,
 * choose which one suits your project best!
 *
 */
(function ($) {
    var DEFAULT_SETTINGS = {
        // Search settings
        method: "GET",
        queryParam: "q",
        searchDelay: 300,
        minChars: 1,
        propertyToSearch: "name",
        jsonContainer: null,
        contentType: "json",
        excludeCurrent: false,
        excludeCurrentParameter: "x",

        // Prepopulation settings
        prePopulate: null,
        processPrePopulate: false,

        // Display settings
        hintText: "Type in a search term",
        noResultsText: "No results",
        searchingText: "Searching...",
        deleteText: "&#215;",
        animateDropdown: true,
        placeholder: null,
        theme: null,
        zindex: 999,
        resultsLimit: null,

        enableHTML: false,

        resultsFormatter: function resultsFormatter(item) {
            var string = item[this.propertyToSearch];
            return "<li>" + (this.enableHTML ? string : _escapeHTML(string)) + "</li>";
        },

        tokenFormatter: function tokenFormatter(item) {
            var string = item[this.propertyToSearch];
            return "<li><p>" + (this.enableHTML ? string : _escapeHTML(string)) + "</p></li>";
        },

        // Tokenization settings
        tokenLimit: null,
        tokenDelimiter: ",",
        preventDuplicates: false,
        tokenValue: "id",

        // Behavioral settings
        allowFreeTagging: false,
        allowTabOut: false,
        autoSelectFirstResult: false,

        // Callbacks
        onResult: null,
        onCachedResult: null,
        onAdd: null,
        onFreeTaggingAdd: null,
        onDelete: null,
        onReady: null,

        // Other settings
        idPrefix: "token-input-",

        // Keep track if the input is currently in disabled mode
        disabled: false
    };

    // Default classes to use when theming
    var DEFAULT_CLASSES = {
        tokenList: "token-input-list",
        token: "token-input-token",
        tokenReadOnly: "token-input-token-readonly",
        tokenDelete: "token-input-delete-token",
        selectedToken: "token-input-selected-token",
        highlightedToken: "token-input-highlighted-token",
        dropdown: "token-input-dropdown",
        dropdownItem: "token-input-dropdown-item",
        dropdownItem2: "token-input-dropdown-item2",
        selectedDropdownItem: "token-input-selected-dropdown-item",
        inputToken: "token-input-input-token",
        focused: "token-input-focused",
        disabled: "token-input-disabled"
    };

    // Input box position "enum"
    var POSITION = {
        BEFORE: 0,
        AFTER: 1,
        END: 2
    };

    // Keys "enum"
    var KEY = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        ESCAPE: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        NUMPAD_ENTER: 108,
        COMMA: 188
    };

    var HTML_ESCAPES = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;"
    };

    var HTML_ESCAPE_CHARS = /[&<>"'\/]/g;

    function coerceToString(val) {
        return String(val === null || val === undefined ? "" : val);
    }

    function _escapeHTML(text) {
        return coerceToString(text).replace(HTML_ESCAPE_CHARS, function (match) {
            return HTML_ESCAPES[match];
        });
    }

    // Additional public (exposed) methods
    var methods = {
        init: function init(url_or_data_or_function, options) {
            var settings = $.extend({}, DEFAULT_SETTINGS, options || {});

            return this.each(function () {
                $(this).data("settings", settings);
                $(this).data("tokenInputObject", new $.TokenList(this, url_or_data_or_function, settings));
            });
        },
        clear: function clear() {
            this.data("tokenInputObject").clear();
            return this;
        },
        add: function add(item) {
            this.data("tokenInputObject").add(item);
            return this;
        },
        remove: function remove(item) {
            this.data("tokenInputObject").remove(item);
            return this;
        },
        get: function get() {
            return this.data("tokenInputObject").getTokens();
        },
        toggleDisabled: function toggleDisabled(disable) {
            this.data("tokenInputObject").toggleDisabled(disable);
            return this;
        },
        setOptions: function setOptions(options) {
            $(this).data("settings", $.extend({}, $(this).data("settings"), options || {}));
            return this;
        },
        destroy: function destroy() {
            if (this.data("tokenInputObject")) {
                this.data("tokenInputObject").clear();
                var tmpInput = this;
                var closest = this.parent();
                closest.empty();
                tmpInput.show();
                closest.append(tmpInput);
                return tmpInput;
            }
        }
    };

    // Expose the .tokenInput function to jQuery as a plugin
    $.fn.tokenInput = function (method) {
        // Method calling and initialization logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            return methods.init.apply(this, arguments);
        }
    };

    // TokenList class for each input
    $.TokenList = function (input, url_or_data, settings) {
        //
        // Initialization
        //

        // Configure the data source
        if (typeof url_or_data === "string" || typeof url_or_data === "function") {
            // Set the url to query against
            $(input).data("settings").url = url_or_data;

            // If the URL is a function, evaluate it here to do our initalization work
            var url = computeURL();

            // Make a smart guess about cross-domain if it wasn't explicitly specified
            if ($(input).data("settings").crossDomain === undefined && typeof url === "string") {
                if (url.indexOf("://") === -1) {
                    $(input).data("settings").crossDomain = false;
                } else {
                    $(input).data("settings").crossDomain = location.href.split(/\/+/g)[1] !== url.split(/\/+/g)[1];
                }
            }
        } else if ((typeof url_or_data === "undefined" ? "undefined" : _typeof(url_or_data)) === "object") {
            // Set the local data to search through
            $(input).data("settings").local_data = url_or_data;
        }

        // Build class names
        if ($(input).data("settings").classes) {
            // Use custom class names
            $(input).data("settings").classes = $.extend({}, DEFAULT_CLASSES, $(input).data("settings").classes);
        } else if ($(input).data("settings").theme) {
            // Use theme-suffixed default class names
            $(input).data("settings").classes = {};
            $.each(DEFAULT_CLASSES, function (key, value) {
                $(input).data("settings").classes[key] = value + "-" + $(input).data("settings").theme;
            });
        } else {
            $(input).data("settings").classes = DEFAULT_CLASSES;
        }

        // Save the tokens
        var saved_tokens = [];

        // Keep track of the number of tokens in the list
        var token_count = 0;

        // Basic cache to save on db hits
        var cache = new $.TokenList.Cache();

        // Keep track of the timeout, old vals
        var timeout;
        var input_val;

        // Create a new text input an attach keyup events
        var input_box = $('<input type="text" autocomplete="off" autocapitalize="off"/>').css({
            outline: "none"
        }).attr("id", $(input).data("settings").idPrefix + input.id).focus(function () {
            if ($(input).data("settings").disabled) {
                return false;
            } else if ($(input).data("settings").tokenLimit === null || $(input).data("settings").tokenLimit !== token_count) {
                show_dropdown_hint();
            }
            token_list.addClass($(input).data("settings").classes.focused);
        }).blur(function () {
            hide_dropdown();

            if ($(input).data("settings").allowFreeTagging) {
                add_freetagging_tokens();
            }

            $(this).val("");
            token_list.removeClass($(input).data("settings").classes.focused);
        }).bind("keyup keydown blur update", resize_input).keydown(function (event) {
            var previous_token;
            var next_token;

            switch (event.keyCode) {
                case KEY.LEFT:
                case KEY.RIGHT:
                case KEY.UP:
                case KEY.DOWN:
                    if (this.value.length === 0) {
                        previous_token = input_token.prev();
                        next_token = input_token.next();

                        if (previous_token.length && previous_token.get(0) === selected_token || next_token.length && next_token.get(0) === selected_token) {
                            // Check if there is a previous/next token and it is selected
                            if (event.keyCode === KEY.LEFT || event.keyCode === KEY.UP) {
                                deselect_token($(selected_token), POSITION.BEFORE);
                            } else {
                                deselect_token($(selected_token), POSITION.AFTER);
                            }
                        } else if ((event.keyCode === KEY.LEFT || event.keyCode === KEY.UP) && previous_token.length) {
                            // We are moving left, select the previous token if it exists
                            select_token($(previous_token.get(0)));
                        } else if ((event.keyCode === KEY.RIGHT || event.keyCode === KEY.DOWN) && next_token.length) {
                            // We are moving right, select the next token if it exists
                            select_token($(next_token.get(0)));
                        }
                    } else {
                        var dropdown_item = null;

                        if (event.keyCode === KEY.DOWN || event.keyCode === KEY.RIGHT) {
                            dropdown_item = $(dropdown).find("li").first();

                            if (selected_dropdown_item) {
                                dropdown_item = $(selected_dropdown_item).next();
                            }
                        } else {
                            dropdown_item = $(dropdown).find("li").last();

                            if (selected_dropdown_item) {
                                dropdown_item = $(selected_dropdown_item).prev();
                            }
                        }

                        select_dropdown_item(dropdown_item);
                    }

                    break;

                case KEY.BACKSPACE:
                    previous_token = input_token.prev();

                    if (this.value.length === 0) {
                        if (selected_token) {
                            delete_token($(selected_token));
                            hiddenInput.change();
                        } else if (previous_token.length) {
                            select_token($(previous_token.get(0)));
                        }

                        return false;
                    } else if ($(this).val().length === 1) {
                        hide_dropdown();
                    } else {
                        // set a timeout just long enough to let this function finish.
                        setTimeout(function () {
                            do_search();
                        }, 5);
                    }
                    break;

                case KEY.TAB:
                case KEY.ENTER:
                case KEY.NUMPAD_ENTER:
                case KEY.COMMA:
                    if (selected_dropdown_item) {
                        add_token($(selected_dropdown_item).data("tokeninput"));
                        hiddenInput.change();
                    } else {
                        if ($(input).data("settings").allowFreeTagging) {
                            if ($(input).data("settings").allowTabOut && $(this).val() === "") {
                                return true;
                            } else {
                                add_freetagging_tokens();
                            }
                        } else {
                            $(this).val("");
                            if ($(input).data("settings").allowTabOut) {
                                return true;
                            }
                        }
                        event.stopPropagation();
                        event.preventDefault();
                    }
                    return false;

                case KEY.ESCAPE:
                    hide_dropdown();
                    return true;

                default:
                    if (String.fromCharCode(event.which)) {
                        // set a timeout just long enough to let this function finish.
                        setTimeout(function () {
                            do_search();
                        }, 5);
                    }
                    break;
            }
        });

        // Keep reference for placeholder
        if (settings.placeholder) {
            input_box.attr("placeholder", settings.placeholder);
        }

        // Keep a reference to the original input box
        var hiddenInput = $(input).hide().val("").focus(function () {
            focusWithTimeout(input_box);
        }).blur(function () {
            input_box.blur();

            //return the object to this can be referenced in the callback functions.
            return hiddenInput;
        });

        // Keep a reference to the selected token and dropdown item
        var selected_token = null;
        var selected_token_index = 0;
        var selected_dropdown_item = null;

        // The list to store the token items in
        var token_list = $("<ul />").addClass($(input).data("settings").classes.tokenList).click(function (event) {
            var li = $(event.target).closest("li");
            if (li && li.get(0) && $.data(li.get(0), "tokeninput")) {
                toggle_select_token(li);
            } else {
                // Deselect selected token
                if (selected_token) {
                    deselect_token($(selected_token), POSITION.END);
                }

                // Focus input box
                focusWithTimeout(input_box);
            }
        }).mouseover(function (event) {
            var li = $(event.target).closest("li");
            if (li && selected_token !== this) {
                li.addClass($(input).data("settings").classes.highlightedToken);
            }
        }).mouseout(function (event) {
            var li = $(event.target).closest("li");
            if (li && selected_token !== this) {
                li.removeClass($(input).data("settings").classes.highlightedToken);
            }
        }).insertBefore(hiddenInput);

        // The token holding the input box
        var input_token = $("<li />").addClass($(input).data("settings").classes.inputToken).appendTo(token_list).append(input_box);

        // The list to store the dropdown items in
        var dropdown = $("<div/>").addClass($(input).data("settings").classes.dropdown).appendTo("body").hide();

        // Magic element to help us resize the text input
        var input_resizer = $("<tester/>").insertAfter(input_box).css({
            position: "absolute",
            top: -9999,
            left: -9999,
            width: "auto",
            fontSize: input_box.css("fontSize"),
            fontFamily: input_box.css("fontFamily"),
            fontWeight: input_box.css("fontWeight"),
            letterSpacing: input_box.css("letterSpacing"),
            whiteSpace: "nowrap"
        });

        // Pre-populate list if items exist
        hiddenInput.val("");
        var li_data = $(input).data("settings").prePopulate || hiddenInput.data("pre");

        if ($(input).data("settings").processPrePopulate && $.isFunction($(input).data("settings").onResult)) {
            li_data = $(input).data("settings").onResult.call(hiddenInput, li_data);
        }

        if (li_data && li_data.length) {
            $.each(li_data, function (index, value) {
                insert_token(value);
                checkTokenLimit();
                input_box.attr("placeholder", null);
            });
        }

        // Check if widget should initialize as disabled
        if ($(input).data("settings").disabled) {
            toggleDisabled(true);
        }

        // Initialization is done
        if (typeof $(input).data("settings").onReady === "function") {
            $(input).data("settings").onReady.call();
        }

        //
        // Public functions
        //

        this.clear = function () {
            token_list.children("li").each(function () {
                if ($(this).children("input").length === 0) {
                    delete_token($(this));
                }
            });
        };

        this.add = function (item) {
            add_token(item);
        };

        this.remove = function (item) {
            token_list.children("li").each(function () {
                if ($(this).children("input").length === 0) {
                    var currToken = $(this).data("tokeninput");
                    var match = true;
                    for (var prop in item) {
                        if (item[prop] !== currToken[prop]) {
                            match = false;
                            break;
                        }
                    }
                    if (match) {
                        delete_token($(this));
                    }
                }
            });
        };

        this.getTokens = function () {
            return saved_tokens;
        };

        this.toggleDisabled = function (disable) {
            toggleDisabled(disable);
        };

        // Resize input to maximum width so the placeholder can be seen
        resize_input();

        //
        // Private functions
        //

        function escapeHTML(text) {
            return $(input).data("settings").enableHTML ? text : _escapeHTML(text);
        }

        // Toggles the widget between enabled and disabled state, or according
        // to the [disable] parameter.
        function toggleDisabled(disable) {
            if (typeof disable === "boolean") {
                $(input).data("settings").disabled = disable;
            } else {
                $(input).data("settings").disabled = !$(input).data("settings").disabled;
            }
            input_box.attr("disabled", $(input).data("settings").disabled);
            token_list.toggleClass($(input).data("settings").classes.disabled, $(input).data("settings").disabled);
            // if there is any token selected we deselect it
            if (selected_token) {
                deselect_token($(selected_token), POSITION.END);
            }
            hiddenInput.attr("disabled", $(input).data("settings").disabled);
        }

        function checkTokenLimit() {
            if ($(input).data("settings").tokenLimit !== null && token_count >= $(input).data("settings").tokenLimit) {
                input_box.hide();
                hide_dropdown();
                return;
            }
        }

        function resize_input() {
            if (input_val === (input_val = input_box.val())) {
                return;
            }

            // Get width left on the current line
            var width_left = token_list.width() - input_box.offset().left - token_list.offset().left;
            // Enter new content into resizer and resize input accordingly
            input_resizer.html(_escapeHTML(input_val) || _escapeHTML(settings.placeholder));
            // Get maximum width, minimum the size of input and maximum the widget's width
            input_box.width(Math.min(token_list.width(), Math.max(width_left, input_resizer.width() + 30)));
        }

        function add_freetagging_tokens() {
            var value = $.trim(input_box.val());
            var tokens = value.split($(input).data("settings").tokenDelimiter);
            $.each(tokens, function (i, token) {
                if (!token) {
                    return;
                }

                if ($.isFunction($(input).data("settings").onFreeTaggingAdd)) {
                    token = $(input).data("settings").onFreeTaggingAdd.call(hiddenInput, token);
                }
                var object = {};
                object[$(input).data("settings").tokenValue] = object[$(input).data("settings").propertyToSearch] = token;
                add_token(object);
            });
        }

        // Inner function to a token to the list
        function insert_token(item) {
            var $this_token = $($(input).data("settings").tokenFormatter(item));
            var readonly = item.readonly === true;

            if (readonly) $this_token.addClass($(input).data("settings").classes.tokenReadOnly);

            $this_token.addClass($(input).data("settings").classes.token).insertBefore(input_token);

            // The 'delete token' button
            if (!readonly) {
                $("<span>" + $(input).data("settings").deleteText + "</span>").addClass($(input).data("settings").classes.tokenDelete).appendTo($this_token).click(function () {
                    if (!$(input).data("settings").disabled) {
                        delete_token($(this).parent());
                        hiddenInput.change();
                        return false;
                    }
                });
            }

            // Store data on the token
            var token_data = item;
            $.data($this_token.get(0), "tokeninput", item);

            // Save this token for duplicate checking
            saved_tokens = saved_tokens.slice(0, selected_token_index).concat([token_data]).concat(saved_tokens.slice(selected_token_index));
            selected_token_index++;

            // Update the hidden input
            update_hiddenInput(saved_tokens, hiddenInput);

            token_count += 1;

            // Check the token limit
            if ($(input).data("settings").tokenLimit !== null && token_count >= $(input).data("settings").tokenLimit) {
                input_box.hide();
                hide_dropdown();
            }

            return $this_token;
        }

        // Add a token to the token list based on user input
        function add_token(item) {
            var callback = $(input).data("settings").onAdd;

            // See if the token already exists and select it if we don't want duplicates
            if (token_count > 0 && $(input).data("settings").preventDuplicates) {
                var found_existing_token = null;
                token_list.children().each(function () {
                    var existing_token = $(this);
                    var existing_data = $.data(existing_token.get(0), "tokeninput");
                    if (existing_data && existing_data[settings.tokenValue] === item[settings.tokenValue]) {
                        found_existing_token = existing_token;
                        return false;
                    }
                });

                if (found_existing_token) {
                    select_token(found_existing_token);
                    input_token.insertAfter(found_existing_token);
                    focusWithTimeout(input_box);
                    return;
                }
            }

            // Squeeze input_box so we force no unnecessary line break
            input_box.width(1);

            // Insert the new tokens
            if ($(input).data("settings").tokenLimit == null || token_count < $(input).data("settings").tokenLimit) {
                insert_token(item);
                // Remove the placeholder so it's not seen after you've added a token
                input_box.attr("placeholder", null);
                checkTokenLimit();
            }

            // Clear input box
            input_box.val("");

            // Don't show the help dropdown, they've got the idea
            hide_dropdown();

            // Execute the onAdd callback if defined
            if ($.isFunction(callback)) {
                callback.call(hiddenInput, item);
            }
        }

        // Select a token in the token list
        function select_token(token) {
            if (!$(input).data("settings").disabled) {
                token.addClass($(input).data("settings").classes.selectedToken);
                selected_token = token.get(0);

                // Hide input box
                input_box.val("");

                // Hide dropdown if it is visible (eg if we clicked to select token)
                hide_dropdown();
            }
        }

        // Deselect a token in the token list
        function deselect_token(token, position) {
            token.removeClass($(input).data("settings").classes.selectedToken);
            selected_token = null;

            if (position === POSITION.BEFORE) {
                input_token.insertBefore(token);
                selected_token_index--;
            } else if (position === POSITION.AFTER) {
                input_token.insertAfter(token);
                selected_token_index++;
            } else {
                input_token.appendTo(token_list);
                selected_token_index = token_count;
            }

            // Show the input box and give it focus again
            focusWithTimeout(input_box);
        }

        // Toggle selection of a token in the token list
        function toggle_select_token(token) {
            var previous_selected_token = selected_token;

            if (selected_token) {
                deselect_token($(selected_token), POSITION.END);
            }

            if (previous_selected_token === token.get(0)) {
                deselect_token(token, POSITION.END);
            } else {
                select_token(token);
            }
        }

        // Delete a token from the token list
        function delete_token(token) {
            // Remove the id from the saved list
            var token_data = $.data(token.get(0), "tokeninput");
            var callback = $(input).data("settings").onDelete;

            var index = token.prevAll().length;
            if (index > selected_token_index) index--;

            // Delete the token
            token.remove();
            selected_token = null;

            // Show the input box and give it focus again
            focusWithTimeout(input_box);

            // Remove this token from the saved list
            saved_tokens = saved_tokens.slice(0, index).concat(saved_tokens.slice(index + 1));
            if (saved_tokens.length == 0) {
                input_box.attr("placeholder", settings.placeholder);
            }
            if (index < selected_token_index) selected_token_index--;

            // Update the hidden input
            update_hiddenInput(saved_tokens, hiddenInput);

            token_count -= 1;

            if ($(input).data("settings").tokenLimit !== null) {
                input_box.show().val("");
                focusWithTimeout(input_box);
            }

            // Execute the onDelete callback if defined
            if ($.isFunction(callback)) {
                callback.call(hiddenInput, token_data);
            }
        }

        // Update the hidden input box value
        function update_hiddenInput(saved_tokens, hiddenInput) {
            var token_values = $.map(saved_tokens, function (el) {
                if (typeof $(input).data("settings").tokenValue == "function") return $(input).data("settings").tokenValue.call(this, el);

                return el[$(input).data("settings").tokenValue];
            });
            hiddenInput.val(token_values.join($(input).data("settings").tokenDelimiter));
        }

        // Hide and clear the results dropdown
        function hide_dropdown() {
            dropdown.hide().empty();
            selected_dropdown_item = null;
        }

        function show_dropdown() {
            dropdown.css({
                position: "absolute",
                top: token_list.offset().top + token_list.outerHeight(true),
                left: token_list.offset().left,
                width: token_list.width(),
                "z-index": $(input).data("settings").zindex
            }).show();
        }

        function show_dropdown_searching() {
            if ($(input).data("settings").searchingText) {
                dropdown.html("<p>" + escapeHTML($(input).data("settings").searchingText) + "</p>");
                show_dropdown();
            }
        }

        function show_dropdown_hint() {
            if ($(input).data("settings").hintText) {
                dropdown.html("<p>" + escapeHTML($(input).data("settings").hintText) + "</p>");
                show_dropdown();
            }
        }

        var regexp_special_chars = new RegExp("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]", "g");
        function regexp_escape(term) {
            return term.replace(regexp_special_chars, "\\$&");
        }

        // Highlight the query part of the search term
        function highlight_term(value, term) {
            return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + regexp_escape(term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), function (match, p1) {
                return "<b>" + escapeHTML(p1) + "</b>";
            });
        }

        function find_value_and_highlight_term(template, value, term) {
            return template.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + regexp_escape(value) + ")(?![^<>]*>)(?![^&;]+;)", "g"), highlight_term(value, term));
        }

        // exclude existing tokens from dropdown, so the list is clearer
        function excludeCurrent(results) {
            if ($(input).data("settings").excludeCurrent) {
                var currentTokens = $(input).data("tokenInputObject").getTokens(),
                    trimmedList = [];
                if (currentTokens.length) {
                    $.each(results, function (index, value) {
                        var notFound = true;
                        $.each(currentTokens, function (cIndex, cValue) {
                            if (value[$(input).data("settings").propertyToSearch] == cValue[$(input).data("settings").propertyToSearch]) {
                                notFound = false;
                                return false;
                            }
                        });

                        if (notFound) {
                            trimmedList.push(value);
                        }
                    });
                    results = trimmedList;
                }
            }

            return results;
        }

        // Populate the results dropdown with some results
        function populateDropdown(query, results) {
            // exclude current tokens if configured
            results = excludeCurrent(results);

            if (results && results.length) {
                dropdown.empty();
                var dropdown_ul = $("<ul/>").appendTo(dropdown).mouseover(function (event) {
                    select_dropdown_item($(event.target).closest("li"));
                }).mousedown(function (event) {
                    add_token($(event.target).closest("li").data("tokeninput"));
                    hiddenInput.change();
                    return false;
                }).hide();

                if ($(input).data("settings").resultsLimit && results.length > $(input).data("settings").resultsLimit) {
                    results = results.slice(0, $(input).data("settings").resultsLimit);
                }

                $.each(results, function (index, value) {
                    var this_li = $(input).data("settings").resultsFormatter(value);

                    this_li = find_value_and_highlight_term(this_li, value[$(input).data("settings").propertyToSearch], query);
                    this_li = $(this_li).appendTo(dropdown_ul);

                    if (index % 2) {
                        this_li.addClass($(input).data("settings").classes.dropdownItem);
                    } else {
                        this_li.addClass($(input).data("settings").classes.dropdownItem2);
                    }

                    if (index === 0 && $(input).data("settings").autoSelectFirstResult) {
                        select_dropdown_item(this_li);
                    }

                    $.data(this_li.get(0), "tokeninput", value);
                });

                show_dropdown();

                if ($(input).data("settings").animateDropdown) {
                    dropdown_ul.slideDown("fast");
                } else {
                    dropdown_ul.show();
                }
            } else {
                if ($(input).data("settings").noResultsText) {
                    dropdown.html("<p>" + escapeHTML($(input).data("settings").noResultsText) + "</p>");
                    show_dropdown();
                }
            }
        }

        // Highlight an item in the results dropdown
        function select_dropdown_item(item) {
            if (item) {
                if (selected_dropdown_item) {
                    deselect_dropdown_item($(selected_dropdown_item));
                }

                item.addClass($(input).data("settings").classes.selectedDropdownItem);
                selected_dropdown_item = item.get(0);
            }
        }

        // Remove highlighting from an item in the results dropdown
        function deselect_dropdown_item(item) {
            item.removeClass($(input).data("settings").classes.selectedDropdownItem);
            selected_dropdown_item = null;
        }

        // Do a search and show the "searching" dropdown if the input is longer
        // than $(input).data("settings").minChars
        function do_search() {
            var query = input_box.val();

            if (query && query.length) {
                if (selected_token) {
                    deselect_token($(selected_token), POSITION.AFTER);
                }

                if (query.length >= $(input).data("settings").minChars) {
                    show_dropdown_searching();
                    clearTimeout(timeout);

                    timeout = setTimeout(function () {
                        run_search(query);
                    }, $(input).data("settings").searchDelay);
                } else {
                    hide_dropdown();
                }
            }
        }

        // Do the actual search
        function run_search(query) {
            var cache_key = query + computeURL();
            var cached_results = cache.get(cache_key);
            if (cached_results) {
                if ($.isFunction($(input).data("settings").onCachedResult)) {
                    cached_results = $(input).data("settings").onCachedResult.call(hiddenInput, cached_results);
                }
                populateDropdown(query, cached_results);
            } else {
                // Are we doing an ajax search or local data search?
                if ($(input).data("settings").url) {
                    var url = computeURL();
                    // Extract existing get params
                    var ajax_params = {};
                    ajax_params.data = {};
                    if (url.indexOf("?") > -1) {
                        var parts = url.split("?");
                        ajax_params.url = parts[0];

                        var param_array = parts[1].split("&");
                        $.each(param_array, function (index, value) {
                            var kv = value.split("=");
                            ajax_params.data[kv[0]] = kv[1];
                        });
                    } else {
                        ajax_params.url = url;
                    }

                    // Prepare the request
                    ajax_params.data[$(input).data("settings").queryParam] = query;
                    ajax_params.type = $(input).data("settings").method;
                    ajax_params.dataType = $(input).data("settings").contentType;
                    if ($(input).data("settings").crossDomain) {
                        ajax_params.dataType = "jsonp";
                    }

                    // exclude current tokens?
                    // send exclude list to the server, so it can also exclude existing tokens
                    if ($(input).data("settings").excludeCurrent) {
                        var currentTokens = $(input).data("tokenInputObject").getTokens();
                        var tokenList = $.map(currentTokens, function (el) {
                            if (typeof $(input).data("settings").tokenValue == "function") return $(input).data("settings").tokenValue.call(this, el);

                            return el[$(input).data("settings").tokenValue];
                        });

                        ajax_params.data[$(input).data("settings").excludeCurrentParameter] = tokenList.join($(input).data("settings").tokenDelimiter);
                    }

                    // Attach the success callback
                    ajax_params.success = function (results) {
                        cache.add(cache_key, $(input).data("settings").jsonContainer ? results[$(input).data("settings").jsonContainer] : results);
                        if ($.isFunction($(input).data("settings").onResult)) {
                            results = $(input).data("settings").onResult.call(hiddenInput, results);
                        }

                        // only populate the dropdown if the results are associated with the active search query
                        if (input_box.val() === query) {
                            populateDropdown(query, $(input).data("settings").jsonContainer ? results[$(input).data("settings").jsonContainer] : results);
                        }
                    };

                    // Provide a beforeSend callback
                    if (settings.onSend) {
                        settings.onSend(ajax_params);
                    }

                    // Make the request
                    $.ajax(ajax_params);
                } else if ($(input).data("settings").local_data) {
                    // Do the search through local data
                    var results = $.grep($(input).data("settings").local_data, function (row) {
                        return row[$(input).data("settings").propertyToSearch].toLowerCase().indexOf(query.toLowerCase()) > -1;
                    });

                    cache.add(cache_key, results);
                    if ($.isFunction($(input).data("settings").onResult)) {
                        results = $(input).data("settings").onResult.call(hiddenInput, results);
                    }
                    populateDropdown(query, results);
                }
            }
        }

        // compute the dynamic URL
        function computeURL() {
            var settings = $(input).data("settings");
            return typeof settings.url == "function" ? settings.url.call(settings) : settings.url;
        }

        // Bring browser focus to the specified object.
        // Use of setTimeout is to get around an IE bug.
        // (See, e.g., http://stackoverflow.com/questions/2600186/focus-doesnt-work-in-ie)
        //
        // obj: a jQuery object to focus()
        function focusWithTimeout(object) {
            setTimeout(function () {
                object.focus();
            }, 50);
        }
    };

    // Really basic cache for the results
    $.TokenList.Cache = function (options) {
        var settings,
            data = {},
            size = 0,
            flush;

        settings = $.extend({ max_size: 500 }, options);

        flush = function flush() {
            data = {};
            size = 0;
        };

        this.add = function (query, results) {
            if (size > settings.max_size) {
                flush();
            }

            if (!data[query]) {
                size += 1;
            }

            data[query] = results;
        };

        this.get = function (query) {
            return data[query];
        };
    };
})($);

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * There are no events for this application
 * But this is an example of directory and file structure for events
 * Seperation of concerns are key in functional paradigms!
*/
exports.default = {
    load: function load(state, actions, element) {
        if (localStorage.chrome_id) {
            actions.initialize({
                chrome_id: localStorage.chrome_id,
                callback: function callback() {
                    if (chrome.extension) {
                        var bgPage = chrome.extension.getBackgroundPage();
                        actions.setNotificationCount(bgPage.countData);
                        bgPage.updateNotification(0);
                        var manifest = chrome.runtime.getManifest();
                        var version = manifest.version;
                        actions.setVersion(version);
                    }
                    actions.onTabChange({
                        stateKey: "notificationTabs",
                        tab_id: "notLinks"
                    });
                    actions.fetchGroups();
                    actions.detectSite();
                }
            });
        } else {
            state.mainNav.active = "settings";
            state.settingsTabs.active = "profile";
            return state;
        }
    }
};

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options) {
  options = options || {};
  options.log = typeof options.log === 'function' ? options.log : log;

  return function (emit) {
    var actionStack = [];
    return {
      events: {
        action: function action(state, actions, _action) {
          actionStack.push(_action);
        },
        resolve: function resolve(state, actions, result) {
          if (typeof result === 'function') {
            var action = actionStack.pop();
            return function (update) {
              return result(function (result) {
                actionStack.push(action);
                return update(result);
              });
            };
          }
        },
        update: function update(state, actions, nextState) {
          options.log(state, actionStack.pop(), nextState);
        }
      }
    };
  };
};

function log(prevState, action, nextState) {
  console.group('%c action', 'color: gray; font-weight: lighter;', action.name);
  console.log('%c prev state', 'color: #9E9E9E; font-weight: bold;', prevState);
  console.log('%c data', 'color: #03A9F4; font-weight: bold;', action.data);
  console.log('%c next state', 'color: #4CAF50; font-weight: bold;', nextState);
  console.groupEnd();
}

/***/ })
/******/ ]);
//# sourceMappingURL=popup.js.map