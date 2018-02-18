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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!********************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/dygraph-utils.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2011 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview This file contains utility functions used by dygraphs. These
 * are typically static (i.e. not related to any particular dygraph). Examples
 * include date/time formatting functions, basic algorithms (e.g. binary
 * search) and generic DOM-manipulation functions.
 */

/*global Dygraph:false, Node:false */


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeEvent = removeEvent;
exports.cancelEvent = cancelEvent;
exports.hsvToRGB = hsvToRGB;
exports.findPos = findPos;
exports.pageX = pageX;
exports.pageY = pageY;
exports.dragGetX_ = dragGetX_;
exports.dragGetY_ = dragGetY_;
exports.isOK = isOK;
exports.isValidPoint = isValidPoint;
exports.floatFormat = floatFormat;
exports.zeropad = zeropad;
exports.hmsString_ = hmsString_;
exports.dateString_ = dateString_;
exports.round_ = round_;
exports.binarySearch = binarySearch;
exports.dateParser = dateParser;
exports.dateStrToMillis = dateStrToMillis;
exports.update = update;
exports.updateDeep = updateDeep;
exports.isArrayLike = isArrayLike;
exports.isDateLike = isDateLike;
exports.clone = clone;
exports.createCanvas = createCanvas;
exports.getContextPixelRatio = getContextPixelRatio;
exports.Iterator = Iterator;
exports.createIterator = createIterator;
exports.repeatAndCleanup = repeatAndCleanup;
exports.isPixelChangingOptionList = isPixelChangingOptionList;
exports.detectLineDelimiter = detectLineDelimiter;
exports.isNodeContainedBy = isNodeContainedBy;
exports.pow = pow;
exports.toRGB_ = toRGB_;
exports.isCanvasSupported = isCanvasSupported;
exports.parseFloat_ = parseFloat_;
exports.numberValueFormatter = numberValueFormatter;
exports.numberAxisLabelFormatter = numberAxisLabelFormatter;
exports.dateAxisLabelFormatter = dateAxisLabelFormatter;
exports.dateValueFormatter = dateValueFormatter;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _dygraphTickers = __webpack_require__(/*! ./dygraph-tickers */ 4);

var DygraphTickers = _interopRequireWildcard(_dygraphTickers);

var LOG_SCALE = 10;
exports.LOG_SCALE = LOG_SCALE;
var LN_TEN = Math.log(LOG_SCALE);

exports.LN_TEN = LN_TEN;
/**
 * @private
 * @param {number} x
 * @return {number}
 */
var log10 = function log10(x) {
  return Math.log(x) / LN_TEN;
};

exports.log10 = log10;
/**
 * @private
 * @param {number} r0
 * @param {number} r1
 * @param {number} pct
 * @return {number}
 */
var logRangeFraction = function logRangeFraction(r0, r1, pct) {
  // Computing the inverse of toPercentXCoord. The function was arrived at with
  // the following steps:
  //
  // Original calcuation:
  // pct = (log(x) - log(xRange[0])) / (log(xRange[1]) - log(xRange[0])));
  //
  // Multiply both sides by the right-side denominator.
  // pct * (log(xRange[1] - log(xRange[0]))) = log(x) - log(xRange[0])
  //
  // add log(xRange[0]) to both sides
  // log(xRange[0]) + (pct * (log(xRange[1]) - log(xRange[0])) = log(x);
  //
  // Swap both sides of the equation,
  // log(x) = log(xRange[0]) + (pct * (log(xRange[1]) - log(xRange[0]))
  //
  // Use both sides as the exponent in 10^exp and we're done.
  // x = 10 ^ (log(xRange[0]) + (pct * (log(xRange[1]) - log(xRange[0])))

  var logr0 = log10(r0);
  var logr1 = log10(r1);
  var exponent = logr0 + pct * (logr1 - logr0);
  var value = Math.pow(LOG_SCALE, exponent);
  return value;
};

exports.logRangeFraction = logRangeFraction;
/** A dotted line stroke pattern. */
var DOTTED_LINE = [2, 2];
exports.DOTTED_LINE = DOTTED_LINE;
/** A dashed line stroke pattern. */
var DASHED_LINE = [7, 3];
exports.DASHED_LINE = DASHED_LINE;
/** A dot dash stroke pattern. */
var DOT_DASH_LINE = [7, 2, 2, 2];

exports.DOT_DASH_LINE = DOT_DASH_LINE;
// Directions for panning and zooming. Use bit operations when combined
// values are possible.
var HORIZONTAL = 1;
exports.HORIZONTAL = HORIZONTAL;
var VERTICAL = 2;

exports.VERTICAL = VERTICAL;
/**
 * Return the 2d context for a dygraph canvas.
 *
 * This method is only exposed for the sake of replacing the function in
 * automated tests.
 *
 * @param {!HTMLCanvasElement} canvas
 * @return {!CanvasRenderingContext2D}
 * @private
 */
var getContext = function getContext(canvas) {
  return (/** @type{!CanvasRenderingContext2D}*/canvas.getContext("2d")
  );
};

exports.getContext = getContext;
/**
 * Add an event handler.
 * @param {!Node} elem The element to add the event to.
 * @param {string} type The type of the event, e.g. 'click' or 'mousemove'.
 * @param {function(Event):(boolean|undefined)} fn The function to call
 *     on the event. The function takes one parameter: the event object.
 * @private
 */
var addEvent = function addEvent(elem, type, fn) {
  elem.addEventListener(type, fn, false);
};

exports.addEvent = addEvent;
/**
 * Remove an event handler.
 * @param {!Node} elem The element to remove the event from.
 * @param {string} type The type of the event, e.g. 'click' or 'mousemove'.
 * @param {function(Event):(boolean|undefined)} fn The function to call
 *     on the event. The function takes one parameter: the event object.
 */

function removeEvent(elem, type, fn) {
  elem.removeEventListener(type, fn, false);
}

;

/**
 * Cancels further processing of an event. This is useful to prevent default
 * browser actions, e.g. highlighting text on a double-click.
 * Based on the article at
 * http://www.switchonthecode.com/tutorials/javascript-tutorial-the-scroll-wheel
 * @param {!Event} e The event whose normal behavior should be canceled.
 * @private
 */

function cancelEvent(e) {
  e = e ? e : window.event;
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.cancelBubble = true;
  e.cancel = true;
  e.returnValue = false;
  return false;
}

;

/**
 * Convert hsv values to an rgb(r,g,b) string. Taken from MochiKit.Color. This
 * is used to generate default series colors which are evenly spaced on the
 * color wheel.
 * @param { number } hue Range is 0.0-1.0.
 * @param { number } saturation Range is 0.0-1.0.
 * @param { number } value Range is 0.0-1.0.
 * @return { string } "rgb(r,g,b)" where r, g and b range from 0-255.
 * @private
 */

function hsvToRGB(hue, saturation, value) {
  var red;
  var green;
  var blue;
  if (saturation === 0) {
    red = value;
    green = value;
    blue = value;
  } else {
    var i = Math.floor(hue * 6);
    var f = hue * 6 - i;
    var p = value * (1 - saturation);
    var q = value * (1 - saturation * f);
    var t = value * (1 - saturation * (1 - f));
    switch (i) {
      case 1:
        red = q;green = value;blue = p;break;
      case 2:
        red = p;green = value;blue = t;break;
      case 3:
        red = p;green = q;blue = value;break;
      case 4:
        red = t;green = p;blue = value;break;
      case 5:
        red = value;green = p;blue = q;break;
      case 6: // fall through
      case 0:
        red = value;green = t;blue = p;break;
    }
  }
  red = Math.floor(255 * red + 0.5);
  green = Math.floor(255 * green + 0.5);
  blue = Math.floor(255 * blue + 0.5);
  return 'rgb(' + red + ',' + green + ',' + blue + ')';
}

;

/**
 * Find the coordinates of an object relative to the top left of the page.
 *
 * @param {Node} obj
 * @return {{x:number,y:number}}
 * @private
 */

function findPos(obj) {
  var p = obj.getBoundingClientRect(),
      w = window,
      d = document.documentElement;

  return {
    x: p.left + (w.pageXOffset || d.scrollLeft),
    y: p.top + (w.pageYOffset || d.scrollTop)
  };
}

;

/**
 * Returns the x-coordinate of the event in a coordinate system where the
 * top-left corner of the page (not the window) is (0,0).
 * Taken from MochiKit.Signal
 * @param {!Event} e
 * @return {number}
 * @private
 */

function pageX(e) {
  return !e.pageX || e.pageX < 0 ? 0 : e.pageX;
}

;

/**
 * Returns the y-coordinate of the event in a coordinate system where the
 * top-left corner of the page (not the window) is (0,0).
 * Taken from MochiKit.Signal
 * @param {!Event} e
 * @return {number}
 * @private
 */

function pageY(e) {
  return !e.pageY || e.pageY < 0 ? 0 : e.pageY;
}

;

/**
 * Converts page the x-coordinate of the event to pixel x-coordinates on the
 * canvas (i.e. DOM Coords).
 * @param {!Event} e Drag event.
 * @param {!DygraphInteractionContext} context Interaction context object.
 * @return {number} The amount by which the drag has moved to the right.
 */

function dragGetX_(e, context) {
  return pageX(e) - context.px;
}

;

/**
 * Converts page the y-coordinate of the event to pixel y-coordinates on the
 * canvas (i.e. DOM Coords).
 * @param {!Event} e Drag event.
 * @param {!DygraphInteractionContext} context Interaction context object.
 * @return {number} The amount by which the drag has moved down.
 */

function dragGetY_(e, context) {
  return pageY(e) - context.py;
}

;

/**
 * This returns true unless the parameter is 0, null, undefined or NaN.
 * TODO(danvk): rename this function to something like 'isNonZeroNan'.
 *
 * @param {number} x The number to consider.
 * @return {boolean} Whether the number is zero or NaN.
 * @private
 */

function isOK(x) {
  return !!x && !isNaN(x);
}

;

/**
 * @param {{x:?number,y:?number,yval:?number}} p The point to consider, valid
 *     points are {x, y} objects
 * @param {boolean=} opt_allowNaNY Treat point with y=NaN as valid
 * @return {boolean} Whether the point has numeric x and y.
 * @private
 */

function isValidPoint(p, opt_allowNaNY) {
  if (!p) return false; // null or undefined object
  if (p.yval === null) return false; // missing point
  if (p.x === null || p.x === undefined) return false;
  if (p.y === null || p.y === undefined) return false;
  if (isNaN(p.x) || !opt_allowNaNY && isNaN(p.y)) return false;
  return true;
}

;

/**
 * Number formatting function which mimics the behavior of %g in printf, i.e.
 * either exponential or fixed format (without trailing 0s) is used depending on
 * the length of the generated string.  The advantage of this format is that
 * there is a predictable upper bound on the resulting string length,
 * significant figures are not dropped, and normal numbers are not displayed in
 * exponential notation.
 *
 * NOTE: JavaScript's native toPrecision() is NOT a drop-in replacement for %g.
 * It creates strings which are too long for absolute values between 10^-4 and
 * 10^-6, e.g. '0.00001' instead of '1e-5'. See tests/number-format.html for
 * output examples.
 *
 * @param {number} x The number to format
 * @param {number=} opt_precision The precision to use, default 2.
 * @return {string} A string formatted like %g in printf.  The max generated
 *                  string length should be precision + 6 (e.g 1.123e+300).
 */

function floatFormat(x, opt_precision) {
  // Avoid invalid precision values; [1, 21] is the valid range.
  var p = Math.min(Math.max(1, opt_precision || 2), 21);

  // This is deceptively simple.  The actual algorithm comes from:
  //
  // Max allowed length = p + 4
  // where 4 comes from 'e+n' and '.'.
  //
  // Length of fixed format = 2 + y + p
  // where 2 comes from '0.' and y = # of leading zeroes.
  //
  // Equating the two and solving for y yields y = 2, or 0.00xxxx which is
  // 1.0e-3.
  //
  // Since the behavior of toPrecision() is identical for larger numbers, we
  // don't have to worry about the other bound.
  //
  // Finally, the argument for toExponential() is the number of trailing digits,
  // so we take off 1 for the value before the '.'.
  return Math.abs(x) < 1.0e-3 && x !== 0.0 ? x.toExponential(p - 1) : x.toPrecision(p);
}

;

/**
 * Converts '9' to '09' (useful for dates)
 * @param {number} x
 * @return {string}
 * @private
 */

function zeropad(x) {
  if (x < 10) return "0" + x;else return "" + x;
}

;

/**
 * Date accessors to get the parts of a calendar date (year, month,
 * day, hour, minute, second and millisecond) according to local time,
 * and factory method to call the Date constructor with an array of arguments.
 */
var DateAccessorsLocal = {
  getFullYear: function getFullYear(d) {
    return d.getFullYear();
  },
  getMonth: function getMonth(d) {
    return d.getMonth();
  },
  getDate: function getDate(d) {
    return d.getDate();
  },
  getHours: function getHours(d) {
    return d.getHours();
  },
  getMinutes: function getMinutes(d) {
    return d.getMinutes();
  },
  getSeconds: function getSeconds(d) {
    return d.getSeconds();
  },
  getMilliseconds: function getMilliseconds(d) {
    return d.getMilliseconds();
  },
  getDay: function getDay(d) {
    return d.getDay();
  },
  makeDate: function makeDate(y, m, d, hh, mm, ss, ms) {
    return new Date(y, m, d, hh, mm, ss, ms);
  }
};

exports.DateAccessorsLocal = DateAccessorsLocal;
/**
 * Date accessors to get the parts of a calendar date (year, month,
 * day of month, hour, minute, second and millisecond) according to UTC time,
 * and factory method to call the Date constructor with an array of arguments.
 */
var DateAccessorsUTC = {
  getFullYear: function getFullYear(d) {
    return d.getUTCFullYear();
  },
  getMonth: function getMonth(d) {
    return d.getUTCMonth();
  },
  getDate: function getDate(d) {
    return d.getUTCDate();
  },
  getHours: function getHours(d) {
    return d.getUTCHours();
  },
  getMinutes: function getMinutes(d) {
    return d.getUTCMinutes();
  },
  getSeconds: function getSeconds(d) {
    return d.getUTCSeconds();
  },
  getMilliseconds: function getMilliseconds(d) {
    return d.getUTCMilliseconds();
  },
  getDay: function getDay(d) {
    return d.getUTCDay();
  },
  makeDate: function makeDate(y, m, d, hh, mm, ss, ms) {
    return new Date(Date.UTC(y, m, d, hh, mm, ss, ms));
  }
};

exports.DateAccessorsUTC = DateAccessorsUTC;
/**
 * Return a string version of the hours, minutes and seconds portion of a date.
 * @param {number} hh The hours (from 0-23)
 * @param {number} mm The minutes (from 0-59)
 * @param {number} ss The seconds (from 0-59)
 * @return {string} A time of the form "HH:MM" or "HH:MM:SS"
 * @private
 */

function hmsString_(hh, mm, ss, ms) {
  var ret = zeropad(hh) + ":" + zeropad(mm);
  if (ss) {
    ret += ":" + zeropad(ss);
    if (ms) {
      var str = "" + ms;
      ret += "." + ('000' + str).substring(str.length);
    }
  }
  return ret;
}

;

/**
 * Convert a JS date (millis since epoch) to a formatted string.
 * @param {number} time The JavaScript time value (ms since epoch)
 * @param {boolean} utc Whether output UTC or local time
 * @return {string} A date of one of these forms:
 *     "YYYY/MM/DD", "YYYY/MM/DD HH:MM" or "YYYY/MM/DD HH:MM:SS"
 * @private
 */

function dateString_(time, utc) {
  var accessors = utc ? DateAccessorsUTC : DateAccessorsLocal;
  var date = new Date(time);
  var y = accessors.getFullYear(date);
  var m = accessors.getMonth(date);
  var d = accessors.getDate(date);
  var hh = accessors.getHours(date);
  var mm = accessors.getMinutes(date);
  var ss = accessors.getSeconds(date);
  var ms = accessors.getMilliseconds(date);
  // Get a year string:
  var year = "" + y;
  // Get a 0 padded month string
  var month = zeropad(m + 1); //months are 0-offset, sigh
  // Get a 0 padded day string
  var day = zeropad(d);
  var frac = hh * 3600 + mm * 60 + ss + 1e-3 * ms;
  var ret = year + "/" + month + "/" + day;
  if (frac) {
    ret += " " + hmsString_(hh, mm, ss, ms);
  }
  return ret;
}

;

/**
 * Round a number to the specified number of digits past the decimal point.
 * @param {number} num The number to round
 * @param {number} places The number of decimals to which to round
 * @return {number} The rounded number
 * @private
 */

function round_(num, places) {
  var shift = Math.pow(10, places);
  return Math.round(num * shift) / shift;
}

;

/**
 * Implementation of binary search over an array.
 * Currently does not work when val is outside the range of arry's values.
 * @param {number} val the value to search for
 * @param {Array.<number>} arry is the value over which to search
 * @param {number} abs If abs > 0, find the lowest entry greater than val
 *     If abs < 0, find the highest entry less than val.
 *     If abs == 0, find the entry that equals val.
 * @param {number=} low The first index in arry to consider (optional)
 * @param {number=} high The last index in arry to consider (optional)
 * @return {number} Index of the element, or -1 if it isn't found.
 * @private
 */

function binarySearch(_x, _x2, _x3, _x4, _x5) {
  var _again = true;

  _function: while (_again) {
    var val = _x,
        arry = _x2,
        abs = _x3,
        low = _x4,
        high = _x5;
    _again = false;

    if (low === null || low === undefined || high === null || high === undefined) {
      low = 0;
      high = arry.length - 1;
    }
    if (low > high) {
      return -1;
    }
    if (abs === null || abs === undefined) {
      abs = 0;
    }
    var validIndex = function validIndex(idx) {
      return idx >= 0 && idx < arry.length;
    };
    var mid = parseInt((low + high) / 2, 10);
    var element = arry[mid];
    var idx;
    if (element == val) {
      return mid;
    } else if (element > val) {
      if (abs > 0) {
        // Accept if element > val, but also if prior element < val.
        idx = mid - 1;
        if (validIndex(idx) && arry[idx] < val) {
          return mid;
        }
      }
      _x = val;
      _x2 = arry;
      _x3 = abs;
      _x4 = low;
      _x5 = mid - 1;
      _again = true;
      validIndex = mid = element = idx = undefined;
      continue _function;
    } else if (element < val) {
      if (abs < 0) {
        // Accept if element < val, but also if prior element > val.
        idx = mid + 1;
        if (validIndex(idx) && arry[idx] > val) {
          return mid;
        }
      }
      _x = val;
      _x2 = arry;
      _x3 = abs;
      _x4 = mid + 1;
      _x5 = high;
      _again = true;
      validIndex = mid = element = idx = undefined;
      continue _function;
    }
    return -1; // can't actually happen, but makes closure compiler happy
  }
}

;

/**
 * Parses a date, returning the number of milliseconds since epoch. This can be
 * passed in as an xValueParser in the Dygraph constructor.
 * TODO(danvk): enumerate formats that this understands.
 *
 * @param {string} dateStr A date in a variety of possible string formats.
 * @return {number} Milliseconds since epoch.
 * @private
 */

function dateParser(dateStr) {
  var dateStrSlashed;
  var d;

  // Let the system try the format first, with one caveat:
  // YYYY-MM-DD[ HH:MM:SS] is interpreted as UTC by a variety of browsers.
  // dygraphs displays dates in local time, so this will result in surprising
  // inconsistencies. But if you specify "T" or "Z" (i.e. YYYY-MM-DDTHH:MM:SS),
  // then you probably know what you're doing, so we'll let you go ahead.
  // Issue: http://code.google.com/p/dygraphs/issues/detail?id=255
  if (dateStr.search("-") == -1 || dateStr.search("T") != -1 || dateStr.search("Z") != -1) {
    d = dateStrToMillis(dateStr);
    if (d && !isNaN(d)) return d;
  }

  if (dateStr.search("-") != -1) {
    // e.g. '2009-7-12' or '2009-07-12'
    dateStrSlashed = dateStr.replace("-", "/", "g");
    while (dateStrSlashed.search("-") != -1) {
      dateStrSlashed = dateStrSlashed.replace("-", "/");
    }
    d = dateStrToMillis(dateStrSlashed);
  } else if (dateStr.length == 8) {
    // e.g. '20090712'
    // TODO(danvk): remove support for this format. It's confusing.
    dateStrSlashed = dateStr.substr(0, 4) + "/" + dateStr.substr(4, 2) + "/" + dateStr.substr(6, 2);
    d = dateStrToMillis(dateStrSlashed);
  } else {
    // Any format that Date.parse will accept, e.g. "2009/07/12" or
    // "2009/07/12 12:34:56"
    d = dateStrToMillis(dateStr);
  }

  if (!d || isNaN(d)) {
    console.error("Couldn't parse " + dateStr + " as a date");
  }
  return d;
}

;

/**
 * This is identical to JavaScript's built-in Date.parse() method, except that
 * it doesn't get replaced with an incompatible method by aggressive JS
 * libraries like MooTools or Joomla.
 * @param {string} str The date string, e.g. "2011/05/06"
 * @return {number} millis since epoch
 * @private
 */

function dateStrToMillis(str) {
  return new Date(str).getTime();
}

;

// These functions are all based on MochiKit.
/**
 * Copies all the properties from o to self.
 *
 * @param {!Object} self
 * @param {!Object} o
 * @return {!Object}
 */

function update(self, o) {
  if (typeof o != 'undefined' && o !== null) {
    for (var k in o) {
      if (o.hasOwnProperty(k)) {
        self[k] = o[k];
      }
    }
  }
  return self;
}

;

/**
 * Copies all the properties from o to self.
 *
 * @param {!Object} self
 * @param {!Object} o
 * @return {!Object}
 * @private
 */

function updateDeep(self, o) {
  // Taken from http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
  function isNode(o) {
    return typeof Node === "object" ? o instanceof Node : typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string";
  }

  if (typeof o != 'undefined' && o !== null) {
    for (var k in o) {
      if (o.hasOwnProperty(k)) {
        if (o[k] === null) {
          self[k] = null;
        } else if (isArrayLike(o[k])) {
          self[k] = o[k].slice();
        } else if (isNode(o[k])) {
          // DOM objects are shallowly-copied.
          self[k] = o[k];
        } else if (typeof o[k] == 'object') {
          if (typeof self[k] != 'object' || self[k] === null) {
            self[k] = {};
          }
          updateDeep(self[k], o[k]);
        } else {
          self[k] = o[k];
        }
      }
    }
  }
  return self;
}

;

/**
 * @param {*} o
 * @return {boolean}
 * @private
 */

function isArrayLike(o) {
  var typ = typeof o;
  if (typ != 'object' && !(typ == 'function' && typeof o.item == 'function') || o === null || typeof o.length != 'number' || o.nodeType === 3) {
    return false;
  }
  return true;
}

;

/**
 * @param {Object} o
 * @return {boolean}
 * @private
 */

function isDateLike(o) {
  if (typeof o != "object" || o === null || typeof o.getTime != 'function') {
    return false;
  }
  return true;
}

;

/**
 * Note: this only seems to work for arrays.
 * @param {!Array} o
 * @return {!Array}
 * @private
 */

function clone(o) {
  // TODO(danvk): figure out how MochiKit's version works
  var r = [];
  for (var i = 0; i < o.length; i++) {
    if (isArrayLike(o[i])) {
      r.push(clone(o[i]));
    } else {
      r.push(o[i]);
    }
  }
  return r;
}

;

/**
 * Create a new canvas element.
 *
 * @return {!HTMLCanvasElement}
 * @private
 */

function createCanvas() {
  return document.createElement('canvas');
}

;

/**
 * Returns the context's pixel ratio, which is the ratio between the device
 * pixel ratio and the backing store ratio. Typically this is 1 for conventional
 * displays, and > 1 for HiDPI displays (such as the Retina MBP).
 * See http://www.html5rocks.com/en/tutorials/canvas/hidpi/ for more details.
 *
 * @param {!CanvasRenderingContext2D} context The canvas's 2d context.
 * @return {number} The ratio of the device pixel ratio and the backing store
 * ratio for the specified context.
 */

function getContextPixelRatio(context) {
  try {
    var devicePixelRatio = window.devicePixelRatio;
    var backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
    if (devicePixelRatio !== undefined) {
      return devicePixelRatio / backingStoreRatio;
    } else {
      // At least devicePixelRatio must be defined for this ratio to make sense.
      // We default backingStoreRatio to 1: this does not exist on some browsers
      // (i.e. desktop Chrome).
      return 1;
    }
  } catch (e) {
    return 1;
  }
}

;

/**
 * TODO(danvk): use @template here when it's better supported for classes.
 * @param {!Array} array
 * @param {number} start
 * @param {number} length
 * @param {function(!Array,?):boolean=} predicate
 * @constructor
 */

function Iterator(array, start, length, predicate) {
  start = start || 0;
  length = length || array.length;
  this.hasNext = true; // Use to identify if there's another element.
  this.peek = null; // Use for look-ahead
  this.start_ = start;
  this.array_ = array;
  this.predicate_ = predicate;
  this.end_ = Math.min(array.length, start + length);
  this.nextIdx_ = start - 1; // use -1 so initial advance works.
  this.next(); // ignoring result.
}

;

/**
 * @return {Object}
 */
Iterator.prototype.next = function () {
  if (!this.hasNext) {
    return null;
  }
  var obj = this.peek;

  var nextIdx = this.nextIdx_ + 1;
  var found = false;
  while (nextIdx < this.end_) {
    if (!this.predicate_ || this.predicate_(this.array_, nextIdx)) {
      this.peek = this.array_[nextIdx];
      found = true;
      break;
    }
    nextIdx++;
  }
  this.nextIdx_ = nextIdx;
  if (!found) {
    this.hasNext = false;
    this.peek = null;
  }
  return obj;
};

/**
 * Returns a new iterator over array, between indexes start and
 * start + length, and only returns entries that pass the accept function
 *
 * @param {!Array} array the array to iterate over.
 * @param {number} start the first index to iterate over, 0 if absent.
 * @param {number} length the number of elements in the array to iterate over.
 *     This, along with start, defines a slice of the array, and so length
 *     doesn't imply the number of elements in the iterator when accept doesn't
 *     always accept all values. array.length when absent.
 * @param {function(?):boolean=} opt_predicate a function that takes
 *     parameters array and idx, which returns true when the element should be
 *     returned.  If omitted, all elements are accepted.
 * @private
 */

function createIterator(array, start, length, opt_predicate) {
  return new Iterator(array, start, length, opt_predicate);
}

;

// Shim layer with setTimeout fallback.
// From: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// Should be called with the window context:
//   Dygraph.requestAnimFrame.call(window, function() {})
var requestAnimFrame = (function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

exports.requestAnimFrame = requestAnimFrame;
/**
 * Call a function at most maxFrames times at an attempted interval of
 * framePeriodInMillis, then call a cleanup function once. repeatFn is called
 * once immediately, then at most (maxFrames - 1) times asynchronously. If
 * maxFrames==1, then cleanup_fn() is also called synchronously.  This function
 * is used to sequence animation.
 * @param {function(number)} repeatFn Called repeatedly -- takes the frame
 *     number (from 0 to maxFrames-1) as an argument.
 * @param {number} maxFrames The max number of times to call repeatFn
 * @param {number} framePeriodInMillis Max requested time between frames.
 * @param {function()} cleanupFn A function to call after all repeatFn calls.
 * @private
 */

function repeatAndCleanup(repeatFn, maxFrames, framePeriodInMillis, cleanupFn) {
  var frameNumber = 0;
  var previousFrameNumber;
  var startTime = new Date().getTime();
  repeatFn(frameNumber);
  if (maxFrames == 1) {
    cleanupFn();
    return;
  }
  var maxFrameArg = maxFrames - 1;

  (function loop() {
    if (frameNumber >= maxFrames) return;
    requestAnimFrame.call(window, function () {
      // Determine which frame to draw based on the delay so far.  Will skip
      // frames if necessary.
      var currentTime = new Date().getTime();
      var delayInMillis = currentTime - startTime;
      previousFrameNumber = frameNumber;
      frameNumber = Math.floor(delayInMillis / framePeriodInMillis);
      var frameDelta = frameNumber - previousFrameNumber;
      // If we predict that the subsequent repeatFn call will overshoot our
      // total frame target, so our last call will cause a stutter, then jump to
      // the last call immediately.  If we're going to cause a stutter, better
      // to do it faster than slower.
      var predictOvershootStutter = frameNumber + frameDelta > maxFrameArg;
      if (predictOvershootStutter || frameNumber >= maxFrameArg) {
        repeatFn(maxFrameArg); // Ensure final call with maxFrameArg.
        cleanupFn();
      } else {
        if (frameDelta !== 0) {
          // Don't call repeatFn with duplicate frames.
          repeatFn(frameNumber);
        }
        loop();
      }
    });
  })();
}

;

// A whitelist of options that do not change pixel positions.
var pixelSafeOptions = {
  'annotationClickHandler': true,
  'annotationDblClickHandler': true,
  'annotationMouseOutHandler': true,
  'annotationMouseOverHandler': true,
  'axisLineColor': true,
  'axisLineWidth': true,
  'clickCallback': true,
  'drawCallback': true,
  'drawHighlightPointCallback': true,
  'drawPoints': true,
  'drawPointCallback': true,
  'drawGrid': true,
  'fillAlpha': true,
  'gridLineColor': true,
  'gridLineWidth': true,
  'hideOverlayOnMouseOut': true,
  'highlightCallback': true,
  'highlightCircleSize': true,
  'interactionModel': true,
  'labelsDiv': true,
  'labelsKMB': true,
  'labelsKMG2': true,
  'labelsSeparateLines': true,
  'labelsShowZeroValues': true,
  'legend': true,
  'panEdgeFraction': true,
  'pixelsPerYLabel': true,
  'pointClickCallback': true,
  'pointSize': true,
  'rangeSelectorPlotFillColor': true,
  'rangeSelectorPlotFillGradientColor': true,
  'rangeSelectorPlotStrokeColor': true,
  'rangeSelectorBackgroundStrokeColor': true,
  'rangeSelectorBackgroundLineWidth': true,
  'rangeSelectorPlotLineWidth': true,
  'rangeSelectorForegroundStrokeColor': true,
  'rangeSelectorForegroundLineWidth': true,
  'rangeSelectorAlpha': true,
  'showLabelsOnHighlight': true,
  'showRoller': true,
  'strokeWidth': true,
  'underlayCallback': true,
  'unhighlightCallback': true,
  'zoomCallback': true
};

/**
 * This function will scan the option list and determine if they
 * require us to recalculate the pixel positions of each point.
 * TODO: move this into dygraph-options.js
 * @param {!Array.<string>} labels a list of options to check.
 * @param {!Object} attrs
 * @return {boolean} true if the graph needs new points else false.
 * @private
 */

function isPixelChangingOptionList(labels, attrs) {
  // Assume that we do not require new points.
  // This will change to true if we actually do need new points.

  // Create a dictionary of series names for faster lookup.
  // If there are no labels, then the dictionary stays empty.
  var seriesNamesDictionary = {};
  if (labels) {
    for (var i = 1; i < labels.length; i++) {
      seriesNamesDictionary[labels[i]] = true;
    }
  }

  // Scan through a flat (i.e. non-nested) object of options.
  // Returns true/false depending on whether new points are needed.
  var scanFlatOptions = function scanFlatOptions(options) {
    for (var property in options) {
      if (options.hasOwnProperty(property) && !pixelSafeOptions[property]) {
        return true;
      }
    }
    return false;
  };

  // Iterate through the list of updated options.
  for (var property in attrs) {
    if (!attrs.hasOwnProperty(property)) continue;

    // Find out of this field is actually a series specific options list.
    if (property == 'highlightSeriesOpts' || seriesNamesDictionary[property] && !attrs.series) {
      // This property value is a list of options for this series.
      if (scanFlatOptions(attrs[property])) return true;
    } else if (property == 'series' || property == 'axes') {
      // This is twice-nested options list.
      var perSeries = attrs[property];
      for (var series in perSeries) {
        if (perSeries.hasOwnProperty(series) && scanFlatOptions(perSeries[series])) {
          return true;
        }
      }
    } else {
      // If this was not a series specific option list, check if it's a pixel
      // changing property.
      if (!pixelSafeOptions[property]) return true;
    }
  }

  return false;
}

;

var Circles = {
  DEFAULT: function DEFAULT(g, name, ctx, canvasx, canvasy, color, radius) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(canvasx, canvasy, radius, 0, 2 * Math.PI, false);
    ctx.fill();
  }
  // For more shapes, include extras/shapes.js
};

exports.Circles = Circles;
/**
 * Determine whether |data| is delimited by CR, CRLF, LF, LFCR.
 * @param {string} data
 * @return {?string} the delimiter that was detected (or null on failure).
 */

function detectLineDelimiter(data) {
  for (var i = 0; i < data.length; i++) {
    var code = data.charAt(i);
    if (code === '\r') {
      // Might actually be "\r\n".
      if (i + 1 < data.length && data.charAt(i + 1) === '\n') {
        return '\r\n';
      }
      return code;
    }
    if (code === '\n') {
      // Might actually be "\n\r".
      if (i + 1 < data.length && data.charAt(i + 1) === '\r') {
        return '\n\r';
      }
      return code;
    }
  }

  return null;
}

;

/**
 * Is one node contained by another?
 * @param {Node} containee The contained node.
 * @param {Node} container The container node.
 * @return {boolean} Whether containee is inside (or equal to) container.
 * @private
 */

function isNodeContainedBy(containee, container) {
  if (container === null || containee === null) {
    return false;
  }
  var containeeNode = /** @type {Node} */containee;
  while (containeeNode && containeeNode !== container) {
    containeeNode = containeeNode.parentNode;
  }
  return containeeNode === container;
}

;

// This masks some numeric issues in older versions of Firefox,
// where 1.0/Math.pow(10,2) != Math.pow(10,-2).
/** @type {function(number,number):number} */

function pow(base, exp) {
  if (exp < 0) {
    return 1.0 / Math.pow(base, -exp);
  }
  return Math.pow(base, exp);
}

;

var RGBA_RE = /^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*([01](?:\.\d+)?))?\)$/;

/**
 * Helper for toRGB_ which parses strings of the form:
 * rgb(123, 45, 67)
 * rgba(123, 45, 67, 0.5)
 * @return parsed {r,g,b,a?} tuple or null.
 */
function parseRGBA(rgbStr) {
  var bits = RGBA_RE.exec(rgbStr);
  if (!bits) return null;
  var r = parseInt(bits[1], 10),
      g = parseInt(bits[2], 10),
      b = parseInt(bits[3], 10);
  if (bits[4]) {
    return { r: r, g: g, b: b, a: parseFloat(bits[4]) };
  } else {
    return { r: r, g: g, b: b };
  }
}

/**
 * Converts any valid CSS color (hex, rgb(), named color) to an RGB tuple.
 *
 * @param {!string} colorStr Any valid CSS color string.
 * @return {{r:number,g:number,b:number,a:number?}} Parsed RGB tuple.
 * @private
 */

function toRGB_(colorStr) {
  // Strategy: First try to parse colorStr directly. This is fast & avoids DOM
  // manipulation.  If that fails (e.g. for named colors like 'red'), then
  // create a hidden DOM element and parse its computed color.
  var rgb = parseRGBA(colorStr);
  if (rgb) return rgb;

  var div = document.createElement('div');
  div.style.backgroundColor = colorStr;
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  var rgbStr = window.getComputedStyle(div, null).backgroundColor;
  document.body.removeChild(div);
  return parseRGBA(rgbStr);
}

;

/**
 * Checks whether the browser supports the &lt;canvas&gt; tag.
 * @param {HTMLCanvasElement=} opt_canvasElement Pass a canvas element as an
 *     optimization if you have one.
 * @return {boolean} Whether the browser supports canvas.
 */

function isCanvasSupported(opt_canvasElement) {
  try {
    var canvas = opt_canvasElement || document.createElement("canvas");
    canvas.getContext("2d");
  } catch (e) {
    return false;
  }
  return true;
}

;

/**
 * Parses the value as a floating point number. This is like the parseFloat()
 * built-in, but with a few differences:
 * - the empty string is parsed as null, rather than NaN.
 * - if the string cannot be parsed at all, an error is logged.
 * If the string can't be parsed, this method returns null.
 * @param {string} x The string to be parsed
 * @param {number=} opt_line_no The line number from which the string comes.
 * @param {string=} opt_line The text of the line from which the string comes.
 */

function parseFloat_(x, opt_line_no, opt_line) {
  var val = parseFloat(x);
  if (!isNaN(val)) return val;

  // Try to figure out what happeend.
  // If the value is the empty string, parse it as null.
  if (/^ *$/.test(x)) return null;

  // If it was actually "NaN", return it as NaN.
  if (/^ *nan *$/i.test(x)) return NaN;

  // Looks like a parsing error.
  var msg = "Unable to parse '" + x + "' as a number";
  if (opt_line !== undefined && opt_line_no !== undefined) {
    msg += " on line " + (1 + (opt_line_no || 0)) + " ('" + opt_line + "') of CSV.";
  }
  console.error(msg);

  return null;
}

;

// Label constants for the labelsKMB and labelsKMG2 options.
// (i.e. '100000' -> '100K')
var KMB_LABELS = ['K', 'M', 'B', 'T', 'Q'];
var KMG2_BIG_LABELS = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
var KMG2_SMALL_LABELS = ['m', 'u', 'n', 'p', 'f', 'a', 'z', 'y'];

/**
 * @private
 * Return a string version of a number. This respects the digitsAfterDecimal
 * and maxNumberWidth options.
 * @param {number} x The number to be formatted
 * @param {Dygraph} opts An options view
 */

function numberValueFormatter(x, opts) {
  var sigFigs = opts('sigFigs');

  if (sigFigs !== null) {
    // User has opted for a fixed number of significant figures.
    return floatFormat(x, sigFigs);
  }

  var digits = opts('digitsAfterDecimal');
  var maxNumberWidth = opts('maxNumberWidth');

  var kmb = opts('labelsKMB');
  var kmg2 = opts('labelsKMG2');

  var label;

  // switch to scientific notation if we underflow or overflow fixed display.
  if (x !== 0.0 && (Math.abs(x) >= Math.pow(10, maxNumberWidth) || Math.abs(x) < Math.pow(10, -digits))) {
    label = x.toExponential(digits);
  } else {
    label = '' + round_(x, digits);
  }

  if (kmb || kmg2) {
    var k;
    var k_labels = [];
    var m_labels = [];
    if (kmb) {
      k = 1000;
      k_labels = KMB_LABELS;
    }
    if (kmg2) {
      if (kmb) console.warn("Setting both labelsKMB and labelsKMG2. Pick one!");
      k = 1024;
      k_labels = KMG2_BIG_LABELS;
      m_labels = KMG2_SMALL_LABELS;
    }

    var absx = Math.abs(x);
    var n = pow(k, k_labels.length);
    for (var j = k_labels.length - 1; j >= 0; j--, n /= k) {
      if (absx >= n) {
        label = round_(x / n, digits) + k_labels[j];
        break;
      }
    }
    if (kmg2) {
      // TODO(danvk): clean up this logic. Why so different than kmb?
      var x_parts = String(x.toExponential()).split('e-');
      if (x_parts.length === 2 && x_parts[1] >= 3 && x_parts[1] <= 24) {
        if (x_parts[1] % 3 > 0) {
          label = round_(x_parts[0] / pow(10, x_parts[1] % 3), digits);
        } else {
          label = Number(x_parts[0]).toFixed(2);
        }
        label += m_labels[Math.floor(x_parts[1] / 3) - 1];
      }
    }
  }

  return label;
}

;

/**
 * variant for use as an axisLabelFormatter.
 * @private
 */

function numberAxisLabelFormatter(x, granularity, opts) {
  return numberValueFormatter.call(this, x, opts);
}

;

/**
 * @type {!Array.<string>}
 * @private
 * @constant
 */
var SHORT_MONTH_NAMES_ = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Convert a JS date to a string appropriate to display on an axis that
 * is displaying values at the stated granularity. This respects the
 * labelsUTC option.
 * @param {Date} date The date to format
 * @param {number} granularity One of the Dygraph granularity constants
 * @param {Dygraph} opts An options view
 * @return {string} The date formatted as local time
 * @private
 */

function dateAxisLabelFormatter(date, granularity, opts) {
  var utc = opts('labelsUTC');
  var accessors = utc ? DateAccessorsUTC : DateAccessorsLocal;

  var year = accessors.getFullYear(date),
      month = accessors.getMonth(date),
      day = accessors.getDate(date),
      hours = accessors.getHours(date),
      mins = accessors.getMinutes(date),
      secs = accessors.getSeconds(date),
      millis = accessors.getMilliseconds(date);

  if (granularity >= DygraphTickers.Granularity.DECADAL) {
    return '' + year;
  } else if (granularity >= DygraphTickers.Granularity.MONTHLY) {
    return SHORT_MONTH_NAMES_[month] + '&#160;' + year;
  } else {
    var frac = hours * 3600 + mins * 60 + secs + 1e-3 * millis;
    if (frac === 0 || granularity >= DygraphTickers.Granularity.DAILY) {
      // e.g. '21 Jan' (%d%b)
      return zeropad(day) + '&#160;' + SHORT_MONTH_NAMES_[month];
    } else if (granularity < DygraphTickers.Granularity.SECONDLY) {
      // e.g. 40.310 (meaning 40 seconds and 310 milliseconds)
      var str = "" + millis;
      return zeropad(secs) + "." + ('000' + str).substring(str.length);
    } else if (granularity > DygraphTickers.Granularity.MINUTELY) {
      return hmsString_(hours, mins, secs, 0);
    } else {
      return hmsString_(hours, mins, secs, millis);
    }
  }
}

;
// alias in case anyone is referencing the old method.
// Dygraph.dateAxisFormatter = Dygraph.dateAxisLabelFormatter;

/**
 * Return a string version of a JS date for a value label. This respects the
 * labelsUTC option.
 * @param {Date} date The date to be formatted
 * @param {Dygraph} opts An options view
 * @private
 */

function dateValueFormatter(d, opts) {
  return dateString_(d, opts('labelsUTC'));
}

;

/***/ }),
/* 1 */
/*!***********************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/datahandler/bars.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2013 David Eberlein (david.eberlein@ch.sauter-bc.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview DataHandler base implementation for the "bar" 
 * data formats. This implementation must be extended and the
 * extractSeries and rollingAverage must be implemented.
 * @author David Eberlein (david.eberlein@ch.sauter-bc.com)
 */

/*global Dygraph:false */
/*global DygraphLayout:false */


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _datahandler = __webpack_require__(/*! ./datahandler */ 6);

var _datahandler2 = _interopRequireDefault(_datahandler);

var _dygraphLayout = __webpack_require__(/*! ../dygraph-layout */ 9);

var _dygraphLayout2 = _interopRequireDefault(_dygraphLayout);

/**
 * @constructor
 * @extends {Dygraph.DataHandler}
 */
var BarsHandler = function BarsHandler() {
  _datahandler2['default'].call(this);
};
BarsHandler.prototype = new _datahandler2['default']();

// TODO(danvk): figure out why the jsdoc has to be copy/pasted from superclass.
//   (I get closure compiler errors if this isn't here.)
/**
 * @override
 * @param {!Array.<Array>} rawData The raw data passed into dygraphs where 
 *     rawData[i] = [x,ySeries1,...,ySeriesN].
 * @param {!number} seriesIndex Index of the series to extract. All other
 *     series should be ignored.
 * @param {!DygraphOptions} options Dygraph options.
 * @return {Array.<[!number,?number,?]>} The series in the unified data format
 *     where series[i] = [x,y,{extras}]. 
 */
BarsHandler.prototype.extractSeries = function (rawData, seriesIndex, options) {
  // Not implemented here must be extended
};

/**
 * @override
 * @param {!Array.<[!number,?number,?]>} series The series in the unified 
 *          data format where series[i] = [x,y,{extras}].
 * @param {!number} rollPeriod The number of points over which to average the data
 * @param {!DygraphOptions} options The dygraph options.
 * TODO(danvk): be more specific than "Array" here.
 * @return {!Array.<[!number,?number,?]>} the rolled series.
 */
BarsHandler.prototype.rollingAverage = function (series, rollPeriod, options) {
  // Not implemented here, must be extended.
};

/** @inheritDoc */
BarsHandler.prototype.onPointsCreated_ = function (series, points) {
  for (var i = 0; i < series.length; ++i) {
    var item = series[i];
    var point = points[i];
    point.y_top = NaN;
    point.y_bottom = NaN;
    point.yval_minus = _datahandler2['default'].parseFloat(item[2][0]);
    point.yval_plus = _datahandler2['default'].parseFloat(item[2][1]);
  }
};

/** @inheritDoc */
BarsHandler.prototype.getExtremeYValues = function (series, dateWindow, options) {
  var minY = null,
      maxY = null,
      y;

  var firstIdx = 0;
  var lastIdx = series.length - 1;

  for (var j = firstIdx; j <= lastIdx; j++) {
    y = series[j][1];
    if (y === null || isNaN(y)) continue;

    var low = series[j][2][0];
    var high = series[j][2][1];

    if (low > y) low = y; // this can happen with custom bars,
    if (high < y) high = y; // e.g. in tests/custom-bars.html

    if (maxY === null || high > maxY) maxY = high;
    if (minY === null || low < minY) minY = low;
  }

  return [minY, maxY];
};

/** @inheritDoc */
BarsHandler.prototype.onLineEvaluated = function (points, axis, logscale) {
  var point;
  for (var j = 0; j < points.length; j++) {
    // Copy over the error terms
    point = points[j];
    point.y_top = _dygraphLayout2['default'].calcYNormal_(axis, point.yval_minus, logscale);
    point.y_bottom = _dygraphLayout2['default'].calcYNormal_(axis, point.yval_plus, logscale);
  }
};

exports['default'] = BarsHandler;
module.exports = exports['default'];

/***/ }),
/* 2 */
/*!**************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/dygraph.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * @license
 * Copyright 2006 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview Creates an interactive, zoomable graph based on a CSV file or
 * string. Dygraph can handle multiple series with or without error bars. The
 * date/value ranges will be automatically set. Dygraph uses the
 * &lt;canvas&gt; tag, so it only works in FF1.5+.
 * @author danvdk@gmail.com (Dan Vanderkam)

  Usage:
   <div id="graphdiv" style="width:800px; height:500px;"></div>
   <script type="text/javascript">
     new Dygraph(document.getElementById("graphdiv"),
                 "datafile.csv",  // CSV file with headers
                 { }); // options
   </script>

 The CSV file is of the form

   Date,SeriesA,SeriesB,SeriesC
   YYYYMMDD,A1,B1,C1
   YYYYMMDD,A2,B2,C2

 If the 'errorBars' option is set in the constructor, the input should be of
 the form
   Date,SeriesA,SeriesB,...
   YYYYMMDD,A1,sigmaA1,B1,sigmaB1,...
   YYYYMMDD,A2,sigmaA2,B2,sigmaB2,...

 If the 'fractions' option is set, the input should be of the form:

   Date,SeriesA,SeriesB,...
   YYYYMMDD,A1/B1,A2/B2,...
   YYYYMMDD,A1/B1,A2/B2,...

 And error bars will be calculated automatically using a binomial distribution.

 For further documentation and examples, see http://dygraphs.com/
 */



Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dygraphLayout = __webpack_require__(/*! ./dygraph-layout */ 9);

var _dygraphLayout2 = _interopRequireDefault(_dygraphLayout);

var _dygraphCanvas = __webpack_require__(/*! ./dygraph-canvas */ 10);

var _dygraphCanvas2 = _interopRequireDefault(_dygraphCanvas);

var _dygraphOptions = __webpack_require__(/*! ./dygraph-options */ 19);

var _dygraphOptions2 = _interopRequireDefault(_dygraphOptions);

var _dygraphInteractionModel = __webpack_require__(/*! ./dygraph-interaction-model */ 5);

var _dygraphInteractionModel2 = _interopRequireDefault(_dygraphInteractionModel);

var _dygraphTickers = __webpack_require__(/*! ./dygraph-tickers */ 4);

var DygraphTickers = _interopRequireWildcard(_dygraphTickers);

var _dygraphUtils = __webpack_require__(/*! ./dygraph-utils */ 0);

var utils = _interopRequireWildcard(_dygraphUtils);

var _dygraphDefaultAttrs = __webpack_require__(/*! ./dygraph-default-attrs */ 11);

var _dygraphDefaultAttrs2 = _interopRequireDefault(_dygraphDefaultAttrs);

var _dygraphOptionsReference = __webpack_require__(/*! ./dygraph-options-reference */ 12);

var _dygraphOptionsReference2 = _interopRequireDefault(_dygraphOptionsReference);

var _iframeTarp = __webpack_require__(/*! ./iframe-tarp */ 13);

var _iframeTarp2 = _interopRequireDefault(_iframeTarp);

var _datahandlerDefault = __webpack_require__(/*! ./datahandler/default */ 14);

var _datahandlerDefault2 = _interopRequireDefault(_datahandlerDefault);

var _datahandlerBarsError = __webpack_require__(/*! ./datahandler/bars-error */ 20);

var _datahandlerBarsError2 = _interopRequireDefault(_datahandlerBarsError);

var _datahandlerBarsCustom = __webpack_require__(/*! ./datahandler/bars-custom */ 21);

var _datahandlerBarsCustom2 = _interopRequireDefault(_datahandlerBarsCustom);

var _datahandlerDefaultFractions = __webpack_require__(/*! ./datahandler/default-fractions */ 22);

var _datahandlerDefaultFractions2 = _interopRequireDefault(_datahandlerDefaultFractions);

var _datahandlerBarsFractions = __webpack_require__(/*! ./datahandler/bars-fractions */ 23);

var _datahandlerBarsFractions2 = _interopRequireDefault(_datahandlerBarsFractions);

var _datahandlerBars = __webpack_require__(/*! ./datahandler/bars */ 1);

var _datahandlerBars2 = _interopRequireDefault(_datahandlerBars);

var _pluginsAnnotations = __webpack_require__(/*! ./plugins/annotations */ 24);

var _pluginsAnnotations2 = _interopRequireDefault(_pluginsAnnotations);

var _pluginsAxes = __webpack_require__(/*! ./plugins/axes */ 25);

var _pluginsAxes2 = _interopRequireDefault(_pluginsAxes);

var _pluginsChartLabels = __webpack_require__(/*! ./plugins/chart-labels */ 26);

var _pluginsChartLabels2 = _interopRequireDefault(_pluginsChartLabels);

var _pluginsGrid = __webpack_require__(/*! ./plugins/grid */ 27);

var _pluginsGrid2 = _interopRequireDefault(_pluginsGrid);

var _pluginsLegend = __webpack_require__(/*! ./plugins/legend */ 28);

var _pluginsLegend2 = _interopRequireDefault(_pluginsLegend);

var _pluginsRangeSelector = __webpack_require__(/*! ./plugins/range-selector */ 29);

var _pluginsRangeSelector2 = _interopRequireDefault(_pluginsRangeSelector);

var _dygraphGviz = __webpack_require__(/*! ./dygraph-gviz */ 30);

var _dygraphGviz2 = _interopRequireDefault(_dygraphGviz);

"use strict";

/**
 * Creates an interactive, zoomable chart.
 *
 * @constructor
 * @param {div | String} div A div or the id of a div into which to construct
 * the chart.
 * @param {String | Function} file A file containing CSV data or a function
 * that returns this data. The most basic expected format for each line is
 * "YYYY/MM/DD,val1,val2,...". For more information, see
 * http://dygraphs.com/data.html.
 * @param {Object} attrs Various other attributes, e.g. errorBars determines
 * whether the input data contains error ranges. For a complete list of
 * options, see http://dygraphs.com/options.html.
 */
var Dygraph = function Dygraph(div, data, opts) {
  this.__init__(div, data, opts);
};

Dygraph.NAME = "Dygraph";
Dygraph.VERSION = "2.0.0";

// Various default values
Dygraph.DEFAULT_ROLL_PERIOD = 1;
Dygraph.DEFAULT_WIDTH = 480;
Dygraph.DEFAULT_HEIGHT = 320;

// For max 60 Hz. animation:
Dygraph.ANIMATION_STEPS = 12;
Dygraph.ANIMATION_DURATION = 200;

/**
 * Standard plotters. These may be used by clients.
 * Available plotters are:
 * - Dygraph.Plotters.linePlotter: draws central lines (most common)
 * - Dygraph.Plotters.errorPlotter: draws error bars
 * - Dygraph.Plotters.fillPlotter: draws fills under lines (used with fillGraph)
 *
 * By default, the plotter is [fillPlotter, errorPlotter, linePlotter].
 * This causes all the lines to be drawn over all the fills/error bars.
 */
Dygraph.Plotters = _dygraphCanvas2['default']._Plotters;

// Used for initializing annotation CSS rules only once.
Dygraph.addedAnnotationCSS = false;

/**
 * Initializes the Dygraph. This creates a new DIV and constructs the PlotKit
 * and context &lt;canvas&gt; inside of it. See the constructor for details.
 * on the parameters.
 * @param {Element} div the Element to render the graph into.
 * @param {string | Function} file Source data
 * @param {Object} attrs Miscellaneous other options
 * @private
 */
Dygraph.prototype.__init__ = function (div, file, attrs) {
  this.is_initial_draw_ = true;
  this.readyFns_ = [];

  // Support two-argument constructor
  if (attrs === null || attrs === undefined) {
    attrs = {};
  }

  attrs = Dygraph.copyUserAttrs_(attrs);

  if (typeof div == 'string') {
    div = document.getElementById(div);
  }

  if (!div) {
    throw new Error('Constructing dygraph with a non-existent div!');
  }

  // Copy the important bits into the object
  // TODO(danvk): most of these should just stay in the attrs_ dictionary.
  this.maindiv_ = div;
  this.file_ = file;
  this.rollPeriod_ = attrs.rollPeriod || Dygraph.DEFAULT_ROLL_PERIOD;
  this.previousVerticalX_ = -1;
  this.fractions_ = attrs.fractions || false;
  this.dateWindow_ = attrs.dateWindow || null;

  this.annotations_ = [];

  // Clear the div. This ensure that, if multiple dygraphs are passed the same
  // div, then only one will be drawn.
  div.innerHTML = "";

  // For historical reasons, the 'width' and 'height' options trump all CSS
  // rules _except_ for an explicit 'width' or 'height' on the div.
  // As an added convenience, if the div has zero height (like <div></div> does
  // without any styles), then we use a default height/width.
  if (div.style.width === '' && attrs.width) {
    div.style.width = attrs.width + "px";
  }
  if (div.style.height === '' && attrs.height) {
    div.style.height = attrs.height + "px";
  }
  if (div.style.height === '' && div.clientHeight === 0) {
    div.style.height = Dygraph.DEFAULT_HEIGHT + "px";
    if (div.style.width === '') {
      div.style.width = Dygraph.DEFAULT_WIDTH + "px";
    }
  }
  // These will be zero if the dygraph's div is hidden. In that case,
  // use the user-specified attributes if present. If not, use zero
  // and assume the user will call resize to fix things later.
  this.width_ = div.clientWidth || attrs.width || 0;
  this.height_ = div.clientHeight || attrs.height || 0;

  // TODO(danvk): set fillGraph to be part of attrs_ here, not user_attrs_.
  if (attrs.stackedGraph) {
    attrs.fillGraph = true;
    // TODO(nikhilk): Add any other stackedGraph checks here.
  }

  // DEPRECATION WARNING: All option processing should be moved from
  // attrs_ and user_attrs_ to options_, which holds all this information.
  //
  // Dygraphs has many options, some of which interact with one another.
  // To keep track of everything, we maintain two sets of options:
  //
  //  this.user_attrs_   only options explicitly set by the user.
  //  this.attrs_        defaults, options derived from user_attrs_, data.
  //
  // Options are then accessed this.attr_('attr'), which first looks at
  // user_attrs_ and then computed attrs_. This way Dygraphs can set intelligent
  // defaults without overriding behavior that the user specifically asks for.
  this.user_attrs_ = {};
  utils.update(this.user_attrs_, attrs);

  // This sequence ensures that Dygraph.DEFAULT_ATTRS is never modified.
  this.attrs_ = {};
  utils.updateDeep(this.attrs_, _dygraphDefaultAttrs2['default']);

  this.boundaryIds_ = [];
  this.setIndexByName_ = {};
  this.datasetIndex_ = [];

  this.registeredEvents_ = [];
  this.eventListeners_ = {};

  this.attributes_ = new _dygraphOptions2['default'](this);

  // Create the containing DIV and other interactive elements
  this.createInterface_();

  // Activate plugins.
  this.plugins_ = [];
  var plugins = Dygraph.PLUGINS.concat(this.getOption('plugins'));
  for (var i = 0; i < plugins.length; i++) {
    // the plugins option may contain either plugin classes or instances.
    // Plugin instances contain an activate method.
    var Plugin = plugins[i]; // either a constructor or an instance.
    var pluginInstance;
    if (typeof Plugin.activate !== 'undefined') {
      pluginInstance = Plugin;
    } else {
      pluginInstance = new Plugin();
    }

    var pluginDict = {
      plugin: pluginInstance,
      events: {},
      options: {},
      pluginOptions: {}
    };

    var handlers = pluginInstance.activate(this);
    for (var eventName in handlers) {
      if (!handlers.hasOwnProperty(eventName)) continue;
      // TODO(danvk): validate eventName.
      pluginDict.events[eventName] = handlers[eventName];
    }

    this.plugins_.push(pluginDict);
  }

  // At this point, plugins can no longer register event handlers.
  // Construct a map from event -> ordered list of [callback, plugin].
  for (var i = 0; i < this.plugins_.length; i++) {
    var plugin_dict = this.plugins_[i];
    for (var eventName in plugin_dict.events) {
      if (!plugin_dict.events.hasOwnProperty(eventName)) continue;
      var callback = plugin_dict.events[eventName];

      var pair = [plugin_dict.plugin, callback];
      if (!(eventName in this.eventListeners_)) {
        this.eventListeners_[eventName] = [pair];
      } else {
        this.eventListeners_[eventName].push(pair);
      }
    }
  }

  this.createDragInterface_();

  this.start_();
};

/**
 * Triggers a cascade of events to the various plugins which are interested in them.
 * Returns true if the "default behavior" should be prevented, i.e. if one
 * of the event listeners called event.preventDefault().
 * @private
 */
Dygraph.prototype.cascadeEvents_ = function (name, extra_props) {
  if (!(name in this.eventListeners_)) return false;

  // QUESTION: can we use objects & prototypes to speed this up?
  var e = {
    dygraph: this,
    cancelable: false,
    defaultPrevented: false,
    preventDefault: function preventDefault() {
      if (!e.cancelable) throw "Cannot call preventDefault on non-cancelable event.";
      e.defaultPrevented = true;
    },
    propagationStopped: false,
    stopPropagation: function stopPropagation() {
      e.propagationStopped = true;
    }
  };
  utils.update(e, extra_props);

  var callback_plugin_pairs = this.eventListeners_[name];
  if (callback_plugin_pairs) {
    for (var i = callback_plugin_pairs.length - 1; i >= 0; i--) {
      var plugin = callback_plugin_pairs[i][0];
      var callback = callback_plugin_pairs[i][1];
      callback.call(plugin, e);
      if (e.propagationStopped) break;
    }
  }
  return e.defaultPrevented;
};

/**
 * Fetch a plugin instance of a particular class. Only for testing.
 * @private
 * @param {!Class} type The type of the plugin.
 * @return {Object} Instance of the plugin, or null if there is none.
 */
Dygraph.prototype.getPluginInstance_ = function (type) {
  for (var i = 0; i < this.plugins_.length; i++) {
    var p = this.plugins_[i];
    if (p.plugin instanceof type) {
      return p.plugin;
    }
  }
  return null;
};

/**
 * Returns the zoomed status of the chart for one or both axes.
 *
 * Axis is an optional parameter. Can be set to 'x' or 'y'.
 *
 * The zoomed status for an axis is set whenever a user zooms using the mouse
 * or when the dateWindow or valueRange are updated. Double-clicking or calling
 * resetZoom() resets the zoom status for the chart.
 */
Dygraph.prototype.isZoomed = function (axis) {
  var isZoomedX = !!this.dateWindow_;
  if (axis === 'x') return isZoomedX;

  var isZoomedY = this.axes_.map(function (axis) {
    return !!axis.valueRange;
  }).indexOf(true) >= 0;
  if (axis === null || axis === undefined) {
    return isZoomedX || isZoomedY;
  }
  if (axis === 'y') return isZoomedY;

  throw new Error('axis parameter is [' + axis + '] must be null, \'x\' or \'y\'.');
};

/**
 * Returns information about the Dygraph object, including its containing ID.
 */
Dygraph.prototype.toString = function () {
  var maindiv = this.maindiv_;
  var id = maindiv && maindiv.id ? maindiv.id : maindiv;
  return "[Dygraph " + id + "]";
};

/**
 * @private
 * Returns the value of an option. This may be set by the user (either in the
 * constructor or by calling updateOptions) or by dygraphs, and may be set to a
 * per-series value.
 * @param {string} name The name of the option, e.g. 'rollPeriod'.
 * @param {string} [seriesName] The name of the series to which the option
 * will be applied. If no per-series value of this option is available, then
 * the global value is returned. This is optional.
 * @return { ... } The value of the option.
 */
Dygraph.prototype.attr_ = function (name, seriesName) {
  // For "production" code, this gets removed by uglifyjs.
  if (typeof process !== 'undefined') {
    if (process.env.NODE_ENV != 'production') {
      if (typeof _dygraphOptionsReference2['default'] === 'undefined') {
        console.error('Must include options reference JS for testing');
      } else if (!_dygraphOptionsReference2['default'].hasOwnProperty(name)) {
        console.error('Dygraphs is using property ' + name + ', which has no ' + 'entry in the Dygraphs.OPTIONS_REFERENCE listing.');
        // Only log this error once.
        _dygraphOptionsReference2['default'][name] = true;
      }
    }
  }
  return seriesName ? this.attributes_.getForSeries(name, seriesName) : this.attributes_.get(name);
};

/**
 * Returns the current value for an option, as set in the constructor or via
 * updateOptions. You may pass in an (optional) series name to get per-series
 * values for the option.
 *
 * All values returned by this method should be considered immutable. If you
 * modify them, there is no guarantee that the changes will be honored or that
 * dygraphs will remain in a consistent state. If you want to modify an option,
 * use updateOptions() instead.
 *
 * @param {string} name The name of the option (e.g. 'strokeWidth')
 * @param {string=} opt_seriesName Series name to get per-series values.
 * @return {*} The value of the option.
 */
Dygraph.prototype.getOption = function (name, opt_seriesName) {
  return this.attr_(name, opt_seriesName);
};

/**
 * Like getOption(), but specifically returns a number.
 * This is a convenience function for working with the Closure Compiler.
 * @param {string} name The name of the option (e.g. 'strokeWidth')
 * @param {string=} opt_seriesName Series name to get per-series values.
 * @return {number} The value of the option.
 * @private
 */
Dygraph.prototype.getNumericOption = function (name, opt_seriesName) {
  return (/** @type{number} */this.getOption(name, opt_seriesName)
  );
};

/**
 * Like getOption(), but specifically returns a string.
 * This is a convenience function for working with the Closure Compiler.
 * @param {string} name The name of the option (e.g. 'strokeWidth')
 * @param {string=} opt_seriesName Series name to get per-series values.
 * @return {string} The value of the option.
 * @private
 */
Dygraph.prototype.getStringOption = function (name, opt_seriesName) {
  return (/** @type{string} */this.getOption(name, opt_seriesName)
  );
};

/**
 * Like getOption(), but specifically returns a boolean.
 * This is a convenience function for working with the Closure Compiler.
 * @param {string} name The name of the option (e.g. 'strokeWidth')
 * @param {string=} opt_seriesName Series name to get per-series values.
 * @return {boolean} The value of the option.
 * @private
 */
Dygraph.prototype.getBooleanOption = function (name, opt_seriesName) {
  return (/** @type{boolean} */this.getOption(name, opt_seriesName)
  );
};

/**
 * Like getOption(), but specifically returns a function.
 * This is a convenience function for working with the Closure Compiler.
 * @param {string} name The name of the option (e.g. 'strokeWidth')
 * @param {string=} opt_seriesName Series name to get per-series values.
 * @return {function(...)} The value of the option.
 * @private
 */
Dygraph.prototype.getFunctionOption = function (name, opt_seriesName) {
  return (/** @type{function(...)} */this.getOption(name, opt_seriesName)
  );
};

Dygraph.prototype.getOptionForAxis = function (name, axis) {
  return this.attributes_.getForAxis(name, axis);
};

/**
 * @private
 * @param {string} axis The name of the axis (i.e. 'x', 'y' or 'y2')
 * @return { ... } A function mapping string -> option value
 */
Dygraph.prototype.optionsViewForAxis_ = function (axis) {
  var self = this;
  return function (opt) {
    var axis_opts = self.user_attrs_.axes;
    if (axis_opts && axis_opts[axis] && axis_opts[axis].hasOwnProperty(opt)) {
      return axis_opts[axis][opt];
    }

    // I don't like that this is in a second spot.
    if (axis === 'x' && opt === 'logscale') {
      // return the default value.
      // TODO(konigsberg): pull the default from a global default.
      return false;
    }

    // user-specified attributes always trump defaults, even if they're less
    // specific.
    if (typeof self.user_attrs_[opt] != 'undefined') {
      return self.user_attrs_[opt];
    }

    axis_opts = self.attrs_.axes;
    if (axis_opts && axis_opts[axis] && axis_opts[axis].hasOwnProperty(opt)) {
      return axis_opts[axis][opt];
    }
    // check old-style axis options
    // TODO(danvk): add a deprecation warning if either of these match.
    if (axis == 'y' && self.axes_[0].hasOwnProperty(opt)) {
      return self.axes_[0][opt];
    } else if (axis == 'y2' && self.axes_[1].hasOwnProperty(opt)) {
      return self.axes_[1][opt];
    }
    return self.attr_(opt);
  };
};

/**
 * Returns the current rolling period, as set by the user or an option.
 * @return {number} The number of points in the rolling window
 */
Dygraph.prototype.rollPeriod = function () {
  return this.rollPeriod_;
};

/**
 * Returns the currently-visible x-range. This can be affected by zooming,
 * panning or a call to updateOptions.
 * Returns a two-element array: [left, right].
 * If the Dygraph has dates on the x-axis, these will be millis since epoch.
 */
Dygraph.prototype.xAxisRange = function () {
  return this.dateWindow_ ? this.dateWindow_ : this.xAxisExtremes();
};

/**
 * Returns the lower- and upper-bound x-axis values of the data set.
 */
Dygraph.prototype.xAxisExtremes = function () {
  var pad = this.getNumericOption('xRangePad') / this.plotter_.area.w;
  if (this.numRows() === 0) {
    return [0 - pad, 1 + pad];
  }
  var left = this.rawData_[0][0];
  var right = this.rawData_[this.rawData_.length - 1][0];
  if (pad) {
    // Must keep this in sync with dygraph-layout _evaluateLimits()
    var range = right - left;
    left -= range * pad;
    right += range * pad;
  }
  return [left, right];
};

/**
 * Returns the lower- and upper-bound y-axis values for each axis. These are
 * the ranges you'll get if you double-click to zoom out or call resetZoom().
 * The return value is an array of [low, high] tuples, one for each y-axis.
 */
Dygraph.prototype.yAxisExtremes = function () {
  // TODO(danvk): this is pretty inefficient
  var packed = this.gatherDatasets_(this.rolledSeries_, null);
  var extremes = packed.extremes;

  var saveAxes = this.axes_;
  this.computeYAxisRanges_(extremes);
  var newAxes = this.axes_;
  this.axes_ = saveAxes;
  return newAxes.map(function (axis) {
    return axis.extremeRange;
  });
};

/**
 * Returns the currently-visible y-range for an axis. This can be affected by
 * zooming, panning or a call to updateOptions. Axis indices are zero-based. If
 * called with no arguments, returns the range of the first axis.
 * Returns a two-element array: [bottom, top].
 */
Dygraph.prototype.yAxisRange = function (idx) {
  if (typeof idx == "undefined") idx = 0;
  if (idx < 0 || idx >= this.axes_.length) {
    return null;
  }
  var axis = this.axes_[idx];
  return [axis.computedValueRange[0], axis.computedValueRange[1]];
};

/**
 * Returns the currently-visible y-ranges for each axis. This can be affected by
 * zooming, panning, calls to updateOptions, etc.
 * Returns an array of [bottom, top] pairs, one for each y-axis.
 */
Dygraph.prototype.yAxisRanges = function () {
  var ret = [];
  for (var i = 0; i < this.axes_.length; i++) {
    ret.push(this.yAxisRange(i));
  }
  return ret;
};

// TODO(danvk): use these functions throughout dygraphs.
/**
 * Convert from data coordinates to canvas/div X/Y coordinates.
 * If specified, do this conversion for the coordinate system of a particular
 * axis. Uses the first axis by default.
 * Returns a two-element array: [X, Y]
 *
 * Note: use toDomXCoord instead of toDomCoords(x, null) and use toDomYCoord
 * instead of toDomCoords(null, y, axis).
 */
Dygraph.prototype.toDomCoords = function (x, y, axis) {
  return [this.toDomXCoord(x), this.toDomYCoord(y, axis)];
};

/**
 * Convert from data x coordinates to canvas/div X coordinate.
 * If specified, do this conversion for the coordinate system of a particular
 * axis.
 * Returns a single value or null if x is null.
 */
Dygraph.prototype.toDomXCoord = function (x) {
  if (x === null) {
    return null;
  }

  var area = this.plotter_.area;
  var xRange = this.xAxisRange();
  return area.x + (x - xRange[0]) / (xRange[1] - xRange[0]) * area.w;
};

/**
 * Convert from data x coordinates to canvas/div Y coordinate and optional
 * axis. Uses the first axis by default.
 *
 * returns a single value or null if y is null.
 */
Dygraph.prototype.toDomYCoord = function (y, axis) {
  var pct = this.toPercentYCoord(y, axis);

  if (pct === null) {
    return null;
  }
  var area = this.plotter_.area;
  return area.y + pct * area.h;
};

/**
 * Convert from canvas/div coords to data coordinates.
 * If specified, do this conversion for the coordinate system of a particular
 * axis. Uses the first axis by default.
 * Returns a two-element array: [X, Y].
 *
 * Note: use toDataXCoord instead of toDataCoords(x, null) and use toDataYCoord
 * instead of toDataCoords(null, y, axis).
 */
Dygraph.prototype.toDataCoords = function (x, y, axis) {
  return [this.toDataXCoord(x), this.toDataYCoord(y, axis)];
};

/**
 * Convert from canvas/div x coordinate to data coordinate.
 *
 * If x is null, this returns null.
 */
Dygraph.prototype.toDataXCoord = function (x) {
  if (x === null) {
    return null;
  }

  var area = this.plotter_.area;
  var xRange = this.xAxisRange();

  if (!this.attributes_.getForAxis("logscale", 'x')) {
    return xRange[0] + (x - area.x) / area.w * (xRange[1] - xRange[0]);
  } else {
    var pct = (x - area.x) / area.w;
    return utils.logRangeFraction(xRange[0], xRange[1], pct);
  }
};

/**
 * Convert from canvas/div y coord to value.
 *
 * If y is null, this returns null.
 * if axis is null, this uses the first axis.
 */
Dygraph.prototype.toDataYCoord = function (y, axis) {
  if (y === null) {
    return null;
  }

  var area = this.plotter_.area;
  var yRange = this.yAxisRange(axis);

  if (typeof axis == "undefined") axis = 0;
  if (!this.attributes_.getForAxis("logscale", axis)) {
    return yRange[0] + (area.y + area.h - y) / area.h * (yRange[1] - yRange[0]);
  } else {
    // Computing the inverse of toDomCoord.
    var pct = (y - area.y) / area.h;
    // Note reversed yRange, y1 is on top with pct==0.
    return utils.logRangeFraction(yRange[1], yRange[0], pct);
  }
};

/**
 * Converts a y for an axis to a percentage from the top to the
 * bottom of the drawing area.
 *
 * If the coordinate represents a value visible on the canvas, then
 * the value will be between 0 and 1, where 0 is the top of the canvas.
 * However, this method will return values outside the range, as
 * values can fall outside the canvas.
 *
 * If y is null, this returns null.
 * if axis is null, this uses the first axis.
 *
 * @param {number} y The data y-coordinate.
 * @param {number} [axis] The axis number on which the data coordinate lives.
 * @return {number} A fraction in [0, 1] where 0 = the top edge.
 */
Dygraph.prototype.toPercentYCoord = function (y, axis) {
  if (y === null) {
    return null;
  }
  if (typeof axis == "undefined") axis = 0;

  var yRange = this.yAxisRange(axis);

  var pct;
  var logscale = this.attributes_.getForAxis("logscale", axis);
  if (logscale) {
    var logr0 = utils.log10(yRange[0]);
    var logr1 = utils.log10(yRange[1]);
    pct = (logr1 - utils.log10(y)) / (logr1 - logr0);
  } else {
    // yRange[1] - y is unit distance from the bottom.
    // yRange[1] - yRange[0] is the scale of the range.
    // (yRange[1] - y) / (yRange[1] - yRange[0]) is the % from the bottom.
    pct = (yRange[1] - y) / (yRange[1] - yRange[0]);
  }
  return pct;
};

/**
 * Converts an x value to a percentage from the left to the right of
 * the drawing area.
 *
 * If the coordinate represents a value visible on the canvas, then
 * the value will be between 0 and 1, where 0 is the left of the canvas.
 * However, this method will return values outside the range, as
 * values can fall outside the canvas.
 *
 * If x is null, this returns null.
 * @param {number} x The data x-coordinate.
 * @return {number} A fraction in [0, 1] where 0 = the left edge.
 */
Dygraph.prototype.toPercentXCoord = function (x) {
  if (x === null) {
    return null;
  }

  var xRange = this.xAxisRange();
  var pct;
  var logscale = this.attributes_.getForAxis("logscale", 'x');
  if (logscale === true) {
    // logscale can be null so we test for true explicitly.
    var logr0 = utils.log10(xRange[0]);
    var logr1 = utils.log10(xRange[1]);
    pct = (utils.log10(x) - logr0) / (logr1 - logr0);
  } else {
    // x - xRange[0] is unit distance from the left.
    // xRange[1] - xRange[0] is the scale of the range.
    // The full expression below is the % from the left.
    pct = (x - xRange[0]) / (xRange[1] - xRange[0]);
  }
  return pct;
};

/**
 * Returns the number of columns (including the independent variable).
 * @return {number} The number of columns.
 */
Dygraph.prototype.numColumns = function () {
  if (!this.rawData_) return 0;
  return this.rawData_[0] ? this.rawData_[0].length : this.attr_("labels").length;
};

/**
 * Returns the number of rows (excluding any header/label row).
 * @return {number} The number of rows, less any header.
 */
Dygraph.prototype.numRows = function () {
  if (!this.rawData_) return 0;
  return this.rawData_.length;
};

/**
 * Returns the value in the given row and column. If the row and column exceed
 * the bounds on the data, returns null. Also returns null if the value is
 * missing.
 * @param {number} row The row number of the data (0-based). Row 0 is the
 *     first row of data, not a header row.
 * @param {number} col The column number of the data (0-based)
 * @return {number} The value in the specified cell or null if the row/col
 *     were out of range.
 */
Dygraph.prototype.getValue = function (row, col) {
  if (row < 0 || row > this.rawData_.length) return null;
  if (col < 0 || col > this.rawData_[row].length) return null;

  return this.rawData_[row][col];
};

/**
 * Generates interface elements for the Dygraph: a containing div, a div to
 * display the current point, and a textbox to adjust the rolling average
 * period. Also creates the Renderer/Layout elements.
 * @private
 */
Dygraph.prototype.createInterface_ = function () {
  // Create the all-enclosing graph div
  var enclosing = this.maindiv_;

  this.graphDiv = document.createElement("div");

  // TODO(danvk): any other styles that are useful to set here?
  this.graphDiv.style.textAlign = 'left'; // This is a CSS "reset"
  this.graphDiv.style.position = 'relative';
  enclosing.appendChild(this.graphDiv);

  // Create the canvas for interactive parts of the chart.
  this.canvas_ = utils.createCanvas();
  this.canvas_.style.position = "absolute";

  // ... and for static parts of the chart.
  this.hidden_ = this.createPlotKitCanvas_(this.canvas_);

  this.canvas_ctx_ = utils.getContext(this.canvas_);
  this.hidden_ctx_ = utils.getContext(this.hidden_);

  this.resizeElements_();

  // The interactive parts of the graph are drawn on top of the chart.
  this.graphDiv.appendChild(this.hidden_);
  this.graphDiv.appendChild(this.canvas_);
  this.mouseEventElement_ = this.createMouseEventElement_();

  // Create the grapher
  this.layout_ = new _dygraphLayout2['default'](this);

  var dygraph = this;

  this.mouseMoveHandler_ = function (e) {
    dygraph.mouseMove_(e);
  };

  this.mouseOutHandler_ = function (e) {
    // The mouse has left the chart if:
    // 1. e.target is inside the chart
    // 2. e.relatedTarget is outside the chart
    var target = e.target || e.fromElement;
    var relatedTarget = e.relatedTarget || e.toElement;
    if (utils.isNodeContainedBy(target, dygraph.graphDiv) && !utils.isNodeContainedBy(relatedTarget, dygraph.graphDiv)) {
      dygraph.mouseOut_(e);
    }
  };

  this.addAndTrackEvent(window, 'mouseout', this.mouseOutHandler_);
  this.addAndTrackEvent(this.mouseEventElement_, 'mousemove', this.mouseMoveHandler_);

  // Don't recreate and register the resize handler on subsequent calls.
  // This happens when the graph is resized.
  if (!this.resizeHandler_) {
    this.resizeHandler_ = function (e) {
      dygraph.resize();
    };

    // Update when the window is resized.
    // TODO(danvk): drop frames depending on complexity of the chart.
    this.addAndTrackEvent(window, 'resize', this.resizeHandler_);
  }
};

Dygraph.prototype.resizeElements_ = function () {
  this.graphDiv.style.width = this.width_ + "px";
  this.graphDiv.style.height = this.height_ + "px";

  var pixelRatioOption = this.getNumericOption('pixelRatio');

  var canvasScale = pixelRatioOption || utils.getContextPixelRatio(this.canvas_ctx_);
  this.canvas_.width = this.width_ * canvasScale;
  this.canvas_.height = this.height_ * canvasScale;
  this.canvas_.style.width = this.width_ + "px"; // for IE
  this.canvas_.style.height = this.height_ + "px"; // for IE
  if (canvasScale !== 1) {
    this.canvas_ctx_.scale(canvasScale, canvasScale);
  }

  var hiddenScale = pixelRatioOption || utils.getContextPixelRatio(this.hidden_ctx_);
  this.hidden_.width = this.width_ * hiddenScale;
  this.hidden_.height = this.height_ * hiddenScale;
  this.hidden_.style.width = this.width_ + "px"; // for IE
  this.hidden_.style.height = this.height_ + "px"; // for IE
  if (hiddenScale !== 1) {
    this.hidden_ctx_.scale(hiddenScale, hiddenScale);
  }
};

/**
 * Detach DOM elements in the dygraph and null out all data references.
 * Calling this when you're done with a dygraph can dramatically reduce memory
 * usage. See, e.g., the tests/perf.html example.
 */
Dygraph.prototype.destroy = function () {
  this.canvas_ctx_.restore();
  this.hidden_ctx_.restore();

  // Destroy any plugins, in the reverse order that they were registered.
  for (var i = this.plugins_.length - 1; i >= 0; i--) {
    var p = this.plugins_.pop();
    if (p.plugin.destroy) p.plugin.destroy();
  }

  var removeRecursive = function removeRecursive(node) {
    while (node.hasChildNodes()) {
      removeRecursive(node.firstChild);
      node.removeChild(node.firstChild);
    }
  };

  this.removeTrackedEvents_();

  // remove mouse event handlers (This may not be necessary anymore)
  utils.removeEvent(window, 'mouseout', this.mouseOutHandler_);
  utils.removeEvent(this.mouseEventElement_, 'mousemove', this.mouseMoveHandler_);

  // remove window handlers
  utils.removeEvent(window, 'resize', this.resizeHandler_);
  this.resizeHandler_ = null;

  removeRecursive(this.maindiv_);

  var nullOut = function nullOut(obj) {
    for (var n in obj) {
      if (typeof obj[n] === 'object') {
        obj[n] = null;
      }
    }
  };
  // These may not all be necessary, but it can't hurt...
  nullOut(this.layout_);
  nullOut(this.plotter_);
  nullOut(this);
};

/**
 * Creates the canvas on which the chart will be drawn. Only the Renderer ever
 * draws on this particular canvas. All Dygraph work (i.e. drawing hover dots
 * or the zoom rectangles) is done on this.canvas_.
 * @param {Object} canvas The Dygraph canvas over which to overlay the plot
 * @return {Object} The newly-created canvas
 * @private
 */
Dygraph.prototype.createPlotKitCanvas_ = function (canvas) {
  var h = utils.createCanvas();
  h.style.position = "absolute";
  // TODO(danvk): h should be offset from canvas. canvas needs to include
  // some extra area to make it easier to zoom in on the far left and far
  // right. h needs to be precisely the plot area, so that clipping occurs.
  h.style.top = canvas.style.top;
  h.style.left = canvas.style.left;
  h.width = this.width_;
  h.height = this.height_;
  h.style.width = this.width_ + "px"; // for IE
  h.style.height = this.height_ + "px"; // for IE
  return h;
};

/**
 * Creates an overlay element used to handle mouse events.
 * @return {Object} The mouse event element.
 * @private
 */
Dygraph.prototype.createMouseEventElement_ = function () {
  return this.canvas_;
};

/**
 * Generate a set of distinct colors for the data series. This is done with a
 * color wheel. Saturation/Value are customizable, and the hue is
 * equally-spaced around the color wheel. If a custom set of colors is
 * specified, that is used instead.
 * @private
 */
Dygraph.prototype.setColors_ = function () {
  var labels = this.getLabels();
  var num = labels.length - 1;
  this.colors_ = [];
  this.colorsMap_ = {};

  // These are used for when no custom colors are specified.
  var sat = this.getNumericOption('colorSaturation') || 1.0;
  var val = this.getNumericOption('colorValue') || 0.5;
  var half = Math.ceil(num / 2);

  var colors = this.getOption('colors');
  var visibility = this.visibility();
  for (var i = 0; i < num; i++) {
    if (!visibility[i]) {
      continue;
    }
    var label = labels[i + 1];
    var colorStr = this.attributes_.getForSeries('color', label);
    if (!colorStr) {
      if (colors) {
        colorStr = colors[i % colors.length];
      } else {
        // alternate colors for high contrast.
        var idx = i % 2 ? half + (i + 1) / 2 : Math.ceil((i + 1) / 2);
        var hue = 1.0 * idx / (1 + num);
        colorStr = utils.hsvToRGB(hue, sat, val);
      }
    }
    this.colors_.push(colorStr);
    this.colorsMap_[label] = colorStr;
  }
};

/**
 * Return the list of colors. This is either the list of colors passed in the
 * attributes or the autogenerated list of rgb(r,g,b) strings.
 * This does not return colors for invisible series.
 * @return {Array.<string>} The list of colors.
 */
Dygraph.prototype.getColors = function () {
  return this.colors_;
};

/**
 * Returns a few attributes of a series, i.e. its color, its visibility, which
 * axis it's assigned to, and its column in the original data.
 * Returns null if the series does not exist.
 * Otherwise, returns an object with column, visibility, color and axis properties.
 * The "axis" property will be set to 1 for y1 and 2 for y2.
 * The "column" property can be fed back into getValue(row, column) to get
 * values for this series.
 */
Dygraph.prototype.getPropertiesForSeries = function (series_name) {
  var idx = -1;
  var labels = this.getLabels();
  for (var i = 1; i < labels.length; i++) {
    if (labels[i] == series_name) {
      idx = i;
      break;
    }
  }
  if (idx == -1) return null;

  return {
    name: series_name,
    column: idx,
    visible: this.visibility()[idx - 1],
    color: this.colorsMap_[series_name],
    axis: 1 + this.attributes_.axisForSeries(series_name)
  };
};

/**
 * Create the text box to adjust the averaging period
 * @private
 */
Dygraph.prototype.createRollInterface_ = function () {
  var _this = this;

  // Create a roller if one doesn't exist already.
  var roller = this.roller_;
  if (!roller) {
    this.roller_ = roller = document.createElement("input");
    roller.type = "text";
    roller.style.display = "none";
    roller.className = 'dygraph-roller';
    this.graphDiv.appendChild(roller);
  }

  var display = this.getBooleanOption('showRoller') ? 'block' : 'none';

  var area = this.getArea();
  var textAttr = {
    "top": area.y + area.h - 25 + "px",
    "left": area.x + 1 + "px",
    "display": display
  };
  roller.size = "2";
  roller.value = this.rollPeriod_;
  utils.update(roller.style, textAttr);

  roller.onchange = function () {
    return _this.adjustRoll(roller.value);
  };
};

/**
 * Set up all the mouse handlers needed to capture dragging behavior for zoom
 * events.
 * @private
 */
Dygraph.prototype.createDragInterface_ = function () {
  var context = {
    // Tracks whether the mouse is down right now
    isZooming: false,
    isPanning: false, // is this drag part of a pan?
    is2DPan: false, // if so, is that pan 1- or 2-dimensional?
    dragStartX: null, // pixel coordinates
    dragStartY: null, // pixel coordinates
    dragEndX: null, // pixel coordinates
    dragEndY: null, // pixel coordinates
    dragDirection: null,
    prevEndX: null, // pixel coordinates
    prevEndY: null, // pixel coordinates
    prevDragDirection: null,
    cancelNextDblclick: false, // see comment in dygraph-interaction-model.js

    // The value on the left side of the graph when a pan operation starts.
    initialLeftmostDate: null,

    // The number of units each pixel spans. (This won't be valid for log
    // scales)
    xUnitsPerPixel: null,

    // TODO(danvk): update this comment
    // The range in second/value units that the viewport encompasses during a
    // panning operation.
    dateRange: null,

    // Top-left corner of the canvas, in DOM coords
    // TODO(konigsberg): Rename topLeftCanvasX, topLeftCanvasY.
    px: 0,
    py: 0,

    // Values for use with panEdgeFraction, which limit how far outside the
    // graph's data boundaries it can be panned.
    boundedDates: null, // [minDate, maxDate]
    boundedValues: null, // [[minValue, maxValue] ...]

    // We cover iframes during mouse interactions. See comments in
    // dygraph-utils.js for more info on why this is a good idea.
    tarp: new _iframeTarp2['default'](),

    // contextB is the same thing as this context object but renamed.
    initializeMouseDown: function initializeMouseDown(event, g, contextB) {
      // prevents mouse drags from selecting page text.
      if (event.preventDefault) {
        event.preventDefault(); // Firefox, Chrome, etc.
      } else {
          event.returnValue = false; // IE
          event.cancelBubble = true;
        }

      var canvasPos = utils.findPos(g.canvas_);
      contextB.px = canvasPos.x;
      contextB.py = canvasPos.y;
      contextB.dragStartX = utils.dragGetX_(event, contextB);
      contextB.dragStartY = utils.dragGetY_(event, contextB);
      contextB.cancelNextDblclick = false;
      contextB.tarp.cover();
    },
    destroy: function destroy() {
      var context = this;
      if (context.isZooming || context.isPanning) {
        context.isZooming = false;
        context.dragStartX = null;
        context.dragStartY = null;
      }

      if (context.isPanning) {
        context.isPanning = false;
        context.draggingDate = null;
        context.dateRange = null;
        for (var i = 0; i < self.axes_.length; i++) {
          delete self.axes_[i].draggingValue;
          delete self.axes_[i].dragValueRange;
        }
      }

      context.tarp.uncover();
    }
  };

  var interactionModel = this.getOption("interactionModel");

  // Self is the graph.
  var self = this;

  // Function that binds the graph and context to the handler.
  var bindHandler = function bindHandler(handler) {
    return function (event) {
      handler(event, self, context);
    };
  };

  for (var eventName in interactionModel) {
    if (!interactionModel.hasOwnProperty(eventName)) continue;
    this.addAndTrackEvent(this.mouseEventElement_, eventName, bindHandler(interactionModel[eventName]));
  }

  // If the user releases the mouse button during a drag, but not over the
  // canvas, then it doesn't count as a zooming action.
  if (!interactionModel.willDestroyContextMyself) {
    var mouseUpHandler = function mouseUpHandler(event) {
      context.destroy();
    };

    this.addAndTrackEvent(document, 'mouseup', mouseUpHandler);
  }
};

/**
 * Draw a gray zoom rectangle over the desired area of the canvas. Also clears
 * up any previous zoom rectangles that were drawn. This could be optimized to
 * avoid extra redrawing, but it's tricky to avoid interactions with the status
 * dots.
 *
 * @param {number} direction the direction of the zoom rectangle. Acceptable
 *     values are utils.HORIZONTAL and utils.VERTICAL.
 * @param {number} startX The X position where the drag started, in canvas
 *     coordinates.
 * @param {number} endX The current X position of the drag, in canvas coords.
 * @param {number} startY The Y position where the drag started, in canvas
 *     coordinates.
 * @param {number} endY The current Y position of the drag, in canvas coords.
 * @param {number} prevDirection the value of direction on the previous call to
 *     this function. Used to avoid excess redrawing
 * @param {number} prevEndX The value of endX on the previous call to this
 *     function. Used to avoid excess redrawing
 * @param {number} prevEndY The value of endY on the previous call to this
 *     function. Used to avoid excess redrawing
 * @private
 */
Dygraph.prototype.drawZoomRect_ = function (direction, startX, endX, startY, endY, prevDirection, prevEndX, prevEndY) {
  var ctx = this.canvas_ctx_;

  // Clean up from the previous rect if necessary
  if (prevDirection == utils.HORIZONTAL) {
    ctx.clearRect(Math.min(startX, prevEndX), this.layout_.getPlotArea().y, Math.abs(startX - prevEndX), this.layout_.getPlotArea().h);
  } else if (prevDirection == utils.VERTICAL) {
    ctx.clearRect(this.layout_.getPlotArea().x, Math.min(startY, prevEndY), this.layout_.getPlotArea().w, Math.abs(startY - prevEndY));
  }

  // Draw a light-grey rectangle to show the new viewing area
  if (direction == utils.HORIZONTAL) {
    if (endX && startX) {
      ctx.fillStyle = "rgba(128,128,128,0.33)";
      ctx.fillRect(Math.min(startX, endX), this.layout_.getPlotArea().y, Math.abs(endX - startX), this.layout_.getPlotArea().h);
    }
  } else if (direction == utils.VERTICAL) {
    if (endY && startY) {
      ctx.fillStyle = "rgba(128,128,128,0.33)";
      ctx.fillRect(this.layout_.getPlotArea().x, Math.min(startY, endY), this.layout_.getPlotArea().w, Math.abs(endY - startY));
    }
  }
};

/**
 * Clear the zoom rectangle (and perform no zoom).
 * @private
 */
Dygraph.prototype.clearZoomRect_ = function () {
  this.currentZoomRectArgs_ = null;
  this.canvas_ctx_.clearRect(0, 0, this.width_, this.height_);
};

/**
 * Zoom to something containing [lowX, highX]. These are pixel coordinates in
 * the canvas. The exact zoom window may be slightly larger if there are no data
 * points near lowX or highX. Don't confuse this function with doZoomXDates,
 * which accepts dates that match the raw data. This function redraws the graph.
 *
 * @param {number} lowX The leftmost pixel value that should be visible.
 * @param {number} highX The rightmost pixel value that should be visible.
 * @private
 */
Dygraph.prototype.doZoomX_ = function (lowX, highX) {
  this.currentZoomRectArgs_ = null;
  // Find the earliest and latest dates contained in this canvasx range.
  // Convert the call to date ranges of the raw data.
  var minDate = this.toDataXCoord(lowX);
  var maxDate = this.toDataXCoord(highX);
  this.doZoomXDates_(minDate, maxDate);
};

/**
 * Zoom to something containing [minDate, maxDate] values. Don't confuse this
 * method with doZoomX which accepts pixel coordinates. This function redraws
 * the graph.
 *
 * @param {number} minDate The minimum date that should be visible.
 * @param {number} maxDate The maximum date that should be visible.
 * @private
 */
Dygraph.prototype.doZoomXDates_ = function (minDate, maxDate) {
  var _this2 = this;

  // TODO(danvk): when xAxisRange is null (i.e. "fit to data", the animation
  // can produce strange effects. Rather than the x-axis transitioning slowly
  // between values, it can jerk around.)
  var old_window = this.xAxisRange();
  var new_window = [minDate, maxDate];
  var zoomCallback = this.getFunctionOption('zoomCallback');
  this.doAnimatedZoom(old_window, new_window, null, null, function () {
    if (zoomCallback) {
      zoomCallback.call(_this2, minDate, maxDate, _this2.yAxisRanges());
    }
  });
};

/**
 * Zoom to something containing [lowY, highY]. These are pixel coordinates in
 * the canvas. This function redraws the graph.
 *
 * @param {number} lowY The topmost pixel value that should be visible.
 * @param {number} highY The lowest pixel value that should be visible.
 * @private
 */
Dygraph.prototype.doZoomY_ = function (lowY, highY) {
  var _this3 = this;

  this.currentZoomRectArgs_ = null;
  // Find the highest and lowest values in pixel range for each axis.
  // Note that lowY (in pixels) corresponds to the max Value (in data coords).
  // This is because pixels increase as you go down on the screen, whereas data
  // coordinates increase as you go up the screen.
  var oldValueRanges = this.yAxisRanges();
  var newValueRanges = [];
  for (var i = 0; i < this.axes_.length; i++) {
    var hi = this.toDataYCoord(lowY, i);
    var low = this.toDataYCoord(highY, i);
    newValueRanges.push([low, hi]);
  }

  var zoomCallback = this.getFunctionOption('zoomCallback');
  this.doAnimatedZoom(null, null, oldValueRanges, newValueRanges, function () {
    if (zoomCallback) {
      var _xAxisRange = _this3.xAxisRange();

      var _xAxisRange2 = _slicedToArray(_xAxisRange, 2);

      var minX = _xAxisRange2[0];
      var maxX = _xAxisRange2[1];

      zoomCallback.call(_this3, minX, maxX, _this3.yAxisRanges());
    }
  });
};

/**
 * Transition function to use in animations. Returns values between 0.0
 * (totally old values) and 1.0 (totally new values) for each frame.
 * @private
 */
Dygraph.zoomAnimationFunction = function (frame, numFrames) {
  var k = 1.5;
  return (1.0 - Math.pow(k, -frame)) / (1.0 - Math.pow(k, -numFrames));
};

/**
 * Reset the zoom to the original view coordinates. This is the same as
 * double-clicking on the graph.
 */
Dygraph.prototype.resetZoom = function () {
  var _this4 = this;

  var dirtyX = this.isZoomed('x');
  var dirtyY = this.isZoomed('y');
  var dirty = dirtyX || dirtyY;

  // Clear any selection, since it's likely to be drawn in the wrong place.
  this.clearSelection();

  if (!dirty) return;

  // Calculate extremes to avoid lack of padding on reset.

  var _xAxisExtremes = this.xAxisExtremes();

  var _xAxisExtremes2 = _slicedToArray(_xAxisExtremes, 2);

  var minDate = _xAxisExtremes2[0];
  var maxDate = _xAxisExtremes2[1];

  var animatedZooms = this.getBooleanOption('animatedZooms');
  var zoomCallback = this.getFunctionOption('zoomCallback');

  // TODO(danvk): merge this block w/ the code below.
  // TODO(danvk): factor out a generic, public zoomTo method.
  if (!animatedZooms) {
    this.dateWindow_ = null;
    this.axes_.forEach(function (axis) {
      if (axis.valueRange) delete axis.valueRange;
    });

    this.drawGraph_();
    if (zoomCallback) {
      zoomCallback.call(this, minDate, maxDate, this.yAxisRanges());
    }
    return;
  }

  var oldWindow = null,
      newWindow = null,
      oldValueRanges = null,
      newValueRanges = null;
  if (dirtyX) {
    oldWindow = this.xAxisRange();
    newWindow = [minDate, maxDate];
  }

  if (dirtyY) {
    oldValueRanges = this.yAxisRanges();
    newValueRanges = this.yAxisExtremes();
  }

  this.doAnimatedZoom(oldWindow, newWindow, oldValueRanges, newValueRanges, function () {
    _this4.dateWindow_ = null;
    _this4.axes_.forEach(function (axis) {
      if (axis.valueRange) delete axis.valueRange;
    });
    if (zoomCallback) {
      zoomCallback.call(_this4, minDate, maxDate, _this4.yAxisRanges());
    }
  });
};

/**
 * Combined animation logic for all zoom functions.
 * either the x parameters or y parameters may be null.
 * @private
 */
Dygraph.prototype.doAnimatedZoom = function (oldXRange, newXRange, oldYRanges, newYRanges, callback) {
  var _this5 = this;

  var steps = this.getBooleanOption("animatedZooms") ? Dygraph.ANIMATION_STEPS : 1;

  var windows = [];
  var valueRanges = [];
  var step, frac;

  if (oldXRange !== null && newXRange !== null) {
    for (step = 1; step <= steps; step++) {
      frac = Dygraph.zoomAnimationFunction(step, steps);
      windows[step - 1] = [oldXRange[0] * (1 - frac) + frac * newXRange[0], oldXRange[1] * (1 - frac) + frac * newXRange[1]];
    }
  }

  if (oldYRanges !== null && newYRanges !== null) {
    for (step = 1; step <= steps; step++) {
      frac = Dygraph.zoomAnimationFunction(step, steps);
      var thisRange = [];
      for (var j = 0; j < this.axes_.length; j++) {
        thisRange.push([oldYRanges[j][0] * (1 - frac) + frac * newYRanges[j][0], oldYRanges[j][1] * (1 - frac) + frac * newYRanges[j][1]]);
      }
      valueRanges[step - 1] = thisRange;
    }
  }

  utils.repeatAndCleanup(function (step) {
    if (valueRanges.length) {
      for (var i = 0; i < _this5.axes_.length; i++) {
        var w = valueRanges[step][i];
        _this5.axes_[i].valueRange = [w[0], w[1]];
      }
    }
    if (windows.length) {
      _this5.dateWindow_ = windows[step];
    }
    _this5.drawGraph_();
  }, steps, Dygraph.ANIMATION_DURATION / steps, callback);
};

/**
 * Get the current graph's area object.
 *
 * Returns: {x, y, w, h}
 */
Dygraph.prototype.getArea = function () {
  return this.plotter_.area;
};

/**
 * Convert a mouse event to DOM coordinates relative to the graph origin.
 *
 * Returns a two-element array: [X, Y].
 */
Dygraph.prototype.eventToDomCoords = function (event) {
  if (event.offsetX && event.offsetY) {
    return [event.offsetX, event.offsetY];
  } else {
    var eventElementPos = utils.findPos(this.mouseEventElement_);
    var canvasx = utils.pageX(event) - eventElementPos.x;
    var canvasy = utils.pageY(event) - eventElementPos.y;
    return [canvasx, canvasy];
  }
};

/**
 * Given a canvas X coordinate, find the closest row.
 * @param {number} domX graph-relative DOM X coordinate
 * Returns {number} row number.
 * @private
 */
Dygraph.prototype.findClosestRow = function (domX) {
  var minDistX = Infinity;
  var closestRow = -1;
  var sets = this.layout_.points;
  for (var i = 0; i < sets.length; i++) {
    var points = sets[i];
    var len = points.length;
    for (var j = 0; j < len; j++) {
      var point = points[j];
      if (!utils.isValidPoint(point, true)) continue;
      var dist = Math.abs(point.canvasx - domX);
      if (dist < minDistX) {
        minDistX = dist;
        closestRow = point.idx;
      }
    }
  }

  return closestRow;
};

/**
 * Given canvas X,Y coordinates, find the closest point.
 *
 * This finds the individual data point across all visible series
 * that's closest to the supplied DOM coordinates using the standard
 * Euclidean X,Y distance.
 *
 * @param {number} domX graph-relative DOM X coordinate
 * @param {number} domY graph-relative DOM Y coordinate
 * Returns: {row, seriesName, point}
 * @private
 */
Dygraph.prototype.findClosestPoint = function (domX, domY) {
  var minDist = Infinity;
  var dist, dx, dy, point, closestPoint, closestSeries, closestRow;
  for (var setIdx = this.layout_.points.length - 1; setIdx >= 0; --setIdx) {
    var points = this.layout_.points[setIdx];
    for (var i = 0; i < points.length; ++i) {
      point = points[i];
      if (!utils.isValidPoint(point)) continue;
      dx = point.canvasx - domX;
      dy = point.canvasy - domY;
      dist = dx * dx + dy * dy;
      if (dist < minDist) {
        minDist = dist;
        closestPoint = point;
        closestSeries = setIdx;
        closestRow = point.idx;
      }
    }
  }
  var name = this.layout_.setNames[closestSeries];
  return {
    row: closestRow,
    seriesName: name,
    point: closestPoint
  };
};

/**
 * Given canvas X,Y coordinates, find the touched area in a stacked graph.
 *
 * This first finds the X data point closest to the supplied DOM X coordinate,
 * then finds the series which puts the Y coordinate on top of its filled area,
 * using linear interpolation between adjacent point pairs.
 *
 * @param {number} domX graph-relative DOM X coordinate
 * @param {number} domY graph-relative DOM Y coordinate
 * Returns: {row, seriesName, point}
 * @private
 */
Dygraph.prototype.findStackedPoint = function (domX, domY) {
  var row = this.findClosestRow(domX);
  var closestPoint, closestSeries;
  for (var setIdx = 0; setIdx < this.layout_.points.length; ++setIdx) {
    var boundary = this.getLeftBoundary_(setIdx);
    var rowIdx = row - boundary;
    var points = this.layout_.points[setIdx];
    if (rowIdx >= points.length) continue;
    var p1 = points[rowIdx];
    if (!utils.isValidPoint(p1)) continue;
    var py = p1.canvasy;
    if (domX > p1.canvasx && rowIdx + 1 < points.length) {
      // interpolate series Y value using next point
      var p2 = points[rowIdx + 1];
      if (utils.isValidPoint(p2)) {
        var dx = p2.canvasx - p1.canvasx;
        if (dx > 0) {
          var r = (domX - p1.canvasx) / dx;
          py += r * (p2.canvasy - p1.canvasy);
        }
      }
    } else if (domX < p1.canvasx && rowIdx > 0) {
      // interpolate series Y value using previous point
      var p0 = points[rowIdx - 1];
      if (utils.isValidPoint(p0)) {
        var dx = p1.canvasx - p0.canvasx;
        if (dx > 0) {
          var r = (p1.canvasx - domX) / dx;
          py += r * (p0.canvasy - p1.canvasy);
        }
      }
    }
    // Stop if the point (domX, py) is above this series' upper edge
    if (setIdx === 0 || py < domY) {
      closestPoint = p1;
      closestSeries = setIdx;
    }
  }
  var name = this.layout_.setNames[closestSeries];
  return {
    row: row,
    seriesName: name,
    point: closestPoint
  };
};

/**
 * When the mouse moves in the canvas, display information about a nearby data
 * point and draw dots over those points in the data series. This function
 * takes care of cleanup of previously-drawn dots.
 * @param {Object} event The mousemove event from the browser.
 * @private
 */
Dygraph.prototype.mouseMove_ = function (event) {
  // This prevents JS errors when mousing over the canvas before data loads.
  var points = this.layout_.points;
  if (points === undefined || points === null) return;

  var canvasCoords = this.eventToDomCoords(event);
  var canvasx = canvasCoords[0];
  var canvasy = canvasCoords[1];

  var highlightSeriesOpts = this.getOption("highlightSeriesOpts");
  var selectionChanged = false;
  if (highlightSeriesOpts && !this.isSeriesLocked()) {
    var closest;
    if (this.getBooleanOption("stackedGraph")) {
      closest = this.findStackedPoint(canvasx, canvasy);
    } else {
      closest = this.findClosestPoint(canvasx, canvasy);
    }
    selectionChanged = this.setSelection(closest.row, closest.seriesName);
  } else {
    var idx = this.findClosestRow(canvasx);
    selectionChanged = this.setSelection(idx);
  }

  var callback = this.getFunctionOption("highlightCallback");
  if (callback && selectionChanged) {
    callback.call(this, event, this.lastx_, this.selPoints_, this.lastRow_, this.highlightSet_);
  }
};

/**
 * Fetch left offset from the specified set index or if not passed, the
 * first defined boundaryIds record (see bug #236).
 * @private
 */
Dygraph.prototype.getLeftBoundary_ = function (setIdx) {
  if (this.boundaryIds_[setIdx]) {
    return this.boundaryIds_[setIdx][0];
  } else {
    for (var i = 0; i < this.boundaryIds_.length; i++) {
      if (this.boundaryIds_[i] !== undefined) {
        return this.boundaryIds_[i][0];
      }
    }
    return 0;
  }
};

Dygraph.prototype.animateSelection_ = function (direction) {
  var totalSteps = 10;
  var millis = 30;
  if (this.fadeLevel === undefined) this.fadeLevel = 0;
  if (this.animateId === undefined) this.animateId = 0;
  var start = this.fadeLevel;
  var steps = direction < 0 ? start : totalSteps - start;
  if (steps <= 0) {
    if (this.fadeLevel) {
      this.updateSelection_(1.0);
    }
    return;
  }

  var thisId = ++this.animateId;
  var that = this;
  var cleanupIfClearing = function cleanupIfClearing() {
    // if we haven't reached fadeLevel 0 in the max frame time,
    // ensure that the clear happens and just go to 0
    if (that.fadeLevel !== 0 && direction < 0) {
      that.fadeLevel = 0;
      that.clearSelection();
    }
  };
  utils.repeatAndCleanup(function (n) {
    // ignore simultaneous animations
    if (that.animateId != thisId) return;

    that.fadeLevel += direction;
    if (that.fadeLevel === 0) {
      that.clearSelection();
    } else {
      that.updateSelection_(that.fadeLevel / totalSteps);
    }
  }, steps, millis, cleanupIfClearing);
};

/**
 * Draw dots over the selectied points in the data series. This function
 * takes care of cleanup of previously-drawn dots.
 * @private
 */
Dygraph.prototype.updateSelection_ = function (opt_animFraction) {
  /*var defaultPrevented = */
  this.cascadeEvents_('select', {
    selectedRow: this.lastRow_ === -1 ? undefined : this.lastRow_,
    selectedX: this.lastx_ === -1 ? undefined : this.lastx_,
    selectedPoints: this.selPoints_
  });
  // TODO(danvk): use defaultPrevented here?

  // Clear the previously drawn vertical, if there is one
  var i;
  var ctx = this.canvas_ctx_;
  if (this.getOption('highlightSeriesOpts')) {
    ctx.clearRect(0, 0, this.width_, this.height_);
    var alpha = 1.0 - this.getNumericOption('highlightSeriesBackgroundAlpha');
    var backgroundColor = utils.toRGB_(this.getOption('highlightSeriesBackgroundColor'));

    if (alpha) {
      // Activating background fade includes an animation effect for a gradual
      // fade. TODO(klausw): make this independently configurable if it causes
      // issues? Use a shared preference to control animations?
      var animateBackgroundFade = true;
      if (animateBackgroundFade) {
        if (opt_animFraction === undefined) {
          // start a new animation
          this.animateSelection_(1);
          return;
        }
        alpha *= opt_animFraction;
      }
      ctx.fillStyle = 'rgba(' + backgroundColor.r + ',' + backgroundColor.g + ',' + backgroundColor.b + ',' + alpha + ')';
      ctx.fillRect(0, 0, this.width_, this.height_);
    }

    // Redraw only the highlighted series in the interactive canvas (not the
    // static plot canvas, which is where series are usually drawn).
    this.plotter_._renderLineChart(this.highlightSet_, ctx);
  } else if (this.previousVerticalX_ >= 0) {
    // Determine the maximum highlight circle size.
    var maxCircleSize = 0;
    var labels = this.attr_('labels');
    for (i = 1; i < labels.length; i++) {
      var r = this.getNumericOption('highlightCircleSize', labels[i]);
      if (r > maxCircleSize) maxCircleSize = r;
    }
    var px = this.previousVerticalX_;
    ctx.clearRect(px - maxCircleSize - 1, 0, 2 * maxCircleSize + 2, this.height_);
  }

  if (this.selPoints_.length > 0) {
    // Draw colored circles over the center of each selected point
    var canvasx = this.selPoints_[0].canvasx;
    ctx.save();
    for (i = 0; i < this.selPoints_.length; i++) {
      var pt = this.selPoints_[i];
      if (isNaN(pt.canvasy)) continue;

      var circleSize = this.getNumericOption('highlightCircleSize', pt.name);
      var callback = this.getFunctionOption("drawHighlightPointCallback", pt.name);
      var color = this.plotter_.colors[pt.name];
      if (!callback) {
        callback = utils.Circles.DEFAULT;
      }
      ctx.lineWidth = this.getNumericOption('strokeWidth', pt.name);
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      callback.call(this, this, pt.name, ctx, canvasx, pt.canvasy, color, circleSize, pt.idx);
    }
    ctx.restore();

    this.previousVerticalX_ = canvasx;
  }
};

/**
 * Manually set the selected points and display information about them in the
 * legend. The selection can be cleared using clearSelection() and queried
 * using getSelection().
 *
 * To set a selected series but not a selected point, call setSelection with
 * row=false and the selected series name.
 *
 * @param {number} row Row number that should be highlighted (i.e. appear with
 * hover dots on the chart).
 * @param {seriesName} optional series name to highlight that series with the
 * the highlightSeriesOpts setting.
 * @param { locked } optional If true, keep seriesName selected when mousing
 * over the graph, disabling closest-series highlighting. Call clearSelection()
 * to unlock it.
 */
Dygraph.prototype.setSelection = function (row, opt_seriesName, opt_locked) {
  // Extract the points we've selected
  this.selPoints_ = [];

  var changed = false;
  if (row !== false && row >= 0) {
    if (row != this.lastRow_) changed = true;
    this.lastRow_ = row;
    for (var setIdx = 0; setIdx < this.layout_.points.length; ++setIdx) {
      var points = this.layout_.points[setIdx];
      // Check if the point at the appropriate index is the point we're looking
      // for.  If it is, just use it, otherwise search the array for a point
      // in the proper place.
      var setRow = row - this.getLeftBoundary_(setIdx);
      if (setRow >= 0 && setRow < points.length && points[setRow].idx == row) {
        var point = points[setRow];
        if (point.yval !== null) this.selPoints_.push(point);
      } else {
        for (var pointIdx = 0; pointIdx < points.length; ++pointIdx) {
          var point = points[pointIdx];
          if (point.idx == row) {
            if (point.yval !== null) {
              this.selPoints_.push(point);
            }
            break;
          }
        }
      }
    }
  } else {
    if (this.lastRow_ >= 0) changed = true;
    this.lastRow_ = -1;
  }

  if (this.selPoints_.length) {
    this.lastx_ = this.selPoints_[0].xval;
  } else {
    this.lastx_ = -1;
  }

  if (opt_seriesName !== undefined) {
    if (this.highlightSet_ !== opt_seriesName) changed = true;
    this.highlightSet_ = opt_seriesName;
  }

  if (opt_locked !== undefined) {
    this.lockedSet_ = opt_locked;
  }

  if (changed) {
    this.updateSelection_(undefined);
  }
  return changed;
};

/**
 * The mouse has left the canvas. Clear out whatever artifacts remain
 * @param {Object} event the mouseout event from the browser.
 * @private
 */
Dygraph.prototype.mouseOut_ = function (event) {
  if (this.getFunctionOption("unhighlightCallback")) {
    this.getFunctionOption("unhighlightCallback").call(this, event);
  }

  if (this.getBooleanOption("hideOverlayOnMouseOut") && !this.lockedSet_) {
    this.clearSelection();
  }
};

/**
 * Clears the current selection (i.e. points that were highlighted by moving
 * the mouse over the chart).
 */
Dygraph.prototype.clearSelection = function () {
  this.cascadeEvents_('deselect', {});

  this.lockedSet_ = false;
  // Get rid of the overlay data
  if (this.fadeLevel) {
    this.animateSelection_(-1);
    return;
  }
  this.canvas_ctx_.clearRect(0, 0, this.width_, this.height_);
  this.fadeLevel = 0;
  this.selPoints_ = [];
  this.lastx_ = -1;
  this.lastRow_ = -1;
  this.highlightSet_ = null;
};

/**
 * Returns the number of the currently selected row. To get data for this row,
 * you can use the getValue method.
 * @return {number} row number, or -1 if nothing is selected
 */
Dygraph.prototype.getSelection = function () {
  if (!this.selPoints_ || this.selPoints_.length < 1) {
    return -1;
  }

  for (var setIdx = 0; setIdx < this.layout_.points.length; setIdx++) {
    var points = this.layout_.points[setIdx];
    for (var row = 0; row < points.length; row++) {
      if (points[row].x == this.selPoints_[0].x) {
        return points[row].idx;
      }
    }
  }
  return -1;
};

/**
 * Returns the name of the currently-highlighted series.
 * Only available when the highlightSeriesOpts option is in use.
 */
Dygraph.prototype.getHighlightSeries = function () {
  return this.highlightSet_;
};

/**
 * Returns true if the currently-highlighted series was locked
 * via setSelection(..., seriesName, true).
 */
Dygraph.prototype.isSeriesLocked = function () {
  return this.lockedSet_;
};

/**
 * Fires when there's data available to be graphed.
 * @param {string} data Raw CSV data to be plotted
 * @private
 */
Dygraph.prototype.loadedEvent_ = function (data) {
  this.rawData_ = this.parseCSV_(data);
  this.cascadeDataDidUpdateEvent_();
  this.predraw_();
};

/**
 * Add ticks on the x-axis representing years, months, quarters, weeks, or days
 * @private
 */
Dygraph.prototype.addXTicks_ = function () {
  // Determine the correct ticks scale on the x-axis: quarterly, monthly, ...
  var range;
  if (this.dateWindow_) {
    range = [this.dateWindow_[0], this.dateWindow_[1]];
  } else {
    range = this.xAxisExtremes();
  }

  var xAxisOptionsView = this.optionsViewForAxis_('x');
  var xTicks = xAxisOptionsView('ticker')(range[0], range[1], this.plotter_.area.w, // TODO(danvk): should be area.width
  xAxisOptionsView, this);
  // var msg = 'ticker(' + range[0] + ', ' + range[1] + ', ' + this.width_ + ', ' + this.attr_('pixelsPerXLabel') + ') -> ' + JSON.stringify(xTicks);
  // console.log(msg);
  this.layout_.setXTicks(xTicks);
};

/**
 * Returns the correct handler class for the currently set options.
 * @private
 */
Dygraph.prototype.getHandlerClass_ = function () {
  var handlerClass;
  if (this.attr_('dataHandler')) {
    handlerClass = this.attr_('dataHandler');
  } else if (this.fractions_) {
    if (this.getBooleanOption('errorBars')) {
      handlerClass = _datahandlerBarsFractions2['default'];
    } else {
      handlerClass = _datahandlerDefaultFractions2['default'];
    }
  } else if (this.getBooleanOption('customBars')) {
    handlerClass = _datahandlerBarsCustom2['default'];
  } else if (this.getBooleanOption('errorBars')) {
    handlerClass = _datahandlerBarsError2['default'];
  } else {
    handlerClass = _datahandlerDefault2['default'];
  }
  return handlerClass;
};

/**
 * @private
 * This function is called once when the chart's data is changed or the options
 * dictionary is updated. It is _not_ called when the user pans or zooms. The
 * idea is that values derived from the chart's data can be computed here,
 * rather than every time the chart is drawn. This includes things like the
 * number of axes, rolling averages, etc.
 */
Dygraph.prototype.predraw_ = function () {
  var start = new Date();

  // Create the correct dataHandler
  this.dataHandler_ = new (this.getHandlerClass_())();

  this.layout_.computePlotArea();

  // TODO(danvk): move more computations out of drawGraph_ and into here.
  this.computeYAxes_();

  if (!this.is_initial_draw_) {
    this.canvas_ctx_.restore();
    this.hidden_ctx_.restore();
  }

  this.canvas_ctx_.save();
  this.hidden_ctx_.save();

  // Create a new plotter.
  this.plotter_ = new _dygraphCanvas2['default'](this, this.hidden_, this.hidden_ctx_, this.layout_);

  // The roller sits in the bottom left corner of the chart. We don't know where
  // this will be until the options are available, so it's positioned here.
  this.createRollInterface_();

  this.cascadeEvents_('predraw');

  // Convert the raw data (a 2D array) into the internal format and compute
  // rolling averages.
  this.rolledSeries_ = [null]; // x-axis is the first series and it's special
  for (var i = 1; i < this.numColumns(); i++) {
    // var logScale = this.attr_('logscale', i); // TODO(klausw): this looks wrong // konigsberg thinks so too.
    var series = this.dataHandler_.extractSeries(this.rawData_, i, this.attributes_);
    if (this.rollPeriod_ > 1) {
      series = this.dataHandler_.rollingAverage(series, this.rollPeriod_, this.attributes_);
    }

    this.rolledSeries_.push(series);
  }

  // If the data or options have changed, then we'd better redraw.
  this.drawGraph_();

  // This is used to determine whether to do various animations.
  var end = new Date();
  this.drawingTimeMs_ = end - start;
};

/**
 * Point structure.
 *
 * xval_* and yval_* are the original unscaled data values,
 * while x_* and y_* are scaled to the range (0.0-1.0) for plotting.
 * yval_stacked is the cumulative Y value used for stacking graphs,
 * and bottom/top/minus/plus are used for error bar graphs.
 *
 * @typedef {{
 *     idx: number,
 *     name: string,
 *     x: ?number,
 *     xval: ?number,
 *     y_bottom: ?number,
 *     y: ?number,
 *     y_stacked: ?number,
 *     y_top: ?number,
 *     yval_minus: ?number,
 *     yval: ?number,
 *     yval_plus: ?number,
 *     yval_stacked
 * }}
 */
Dygraph.PointType = undefined;

/**
 * Calculates point stacking for stackedGraph=true.
 *
 * For stacking purposes, interpolate or extend neighboring data across
 * NaN values based on stackedGraphNaNFill settings. This is for display
 * only, the underlying data value as shown in the legend remains NaN.
 *
 * @param {Array.<Dygraph.PointType>} points Point array for a single series.
 *     Updates each Point's yval_stacked property.
 * @param {Array.<number>} cumulativeYval Accumulated top-of-graph stacked Y
 *     values for the series seen so far. Index is the row number. Updated
 *     based on the current series's values.
 * @param {Array.<number>} seriesExtremes Min and max values, updated
 *     to reflect the stacked values.
 * @param {string} fillMethod Interpolation method, one of 'all', 'inside', or
 *     'none'.
 * @private
 */
Dygraph.stackPoints_ = function (points, cumulativeYval, seriesExtremes, fillMethod) {
  var lastXval = null;
  var prevPoint = null;
  var nextPoint = null;
  var nextPointIdx = -1;

  // Find the next stackable point starting from the given index.
  var updateNextPoint = function updateNextPoint(idx) {
    // If we've previously found a non-NaN point and haven't gone past it yet,
    // just use that.
    if (nextPointIdx >= idx) return;

    // We haven't found a non-NaN point yet or have moved past it,
    // look towards the right to find a non-NaN point.
    for (var j = idx; j < points.length; ++j) {
      // Clear out a previously-found point (if any) since it's no longer
      // valid, we shouldn't use it for interpolation anymore.
      nextPoint = null;
      if (!isNaN(points[j].yval) && points[j].yval !== null) {
        nextPointIdx = j;
        nextPoint = points[j];
        break;
      }
    }
  };

  for (var i = 0; i < points.length; ++i) {
    var point = points[i];
    var xval = point.xval;
    if (cumulativeYval[xval] === undefined) {
      cumulativeYval[xval] = 0;
    }

    var actualYval = point.yval;
    if (isNaN(actualYval) || actualYval === null) {
      if (fillMethod == 'none') {
        actualYval = 0;
      } else {
        // Interpolate/extend for stacking purposes if possible.
        updateNextPoint(i);
        if (prevPoint && nextPoint && fillMethod != 'none') {
          // Use linear interpolation between prevPoint and nextPoint.
          actualYval = prevPoint.yval + (nextPoint.yval - prevPoint.yval) * ((xval - prevPoint.xval) / (nextPoint.xval - prevPoint.xval));
        } else if (prevPoint && fillMethod == 'all') {
          actualYval = prevPoint.yval;
        } else if (nextPoint && fillMethod == 'all') {
          actualYval = nextPoint.yval;
        } else {
          actualYval = 0;
        }
      }
    } else {
      prevPoint = point;
    }

    var stackedYval = cumulativeYval[xval];
    if (lastXval != xval) {
      // If an x-value is repeated, we ignore the duplicates.
      stackedYval += actualYval;
      cumulativeYval[xval] = stackedYval;
    }
    lastXval = xval;

    point.yval_stacked = stackedYval;

    if (stackedYval > seriesExtremes[1]) {
      seriesExtremes[1] = stackedYval;
    }
    if (stackedYval < seriesExtremes[0]) {
      seriesExtremes[0] = stackedYval;
    }
  }
};

/**
 * Loop over all fields and create datasets, calculating extreme y-values for
 * each series and extreme x-indices as we go.
 *
 * dateWindow is passed in as an explicit parameter so that we can compute
 * extreme values "speculatively", i.e. without actually setting state on the
 * dygraph.
 *
 * @param {Array.<Array.<Array.<(number|Array<number>)>>} rolledSeries, where
 *     rolledSeries[seriesIndex][row] = raw point, where
 *     seriesIndex is the column number starting with 1, and
 *     rawPoint is [x,y] or [x, [y, err]] or [x, [y, yminus, yplus]].
 * @param {?Array.<number>} dateWindow [xmin, xmax] pair, or null.
 * @return {{
 *     points: Array.<Array.<Dygraph.PointType>>,
 *     seriesExtremes: Array.<Array.<number>>,
 *     boundaryIds: Array.<number>}}
 * @private
 */
Dygraph.prototype.gatherDatasets_ = function (rolledSeries, dateWindow) {
  var boundaryIds = [];
  var points = [];
  var cumulativeYval = []; // For stacked series.
  var extremes = {}; // series name -> [low, high]
  var seriesIdx, sampleIdx;
  var firstIdx, lastIdx;
  var axisIdx;

  // Loop over the fields (series).  Go from the last to the first,
  // because if they're stacked that's how we accumulate the values.
  var num_series = rolledSeries.length - 1;
  var series;
  for (seriesIdx = num_series; seriesIdx >= 1; seriesIdx--) {
    if (!this.visibility()[seriesIdx - 1]) continue;

    // Prune down to the desired range, if necessary (for zooming)
    // Because there can be lines going to points outside of the visible area,
    // we actually prune to visible points, plus one on either side.
    if (dateWindow) {
      series = rolledSeries[seriesIdx];
      var low = dateWindow[0];
      var high = dateWindow[1];

      // TODO(danvk): do binary search instead of linear search.
      // TODO(danvk): pass firstIdx and lastIdx directly to the renderer.
      firstIdx = null;
      lastIdx = null;
      for (sampleIdx = 0; sampleIdx < series.length; sampleIdx++) {
        if (series[sampleIdx][0] >= low && firstIdx === null) {
          firstIdx = sampleIdx;
        }
        if (series[sampleIdx][0] <= high) {
          lastIdx = sampleIdx;
        }
      }

      if (firstIdx === null) firstIdx = 0;
      var correctedFirstIdx = firstIdx;
      var isInvalidValue = true;
      while (isInvalidValue && correctedFirstIdx > 0) {
        correctedFirstIdx--;
        // check if the y value is null.
        isInvalidValue = series[correctedFirstIdx][1] === null;
      }

      if (lastIdx === null) lastIdx = series.length - 1;
      var correctedLastIdx = lastIdx;
      isInvalidValue = true;
      while (isInvalidValue && correctedLastIdx < series.length - 1) {
        correctedLastIdx++;
        isInvalidValue = series[correctedLastIdx][1] === null;
      }

      if (correctedFirstIdx !== firstIdx) {
        firstIdx = correctedFirstIdx;
      }
      if (correctedLastIdx !== lastIdx) {
        lastIdx = correctedLastIdx;
      }

      boundaryIds[seriesIdx - 1] = [firstIdx, lastIdx];

      // .slice's end is exclusive, we want to include lastIdx.
      series = series.slice(firstIdx, lastIdx + 1);
    } else {
      series = rolledSeries[seriesIdx];
      boundaryIds[seriesIdx - 1] = [0, series.length - 1];
    }

    var seriesName = this.attr_("labels")[seriesIdx];
    var seriesExtremes = this.dataHandler_.getExtremeYValues(series, dateWindow, this.getBooleanOption("stepPlot", seriesName));

    var seriesPoints = this.dataHandler_.seriesToPoints(series, seriesName, boundaryIds[seriesIdx - 1][0]);

    if (this.getBooleanOption("stackedGraph")) {
      axisIdx = this.attributes_.axisForSeries(seriesName);
      if (cumulativeYval[axisIdx] === undefined) {
        cumulativeYval[axisIdx] = [];
      }
      Dygraph.stackPoints_(seriesPoints, cumulativeYval[axisIdx], seriesExtremes, this.getBooleanOption("stackedGraphNaNFill"));
    }

    extremes[seriesName] = seriesExtremes;
    points[seriesIdx] = seriesPoints;
  }

  return { points: points, extremes: extremes, boundaryIds: boundaryIds };
};

/**
 * Update the graph with new data. This method is called when the viewing area
 * has changed. If the underlying data or options have changed, predraw_ will
 * be called before drawGraph_ is called.
 *
 * @private
 */
Dygraph.prototype.drawGraph_ = function () {
  var start = new Date();

  // This is used to set the second parameter to drawCallback, below.
  var is_initial_draw = this.is_initial_draw_;
  this.is_initial_draw_ = false;

  this.layout_.removeAllDatasets();
  this.setColors_();
  this.attrs_.pointSize = 0.5 * this.getNumericOption('highlightCircleSize');

  var packed = this.gatherDatasets_(this.rolledSeries_, this.dateWindow_);
  var points = packed.points;
  var extremes = packed.extremes;
  this.boundaryIds_ = packed.boundaryIds;

  this.setIndexByName_ = {};
  var labels = this.attr_("labels");
  var dataIdx = 0;
  for (var i = 1; i < points.length; i++) {
    if (!this.visibility()[i - 1]) continue;
    this.layout_.addDataset(labels[i], points[i]);
    this.datasetIndex_[i] = dataIdx++;
  }
  for (var i = 0; i < labels.length; i++) {
    this.setIndexByName_[labels[i]] = i;
  }

  this.computeYAxisRanges_(extremes);
  this.layout_.setYAxes(this.axes_);

  this.addXTicks_();

  // Tell PlotKit to use this new data and render itself
  this.layout_.evaluate();
  this.renderGraph_(is_initial_draw);

  if (this.getStringOption("timingName")) {
    var end = new Date();
    console.log(this.getStringOption("timingName") + " - drawGraph: " + (end - start) + "ms");
  }
};

/**
 * This does the work of drawing the chart. It assumes that the layout and axis
 * scales have already been set (e.g. by predraw_).
 *
 * @private
 */
Dygraph.prototype.renderGraph_ = function (is_initial_draw) {
  this.cascadeEvents_('clearChart');
  this.plotter_.clear();

  var underlayCallback = this.getFunctionOption('underlayCallback');
  if (underlayCallback) {
    // NOTE: we pass the dygraph object to this callback twice to avoid breaking
    // users who expect a deprecated form of this callback.
    underlayCallback.call(this, this.hidden_ctx_, this.layout_.getPlotArea(), this, this);
  }

  var e = {
    canvas: this.hidden_,
    drawingContext: this.hidden_ctx_
  };
  this.cascadeEvents_('willDrawChart', e);
  this.plotter_.render();
  this.cascadeEvents_('didDrawChart', e);
  this.lastRow_ = -1; // because plugins/legend.js clears the legend

  // TODO(danvk): is this a performance bottleneck when panning?
  // The interaction canvas should already be empty in that situation.
  this.canvas_.getContext('2d').clearRect(0, 0, this.width_, this.height_);

  var drawCallback = this.getFunctionOption("drawCallback");
  if (drawCallback !== null) {
    drawCallback.call(this, this, is_initial_draw);
  }
  if (is_initial_draw) {
    this.readyFired_ = true;
    while (this.readyFns_.length > 0) {
      var fn = this.readyFns_.pop();
      fn(this);
    }
  }
};

/**
 * @private
 * Determine properties of the y-axes which are independent of the data
 * currently being displayed. This includes things like the number of axes and
 * the style of the axes. It does not include the range of each axis and its
 * tick marks.
 * This fills in this.axes_.
 * axes_ = [ { options } ]
 *   indices are into the axes_ array.
 */
Dygraph.prototype.computeYAxes_ = function () {
  var axis, index, opts, v;

  // this.axes_ doesn't match this.attributes_.axes_.options. It's used for
  // data computation as well as options storage.
  // Go through once and add all the axes.
  this.axes_ = [];

  for (axis = 0; axis < this.attributes_.numAxes(); axis++) {
    // Add a new axis, making a copy of its per-axis options.
    opts = { g: this };
    utils.update(opts, this.attributes_.axisOptions(axis));
    this.axes_[axis] = opts;
  }

  for (axis = 0; axis < this.axes_.length; axis++) {
    if (axis === 0) {
      opts = this.optionsViewForAxis_('y' + (axis ? '2' : ''));
      v = opts("valueRange");
      if (v) this.axes_[axis].valueRange = v;
    } else {
      // To keep old behavior
      var axes = this.user_attrs_.axes;
      if (axes && axes.y2) {
        v = axes.y2.valueRange;
        if (v) this.axes_[axis].valueRange = v;
      }
    }
  }
};

/**
 * Returns the number of y-axes on the chart.
 * @return {number} the number of axes.
 */
Dygraph.prototype.numAxes = function () {
  return this.attributes_.numAxes();
};

/**
 * @private
 * Returns axis properties for the given series.
 * @param {string} setName The name of the series for which to get axis
 * properties, e.g. 'Y1'.
 * @return {Object} The axis properties.
 */
Dygraph.prototype.axisPropertiesForSeries = function (series) {
  // TODO(danvk): handle errors.
  return this.axes_[this.attributes_.axisForSeries(series)];
};

/**
 * @private
 * Determine the value range and tick marks for each axis.
 * @param {Object} extremes A mapping from seriesName -> [low, high]
 * This fills in the valueRange and ticks fields in each entry of this.axes_.
 */
Dygraph.prototype.computeYAxisRanges_ = function (extremes) {
  var isNullUndefinedOrNaN = function isNullUndefinedOrNaN(num) {
    return isNaN(parseFloat(num));
  };
  var numAxes = this.attributes_.numAxes();
  var ypadCompat, span, series, ypad;

  var p_axis;

  // Compute extreme values, a span and tick marks for each axis.
  for (var i = 0; i < numAxes; i++) {
    var axis = this.axes_[i];
    var logscale = this.attributes_.getForAxis("logscale", i);
    var includeZero = this.attributes_.getForAxis("includeZero", i);
    var independentTicks = this.attributes_.getForAxis("independentTicks", i);
    series = this.attributes_.seriesForAxis(i);

    // Add some padding. This supports two Y padding operation modes:
    //
    // - backwards compatible (yRangePad not set):
    //   10% padding for automatic Y ranges, but not for user-supplied
    //   ranges, and move a close-to-zero edge to zero, since drawing at the edge
    //   results in invisible lines. Unfortunately lines drawn at the edge of a
    //   user-supplied range will still be invisible. If logscale is
    //   set, add a variable amount of padding at the top but
    //   none at the bottom.
    //
    // - new-style (yRangePad set by the user):
    //   always add the specified Y padding.
    //
    ypadCompat = true;
    ypad = 0.1; // add 10%
    var yRangePad = this.getNumericOption('yRangePad');
    if (yRangePad !== null) {
      ypadCompat = false;
      // Convert pixel padding to ratio
      ypad = yRangePad / this.plotter_.area.h;
    }

    if (series.length === 0) {
      // If no series are defined or visible then use a reasonable default
      axis.extremeRange = [0, 1];
    } else {
      // Calculate the extremes of extremes.
      var minY = Infinity; // extremes[series[0]][0];
      var maxY = -Infinity; // extremes[series[0]][1];
      var extremeMinY, extremeMaxY;

      for (var j = 0; j < series.length; j++) {
        // this skips invisible series
        if (!extremes.hasOwnProperty(series[j])) continue;

        // Only use valid extremes to stop null data series' from corrupting the scale.
        extremeMinY = extremes[series[j]][0];
        if (extremeMinY !== null) {
          minY = Math.min(extremeMinY, minY);
        }
        extremeMaxY = extremes[series[j]][1];
        if (extremeMaxY !== null) {
          maxY = Math.max(extremeMaxY, maxY);
        }
      }

      // Include zero if requested by the user.
      if (includeZero && !logscale) {
        if (minY > 0) minY = 0;
        if (maxY < 0) maxY = 0;
      }

      // Ensure we have a valid scale, otherwise default to [0, 1] for safety.
      if (minY == Infinity) minY = 0;
      if (maxY == -Infinity) maxY = 1;

      span = maxY - minY;
      // special case: if we have no sense of scale, center on the sole value.
      if (span === 0) {
        if (maxY !== 0) {
          span = Math.abs(maxY);
        } else {
          // ... and if the sole value is zero, use range 0-1.
          maxY = 1;
          span = 1;
        }
      }

      var maxAxisY = maxY,
          minAxisY = minY;
      if (ypadCompat) {
        if (logscale) {
          maxAxisY = maxY + ypad * span;
          minAxisY = minY;
        } else {
          maxAxisY = maxY + ypad * span;
          minAxisY = minY - ypad * span;

          // Backwards-compatible behavior: Move the span to start or end at zero if it's
          // close to zero.
          if (minAxisY < 0 && minY >= 0) minAxisY = 0;
          if (maxAxisY > 0 && maxY <= 0) maxAxisY = 0;
        }
      }
      axis.extremeRange = [minAxisY, maxAxisY];
    }
    if (axis.valueRange) {
      // This is a user-set value range for this axis.
      var y0 = isNullUndefinedOrNaN(axis.valueRange[0]) ? axis.extremeRange[0] : axis.valueRange[0];
      var y1 = isNullUndefinedOrNaN(axis.valueRange[1]) ? axis.extremeRange[1] : axis.valueRange[1];
      axis.computedValueRange = [y0, y1];
    } else {
      axis.computedValueRange = axis.extremeRange;
    }
    if (!ypadCompat) {
      // When using yRangePad, adjust the upper/lower bounds to add
      // padding unless the user has zoomed/panned the Y axis range.
      if (logscale) {
        y0 = axis.computedValueRange[0];
        y1 = axis.computedValueRange[1];
        var y0pct = ypad / (2 * ypad - 1);
        var y1pct = (ypad - 1) / (2 * ypad - 1);
        axis.computedValueRange[0] = utils.logRangeFraction(y0, y1, y0pct);
        axis.computedValueRange[1] = utils.logRangeFraction(y0, y1, y1pct);
      } else {
        y0 = axis.computedValueRange[0];
        y1 = axis.computedValueRange[1];
        span = y1 - y0;
        axis.computedValueRange[0] = y0 - span * ypad;
        axis.computedValueRange[1] = y1 + span * ypad;
      }
    }

    if (independentTicks) {
      axis.independentTicks = independentTicks;
      var opts = this.optionsViewForAxis_('y' + (i ? '2' : ''));
      var ticker = opts('ticker');
      axis.ticks = ticker(axis.computedValueRange[0], axis.computedValueRange[1], this.plotter_.area.h, opts, this);
      // Define the first independent axis as primary axis.
      if (!p_axis) p_axis = axis;
    }
  }
  if (p_axis === undefined) {
    throw "Configuration Error: At least one axis has to have the \"independentTicks\" option activated.";
  }
  // Add ticks. By default, all axes inherit the tick positions of the
  // primary axis. However, if an axis is specifically marked as having
  // independent ticks, then that is permissible as well.
  for (var i = 0; i < numAxes; i++) {
    var axis = this.axes_[i];

    if (!axis.independentTicks) {
      var opts = this.optionsViewForAxis_('y' + (i ? '2' : ''));
      var ticker = opts('ticker');
      var p_ticks = p_axis.ticks;
      var p_scale = p_axis.computedValueRange[1] - p_axis.computedValueRange[0];
      var scale = axis.computedValueRange[1] - axis.computedValueRange[0];
      var tick_values = [];
      for (var k = 0; k < p_ticks.length; k++) {
        var y_frac = (p_ticks[k].v - p_axis.computedValueRange[0]) / p_scale;
        var y_val = axis.computedValueRange[0] + y_frac * scale;
        tick_values.push(y_val);
      }

      axis.ticks = ticker(axis.computedValueRange[0], axis.computedValueRange[1], this.plotter_.area.h, opts, this, tick_values);
    }
  }
};

/**
 * Detects the type of the str (date or numeric) and sets the various
 * formatting attributes in this.attrs_ based on this type.
 * @param {string} str An x value.
 * @private
 */
Dygraph.prototype.detectTypeFromString_ = function (str) {
  var isDate = false;
  var dashPos = str.indexOf('-'); // could be 2006-01-01 _or_ 1.0e-2
  if (dashPos > 0 && str[dashPos - 1] != 'e' && str[dashPos - 1] != 'E' || str.indexOf('/') >= 0 || isNaN(parseFloat(str))) {
    isDate = true;
  } else if (str.length == 8 && str > '19700101' && str < '20371231') {
    // TODO(danvk): remove support for this format.
    isDate = true;
  }

  this.setXAxisOptions_(isDate);
};

Dygraph.prototype.setXAxisOptions_ = function (isDate) {
  if (isDate) {
    this.attrs_.xValueParser = utils.dateParser;
    this.attrs_.axes.x.valueFormatter = utils.dateValueFormatter;
    this.attrs_.axes.x.ticker = DygraphTickers.dateTicker;
    this.attrs_.axes.x.axisLabelFormatter = utils.dateAxisLabelFormatter;
  } else {
    /** @private (shut up, jsdoc!) */
    this.attrs_.xValueParser = function (x) {
      return parseFloat(x);
    };
    // TODO(danvk): use Dygraph.numberValueFormatter here?
    /** @private (shut up, jsdoc!) */
    this.attrs_.axes.x.valueFormatter = function (x) {
      return x;
    };
    this.attrs_.axes.x.ticker = DygraphTickers.numericTicks;
    this.attrs_.axes.x.axisLabelFormatter = this.attrs_.axes.x.valueFormatter;
  }
};

/**
 * @private
 * Parses a string in a special csv format.  We expect a csv file where each
 * line is a date point, and the first field in each line is the date string.
 * We also expect that all remaining fields represent series.
 * if the errorBars attribute is set, then interpret the fields as:
 * date, series1, stddev1, series2, stddev2, ...
 * @param {[Object]} data See above.
 *
 * @return [Object] An array with one entry for each row. These entries
 * are an array of cells in that row. The first entry is the parsed x-value for
 * the row. The second, third, etc. are the y-values. These can take on one of
 * three forms, depending on the CSV and constructor parameters:
 * 1. numeric value
 * 2. [ value, stddev ]
 * 3. [ low value, center value, high value ]
 */
Dygraph.prototype.parseCSV_ = function (data) {
  var ret = [];
  var line_delimiter = utils.detectLineDelimiter(data);
  var lines = data.split(line_delimiter || "\n");
  var vals, j;

  // Use the default delimiter or fall back to a tab if that makes sense.
  var delim = this.getStringOption('delimiter');
  if (lines[0].indexOf(delim) == -1 && lines[0].indexOf('\t') >= 0) {
    delim = '\t';
  }

  var start = 0;
  if (!('labels' in this.user_attrs_)) {
    // User hasn't explicitly set labels, so they're (presumably) in the CSV.
    start = 1;
    this.attrs_.labels = lines[0].split(delim); // NOTE: _not_ user_attrs_.
    this.attributes_.reparseSeries();
  }
  var line_no = 0;

  var xParser;
  var defaultParserSet = false; // attempt to auto-detect x value type
  var expectedCols = this.attr_("labels").length;
  var outOfOrder = false;
  for (var i = start; i < lines.length; i++) {
    var line = lines[i];
    line_no = i;
    if (line.length === 0) continue; // skip blank lines
    if (line[0] == '#') continue; // skip comment lines
    var inFields = line.split(delim);
    if (inFields.length < 2) continue;

    var fields = [];
    if (!defaultParserSet) {
      this.detectTypeFromString_(inFields[0]);
      xParser = this.getFunctionOption("xValueParser");
      defaultParserSet = true;
    }
    fields[0] = xParser(inFields[0], this);

    // If fractions are expected, parse the numbers as "A/B"
    if (this.fractions_) {
      for (j = 1; j < inFields.length; j++) {
        // TODO(danvk): figure out an appropriate way to flag parse errors.
        vals = inFields[j].split("/");
        if (vals.length != 2) {
          console.error('Expected fractional "num/den" values in CSV data ' + "but found a value '" + inFields[j] + "' on line " + (1 + i) + " ('" + line + "') which is not of this form.");
          fields[j] = [0, 0];
        } else {
          fields[j] = [utils.parseFloat_(vals[0], i, line), utils.parseFloat_(vals[1], i, line)];
        }
      }
    } else if (this.getBooleanOption("errorBars")) {
      // If there are error bars, values are (value, stddev) pairs
      if (inFields.length % 2 != 1) {
        console.error('Expected alternating (value, stdev.) pairs in CSV data ' + 'but line ' + (1 + i) + ' has an odd number of values (' + (inFields.length - 1) + "): '" + line + "'");
      }
      for (j = 1; j < inFields.length; j += 2) {
        fields[(j + 1) / 2] = [utils.parseFloat_(inFields[j], i, line), utils.parseFloat_(inFields[j + 1], i, line)];
      }
    } else if (this.getBooleanOption("customBars")) {
      // Bars are a low;center;high tuple
      for (j = 1; j < inFields.length; j++) {
        var val = inFields[j];
        if (/^ *$/.test(val)) {
          fields[j] = [null, null, null];
        } else {
          vals = val.split(";");
          if (vals.length == 3) {
            fields[j] = [utils.parseFloat_(vals[0], i, line), utils.parseFloat_(vals[1], i, line), utils.parseFloat_(vals[2], i, line)];
          } else {
            console.warn('When using customBars, values must be either blank ' + 'or "low;center;high" tuples (got "' + val + '" on line ' + (1 + i));
          }
        }
      }
    } else {
      // Values are just numbers
      for (j = 1; j < inFields.length; j++) {
        fields[j] = utils.parseFloat_(inFields[j], i, line);
      }
    }
    if (ret.length > 0 && fields[0] < ret[ret.length - 1][0]) {
      outOfOrder = true;
    }

    if (fields.length != expectedCols) {
      console.error("Number of columns in line " + i + " (" + fields.length + ") does not agree with number of labels (" + expectedCols + ") " + line);
    }

    // If the user specified the 'labels' option and none of the cells of the
    // first row parsed correctly, then they probably double-specified the
    // labels. We go with the values set in the option, discard this row and
    // log a warning to the JS console.
    if (i === 0 && this.attr_('labels')) {
      var all_null = true;
      for (j = 0; all_null && j < fields.length; j++) {
        if (fields[j]) all_null = false;
      }
      if (all_null) {
        console.warn("The dygraphs 'labels' option is set, but the first row " + "of CSV data ('" + line + "') appears to also contain " + "labels. Will drop the CSV labels and use the option " + "labels.");
        continue;
      }
    }
    ret.push(fields);
  }

  if (outOfOrder) {
    console.warn("CSV is out of order; order it correctly to speed loading.");
    ret.sort(function (a, b) {
      return a[0] - b[0];
    });
  }

  return ret;
};

// In native format, all values must be dates or numbers.
// This check isn't perfect but will catch most mistaken uses of strings.
function validateNativeFormat(data) {
  var firstRow = data[0];
  var firstX = firstRow[0];
  if (typeof firstX !== 'number' && !utils.isDateLike(firstX)) {
    throw new Error('Expected number or date but got ' + typeof firstX + ': ' + firstX + '.');
  }
  for (var i = 1; i < firstRow.length; i++) {
    var val = firstRow[i];
    if (val === null || val === undefined) continue;
    if (typeof val === 'number') continue;
    if (utils.isArrayLike(val)) continue; // e.g. error bars or custom bars.
    throw new Error('Expected number or array but got ' + typeof val + ': ' + val + '.');
  }
}

/**
 * The user has provided their data as a pre-packaged JS array. If the x values
 * are numeric, this is the same as dygraphs' internal format. If the x values
 * are dates, we need to convert them from Date objects to ms since epoch.
 * @param {!Array} data
 * @return {Object} data with numeric x values.
 * @private
 */
Dygraph.prototype.parseArray_ = function (data) {
  // Peek at the first x value to see if it's numeric.
  if (data.length === 0) {
    console.error("Can't plot empty data set");
    return null;
  }
  if (data[0].length === 0) {
    console.error("Data set cannot contain an empty row");
    return null;
  }

  validateNativeFormat(data);

  var i;
  if (this.attr_("labels") === null) {
    console.warn("Using default labels. Set labels explicitly via 'labels' " + "in the options parameter");
    this.attrs_.labels = ["X"];
    for (i = 1; i < data[0].length; i++) {
      this.attrs_.labels.push("Y" + i); // Not user_attrs_.
    }
    this.attributes_.reparseSeries();
  } else {
    var num_labels = this.attr_("labels");
    if (num_labels.length != data[0].length) {
      console.error("Mismatch between number of labels (" + num_labels + ")" + " and number of columns in array (" + data[0].length + ")");
      return null;
    }
  }

  if (utils.isDateLike(data[0][0])) {
    // Some intelligent defaults for a date x-axis.
    this.attrs_.axes.x.valueFormatter = utils.dateValueFormatter;
    this.attrs_.axes.x.ticker = DygraphTickers.dateTicker;
    this.attrs_.axes.x.axisLabelFormatter = utils.dateAxisLabelFormatter;

    // Assume they're all dates.
    var parsedData = utils.clone(data);
    for (i = 0; i < data.length; i++) {
      if (parsedData[i].length === 0) {
        console.error("Row " + (1 + i) + " of data is empty");
        return null;
      }
      if (parsedData[i][0] === null || typeof parsedData[i][0].getTime != 'function' || isNaN(parsedData[i][0].getTime())) {
        console.error("x value in row " + (1 + i) + " is not a Date");
        return null;
      }
      parsedData[i][0] = parsedData[i][0].getTime();
    }
    return parsedData;
  } else {
    // Some intelligent defaults for a numeric x-axis.
    /** @private (shut up, jsdoc!) */
    this.attrs_.axes.x.valueFormatter = function (x) {
      return x;
    };
    this.attrs_.axes.x.ticker = DygraphTickers.numericTicks;
    this.attrs_.axes.x.axisLabelFormatter = utils.numberAxisLabelFormatter;
    return data;
  }
};

/**
 * Parses a DataTable object from gviz.
 * The data is expected to have a first column that is either a date or a
 * number. All subsequent columns must be numbers. If there is a clear mismatch
 * between this.xValueParser_ and the type of the first column, it will be
 * fixed. Fills out rawData_.
 * @param {!google.visualization.DataTable} data See above.
 * @private
 */
Dygraph.prototype.parseDataTable_ = function (data) {
  var shortTextForAnnotationNum = function shortTextForAnnotationNum(num) {
    // converts [0-9]+ [A-Z][a-z]*
    // example: 0=A, 1=B, 25=Z, 26=Aa, 27=Ab
    // and continues like.. Ba Bb .. Za .. Zz..Aaa...Zzz Aaaa Zzzz
    var shortText = String.fromCharCode(65 /* A */ + num % 26);
    num = Math.floor(num / 26);
    while (num > 0) {
      shortText = String.fromCharCode(65 /* A */ + (num - 1) % 26) + shortText.toLowerCase();
      num = Math.floor((num - 1) / 26);
    }
    return shortText;
  };

  var cols = data.getNumberOfColumns();
  var rows = data.getNumberOfRows();

  var indepType = data.getColumnType(0);
  if (indepType == 'date' || indepType == 'datetime') {
    this.attrs_.xValueParser = utils.dateParser;
    this.attrs_.axes.x.valueFormatter = utils.dateValueFormatter;
    this.attrs_.axes.x.ticker = DygraphTickers.dateTicker;
    this.attrs_.axes.x.axisLabelFormatter = utils.dateAxisLabelFormatter;
  } else if (indepType == 'number') {
    this.attrs_.xValueParser = function (x) {
      return parseFloat(x);
    };
    this.attrs_.axes.x.valueFormatter = function (x) {
      return x;
    };
    this.attrs_.axes.x.ticker = DygraphTickers.numericTicks;
    this.attrs_.axes.x.axisLabelFormatter = this.attrs_.axes.x.valueFormatter;
  } else {
    throw new Error("only 'date', 'datetime' and 'number' types are supported " + "for column 1 of DataTable input (Got '" + indepType + "')");
  }

  // Array of the column indices which contain data (and not annotations).
  var colIdx = [];
  var annotationCols = {}; // data index -> [annotation cols]
  var hasAnnotations = false;
  var i, j;
  for (i = 1; i < cols; i++) {
    var type = data.getColumnType(i);
    if (type == 'number') {
      colIdx.push(i);
    } else if (type == 'string' && this.getBooleanOption('displayAnnotations')) {
      // This is OK -- it's an annotation column.
      var dataIdx = colIdx[colIdx.length - 1];
      if (!annotationCols.hasOwnProperty(dataIdx)) {
        annotationCols[dataIdx] = [i];
      } else {
        annotationCols[dataIdx].push(i);
      }
      hasAnnotations = true;
    } else {
      throw new Error("Only 'number' is supported as a dependent type with Gviz." + " 'string' is only supported if displayAnnotations is true");
    }
  }

  // Read column labels
  // TODO(danvk): add support back for errorBars
  var labels = [data.getColumnLabel(0)];
  for (i = 0; i < colIdx.length; i++) {
    labels.push(data.getColumnLabel(colIdx[i]));
    if (this.getBooleanOption("errorBars")) i += 1;
  }
  this.attrs_.labels = labels;
  cols = labels.length;

  var ret = [];
  var outOfOrder = false;
  var annotations = [];
  for (i = 0; i < rows; i++) {
    var row = [];
    if (typeof data.getValue(i, 0) === 'undefined' || data.getValue(i, 0) === null) {
      console.warn("Ignoring row " + i + " of DataTable because of undefined or null first column.");
      continue;
    }

    if (indepType == 'date' || indepType == 'datetime') {
      row.push(data.getValue(i, 0).getTime());
    } else {
      row.push(data.getValue(i, 0));
    }
    if (!this.getBooleanOption("errorBars")) {
      for (j = 0; j < colIdx.length; j++) {
        var col = colIdx[j];
        row.push(data.getValue(i, col));
        if (hasAnnotations && annotationCols.hasOwnProperty(col) && data.getValue(i, annotationCols[col][0]) !== null) {
          var ann = {};
          ann.series = data.getColumnLabel(col);
          ann.xval = row[0];
          ann.shortText = shortTextForAnnotationNum(annotations.length);
          ann.text = '';
          for (var k = 0; k < annotationCols[col].length; k++) {
            if (k) ann.text += "\n";
            ann.text += data.getValue(i, annotationCols[col][k]);
          }
          annotations.push(ann);
        }
      }

      // Strip out infinities, which give dygraphs problems later on.
      for (j = 0; j < row.length; j++) {
        if (!isFinite(row[j])) row[j] = null;
      }
    } else {
      for (j = 0; j < cols - 1; j++) {
        row.push([data.getValue(i, 1 + 2 * j), data.getValue(i, 2 + 2 * j)]);
      }
    }
    if (ret.length > 0 && row[0] < ret[ret.length - 1][0]) {
      outOfOrder = true;
    }
    ret.push(row);
  }

  if (outOfOrder) {
    console.warn("DataTable is out of order; order it correctly to speed loading.");
    ret.sort(function (a, b) {
      return a[0] - b[0];
    });
  }
  this.rawData_ = ret;

  if (annotations.length > 0) {
    this.setAnnotations(annotations, true);
  }
  this.attributes_.reparseSeries();
};

/**
 * Signals to plugins that the chart data has updated.
 * This happens after the data has updated but before the chart has redrawn.
 * @private
 */
Dygraph.prototype.cascadeDataDidUpdateEvent_ = function () {
  // TODO(danvk): there are some issues checking xAxisRange() and using
  // toDomCoords from handlers of this event. The visible range should be set
  // when the chart is drawn, not derived from the data.
  this.cascadeEvents_('dataDidUpdate', {});
};

/**
 * Get the CSV data. If it's in a function, call that function. If it's in a
 * file, do an XMLHttpRequest to get it.
 * @private
 */
Dygraph.prototype.start_ = function () {
  var data = this.file_;

  // Functions can return references of all other types.
  if (typeof data == 'function') {
    data = data();
  }

  if (utils.isArrayLike(data)) {
    this.rawData_ = this.parseArray_(data);
    this.cascadeDataDidUpdateEvent_();
    this.predraw_();
  } else if (typeof data == 'object' && typeof data.getColumnRange == 'function') {
    // must be a DataTable from gviz.
    this.parseDataTable_(data);
    this.cascadeDataDidUpdateEvent_();
    this.predraw_();
  } else if (typeof data == 'string') {
    // Heuristic: a newline means it's CSV data. Otherwise it's an URL.
    var line_delimiter = utils.detectLineDelimiter(data);
    if (line_delimiter) {
      this.loadedEvent_(data);
    } else {
      // REMOVE_FOR_IE
      var req;
      if (window.XMLHttpRequest) {
        // Firefox, Opera, IE7, and other browsers will use the native object
        req = new XMLHttpRequest();
      } else {
        // IE 5 and 6 will use the ActiveX control
        req = new ActiveXObject("Microsoft.XMLHTTP");
      }

      var caller = this;
      req.onreadystatechange = function () {
        if (req.readyState == 4) {
          if (req.status === 200 || // Normal http
          req.status === 0) {
            // Chrome w/ --allow-file-access-from-files
            caller.loadedEvent_(req.responseText);
          }
        }
      };

      req.open("GET", data, true);
      req.send(null);
    }
  } else {
    console.error("Unknown data format: " + typeof data);
  }
};

/**
 * Changes various properties of the graph. These can include:
 * <ul>
 * <li>file: changes the source data for the graph</li>
 * <li>errorBars: changes whether the data contains stddev</li>
 * </ul>
 *
 * There's a huge variety of options that can be passed to this method. For a
 * full list, see http://dygraphs.com/options.html.
 *
 * @param {Object} input_attrs The new properties and values
 * @param {boolean} block_redraw Usually the chart is redrawn after every
 *     call to updateOptions(). If you know better, you can pass true to
 *     explicitly block the redraw. This can be useful for chaining
 *     updateOptions() calls, avoiding the occasional infinite loop and
 *     preventing redraws when it's not necessary (e.g. when updating a
 *     callback).
 */
Dygraph.prototype.updateOptions = function (input_attrs, block_redraw) {
  if (typeof block_redraw == 'undefined') block_redraw = false;

  // copyUserAttrs_ drops the "file" parameter as a convenience to us.
  var file = input_attrs.file;
  var attrs = Dygraph.copyUserAttrs_(input_attrs);

  // TODO(danvk): this is a mess. Move these options into attr_.
  if ('rollPeriod' in attrs) {
    this.rollPeriod_ = attrs.rollPeriod;
  }
  if ('dateWindow' in attrs) {
    this.dateWindow_ = attrs.dateWindow;
  }

  // TODO(danvk): validate per-series options.
  // Supported:
  // strokeWidth
  // pointSize
  // drawPoints
  // highlightCircleSize

  // Check if this set options will require new points.
  var requiresNewPoints = utils.isPixelChangingOptionList(this.attr_("labels"), attrs);

  utils.updateDeep(this.user_attrs_, attrs);

  this.attributes_.reparseSeries();

  if (file) {
    // This event indicates that the data is about to change, but hasn't yet.
    // TODO(danvk): support cancellation of the update via this event.
    this.cascadeEvents_('dataWillUpdate', {});

    this.file_ = file;
    if (!block_redraw) this.start_();
  } else {
    if (!block_redraw) {
      if (requiresNewPoints) {
        this.predraw_();
      } else {
        this.renderGraph_(false);
      }
    }
  }
};

/**
 * Make a copy of input attributes, removing file as a convenience.
 * @private
 */
Dygraph.copyUserAttrs_ = function (attrs) {
  var my_attrs = {};
  for (var k in attrs) {
    if (!attrs.hasOwnProperty(k)) continue;
    if (k == 'file') continue;
    if (attrs.hasOwnProperty(k)) my_attrs[k] = attrs[k];
  }
  return my_attrs;
};

/**
 * Resizes the dygraph. If no parameters are specified, resizes to fill the
 * containing div (which has presumably changed size since the dygraph was
 * instantiated. If the width/height are specified, the div will be resized.
 *
 * This is far more efficient than destroying and re-instantiating a
 * Dygraph, since it doesn't have to reparse the underlying data.
 *
 * @param {number} width Width (in pixels)
 * @param {number} height Height (in pixels)
 */
Dygraph.prototype.resize = function (width, height) {
  if (this.resize_lock) {
    return;
  }
  this.resize_lock = true;

  if (width === null != (height === null)) {
    console.warn("Dygraph.resize() should be called with zero parameters or " + "two non-NULL parameters. Pretending it was zero.");
    width = height = null;
  }

  var old_width = this.width_;
  var old_height = this.height_;

  if (width) {
    this.maindiv_.style.width = width + "px";
    this.maindiv_.style.height = height + "px";
    this.width_ = width;
    this.height_ = height;
  } else {
    this.width_ = this.maindiv_.clientWidth;
    this.height_ = this.maindiv_.clientHeight;
  }

  if (old_width != this.width_ || old_height != this.height_) {
    // Resizing a canvas erases it, even when the size doesn't change, so
    // any resize needs to be followed by a redraw.
    this.resizeElements_();
    this.predraw_();
  }

  this.resize_lock = false;
};

/**
 * Adjusts the number of points in the rolling average. Updates the graph to
 * reflect the new averaging period.
 * @param {number} length Number of points over which to average the data.
 */
Dygraph.prototype.adjustRoll = function (length) {
  this.rollPeriod_ = length;
  this.predraw_();
};

/**
 * Returns a boolean array of visibility statuses.
 */
Dygraph.prototype.visibility = function () {
  // Do lazy-initialization, so that this happens after we know the number of
  // data series.
  if (!this.getOption("visibility")) {
    this.attrs_.visibility = [];
  }
  // TODO(danvk): it looks like this could go into an infinite loop w/ user_attrs.
  while (this.getOption("visibility").length < this.numColumns() - 1) {
    this.attrs_.visibility.push(true);
  }
  return this.getOption("visibility");
};

/**
 * Changes the visibility of one or more series.
 *
 * @param {number|number[]|object} num the series index or an array of series indices
 *                                     or a boolean array of visibility states by index
 *                                     or an object mapping series numbers, as keys, to
 *                                     visibility state (boolean values)
 * @param {boolean} value the visibility state expressed as a boolean
 */
Dygraph.prototype.setVisibility = function (num, value) {
  var x = this.visibility();
  var numIsObject = false;

  if (!Array.isArray(num)) {
    if (num !== null && typeof num === 'object') {
      numIsObject = true;
    } else {
      num = [num];
    }
  }

  if (numIsObject) {
    for (var i in num) {
      if (num.hasOwnProperty(i)) {
        if (i < 0 || i >= x.length) {
          console.warn("Invalid series number in setVisibility: " + i);
        } else {
          x[i] = num[i];
        }
      }
    }
  } else {
    for (var i = 0; i < num.length; i++) {
      if (typeof num[i] === 'boolean') {
        if (i >= x.length) {
          console.warn("Invalid series number in setVisibility: " + i);
        } else {
          x[i] = num[i];
        }
      } else {
        if (num[i] < 0 || num[i] >= x.length) {
          console.warn("Invalid series number in setVisibility: " + num[i]);
        } else {
          x[num[i]] = value;
        }
      }
    }
  }

  this.predraw_();
};

/**
 * How large of an area will the dygraph render itself in?
 * This is used for testing.
 * @return A {width: w, height: h} object.
 * @private
 */
Dygraph.prototype.size = function () {
  return { width: this.width_, height: this.height_ };
};

/**
 * Update the list of annotations and redraw the chart.
 * See dygraphs.com/annotations.html for more info on how to use annotations.
 * @param ann {Array} An array of annotation objects.
 * @param suppressDraw {Boolean} Set to "true" to block chart redraw (optional).
 */
Dygraph.prototype.setAnnotations = function (ann, suppressDraw) {
  // Only add the annotation CSS rule once we know it will be used.
  this.annotations_ = ann;
  if (!this.layout_) {
    console.warn("Tried to setAnnotations before dygraph was ready. " + "Try setting them in a ready() block. See " + "dygraphs.com/tests/annotation.html");
    return;
  }

  this.layout_.setAnnotations(this.annotations_);
  if (!suppressDraw) {
    this.predraw_();
  }
};

/**
 * Return the list of annotations.
 */
Dygraph.prototype.annotations = function () {
  return this.annotations_;
};

/**
 * Get the list of label names for this graph. The first column is the
 * x-axis, so the data series names start at index 1.
 *
 * Returns null when labels have not yet been defined.
 */
Dygraph.prototype.getLabels = function () {
  var labels = this.attr_("labels");
  return labels ? labels.slice() : null;
};

/**
 * Get the index of a series (column) given its name. The first column is the
 * x-axis, so the data series start with index 1.
 */
Dygraph.prototype.indexFromSetName = function (name) {
  return this.setIndexByName_[name];
};

/**
 * Find the row number corresponding to the given x-value.
 * Returns null if there is no such x-value in the data.
 * If there are multiple rows with the same x-value, this will return the
 * first one.
 * @param {number} xVal The x-value to look for (e.g. millis since epoch).
 * @return {?number} The row number, which you can pass to getValue(), or null.
 */
Dygraph.prototype.getRowForX = function (xVal) {
  var low = 0,
      high = this.numRows() - 1;

  while (low <= high) {
    var idx = high + low >> 1;
    var x = this.getValue(idx, 0);
    if (x < xVal) {
      low = idx + 1;
    } else if (x > xVal) {
      high = idx - 1;
    } else if (low != idx) {
      // equal, but there may be an earlier match.
      high = idx;
    } else {
      return idx;
    }
  }

  return null;
};

/**
 * Trigger a callback when the dygraph has drawn itself and is ready to be
 * manipulated. This is primarily useful when dygraphs has to do an XHR for the
 * data (i.e. a URL is passed as the data source) and the chart is drawn
 * asynchronously. If the chart has already drawn, the callback will fire
 * immediately.
 *
 * This is a good place to call setAnnotation().
 *
 * @param {function(!Dygraph)} callback The callback to trigger when the chart
 *     is ready.
 */
Dygraph.prototype.ready = function (callback) {
  if (this.is_initial_draw_) {
    this.readyFns_.push(callback);
  } else {
    callback.call(this, this);
  }
};

/**
 * Add an event handler. This event handler is kept until the graph is
 * destroyed with a call to graph.destroy().
 *
 * @param {!Node} elem The element to add the event to.
 * @param {string} type The type of the event, e.g. 'click' or 'mousemove'.
 * @param {function(Event):(boolean|undefined)} fn The function to call
 *     on the event. The function takes one parameter: the event object.
 * @private
 */
Dygraph.prototype.addAndTrackEvent = function (elem, type, fn) {
  utils.addEvent(elem, type, fn);
  this.registeredEvents_.push({ elem: elem, type: type, fn: fn });
};

Dygraph.prototype.removeTrackedEvents_ = function () {
  if (this.registeredEvents_) {
    for (var idx = 0; idx < this.registeredEvents_.length; idx++) {
      var reg = this.registeredEvents_[idx];
      utils.removeEvent(reg.elem, reg.type, reg.fn);
    }
  }

  this.registeredEvents_ = [];
};

// Installed plugins, in order of precedence (most-general to most-specific).
Dygraph.PLUGINS = [_pluginsLegend2['default'], _pluginsAxes2['default'], _pluginsRangeSelector2['default'], // Has to be before ChartLabels so that its callbacks are called after ChartLabels' callbacks.
_pluginsChartLabels2['default'], _pluginsAnnotations2['default'], _pluginsGrid2['default']];

// There are many symbols which have historically been available through the
// Dygraph class. These are exported here for backwards compatibility.
Dygraph.GVizChart = _dygraphGviz2['default'];
Dygraph.DASHED_LINE = utils.DASHED_LINE;
Dygraph.DOT_DASH_LINE = utils.DOT_DASH_LINE;
Dygraph.dateAxisLabelFormatter = utils.dateAxisLabelFormatter;
Dygraph.toRGB_ = utils.toRGB_;
Dygraph.findPos = utils.findPos;
Dygraph.pageX = utils.pageX;
Dygraph.pageY = utils.pageY;
Dygraph.dateString_ = utils.dateString_;
Dygraph.defaultInteractionModel = _dygraphInteractionModel2['default'].defaultModel;
Dygraph.nonInteractiveModel = Dygraph.nonInteractiveModel_ = _dygraphInteractionModel2['default'].nonInteractiveModel_;
Dygraph.Circles = utils.Circles;

Dygraph.Plugins = {
  Legend: _pluginsLegend2['default'],
  Axes: _pluginsAxes2['default'],
  Annotations: _pluginsAnnotations2['default'],
  ChartLabels: _pluginsChartLabels2['default'],
  Grid: _pluginsGrid2['default'],
  RangeSelector: _pluginsRangeSelector2['default']
};

Dygraph.DataHandlers = {
  DefaultHandler: _datahandlerDefault2['default'],
  BarsHandler: _datahandlerBars2['default'],
  CustomBarsHandler: _datahandlerBarsCustom2['default'],
  DefaultFractionHandler: _datahandlerDefaultFractions2['default'],
  ErrorBarsHandler: _datahandlerBarsError2['default'],
  FractionsBarsHandler: _datahandlerBarsFractions2['default']
};

Dygraph.startPan = _dygraphInteractionModel2['default'].startPan;
Dygraph.startZoom = _dygraphInteractionModel2['default'].startZoom;
Dygraph.movePan = _dygraphInteractionModel2['default'].movePan;
Dygraph.moveZoom = _dygraphInteractionModel2['default'].moveZoom;
Dygraph.endPan = _dygraphInteractionModel2['default'].endPan;
Dygraph.endZoom = _dygraphInteractionModel2['default'].endZoom;

Dygraph.numericLinearTicks = DygraphTickers.numericLinearTicks;
Dygraph.numericTicks = DygraphTickers.numericTicks;
Dygraph.dateTicker = DygraphTickers.dateTicker;
Dygraph.Granularity = DygraphTickers.Granularity;
Dygraph.getDateAxis = DygraphTickers.getDateAxis;
Dygraph.floatFormat = utils.floatFormat;

exports['default'] = Dygraph;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../process/browser.js */ 3)))

/***/ }),
/* 3 */
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/*!**********************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/dygraph-tickers.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2011 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview Description of this file.
 * @author danvk@google.com (Dan Vanderkam)
 *
 * A ticker is a function with the following interface:
 *
 * function(a, b, pixels, options_view, dygraph, forced_values);
 * -> [ { v: tick1_v, label: tick1_label[, label_v: label_v1] },
 *      { v: tick2_v, label: tick2_label[, label_v: label_v2] },
 *      ...
 *    ]
 *
 * The returned value is called a "tick list".
 *
 * Arguments
 * ---------
 *
 * [a, b] is the range of the axis for which ticks are being generated. For a
 * numeric axis, these will simply be numbers. For a date axis, these will be
 * millis since epoch (convertable to Date objects using "new Date(a)" and "new
 * Date(b)").
 *
 * opts provides access to chart- and axis-specific options. It can be used to
 * access number/date formatting code/options, check for a log scale, etc.
 *
 * pixels is the length of the axis in pixels. opts('pixelsPerLabel') is the
 * minimum amount of space to be allotted to each label. For instance, if
 * pixels=400 and opts('pixelsPerLabel')=40 then the ticker should return
 * between zero and ten (400/40) ticks.
 *
 * dygraph is the Dygraph object for which an axis is being constructed.
 *
 * forced_values is used for secondary y-axes. The tick positions are typically
 * set by the primary y-axis, so the secondary y-axis has no choice in where to
 * put these. It simply has to generate labels for these data values.
 *
 * Tick lists
 * ----------
 * Typically a tick will have both a grid/tick line and a label at one end of
 * that line (at the bottom for an x-axis, at left or right for the y-axis).
 *
 * A tick may be missing one of these two components:
 * - If "label_v" is specified instead of "v", then there will be no tick or
 *   gridline, just a label.
 * - Similarly, if "label" is not specified, then there will be a gridline
 *   without a label.
 *
 * This flexibility is useful in a few situations:
 * - For log scales, some of the tick lines may be too close to all have labels.
 * - For date scales where years are being displayed, it is desirable to display
 *   tick marks at the beginnings of years but labels (e.g. "2006") in the
 *   middle of the years.
 */

/*jshint sub:true */
/*global Dygraph:false */


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dygraphUtils = __webpack_require__(/*! ./dygraph-utils */ 0);

var utils = _interopRequireWildcard(_dygraphUtils);

/** @typedef {Array.<{v:number, label:string, label_v:(string|undefined)}>} */
var TickList = undefined; // the ' = undefined' keeps jshint happy.

/** @typedef {function(
 *    number,
 *    number,
 *    number,
 *    function(string):*,
 *    Dygraph=,
 *    Array.<number>=
 *  ): TickList}
 */
var Ticker = undefined; // the ' = undefined' keeps jshint happy.

/** @type {Ticker} */
var numericLinearTicks = function numericLinearTicks(a, b, pixels, opts, dygraph, vals) {
  var nonLogscaleOpts = function nonLogscaleOpts(opt) {
    if (opt === 'logscale') return false;
    return opts(opt);
  };
  return numericTicks(a, b, pixels, nonLogscaleOpts, dygraph, vals);
};

exports.numericLinearTicks = numericLinearTicks;
/** @type {Ticker} */
var numericTicks = function numericTicks(a, b, pixels, opts, dygraph, vals) {
  var pixels_per_tick = /** @type{number} */opts('pixelsPerLabel');
  var ticks = [];
  var i, j, tickV, nTicks;
  if (vals) {
    for (i = 0; i < vals.length; i++) {
      ticks.push({ v: vals[i] });
    }
  } else {
    // TODO(danvk): factor this log-scale block out into a separate function.
    if (opts("logscale")) {
      nTicks = Math.floor(pixels / pixels_per_tick);
      var minIdx = utils.binarySearch(a, PREFERRED_LOG_TICK_VALUES, 1);
      var maxIdx = utils.binarySearch(b, PREFERRED_LOG_TICK_VALUES, -1);
      if (minIdx == -1) {
        minIdx = 0;
      }
      if (maxIdx == -1) {
        maxIdx = PREFERRED_LOG_TICK_VALUES.length - 1;
      }
      // Count the number of tick values would appear, if we can get at least
      // nTicks / 4 accept them.
      var lastDisplayed = null;
      if (maxIdx - minIdx >= nTicks / 4) {
        for (var idx = maxIdx; idx >= minIdx; idx--) {
          var tickValue = PREFERRED_LOG_TICK_VALUES[idx];
          var pixel_coord = Math.log(tickValue / a) / Math.log(b / a) * pixels;
          var tick = { v: tickValue };
          if (lastDisplayed === null) {
            lastDisplayed = {
              tickValue: tickValue,
              pixel_coord: pixel_coord
            };
          } else {
            if (Math.abs(pixel_coord - lastDisplayed.pixel_coord) >= pixels_per_tick) {
              lastDisplayed = {
                tickValue: tickValue,
                pixel_coord: pixel_coord
              };
            } else {
              tick.label = "";
            }
          }
          ticks.push(tick);
        }
        // Since we went in backwards order.
        ticks.reverse();
      }
    }

    // ticks.length won't be 0 if the log scale function finds values to insert.
    if (ticks.length === 0) {
      // Basic idea:
      // Try labels every 1, 2, 5, 10, 20, 50, 100, etc.
      // Calculate the resulting tick spacing (i.e. this.height_ / nTicks).
      // The first spacing greater than pixelsPerYLabel is what we use.
      // TODO(danvk): version that works on a log scale.
      var kmg2 = opts("labelsKMG2");
      var mults, base;
      if (kmg2) {
        mults = [1, 2, 4, 8, 16, 32, 64, 128, 256];
        base = 16;
      } else {
        mults = [1, 2, 5, 10, 20, 50, 100];
        base = 10;
      }

      // Get the maximum number of permitted ticks based on the
      // graph's pixel size and pixels_per_tick setting.
      var max_ticks = Math.ceil(pixels / pixels_per_tick);

      // Now calculate the data unit equivalent of this tick spacing.
      // Use abs() since graphs may have a reversed Y axis.
      var units_per_tick = Math.abs(b - a) / max_ticks;

      // Based on this, get a starting scale which is the largest
      // integer power of the chosen base (10 or 16) that still remains
      // below the requested pixels_per_tick spacing.
      var base_power = Math.floor(Math.log(units_per_tick) / Math.log(base));
      var base_scale = Math.pow(base, base_power);

      // Now try multiples of the starting scale until we find one
      // that results in tick marks spaced sufficiently far apart.
      // The "mults" array should cover the range 1 .. base^2 to
      // adjust for rounding and edge effects.
      var scale, low_val, high_val, spacing;
      for (j = 0; j < mults.length; j++) {
        scale = base_scale * mults[j];
        low_val = Math.floor(a / scale) * scale;
        high_val = Math.ceil(b / scale) * scale;
        nTicks = Math.abs(high_val - low_val) / scale;
        spacing = pixels / nTicks;
        if (spacing > pixels_per_tick) break;
      }

      // Construct the set of ticks.
      // Allow reverse y-axis if it's explicitly requested.
      if (low_val > high_val) scale *= -1;
      for (i = 0; i <= nTicks; i++) {
        tickV = low_val + i * scale;
        ticks.push({ v: tickV });
      }
    }
  }

  var formatter = /**@type{AxisLabelFormatter}*/opts('axisLabelFormatter');

  // Add labels to the ticks.
  for (i = 0; i < ticks.length; i++) {
    if (ticks[i].label !== undefined) continue; // Use current label.
    // TODO(danvk): set granularity to something appropriate here.
    ticks[i].label = formatter.call(dygraph, ticks[i].v, 0, opts, dygraph);
  }

  return ticks;
};

exports.numericTicks = numericTicks;
/** @type {Ticker} */
var dateTicker = function dateTicker(a, b, pixels, opts, dygraph, vals) {
  var chosen = pickDateTickGranularity(a, b, pixels, opts);

  if (chosen >= 0) {
    return getDateAxis(a, b, chosen, opts, dygraph);
  } else {
    // this can happen if self.width_ is zero.
    return [];
  }
};

exports.dateTicker = dateTicker;
// Time granularity enumeration
var Granularity = {
  MILLISECONDLY: 0,
  TWO_MILLISECONDLY: 1,
  FIVE_MILLISECONDLY: 2,
  TEN_MILLISECONDLY: 3,
  FIFTY_MILLISECONDLY: 4,
  HUNDRED_MILLISECONDLY: 5,
  FIVE_HUNDRED_MILLISECONDLY: 6,
  SECONDLY: 7,
  TWO_SECONDLY: 8,
  FIVE_SECONDLY: 9,
  TEN_SECONDLY: 10,
  THIRTY_SECONDLY: 11,
  MINUTELY: 12,
  TWO_MINUTELY: 13,
  FIVE_MINUTELY: 14,
  TEN_MINUTELY: 15,
  THIRTY_MINUTELY: 16,
  HOURLY: 17,
  TWO_HOURLY: 18,
  SIX_HOURLY: 19,
  DAILY: 20,
  TWO_DAILY: 21,
  WEEKLY: 22,
  MONTHLY: 23,
  QUARTERLY: 24,
  BIANNUAL: 25,
  ANNUAL: 26,
  DECADAL: 27,
  CENTENNIAL: 28,
  NUM_GRANULARITIES: 29
};

exports.Granularity = Granularity;
// Date components enumeration (in the order of the arguments in Date)
// TODO: make this an @enum
var DateField = {
  DATEFIELD_Y: 0,
  DATEFIELD_M: 1,
  DATEFIELD_D: 2,
  DATEFIELD_HH: 3,
  DATEFIELD_MM: 4,
  DATEFIELD_SS: 5,
  DATEFIELD_MS: 6,
  NUM_DATEFIELDS: 7
};

/**
 * The value of datefield will start at an even multiple of "step", i.e.
 *   if datefield=SS and step=5 then the first tick will be on a multiple of 5s.
 *
 * For granularities <= HOURLY, ticks are generated every `spacing` ms.
 *
 * At coarser granularities, ticks are generated by incrementing `datefield` by
 *   `step`. In this case, the `spacing` value is only used to estimate the
 *   number of ticks. It should roughly correspond to the spacing between
 *   adjacent ticks.
 *
 * @type {Array.<{datefield:number, step:number, spacing:number}>}
 */
var TICK_PLACEMENT = [];
TICK_PLACEMENT[Granularity.MILLISECONDLY] = { datefield: DateField.DATEFIELD_MS, step: 1, spacing: 1 };
TICK_PLACEMENT[Granularity.TWO_MILLISECONDLY] = { datefield: DateField.DATEFIELD_MS, step: 2, spacing: 2 };
TICK_PLACEMENT[Granularity.FIVE_MILLISECONDLY] = { datefield: DateField.DATEFIELD_MS, step: 5, spacing: 5 };
TICK_PLACEMENT[Granularity.TEN_MILLISECONDLY] = { datefield: DateField.DATEFIELD_MS, step: 10, spacing: 10 };
TICK_PLACEMENT[Granularity.FIFTY_MILLISECONDLY] = { datefield: DateField.DATEFIELD_MS, step: 50, spacing: 50 };
TICK_PLACEMENT[Granularity.HUNDRED_MILLISECONDLY] = { datefield: DateField.DATEFIELD_MS, step: 100, spacing: 100 };
TICK_PLACEMENT[Granularity.FIVE_HUNDRED_MILLISECONDLY] = { datefield: DateField.DATEFIELD_MS, step: 500, spacing: 500 };
TICK_PLACEMENT[Granularity.SECONDLY] = { datefield: DateField.DATEFIELD_SS, step: 1, spacing: 1000 * 1 };
TICK_PLACEMENT[Granularity.TWO_SECONDLY] = { datefield: DateField.DATEFIELD_SS, step: 2, spacing: 1000 * 2 };
TICK_PLACEMENT[Granularity.FIVE_SECONDLY] = { datefield: DateField.DATEFIELD_SS, step: 5, spacing: 1000 * 5 };
TICK_PLACEMENT[Granularity.TEN_SECONDLY] = { datefield: DateField.DATEFIELD_SS, step: 10, spacing: 1000 * 10 };
TICK_PLACEMENT[Granularity.THIRTY_SECONDLY] = { datefield: DateField.DATEFIELD_SS, step: 30, spacing: 1000 * 30 };
TICK_PLACEMENT[Granularity.MINUTELY] = { datefield: DateField.DATEFIELD_MM, step: 1, spacing: 1000 * 60 };
TICK_PLACEMENT[Granularity.TWO_MINUTELY] = { datefield: DateField.DATEFIELD_MM, step: 2, spacing: 1000 * 60 * 2 };
TICK_PLACEMENT[Granularity.FIVE_MINUTELY] = { datefield: DateField.DATEFIELD_MM, step: 5, spacing: 1000 * 60 * 5 };
TICK_PLACEMENT[Granularity.TEN_MINUTELY] = { datefield: DateField.DATEFIELD_MM, step: 10, spacing: 1000 * 60 * 10 };
TICK_PLACEMENT[Granularity.THIRTY_MINUTELY] = { datefield: DateField.DATEFIELD_MM, step: 30, spacing: 1000 * 60 * 30 };
TICK_PLACEMENT[Granularity.HOURLY] = { datefield: DateField.DATEFIELD_HH, step: 1, spacing: 1000 * 3600 };
TICK_PLACEMENT[Granularity.TWO_HOURLY] = { datefield: DateField.DATEFIELD_HH, step: 2, spacing: 1000 * 3600 * 2 };
TICK_PLACEMENT[Granularity.SIX_HOURLY] = { datefield: DateField.DATEFIELD_HH, step: 6, spacing: 1000 * 3600 * 6 };
TICK_PLACEMENT[Granularity.DAILY] = { datefield: DateField.DATEFIELD_D, step: 1, spacing: 1000 * 86400 };
TICK_PLACEMENT[Granularity.TWO_DAILY] = { datefield: DateField.DATEFIELD_D, step: 2, spacing: 1000 * 86400 * 2 };
TICK_PLACEMENT[Granularity.WEEKLY] = { datefield: DateField.DATEFIELD_D, step: 7, spacing: 1000 * 604800 };
TICK_PLACEMENT[Granularity.MONTHLY] = { datefield: DateField.DATEFIELD_M, step: 1, spacing: 1000 * 7200 * 365.2524 }; // 1e3 * 60 * 60 * 24 * 365.2524 / 12
TICK_PLACEMENT[Granularity.QUARTERLY] = { datefield: DateField.DATEFIELD_M, step: 3, spacing: 1000 * 21600 * 365.2524 }; // 1e3 * 60 * 60 * 24 * 365.2524 / 4
TICK_PLACEMENT[Granularity.BIANNUAL] = { datefield: DateField.DATEFIELD_M, step: 6, spacing: 1000 * 43200 * 365.2524 }; // 1e3 * 60 * 60 * 24 * 365.2524 / 2
TICK_PLACEMENT[Granularity.ANNUAL] = { datefield: DateField.DATEFIELD_Y, step: 1, spacing: 1000 * 86400 * 365.2524 }; // 1e3 * 60 * 60 * 24 * 365.2524 * 1
TICK_PLACEMENT[Granularity.DECADAL] = { datefield: DateField.DATEFIELD_Y, step: 10, spacing: 1000 * 864000 * 365.2524 }; // 1e3 * 60 * 60 * 24 * 365.2524 * 10
TICK_PLACEMENT[Granularity.CENTENNIAL] = { datefield: DateField.DATEFIELD_Y, step: 100, spacing: 1000 * 8640000 * 365.2524 }; // 1e3 * 60 * 60 * 24 * 365.2524 * 100

/**
 * This is a list of human-friendly values at which to show tick marks on a log
 * scale. It is k * 10^n, where k=1..9 and n=-39..+39, so:
 * ..., 1, 2, 3, 4, 5, ..., 9, 10, 20, 30, ..., 90, 100, 200, 300, ...
 * NOTE: this assumes that utils.LOG_SCALE = 10.
 * @type {Array.<number>}
 */
var PREFERRED_LOG_TICK_VALUES = (function () {
  var vals = [];
  for (var power = -39; power <= 39; power++) {
    var range = Math.pow(10, power);
    for (var mult = 1; mult <= 9; mult++) {
      var val = range * mult;
      vals.push(val);
    }
  }
  return vals;
})();

/**
 * Determine the correct granularity of ticks on a date axis.
 *
 * @param {number} a Left edge of the chart (ms)
 * @param {number} b Right edge of the chart (ms)
 * @param {number} pixels Size of the chart in the relevant dimension (width).
 * @param {function(string):*} opts Function mapping from option name -&gt; value.
 * @return {number} The appropriate axis granularity for this chart. See the
 *     enumeration of possible values in dygraph-tickers.js.
 */
var pickDateTickGranularity = function pickDateTickGranularity(a, b, pixels, opts) {
  var pixels_per_tick = /** @type{number} */opts('pixelsPerLabel');
  for (var i = 0; i < Granularity.NUM_GRANULARITIES; i++) {
    var num_ticks = numDateTicks(a, b, i);
    if (pixels / num_ticks >= pixels_per_tick) {
      return i;
    }
  }
  return -1;
};

/**
 * Compute the number of ticks on a date axis for a given granularity.
 * @param {number} start_time
 * @param {number} end_time
 * @param {number} granularity (one of the granularities enumerated above)
 * @return {number} (Approximate) number of ticks that would result.
 */
var numDateTicks = function numDateTicks(start_time, end_time, granularity) {
  var spacing = TICK_PLACEMENT[granularity].spacing;
  return Math.round(1.0 * (end_time - start_time) / spacing);
};

/**
 * Compute the positions and labels of ticks on a date axis for a given granularity.
 * @param {number} start_time
 * @param {number} end_time
 * @param {number} granularity (one of the granularities enumerated above)
 * @param {function(string):*} opts Function mapping from option name -&gt; value.
 * @param {Dygraph=} dg
 * @return {!TickList}
 */
var getDateAxis = function getDateAxis(start_time, end_time, granularity, opts, dg) {
  var formatter = /** @type{AxisLabelFormatter} */opts("axisLabelFormatter");
  var utc = opts("labelsUTC");
  var accessors = utc ? utils.DateAccessorsUTC : utils.DateAccessorsLocal;

  var datefield = TICK_PLACEMENT[granularity].datefield;
  var step = TICK_PLACEMENT[granularity].step;
  var spacing = TICK_PLACEMENT[granularity].spacing;

  // Choose a nice tick position before the initial instant.
  // Currently, this code deals properly with the existent daily granularities:
  // DAILY (with step of 1) and WEEKLY (with step of 7 but specially handled).
  // Other daily granularities (say TWO_DAILY) should also be handled specially
  // by setting the start_date_offset to 0.
  var start_date = new Date(start_time);
  var date_array = [];
  date_array[DateField.DATEFIELD_Y] = accessors.getFullYear(start_date);
  date_array[DateField.DATEFIELD_M] = accessors.getMonth(start_date);
  date_array[DateField.DATEFIELD_D] = accessors.getDate(start_date);
  date_array[DateField.DATEFIELD_HH] = accessors.getHours(start_date);
  date_array[DateField.DATEFIELD_MM] = accessors.getMinutes(start_date);
  date_array[DateField.DATEFIELD_SS] = accessors.getSeconds(start_date);
  date_array[DateField.DATEFIELD_MS] = accessors.getMilliseconds(start_date);

  var start_date_offset = date_array[datefield] % step;
  if (granularity == Granularity.WEEKLY) {
    // This will put the ticks on Sundays.
    start_date_offset = accessors.getDay(start_date);
  }

  date_array[datefield] -= start_date_offset;
  for (var df = datefield + 1; df < DateField.NUM_DATEFIELDS; df++) {
    // The minimum value is 1 for the day of month, and 0 for all other fields.
    date_array[df] = df === DateField.DATEFIELD_D ? 1 : 0;
  }

  // Generate the ticks.
  // For granularities not coarser than HOURLY we use the fact that:
  //   the number of milliseconds between ticks is constant
  //   and equal to the defined spacing.
  // Otherwise we rely on the 'roll over' property of the Date functions:
  //   when some date field is set to a value outside of its logical range,
  //   the excess 'rolls over' the next (more significant) field.
  // However, when using local time with DST transitions,
  // there are dates that do not represent any time value at all
  // (those in the hour skipped at the 'spring forward'),
  // and the JavaScript engines usually return an equivalent value.
  // Hence we have to check that the date is properly increased at each step,
  // returning a date at a nice tick position.
  var ticks = [];
  var tick_date = accessors.makeDate.apply(null, date_array);
  var tick_time = tick_date.getTime();
  if (granularity <= Granularity.HOURLY) {
    if (tick_time < start_time) {
      tick_time += spacing;
      tick_date = new Date(tick_time);
    }
    while (tick_time <= end_time) {
      ticks.push({ v: tick_time,
        label: formatter.call(dg, tick_date, granularity, opts, dg)
      });
      tick_time += spacing;
      tick_date = new Date(tick_time);
    }
  } else {
    if (tick_time < start_time) {
      date_array[datefield] += step;
      tick_date = accessors.makeDate.apply(null, date_array);
      tick_time = tick_date.getTime();
    }
    while (tick_time <= end_time) {
      if (granularity >= Granularity.DAILY || accessors.getHours(tick_date) % step === 0) {
        ticks.push({ v: tick_time,
          label: formatter.call(dg, tick_date, granularity, opts, dg)
        });
      }
      date_array[datefield] += step;
      tick_date = accessors.makeDate.apply(null, date_array);
      tick_time = tick_date.getTime();
    }
  }
  return ticks;
};
exports.getDateAxis = getDateAxis;

/***/ }),
/* 5 */
/*!********************************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/dygraph-interaction-model.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2011 Robert Konigsberg (konigsberg@google.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview The default interaction model for Dygraphs. This is kept out
 * of dygraph.js for better navigability.
 * @author Robert Konigsberg (konigsberg@google.com)
 */

/*global Dygraph:false */


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _dygraphUtils = __webpack_require__(/*! ./dygraph-utils */ 0);

var utils = _interopRequireWildcard(_dygraphUtils);

/**
 * You can drag this many pixels past the edge of the chart and still have it
 * be considered a zoom. This makes it easier to zoom to the exact edge of the
 * chart, a fairly common operation.
 */
var DRAG_EDGE_MARGIN = 100;

/**
 * A collection of functions to facilitate build custom interaction models.
 * @class
 */
var DygraphInteraction = {};

/**
 * Checks whether the beginning & ending of an event were close enough that it
 * should be considered a click. If it should, dispatch appropriate events.
 * Returns true if the event was treated as a click.
 *
 * @param {Event} event
 * @param {Dygraph} g
 * @param {Object} context
 */
DygraphInteraction.maybeTreatMouseOpAsClick = function (event, g, context) {
  context.dragEndX = utils.dragGetX_(event, context);
  context.dragEndY = utils.dragGetY_(event, context);
  var regionWidth = Math.abs(context.dragEndX - context.dragStartX);
  var regionHeight = Math.abs(context.dragEndY - context.dragStartY);

  if (regionWidth < 2 && regionHeight < 2 && g.lastx_ !== undefined && g.lastx_ != -1) {
    DygraphInteraction.treatMouseOpAsClick(g, event, context);
  }

  context.regionWidth = regionWidth;
  context.regionHeight = regionHeight;
};

/**
 * Called in response to an interaction model operation that
 * should start the default panning behavior.
 *
 * It's used in the default callback for "mousedown" operations.
 * Custom interaction model builders can use it to provide the default
 * panning behavior.
 *
 * @param {Event} event the event object which led to the startPan call.
 * @param {Dygraph} g The dygraph on which to act.
 * @param {Object} context The dragging context object (with
 *     dragStartX/dragStartY/etc. properties). This function modifies the
 *     context.
 */
DygraphInteraction.startPan = function (event, g, context) {
  var i, axis;
  context.isPanning = true;
  var xRange = g.xAxisRange();

  if (g.getOptionForAxis("logscale", "x")) {
    context.initialLeftmostDate = utils.log10(xRange[0]);
    context.dateRange = utils.log10(xRange[1]) - utils.log10(xRange[0]);
  } else {
    context.initialLeftmostDate = xRange[0];
    context.dateRange = xRange[1] - xRange[0];
  }
  context.xUnitsPerPixel = context.dateRange / (g.plotter_.area.w - 1);

  if (g.getNumericOption("panEdgeFraction")) {
    var maxXPixelsToDraw = g.width_ * g.getNumericOption("panEdgeFraction");
    var xExtremes = g.xAxisExtremes(); // I REALLY WANT TO CALL THIS xTremes!

    var boundedLeftX = g.toDomXCoord(xExtremes[0]) - maxXPixelsToDraw;
    var boundedRightX = g.toDomXCoord(xExtremes[1]) + maxXPixelsToDraw;

    var boundedLeftDate = g.toDataXCoord(boundedLeftX);
    var boundedRightDate = g.toDataXCoord(boundedRightX);
    context.boundedDates = [boundedLeftDate, boundedRightDate];

    var boundedValues = [];
    var maxYPixelsToDraw = g.height_ * g.getNumericOption("panEdgeFraction");

    for (i = 0; i < g.axes_.length; i++) {
      axis = g.axes_[i];
      var yExtremes = axis.extremeRange;

      var boundedTopY = g.toDomYCoord(yExtremes[0], i) + maxYPixelsToDraw;
      var boundedBottomY = g.toDomYCoord(yExtremes[1], i) - maxYPixelsToDraw;

      var boundedTopValue = g.toDataYCoord(boundedTopY, i);
      var boundedBottomValue = g.toDataYCoord(boundedBottomY, i);

      boundedValues[i] = [boundedTopValue, boundedBottomValue];
    }
    context.boundedValues = boundedValues;
  }

  // Record the range of each y-axis at the start of the drag.
  // If any axis has a valueRange, then we want a 2D pan.
  // We can't store data directly in g.axes_, because it does not belong to us
  // and could change out from under us during a pan (say if there's a data
  // update).
  context.is2DPan = false;
  context.axes = [];
  for (i = 0; i < g.axes_.length; i++) {
    axis = g.axes_[i];
    var axis_data = {};
    var yRange = g.yAxisRange(i);
    // TODO(konigsberg): These values should be in |context|.
    // In log scale, initialTopValue, dragValueRange and unitsPerPixel are log scale.
    var logscale = g.attributes_.getForAxis("logscale", i);
    if (logscale) {
      axis_data.initialTopValue = utils.log10(yRange[1]);
      axis_data.dragValueRange = utils.log10(yRange[1]) - utils.log10(yRange[0]);
    } else {
      axis_data.initialTopValue = yRange[1];
      axis_data.dragValueRange = yRange[1] - yRange[0];
    }
    axis_data.unitsPerPixel = axis_data.dragValueRange / (g.plotter_.area.h - 1);
    context.axes.push(axis_data);

    // While calculating axes, set 2dpan.
    if (axis.valueRange) context.is2DPan = true;
  }
};

/**
 * Called in response to an interaction model operation that
 * responds to an event that pans the view.
 *
 * It's used in the default callback for "mousemove" operations.
 * Custom interaction model builders can use it to provide the default
 * panning behavior.
 *
 * @param {Event} event the event object which led to the movePan call.
 * @param {Dygraph} g The dygraph on which to act.
 * @param {Object} context The dragging context object (with
 *     dragStartX/dragStartY/etc. properties). This function modifies the
 *     context.
 */
DygraphInteraction.movePan = function (event, g, context) {
  context.dragEndX = utils.dragGetX_(event, context);
  context.dragEndY = utils.dragGetY_(event, context);

  var minDate = context.initialLeftmostDate - (context.dragEndX - context.dragStartX) * context.xUnitsPerPixel;
  if (context.boundedDates) {
    minDate = Math.max(minDate, context.boundedDates[0]);
  }
  var maxDate = minDate + context.dateRange;
  if (context.boundedDates) {
    if (maxDate > context.boundedDates[1]) {
      // Adjust minDate, and recompute maxDate.
      minDate = minDate - (maxDate - context.boundedDates[1]);
      maxDate = minDate + context.dateRange;
    }
  }

  if (g.getOptionForAxis("logscale", "x")) {
    g.dateWindow_ = [Math.pow(utils.LOG_SCALE, minDate), Math.pow(utils.LOG_SCALE, maxDate)];
  } else {
    g.dateWindow_ = [minDate, maxDate];
  }

  // y-axis scaling is automatic unless this is a full 2D pan.
  if (context.is2DPan) {

    var pixelsDragged = context.dragEndY - context.dragStartY;

    // Adjust each axis appropriately.
    for (var i = 0; i < g.axes_.length; i++) {
      var axis = g.axes_[i];
      var axis_data = context.axes[i];
      var unitsDragged = pixelsDragged * axis_data.unitsPerPixel;

      var boundedValue = context.boundedValues ? context.boundedValues[i] : null;

      // In log scale, maxValue and minValue are the logs of those values.
      var maxValue = axis_data.initialTopValue + unitsDragged;
      if (boundedValue) {
        maxValue = Math.min(maxValue, boundedValue[1]);
      }
      var minValue = maxValue - axis_data.dragValueRange;
      if (boundedValue) {
        if (minValue < boundedValue[0]) {
          // Adjust maxValue, and recompute minValue.
          maxValue = maxValue - (minValue - boundedValue[0]);
          minValue = maxValue - axis_data.dragValueRange;
        }
      }
      if (g.attributes_.getForAxis("logscale", i)) {
        axis.valueRange = [Math.pow(utils.LOG_SCALE, minValue), Math.pow(utils.LOG_SCALE, maxValue)];
      } else {
        axis.valueRange = [minValue, maxValue];
      }
    }
  }

  g.drawGraph_(false);
};

/**
 * Called in response to an interaction model operation that
 * responds to an event that ends panning.
 *
 * It's used in the default callback for "mouseup" operations.
 * Custom interaction model builders can use it to provide the default
 * panning behavior.
 *
 * @param {Event} event the event object which led to the endPan call.
 * @param {Dygraph} g The dygraph on which to act.
 * @param {Object} context The dragging context object (with
 *     dragStartX/dragStartY/etc. properties). This function modifies the
 *     context.
 */
DygraphInteraction.endPan = DygraphInteraction.maybeTreatMouseOpAsClick;

/**
 * Called in response to an interaction model operation that
 * responds to an event that starts zooming.
 *
 * It's used in the default callback for "mousedown" operations.
 * Custom interaction model builders can use it to provide the default
 * zooming behavior.
 *
 * @param {Event} event the event object which led to the startZoom call.
 * @param {Dygraph} g The dygraph on which to act.
 * @param {Object} context The dragging context object (with
 *     dragStartX/dragStartY/etc. properties). This function modifies the
 *     context.
 */
DygraphInteraction.startZoom = function (event, g, context) {
  context.isZooming = true;
  context.zoomMoved = false;
};

/**
 * Called in response to an interaction model operation that
 * responds to an event that defines zoom boundaries.
 *
 * It's used in the default callback for "mousemove" operations.
 * Custom interaction model builders can use it to provide the default
 * zooming behavior.
 *
 * @param {Event} event the event object which led to the moveZoom call.
 * @param {Dygraph} g The dygraph on which to act.
 * @param {Object} context The dragging context object (with
 *     dragStartX/dragStartY/etc. properties). This function modifies the
 *     context.
 */
DygraphInteraction.moveZoom = function (event, g, context) {
  context.zoomMoved = true;
  context.dragEndX = utils.dragGetX_(event, context);
  context.dragEndY = utils.dragGetY_(event, context);

  var xDelta = Math.abs(context.dragStartX - context.dragEndX);
  var yDelta = Math.abs(context.dragStartY - context.dragEndY);

  // drag direction threshold for y axis is twice as large as x axis
  context.dragDirection = xDelta < yDelta / 2 ? utils.VERTICAL : utils.HORIZONTAL;

  g.drawZoomRect_(context.dragDirection, context.dragStartX, context.dragEndX, context.dragStartY, context.dragEndY, context.prevDragDirection, context.prevEndX, context.prevEndY);

  context.prevEndX = context.dragEndX;
  context.prevEndY = context.dragEndY;
  context.prevDragDirection = context.dragDirection;
};

/**
 * TODO(danvk): move this logic into dygraph.js
 * @param {Dygraph} g
 * @param {Event} event
 * @param {Object} context
 */
DygraphInteraction.treatMouseOpAsClick = function (g, event, context) {
  var clickCallback = g.getFunctionOption('clickCallback');
  var pointClickCallback = g.getFunctionOption('pointClickCallback');

  var selectedPoint = null;

  // Find out if the click occurs on a point.
  var closestIdx = -1;
  var closestDistance = Number.MAX_VALUE;

  // check if the click was on a particular point.
  for (var i = 0; i < g.selPoints_.length; i++) {
    var p = g.selPoints_[i];
    var distance = Math.pow(p.canvasx - context.dragEndX, 2) + Math.pow(p.canvasy - context.dragEndY, 2);
    if (!isNaN(distance) && (closestIdx == -1 || distance < closestDistance)) {
      closestDistance = distance;
      closestIdx = i;
    }
  }

  // Allow any click within two pixels of the dot.
  var radius = g.getNumericOption('highlightCircleSize') + 2;
  if (closestDistance <= radius * radius) {
    selectedPoint = g.selPoints_[closestIdx];
  }

  if (selectedPoint) {
    var e = {
      cancelable: true,
      point: selectedPoint,
      canvasx: context.dragEndX,
      canvasy: context.dragEndY
    };
    var defaultPrevented = g.cascadeEvents_('pointClick', e);
    if (defaultPrevented) {
      // Note: this also prevents click / clickCallback from firing.
      return;
    }
    if (pointClickCallback) {
      pointClickCallback.call(g, event, selectedPoint);
    }
  }

  var e = {
    cancelable: true,
    xval: g.lastx_, // closest point by x value
    pts: g.selPoints_,
    canvasx: context.dragEndX,
    canvasy: context.dragEndY
  };
  if (!g.cascadeEvents_('click', e)) {
    if (clickCallback) {
      // TODO(danvk): pass along more info about the points, e.g. 'x'
      clickCallback.call(g, event, g.lastx_, g.selPoints_);
    }
  }
};

/**
 * Called in response to an interaction model operation that
 * responds to an event that performs a zoom based on previously defined
 * bounds..
 *
 * It's used in the default callback for "mouseup" operations.
 * Custom interaction model builders can use it to provide the default
 * zooming behavior.
 *
 * @param {Event} event the event object which led to the endZoom call.
 * @param {Dygraph} g The dygraph on which to end the zoom.
 * @param {Object} context The dragging context object (with
 *     dragStartX/dragStartY/etc. properties). This function modifies the
 *     context.
 */
DygraphInteraction.endZoom = function (event, g, context) {
  g.clearZoomRect_();
  context.isZooming = false;
  DygraphInteraction.maybeTreatMouseOpAsClick(event, g, context);

  // The zoom rectangle is visibly clipped to the plot area, so its behavior
  // should be as well.
  // See http://code.google.com/p/dygraphs/issues/detail?id=280
  var plotArea = g.getArea();
  if (context.regionWidth >= 10 && context.dragDirection == utils.HORIZONTAL) {
    var left = Math.min(context.dragStartX, context.dragEndX),
        right = Math.max(context.dragStartX, context.dragEndX);
    left = Math.max(left, plotArea.x);
    right = Math.min(right, plotArea.x + plotArea.w);
    if (left < right) {
      g.doZoomX_(left, right);
    }
    context.cancelNextDblclick = true;
  } else if (context.regionHeight >= 10 && context.dragDirection == utils.VERTICAL) {
    var top = Math.min(context.dragStartY, context.dragEndY),
        bottom = Math.max(context.dragStartY, context.dragEndY);
    top = Math.max(top, plotArea.y);
    bottom = Math.min(bottom, plotArea.y + plotArea.h);
    if (top < bottom) {
      g.doZoomY_(top, bottom);
    }
    context.cancelNextDblclick = true;
  }
  context.dragStartX = null;
  context.dragStartY = null;
};

/**
 * @private
 */
DygraphInteraction.startTouch = function (event, g, context) {
  event.preventDefault(); // touch browsers are all nice.
  if (event.touches.length > 1) {
    // If the user ever puts two fingers down, it's not a double tap.
    context.startTimeForDoubleTapMs = null;
  }

  var touches = [];
  for (var i = 0; i < event.touches.length; i++) {
    var t = event.touches[i];
    // we dispense with 'dragGetX_' because all touchBrowsers support pageX
    touches.push({
      pageX: t.pageX,
      pageY: t.pageY,
      dataX: g.toDataXCoord(t.pageX),
      dataY: g.toDataYCoord(t.pageY)
      // identifier: t.identifier
    });
  }
  context.initialTouches = touches;

  if (touches.length == 1) {
    // This is just a swipe.
    context.initialPinchCenter = touches[0];
    context.touchDirections = { x: true, y: true };
  } else if (touches.length >= 2) {
    // It's become a pinch!
    // In case there are 3+ touches, we ignore all but the "first" two.

    // only screen coordinates can be averaged (data coords could be log scale).
    context.initialPinchCenter = {
      pageX: 0.5 * (touches[0].pageX + touches[1].pageX),
      pageY: 0.5 * (touches[0].pageY + touches[1].pageY),

      // TODO(danvk): remove
      dataX: 0.5 * (touches[0].dataX + touches[1].dataX),
      dataY: 0.5 * (touches[0].dataY + touches[1].dataY)
    };

    // Make pinches in a 45-degree swath around either axis 1-dimensional zooms.
    var initialAngle = 180 / Math.PI * Math.atan2(context.initialPinchCenter.pageY - touches[0].pageY, touches[0].pageX - context.initialPinchCenter.pageX);

    // use symmetry to get it into the first quadrant.
    initialAngle = Math.abs(initialAngle);
    if (initialAngle > 90) initialAngle = 90 - initialAngle;

    context.touchDirections = {
      x: initialAngle < 90 - 45 / 2,
      y: initialAngle > 45 / 2
    };
  }

  // save the full x & y ranges.
  context.initialRange = {
    x: g.xAxisRange(),
    y: g.yAxisRange()
  };
};

/**
 * @private
 */
DygraphInteraction.moveTouch = function (event, g, context) {
  // If the tap moves, then it's definitely not part of a double-tap.
  context.startTimeForDoubleTapMs = null;

  var i,
      touches = [];
  for (i = 0; i < event.touches.length; i++) {
    var t = event.touches[i];
    touches.push({
      pageX: t.pageX,
      pageY: t.pageY
    });
  }
  var initialTouches = context.initialTouches;

  var c_now;

  // old and new centers.
  var c_init = context.initialPinchCenter;
  if (touches.length == 1) {
    c_now = touches[0];
  } else {
    c_now = {
      pageX: 0.5 * (touches[0].pageX + touches[1].pageX),
      pageY: 0.5 * (touches[0].pageY + touches[1].pageY)
    };
  }

  // this is the "swipe" component
  // we toss it out for now, but could use it in the future.
  var swipe = {
    pageX: c_now.pageX - c_init.pageX,
    pageY: c_now.pageY - c_init.pageY
  };
  var dataWidth = context.initialRange.x[1] - context.initialRange.x[0];
  var dataHeight = context.initialRange.y[0] - context.initialRange.y[1];
  swipe.dataX = swipe.pageX / g.plotter_.area.w * dataWidth;
  swipe.dataY = swipe.pageY / g.plotter_.area.h * dataHeight;
  var xScale, yScale;

  // The residual bits are usually split into scale & rotate bits, but we split
  // them into x-scale and y-scale bits.
  if (touches.length == 1) {
    xScale = 1.0;
    yScale = 1.0;
  } else if (touches.length >= 2) {
    var initHalfWidth = initialTouches[1].pageX - c_init.pageX;
    xScale = (touches[1].pageX - c_now.pageX) / initHalfWidth;

    var initHalfHeight = initialTouches[1].pageY - c_init.pageY;
    yScale = (touches[1].pageY - c_now.pageY) / initHalfHeight;
  }

  // Clip scaling to [1/8, 8] to prevent too much blowup.
  xScale = Math.min(8, Math.max(0.125, xScale));
  yScale = Math.min(8, Math.max(0.125, yScale));

  var didZoom = false;
  if (context.touchDirections.x) {
    g.dateWindow_ = [c_init.dataX - swipe.dataX + (context.initialRange.x[0] - c_init.dataX) / xScale, c_init.dataX - swipe.dataX + (context.initialRange.x[1] - c_init.dataX) / xScale];
    didZoom = true;
  }

  if (context.touchDirections.y) {
    for (i = 0; i < 1 /*g.axes_.length*/; i++) {
      var axis = g.axes_[i];
      var logscale = g.attributes_.getForAxis("logscale", i);
      if (logscale) {
        // TODO(danvk): implement
      } else {
          axis.valueRange = [c_init.dataY - swipe.dataY + (context.initialRange.y[0] - c_init.dataY) / yScale, c_init.dataY - swipe.dataY + (context.initialRange.y[1] - c_init.dataY) / yScale];
          didZoom = true;
        }
    }
  }

  g.drawGraph_(false);

  // We only call zoomCallback on zooms, not pans, to mirror desktop behavior.
  if (didZoom && touches.length > 1 && g.getFunctionOption('zoomCallback')) {
    var viewWindow = g.xAxisRange();
    g.getFunctionOption("zoomCallback").call(g, viewWindow[0], viewWindow[1], g.yAxisRanges());
  }
};

/**
 * @private
 */
DygraphInteraction.endTouch = function (event, g, context) {
  if (event.touches.length !== 0) {
    // this is effectively a "reset"
    DygraphInteraction.startTouch(event, g, context);
  } else if (event.changedTouches.length == 1) {
    // Could be part of a "double tap"
    // The heuristic here is that it's a double-tap if the two touchend events
    // occur within 500ms and within a 50x50 pixel box.
    var now = new Date().getTime();
    var t = event.changedTouches[0];
    if (context.startTimeForDoubleTapMs && now - context.startTimeForDoubleTapMs < 500 && context.doubleTapX && Math.abs(context.doubleTapX - t.screenX) < 50 && context.doubleTapY && Math.abs(context.doubleTapY - t.screenY) < 50) {
      g.resetZoom();
    } else {
      context.startTimeForDoubleTapMs = now;
      context.doubleTapX = t.screenX;
      context.doubleTapY = t.screenY;
    }
  }
};

// Determine the distance from x to [left, right].
var distanceFromInterval = function distanceFromInterval(x, left, right) {
  if (x < left) {
    return left - x;
  } else if (x > right) {
    return x - right;
  } else {
    return 0;
  }
};

/**
 * Returns the number of pixels by which the event happens from the nearest
 * edge of the chart. For events in the interior of the chart, this returns zero.
 */
var distanceFromChart = function distanceFromChart(event, g) {
  var chartPos = utils.findPos(g.canvas_);
  var box = {
    left: chartPos.x,
    right: chartPos.x + g.canvas_.offsetWidth,
    top: chartPos.y,
    bottom: chartPos.y + g.canvas_.offsetHeight
  };

  var pt = {
    x: utils.pageX(event),
    y: utils.pageY(event)
  };

  var dx = distanceFromInterval(pt.x, box.left, box.right),
      dy = distanceFromInterval(pt.y, box.top, box.bottom);
  return Math.max(dx, dy);
};

/**
 * Default interation model for dygraphs. You can refer to specific elements of
 * this when constructing your own interaction model, e.g.:
 * g.updateOptions( {
 *   interactionModel: {
 *     mousedown: DygraphInteraction.defaultInteractionModel.mousedown
 *   }
 * } );
 */
DygraphInteraction.defaultModel = {
  // Track the beginning of drag events
  mousedown: function mousedown(event, g, context) {
    // Right-click should not initiate a zoom.
    if (event.button && event.button == 2) return;

    context.initializeMouseDown(event, g, context);

    if (event.altKey || event.shiftKey) {
      DygraphInteraction.startPan(event, g, context);
    } else {
      DygraphInteraction.startZoom(event, g, context);
    }

    // Note: we register mousemove/mouseup on document to allow some leeway for
    // events to move outside of the chart. Interaction model events get
    // registered on the canvas, which is too small to allow this.
    var mousemove = function mousemove(event) {
      if (context.isZooming) {
        // When the mouse moves >200px from the chart edge, cancel the zoom.
        var d = distanceFromChart(event, g);
        if (d < DRAG_EDGE_MARGIN) {
          DygraphInteraction.moveZoom(event, g, context);
        } else {
          if (context.dragEndX !== null) {
            context.dragEndX = null;
            context.dragEndY = null;
            g.clearZoomRect_();
          }
        }
      } else if (context.isPanning) {
        DygraphInteraction.movePan(event, g, context);
      }
    };
    var mouseup = function mouseup(event) {
      if (context.isZooming) {
        if (context.dragEndX !== null) {
          DygraphInteraction.endZoom(event, g, context);
        } else {
          DygraphInteraction.maybeTreatMouseOpAsClick(event, g, context);
        }
      } else if (context.isPanning) {
        DygraphInteraction.endPan(event, g, context);
      }

      utils.removeEvent(document, 'mousemove', mousemove);
      utils.removeEvent(document, 'mouseup', mouseup);
      context.destroy();
    };

    g.addAndTrackEvent(document, 'mousemove', mousemove);
    g.addAndTrackEvent(document, 'mouseup', mouseup);
  },
  willDestroyContextMyself: true,

  touchstart: function touchstart(event, g, context) {
    DygraphInteraction.startTouch(event, g, context);
  },
  touchmove: function touchmove(event, g, context) {
    DygraphInteraction.moveTouch(event, g, context);
  },
  touchend: function touchend(event, g, context) {
    DygraphInteraction.endTouch(event, g, context);
  },

  // Disable zooming out if panning.
  dblclick: function dblclick(event, g, context) {
    if (context.cancelNextDblclick) {
      context.cancelNextDblclick = false;
      return;
    }

    // Give plugins a chance to grab this event.
    var e = {
      canvasx: context.dragEndX,
      canvasy: context.dragEndY,
      cancelable: true
    };
    if (g.cascadeEvents_('dblclick', e)) {
      return;
    }

    if (event.altKey || event.shiftKey) {
      return;
    }
    g.resetZoom();
  }
};

/*
Dygraph.DEFAULT_ATTRS.interactionModel = DygraphInteraction.defaultModel;

// old ways of accessing these methods/properties
Dygraph.defaultInteractionModel = DygraphInteraction.defaultModel;
Dygraph.endZoom = DygraphInteraction.endZoom;
Dygraph.moveZoom = DygraphInteraction.moveZoom;
Dygraph.startZoom = DygraphInteraction.startZoom;
Dygraph.endPan = DygraphInteraction.endPan;
Dygraph.movePan = DygraphInteraction.movePan;
Dygraph.startPan = DygraphInteraction.startPan;
*/

DygraphInteraction.nonInteractiveModel_ = {
  mousedown: function mousedown(event, g, context) {
    context.initializeMouseDown(event, g, context);
  },
  mouseup: DygraphInteraction.maybeTreatMouseOpAsClick
};

// Default interaction model when using the range selector.
DygraphInteraction.dragIsPanInteractionModel = {
  mousedown: function mousedown(event, g, context) {
    context.initializeMouseDown(event, g, context);
    DygraphInteraction.startPan(event, g, context);
  },
  mousemove: function mousemove(event, g, context) {
    if (context.isPanning) {
      DygraphInteraction.movePan(event, g, context);
    }
  },
  mouseup: function mouseup(event, g, context) {
    if (context.isPanning) {
      DygraphInteraction.endPan(event, g, context);
    }
  }
};

exports["default"] = DygraphInteraction;
module.exports = exports["default"];

/***/ }),
/* 6 */
/*!******************************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/datahandler/datahandler.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2013 David Eberlein (david.eberlein@ch.sauter-bc.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview This file contains the managment of data handlers
 * @author David Eberlein (david.eberlein@ch.sauter-bc.com)
 *
 * The idea is to define a common, generic data format that works for all data
 * structures supported by dygraphs. To make this possible, the DataHandler
 * interface is introduced. This makes it possible, that dygraph itself can work
 * with the same logic for every data type independent of the actual format and
 * the DataHandler takes care of the data format specific jobs.
 * DataHandlers are implemented for all data types supported by Dygraphs and
 * return Dygraphs compliant formats.
 * By default the correct DataHandler is chosen based on the options set.
 * Optionally the user may use his own DataHandler (similar to the plugin
 * system).
 *
 *
 * The unified data format returend by each handler is defined as so:
 * series[n][point] = [x,y,(extras)]
 *
 * This format contains the common basis that is needed to draw a simple line
 * series extended by optional extras for more complex graphing types. It
 * contains a primitive x value as first array entry, a primitive y value as
 * second array entry and an optional extras object for additional data needed.
 *
 * x must always be a number.
 * y must always be a number, NaN of type number or null.
 * extras is optional and must be interpreted by the DataHandler. It may be of
 * any type.
 *
 * In practice this might look something like this:
 * default: [x, yVal]
 * errorBar / customBar: [x, yVal, [yTopVariance, yBottomVariance] ]
 *
 */
/*global Dygraph:false */
/*global DygraphLayout:false */



/**
 *
 * The data handler is responsible for all data specific operations. All of the
 * series data it receives and returns is always in the unified data format.
 * Initially the unified data is created by the extractSeries method
 * @constructor
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
var DygraphDataHandler = function DygraphDataHandler() {};

var handler = DygraphDataHandler;

/**
 * X-value array index constant for unified data samples.
 * @const
 * @type {number}
 */
handler.X = 0;

/**
 * Y-value array index constant for unified data samples.
 * @const
 * @type {number}
 */
handler.Y = 1;

/**
 * Extras-value array index constant for unified data samples.
 * @const
 * @type {number}
 */
handler.EXTRAS = 2;

/**
 * Extracts one series from the raw data (a 2D array) into an array of the
 * unified data format.
 * This is where undesirable points (i.e. negative values on log scales and
 * missing values through which we wish to connect lines) are dropped.
 * TODO(danvk): the "missing values" bit above doesn't seem right.
 *
 * @param {!Array.<Array>} rawData The raw data passed into dygraphs where
 *     rawData[i] = [x,ySeries1,...,ySeriesN].
 * @param {!number} seriesIndex Index of the series to extract. All other
 *     series should be ignored.
 * @param {!DygraphOptions} options Dygraph options.
 * @return {Array.<[!number,?number,?]>} The series in the unified data format
 *     where series[i] = [x,y,{extras}].
 */
handler.prototype.extractSeries = function (rawData, seriesIndex, options) {};

/**
 * Converts a series to a Point array.  The resulting point array must be
 * returned in increasing order of idx property.
 *
 * @param {!Array.<[!number,?number,?]>} series The series in the unified
 *          data format where series[i] = [x,y,{extras}].
 * @param {!string} setName Name of the series.
 * @param {!number} boundaryIdStart Index offset of the first point, equal to the
 *          number of skipped points left of the date window minimum (if any).
 * @return {!Array.<Dygraph.PointType>} List of points for this series.
 */
handler.prototype.seriesToPoints = function (series, setName, boundaryIdStart) {
  // TODO(bhs): these loops are a hot-spot for high-point-count charts. In
  // fact,
  // on chrome+linux, they are 6 times more expensive than iterating through
  // the
  // points and drawing the lines. The brunt of the cost comes from allocating
  // the |point| structures.
  var points = [];
  for (var i = 0; i < series.length; ++i) {
    var item = series[i];
    var yraw = item[1];
    var yval = yraw === null ? null : handler.parseFloat(yraw);
    var point = {
      x: NaN,
      y: NaN,
      xval: handler.parseFloat(item[0]),
      yval: yval,
      name: setName, // TODO(danvk): is this really necessary?
      idx: i + boundaryIdStart
    };
    points.push(point);
  }
  this.onPointsCreated_(series, points);
  return points;
};

/**
 * Callback called for each series after the series points have been generated
 * which will later be used by the plotters to draw the graph.
 * Here data may be added to the seriesPoints which is needed by the plotters.
 * The indexes of series and points are in sync meaning the original data
 * sample for series[i] is points[i].
 *
 * @param {!Array.<[!number,?number,?]>} series The series in the unified
 *     data format where series[i] = [x,y,{extras}].
 * @param {!Array.<Dygraph.PointType>} points The corresponding points passed
 *     to the plotter.
 * @protected
 */
handler.prototype.onPointsCreated_ = function (series, points) {};

/**
 * Calculates the rolling average of a data set.
 *
 * @param {!Array.<[!number,?number,?]>} series The series in the unified
 *          data format where series[i] = [x,y,{extras}].
 * @param {!number} rollPeriod The number of points over which to average the data
 * @param {!DygraphOptions} options The dygraph options.
 * @return {!Array.<[!number,?number,?]>} the rolled series.
 */
handler.prototype.rollingAverage = function (series, rollPeriod, options) {};

/**
 * Computes the range of the data series (including confidence intervals).
 *
 * @param {!Array.<[!number,?number,?]>} series The series in the unified
 *     data format where series[i] = [x, y, {extras}].
 * @param {!Array.<number>} dateWindow The x-value range to display with
 *     the format: [min, max].
 * @param {!DygraphOptions} options The dygraph options.
 * @return {Array.<number>} The low and high extremes of the series in the
 *     given window with the format: [low, high].
 */
handler.prototype.getExtremeYValues = function (series, dateWindow, options) {};

/**
 * Callback called for each series after the layouting data has been
 * calculated before the series is drawn. Here normalized positioning data
 * should be calculated for the extras of each point.
 *
 * @param {!Array.<Dygraph.PointType>} points The points passed to
 *          the plotter.
 * @param {!Object} axis The axis on which the series will be plotted.
 * @param {!boolean} logscale Weather or not to use a logscale.
 */
handler.prototype.onLineEvaluated = function (points, axis, logscale) {};

/**
 * Optimized replacement for parseFloat, which was way too slow when almost
 * all values were type number, with few edge cases, none of which were strings.
 * @param {?number} val
 * @return {number}
 * @protected
 */
handler.parseFloat = function (val) {
  // parseFloat(null) is NaN
  if (val === null) {
    return NaN;
  }

  // Assume it's a number or NaN. If it's something else, I'll be shocked.
  return val;
};

exports["default"] = DygraphDataHandler;
module.exports = exports["default"];

/***/ }),
/* 7 */
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 8 */
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ 38);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 9 */
/*!*********************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/dygraph-layout.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2011 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview Based on PlotKitLayout, but modified to meet the needs of
 * dygraphs.
 */

/*global Dygraph:false */


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dygraphUtils = __webpack_require__(/*! ./dygraph-utils */ 0);

var utils = _interopRequireWildcard(_dygraphUtils);

/**
 * Creates a new DygraphLayout object.
 *
 * This class contains all the data to be charted.
 * It uses data coordinates, but also records the chart range (in data
 * coordinates) and hence is able to calculate percentage positions ('In this
 * view, Point A lies 25% down the x-axis.')
 *
 * Two things that it does not do are:
 * 1. Record pixel coordinates for anything.
 * 2. (oddly) determine anything about the layout of chart elements.
 *
 * The naming is a vestige of Dygraph's original PlotKit roots.
 *
 * @constructor
 */
var DygraphLayout = function DygraphLayout(dygraph) {
  this.dygraph_ = dygraph;
  /**
   * Array of points for each series.
   *
   * [series index][row index in series] = |Point| structure,
   * where series index refers to visible series only, and the
   * point index is for the reduced set of points for the current
   * zoom region (including one point just outside the window).
   * All points in the same row index share the same X value.
   *
   * @type {Array.<Array.<Dygraph.PointType>>}
   */
  this.points = [];
  this.setNames = [];
  this.annotations = [];
  this.yAxes_ = null;

  // TODO(danvk): it's odd that xTicks_ and yTicks_ are inputs, but xticks and
  // yticks are outputs. Clean this up.
  this.xTicks_ = null;
  this.yTicks_ = null;
};

/**
 * Add points for a single series.
 *
 * @param {string} setname Name of the series.
 * @param {Array.<Dygraph.PointType>} set_xy Points for the series.
 */
DygraphLayout.prototype.addDataset = function (setname, set_xy) {
  this.points.push(set_xy);
  this.setNames.push(setname);
};

/**
 * Returns the box which the chart should be drawn in. This is the canvas's
 * box, less space needed for the axis and chart labels.
 *
 * @return {{x: number, y: number, w: number, h: number}}
 */
DygraphLayout.prototype.getPlotArea = function () {
  return this.area_;
};

// Compute the box which the chart should be drawn in. This is the canvas's
// box, less space needed for axis, chart labels, and other plug-ins.
// NOTE: This should only be called by Dygraph.predraw_().
DygraphLayout.prototype.computePlotArea = function () {
  var area = {
    // TODO(danvk): per-axis setting.
    x: 0,
    y: 0
  };

  area.w = this.dygraph_.width_ - area.x - this.dygraph_.getOption('rightGap');
  area.h = this.dygraph_.height_;

  // Let plugins reserve space.
  var e = {
    chart_div: this.dygraph_.graphDiv,
    reserveSpaceLeft: function reserveSpaceLeft(px) {
      var r = {
        x: area.x,
        y: area.y,
        w: px,
        h: area.h
      };
      area.x += px;
      area.w -= px;
      return r;
    },
    reserveSpaceRight: function reserveSpaceRight(px) {
      var r = {
        x: area.x + area.w - px,
        y: area.y,
        w: px,
        h: area.h
      };
      area.w -= px;
      return r;
    },
    reserveSpaceTop: function reserveSpaceTop(px) {
      var r = {
        x: area.x,
        y: area.y,
        w: area.w,
        h: px
      };
      area.y += px;
      area.h -= px;
      return r;
    },
    reserveSpaceBottom: function reserveSpaceBottom(px) {
      var r = {
        x: area.x,
        y: area.y + area.h - px,
        w: area.w,
        h: px
      };
      area.h -= px;
      return r;
    },
    chartRect: function chartRect() {
      return { x: area.x, y: area.y, w: area.w, h: area.h };
    }
  };
  this.dygraph_.cascadeEvents_('layout', e);

  this.area_ = area;
};

DygraphLayout.prototype.setAnnotations = function (ann) {
  // The Dygraph object's annotations aren't parsed. We parse them here and
  // save a copy. If there is no parser, then the user must be using raw format.
  this.annotations = [];
  var parse = this.dygraph_.getOption('xValueParser') || function (x) {
    return x;
  };
  for (var i = 0; i < ann.length; i++) {
    var a = {};
    if (!ann[i].xval && ann[i].x === undefined) {
      console.error("Annotations must have an 'x' property");
      return;
    }
    if (ann[i].icon && !(ann[i].hasOwnProperty('width') && ann[i].hasOwnProperty('height'))) {
      console.error("Must set width and height when setting " + "annotation.icon property");
      return;
    }
    utils.update(a, ann[i]);
    if (!a.xval) a.xval = parse(a.x);
    this.annotations.push(a);
  }
};

DygraphLayout.prototype.setXTicks = function (xTicks) {
  this.xTicks_ = xTicks;
};

// TODO(danvk): add this to the Dygraph object's API or move it into Layout.
DygraphLayout.prototype.setYAxes = function (yAxes) {
  this.yAxes_ = yAxes;
};

DygraphLayout.prototype.evaluate = function () {
  this._xAxis = {};
  this._evaluateLimits();
  this._evaluateLineCharts();
  this._evaluateLineTicks();
  this._evaluateAnnotations();
};

DygraphLayout.prototype._evaluateLimits = function () {
  var xlimits = this.dygraph_.xAxisRange();
  this._xAxis.minval = xlimits[0];
  this._xAxis.maxval = xlimits[1];
  var xrange = xlimits[1] - xlimits[0];
  this._xAxis.scale = xrange !== 0 ? 1 / xrange : 1.0;

  if (this.dygraph_.getOptionForAxis("logscale", 'x')) {
    this._xAxis.xlogrange = utils.log10(this._xAxis.maxval) - utils.log10(this._xAxis.minval);
    this._xAxis.xlogscale = this._xAxis.xlogrange !== 0 ? 1.0 / this._xAxis.xlogrange : 1.0;
  }
  for (var i = 0; i < this.yAxes_.length; i++) {
    var axis = this.yAxes_[i];
    axis.minyval = axis.computedValueRange[0];
    axis.maxyval = axis.computedValueRange[1];
    axis.yrange = axis.maxyval - axis.minyval;
    axis.yscale = axis.yrange !== 0 ? 1.0 / axis.yrange : 1.0;

    if (this.dygraph_.getOption("logscale")) {
      axis.ylogrange = utils.log10(axis.maxyval) - utils.log10(axis.minyval);
      axis.ylogscale = axis.ylogrange !== 0 ? 1.0 / axis.ylogrange : 1.0;
      if (!isFinite(axis.ylogrange) || isNaN(axis.ylogrange)) {
        console.error('axis ' + i + ' of graph at ' + axis.g + ' can\'t be displayed in log scale for range [' + axis.minyval + ' - ' + axis.maxyval + ']');
      }
    }
  }
};

DygraphLayout.calcXNormal_ = function (value, xAxis, logscale) {
  if (logscale) {
    return (utils.log10(value) - utils.log10(xAxis.minval)) * xAxis.xlogscale;
  } else {
    return (value - xAxis.minval) * xAxis.scale;
  }
};

/**
 * @param {DygraphAxisType} axis
 * @param {number} value
 * @param {boolean} logscale
 * @return {number}
 */
DygraphLayout.calcYNormal_ = function (axis, value, logscale) {
  if (logscale) {
    var x = 1.0 - (utils.log10(value) - utils.log10(axis.minyval)) * axis.ylogscale;
    return isFinite(x) ? x : NaN; // shim for v8 issue; see pull request 276
  } else {
      return 1.0 - (value - axis.minyval) * axis.yscale;
    }
};

DygraphLayout.prototype._evaluateLineCharts = function () {
  var isStacked = this.dygraph_.getOption("stackedGraph");
  var isLogscaleForX = this.dygraph_.getOptionForAxis("logscale", 'x');

  for (var setIdx = 0; setIdx < this.points.length; setIdx++) {
    var points = this.points[setIdx];
    var setName = this.setNames[setIdx];
    var connectSeparated = this.dygraph_.getOption('connectSeparatedPoints', setName);
    var axis = this.dygraph_.axisPropertiesForSeries(setName);
    // TODO (konigsberg): use optionsForAxis instead.
    var logscale = this.dygraph_.attributes_.getForSeries("logscale", setName);

    for (var j = 0; j < points.length; j++) {
      var point = points[j];

      // Range from 0-1 where 0 represents left and 1 represents right.
      point.x = DygraphLayout.calcXNormal_(point.xval, this._xAxis, isLogscaleForX);
      // Range from 0-1 where 0 represents top and 1 represents bottom
      var yval = point.yval;
      if (isStacked) {
        point.y_stacked = DygraphLayout.calcYNormal_(axis, point.yval_stacked, logscale);
        if (yval !== null && !isNaN(yval)) {
          yval = point.yval_stacked;
        }
      }
      if (yval === null) {
        yval = NaN;
        if (!connectSeparated) {
          point.yval = NaN;
        }
      }
      point.y = DygraphLayout.calcYNormal_(axis, yval, logscale);
    }

    this.dygraph_.dataHandler_.onLineEvaluated(points, axis, logscale);
  }
};

DygraphLayout.prototype._evaluateLineTicks = function () {
  var i, tick, label, pos, v, has_tick;
  this.xticks = [];
  for (i = 0; i < this.xTicks_.length; i++) {
    tick = this.xTicks_[i];
    label = tick.label;
    has_tick = !('label_v' in tick);
    v = has_tick ? tick.v : tick.label_v;
    pos = this.dygraph_.toPercentXCoord(v);
    if (pos >= 0.0 && pos < 1.0) {
      this.xticks.push({ pos: pos, label: label, has_tick: has_tick });
    }
  }

  this.yticks = [];
  for (i = 0; i < this.yAxes_.length; i++) {
    var axis = this.yAxes_[i];
    for (var j = 0; j < axis.ticks.length; j++) {
      tick = axis.ticks[j];
      label = tick.label;
      has_tick = !('label_v' in tick);
      v = has_tick ? tick.v : tick.label_v;
      pos = this.dygraph_.toPercentYCoord(v, i);
      if (pos > 0.0 && pos <= 1.0) {
        this.yticks.push({ axis: i, pos: pos, label: label, has_tick: has_tick });
      }
    }
  }
};

DygraphLayout.prototype._evaluateAnnotations = function () {
  // Add the annotations to the point to which they belong.
  // Make a map from (setName, xval) to annotation for quick lookups.
  var i;
  var annotations = {};
  for (i = 0; i < this.annotations.length; i++) {
    var a = this.annotations[i];
    annotations[a.xval + "," + a.series] = a;
  }

  this.annotated_points = [];

  // Exit the function early if there are no annotations.
  if (!this.annotations || !this.annotations.length) {
    return;
  }

  // TODO(antrob): loop through annotations not points.
  for (var setIdx = 0; setIdx < this.points.length; setIdx++) {
    var points = this.points[setIdx];
    for (i = 0; i < points.length; i++) {
      var p = points[i];
      var k = p.xval + "," + p.name;
      if (k in annotations) {
        p.annotation = annotations[k];
        this.annotated_points.push(p);
      }
    }
  }
};

/**
 * Convenience function to remove all the data sets from a graph
 */
DygraphLayout.prototype.removeAllDatasets = function () {
  delete this.points;
  delete this.setNames;
  delete this.setPointsLengths;
  delete this.setPointsOffsets;
  this.points = [];
  this.setNames = [];
  this.setPointsLengths = [];
  this.setPointsOffsets = [];
};

exports['default'] = DygraphLayout;
module.exports = exports['default'];

/***/ }),
/* 10 */
/*!*********************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/dygraph-canvas.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2006 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview Based on PlotKit.CanvasRenderer, but modified to meet the
 * needs of dygraphs.
 *
 * In particular, support for:
 * - grid overlays
 * - error bars
 * - dygraphs attribute system
 */

/**
 * The DygraphCanvasRenderer class does the actual rendering of the chart onto
 * a canvas. It's based on PlotKit.CanvasRenderer.
 * @param {Object} element The canvas to attach to
 * @param {Object} elementContext The 2d context of the canvas (injected so it
 * can be mocked for testing.)
 * @param {Layout} layout The DygraphLayout object for this graph.
 * @constructor
 */

/*global Dygraph:false */


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dygraphUtils = __webpack_require__(/*! ./dygraph-utils */ 0);

var utils = _interopRequireWildcard(_dygraphUtils);

var _dygraph = __webpack_require__(/*! ./dygraph */ 2);

var _dygraph2 = _interopRequireDefault(_dygraph);

/**
 * @constructor
 *
 * This gets called when there are "new points" to chart. This is generally the
 * case when the underlying data being charted has changed. It is _not_ called
 * in the common case that the user has zoomed or is panning the view.
 *
 * The chart canvas has already been created by the Dygraph object. The
 * renderer simply gets a drawing context.
 *
 * @param {Dygraph} dygraph The chart to which this renderer belongs.
 * @param {HTMLCanvasElement} element The &lt;canvas&gt; DOM element on which to draw.
 * @param {CanvasRenderingContext2D} elementContext The drawing context.
 * @param {DygraphLayout} layout The chart's DygraphLayout object.
 *
 * TODO(danvk): remove the elementContext property.
 */
var DygraphCanvasRenderer = function DygraphCanvasRenderer(dygraph, element, elementContext, layout) {
  this.dygraph_ = dygraph;

  this.layout = layout;
  this.element = element;
  this.elementContext = elementContext;

  this.height = dygraph.height_;
  this.width = dygraph.width_;

  // --- check whether everything is ok before we return
  if (!utils.isCanvasSupported(this.element)) {
    throw "Canvas is not supported.";
  }

  // internal state
  this.area = layout.getPlotArea();

  // Set up a clipping area for the canvas (and the interaction canvas).
  // This ensures that we don't overdraw.
  var ctx = this.dygraph_.canvas_ctx_;
  ctx.beginPath();
  ctx.rect(this.area.x, this.area.y, this.area.w, this.area.h);
  ctx.clip();

  ctx = this.dygraph_.hidden_ctx_;
  ctx.beginPath();
  ctx.rect(this.area.x, this.area.y, this.area.w, this.area.h);
  ctx.clip();
};

/**
 * Clears out all chart content and DOM elements.
 * This is called immediately before render() on every frame, including
 * during zooms and pans.
 * @private
 */
DygraphCanvasRenderer.prototype.clear = function () {
  this.elementContext.clearRect(0, 0, this.width, this.height);
};

/**
 * This method is responsible for drawing everything on the chart, including
 * lines, error bars, fills and axes.
 * It is called immediately after clear() on every frame, including during pans
 * and zooms.
 * @private
 */
DygraphCanvasRenderer.prototype.render = function () {
  // attaches point.canvas{x,y}
  this._updatePoints();

  // actually draws the chart.
  this._renderLineChart();
};

/**
 * Returns a predicate to be used with an iterator, which will
 * iterate over points appropriately, depending on whether
 * connectSeparatedPoints is true. When it's false, the predicate will
 * skip over points with missing yVals.
 */
DygraphCanvasRenderer._getIteratorPredicate = function (connectSeparatedPoints) {
  return connectSeparatedPoints ? DygraphCanvasRenderer._predicateThatSkipsEmptyPoints : null;
};

DygraphCanvasRenderer._predicateThatSkipsEmptyPoints = function (array, idx) {
  return array[idx].yval !== null;
};

/**
 * Draws a line with the styles passed in and calls all the drawPointCallbacks.
 * @param {Object} e The dictionary passed to the plotter function.
 * @private
 */
DygraphCanvasRenderer._drawStyledLine = function (e, color, strokeWidth, strokePattern, drawPoints, drawPointCallback, pointSize) {
  var g = e.dygraph;
  // TODO(konigsberg): Compute attributes outside this method call.
  var stepPlot = g.getBooleanOption("stepPlot", e.setName);

  if (!utils.isArrayLike(strokePattern)) {
    strokePattern = null;
  }

  var drawGapPoints = g.getBooleanOption('drawGapEdgePoints', e.setName);

  var points = e.points;
  var setName = e.setName;
  var iter = utils.createIterator(points, 0, points.length, DygraphCanvasRenderer._getIteratorPredicate(g.getBooleanOption("connectSeparatedPoints", setName)));

  var stroking = strokePattern && strokePattern.length >= 2;

  var ctx = e.drawingContext;
  ctx.save();
  if (stroking) {
    if (ctx.setLineDash) ctx.setLineDash(strokePattern);
  }

  var pointsOnLine = DygraphCanvasRenderer._drawSeries(e, iter, strokeWidth, pointSize, drawPoints, drawGapPoints, stepPlot, color);
  DygraphCanvasRenderer._drawPointsOnLine(e, pointsOnLine, drawPointCallback, color, pointSize);

  if (stroking) {
    if (ctx.setLineDash) ctx.setLineDash([]);
  }

  ctx.restore();
};

/**
 * This does the actual drawing of lines on the canvas, for just one series.
 * Returns a list of [canvasx, canvasy] pairs for points for which a
 * drawPointCallback should be fired.  These include isolated points, or all
 * points if drawPoints=true.
 * @param {Object} e The dictionary passed to the plotter function.
 * @private
 */
DygraphCanvasRenderer._drawSeries = function (e, iter, strokeWidth, pointSize, drawPoints, drawGapPoints, stepPlot, color) {

  var prevCanvasX = null;
  var prevCanvasY = null;
  var nextCanvasY = null;
  var isIsolated; // true if this point is isolated (no line segments)
  var point; // the point being processed in the while loop
  var pointsOnLine = []; // Array of [canvasx, canvasy] pairs.
  var first = true; // the first cycle through the while loop

  var ctx = e.drawingContext;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = strokeWidth;

  // NOTE: we break the iterator's encapsulation here for about a 25% speedup.
  var arr = iter.array_;
  var limit = iter.end_;
  var predicate = iter.predicate_;

  for (var i = iter.start_; i < limit; i++) {
    point = arr[i];
    if (predicate) {
      while (i < limit && !predicate(arr, i)) {
        i++;
      }
      if (i == limit) break;
      point = arr[i];
    }

    // FIXME: The 'canvasy != canvasy' test here catches NaN values but the test
    // doesn't catch Infinity values. Could change this to
    // !isFinite(point.canvasy), but I assume it avoids isNaN for performance?
    if (point.canvasy === null || point.canvasy != point.canvasy) {
      if (stepPlot && prevCanvasX !== null) {
        // Draw a horizontal line to the start of the missing data
        ctx.moveTo(prevCanvasX, prevCanvasY);
        ctx.lineTo(point.canvasx, prevCanvasY);
      }
      prevCanvasX = prevCanvasY = null;
    } else {
      isIsolated = false;
      if (drawGapPoints || prevCanvasX === null) {
        iter.nextIdx_ = i;
        iter.next();
        nextCanvasY = iter.hasNext ? iter.peek.canvasy : null;

        var isNextCanvasYNullOrNaN = nextCanvasY === null || nextCanvasY != nextCanvasY;
        isIsolated = prevCanvasX === null && isNextCanvasYNullOrNaN;
        if (drawGapPoints) {
          // Also consider a point to be "isolated" if it's adjacent to a
          // null point, excluding the graph edges.
          if (!first && prevCanvasX === null || iter.hasNext && isNextCanvasYNullOrNaN) {
            isIsolated = true;
          }
        }
      }

      if (prevCanvasX !== null) {
        if (strokeWidth) {
          if (stepPlot) {
            ctx.moveTo(prevCanvasX, prevCanvasY);
            ctx.lineTo(point.canvasx, prevCanvasY);
          }

          ctx.lineTo(point.canvasx, point.canvasy);
        }
      } else {
        ctx.moveTo(point.canvasx, point.canvasy);
      }
      if (drawPoints || isIsolated) {
        pointsOnLine.push([point.canvasx, point.canvasy, point.idx]);
      }
      prevCanvasX = point.canvasx;
      prevCanvasY = point.canvasy;
    }
    first = false;
  }
  ctx.stroke();
  return pointsOnLine;
};

/**
 * This fires the drawPointCallback functions, which draw dots on the points by
 * default. This gets used when the "drawPoints" option is set, or when there
 * are isolated points.
 * @param {Object} e The dictionary passed to the plotter function.
 * @private
 */
DygraphCanvasRenderer._drawPointsOnLine = function (e, pointsOnLine, drawPointCallback, color, pointSize) {
  var ctx = e.drawingContext;
  for (var idx = 0; idx < pointsOnLine.length; idx++) {
    var cb = pointsOnLine[idx];
    ctx.save();
    drawPointCallback.call(e.dygraph, e.dygraph, e.setName, ctx, cb[0], cb[1], color, pointSize, cb[2]);
    ctx.restore();
  }
};

/**
 * Attaches canvas coordinates to the points array.
 * @private
 */
DygraphCanvasRenderer.prototype._updatePoints = function () {
  // Update Points
  // TODO(danvk): here
  //
  // TODO(bhs): this loop is a hot-spot for high-point-count charts. These
  // transformations can be pushed into the canvas via linear transformation
  // matrices.
  // NOTE(danvk): this is trickier than it sounds at first. The transformation
  // needs to be done before the .moveTo() and .lineTo() calls, but must be
  // undone before the .stroke() call to ensure that the stroke width is
  // unaffected.  An alternative is to reduce the stroke width in the
  // transformed coordinate space, but you can't specify different values for
  // each dimension (as you can with .scale()). The speedup here is ~12%.
  var sets = this.layout.points;
  for (var i = sets.length; i--;) {
    var points = sets[i];
    for (var j = points.length; j--;) {
      var point = points[j];
      point.canvasx = this.area.w * point.x + this.area.x;
      point.canvasy = this.area.h * point.y + this.area.y;
    }
  }
};

/**
 * Add canvas Actually draw the lines chart, including error bars.
 *
 * This function can only be called if DygraphLayout's points array has been
 * updated with canvas{x,y} attributes, i.e. by
 * DygraphCanvasRenderer._updatePoints.
 *
 * @param {string=} opt_seriesName when specified, only that series will
 *     be drawn. (This is used for expedited redrawing with highlightSeriesOpts)
 * @param {CanvasRenderingContext2D} opt_ctx when specified, the drawing
 *     context.  However, lines are typically drawn on the object's
 *     elementContext.
 * @private
 */
DygraphCanvasRenderer.prototype._renderLineChart = function (opt_seriesName, opt_ctx) {
  var ctx = opt_ctx || this.elementContext;
  var i;

  var sets = this.layout.points;
  var setNames = this.layout.setNames;
  var setName;

  this.colors = this.dygraph_.colorsMap_;

  // Determine which series have specialized plotters.
  var plotter_attr = this.dygraph_.getOption("plotter");
  var plotters = plotter_attr;
  if (!utils.isArrayLike(plotters)) {
    plotters = [plotters];
  }

  var setPlotters = {}; // series name -> plotter fn.
  for (i = 0; i < setNames.length; i++) {
    setName = setNames[i];
    var setPlotter = this.dygraph_.getOption("plotter", setName);
    if (setPlotter == plotter_attr) continue; // not specialized.

    setPlotters[setName] = setPlotter;
  }

  for (i = 0; i < plotters.length; i++) {
    var plotter = plotters[i];
    var is_last = i == plotters.length - 1;

    for (var j = 0; j < sets.length; j++) {
      setName = setNames[j];
      if (opt_seriesName && setName != opt_seriesName) continue;

      var points = sets[j];

      // Only throw in the specialized plotters on the last iteration.
      var p = plotter;
      if (setName in setPlotters) {
        if (is_last) {
          p = setPlotters[setName];
        } else {
          // Don't use the standard plotters in this case.
          continue;
        }
      }

      var color = this.colors[setName];
      var strokeWidth = this.dygraph_.getOption("strokeWidth", setName);

      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;
      p({
        points: points,
        setName: setName,
        drawingContext: ctx,
        color: color,
        strokeWidth: strokeWidth,
        dygraph: this.dygraph_,
        axis: this.dygraph_.axisPropertiesForSeries(setName),
        plotArea: this.area,
        seriesIndex: j,
        seriesCount: sets.length,
        singleSeriesName: opt_seriesName,
        allSeriesPoints: sets
      });
      ctx.restore();
    }
  }
};

/**
 * Standard plotters. These may be used by clients via Dygraph.Plotters.
 * See comments there for more details.
 */
DygraphCanvasRenderer._Plotters = {
  linePlotter: function linePlotter(e) {
    DygraphCanvasRenderer._linePlotter(e);
  },

  fillPlotter: function fillPlotter(e) {
    DygraphCanvasRenderer._fillPlotter(e);
  },

  errorPlotter: function errorPlotter(e) {
    DygraphCanvasRenderer._errorPlotter(e);
  }
};

/**
 * Plotter which draws the central lines for a series.
 * @private
 */
DygraphCanvasRenderer._linePlotter = function (e) {
  var g = e.dygraph;
  var setName = e.setName;
  var strokeWidth = e.strokeWidth;

  // TODO(danvk): Check if there's any performance impact of just calling
  // getOption() inside of _drawStyledLine. Passing in so many parameters makes
  // this code a bit nasty.
  var borderWidth = g.getNumericOption("strokeBorderWidth", setName);
  var drawPointCallback = g.getOption("drawPointCallback", setName) || utils.Circles.DEFAULT;
  var strokePattern = g.getOption("strokePattern", setName);
  var drawPoints = g.getBooleanOption("drawPoints", setName);
  var pointSize = g.getNumericOption("pointSize", setName);

  if (borderWidth && strokeWidth) {
    DygraphCanvasRenderer._drawStyledLine(e, g.getOption("strokeBorderColor", setName), strokeWidth + 2 * borderWidth, strokePattern, drawPoints, drawPointCallback, pointSize);
  }

  DygraphCanvasRenderer._drawStyledLine(e, e.color, strokeWidth, strokePattern, drawPoints, drawPointCallback, pointSize);
};

/**
 * Draws the shaded error bars/confidence intervals for each series.
 * This happens before the center lines are drawn, since the center lines
 * need to be drawn on top of the error bars for all series.
 * @private
 */
DygraphCanvasRenderer._errorPlotter = function (e) {
  var g = e.dygraph;
  var setName = e.setName;
  var errorBars = g.getBooleanOption("errorBars") || g.getBooleanOption("customBars");
  if (!errorBars) return;

  var fillGraph = g.getBooleanOption("fillGraph", setName);
  if (fillGraph) {
    console.warn("Can't use fillGraph option with error bars");
  }

  var ctx = e.drawingContext;
  var color = e.color;
  var fillAlpha = g.getNumericOption('fillAlpha', setName);
  var stepPlot = g.getBooleanOption("stepPlot", setName);
  var points = e.points;

  var iter = utils.createIterator(points, 0, points.length, DygraphCanvasRenderer._getIteratorPredicate(g.getBooleanOption("connectSeparatedPoints", setName)));

  var newYs;

  // setup graphics context
  var prevX = NaN;
  var prevY = NaN;
  var prevYs = [-1, -1];
  // should be same color as the lines but only 15% opaque.
  var rgb = utils.toRGB_(color);
  var err_color = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + fillAlpha + ')';
  ctx.fillStyle = err_color;
  ctx.beginPath();

  var isNullUndefinedOrNaN = function isNullUndefinedOrNaN(x) {
    return x === null || x === undefined || isNaN(x);
  };

  while (iter.hasNext) {
    var point = iter.next();
    if (!stepPlot && isNullUndefinedOrNaN(point.y) || stepPlot && !isNaN(prevY) && isNullUndefinedOrNaN(prevY)) {
      prevX = NaN;
      continue;
    }

    newYs = [point.y_bottom, point.y_top];
    if (stepPlot) {
      prevY = point.y;
    }

    // The documentation specifically disallows nulls inside the point arrays,
    // but in case it happens we should do something sensible.
    if (isNaN(newYs[0])) newYs[0] = point.y;
    if (isNaN(newYs[1])) newYs[1] = point.y;

    newYs[0] = e.plotArea.h * newYs[0] + e.plotArea.y;
    newYs[1] = e.plotArea.h * newYs[1] + e.plotArea.y;
    if (!isNaN(prevX)) {
      if (stepPlot) {
        ctx.moveTo(prevX, prevYs[0]);
        ctx.lineTo(point.canvasx, prevYs[0]);
        ctx.lineTo(point.canvasx, prevYs[1]);
      } else {
        ctx.moveTo(prevX, prevYs[0]);
        ctx.lineTo(point.canvasx, newYs[0]);
        ctx.lineTo(point.canvasx, newYs[1]);
      }
      ctx.lineTo(prevX, prevYs[1]);
      ctx.closePath();
    }
    prevYs = newYs;
    prevX = point.canvasx;
  }
  ctx.fill();
};

/**
 * Proxy for CanvasRenderingContext2D which drops moveTo/lineTo calls which are
 * superfluous. It accumulates all movements which haven't changed the x-value
 * and only applies the two with the most extreme y-values.
 *
 * Calls to lineTo/moveTo must have non-decreasing x-values.
 */
DygraphCanvasRenderer._fastCanvasProxy = function (context) {
  var pendingActions = []; // array of [type, x, y] tuples
  var lastRoundedX = null;
  var lastFlushedX = null;

  var LINE_TO = 1,
      MOVE_TO = 2;

  var actionCount = 0; // number of moveTos and lineTos passed to context.

  // Drop superfluous motions
  // Assumes all pendingActions have the same (rounded) x-value.
  var compressActions = function compressActions(opt_losslessOnly) {
    if (pendingActions.length <= 1) return;

    // Lossless compression: drop inconsequential moveTos.
    for (var i = pendingActions.length - 1; i > 0; i--) {
      var action = pendingActions[i];
      if (action[0] == MOVE_TO) {
        var prevAction = pendingActions[i - 1];
        if (prevAction[1] == action[1] && prevAction[2] == action[2]) {
          pendingActions.splice(i, 1);
        }
      }
    }

    // Lossless compression: ... drop consecutive moveTos ...
    for (var i = 0; i < pendingActions.length - 1;) /* incremented internally */{
      var action = pendingActions[i];
      if (action[0] == MOVE_TO && pendingActions[i + 1][0] == MOVE_TO) {
        pendingActions.splice(i, 1);
      } else {
        i++;
      }
    }

    // Lossy compression: ... drop all but the extreme y-values ...
    if (pendingActions.length > 2 && !opt_losslessOnly) {
      // keep an initial moveTo, but drop all others.
      var startIdx = 0;
      if (pendingActions[0][0] == MOVE_TO) startIdx++;
      var minIdx = null,
          maxIdx = null;
      for (var i = startIdx; i < pendingActions.length; i++) {
        var action = pendingActions[i];
        if (action[0] != LINE_TO) continue;
        if (minIdx === null && maxIdx === null) {
          minIdx = i;
          maxIdx = i;
        } else {
          var y = action[2];
          if (y < pendingActions[minIdx][2]) {
            minIdx = i;
          } else if (y > pendingActions[maxIdx][2]) {
            maxIdx = i;
          }
        }
      }
      var minAction = pendingActions[minIdx],
          maxAction = pendingActions[maxIdx];
      pendingActions.splice(startIdx, pendingActions.length - startIdx);
      if (minIdx < maxIdx) {
        pendingActions.push(minAction);
        pendingActions.push(maxAction);
      } else if (minIdx > maxIdx) {
        pendingActions.push(maxAction);
        pendingActions.push(minAction);
      } else {
        pendingActions.push(minAction);
      }
    }
  };

  var flushActions = function flushActions(opt_noLossyCompression) {
    compressActions(opt_noLossyCompression);
    for (var i = 0, len = pendingActions.length; i < len; i++) {
      var action = pendingActions[i];
      if (action[0] == LINE_TO) {
        context.lineTo(action[1], action[2]);
      } else if (action[0] == MOVE_TO) {
        context.moveTo(action[1], action[2]);
      }
    }
    if (pendingActions.length) {
      lastFlushedX = pendingActions[pendingActions.length - 1][1];
    }
    actionCount += pendingActions.length;
    pendingActions = [];
  };

  var addAction = function addAction(action, x, y) {
    var rx = Math.round(x);
    if (lastRoundedX === null || rx != lastRoundedX) {
      // if there are large gaps on the x-axis, it's essential to keep the
      // first and last point as well.
      var hasGapOnLeft = lastRoundedX - lastFlushedX > 1,
          hasGapOnRight = rx - lastRoundedX > 1,
          hasGap = hasGapOnLeft || hasGapOnRight;
      flushActions(hasGap);
      lastRoundedX = rx;
    }
    pendingActions.push([action, x, y]);
  };

  return {
    moveTo: function moveTo(x, y) {
      addAction(MOVE_TO, x, y);
    },
    lineTo: function lineTo(x, y) {
      addAction(LINE_TO, x, y);
    },

    // for major operations like stroke/fill, we skip compression to ensure
    // that there are no artifacts at the right edge.
    stroke: function stroke() {
      flushActions(true);context.stroke();
    },
    fill: function fill() {
      flushActions(true);context.fill();
    },
    beginPath: function beginPath() {
      flushActions(true);context.beginPath();
    },
    closePath: function closePath() {
      flushActions(true);context.closePath();
    },

    _count: function _count() {
      return actionCount;
    }
  };
};

/**
 * Draws the shaded regions when "fillGraph" is set. Not to be confused with
 * error bars.
 *
 * For stacked charts, it's more convenient to handle all the series
 * simultaneously. So this plotter plots all the points on the first series
 * it's asked to draw, then ignores all the other series.
 *
 * @private
 */
DygraphCanvasRenderer._fillPlotter = function (e) {
  // Skip if we're drawing a single series for interactive highlight overlay.
  if (e.singleSeriesName) return;

  // We'll handle all the series at once, not one-by-one.
  if (e.seriesIndex !== 0) return;

  var g = e.dygraph;
  var setNames = g.getLabels().slice(1); // remove x-axis

  // getLabels() includes names for invisible series, which are not included in
  // allSeriesPoints. We remove those to make the two match.
  // TODO(danvk): provide a simpler way to get this information.
  for (var i = setNames.length; i >= 0; i--) {
    if (!g.visibility()[i]) setNames.splice(i, 1);
  }

  var anySeriesFilled = (function () {
    for (var i = 0; i < setNames.length; i++) {
      if (g.getBooleanOption("fillGraph", setNames[i])) return true;
    }
    return false;
  })();

  if (!anySeriesFilled) return;

  var area = e.plotArea;
  var sets = e.allSeriesPoints;
  var setCount = sets.length;

  var stackedGraph = g.getBooleanOption("stackedGraph");
  var colors = g.getColors();

  // For stacked graphs, track the baseline for filling.
  //
  // The filled areas below graph lines are trapezoids with two
  // vertical edges. The top edge is the line segment being drawn, and
  // the baseline is the bottom edge. Each baseline corresponds to the
  // top line segment from the previous stacked line. In the case of
  // step plots, the trapezoids are rectangles.
  var baseline = {};
  var currBaseline;
  var prevStepPlot; // for different line drawing modes (line/step) per series

  // Helper function to trace a line back along the baseline.
  var traceBackPath = function traceBackPath(ctx, baselineX, baselineY, pathBack) {
    ctx.lineTo(baselineX, baselineY);
    if (stackedGraph) {
      for (var i = pathBack.length - 1; i >= 0; i--) {
        var pt = pathBack[i];
        ctx.lineTo(pt[0], pt[1]);
      }
    }
  };

  // process sets in reverse order (needed for stacked graphs)
  for (var setIdx = setCount - 1; setIdx >= 0; setIdx--) {
    var ctx = e.drawingContext;
    var setName = setNames[setIdx];
    if (!g.getBooleanOption('fillGraph', setName)) continue;

    var fillAlpha = g.getNumericOption('fillAlpha', setName);
    var stepPlot = g.getBooleanOption('stepPlot', setName);
    var color = colors[setIdx];
    var axis = g.axisPropertiesForSeries(setName);
    var axisY = 1.0 + axis.minyval * axis.yscale;
    if (axisY < 0.0) axisY = 0.0;else if (axisY > 1.0) axisY = 1.0;
    axisY = area.h * axisY + area.y;

    var points = sets[setIdx];
    var iter = utils.createIterator(points, 0, points.length, DygraphCanvasRenderer._getIteratorPredicate(g.getBooleanOption("connectSeparatedPoints", setName)));

    // setup graphics context
    var prevX = NaN;
    var prevYs = [-1, -1];
    var newYs;
    // should be same color as the lines but only 15% opaque.
    var rgb = utils.toRGB_(color);
    var err_color = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + fillAlpha + ')';
    ctx.fillStyle = err_color;
    ctx.beginPath();
    var last_x,
        is_first = true;

    // If the point density is high enough, dropping segments on their way to
    // the canvas justifies the overhead of doing so.
    if (points.length > 2 * g.width_ || _dygraph2['default'].FORCE_FAST_PROXY) {
      ctx = DygraphCanvasRenderer._fastCanvasProxy(ctx);
    }

    // For filled charts, we draw points from left to right, then back along
    // the x-axis to complete a shape for filling.
    // For stacked plots, this "back path" is a more complex shape. This array
    // stores the [x, y] values needed to trace that shape.
    var pathBack = [];

    // TODO(danvk): there are a lot of options at play in this loop.
    //     The logic would be much clearer if some (e.g. stackGraph and
    //     stepPlot) were split off into separate sub-plotters.
    var point;
    while (iter.hasNext) {
      point = iter.next();
      if (!utils.isOK(point.y) && !stepPlot) {
        traceBackPath(ctx, prevX, prevYs[1], pathBack);
        pathBack = [];
        prevX = NaN;
        if (point.y_stacked !== null && !isNaN(point.y_stacked)) {
          baseline[point.canvasx] = area.h * point.y_stacked + area.y;
        }
        continue;
      }
      if (stackedGraph) {
        if (!is_first && last_x == point.xval) {
          continue;
        } else {
          is_first = false;
          last_x = point.xval;
        }

        currBaseline = baseline[point.canvasx];
        var lastY;
        if (currBaseline === undefined) {
          lastY = axisY;
        } else {
          if (prevStepPlot) {
            lastY = currBaseline[0];
          } else {
            lastY = currBaseline;
          }
        }
        newYs = [point.canvasy, lastY];

        if (stepPlot) {
          // Step plots must keep track of the top and bottom of
          // the baseline at each point.
          if (prevYs[0] === -1) {
            baseline[point.canvasx] = [point.canvasy, axisY];
          } else {
            baseline[point.canvasx] = [point.canvasy, prevYs[0]];
          }
        } else {
          baseline[point.canvasx] = point.canvasy;
        }
      } else {
        if (isNaN(point.canvasy) && stepPlot) {
          newYs = [area.y + area.h, axisY];
        } else {
          newYs = [point.canvasy, axisY];
        }
      }
      if (!isNaN(prevX)) {
        // Move to top fill point
        if (stepPlot) {
          ctx.lineTo(point.canvasx, prevYs[0]);
          ctx.lineTo(point.canvasx, newYs[0]);
        } else {
          ctx.lineTo(point.canvasx, newYs[0]);
        }

        // Record the baseline for the reverse path.
        if (stackedGraph) {
          pathBack.push([prevX, prevYs[1]]);
          if (prevStepPlot && currBaseline) {
            // Draw to the bottom of the baseline
            pathBack.push([point.canvasx, currBaseline[1]]);
          } else {
            pathBack.push([point.canvasx, newYs[1]]);
          }
        }
      } else {
        ctx.moveTo(point.canvasx, newYs[1]);
        ctx.lineTo(point.canvasx, newYs[0]);
      }
      prevYs = newYs;
      prevX = point.canvasx;
    }
    prevStepPlot = stepPlot;
    if (newYs && point) {
      traceBackPath(ctx, point.canvasx, newYs[1], pathBack);
      pathBack = [];
    }
    ctx.fill();
  }
};

exports['default'] = DygraphCanvasRenderer;
module.exports = exports['default'];

/***/ }),
/* 11 */
/*!****************************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/dygraph-default-attrs.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dygraphTickers = __webpack_require__(/*! ./dygraph-tickers */ 4);

var DygraphTickers = _interopRequireWildcard(_dygraphTickers);

var _dygraphInteractionModel = __webpack_require__(/*! ./dygraph-interaction-model */ 5);

var _dygraphInteractionModel2 = _interopRequireDefault(_dygraphInteractionModel);

var _dygraphCanvas = __webpack_require__(/*! ./dygraph-canvas */ 10);

var _dygraphCanvas2 = _interopRequireDefault(_dygraphCanvas);

var _dygraphUtils = __webpack_require__(/*! ./dygraph-utils */ 0);

var utils = _interopRequireWildcard(_dygraphUtils);

// Default attribute values.
var DEFAULT_ATTRS = {
  highlightCircleSize: 3,
  highlightSeriesOpts: null,
  highlightSeriesBackgroundAlpha: 0.5,
  highlightSeriesBackgroundColor: 'rgb(255, 255, 255)',

  labelsSeparateLines: false,
  labelsShowZeroValues: true,
  labelsKMB: false,
  labelsKMG2: false,
  showLabelsOnHighlight: true,

  digitsAfterDecimal: 2,
  maxNumberWidth: 6,
  sigFigs: null,

  strokeWidth: 1.0,
  strokeBorderWidth: 0,
  strokeBorderColor: "white",

  axisTickSize: 3,
  axisLabelFontSize: 14,
  rightGap: 5,

  showRoller: false,
  xValueParser: undefined,

  delimiter: ',',

  sigma: 2.0,
  errorBars: false,
  fractions: false,
  wilsonInterval: true, // only relevant if fractions is true
  customBars: false,
  fillGraph: false,
  fillAlpha: 0.15,
  connectSeparatedPoints: false,

  stackedGraph: false,
  stackedGraphNaNFill: 'all',
  hideOverlayOnMouseOut: true,

  legend: 'onmouseover',
  stepPlot: false,
  xRangePad: 0,
  yRangePad: null,
  drawAxesAtZero: false,

  // Sizes of the various chart labels.
  titleHeight: 28,
  xLabelHeight: 18,
  yLabelWidth: 18,

  axisLineColor: "black",
  axisLineWidth: 0.3,
  gridLineWidth: 0.3,
  axisLabelWidth: 50,
  gridLineColor: "rgb(128,128,128)",

  interactionModel: _dygraphInteractionModel2['default'].defaultModel,
  animatedZooms: false, // (for now)

  // Range selector options
  showRangeSelector: false,
  rangeSelectorHeight: 40,
  rangeSelectorPlotStrokeColor: "#808FAB",
  rangeSelectorPlotFillGradientColor: "white",
  rangeSelectorPlotFillColor: "#A7B1C4",
  rangeSelectorBackgroundStrokeColor: "gray",
  rangeSelectorBackgroundLineWidth: 1,
  rangeSelectorPlotLineWidth: 1.5,
  rangeSelectorForegroundStrokeColor: "black",
  rangeSelectorForegroundLineWidth: 1,
  rangeSelectorAlpha: 0.6,
  showInRangeSelector: null,

  // The ordering here ensures that central lines always appear above any
  // fill bars/error bars.
  plotter: [_dygraphCanvas2['default']._fillPlotter, _dygraphCanvas2['default']._errorPlotter, _dygraphCanvas2['default']._linePlotter],

  plugins: [],

  // per-axis options
  axes: {
    x: {
      pixelsPerLabel: 70,
      axisLabelWidth: 60,
      axisLabelFormatter: utils.dateAxisLabelFormatter,
      valueFormatter: utils.dateValueFormatter,
      drawGrid: true,
      drawAxis: true,
      independentTicks: true,
      ticker: DygraphTickers.dateTicker
    },
    y: {
      axisLabelWidth: 50,
      pixelsPerLabel: 30,
      valueFormatter: utils.numberValueFormatter,
      axisLabelFormatter: utils.numberAxisLabelFormatter,
      drawGrid: true,
      drawAxis: true,
      independentTicks: true,
      ticker: DygraphTickers.numericTicks
    },
    y2: {
      axisLabelWidth: 50,
      pixelsPerLabel: 30,
      valueFormatter: utils.numberValueFormatter,
      axisLabelFormatter: utils.numberAxisLabelFormatter,
      drawAxis: true, // only applies when there are two axes of data.
      drawGrid: false,
      independentTicks: false,
      ticker: DygraphTickers.numericTicks
    }
  }
};

exports['default'] = DEFAULT_ATTRS;
module.exports = exports['default'];

/***/ }),
/* 12 */
/*!********************************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/dygraph-options-reference.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * @license
 * Copyright 2011 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */



Object.defineProperty(exports, '__esModule', {
  value: true
});
var OPTIONS_REFERENCE = null;

// For "production" code, this gets removed by uglifyjs.
if (typeof process !== 'undefined') {
  if (process.env.NODE_ENV != 'production') {

    // NOTE: in addition to parsing as JS, this snippet is expected to be valid
    // JSON. This assumption cannot be checked in JS, but it will be checked when
    // documentation is generated by the generate-documentation.py script. For the
    // most part, this just means that you should always use double quotes.
    OPTIONS_REFERENCE = // <JSON>
    {
      "xValueParser": {
        "default": "parseFloat() or Date.parse()*",
        "labels": ["CSV parsing"],
        "type": "function(str) -> number",
        "description": "A function which parses x-values (i.e. the dependent series). Must return a number, even when the values are dates. In this case, millis since epoch are used. This is used primarily for parsing CSV data. *=Dygraphs is slightly more accepting in the dates which it will parse. See code for details."
      },
      "stackedGraph": {
        "default": "false",
        "labels": ["Data Line display"],
        "type": "boolean",
        "description": "If set, stack series on top of one another rather than drawing them independently. The first series specified in the input data will wind up on top of the chart and the last will be on bottom. NaN values are drawn as white areas without a line on top, see stackedGraphNaNFill for details."
      },
      "stackedGraphNaNFill": {
        "default": "all",
        "labels": ["Data Line display"],
        "type": "string",
        "description": "Controls handling of NaN values inside a stacked graph. NaN values are interpolated/extended for stacking purposes, but the actual point value remains NaN in the legend display. Valid option values are \"all\" (interpolate internally, repeat leftmost and rightmost value as needed), \"inside\" (interpolate internally only, use zero outside leftmost and rightmost value), and \"none\" (treat NaN as zero everywhere)."
      },
      "pointSize": {
        "default": "1",
        "labels": ["Data Line display"],
        "type": "integer",
        "description": "The size of the dot to draw on each point in pixels (see drawPoints). A dot is always drawn when a point is \"isolated\", i.e. there is a missing point on either side of it. This also controls the size of those dots."
      },
      "drawPoints": {
        "default": "false",
        "labels": ["Data Line display"],
        "type": "boolean",
        "description": "Draw a small dot at each point, in addition to a line going through the point. This makes the individual data points easier to see, but can increase visual clutter in the chart. The small dot can be replaced with a custom rendering by supplying a <a href='#drawPointCallback'>drawPointCallback</a>."
      },
      "drawGapEdgePoints": {
        "default": "false",
        "labels": ["Data Line display"],
        "type": "boolean",
        "description": "Draw points at the edges of gaps in the data. This improves visibility of small data segments or other data irregularities."
      },
      "drawPointCallback": {
        "default": "null",
        "labels": ["Data Line display"],
        "type": "function(g, seriesName, canvasContext, cx, cy, color, pointSize)",
        "parameters": [["g", "the reference graph"], ["seriesName", "the name of the series"], ["canvasContext", "the canvas to draw on"], ["cx", "center x coordinate"], ["cy", "center y coordinate"], ["color", "series color"], ["pointSize", "the radius of the image."], ["idx", "the row-index of the point in the data."]],
        "description": "Draw a custom item when drawPoints is enabled. Default is a small dot matching the series color. This method should constrain drawing to within pointSize pixels from (cx, cy).  Also see <a href='#drawHighlightPointCallback'>drawHighlightPointCallback</a>"
      },
      "height": {
        "default": "320",
        "labels": ["Overall display"],
        "type": "integer",
        "description": "Height, in pixels, of the chart. If the container div has been explicitly sized, this will be ignored."
      },
      "zoomCallback": {
        "default": "null",
        "labels": ["Callbacks"],
        "type": "function(minDate, maxDate, yRanges)",
        "parameters": [["minDate", "milliseconds since epoch"], ["maxDate", "milliseconds since epoch."], ["yRanges", "is an array of [bottom, top] pairs, one for each y-axis."]],
        "description": "A function to call when the zoom window is changed (either by zooming in or out). When animatedZooms is set, zoomCallback is called once at the end of the transition (it will not be called for intermediate frames)."
      },
      "pointClickCallback": {
        "snippet": "function(e, point){<br>&nbsp;&nbsp;alert(point);<br>}",
        "default": "null",
        "labels": ["Callbacks", "Interactive Elements"],
        "type": "function(e, point)",
        "parameters": [["e", "the event object for the click"], ["point", "the point that was clicked See <a href='#point_properties'>Point properties</a> for details"]],
        "description": "A function to call when a data point is clicked. and the point that was clicked."
      },
      "color": {
        "default": "(see description)",
        "labels": ["Data Series Colors"],
        "type": "string",
        "example": "red",
        "description": "A per-series color definition. Used in conjunction with, and overrides, the colors option."
      },
      "colors": {
        "default": "(see description)",
        "labels": ["Data Series Colors"],
        "type": "array<string>",
        "example": "['red', '#00FF00']",
        "description": "List of colors for the data series. These can be of the form \"#AABBCC\" or \"rgb(255,100,200)\" or \"yellow\", etc. If not specified, equally-spaced points around a color wheel are used. Overridden by the 'color' option."
      },
      "connectSeparatedPoints": {
        "default": "false",
        "labels": ["Data Line display"],
        "type": "boolean",
        "description": "Usually, when Dygraphs encounters a missing value in a data series, it interprets this as a gap and draws it as such. If, instead, the missing values represents an x-value for which only a different series has data, then you'll want to connect the dots by setting this to true. To explicitly include a gap with this option set, use a value of NaN."
      },
      "highlightCallback": {
        "default": "null",
        "labels": ["Callbacks"],
        "type": "function(event, x, points, row, seriesName)",
        "description": "When set, this callback gets called every time a new point is highlighted.",
        "parameters": [["event", "the JavaScript mousemove event"], ["x", "the x-coordinate of the highlighted points"], ["points", "an array of highlighted points: <code>[ {name: 'series', yval: y-value}, &hellip; ]</code>"], ["row", "integer index of the highlighted row in the data table, starting from 0"], ["seriesName", "name of the highlighted series, only present if highlightSeriesOpts is set."]]
      },
      "drawHighlightPointCallback": {
        "default": "null",
        "labels": ["Data Line display"],
        "type": "function(g, seriesName, canvasContext, cx, cy, color, pointSize)",
        "parameters": [["g", "the reference graph"], ["seriesName", "the name of the series"], ["canvasContext", "the canvas to draw on"], ["cx", "center x coordinate"], ["cy", "center y coordinate"], ["color", "series color"], ["pointSize", "the radius of the image."], ["idx", "the row-index of the point in the data."]],
        "description": "Draw a custom item when a point is highlighted.  Default is a small dot matching the series color. This method should constrain drawing to within pointSize pixels from (cx, cy) Also see <a href='#drawPointCallback'>drawPointCallback</a>"
      },
      "highlightSeriesOpts": {
        "default": "null",
        "labels": ["Interactive Elements"],
        "type": "Object",
        "description": "When set, the options from this object are applied to the timeseries closest to the mouse pointer for interactive highlighting. See also 'highlightCallback'. Example: highlightSeriesOpts: { strokeWidth: 3 }."
      },
      "highlightSeriesBackgroundAlpha": {
        "default": "0.5",
        "labels": ["Interactive Elements"],
        "type": "float",
        "description": "Fade the background while highlighting series. 1=fully visible background (disable fading), 0=hiddden background (show highlighted series only)."
      },
      "highlightSeriesBackgroundColor": {
        "default": "rgb(255, 255, 255)",
        "labels": ["Interactive Elements"],
        "type": "string",
        "description": "Sets the background color used to fade out the series in conjunction with 'highlightSeriesBackgroundAlpha'."
      },
      "includeZero": {
        "default": "false",
        "labels": ["Axis display"],
        "type": "boolean",
        "description": "Usually, dygraphs will use the range of the data plus some padding to set the range of the y-axis. If this option is set, the y-axis will always include zero, typically as the lowest value. This can be used to avoid exaggerating the variance in the data"
      },
      "rollPeriod": {
        "default": "1",
        "labels": ["Error Bars", "Rolling Averages"],
        "type": "integer &gt;= 1",
        "description": "Number of days over which to average data. Discussed extensively above."
      },
      "unhighlightCallback": {
        "default": "null",
        "labels": ["Callbacks"],
        "type": "function(event)",
        "parameters": [["event", "the mouse event"]],
        "description": "When set, this callback gets called every time the user stops highlighting any point by mousing out of the graph."
      },
      "axisTickSize": {
        "default": "3.0",
        "labels": ["Axis display"],
        "type": "number",
        "description": "The size of the line to display next to each tick mark on x- or y-axes."
      },
      "labelsSeparateLines": {
        "default": "false",
        "labels": ["Legend"],
        "type": "boolean",
        "description": "Put <code>&lt;br/&gt;</code> between lines in the label string. Often used in conjunction with <strong>labelsDiv</strong>."
      },
      "valueFormatter": {
        "default": "Depends on the type of your data.",
        "labels": ["Legend", "Value display/formatting"],
        "type": "function(num or millis, opts, seriesName, dygraph, row, col)",
        "description": "Function to provide a custom display format for the values displayed on mouseover. This does not affect the values that appear on tick marks next to the axes. To format those, see axisLabelFormatter. This is usually set on a <a href='per-axis.html'>per-axis</a> basis. .",
        "parameters": [["num_or_millis", "The value to be formatted. This is always a number. For date axes, it's millis since epoch. You can call new Date(millis) to get a Date object."], ["opts", "This is a function you can call to access various options (e.g. opts('labelsKMB')). It returns per-axis values for the option when available."], ["seriesName", "The name of the series from which the point came, e.g. 'X', 'Y', 'A', etc."], ["dygraph", "The dygraph object for which the formatting is being done"], ["row", "The row of the data from which this point comes. g.getValue(row, 0) will return the x-value for this point."], ["col", "The column of the data from which this point comes. g.getValue(row, col) will return the original y-value for this point. This can be used to get the full confidence interval for the point, or access un-rolled values for the point."]]
      },
      "annotationMouseOverHandler": {
        "default": "null",
        "labels": ["Annotations"],
        "type": "function(annotation, point, dygraph, event)",
        "description": "If provided, this function is called whenever the user mouses over an annotation."
      },
      "annotationMouseOutHandler": {
        "default": "null",
        "labels": ["Annotations"],
        "type": "function(annotation, point, dygraph, event)",
        "parameters": [["annotation", "the annotation left"], ["point", "the point associated with the annotation"], ["dygraph", "the reference graph"], ["event", "the mouse event"]],
        "description": "If provided, this function is called whenever the user mouses out of an annotation."
      },
      "annotationClickHandler": {
        "default": "null",
        "labels": ["Annotations"],
        "type": "function(annotation, point, dygraph, event)",
        "parameters": [["annotation", "the annotation left"], ["point", "the point associated with the annotation"], ["dygraph", "the reference graph"], ["event", "the mouse event"]],
        "description": "If provided, this function is called whenever the user clicks on an annotation."
      },
      "annotationDblClickHandler": {
        "default": "null",
        "labels": ["Annotations"],
        "type": "function(annotation, point, dygraph, event)",
        "parameters": [["annotation", "the annotation left"], ["point", "the point associated with the annotation"], ["dygraph", "the reference graph"], ["event", "the mouse event"]],
        "description": "If provided, this function is called whenever the user double-clicks on an annotation."
      },
      "drawCallback": {
        "default": "null",
        "labels": ["Callbacks"],
        "type": "function(dygraph, is_initial)",
        "parameters": [["dygraph", "The graph being drawn"], ["is_initial", "True if this is the initial draw, false for subsequent draws."]],
        "description": "When set, this callback gets called every time the dygraph is drawn. This includes the initial draw, after zooming and repeatedly while panning."
      },
      "labelsKMG2": {
        "default": "false",
        "labels": ["Value display/formatting"],
        "type": "boolean",
        "description": "Show k/M/G for kilo/Mega/Giga on y-axis. This is different than <code>labelsKMB</code> in that it uses base 2, not 10."
      },
      "delimiter": {
        "default": ",",
        "labels": ["CSV parsing"],
        "type": "string",
        "description": "The delimiter to look for when separating fields of a CSV file. Setting this to a tab is not usually necessary, since tab-delimited data is auto-detected."
      },
      "axisLabelFontSize": {
        "default": "14",
        "labels": ["Axis display"],
        "type": "integer",
        "description": "Size of the font (in pixels) to use in the axis labels, both x- and y-axis."
      },
      "underlayCallback": {
        "default": "null",
        "labels": ["Callbacks"],
        "type": "function(context, area, dygraph)",
        "parameters": [["context", "the canvas drawing context on which to draw"], ["area", "An object with {x,y,w,h} properties describing the drawing area."], ["dygraph", "the reference graph"]],
        "description": "When set, this callback gets called before the chart is drawn. It details on how to use this."
      },
      "width": {
        "default": "480",
        "labels": ["Overall display"],
        "type": "integer",
        "description": "Width, in pixels, of the chart. If the container div has been explicitly sized, this will be ignored."
      },
      "pixelRatio": {
        "default": "(devicePixelRatio / context.backingStoreRatio)",
        "labels": ["Overall display"],
        "type": "float",
        "description": "Overrides the pixel ratio scaling factor for the canvas's 2d context. Ordinarily, this is set to the devicePixelRatio / (context.backingStoreRatio || 1), so on mobile devices, where the devicePixelRatio can be somewhere around 3, performance can be improved by overriding this value to something less precise, like 1, at the expense of resolution."
      },
      "interactionModel": {
        "default": "...",
        "labels": ["Interactive Elements"],
        "type": "Object",
        "description": "TODO(konigsberg): document this"
      },
      "ticker": {
        "default": "Dygraph.dateTicker or Dygraph.numericTicks",
        "labels": ["Axis display"],
        "type": "function(min, max, pixels, opts, dygraph, vals) -> [{v: ..., label: ...}, ...]",
        "parameters": [["min", ""], ["max", ""], ["pixels", ""], ["opts", ""], ["dygraph", "the reference graph"], ["vals", ""]],
        "description": "This lets you specify an arbitrary function to generate tick marks on an axis. The tick marks are an array of (value, label) pairs. The built-in functions go to great lengths to choose good tick marks so, if you set this option, you'll most likely want to call one of them and modify the result. See dygraph-tickers.js for an extensive discussion. This is set on a <a href='per-axis.html'>per-axis</a> basis."
      },
      "xAxisHeight": {
        "default": "(null)",
        "labels": ["Axis display"],
        "type": "integer",
        "description": "Height, in pixels, of the x-axis. If not set explicitly, this is computed based on axisLabelFontSize and axisTickSize."
      },
      "showLabelsOnHighlight": {
        "default": "true",
        "labels": ["Interactive Elements", "Legend"],
        "type": "boolean",
        "description": "Whether to show the legend upon mouseover."
      },
      "axis": {
        "default": "(none)",
        "labels": ["Axis display"],
        "type": "string",
        "description": "Set to either 'y1' or 'y2' to assign a series to a y-axis (primary or secondary). Must be set per-series."
      },
      "pixelsPerLabel": {
        "default": "70 (x-axis) or 30 (y-axes)",
        "labels": ["Axis display", "Grid"],
        "type": "integer",
        "description": "Number of pixels to require between each x- and y-label. Larger values will yield a sparser axis with fewer ticks. This is set on a <a href='per-axis.html'>per-axis</a> basis."
      },
      "labelsDiv": {
        "default": "null",
        "labels": ["Legend"],
        "type": "DOM element or string",
        "example": "<code style='font-size: small'>document.getElementById('foo')</code>or<code>'foo'",
        "description": "Show data labels in an external div, rather than on the graph.  This value can either be a div element or a div id."
      },
      "fractions": {
        "default": "false",
        "labels": ["CSV parsing", "Error Bars"],
        "type": "boolean",
        "description": "When set, attempt to parse each cell in the CSV file as \"a/b\", where a and b are integers. The ratio will be plotted. This allows computation of Wilson confidence intervals (see below)."
      },
      "logscale": {
        "default": "false",
        "labels": ["Axis display"],
        "type": "boolean",
        "description": "When set for the y-axis or x-axis, the graph shows that axis in log scale. Any values less than or equal to zero are not displayed. Showing log scale with ranges that go below zero will result in an unviewable graph.\n\n Not compatible with showZero. connectSeparatedPoints is ignored. This is ignored for date-based x-axes."
      },
      "strokeWidth": {
        "default": "1.0",
        "labels": ["Data Line display"],
        "type": "float",
        "example": "0.5, 2.0",
        "description": "The width of the lines connecting data points. This can be used to increase the contrast or some graphs."
      },
      "strokePattern": {
        "default": "null",
        "labels": ["Data Line display"],
        "type": "array<integer>",
        "example": "[10, 2, 5, 2]",
        "description": "A custom pattern array where the even index is a draw and odd is a space in pixels. If null then it draws a solid line. The array should have a even length as any odd lengthed array could be expressed as a smaller even length array. This is used to create dashed lines."
      },
      "strokeBorderWidth": {
        "default": "null",
        "labels": ["Data Line display"],
        "type": "float",
        "example": "1.0",
        "description": "Draw a border around graph lines to make crossing lines more easily distinguishable. Useful for graphs with many lines."
      },
      "strokeBorderColor": {
        "default": "white",
        "labels": ["Data Line display"],
        "type": "string",
        "example": "red, #ccffdd",
        "description": "Color for the line border used if strokeBorderWidth is set."
      },
      "wilsonInterval": {
        "default": "true",
        "labels": ["Error Bars"],
        "type": "boolean",
        "description": "Use in conjunction with the \"fractions\" option. Instead of plotting +/- N standard deviations, dygraphs will compute a Wilson confidence interval and plot that. This has more reasonable behavior for ratios close to 0 or 1."
      },
      "fillGraph": {
        "default": "false",
        "labels": ["Data Line display"],
        "type": "boolean",
        "description": "Should the area underneath the graph be filled? This option is not compatible with error bars. This may be set on a <a href='per-axis.html'>per-series</a> basis."
      },
      "highlightCircleSize": {
        "default": "3",
        "labels": ["Interactive Elements"],
        "type": "integer",
        "description": "The size in pixels of the dot drawn over highlighted points."
      },
      "gridLineColor": {
        "default": "rgb(128,128,128)",
        "labels": ["Grid"],
        "type": "red, blue",
        "description": "The color of the gridlines. This may be set on a per-axis basis to define each axis' grid separately."
      },
      "gridLinePattern": {
        "default": "null",
        "labels": ["Grid"],
        "type": "array<integer>",
        "example": "[10, 2, 5, 2]",
        "description": "A custom pattern array where the even index is a draw and odd is a space in pixels. If null then it draws a solid line. The array should have a even length as any odd lengthed array could be expressed as a smaller even length array. This is used to create dashed gridlines."
      },
      "visibility": {
        "default": "[true, true, ...]",
        "labels": ["Data Line display"],
        "type": "Array of booleans",
        "description": "Which series should initially be visible? Once the Dygraph has been constructed, you can access and modify the visibility of each series using the <code>visibility</code> and <code>setVisibility</code> methods."
      },
      "valueRange": {
        "default": "Full range of the input is shown",
        "labels": ["Axis display"],
        "type": "Array of two numbers",
        "example": "[10, 110]",
        "description": "Explicitly set the vertical range of the graph to [low, high]. This may be set on a per-axis basis to define each y-axis separately. If either limit is unspecified, it will be calculated automatically (e.g. [null, 30] to automatically calculate just the lower bound)"
      },
      "colorSaturation": {
        "default": "1.0",
        "labels": ["Data Series Colors"],
        "type": "float (0.0 - 1.0)",
        "description": "If <strong>colors</strong> is not specified, saturation of the automatically-generated data series colors."
      },
      "hideOverlayOnMouseOut": {
        "default": "true",
        "labels": ["Interactive Elements", "Legend"],
        "type": "boolean",
        "description": "Whether to hide the legend when the mouse leaves the chart area."
      },
      "legend": {
        "default": "onmouseover",
        "labels": ["Legend"],
        "type": "string",
        "description": "When to display the legend. By default, it only appears when a user mouses over the chart. Set it to \"always\" to always display a legend of some sort. When set to \"follow\", legend follows highlighted points."
      },
      "legendFormatter": {
        "default": "null",
        "labels": ["Legend"],
        "type": "function(data): string",
        "params": [["data", "An object containing information about the selection (or lack of a selection). This includes formatted values and series information. See <a href=\"https://github.com/danvk/dygraphs/pull/683\">here</a> for sample values."]],
        "description": "Set this to supply a custom formatter for the legend. See <a href=\"https://github.com/danvk/dygraphs/pull/683\">this comment</a> and the <a href=\"tests/legend-formatter.html\">legendFormatter demo</a> for usage."
      },
      "labelsShowZeroValues": {
        "default": "true",
        "labels": ["Legend"],
        "type": "boolean",
        "description": "Show zero value labels in the labelsDiv."
      },
      "stepPlot": {
        "default": "false",
        "labels": ["Data Line display"],
        "type": "boolean",
        "description": "When set, display the graph as a step plot instead of a line plot. This option may either be set for the whole graph or for single series."
      },
      "labelsUTC": {
        "default": "false",
        "labels": ["Value display/formatting", "Axis display"],
        "type": "boolean",
        "description": "Show date/time labels according to UTC (instead of local time)."
      },
      "labelsKMB": {
        "default": "false",
        "labels": ["Value display/formatting"],
        "type": "boolean",
        "description": "Show K/M/B for thousands/millions/billions on y-axis."
      },
      "rightGap": {
        "default": "5",
        "labels": ["Overall display"],
        "type": "integer",
        "description": "Number of pixels to leave blank at the right edge of the Dygraph. This makes it easier to highlight the right-most data point."
      },
      "drawAxesAtZero": {
        "default": "false",
        "labels": ["Axis display"],
        "type": "boolean",
        "description": "When set, draw the X axis at the Y=0 position and the Y axis at the X=0 position if those positions are inside the graph's visible area. Otherwise, draw the axes at the bottom or left graph edge as usual."
      },
      "xRangePad": {
        "default": "0",
        "labels": ["Axis display"],
        "type": "float",
        "description": "Add the specified amount of extra space (in pixels) around the X-axis value range to ensure points at the edges remain visible."
      },
      "yRangePad": {
        "default": "null",
        "labels": ["Axis display"],
        "type": "float",
        "description": "If set, add the specified amount of extra space (in pixels) around the Y-axis value range to ensure points at the edges remain visible. If unset, use the traditional Y padding algorithm."
      },
      "axisLabelFormatter": {
        "default": "Depends on the data type",
        "labels": ["Axis display"],
        "type": "function(number or Date, granularity, opts, dygraph)",
        "parameters": [["number or date", "Either a number (for a numeric axis) or a Date object (for a date axis)"], ["granularity", "specifies how fine-grained the axis is. For date axes, this is a reference to the time granularity enumeration, defined in dygraph-tickers.js, e.g. Dygraph.WEEKLY."], ["opts", "a function which provides access to various options on the dygraph, e.g. opts('labelsKMB')."], ["dygraph", "the referenced graph"]],
        "description": "Function to call to format the tick values that appear along an axis. This is usually set on a <a href='per-axis.html'>per-axis</a> basis."
      },
      "clickCallback": {
        "snippet": "function(e, date_millis){<br>&nbsp;&nbsp;alert(new Date(date_millis));<br>}",
        "default": "null",
        "labels": ["Callbacks"],
        "type": "function(e, x, points)",
        "parameters": [["e", "The event object for the click"], ["x", "The x value that was clicked (for dates, this is milliseconds since epoch)"], ["points", "The closest points along that date. See <a href='#point_properties'>Point properties</a> for details."]],
        "description": "A function to call when the canvas is clicked."
      },
      "labels": {
        "default": "[\"X\", \"Y1\", \"Y2\", ...]*",
        "labels": ["Legend"],
        "type": "array<string>",
        "description": "A name for each data series, including the independent (X) series. For CSV files and DataTable objections, this is determined by context. For raw data, this must be specified. If it is not, default values are supplied and a warning is logged."
      },
      "dateWindow": {
        "default": "Full range of the input is shown",
        "labels": ["Axis display"],
        "type": "Array of two numbers",
        "example": "[<br>&nbsp;&nbsp;Date.parse('2006-01-01'),<br>&nbsp;&nbsp;(new Date()).valueOf()<br>]",
        "description": "Initially zoom in on a section of the graph. Is of the form [earliest, latest], where earliest/latest are milliseconds since epoch. If the data for the x-axis is numeric, the values in dateWindow must also be numbers."
      },
      "showRoller": {
        "default": "false",
        "labels": ["Interactive Elements", "Rolling Averages"],
        "type": "boolean",
        "description": "If the rolling average period text box should be shown."
      },
      "sigma": {
        "default": "2.0",
        "labels": ["Error Bars"],
        "type": "float",
        "description": "When errorBars is set, shade this many standard deviations above/below each point."
      },
      "customBars": {
        "default": "false",
        "labels": ["CSV parsing", "Error Bars"],
        "type": "boolean",
        "description": "When set, parse each CSV cell as \"low;middle;high\". Error bars will be drawn for each point between low and high, with the series itself going through middle."
      },
      "colorValue": {
        "default": "1.0",
        "labels": ["Data Series Colors"],
        "type": "float (0.0 - 1.0)",
        "description": "If colors is not specified, value of the data series colors, as in hue/saturation/value. (0.0-1.0, default 0.5)"
      },
      "errorBars": {
        "default": "false",
        "labels": ["CSV parsing", "Error Bars"],
        "type": "boolean",
        "description": "Does the data contain standard deviations? Setting this to true alters the input format (see above)."
      },
      "displayAnnotations": {
        "default": "false",
        "labels": ["Annotations"],
        "type": "boolean",
        "description": "Only applies when Dygraphs is used as a GViz chart. Causes string columns following a data series to be interpreted as annotations on points in that series. This is the same format used by Google's AnnotatedTimeLine chart."
      },
      "panEdgeFraction": {
        "default": "null",
        "labels": ["Axis display", "Interactive Elements"],
        "type": "float",
        "description": "A value representing the farthest a graph may be panned, in percent of the display. For example, a value of 0.1 means that the graph can only be panned 10% passed the edges of the displayed values. null means no bounds."
      },
      "title": {
        "labels": ["Chart labels"],
        "type": "string",
        "default": "null",
        "description": "Text to display above the chart. You can supply any HTML for this value, not just text. If you wish to style it using CSS, use the 'dygraph-label' or 'dygraph-title' classes."
      },
      "titleHeight": {
        "default": "18",
        "labels": ["Chart labels"],
        "type": "integer",
        "description": "Height of the chart title, in pixels. This also controls the default font size of the title. If you style the title on your own, this controls how much space is set aside above the chart for the title's div."
      },
      "xlabel": {
        "labels": ["Chart labels"],
        "type": "string",
        "default": "null",
        "description": "Text to display below the chart's x-axis. You can supply any HTML for this value, not just text. If you wish to style it using CSS, use the 'dygraph-label' or 'dygraph-xlabel' classes."
      },
      "xLabelHeight": {
        "labels": ["Chart labels"],
        "type": "integer",
        "default": "18",
        "description": "Height of the x-axis label, in pixels. This also controls the default font size of the x-axis label. If you style the label on your own, this controls how much space is set aside below the chart for the x-axis label's div."
      },
      "ylabel": {
        "labels": ["Chart labels"],
        "type": "string",
        "default": "null",
        "description": "Text to display to the left of the chart's y-axis. You can supply any HTML for this value, not just text. If you wish to style it using CSS, use the 'dygraph-label' or 'dygraph-ylabel' classes. The text will be rotated 90 degrees by default, so CSS rules may behave in unintuitive ways. No additional space is set aside for a y-axis label. If you need more space, increase the width of the y-axis tick labels using the yAxisLabelWidth option. If you need a wider div for the y-axis label, either style it that way with CSS (but remember that it's rotated, so width is controlled by the 'height' property) or set the yLabelWidth option."
      },
      "y2label": {
        "labels": ["Chart labels"],
        "type": "string",
        "default": "null",
        "description": "Text to display to the right of the chart's secondary y-axis. This label is only displayed if a secondary y-axis is present. See <a href='http://dygraphs.com/tests/two-axes.html'>this test</a> for an example of how to do this. The comments for the 'ylabel' option generally apply here as well. This label gets a 'dygraph-y2label' instead of a 'dygraph-ylabel' class."
      },
      "yLabelWidth": {
        "labels": ["Chart labels"],
        "type": "integer",
        "default": "18",
        "description": "Width of the div which contains the y-axis label. Since the y-axis label appears rotated 90 degrees, this actually affects the height of its div."
      },
      "drawGrid": {
        "default": "true for x and y, false for y2",
        "labels": ["Grid"],
        "type": "boolean",
        "description": "Whether to display gridlines in the chart. This may be set on a per-axis basis to define the visibility of each axis' grid separately."
      },
      "independentTicks": {
        "default": "true for y, false for y2",
        "labels": ["Axis display", "Grid"],
        "type": "boolean",
        "description": "Only valid for y and y2, has no effect on x: This option defines whether the y axes should align their ticks or if they should be independent. Possible combinations: 1.) y=true, y2=false (default): y is the primary axis and the y2 ticks are aligned to the the ones of y. (only 1 grid) 2.) y=false, y2=true: y2 is the primary axis and the y ticks are aligned to the the ones of y2. (only 1 grid) 3.) y=true, y2=true: Both axis are independent and have their own ticks. (2 grids) 4.) y=false, y2=false: Invalid configuration causes an error."
      },
      "drawAxis": {
        "default": "true for x and y, false for y2",
        "labels": ["Axis display"],
        "type": "boolean",
        "description": "Whether to draw the specified axis. This may be set on a per-axis basis to define the visibility of each axis separately. Setting this to false also prevents axis ticks from being drawn and reclaims the space for the chart grid/lines."
      },
      "gridLineWidth": {
        "default": "0.3",
        "labels": ["Grid"],
        "type": "float",
        "description": "Thickness (in pixels) of the gridlines drawn under the chart. The vertical/horizontal gridlines can be turned off entirely by using the drawGrid option. This may be set on a per-axis basis to define each axis' grid separately."
      },
      "axisLineWidth": {
        "default": "0.3",
        "labels": ["Axis display"],
        "type": "float",
        "description": "Thickness (in pixels) of the x- and y-axis lines."
      },
      "axisLineColor": {
        "default": "black",
        "labels": ["Axis display"],
        "type": "string",
        "description": "Color of the x- and y-axis lines. Accepts any value which the HTML canvas strokeStyle attribute understands, e.g. 'black' or 'rgb(0, 100, 255)'."
      },
      "fillAlpha": {
        "default": "0.15",
        "labels": ["Error Bars", "Data Series Colors"],
        "type": "float (0.0 - 1.0)",
        "description": "Error bars (or custom bars) for each series are drawn in the same color as the series, but with partial transparency. This sets the transparency. A value of 0.0 means that the error bars will not be drawn, whereas a value of 1.0 means that the error bars will be as dark as the line for the series itself. This can be used to produce chart lines whose thickness varies at each point."
      },
      "axisLabelWidth": {
        "default": "50 (y-axis), 60 (x-axis)",
        "labels": ["Axis display", "Chart labels"],
        "type": "integer",
        "description": "Width (in pixels) of the containing divs for x- and y-axis labels. For the y-axis, this also controls the width of the y-axis. Note that for the x-axis, this is independent from pixelsPerLabel, which controls the spacing between labels."
      },
      "sigFigs": {
        "default": "null",
        "labels": ["Value display/formatting"],
        "type": "integer",
        "description": "By default, dygraphs displays numbers with a fixed number of digits after the decimal point. If you'd prefer to have a fixed number of significant figures, set this option to that number of sig figs. A value of 2, for instance, would cause 1 to be display as 1.0 and 1234 to be displayed as 1.23e+3."
      },
      "digitsAfterDecimal": {
        "default": "2",
        "labels": ["Value display/formatting"],
        "type": "integer",
        "description": "Unless it's run in scientific mode (see the <code>sigFigs</code> option), dygraphs displays numbers with <code>digitsAfterDecimal</code> digits after the decimal point. Trailing zeros are not displayed, so with a value of 2 you'll get '0', '0.1', '0.12', '123.45' but not '123.456' (it will be rounded to '123.46'). Numbers with absolute value less than 0.1^digitsAfterDecimal (i.e. those which would show up as '0.00') will be displayed in scientific notation."
      },
      "maxNumberWidth": {
        "default": "6",
        "labels": ["Value display/formatting"],
        "type": "integer",
        "description": "When displaying numbers in normal (not scientific) mode, large numbers will be displayed with many trailing zeros (e.g. 100000000 instead of 1e9). This can lead to unwieldy y-axis labels. If there are more than <code>maxNumberWidth</code> digits to the left of the decimal in a number, dygraphs will switch to scientific notation, even when not operating in scientific mode. If you'd like to see all those digits, set this to something large, like 20 or 30."
      },
      "file": {
        "default": "(set when constructed)",
        "labels": ["Data"],
        "type": "string (URL of CSV or CSV), GViz DataTable or 2D Array",
        "description": "Sets the data being displayed in the chart. This can only be set when calling updateOptions; it cannot be set from the constructor. For a full description of valid data formats, see the <a href='http://dygraphs.com/data.html'>Data Formats</a> page."
      },
      "timingName": {
        "default": "null",
        "labels": ["Debugging", "Deprecated"],
        "type": "string",
        "description": "Set this option to log timing information. The value of the option will be logged along with the timimg, so that you can distinguish multiple dygraphs on the same page."
      },
      "showRangeSelector": {
        "default": "false",
        "labels": ["Range Selector"],
        "type": "boolean",
        "description": "Show or hide the range selector widget."
      },
      "rangeSelectorHeight": {
        "default": "40",
        "labels": ["Range Selector"],
        "type": "integer",
        "description": "Height, in pixels, of the range selector widget. This option can only be specified at Dygraph creation time."
      },
      "rangeSelectorPlotStrokeColor": {
        "default": "#808FAB",
        "labels": ["Range Selector"],
        "type": "string",
        "description": "The range selector mini plot stroke color. This can be of the form \"#AABBCC\" or \"rgb(255,100,200)\" or \"yellow\". You can also specify null or \"\" to turn off stroke."
      },
      "rangeSelectorPlotFillColor": {
        "default": "#A7B1C4",
        "labels": ["Range Selector"],
        "type": "string",
        "description": "The range selector mini plot fill color. This can be of the form \"#AABBCC\" or \"rgb(255,100,200)\" or \"yellow\". You can also specify null or \"\" to turn off fill."
      },
      "rangeSelectorPlotFillGradientColor": {
        "default": "white",
        "labels": ["Range Selector"],
        "type": "string",
        "description": "The top color for the range selector mini plot fill color gradient. This can be of the form \"#AABBCC\" or \"rgb(255,100,200)\" or \"rgba(255,100,200,42)\" or \"yellow\". You can also specify null or \"\" to disable the gradient and fill with one single color."
      },
      "rangeSelectorBackgroundStrokeColor": {
        "default": "gray",
        "labels": ["Range Selector"],
        "type": "string",
        "description": "The color of the lines below and on both sides of the range selector mini plot. This can be of the form \"#AABBCC\" or \"rgb(255,100,200)\" or \"yellow\"."
      },
      "rangeSelectorBackgroundLineWidth": {
        "default": "1",
        "labels": ["Range Selector"],
        "type": "float",
        "description": "The width of the lines below and on both sides of the range selector mini plot."
      },
      "rangeSelectorPlotLineWidth": {
        "default": "1.5",
        "labels": ["Range Selector"],
        "type": "float",
        "description": "The width of the range selector mini plot line."
      },
      "rangeSelectorForegroundStrokeColor": {
        "default": "black",
        "labels": ["Range Selector"],
        "type": "string",
        "description": "The color of the lines in the interactive layer of the range selector. This can be of the form \"#AABBCC\" or \"rgb(255,100,200)\" or \"yellow\"."
      },
      "rangeSelectorForegroundLineWidth": {
        "default": "1",
        "labels": ["Range Selector"],
        "type": "float",
        "description": "The width the lines in the interactive layer of the range selector."
      },
      "rangeSelectorAlpha": {
        "default": "0.6",
        "labels": ["Range Selector"],
        "type": "float (0.0 - 1.0)",
        "description": "The transparency of the veil that is drawn over the unselected portions of the range selector mini plot. A value of 0 represents full transparency and the unselected portions of the mini plot will appear as normal. A value of 1 represents full opacity and the unselected portions of the mini plot will be hidden."
      },
      "showInRangeSelector": {
        "default": "null",
        "labels": ["Range Selector"],
        "type": "boolean",
        "description": "Mark this series for inclusion in the range selector. The mini plot curve will be an average of all such series. If this is not specified for any series, the default behavior is to average all the visible series. Setting it for one series will result in that series being charted alone in the range selector. Once it's set for a single series, it needs to be set for all series which should be included (regardless of visibility)."
      },
      "animatedZooms": {
        "default": "false",
        "labels": ["Interactive Elements"],
        "type": "boolean",
        "description": "Set this option to animate the transition between zoom windows. Applies to programmatic and interactive zooms. Note that if you also set a drawCallback, it will be called several times on each zoom. If you set a zoomCallback, it will only be called after the animation is complete."
      },
      "plotter": {
        "default": "[DygraphCanvasRenderer.Plotters.fillPlotter, DygraphCanvasRenderer.Plotters.errorPlotter, DygraphCanvasRenderer.Plotters.linePlotter]",
        "labels": ["Data Line display"],
        "type": "array or function",
        "description": "A function (or array of functions) which plot each data series on the chart. TODO(danvk): more details! May be set per-series."
      },
      "axes": {
        "default": "null",
        "labels": ["Configuration"],
        "type": "Object",
        "description": "Defines per-axis options. Valid keys are 'x', 'y' and 'y2'. Only some options may be set on a per-axis basis. If an option may be set in this way, it will be noted on this page. See also documentation on <a href='http://dygraphs.com/per-axis.html'>per-series and per-axis options</a>."
      },
      "series": {
        "default": "null",
        "labels": ["Series"],
        "type": "Object",
        "description": "Defines per-series options. Its keys match the y-axis label names, and the values are dictionaries themselves that contain options specific to that series."
      },
      "plugins": {
        "default": "[]",
        "labels": ["Configuration"],
        "type": "Array<plugin>",
        "description": "Defines per-graph plugins. Useful for per-graph customization"
      },
      "dataHandler": {
        "default": "(depends on data)",
        "labels": ["Data"],
        "type": "Dygraph.DataHandler",
        "description": "Custom DataHandler. This is an advanced customization. See http://bit.ly/151E7Aq."
      }
    }; // </JSON>
    // NOTE: in addition to parsing as JS, this snippet is expected to be valid
    // JSON. This assumption cannot be checked in JS, but it will be checked when
    // documentation is generated by the generate-documentation.py script. For the
    // most part, this just means that you should always use double quotes.

    // Do a quick sanity check on the options reference.
    var warn = function warn(msg) {
      if (window.console) window.console.warn(msg);
    };
    var flds = ['type', 'default', 'description'];
    var valid_cats = ['Annotations', 'Axis display', 'Chart labels', 'CSV parsing', 'Callbacks', 'Data', 'Data Line display', 'Data Series Colors', 'Error Bars', 'Grid', 'Interactive Elements', 'Range Selector', 'Legend', 'Overall display', 'Rolling Averages', 'Series', 'Value display/formatting', 'Zooming', 'Debugging', 'Configuration', 'Deprecated'];
    var i;
    var cats = {};
    for (i = 0; i < valid_cats.length; i++) cats[valid_cats[i]] = true;

    for (var k in OPTIONS_REFERENCE) {
      if (!OPTIONS_REFERENCE.hasOwnProperty(k)) continue;
      var op = OPTIONS_REFERENCE[k];
      for (i = 0; i < flds.length; i++) {
        if (!op.hasOwnProperty(flds[i])) {
          warn('Option ' + k + ' missing "' + flds[i] + '" property');
        } else if (typeof op[flds[i]] != 'string') {
          warn(k + '.' + flds[i] + ' must be of type string');
        }
      }
      var labels = op.labels;
      if (typeof labels !== 'object') {
        warn('Option "' + k + '" is missing a "labels": [...] option');
      } else {
        for (i = 0; i < labels.length; i++) {
          if (!cats.hasOwnProperty(labels[i])) {
            warn('Option "' + k + '" has label "' + labels[i] + '", which is invalid.');
          }
        }
      }
    }
  }
}

exports['default'] = OPTIONS_REFERENCE;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../process/browser.js */ 3)))

/***/ }),
/* 13 */
/*!******************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/iframe-tarp.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * To create a "drag" interaction, you typically register a mousedown event
 * handler on the element where the drag begins. In that handler, you register a
 * mouseup handler on the window to determine when the mouse is released,
 * wherever that release happens. This works well, except when the user releases
 * the mouse over an off-domain iframe. In that case, the mouseup event is
 * handled by the iframe and never bubbles up to the window handler.
 *
 * To deal with this issue, we cover iframes with high z-index divs to make sure
 * they don't capture mouseup.
 *
 * Usage:
 * element.addEventListener('mousedown', function() {
 *   var tarper = new IFrameTarp();
 *   tarper.cover();
 *   var mouseUpHandler = function() {
 *     ...
 *     window.removeEventListener(mouseUpHandler);
 *     tarper.uncover();
 *   };
 *   window.addEventListener('mouseup', mouseUpHandler);
 * };
 *
 * @constructor
 */


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _dygraphUtils = __webpack_require__(/*! ./dygraph-utils */ 0);

var utils = _interopRequireWildcard(_dygraphUtils);

function IFrameTarp() {
  /** @type {Array.<!HTMLDivElement>} */
  this.tarps = [];
};

/**
 * Find all the iframes in the document and cover them with high z-index
 * transparent divs.
 */
IFrameTarp.prototype.cover = function () {
  var iframes = document.getElementsByTagName("iframe");
  for (var i = 0; i < iframes.length; i++) {
    var iframe = iframes[i];
    var pos = utils.findPos(iframe),
        x = pos.x,
        y = pos.y,
        width = iframe.offsetWidth,
        height = iframe.offsetHeight;

    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = x + 'px';
    div.style.top = y + 'px';
    div.style.width = width + 'px';
    div.style.height = height + 'px';
    div.style.zIndex = 999;
    document.body.appendChild(div);
    this.tarps.push(div);
  }
};

/**
 * Remove all the iframe covers. You should call this in a mouseup handler.
 */
IFrameTarp.prototype.uncover = function () {
  for (var i = 0; i < this.tarps.length; i++) {
    this.tarps[i].parentNode.removeChild(this.tarps[i]);
  }
  this.tarps = [];
};

exports["default"] = IFrameTarp;
module.exports = exports["default"];

/***/ }),
/* 14 */
/*!**************************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/datahandler/default.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2013 David Eberlein (david.eberlein@ch.sauter-bc.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview DataHandler default implementation used for simple line charts.
 * @author David Eberlein (david.eberlein@ch.sauter-bc.com)
 */

/*global Dygraph:false */


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _datahandler = __webpack_require__(/*! ./datahandler */ 6);

var _datahandler2 = _interopRequireDefault(_datahandler);

/**
 * @constructor
 * @extends Dygraph.DataHandler
 */
var DefaultHandler = function DefaultHandler() {};

DefaultHandler.prototype = new _datahandler2['default']();

/** @inheritDoc */
DefaultHandler.prototype.extractSeries = function (rawData, i, options) {
  // TODO(danvk): pre-allocate series here.
  var series = [];
  var logScale = options.get('logscale');
  for (var j = 0; j < rawData.length; j++) {
    var x = rawData[j][0];
    var point = rawData[j][i];
    if (logScale) {
      // On the log scale, points less than zero do not exist.
      // This will create a gap in the chart.
      if (point <= 0) {
        point = null;
      }
    }
    series.push([x, point]);
  }
  return series;
};

/** @inheritDoc */
DefaultHandler.prototype.rollingAverage = function (originalData, rollPeriod, options) {
  rollPeriod = Math.min(rollPeriod, originalData.length);
  var rollingData = [];

  var i, j, y, sum, num_ok;
  // Calculate the rolling average for the first rollPeriod - 1 points
  // where
  // there is not enough data to roll over the full number of points
  if (rollPeriod == 1) {
    return originalData;
  }
  for (i = 0; i < originalData.length; i++) {
    sum = 0;
    num_ok = 0;
    for (j = Math.max(0, i - rollPeriod + 1); j < i + 1; j++) {
      y = originalData[j][1];
      if (y === null || isNaN(y)) continue;
      num_ok++;
      sum += originalData[j][1];
    }
    if (num_ok) {
      rollingData[i] = [originalData[i][0], sum / num_ok];
    } else {
      rollingData[i] = [originalData[i][0], null];
    }
  }

  return rollingData;
};

/** @inheritDoc */
DefaultHandler.prototype.getExtremeYValues = function (series, dateWindow, options) {
  var minY = null,
      maxY = null,
      y;
  var firstIdx = 0,
      lastIdx = series.length - 1;

  for (var j = firstIdx; j <= lastIdx; j++) {
    y = series[j][1];
    if (y === null || isNaN(y)) continue;
    if (maxY === null || y > maxY) {
      maxY = y;
    }
    if (minY === null || y < minY) {
      minY = y;
    }
  }
  return [minY, maxY];
};

exports['default'] = DefaultHandler;
module.exports = exports['default'];

/***/ }),
/* 15 */
/*!**********************************!*\
  !*** ./src/assets/bss_small.png ***!
  \**********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bss_small_29f95a4.png";

/***/ }),
/* 16 */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dygraphs_index_es5_js__ = __webpack_require__(/*! dygraphs/index.es5.js */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dygraphs_index_es5_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_dygraphs_index_es5_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_bss_small_png__ = __webpack_require__(/*! ./assets/bss_small.png */ 15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_bss_small_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__assets_bss_small_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_Icon_font_7_stroke_PIXEDEN_v_1_2_0_pe_icon_7_stroke_css_pe_icon_7_stroke_css__ = __webpack_require__(/*! ./assets/Icon-font-7-stroke-PIXEDEN-v-1.2.0/pe-icon-7-stroke/css/pe-icon-7-stroke.css */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_Icon_font_7_stroke_PIXEDEN_v_1_2_0_pe_icon_7_stroke_css_pe_icon_7_stroke_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__assets_Icon_font_7_stroke_PIXEDEN_v_1_2_0_pe_icon_7_stroke_css_pe_icon_7_stroke_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_Icon_font_7_stroke_PIXEDEN_v_1_2_0_pe_icon_7_stroke_css_helper_css__ = __webpack_require__(/*! ./assets/Icon-font-7-stroke-PIXEDEN-v-1.2.0/pe-icon-7-stroke/css/helper.css */ 39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_Icon_font_7_stroke_PIXEDEN_v_1_2_0_pe_icon_7_stroke_css_helper_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__assets_Icon_font_7_stroke_PIXEDEN_v_1_2_0_pe_icon_7_stroke_css_helper_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__index_pug__ = __webpack_require__(/*! ./index.pug */ 41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__index_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__index_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__index_sass__ = __webpack_require__(/*! ./index.sass */ 44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__index_sass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__index_sass__);
// import purecss from 'purecss';


// import 'moment';









// import spinnersass from './components/misc/spinner.sass';


$(document).ready(function() {


    var timers = [];
    function clearTimers() {
        for (var i = 0; i<timers.length; i++) {
            clearTimeout(timers[i]);
        }

    }

});

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ 17)))

/***/ }),
/* 17 */
/*!********************************************!*\
  !*** ./node_modules/jquery/dist/jquery.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
		return jQuery;
	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),
/* 18 */
/*!********************************************!*\
  !*** ./node_modules/dygraphs/index.es5.js ***!
  \********************************************/
/*! dynamic exports provided */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src-es5/dygraph */ 2);



/***/ }),
/* 19 */
/*!**********************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/dygraph-options.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * @license
 * Copyright 2011 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview DygraphOptions is responsible for parsing and returning
 * information about options.
 */

// TODO: remove this jshint directive & fix the warnings.
/*jshint sub:true */


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dygraphUtils = __webpack_require__(/*! ./dygraph-utils */ 0);

var utils = _interopRequireWildcard(_dygraphUtils);

var _dygraphDefaultAttrs = __webpack_require__(/*! ./dygraph-default-attrs */ 11);

var _dygraphDefaultAttrs2 = _interopRequireDefault(_dygraphDefaultAttrs);

var _dygraphOptionsReference = __webpack_require__(/*! ./dygraph-options-reference */ 12);

var _dygraphOptionsReference2 = _interopRequireDefault(_dygraphOptionsReference);

/*
 * Interesting member variables: (REMOVING THIS LIST AS I CLOSURIZE)
 * global_ - global attributes (common among all graphs, AIUI)
 * user - attributes set by the user
 * series_ - { seriesName -> { idx, yAxis, options }}
 */

/**
 * This parses attributes into an object that can be easily queried.
 *
 * It doesn't necessarily mean that all options are available, specifically
 * if labels are not yet available, since those drive details of the per-series
 * and per-axis options.
 *
 * @param {Dygraph} dygraph The chart to which these options belong.
 * @constructor
 */
var DygraphOptions = function DygraphOptions(dygraph) {
  /**
   * The dygraph.
   * @type {!Dygraph}
   */
  this.dygraph_ = dygraph;

  /**
   * Array of axis index to { series : [ series names ] , options : { axis-specific options. }
   * @type {Array.<{series : Array.<string>, options : Object}>} @private
   */
  this.yAxes_ = [];

  /**
   * Contains x-axis specific options, which are stored in the options key.
   * This matches the yAxes_ object structure (by being a dictionary with an
   * options element) allowing for shared code.
   * @type {options: Object} @private
   */
  this.xAxis_ = {};
  this.series_ = {};

  // Once these two objects are initialized, you can call get();
  this.global_ = this.dygraph_.attrs_;
  this.user_ = this.dygraph_.user_attrs_ || {};

  /**
   * A list of series in columnar order.
   * @type {Array.<string>}
   */
  this.labels_ = [];

  this.highlightSeries_ = this.get("highlightSeriesOpts") || {};
  this.reparseSeries();
};

/**
 * Not optimal, but does the trick when you're only using two axes.
 * If we move to more axes, this can just become a function.
 *
 * @type {Object.<number>}
 * @private
 */
DygraphOptions.AXIS_STRING_MAPPINGS_ = {
  'y': 0,
  'Y': 0,
  'y1': 0,
  'Y1': 0,
  'y2': 1,
  'Y2': 1
};

/**
 * @param {string|number} axis
 * @private
 */
DygraphOptions.axisToIndex_ = function (axis) {
  if (typeof axis == "string") {
    if (DygraphOptions.AXIS_STRING_MAPPINGS_.hasOwnProperty(axis)) {
      return DygraphOptions.AXIS_STRING_MAPPINGS_[axis];
    }
    throw "Unknown axis : " + axis;
  }
  if (typeof axis == "number") {
    if (axis === 0 || axis === 1) {
      return axis;
    }
    throw "Dygraphs only supports two y-axes, indexed from 0-1.";
  }
  if (axis) {
    throw "Unknown axis : " + axis;
  }
  // No axis specification means axis 0.
  return 0;
};

/**
 * Reparses options that are all related to series. This typically occurs when
 * options are either updated, or source data has been made available.
 *
 * TODO(konigsberg): The method name is kind of weak; fix.
 */
DygraphOptions.prototype.reparseSeries = function () {
  var labels = this.get("labels");
  if (!labels) {
    return; // -- can't do more for now, will parse after getting the labels.
  }

  this.labels_ = labels.slice(1);

  this.yAxes_ = [{ series: [], options: {} }]; // Always one axis at least.
  this.xAxis_ = { options: {} };
  this.series_ = {};

  // Series are specified in the series element:
  //
  // {
  //   labels: [ "X", "foo", "bar" ],
  //   pointSize: 3,
  //   series : {
  //     foo : {}, // options for foo
  //     bar : {} // options for bar
  //   }
  // }
  //
  // So, if series is found, it's expected to contain per-series data, otherwise set a
  // default.
  var seriesDict = this.user_.series || {};
  for (var idx = 0; idx < this.labels_.length; idx++) {
    var seriesName = this.labels_[idx];
    var optionsForSeries = seriesDict[seriesName] || {};
    var yAxis = DygraphOptions.axisToIndex_(optionsForSeries["axis"]);

    this.series_[seriesName] = {
      idx: idx,
      yAxis: yAxis,
      options: optionsForSeries };

    if (!this.yAxes_[yAxis]) {
      this.yAxes_[yAxis] = { series: [seriesName], options: {} };
    } else {
      this.yAxes_[yAxis].series.push(seriesName);
    }
  }

  var axis_opts = this.user_["axes"] || {};
  utils.update(this.yAxes_[0].options, axis_opts["y"] || {});
  if (this.yAxes_.length > 1) {
    utils.update(this.yAxes_[1].options, axis_opts["y2"] || {});
  }
  utils.update(this.xAxis_.options, axis_opts["x"] || {});

  // For "production" code, this gets removed by uglifyjs.
  if (typeof process !== 'undefined') {
    if (process.env.NODE_ENV != 'production') {
      this.validateOptions_();
    }
  }
};

/**
 * Get a global value.
 *
 * @param {string} name the name of the option.
 */
DygraphOptions.prototype.get = function (name) {
  var result = this.getGlobalUser_(name);
  if (result !== null) {
    return result;
  }
  return this.getGlobalDefault_(name);
};

DygraphOptions.prototype.getGlobalUser_ = function (name) {
  if (this.user_.hasOwnProperty(name)) {
    return this.user_[name];
  }
  return null;
};

DygraphOptions.prototype.getGlobalDefault_ = function (name) {
  if (this.global_.hasOwnProperty(name)) {
    return this.global_[name];
  }
  if (_dygraphDefaultAttrs2['default'].hasOwnProperty(name)) {
    return _dygraphDefaultAttrs2['default'][name];
  }
  return null;
};

/**
 * Get a value for a specific axis. If there is no specific value for the axis,
 * the global value is returned.
 *
 * @param {string} name the name of the option.
 * @param {string|number} axis the axis to search. Can be the string representation
 * ("y", "y2") or the axis number (0, 1).
 */
DygraphOptions.prototype.getForAxis = function (name, axis) {
  var axisIdx;
  var axisString;

  // Since axis can be a number or a string, straighten everything out here.
  if (typeof axis == 'number') {
    axisIdx = axis;
    axisString = axisIdx === 0 ? "y" : "y2";
  } else {
    if (axis == "y1") {
      axis = "y";
    } // Standardize on 'y'. Is this bad? I think so.
    if (axis == "y") {
      axisIdx = 0;
    } else if (axis == "y2") {
      axisIdx = 1;
    } else if (axis == "x") {
      axisIdx = -1; // simply a placeholder for below.
    } else {
        throw "Unknown axis " + axis;
      }
    axisString = axis;
  }

  var userAxis = axisIdx == -1 ? this.xAxis_ : this.yAxes_[axisIdx];

  // Search the user-specified axis option first.
  if (userAxis) {
    // This condition could be removed if we always set up this.yAxes_ for y2.
    var axisOptions = userAxis.options;
    if (axisOptions.hasOwnProperty(name)) {
      return axisOptions[name];
    }
  }

  // User-specified global options second.
  // But, hack, ignore globally-specified 'logscale' for 'x' axis declaration.
  if (!(axis === 'x' && name === 'logscale')) {
    var result = this.getGlobalUser_(name);
    if (result !== null) {
      return result;
    }
  }
  // Default axis options third.
  var defaultAxisOptions = _dygraphDefaultAttrs2['default'].axes[axisString];
  if (defaultAxisOptions.hasOwnProperty(name)) {
    return defaultAxisOptions[name];
  }

  // Default global options last.
  return this.getGlobalDefault_(name);
};

/**
 * Get a value for a specific series. If there is no specific value for the series,
 * the value for the axis is returned (and afterwards, the global value.)
 *
 * @param {string} name the name of the option.
 * @param {string} series the series to search.
 */
DygraphOptions.prototype.getForSeries = function (name, series) {
  // Honors indexes as series.
  if (series === this.dygraph_.getHighlightSeries()) {
    if (this.highlightSeries_.hasOwnProperty(name)) {
      return this.highlightSeries_[name];
    }
  }

  if (!this.series_.hasOwnProperty(series)) {
    throw "Unknown series: " + series;
  }

  var seriesObj = this.series_[series];
  var seriesOptions = seriesObj["options"];
  if (seriesOptions.hasOwnProperty(name)) {
    return seriesOptions[name];
  }

  return this.getForAxis(name, seriesObj["yAxis"]);
};

/**
 * Returns the number of y-axes on the chart.
 * @return {number} the number of axes.
 */
DygraphOptions.prototype.numAxes = function () {
  return this.yAxes_.length;
};

/**
 * Return the y-axis for a given series, specified by name.
 */
DygraphOptions.prototype.axisForSeries = function (series) {
  return this.series_[series].yAxis;
};

/**
 * Returns the options for the specified axis.
 */
// TODO(konigsberg): this is y-axis specific. Support the x axis.
DygraphOptions.prototype.axisOptions = function (yAxis) {
  return this.yAxes_[yAxis].options;
};

/**
 * Return the series associated with an axis.
 */
DygraphOptions.prototype.seriesForAxis = function (yAxis) {
  return this.yAxes_[yAxis].series;
};

/**
 * Return the list of all series, in their columnar order.
 */
DygraphOptions.prototype.seriesNames = function () {
  return this.labels_;
};

// For "production" code, this gets removed by uglifyjs.
if (typeof process !== 'undefined') {
  if (process.env.NODE_ENV != 'production') {

    /**
     * Validate all options.
     * This requires OPTIONS_REFERENCE, which is only available in debug builds.
     * @private
     */
    DygraphOptions.prototype.validateOptions_ = function () {
      if (typeof _dygraphOptionsReference2['default'] === 'undefined') {
        throw 'Called validateOptions_ in prod build.';
      }

      var that = this;
      var validateOption = function validateOption(optionName) {
        if (!_dygraphOptionsReference2['default'][optionName]) {
          that.warnInvalidOption_(optionName);
        }
      };

      var optionsDicts = [this.xAxis_.options, this.yAxes_[0].options, this.yAxes_[1] && this.yAxes_[1].options, this.global_, this.user_, this.highlightSeries_];
      var names = this.seriesNames();
      for (var i = 0; i < names.length; i++) {
        var name = names[i];
        if (this.series_.hasOwnProperty(name)) {
          optionsDicts.push(this.series_[name].options);
        }
      }
      for (var i = 0; i < optionsDicts.length; i++) {
        var dict = optionsDicts[i];
        if (!dict) continue;
        for (var optionName in dict) {
          if (dict.hasOwnProperty(optionName)) {
            validateOption(optionName);
          }
        }
      }
    };

    var WARNINGS = {}; // Only show any particular warning once.

    /**
     * Logs a warning about invalid options.
     * TODO: make this throw for testing
     * @private
     */
    DygraphOptions.prototype.warnInvalidOption_ = function (optionName) {
      if (!WARNINGS[optionName]) {
        WARNINGS[optionName] = true;
        var isSeries = this.labels_.indexOf(optionName) >= 0;
        if (isSeries) {
          console.warn('Use new-style per-series options (saw ' + optionName + ' as top-level options key). See http://bit.ly/1tceaJs');
        } else {
          console.warn('Unknown option ' + optionName + ' (full list of options at dygraphs.com/options.html');
        }
        throw "invalid option " + optionName;
      }
    };

    // Reset list of previously-shown warnings. Used for testing.
    DygraphOptions.resetWarnings_ = function () {
      WARNINGS = {};
    };
  }
}

exports['default'] = DygraphOptions;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../process/browser.js */ 3)))

/***/ }),
/* 20 */
/*!*****************************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/datahandler/bars-error.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2013 David Eberlein (david.eberlein@ch.sauter-bc.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview DataHandler implementation for the error bars option.
 * @author David Eberlein (david.eberlein@ch.sauter-bc.com)
 */

/*global Dygraph:false */


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _bars = __webpack_require__(/*! ./bars */ 1);

var _bars2 = _interopRequireDefault(_bars);

/**
 * @constructor
 * @extends BarsHandler
 */
var ErrorBarsHandler = function ErrorBarsHandler() {};

ErrorBarsHandler.prototype = new _bars2["default"]();

/** @inheritDoc */
ErrorBarsHandler.prototype.extractSeries = function (rawData, i, options) {
  // TODO(danvk): pre-allocate series here.
  var series = [];
  var x, y, variance, point;
  var sigma = options.get("sigma");
  var logScale = options.get('logscale');
  for (var j = 0; j < rawData.length; j++) {
    x = rawData[j][0];
    point = rawData[j][i];
    if (logScale && point !== null) {
      // On the log scale, points less than zero do not exist.
      // This will create a gap in the chart.
      if (point[0] <= 0 || point[0] - sigma * point[1] <= 0) {
        point = null;
      }
    }
    // Extract to the unified data format.
    if (point !== null) {
      y = point[0];
      if (y !== null && !isNaN(y)) {
        variance = sigma * point[1];
        // preserve original error value in extras for further
        // filtering
        series.push([x, y, [y - variance, y + variance, point[1]]]);
      } else {
        series.push([x, y, [y, y, y]]);
      }
    } else {
      series.push([x, null, [null, null, null]]);
    }
  }
  return series;
};

/** @inheritDoc */
ErrorBarsHandler.prototype.rollingAverage = function (originalData, rollPeriod, options) {
  rollPeriod = Math.min(rollPeriod, originalData.length);
  var rollingData = [];
  var sigma = options.get("sigma");

  var i, j, y, v, sum, num_ok, stddev, variance, value;

  // Calculate the rolling average for the first rollPeriod - 1 points
  // where there is not enough data to roll over the full number of points
  for (i = 0; i < originalData.length; i++) {
    sum = 0;
    variance = 0;
    num_ok = 0;
    for (j = Math.max(0, i - rollPeriod + 1); j < i + 1; j++) {
      y = originalData[j][1];
      if (y === null || isNaN(y)) continue;
      num_ok++;
      sum += y;
      variance += Math.pow(originalData[j][2][2], 2);
    }
    if (num_ok) {
      stddev = Math.sqrt(variance) / num_ok;
      value = sum / num_ok;
      rollingData[i] = [originalData[i][0], value, [value - sigma * stddev, value + sigma * stddev]];
    } else {
      // This explicitly preserves NaNs to aid with "independent
      // series".
      // See testRollingAveragePreservesNaNs.
      v = rollPeriod == 1 ? originalData[i][1] : null;
      rollingData[i] = [originalData[i][0], v, [v, v]];
    }
  }

  return rollingData;
};

exports["default"] = ErrorBarsHandler;
module.exports = exports["default"];

/***/ }),
/* 21 */
/*!******************************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/datahandler/bars-custom.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2013 David Eberlein (david.eberlein@ch.sauter-bc.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview DataHandler implementation for the custom bars option.
 * @author David Eberlein (david.eberlein@ch.sauter-bc.com)
 */

/*global Dygraph:false */


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bars = __webpack_require__(/*! ./bars */ 1);

var _bars2 = _interopRequireDefault(_bars);

/**
 * @constructor
 * @extends Dygraph.DataHandlers.BarsHandler
 */
var CustomBarsHandler = function CustomBarsHandler() {};

CustomBarsHandler.prototype = new _bars2['default']();

/** @inheritDoc */
CustomBarsHandler.prototype.extractSeries = function (rawData, i, options) {
  // TODO(danvk): pre-allocate series here.
  var series = [];
  var x, y, point;
  var logScale = options.get('logscale');
  for (var j = 0; j < rawData.length; j++) {
    x = rawData[j][0];
    point = rawData[j][i];
    if (logScale && point !== null) {
      // On the log scale, points less than zero do not exist.
      // This will create a gap in the chart.
      if (point[0] <= 0 || point[1] <= 0 || point[2] <= 0) {
        point = null;
      }
    }
    // Extract to the unified data format.
    if (point !== null) {
      y = point[1];
      if (y !== null && !isNaN(y)) {
        series.push([x, y, [point[0], point[2]]]);
      } else {
        series.push([x, y, [y, y]]);
      }
    } else {
      series.push([x, null, [null, null]]);
    }
  }
  return series;
};

/** @inheritDoc */
CustomBarsHandler.prototype.rollingAverage = function (originalData, rollPeriod, options) {
  rollPeriod = Math.min(rollPeriod, originalData.length);
  var rollingData = [];
  var y, low, high, mid, count, i, extremes;

  low = 0;
  mid = 0;
  high = 0;
  count = 0;
  for (i = 0; i < originalData.length; i++) {
    y = originalData[i][1];
    extremes = originalData[i][2];
    rollingData[i] = originalData[i];

    if (y !== null && !isNaN(y)) {
      low += extremes[0];
      mid += y;
      high += extremes[1];
      count += 1;
    }
    if (i - rollPeriod >= 0) {
      var prev = originalData[i - rollPeriod];
      if (prev[1] !== null && !isNaN(prev[1])) {
        low -= prev[2][0];
        mid -= prev[1];
        high -= prev[2][1];
        count -= 1;
      }
    }
    if (count) {
      rollingData[i] = [originalData[i][0], 1.0 * mid / count, [1.0 * low / count, 1.0 * high / count]];
    } else {
      rollingData[i] = [originalData[i][0], null, [null, null]];
    }
  }

  return rollingData;
};

exports['default'] = CustomBarsHandler;
module.exports = exports['default'];

/***/ }),
/* 22 */
/*!************************************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/datahandler/default-fractions.js ***!
  \************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2013 David Eberlein (david.eberlein@ch.sauter-bc.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview DataHandler implementation for the fractions option.
 * @author David Eberlein (david.eberlein@ch.sauter-bc.com)
 */

/*global Dygraph:false */


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _datahandler = __webpack_require__(/*! ./datahandler */ 6);

var _datahandler2 = _interopRequireDefault(_datahandler);

var _default = __webpack_require__(/*! ./default */ 14);

var _default2 = _interopRequireDefault(_default);

/**
 * @extends DefaultHandler
 * @constructor
 */
var DefaultFractionHandler = function DefaultFractionHandler() {};

DefaultFractionHandler.prototype = new _default2['default']();

DefaultFractionHandler.prototype.extractSeries = function (rawData, i, options) {
  // TODO(danvk): pre-allocate series here.
  var series = [];
  var x, y, point, num, den, value;
  var mult = 100.0;
  var logScale = options.get('logscale');
  for (var j = 0; j < rawData.length; j++) {
    x = rawData[j][0];
    point = rawData[j][i];
    if (logScale && point !== null) {
      // On the log scale, points less than zero do not exist.
      // This will create a gap in the chart.
      if (point[0] <= 0 || point[1] <= 0) {
        point = null;
      }
    }
    // Extract to the unified data format.
    if (point !== null) {
      num = point[0];
      den = point[1];
      if (num !== null && !isNaN(num)) {
        value = den ? num / den : 0.0;
        y = mult * value;
        // preserve original values in extras for further filtering
        series.push([x, y, [num, den]]);
      } else {
        series.push([x, num, [num, den]]);
      }
    } else {
      series.push([x, null, [null, null]]);
    }
  }
  return series;
};

DefaultFractionHandler.prototype.rollingAverage = function (originalData, rollPeriod, options) {
  rollPeriod = Math.min(rollPeriod, originalData.length);
  var rollingData = [];

  var i;
  var num = 0;
  var den = 0; // numerator/denominator
  var mult = 100.0;
  for (i = 0; i < originalData.length; i++) {
    num += originalData[i][2][0];
    den += originalData[i][2][1];
    if (i - rollPeriod >= 0) {
      num -= originalData[i - rollPeriod][2][0];
      den -= originalData[i - rollPeriod][2][1];
    }

    var date = originalData[i][0];
    var value = den ? num / den : 0.0;
    rollingData[i] = [date, mult * value];
  }

  return rollingData;
};

exports['default'] = DefaultFractionHandler;
module.exports = exports['default'];

/***/ }),
/* 23 */
/*!*********************************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/datahandler/bars-fractions.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2013 David Eberlein (david.eberlein@ch.sauter-bc.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview DataHandler implementation for the combination 
 * of error bars and fractions options.
 * @author David Eberlein (david.eberlein@ch.sauter-bc.com)
 */

/*global Dygraph:false */


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _bars = __webpack_require__(/*! ./bars */ 1);

var _bars2 = _interopRequireDefault(_bars);

/**
 * @constructor
 * @extends Dygraph.DataHandlers.BarsHandler
 */
var FractionsBarsHandler = function FractionsBarsHandler() {};

FractionsBarsHandler.prototype = new _bars2["default"]();

/** @inheritDoc */
FractionsBarsHandler.prototype.extractSeries = function (rawData, i, options) {
  // TODO(danvk): pre-allocate series here.
  var series = [];
  var x, y, point, num, den, value, stddev, variance;
  var mult = 100.0;
  var sigma = options.get("sigma");
  var logScale = options.get('logscale');
  for (var j = 0; j < rawData.length; j++) {
    x = rawData[j][0];
    point = rawData[j][i];
    if (logScale && point !== null) {
      // On the log scale, points less than zero do not exist.
      // This will create a gap in the chart.
      if (point[0] <= 0 || point[1] <= 0) {
        point = null;
      }
    }
    // Extract to the unified data format.
    if (point !== null) {
      num = point[0];
      den = point[1];
      if (num !== null && !isNaN(num)) {
        value = den ? num / den : 0.0;
        stddev = den ? sigma * Math.sqrt(value * (1 - value) / den) : 1.0;
        variance = mult * stddev;
        y = mult * value;
        // preserve original values in extras for further filtering
        series.push([x, y, [y - variance, y + variance, num, den]]);
      } else {
        series.push([x, num, [num, num, num, den]]);
      }
    } else {
      series.push([x, null, [null, null, null, null]]);
    }
  }
  return series;
};

/** @inheritDoc */
FractionsBarsHandler.prototype.rollingAverage = function (originalData, rollPeriod, options) {
  rollPeriod = Math.min(rollPeriod, originalData.length);
  var rollingData = [];
  var sigma = options.get("sigma");
  var wilsonInterval = options.get("wilsonInterval");

  var low, high, i, stddev;
  var num = 0;
  var den = 0; // numerator/denominator
  var mult = 100.0;
  for (i = 0; i < originalData.length; i++) {
    num += originalData[i][2][2];
    den += originalData[i][2][3];
    if (i - rollPeriod >= 0) {
      num -= originalData[i - rollPeriod][2][2];
      den -= originalData[i - rollPeriod][2][3];
    }

    var date = originalData[i][0];
    var value = den ? num / den : 0.0;
    if (wilsonInterval) {
      // For more details on this confidence interval, see:
      // http://en.wikipedia.org/wiki/Binomial_confidence_interval
      if (den) {
        var p = value < 0 ? 0 : value,
            n = den;
        var pm = sigma * Math.sqrt(p * (1 - p) / n + sigma * sigma / (4 * n * n));
        var denom = 1 + sigma * sigma / den;
        low = (p + sigma * sigma / (2 * den) - pm) / denom;
        high = (p + sigma * sigma / (2 * den) + pm) / denom;
        rollingData[i] = [date, p * mult, [low * mult, high * mult]];
      } else {
        rollingData[i] = [date, 0, [0, 0]];
      }
    } else {
      stddev = den ? sigma * Math.sqrt(value * (1 - value) / den) : 1.0;
      rollingData[i] = [date, mult * value, [mult * (value - stddev), mult * (value + stddev)]];
    }
  }

  return rollingData;
};

exports["default"] = FractionsBarsHandler;
module.exports = exports["default"];

/***/ }),
/* 24 */
/*!**************************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/plugins/annotations.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2012 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/*global Dygraph:false */



/**
Current bits of jankiness:
- Uses dygraph.layout_ to get the parsed annotations.
- Uses dygraph.plotter_.area

It would be nice if the plugin didn't require so much special support inside
the core dygraphs classes, but annotations involve quite a bit of parsing and
layout.

TODO(danvk): cache DOM elements.
*/

Object.defineProperty(exports, "__esModule", {
  value: true
});
var annotations = function annotations() {
  this.annotations_ = [];
};

annotations.prototype.toString = function () {
  return "Annotations Plugin";
};

annotations.prototype.activate = function (g) {
  return {
    clearChart: this.clearChart,
    didDrawChart: this.didDrawChart
  };
};

annotations.prototype.detachLabels = function () {
  for (var i = 0; i < this.annotations_.length; i++) {
    var a = this.annotations_[i];
    if (a.parentNode) a.parentNode.removeChild(a);
    this.annotations_[i] = null;
  }
  this.annotations_ = [];
};

annotations.prototype.clearChart = function (e) {
  this.detachLabels();
};

annotations.prototype.didDrawChart = function (e) {
  var g = e.dygraph;

  // Early out in the (common) case of zero annotations.
  var points = g.layout_.annotated_points;
  if (!points || points.length === 0) return;

  var containerDiv = e.canvas.parentNode;

  var bindEvt = function bindEvt(eventName, classEventName, pt) {
    return function (annotation_event) {
      var a = pt.annotation;
      if (a.hasOwnProperty(eventName)) {
        a[eventName](a, pt, g, annotation_event);
      } else if (g.getOption(classEventName)) {
        g.getOption(classEventName)(a, pt, g, annotation_event);
      }
    };
  };

  // Add the annotations one-by-one.
  var area = e.dygraph.getArea();

  // x-coord to sum of previous annotation's heights (used for stacking).
  var xToUsedHeight = {};

  for (var i = 0; i < points.length; i++) {
    var p = points[i];
    if (p.canvasx < area.x || p.canvasx > area.x + area.w || p.canvasy < area.y || p.canvasy > area.y + area.h) {
      continue;
    }

    var a = p.annotation;
    var tick_height = 6;
    if (a.hasOwnProperty("tickHeight")) {
      tick_height = a.tickHeight;
    }

    // TODO: deprecate axisLabelFontSize in favor of CSS
    var div = document.createElement("div");
    div.style['fontSize'] = g.getOption('axisLabelFontSize') + "px";
    var className = 'dygraph-annotation';
    if (!a.hasOwnProperty('icon')) {
      // camelCase class names are deprecated.
      className += ' dygraphDefaultAnnotation dygraph-default-annotation';
    }
    if (a.hasOwnProperty('cssClass')) {
      className += " " + a.cssClass;
    }
    div.className = className;

    var width = a.hasOwnProperty('width') ? a.width : 16;
    var height = a.hasOwnProperty('height') ? a.height : 16;
    if (a.hasOwnProperty('icon')) {
      var img = document.createElement("img");
      img.src = a.icon;
      img.width = width;
      img.height = height;
      div.appendChild(img);
    } else if (p.annotation.hasOwnProperty('shortText')) {
      div.appendChild(document.createTextNode(p.annotation.shortText));
    }
    var left = p.canvasx - width / 2;
    div.style.left = left + "px";
    var divTop = 0;
    if (a.attachAtBottom) {
      var y = area.y + area.h - height - tick_height;
      if (xToUsedHeight[left]) {
        y -= xToUsedHeight[left];
      } else {
        xToUsedHeight[left] = 0;
      }
      xToUsedHeight[left] += tick_height + height;
      divTop = y;
    } else {
      divTop = p.canvasy - height - tick_height;
    }
    div.style.top = divTop + "px";
    div.style.width = width + "px";
    div.style.height = height + "px";
    div.title = p.annotation.text;
    div.style.color = g.colorsMap_[p.name];
    div.style.borderColor = g.colorsMap_[p.name];
    a.div = div;

    g.addAndTrackEvent(div, 'click', bindEvt('clickHandler', 'annotationClickHandler', p, this));
    g.addAndTrackEvent(div, 'mouseover', bindEvt('mouseOverHandler', 'annotationMouseOverHandler', p, this));
    g.addAndTrackEvent(div, 'mouseout', bindEvt('mouseOutHandler', 'annotationMouseOutHandler', p, this));
    g.addAndTrackEvent(div, 'dblclick', bindEvt('dblClickHandler', 'annotationDblClickHandler', p, this));

    containerDiv.appendChild(div);
    this.annotations_.push(div);

    var ctx = e.drawingContext;
    ctx.save();
    ctx.strokeStyle = a.hasOwnProperty('tickColor') ? a.tickColor : g.colorsMap_[p.name];
    ctx.lineWidth = a.hasOwnProperty('tickWidth') ? a.tickWidth : g.getOption('strokeWidth');
    ctx.beginPath();
    if (!a.attachAtBottom) {
      ctx.moveTo(p.canvasx, p.canvasy);
      ctx.lineTo(p.canvasx, p.canvasy - 2 - tick_height);
    } else {
      var y = divTop + height;
      ctx.moveTo(p.canvasx, y);
      ctx.lineTo(p.canvasx, y + tick_height);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
};

annotations.prototype.destroy = function () {
  this.detachLabels();
};

exports["default"] = annotations;
module.exports = exports["default"];

/***/ }),
/* 25 */
/*!*******************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/plugins/axes.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2012 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/*global Dygraph:false */



/*
Bits of jankiness:
- Direct layout access
- Direct area access
- Should include calculation of ticks, not just the drawing.

Options left to make axis-friendly.
  ('drawAxesAtZero')
  ('xAxisHeight')
*/

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dygraphUtils = __webpack_require__(/*! ../dygraph-utils */ 0);

var utils = _interopRequireWildcard(_dygraphUtils);

/**
 * Draws the axes. This includes the labels on the x- and y-axes, as well
 * as the tick marks on the axes.
 * It does _not_ draw the grid lines which span the entire chart.
 */
var axes = function axes() {
  this.xlabels_ = [];
  this.ylabels_ = [];
};

axes.prototype.toString = function () {
  return 'Axes Plugin';
};

axes.prototype.activate = function (g) {
  return {
    layout: this.layout,
    clearChart: this.clearChart,
    willDrawChart: this.willDrawChart
  };
};

axes.prototype.layout = function (e) {
  var g = e.dygraph;

  if (g.getOptionForAxis('drawAxis', 'y')) {
    var w = g.getOptionForAxis('axisLabelWidth', 'y') + 2 * g.getOptionForAxis('axisTickSize', 'y');
    e.reserveSpaceLeft(w);
  }

  if (g.getOptionForAxis('drawAxis', 'x')) {
    var h;
    // NOTE: I think this is probably broken now, since g.getOption() now
    // hits the dictionary. (That is, g.getOption('xAxisHeight') now always
    // has a value.)
    if (g.getOption('xAxisHeight')) {
      h = g.getOption('xAxisHeight');
    } else {
      h = g.getOptionForAxis('axisLabelFontSize', 'x') + 2 * g.getOptionForAxis('axisTickSize', 'x');
    }
    e.reserveSpaceBottom(h);
  }

  if (g.numAxes() == 2) {
    if (g.getOptionForAxis('drawAxis', 'y2')) {
      var w = g.getOptionForAxis('axisLabelWidth', 'y2') + 2 * g.getOptionForAxis('axisTickSize', 'y2');
      e.reserveSpaceRight(w);
    }
  } else if (g.numAxes() > 2) {
    g.error('Only two y-axes are supported at this time. (Trying ' + 'to use ' + g.numAxes() + ')');
  }
};

axes.prototype.detachLabels = function () {
  function removeArray(ary) {
    for (var i = 0; i < ary.length; i++) {
      var el = ary[i];
      if (el.parentNode) el.parentNode.removeChild(el);
    }
  }

  removeArray(this.xlabels_);
  removeArray(this.ylabels_);
  this.xlabels_ = [];
  this.ylabels_ = [];
};

axes.prototype.clearChart = function (e) {
  this.detachLabels();
};

axes.prototype.willDrawChart = function (e) {
  var _this = this;

  var g = e.dygraph;

  if (!g.getOptionForAxis('drawAxis', 'x') && !g.getOptionForAxis('drawAxis', 'y') && !g.getOptionForAxis('drawAxis', 'y2')) {
    return;
  }

  // Round pixels to half-integer boundaries for crisper drawing.
  function halfUp(x) {
    return Math.round(x) + 0.5;
  }
  function halfDown(y) {
    return Math.round(y) - 0.5;
  }

  var context = e.drawingContext;
  var containerDiv = e.canvas.parentNode;
  var canvasWidth = g.width_; // e.canvas.width is affected by pixel ratio.
  var canvasHeight = g.height_;

  var label, x, y, tick, i;

  var makeLabelStyle = function makeLabelStyle(axis) {
    return {
      position: 'absolute',
      fontSize: g.getOptionForAxis('axisLabelFontSize', axis) + 'px',
      width: g.getOptionForAxis('axisLabelWidth', axis) + 'px'
    };
  };

  var labelStyles = {
    x: makeLabelStyle('x'),
    y: makeLabelStyle('y'),
    y2: makeLabelStyle('y2')
  };

  var makeDiv = function makeDiv(txt, axis, prec_axis) {
    /*
     * This seems to be called with the following three sets of axis/prec_axis:
     * x: undefined
     * y: y1
     * y: y2
     */
    var div = document.createElement('div');
    var labelStyle = labelStyles[prec_axis == 'y2' ? 'y2' : axis];
    utils.update(div.style, labelStyle);
    // TODO: combine outer & inner divs
    var inner_div = document.createElement('div');
    inner_div.className = 'dygraph-axis-label' + ' dygraph-axis-label-' + axis + (prec_axis ? ' dygraph-axis-label-' + prec_axis : '');
    inner_div.innerHTML = txt;
    div.appendChild(inner_div);
    return div;
  };

  // axis lines
  context.save();

  var layout = g.layout_;
  var area = e.dygraph.plotter_.area;

  // Helper for repeated axis-option accesses.
  var makeOptionGetter = function makeOptionGetter(axis) {
    return function (option) {
      return g.getOptionForAxis(option, axis);
    };
  };

  if (g.getOptionForAxis('drawAxis', 'y')) {
    if (layout.yticks && layout.yticks.length > 0) {
      var num_axes = g.numAxes();
      var getOptions = [makeOptionGetter('y'), makeOptionGetter('y2')];
      layout.yticks.forEach(function (tick) {
        if (tick.label === undefined) return; // this tick only has a grid line.
        x = area.x;
        var sgn = 1;
        var prec_axis = 'y1';
        var getAxisOption = getOptions[0];
        if (tick.axis == 1) {
          // right-side y-axis
          x = area.x + area.w;
          sgn = -1;
          prec_axis = 'y2';
          getAxisOption = getOptions[1];
        }
        var fontSize = getAxisOption('axisLabelFontSize');
        y = area.y + tick.pos * area.h;

        /* Tick marks are currently clipped, so don't bother drawing them.
        context.beginPath();
        context.moveTo(halfUp(x), halfDown(y));
        context.lineTo(halfUp(x - sgn * this.attr_('axisTickSize')), halfDown(y));
        context.closePath();
        context.stroke();
        */

        label = makeDiv(tick.label, 'y', num_axes == 2 ? prec_axis : null);
        var top = y - fontSize / 2;
        if (top < 0) top = 0;

        if (top + fontSize + 3 > canvasHeight) {
          label.style.bottom = '0';
        } else {
          label.style.top = top + 'px';
        }
        // TODO: replace these with css classes?
        if (tick.axis === 0) {
          label.style.left = area.x - getAxisOption('axisLabelWidth') - getAxisOption('axisTickSize') + 'px';
          label.style.textAlign = 'right';
        } else if (tick.axis == 1) {
          label.style.left = area.x + area.w + getAxisOption('axisTickSize') + 'px';
          label.style.textAlign = 'left';
        }
        label.style.width = getAxisOption('axisLabelWidth') + 'px';
        containerDiv.appendChild(label);
        _this.ylabels_.push(label);
      });

      // The lowest tick on the y-axis often overlaps with the leftmost
      // tick on the x-axis. Shift the bottom tick up a little bit to
      // compensate if necessary.
      var bottomTick = this.ylabels_[0];
      // Interested in the y2 axis also?
      var fontSize = g.getOptionForAxis('axisLabelFontSize', 'y');
      var bottom = parseInt(bottomTick.style.top, 10) + fontSize;
      if (bottom > canvasHeight - fontSize) {
        bottomTick.style.top = parseInt(bottomTick.style.top, 10) - fontSize / 2 + 'px';
      }
    }

    // draw a vertical line on the left to separate the chart from the labels.
    var axisX;
    if (g.getOption('drawAxesAtZero')) {
      var r = g.toPercentXCoord(0);
      if (r > 1 || r < 0 || isNaN(r)) r = 0;
      axisX = halfUp(area.x + r * area.w);
    } else {
      axisX = halfUp(area.x);
    }

    context.strokeStyle = g.getOptionForAxis('axisLineColor', 'y');
    context.lineWidth = g.getOptionForAxis('axisLineWidth', 'y');

    context.beginPath();
    context.moveTo(axisX, halfDown(area.y));
    context.lineTo(axisX, halfDown(area.y + area.h));
    context.closePath();
    context.stroke();

    // if there's a secondary y-axis, draw a vertical line for that, too.
    if (g.numAxes() == 2) {
      context.strokeStyle = g.getOptionForAxis('axisLineColor', 'y2');
      context.lineWidth = g.getOptionForAxis('axisLineWidth', 'y2');
      context.beginPath();
      context.moveTo(halfDown(area.x + area.w), halfDown(area.y));
      context.lineTo(halfDown(area.x + area.w), halfDown(area.y + area.h));
      context.closePath();
      context.stroke();
    }
  }

  if (g.getOptionForAxis('drawAxis', 'x')) {
    if (layout.xticks) {
      var getAxisOption = makeOptionGetter('x');
      layout.xticks.forEach(function (tick) {
        if (tick.label === undefined) return; // this tick only has a grid line.
        x = area.x + tick.pos * area.w;
        y = area.y + area.h;

        /* Tick marks are currently clipped, so don't bother drawing them.
        context.beginPath();
        context.moveTo(halfUp(x), halfDown(y));
        context.lineTo(halfUp(x), halfDown(y + this.attr_('axisTickSize')));
        context.closePath();
        context.stroke();
        */

        label = makeDiv(tick.label, 'x');
        label.style.textAlign = 'center';
        label.style.top = y + getAxisOption('axisTickSize') + 'px';

        var left = x - getAxisOption('axisLabelWidth') / 2;
        if (left + getAxisOption('axisLabelWidth') > canvasWidth) {
          left = canvasWidth - getAxisOption('axisLabelWidth');
          label.style.textAlign = 'right';
        }
        if (left < 0) {
          left = 0;
          label.style.textAlign = 'left';
        }

        label.style.left = left + 'px';
        label.style.width = getAxisOption('axisLabelWidth') + 'px';
        containerDiv.appendChild(label);
        _this.xlabels_.push(label);
      });
    }

    context.strokeStyle = g.getOptionForAxis('axisLineColor', 'x');
    context.lineWidth = g.getOptionForAxis('axisLineWidth', 'x');
    context.beginPath();
    var axisY;
    if (g.getOption('drawAxesAtZero')) {
      var r = g.toPercentYCoord(0, 0);
      if (r > 1 || r < 0) r = 1;
      axisY = halfDown(area.y + r * area.h);
    } else {
      axisY = halfDown(area.y + area.h);
    }
    context.moveTo(halfUp(area.x), axisY);
    context.lineTo(halfUp(area.x + area.w), axisY);
    context.closePath();
    context.stroke();
  }

  context.restore();
};

exports['default'] = axes;
module.exports = exports['default'];

/***/ }),
/* 26 */
/*!***************************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/plugins/chart-labels.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2012 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */
/*global Dygraph:false */



// TODO(danvk): move chart label options out of dygraphs and into the plugin.
// TODO(danvk): only tear down & rebuild the DIVs when it's necessary.

Object.defineProperty(exports, "__esModule", {
  value: true
});
var chart_labels = function chart_labels() {
  this.title_div_ = null;
  this.xlabel_div_ = null;
  this.ylabel_div_ = null;
  this.y2label_div_ = null;
};

chart_labels.prototype.toString = function () {
  return "ChartLabels Plugin";
};

chart_labels.prototype.activate = function (g) {
  return {
    layout: this.layout,
    // clearChart: this.clearChart,
    didDrawChart: this.didDrawChart
  };
};

// QUESTION: should there be a plugin-utils.js?
var createDivInRect = function createDivInRect(r) {
  var div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.left = r.x + 'px';
  div.style.top = r.y + 'px';
  div.style.width = r.w + 'px';
  div.style.height = r.h + 'px';
  return div;
};

// Detach and null out any existing nodes.
chart_labels.prototype.detachLabels_ = function () {
  var els = [this.title_div_, this.xlabel_div_, this.ylabel_div_, this.y2label_div_];
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    if (!el) continue;
    if (el.parentNode) el.parentNode.removeChild(el);
  }

  this.title_div_ = null;
  this.xlabel_div_ = null;
  this.ylabel_div_ = null;
  this.y2label_div_ = null;
};

var createRotatedDiv = function createRotatedDiv(g, box, axis, classes, html) {
  // TODO(danvk): is this outer div actually necessary?
  var div = document.createElement("div");
  div.style.position = 'absolute';
  if (axis == 1) {
    // NOTE: this is cheating. Should be positioned relative to the box.
    div.style.left = '0px';
  } else {
    div.style.left = box.x + 'px';
  }
  div.style.top = box.y + 'px';
  div.style.width = box.w + 'px';
  div.style.height = box.h + 'px';
  div.style.fontSize = g.getOption('yLabelWidth') - 2 + 'px';

  var inner_div = document.createElement("div");
  inner_div.style.position = 'absolute';
  inner_div.style.width = box.h + 'px';
  inner_div.style.height = box.w + 'px';
  inner_div.style.top = box.h / 2 - box.w / 2 + 'px';
  inner_div.style.left = box.w / 2 - box.h / 2 + 'px';
  // TODO: combine inner_div and class_div.
  inner_div.className = 'dygraph-label-rotate-' + (axis == 1 ? 'right' : 'left');

  var class_div = document.createElement("div");
  class_div.className = classes;
  class_div.innerHTML = html;

  inner_div.appendChild(class_div);
  div.appendChild(inner_div);
  return div;
};

chart_labels.prototype.layout = function (e) {
  this.detachLabels_();

  var g = e.dygraph;
  var div = e.chart_div;
  if (g.getOption('title')) {
    // QUESTION: should this return an absolutely-positioned div instead?
    var title_rect = e.reserveSpaceTop(g.getOption('titleHeight'));
    this.title_div_ = createDivInRect(title_rect);
    this.title_div_.style.fontSize = g.getOption('titleHeight') - 8 + 'px';

    var class_div = document.createElement("div");
    class_div.className = 'dygraph-label dygraph-title';
    class_div.innerHTML = g.getOption('title');
    this.title_div_.appendChild(class_div);
    div.appendChild(this.title_div_);
  }

  if (g.getOption('xlabel')) {
    var x_rect = e.reserveSpaceBottom(g.getOption('xLabelHeight'));
    this.xlabel_div_ = createDivInRect(x_rect);
    this.xlabel_div_.style.fontSize = g.getOption('xLabelHeight') - 2 + 'px';

    var class_div = document.createElement("div");
    class_div.className = 'dygraph-label dygraph-xlabel';
    class_div.innerHTML = g.getOption('xlabel');
    this.xlabel_div_.appendChild(class_div);
    div.appendChild(this.xlabel_div_);
  }

  if (g.getOption('ylabel')) {
    // It would make sense to shift the chart here to make room for the y-axis
    // label, but the default yAxisLabelWidth is large enough that this results
    // in overly-padded charts. The y-axis label should fit fine. If it
    // doesn't, the yAxisLabelWidth option can be increased.
    var y_rect = e.reserveSpaceLeft(0);

    this.ylabel_div_ = createRotatedDiv(g, y_rect, 1, // primary (left) y-axis
    'dygraph-label dygraph-ylabel', g.getOption('ylabel'));
    div.appendChild(this.ylabel_div_);
  }

  if (g.getOption('y2label') && g.numAxes() == 2) {
    // same logic applies here as for ylabel.
    var y2_rect = e.reserveSpaceRight(0);
    this.y2label_div_ = createRotatedDiv(g, y2_rect, 2, // secondary (right) y-axis
    'dygraph-label dygraph-y2label', g.getOption('y2label'));
    div.appendChild(this.y2label_div_);
  }
};

chart_labels.prototype.didDrawChart = function (e) {
  var g = e.dygraph;
  if (this.title_div_) {
    this.title_div_.children[0].innerHTML = g.getOption('title');
  }
  if (this.xlabel_div_) {
    this.xlabel_div_.children[0].innerHTML = g.getOption('xlabel');
  }
  if (this.ylabel_div_) {
    this.ylabel_div_.children[0].children[0].innerHTML = g.getOption('ylabel');
  }
  if (this.y2label_div_) {
    this.y2label_div_.children[0].children[0].innerHTML = g.getOption('y2label');
  }
};

chart_labels.prototype.clearChart = function () {};

chart_labels.prototype.destroy = function () {
  this.detachLabels_();
};

exports["default"] = chart_labels;
module.exports = exports["default"];

/***/ }),
/* 27 */
/*!*******************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/plugins/grid.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2012 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */
/*global Dygraph:false */

/*

Current bits of jankiness:
- Direct layout access
- Direct area access

*/



/**
 * Draws the gridlines, i.e. the gray horizontal & vertical lines running the
 * length of the chart.
 *
 * @constructor
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
var grid = function grid() {};

grid.prototype.toString = function () {
  return "Gridline Plugin";
};

grid.prototype.activate = function (g) {
  return {
    willDrawChart: this.willDrawChart
  };
};

grid.prototype.willDrawChart = function (e) {
  // Draw the new X/Y grid. Lines appear crisper when pixels are rounded to
  // half-integers. This prevents them from drawing in two rows/cols.
  var g = e.dygraph;
  var ctx = e.drawingContext;
  var layout = g.layout_;
  var area = e.dygraph.plotter_.area;

  function halfUp(x) {
    return Math.round(x) + 0.5;
  }
  function halfDown(y) {
    return Math.round(y) - 0.5;
  }

  var x, y, i, ticks;
  if (g.getOptionForAxis('drawGrid', 'y')) {
    var axes = ["y", "y2"];
    var strokeStyles = [],
        lineWidths = [],
        drawGrid = [],
        stroking = [],
        strokePattern = [];
    for (var i = 0; i < axes.length; i++) {
      drawGrid[i] = g.getOptionForAxis('drawGrid', axes[i]);
      if (drawGrid[i]) {
        strokeStyles[i] = g.getOptionForAxis('gridLineColor', axes[i]);
        lineWidths[i] = g.getOptionForAxis('gridLineWidth', axes[i]);
        strokePattern[i] = g.getOptionForAxis('gridLinePattern', axes[i]);
        stroking[i] = strokePattern[i] && strokePattern[i].length >= 2;
      }
    }
    ticks = layout.yticks;
    ctx.save();
    // draw grids for the different y axes
    ticks.forEach(function (tick) {
      if (!tick.has_tick) return;
      var axis = tick.axis;
      if (drawGrid[axis]) {
        ctx.save();
        if (stroking[axis]) {
          if (ctx.setLineDash) ctx.setLineDash(strokePattern[axis]);
        }
        ctx.strokeStyle = strokeStyles[axis];
        ctx.lineWidth = lineWidths[axis];

        x = halfUp(area.x);
        y = halfDown(area.y + tick.pos * area.h);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + area.w, y);
        ctx.stroke();

        ctx.restore();
      }
    });
    ctx.restore();
  }

  // draw grid for x axis
  if (g.getOptionForAxis('drawGrid', 'x')) {
    ticks = layout.xticks;
    ctx.save();
    var strokePattern = g.getOptionForAxis('gridLinePattern', 'x');
    var stroking = strokePattern && strokePattern.length >= 2;
    if (stroking) {
      if (ctx.setLineDash) ctx.setLineDash(strokePattern);
    }
    ctx.strokeStyle = g.getOptionForAxis('gridLineColor', 'x');
    ctx.lineWidth = g.getOptionForAxis('gridLineWidth', 'x');
    ticks.forEach(function (tick) {
      if (!tick.has_tick) return;
      x = halfUp(area.x + tick.pos * area.w);
      y = halfDown(area.y + area.h);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, area.y);
      ctx.closePath();
      ctx.stroke();
    });
    if (stroking) {
      if (ctx.setLineDash) ctx.setLineDash([]);
    }
    ctx.restore();
  }
};

grid.prototype.destroy = function () {};

exports["default"] = grid;
module.exports = exports["default"];

/***/ }),
/* 28 */
/*!*********************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/plugins/legend.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2012 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */
/*global Dygraph:false */

/*
Current bits of jankiness:
- Uses two private APIs:
    1. Dygraph.optionsViewForAxis_
    2. dygraph.plotter_.area
- Registers for a "predraw" event, which should be renamed.
- I call calculateEmWidthInDiv more often than needed.
*/

/*global Dygraph:false */


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _dygraphUtils = __webpack_require__(/*! ../dygraph-utils */ 0);

var utils = _interopRequireWildcard(_dygraphUtils);

/**
 * Creates the legend, which appears when the user hovers over the chart.
 * The legend can be either a user-specified or generated div.
 *
 * @constructor
 */
var Legend = function Legend() {
  this.legend_div_ = null;
  this.is_generated_div_ = false; // do we own this div, or was it user-specified?
};

Legend.prototype.toString = function () {
  return "Legend Plugin";
};

/**
 * This is called during the dygraph constructor, after options have been set
 * but before the data is available.
 *
 * Proper tasks to do here include:
 * - Reading your own options
 * - DOM manipulation
 * - Registering event listeners
 *
 * @param {Dygraph} g Graph instance.
 * @return {object.<string, function(ev)>} Mapping of event names to callbacks.
 */
Legend.prototype.activate = function (g) {
  var div;

  var userLabelsDiv = g.getOption('labelsDiv');
  if (userLabelsDiv && null !== userLabelsDiv) {
    if (typeof userLabelsDiv == "string" || userLabelsDiv instanceof String) {
      div = document.getElementById(userLabelsDiv);
    } else {
      div = userLabelsDiv;
    }
  } else {
    div = document.createElement("div");
    div.className = "dygraph-legend";
    // TODO(danvk): come up with a cleaner way to expose this.
    g.graphDiv.appendChild(div);
    this.is_generated_div_ = true;
  }

  this.legend_div_ = div;
  this.one_em_width_ = 10; // just a guess, will be updated.

  return {
    select: this.select,
    deselect: this.deselect,
    // TODO(danvk): rethink the name "predraw" before we commit to it in any API.
    predraw: this.predraw,
    didDrawChart: this.didDrawChart
  };
};

// Needed for dashed lines.
var calculateEmWidthInDiv = function calculateEmWidthInDiv(div) {
  var sizeSpan = document.createElement('span');
  sizeSpan.setAttribute('style', 'margin: 0; padding: 0 0 0 1em; border: 0;');
  div.appendChild(sizeSpan);
  var oneEmWidth = sizeSpan.offsetWidth;
  div.removeChild(sizeSpan);
  return oneEmWidth;
};

var escapeHTML = function escapeHTML(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

Legend.prototype.select = function (e) {
  var xValue = e.selectedX;
  var points = e.selectedPoints;
  var row = e.selectedRow;

  var legendMode = e.dygraph.getOption('legend');
  if (legendMode === 'never') {
    this.legend_div_.style.display = 'none';
    return;
  }

  if (legendMode === 'follow') {
    // create floating legend div
    var area = e.dygraph.plotter_.area;
    var labelsDivWidth = this.legend_div_.offsetWidth;
    var yAxisLabelWidth = e.dygraph.getOptionForAxis('axisLabelWidth', 'y');
    // determine floating [left, top] coordinates of the legend div
    // within the plotter_ area
    // offset 50 px to the right and down from the first selection point
    // 50 px is guess based on mouse cursor size
    var leftLegend = points[0].x * area.w + 50;
    var topLegend = points[0].y * area.h - 50;

    // if legend floats to end of the chart area, it flips to the other
    // side of the selection point
    if (leftLegend + labelsDivWidth + 1 > area.w) {
      leftLegend = leftLegend - 2 * 50 - labelsDivWidth - (yAxisLabelWidth - area.x);
    }

    e.dygraph.graphDiv.appendChild(this.legend_div_);
    this.legend_div_.style.left = yAxisLabelWidth + leftLegend + "px";
    this.legend_div_.style.top = topLegend + "px";
  }

  var html = Legend.generateLegendHTML(e.dygraph, xValue, points, this.one_em_width_, row);
  this.legend_div_.innerHTML = html;
  this.legend_div_.style.display = '';
};

Legend.prototype.deselect = function (e) {
  var legendMode = e.dygraph.getOption('legend');
  if (legendMode !== 'always') {
    this.legend_div_.style.display = "none";
  }

  // Have to do this every time, since styles might have changed.
  var oneEmWidth = calculateEmWidthInDiv(this.legend_div_);
  this.one_em_width_ = oneEmWidth;

  var html = Legend.generateLegendHTML(e.dygraph, undefined, undefined, oneEmWidth, null);
  this.legend_div_.innerHTML = html;
};

Legend.prototype.didDrawChart = function (e) {
  this.deselect(e);
};

// Right edge should be flush with the right edge of the charting area (which
// may not be the same as the right edge of the div, if we have two y-axes.
// TODO(danvk): is any of this really necessary? Could just set "right" in "activate".
/**
 * Position the labels div so that:
 * - its right edge is flush with the right edge of the charting area
 * - its top edge is flush with the top edge of the charting area
 * @private
 */
Legend.prototype.predraw = function (e) {
  // Don't touch a user-specified labelsDiv.
  if (!this.is_generated_div_) return;

  // TODO(danvk): only use real APIs for this.
  e.dygraph.graphDiv.appendChild(this.legend_div_);
  var area = e.dygraph.getArea();
  var labelsDivWidth = this.legend_div_.offsetWidth;
  this.legend_div_.style.left = area.x + area.w - labelsDivWidth - 1 + "px";
  this.legend_div_.style.top = area.y + "px";
};

/**
 * Called when dygraph.destroy() is called.
 * You should null out any references and detach any DOM elements.
 */
Legend.prototype.destroy = function () {
  this.legend_div_ = null;
};

/**
 * Generates HTML for the legend which is displayed when hovering over the
 * chart. If no selected points are specified, a default legend is returned
 * (this may just be the empty string).
 * @param {number} x The x-value of the selected points.
 * @param {Object} sel_points List of selected points for the given
 *   x-value. Should have properties like 'name', 'yval' and 'canvasy'.
 * @param {number} oneEmWidth The pixel width for 1em in the legend. Only
 *   relevant when displaying a legend with no selection (i.e. {legend:
 *   'always'}) and with dashed lines.
 * @param {number} row The selected row index.
 * @private
 */
Legend.generateLegendHTML = function (g, x, sel_points, oneEmWidth, row) {
  // Data about the selection to pass to legendFormatter
  var data = {
    dygraph: g,
    x: x,
    series: []
  };

  var labelToSeries = {};
  var labels = g.getLabels();
  if (labels) {
    for (var i = 1; i < labels.length; i++) {
      var series = g.getPropertiesForSeries(labels[i]);
      var strokePattern = g.getOption('strokePattern', labels[i]);
      var seriesData = {
        dashHTML: generateLegendDashHTML(strokePattern, series.color, oneEmWidth),
        label: labels[i],
        labelHTML: escapeHTML(labels[i]),
        isVisible: series.visible,
        color: series.color
      };

      data.series.push(seriesData);
      labelToSeries[labels[i]] = seriesData;
    }
  }

  if (typeof x !== 'undefined') {
    var xOptView = g.optionsViewForAxis_('x');
    var xvf = xOptView('valueFormatter');
    data.xHTML = xvf.call(g, x, xOptView, labels[0], g, row, 0);

    var yOptViews = [];
    var num_axes = g.numAxes();
    for (var i = 0; i < num_axes; i++) {
      // TODO(danvk): remove this use of a private API
      yOptViews[i] = g.optionsViewForAxis_('y' + (i ? 1 + i : ''));
    }

    var showZeros = g.getOption('labelsShowZeroValues');
    var highlightSeries = g.getHighlightSeries();
    for (i = 0; i < sel_points.length; i++) {
      var pt = sel_points[i];
      var seriesData = labelToSeries[pt.name];
      seriesData.y = pt.yval;

      if (pt.yval === 0 && !showZeros || isNaN(pt.canvasy)) {
        seriesData.isVisible = false;
        continue;
      }

      var series = g.getPropertiesForSeries(pt.name);
      var yOptView = yOptViews[series.axis - 1];
      var fmtFunc = yOptView('valueFormatter');
      var yHTML = fmtFunc.call(g, pt.yval, yOptView, pt.name, g, row, labels.indexOf(pt.name));

      utils.update(seriesData, { yHTML: yHTML });

      if (pt.name == highlightSeries) {
        seriesData.isHighlighted = true;
      }
    }
  }

  var formatter = g.getOption('legendFormatter') || Legend.defaultFormatter;
  return formatter.call(g, data);
};

Legend.defaultFormatter = function (data) {
  var g = data.dygraph;

  // TODO(danvk): deprecate this option in place of {legend: 'never'}
  // XXX should this logic be in the formatter?
  if (g.getOption('showLabelsOnHighlight') !== true) return '';

  var sepLines = g.getOption('labelsSeparateLines');
  var html;

  if (typeof data.x === 'undefined') {
    // TODO: this check is duplicated in generateLegendHTML. Put it in one place.
    if (g.getOption('legend') != 'always') {
      return '';
    }

    html = '';
    for (var i = 0; i < data.series.length; i++) {
      var series = data.series[i];
      if (!series.isVisible) continue;

      if (html !== '') html += sepLines ? '<br/>' : ' ';
      html += "<span style='font-weight: bold; color: " + series.color + ";'>" + series.dashHTML + " " + series.labelHTML + "</span>";
    }
    return html;
  }

  html = data.xHTML + ':';
  for (var i = 0; i < data.series.length; i++) {
    var series = data.series[i];
    if (!series.isVisible) continue;
    if (sepLines) html += '<br>';
    var cls = series.isHighlighted ? ' class="highlight"' : '';
    html += "<span" + cls + "> <b><span style='color: " + series.color + ";'>" + series.labelHTML + "</span></b>:&#160;" + series.yHTML + "</span>";
  }
  return html;
};

/**
 * Generates html for the "dash" displayed on the legend when using "legend: always".
 * In particular, this works for dashed lines with any stroke pattern. It will
 * try to scale the pattern to fit in 1em width. Or if small enough repeat the
 * pattern for 1em width.
 *
 * @param strokePattern The pattern
 * @param color The color of the series.
 * @param oneEmWidth The width in pixels of 1em in the legend.
 * @private
 */
// TODO(danvk): cache the results of this
function generateLegendDashHTML(strokePattern, color, oneEmWidth) {
  // Easy, common case: a solid line
  if (!strokePattern || strokePattern.length <= 1) {
    return "<div class=\"dygraph-legend-line\" style=\"border-bottom-color: " + color + ";\"></div>";
  }

  var i, j, paddingLeft, marginRight;
  var strokePixelLength = 0,
      segmentLoop = 0;
  var normalizedPattern = [];
  var loop;

  // Compute the length of the pixels including the first segment twice,
  // since we repeat it.
  for (i = 0; i <= strokePattern.length; i++) {
    strokePixelLength += strokePattern[i % strokePattern.length];
  }

  // See if we can loop the pattern by itself at least twice.
  loop = Math.floor(oneEmWidth / (strokePixelLength - strokePattern[0]));
  if (loop > 1) {
    // This pattern fits at least two times, no scaling just convert to em;
    for (i = 0; i < strokePattern.length; i++) {
      normalizedPattern[i] = strokePattern[i] / oneEmWidth;
    }
    // Since we are repeating the pattern, we don't worry about repeating the
    // first segment in one draw.
    segmentLoop = normalizedPattern.length;
  } else {
    // If the pattern doesn't fit in the legend we scale it to fit.
    loop = 1;
    for (i = 0; i < strokePattern.length; i++) {
      normalizedPattern[i] = strokePattern[i] / strokePixelLength;
    }
    // For the scaled patterns we do redraw the first segment.
    segmentLoop = normalizedPattern.length + 1;
  }

  // Now make the pattern.
  var dash = "";
  for (j = 0; j < loop; j++) {
    for (i = 0; i < segmentLoop; i += 2) {
      // The padding is the drawn segment.
      paddingLeft = normalizedPattern[i % normalizedPattern.length];
      if (i < strokePattern.length) {
        // The margin is the space segment.
        marginRight = normalizedPattern[(i + 1) % normalizedPattern.length];
      } else {
        // The repeated first segment has no right margin.
        marginRight = 0;
      }
      dash += "<div class=\"dygraph-legend-dash\" style=\"margin-right: " + marginRight + "em; padding-left: " + paddingLeft + "em;\"></div>";
    }
  }
  return dash;
};

exports["default"] = Legend;
module.exports = exports["default"];

/***/ }),
/* 29 */
/*!*****************************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/plugins/range-selector.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2011 Paul Felix (paul.eric.felix@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */
/*global Dygraph:false,TouchEvent:false */

/**
 * @fileoverview This file contains the RangeSelector plugin used to provide
 * a timeline range selector widget for dygraphs.
 */

/*global Dygraph:false */


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dygraphUtils = __webpack_require__(/*! ../dygraph-utils */ 0);

var utils = _interopRequireWildcard(_dygraphUtils);

var _dygraphInteractionModel = __webpack_require__(/*! ../dygraph-interaction-model */ 5);

var _dygraphInteractionModel2 = _interopRequireDefault(_dygraphInteractionModel);

var _iframeTarp = __webpack_require__(/*! ../iframe-tarp */ 13);

var _iframeTarp2 = _interopRequireDefault(_iframeTarp);

var rangeSelector = function rangeSelector() {
  this.hasTouchInterface_ = typeof TouchEvent != 'undefined';
  this.isMobileDevice_ = /mobile|android/gi.test(navigator.appVersion);
  this.interfaceCreated_ = false;
};

rangeSelector.prototype.toString = function () {
  return "RangeSelector Plugin";
};

rangeSelector.prototype.activate = function (dygraph) {
  this.dygraph_ = dygraph;
  if (this.getOption_('showRangeSelector')) {
    this.createInterface_();
  }
  return {
    layout: this.reserveSpace_,
    predraw: this.renderStaticLayer_,
    didDrawChart: this.renderInteractiveLayer_
  };
};

rangeSelector.prototype.destroy = function () {
  this.bgcanvas_ = null;
  this.fgcanvas_ = null;
  this.leftZoomHandle_ = null;
  this.rightZoomHandle_ = null;
};

//------------------------------------------------------------------
// Private methods
//------------------------------------------------------------------

rangeSelector.prototype.getOption_ = function (name, opt_series) {
  return this.dygraph_.getOption(name, opt_series);
};

rangeSelector.prototype.setDefaultOption_ = function (name, value) {
  this.dygraph_.attrs_[name] = value;
};

/**
 * @private
 * Creates the range selector elements and adds them to the graph.
 */
rangeSelector.prototype.createInterface_ = function () {
  this.createCanvases_();
  this.createZoomHandles_();
  this.initInteraction_();

  // Range selector and animatedZooms have a bad interaction. See issue 359.
  if (this.getOption_('animatedZooms')) {
    console.warn('Animated zooms and range selector are not compatible; disabling animatedZooms.');
    this.dygraph_.updateOptions({ animatedZooms: false }, true);
  }

  this.interfaceCreated_ = true;
  this.addToGraph_();
};

/**
 * @private
 * Adds the range selector to the graph.
 */
rangeSelector.prototype.addToGraph_ = function () {
  var graphDiv = this.graphDiv_ = this.dygraph_.graphDiv;
  graphDiv.appendChild(this.bgcanvas_);
  graphDiv.appendChild(this.fgcanvas_);
  graphDiv.appendChild(this.leftZoomHandle_);
  graphDiv.appendChild(this.rightZoomHandle_);
};

/**
 * @private
 * Removes the range selector from the graph.
 */
rangeSelector.prototype.removeFromGraph_ = function () {
  var graphDiv = this.graphDiv_;
  graphDiv.removeChild(this.bgcanvas_);
  graphDiv.removeChild(this.fgcanvas_);
  graphDiv.removeChild(this.leftZoomHandle_);
  graphDiv.removeChild(this.rightZoomHandle_);
  this.graphDiv_ = null;
};

/**
 * @private
 * Called by Layout to allow range selector to reserve its space.
 */
rangeSelector.prototype.reserveSpace_ = function (e) {
  if (this.getOption_('showRangeSelector')) {
    e.reserveSpaceBottom(this.getOption_('rangeSelectorHeight') + 4);
  }
};

/**
 * @private
 * Renders the static portion of the range selector at the predraw stage.
 */
rangeSelector.prototype.renderStaticLayer_ = function () {
  if (!this.updateVisibility_()) {
    return;
  }
  this.resize_();
  this.drawStaticLayer_();
};

/**
 * @private
 * Renders the interactive portion of the range selector after the chart has been drawn.
 */
rangeSelector.prototype.renderInteractiveLayer_ = function () {
  if (!this.updateVisibility_() || this.isChangingRange_) {
    return;
  }
  this.placeZoomHandles_();
  this.drawInteractiveLayer_();
};

/**
 * @private
 * Check to see if the range selector is enabled/disabled and update visibility accordingly.
 */
rangeSelector.prototype.updateVisibility_ = function () {
  var enabled = this.getOption_('showRangeSelector');
  if (enabled) {
    if (!this.interfaceCreated_) {
      this.createInterface_();
    } else if (!this.graphDiv_ || !this.graphDiv_.parentNode) {
      this.addToGraph_();
    }
  } else if (this.graphDiv_) {
    this.removeFromGraph_();
    var dygraph = this.dygraph_;
    setTimeout(function () {
      dygraph.width_ = 0;dygraph.resize();
    }, 1);
  }
  return enabled;
};

/**
 * @private
 * Resizes the range selector.
 */
rangeSelector.prototype.resize_ = function () {
  function setElementRect(canvas, context, rect, pixelRatioOption) {
    var canvasScale = pixelRatioOption || utils.getContextPixelRatio(context);

    canvas.style.top = rect.y + 'px';
    canvas.style.left = rect.x + 'px';
    canvas.width = rect.w * canvasScale;
    canvas.height = rect.h * canvasScale;
    canvas.style.width = rect.w + 'px';
    canvas.style.height = rect.h + 'px';

    if (canvasScale != 1) {
      context.scale(canvasScale, canvasScale);
    }
  }

  var plotArea = this.dygraph_.layout_.getPlotArea();

  var xAxisLabelHeight = 0;
  if (this.dygraph_.getOptionForAxis('drawAxis', 'x')) {
    xAxisLabelHeight = this.getOption_('xAxisHeight') || this.getOption_('axisLabelFontSize') + 2 * this.getOption_('axisTickSize');
  }
  this.canvasRect_ = {
    x: plotArea.x,
    y: plotArea.y + plotArea.h + xAxisLabelHeight + 4,
    w: plotArea.w,
    h: this.getOption_('rangeSelectorHeight')
  };

  var pixelRatioOption = this.dygraph_.getNumericOption('pixelRatio');
  setElementRect(this.bgcanvas_, this.bgcanvas_ctx_, this.canvasRect_, pixelRatioOption);
  setElementRect(this.fgcanvas_, this.fgcanvas_ctx_, this.canvasRect_, pixelRatioOption);
};

/**
 * @private
 * Creates the background and foreground canvases.
 */
rangeSelector.prototype.createCanvases_ = function () {
  this.bgcanvas_ = utils.createCanvas();
  this.bgcanvas_.className = 'dygraph-rangesel-bgcanvas';
  this.bgcanvas_.style.position = 'absolute';
  this.bgcanvas_.style.zIndex = 9;
  this.bgcanvas_ctx_ = utils.getContext(this.bgcanvas_);

  this.fgcanvas_ = utils.createCanvas();
  this.fgcanvas_.className = 'dygraph-rangesel-fgcanvas';
  this.fgcanvas_.style.position = 'absolute';
  this.fgcanvas_.style.zIndex = 9;
  this.fgcanvas_.style.cursor = 'default';
  this.fgcanvas_ctx_ = utils.getContext(this.fgcanvas_);
};

/**
 * @private
 * Creates the zoom handle elements.
 */
rangeSelector.prototype.createZoomHandles_ = function () {
  var img = new Image();
  img.className = 'dygraph-rangesel-zoomhandle';
  img.style.position = 'absolute';
  img.style.zIndex = 10;
  img.style.visibility = 'hidden'; // Initially hidden so they don't show up in the wrong place.
  img.style.cursor = 'col-resize';
  // TODO: change image to more options
  img.width = 9;
  img.height = 16;
  img.src = 'data:image/png;base64,' + 'iVBORw0KGgoAAAANSUhEUgAAAAkAAAAQCAYAAADESFVDAAAAAXNSR0IArs4c6QAAAAZiS0dEANAA' + 'zwDP4Z7KegAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9sHGw0cMqdt1UwAAAAZdEVYdENv' + 'bW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAaElEQVQoz+3SsRFAQBCF4Z9WJM8KCDVwownl' + '6YXsTmCUsyKGkZzcl7zkz3YLkypgAnreFmDEpHkIwVOMfpdi9CEEN2nGpFdwD03yEqDtOgCaun7s' + 'qSTDH32I1pQA2Pb9sZecAxc5r3IAb21d6878xsAAAAAASUVORK5CYII=';

  if (this.isMobileDevice_) {
    img.width *= 2;
    img.height *= 2;
  }

  this.leftZoomHandle_ = img;
  this.rightZoomHandle_ = img.cloneNode(false);
};

/**
 * @private
 * Sets up the interaction for the range selector.
 */
rangeSelector.prototype.initInteraction_ = function () {
  var self = this;
  var topElem = document;
  var clientXLast = 0;
  var handle = null;
  var isZooming = false;
  var isPanning = false;
  var dynamic = !this.isMobileDevice_;

  // We cover iframes during mouse interactions. See comments in
  // dygraph-utils.js for more info on why this is a good idea.
  var tarp = new _iframeTarp2['default']();

  // functions, defined below.  Defining them this way (rather than with
  // "function foo() {...}" makes JSHint happy.
  var toXDataWindow, onZoomStart, onZoom, onZoomEnd, doZoom, isMouseInPanZone, onPanStart, onPan, onPanEnd, doPan, onCanvasHover;

  // Touch event functions
  var onZoomHandleTouchEvent, onCanvasTouchEvent, addTouchEvents;

  toXDataWindow = function (zoomHandleStatus) {
    var xDataLimits = self.dygraph_.xAxisExtremes();
    var fact = (xDataLimits[1] - xDataLimits[0]) / self.canvasRect_.w;
    var xDataMin = xDataLimits[0] + (zoomHandleStatus.leftHandlePos - self.canvasRect_.x) * fact;
    var xDataMax = xDataLimits[0] + (zoomHandleStatus.rightHandlePos - self.canvasRect_.x) * fact;
    return [xDataMin, xDataMax];
  };

  onZoomStart = function (e) {
    utils.cancelEvent(e);
    isZooming = true;
    clientXLast = e.clientX;
    handle = e.target ? e.target : e.srcElement;
    if (e.type === 'mousedown' || e.type === 'dragstart') {
      // These events are removed manually.
      utils.addEvent(topElem, 'mousemove', onZoom);
      utils.addEvent(topElem, 'mouseup', onZoomEnd);
    }
    self.fgcanvas_.style.cursor = 'col-resize';
    tarp.cover();
    return true;
  };

  onZoom = function (e) {
    if (!isZooming) {
      return false;
    }
    utils.cancelEvent(e);

    var delX = e.clientX - clientXLast;
    if (Math.abs(delX) < 4) {
      return true;
    }
    clientXLast = e.clientX;

    // Move handle.
    var zoomHandleStatus = self.getZoomHandleStatus_();
    var newPos;
    if (handle == self.leftZoomHandle_) {
      newPos = zoomHandleStatus.leftHandlePos + delX;
      newPos = Math.min(newPos, zoomHandleStatus.rightHandlePos - handle.width - 3);
      newPos = Math.max(newPos, self.canvasRect_.x);
    } else {
      newPos = zoomHandleStatus.rightHandlePos + delX;
      newPos = Math.min(newPos, self.canvasRect_.x + self.canvasRect_.w);
      newPos = Math.max(newPos, zoomHandleStatus.leftHandlePos + handle.width + 3);
    }
    var halfHandleWidth = handle.width / 2;
    handle.style.left = newPos - halfHandleWidth + 'px';
    self.drawInteractiveLayer_();

    // Zoom on the fly.
    if (dynamic) {
      doZoom();
    }
    return true;
  };

  onZoomEnd = function (e) {
    if (!isZooming) {
      return false;
    }
    isZooming = false;
    tarp.uncover();
    utils.removeEvent(topElem, 'mousemove', onZoom);
    utils.removeEvent(topElem, 'mouseup', onZoomEnd);
    self.fgcanvas_.style.cursor = 'default';

    // If on a slower device, zoom now.
    if (!dynamic) {
      doZoom();
    }
    return true;
  };

  doZoom = function () {
    try {
      var zoomHandleStatus = self.getZoomHandleStatus_();
      self.isChangingRange_ = true;
      if (!zoomHandleStatus.isZoomed) {
        self.dygraph_.resetZoom();
      } else {
        var xDataWindow = toXDataWindow(zoomHandleStatus);
        self.dygraph_.doZoomXDates_(xDataWindow[0], xDataWindow[1]);
      }
    } finally {
      self.isChangingRange_ = false;
    }
  };

  isMouseInPanZone = function (e) {
    var rect = self.leftZoomHandle_.getBoundingClientRect();
    var leftHandleClientX = rect.left + rect.width / 2;
    rect = self.rightZoomHandle_.getBoundingClientRect();
    var rightHandleClientX = rect.left + rect.width / 2;
    return e.clientX > leftHandleClientX && e.clientX < rightHandleClientX;
  };

  onPanStart = function (e) {
    if (!isPanning && isMouseInPanZone(e) && self.getZoomHandleStatus_().isZoomed) {
      utils.cancelEvent(e);
      isPanning = true;
      clientXLast = e.clientX;
      if (e.type === 'mousedown') {
        // These events are removed manually.
        utils.addEvent(topElem, 'mousemove', onPan);
        utils.addEvent(topElem, 'mouseup', onPanEnd);
      }
      return true;
    }
    return false;
  };

  onPan = function (e) {
    if (!isPanning) {
      return false;
    }
    utils.cancelEvent(e);

    var delX = e.clientX - clientXLast;
    if (Math.abs(delX) < 4) {
      return true;
    }
    clientXLast = e.clientX;

    // Move range view
    var zoomHandleStatus = self.getZoomHandleStatus_();
    var leftHandlePos = zoomHandleStatus.leftHandlePos;
    var rightHandlePos = zoomHandleStatus.rightHandlePos;
    var rangeSize = rightHandlePos - leftHandlePos;
    if (leftHandlePos + delX <= self.canvasRect_.x) {
      leftHandlePos = self.canvasRect_.x;
      rightHandlePos = leftHandlePos + rangeSize;
    } else if (rightHandlePos + delX >= self.canvasRect_.x + self.canvasRect_.w) {
      rightHandlePos = self.canvasRect_.x + self.canvasRect_.w;
      leftHandlePos = rightHandlePos - rangeSize;
    } else {
      leftHandlePos += delX;
      rightHandlePos += delX;
    }
    var halfHandleWidth = self.leftZoomHandle_.width / 2;
    self.leftZoomHandle_.style.left = leftHandlePos - halfHandleWidth + 'px';
    self.rightZoomHandle_.style.left = rightHandlePos - halfHandleWidth + 'px';
    self.drawInteractiveLayer_();

    // Do pan on the fly.
    if (dynamic) {
      doPan();
    }
    return true;
  };

  onPanEnd = function (e) {
    if (!isPanning) {
      return false;
    }
    isPanning = false;
    utils.removeEvent(topElem, 'mousemove', onPan);
    utils.removeEvent(topElem, 'mouseup', onPanEnd);
    // If on a slower device, do pan now.
    if (!dynamic) {
      doPan();
    }
    return true;
  };

  doPan = function () {
    try {
      self.isChangingRange_ = true;
      self.dygraph_.dateWindow_ = toXDataWindow(self.getZoomHandleStatus_());
      self.dygraph_.drawGraph_(false);
    } finally {
      self.isChangingRange_ = false;
    }
  };

  onCanvasHover = function (e) {
    if (isZooming || isPanning) {
      return;
    }
    var cursor = isMouseInPanZone(e) ? 'move' : 'default';
    if (cursor != self.fgcanvas_.style.cursor) {
      self.fgcanvas_.style.cursor = cursor;
    }
  };

  onZoomHandleTouchEvent = function (e) {
    if (e.type == 'touchstart' && e.targetTouches.length == 1) {
      if (onZoomStart(e.targetTouches[0])) {
        utils.cancelEvent(e);
      }
    } else if (e.type == 'touchmove' && e.targetTouches.length == 1) {
      if (onZoom(e.targetTouches[0])) {
        utils.cancelEvent(e);
      }
    } else {
      onZoomEnd(e);
    }
  };

  onCanvasTouchEvent = function (e) {
    if (e.type == 'touchstart' && e.targetTouches.length == 1) {
      if (onPanStart(e.targetTouches[0])) {
        utils.cancelEvent(e);
      }
    } else if (e.type == 'touchmove' && e.targetTouches.length == 1) {
      if (onPan(e.targetTouches[0])) {
        utils.cancelEvent(e);
      }
    } else {
      onPanEnd(e);
    }
  };

  addTouchEvents = function (elem, fn) {
    var types = ['touchstart', 'touchend', 'touchmove', 'touchcancel'];
    for (var i = 0; i < types.length; i++) {
      self.dygraph_.addAndTrackEvent(elem, types[i], fn);
    }
  };

  this.setDefaultOption_('interactionModel', _dygraphInteractionModel2['default'].dragIsPanInteractionModel);
  this.setDefaultOption_('panEdgeFraction', 0.0001);

  var dragStartEvent = window.opera ? 'mousedown' : 'dragstart';
  this.dygraph_.addAndTrackEvent(this.leftZoomHandle_, dragStartEvent, onZoomStart);
  this.dygraph_.addAndTrackEvent(this.rightZoomHandle_, dragStartEvent, onZoomStart);

  this.dygraph_.addAndTrackEvent(this.fgcanvas_, 'mousedown', onPanStart);
  this.dygraph_.addAndTrackEvent(this.fgcanvas_, 'mousemove', onCanvasHover);

  // Touch events
  if (this.hasTouchInterface_) {
    addTouchEvents(this.leftZoomHandle_, onZoomHandleTouchEvent);
    addTouchEvents(this.rightZoomHandle_, onZoomHandleTouchEvent);
    addTouchEvents(this.fgcanvas_, onCanvasTouchEvent);
  }
};

/**
 * @private
 * Draws the static layer in the background canvas.
 */
rangeSelector.prototype.drawStaticLayer_ = function () {
  var ctx = this.bgcanvas_ctx_;
  ctx.clearRect(0, 0, this.canvasRect_.w, this.canvasRect_.h);
  try {
    this.drawMiniPlot_();
  } catch (ex) {
    console.warn(ex);
  }

  var margin = 0.5;
  this.bgcanvas_ctx_.lineWidth = this.getOption_('rangeSelectorBackgroundLineWidth');
  ctx.strokeStyle = this.getOption_('rangeSelectorBackgroundStrokeColor');
  ctx.beginPath();
  ctx.moveTo(margin, margin);
  ctx.lineTo(margin, this.canvasRect_.h - margin);
  ctx.lineTo(this.canvasRect_.w - margin, this.canvasRect_.h - margin);
  ctx.lineTo(this.canvasRect_.w - margin, margin);
  ctx.stroke();
};

/**
 * @private
 * Draws the mini plot in the background canvas.
 */
rangeSelector.prototype.drawMiniPlot_ = function () {
  var fillStyle = this.getOption_('rangeSelectorPlotFillColor');
  var fillGradientStyle = this.getOption_('rangeSelectorPlotFillGradientColor');
  var strokeStyle = this.getOption_('rangeSelectorPlotStrokeColor');
  if (!fillStyle && !strokeStyle) {
    return;
  }

  var stepPlot = this.getOption_('stepPlot');

  var combinedSeriesData = this.computeCombinedSeriesAndLimits_();
  var yRange = combinedSeriesData.yMax - combinedSeriesData.yMin;

  // Draw the mini plot.
  var ctx = this.bgcanvas_ctx_;
  var margin = 0.5;

  var xExtremes = this.dygraph_.xAxisExtremes();
  var xRange = Math.max(xExtremes[1] - xExtremes[0], 1.e-30);
  var xFact = (this.canvasRect_.w - margin) / xRange;
  var yFact = (this.canvasRect_.h - margin) / yRange;
  var canvasWidth = this.canvasRect_.w - margin;
  var canvasHeight = this.canvasRect_.h - margin;

  var prevX = null,
      prevY = null;

  ctx.beginPath();
  ctx.moveTo(margin, canvasHeight);
  for (var i = 0; i < combinedSeriesData.data.length; i++) {
    var dataPoint = combinedSeriesData.data[i];
    var x = dataPoint[0] !== null ? (dataPoint[0] - xExtremes[0]) * xFact : NaN;
    var y = dataPoint[1] !== null ? canvasHeight - (dataPoint[1] - combinedSeriesData.yMin) * yFact : NaN;

    // Skip points that don't change the x-value. Overly fine-grained points
    // can cause major slowdowns with the ctx.fill() call below.
    if (!stepPlot && prevX !== null && Math.round(x) == Math.round(prevX)) {
      continue;
    }

    if (isFinite(x) && isFinite(y)) {
      if (prevX === null) {
        ctx.lineTo(x, canvasHeight);
      } else if (stepPlot) {
        ctx.lineTo(x, prevY);
      }
      ctx.lineTo(x, y);
      prevX = x;
      prevY = y;
    } else {
      if (prevX !== null) {
        if (stepPlot) {
          ctx.lineTo(x, prevY);
          ctx.lineTo(x, canvasHeight);
        } else {
          ctx.lineTo(prevX, canvasHeight);
        }
      }
      prevX = prevY = null;
    }
  }
  ctx.lineTo(canvasWidth, canvasHeight);
  ctx.closePath();

  if (fillStyle) {
    var lingrad = this.bgcanvas_ctx_.createLinearGradient(0, 0, 0, canvasHeight);
    if (fillGradientStyle) {
      lingrad.addColorStop(0, fillGradientStyle);
    }
    lingrad.addColorStop(1, fillStyle);
    this.bgcanvas_ctx_.fillStyle = lingrad;
    ctx.fill();
  }

  if (strokeStyle) {
    this.bgcanvas_ctx_.strokeStyle = strokeStyle;
    this.bgcanvas_ctx_.lineWidth = this.getOption_('rangeSelectorPlotLineWidth');
    ctx.stroke();
  }
};

/**
 * @private
 * Computes and returns the combined series data along with min/max for the mini plot.
 * The combined series consists of averaged values for all series.
 * When series have error bars, the error bars are ignored.
 * @return {Object} An object containing combined series array, ymin, ymax.
 */
rangeSelector.prototype.computeCombinedSeriesAndLimits_ = function () {
  var g = this.dygraph_;
  var logscale = this.getOption_('logscale');
  var i;

  // Select series to combine. By default, all series are combined.
  var numColumns = g.numColumns();
  var labels = g.getLabels();
  var includeSeries = new Array(numColumns);
  var anySet = false;
  var visibility = g.visibility();
  var inclusion = [];

  for (i = 1; i < numColumns; i++) {
    var include = this.getOption_('showInRangeSelector', labels[i]);
    inclusion.push(include);
    if (include !== null) anySet = true; // it's set explicitly for this series
  }

  if (anySet) {
    for (i = 1; i < numColumns; i++) {
      includeSeries[i] = inclusion[i - 1];
    }
  } else {
    for (i = 1; i < numColumns; i++) {
      includeSeries[i] = visibility[i - 1];
    }
  }

  // Create a combined series (average of selected series values).
  // TODO(danvk): short-circuit if there's only one series.
  var rolledSeries = [];
  var dataHandler = g.dataHandler_;
  var options = g.attributes_;
  for (i = 1; i < g.numColumns(); i++) {
    if (!includeSeries[i]) continue;
    var series = dataHandler.extractSeries(g.rawData_, i, options);
    if (g.rollPeriod() > 1) {
      series = dataHandler.rollingAverage(series, g.rollPeriod(), options);
    }

    rolledSeries.push(series);
  }

  var combinedSeries = [];
  for (i = 0; i < rolledSeries[0].length; i++) {
    var sum = 0;
    var count = 0;
    for (var j = 0; j < rolledSeries.length; j++) {
      var y = rolledSeries[j][i][1];
      if (y === null || isNaN(y)) continue;
      count++;
      sum += y;
    }
    combinedSeries.push([rolledSeries[0][i][0], sum / count]);
  }

  // Compute the y range.
  var yMin = Number.MAX_VALUE;
  var yMax = -Number.MAX_VALUE;
  for (i = 0; i < combinedSeries.length; i++) {
    var yVal = combinedSeries[i][1];
    if (yVal !== null && isFinite(yVal) && (!logscale || yVal > 0)) {
      yMin = Math.min(yMin, yVal);
      yMax = Math.max(yMax, yVal);
    }
  }

  // Convert Y data to log scale if needed.
  // Also, expand the Y range to compress the mini plot a little.
  var extraPercent = 0.25;
  if (logscale) {
    yMax = utils.log10(yMax);
    yMax += yMax * extraPercent;
    yMin = utils.log10(yMin);
    for (i = 0; i < combinedSeries.length; i++) {
      combinedSeries[i][1] = utils.log10(combinedSeries[i][1]);
    }
  } else {
    var yExtra;
    var yRange = yMax - yMin;
    if (yRange <= Number.MIN_VALUE) {
      yExtra = yMax * extraPercent;
    } else {
      yExtra = yRange * extraPercent;
    }
    yMax += yExtra;
    yMin -= yExtra;
  }

  return { data: combinedSeries, yMin: yMin, yMax: yMax };
};

/**
 * @private
 * Places the zoom handles in the proper position based on the current X data window.
 */
rangeSelector.prototype.placeZoomHandles_ = function () {
  var xExtremes = this.dygraph_.xAxisExtremes();
  var xWindowLimits = this.dygraph_.xAxisRange();
  var xRange = xExtremes[1] - xExtremes[0];
  var leftPercent = Math.max(0, (xWindowLimits[0] - xExtremes[0]) / xRange);
  var rightPercent = Math.max(0, (xExtremes[1] - xWindowLimits[1]) / xRange);
  var leftCoord = this.canvasRect_.x + this.canvasRect_.w * leftPercent;
  var rightCoord = this.canvasRect_.x + this.canvasRect_.w * (1 - rightPercent);
  var handleTop = Math.max(this.canvasRect_.y, this.canvasRect_.y + (this.canvasRect_.h - this.leftZoomHandle_.height) / 2);
  var halfHandleWidth = this.leftZoomHandle_.width / 2;
  this.leftZoomHandle_.style.left = leftCoord - halfHandleWidth + 'px';
  this.leftZoomHandle_.style.top = handleTop + 'px';
  this.rightZoomHandle_.style.left = rightCoord - halfHandleWidth + 'px';
  this.rightZoomHandle_.style.top = this.leftZoomHandle_.style.top;

  this.leftZoomHandle_.style.visibility = 'visible';
  this.rightZoomHandle_.style.visibility = 'visible';
};

/**
 * @private
 * Draws the interactive layer in the foreground canvas.
 */
rangeSelector.prototype.drawInteractiveLayer_ = function () {
  var ctx = this.fgcanvas_ctx_;
  ctx.clearRect(0, 0, this.canvasRect_.w, this.canvasRect_.h);
  var margin = 1;
  var width = this.canvasRect_.w - margin;
  var height = this.canvasRect_.h - margin;
  var zoomHandleStatus = this.getZoomHandleStatus_();

  ctx.strokeStyle = this.getOption_('rangeSelectorForegroundStrokeColor');
  ctx.lineWidth = this.getOption_('rangeSelectorForegroundLineWidth');
  if (!zoomHandleStatus.isZoomed) {
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, height);
    ctx.lineTo(width, height);
    ctx.lineTo(width, margin);
    ctx.stroke();
  } else {
    var leftHandleCanvasPos = Math.max(margin, zoomHandleStatus.leftHandlePos - this.canvasRect_.x);
    var rightHandleCanvasPos = Math.min(width, zoomHandleStatus.rightHandlePos - this.canvasRect_.x);

    ctx.fillStyle = 'rgba(240, 240, 240, ' + this.getOption_('rangeSelectorAlpha').toString() + ')';
    ctx.fillRect(0, 0, leftHandleCanvasPos, this.canvasRect_.h);
    ctx.fillRect(rightHandleCanvasPos, 0, this.canvasRect_.w - rightHandleCanvasPos, this.canvasRect_.h);

    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(leftHandleCanvasPos, margin);
    ctx.lineTo(leftHandleCanvasPos, height);
    ctx.lineTo(rightHandleCanvasPos, height);
    ctx.lineTo(rightHandleCanvasPos, margin);
    ctx.lineTo(width, margin);
    ctx.stroke();
  }
};

/**
 * @private
 * Returns the current zoom handle position information.
 * @return {Object} The zoom handle status.
 */
rangeSelector.prototype.getZoomHandleStatus_ = function () {
  var halfHandleWidth = this.leftZoomHandle_.width / 2;
  var leftHandlePos = parseFloat(this.leftZoomHandle_.style.left) + halfHandleWidth;
  var rightHandlePos = parseFloat(this.rightZoomHandle_.style.left) + halfHandleWidth;
  return {
    leftHandlePos: leftHandlePos,
    rightHandlePos: rightHandlePos,
    isZoomed: leftHandlePos - 1 > this.canvasRect_.x || rightHandlePos + 1 < this.canvasRect_.x + this.canvasRect_.w
  };
};

exports['default'] = rangeSelector;
module.exports = exports['default'];

/***/ }),
/* 30 */
/*!*******************************************************!*\
  !*** ./node_modules/dygraphs/src-es5/dygraph-gviz.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright 2011 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview A wrapper around the Dygraph class which implements the
 * interface for a GViz (aka Google Visualization API) visualization.
 * It is designed to be a drop-in replacement for Google's AnnotatedTimeline,
 * so the documentation at
 * http://code.google.com/apis/chart/interactive/docs/gallery/annotatedtimeline.html
 * translates over directly.
 *
 * For a full demo, see:
 * - http://dygraphs.com/tests/gviz.html
 * - http://dygraphs.com/tests/annotation-gviz.html
 */

/*global Dygraph:false */


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dygraph = __webpack_require__(/*! ./dygraph */ 2);

var _dygraph2 = _interopRequireDefault(_dygraph);

/**
 * A wrapper around Dygraph that implements the gviz API.
 * @param {!HTMLDivElement} container The DOM object the visualization should
 *     live in.
 * @constructor
 */
var GVizChart = function GVizChart(container) {
  this.container = container;
};

/**
 * @param {GVizDataTable} data
 * @param {Object.<*>} options
 */
GVizChart.prototype.draw = function (data, options) {
  // Clear out any existing dygraph.
  // TODO(danvk): would it make more sense to simply redraw using the current
  // date_graph object?
  this.container.innerHTML = '';
  if (typeof this.date_graph != 'undefined') {
    this.date_graph.destroy();
  }

  this.date_graph = new _dygraph2['default'](this.container, data, options);
};

/**
 * Google charts compatible setSelection
 * Only row selection is supported, all points in the row will be highlighted
 * @param {Array.<{row:number}>} selection_array array of the selected cells
 * @public
 */
GVizChart.prototype.setSelection = function (selection_array) {
  var row = false;
  if (selection_array.length) {
    row = selection_array[0].row;
  }
  this.date_graph.setSelection(row);
};

/**
 * Google charts compatible getSelection implementation
 * @return {Array.<{row:number,column:number}>} array of the selected cells
 * @public
 */
GVizChart.prototype.getSelection = function () {
  var selection = [];

  var row = this.date_graph.getSelection();

  if (row < 0) return selection;

  var points = this.date_graph.layout_.points;
  for (var setIdx = 0; setIdx < points.length; ++setIdx) {
    selection.push({ row: row, column: setIdx + 1 });
  }

  return selection;
};

exports['default'] = GVizChart;
module.exports = exports['default'];

/***/ }),
/* 31 */
/*!*************************************************************************************************!*\
  !*** ./src/assets/Icon-font-7-stroke-PIXEDEN-v-1.2.0/pe-icon-7-stroke/css/pe-icon-7-stroke.css ***!
  \*************************************************************************************************/
/*! dynamic exports provided */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!./pe-icon-7-stroke.css */ 32);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ 8)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js!./pe-icon-7-stroke.css", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js!./pe-icon-7-stroke.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 32 */
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./src/assets/Icon-font-7-stroke-PIXEDEN-v-1.2.0/pe-icon-7-stroke/css/pe-icon-7-stroke.css ***!
  \***************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/url/escape.js */ 33);
exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 7)(false);
// imports


// module
exports.push([module.i, "@font-face {\n\tfont-family: 'Pe-icon-7-stroke';\n\tsrc:url(" + escape(__webpack_require__(/*! ../fonts/Pe-icon-7-stroke.woff?d7yf1v */ 34)) + ") format('woff');\n\tsrc:url(" + escape(__webpack_require__(/*! ../fonts/Pe-icon-7-stroke.eot */ 35)) + "?#iefixd7yf1v) format('embedded-opentype'), url(" + escape(__webpack_require__(/*! ../fonts/Pe-icon-7-stroke.ttf?d7yf1v */ 36)) + ") format('truetype'), url(" + escape(__webpack_require__(/*! ../fonts/Pe-icon-7-stroke.svg?d7yf1v */ 37)) + "#Pe-icon-7-stroke) format('svg');\n\tfont-weight: normal;\n\tfont-style: normal;\n}\n\n[class^=\"pe-7s-\"], [class*=\" pe-7s-\"] {\n\tdisplay: inline-block;\n\tfont-family: 'Pe-icon-7-stroke';\n\tspeak: none;\n\tfont-style: normal;\n\tfont-weight: normal;\n\tfont-variant: normal;\n\ttext-transform: none;\n\tline-height: 1;\n\n\t/* Better Font Rendering =========== */\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n}\n\n.pe-7s-album:before {\n\tcontent: \"\\E6AA\";\n}\n.pe-7s-arc:before {\n\tcontent: \"\\E6AB\";\n}\n.pe-7s-back-2:before {\n\tcontent: \"\\E6AC\";\n}\n.pe-7s-bandaid:before {\n\tcontent: \"\\E6AD\";\n}\n.pe-7s-car:before {\n\tcontent: \"\\E6AE\";\n}\n.pe-7s-diamond:before {\n\tcontent: \"\\E6AF\";\n}\n.pe-7s-door-lock:before {\n\tcontent: \"\\E6B0\";\n}\n.pe-7s-eyedropper:before {\n\tcontent: \"\\E6B1\";\n}\n.pe-7s-female:before {\n\tcontent: \"\\E6B2\";\n}\n.pe-7s-gym:before {\n\tcontent: \"\\E6B3\";\n}\n.pe-7s-hammer:before {\n\tcontent: \"\\E6B4\";\n}\n.pe-7s-headphones:before {\n\tcontent: \"\\E6B5\";\n}\n.pe-7s-helm:before {\n\tcontent: \"\\E6B6\";\n}\n.pe-7s-hourglass:before {\n\tcontent: \"\\E6B7\";\n}\n.pe-7s-leaf:before {\n\tcontent: \"\\E6B8\";\n}\n.pe-7s-magic-wand:before {\n\tcontent: \"\\E6B9\";\n}\n.pe-7s-male:before {\n\tcontent: \"\\E6BA\";\n}\n.pe-7s-map-2:before {\n\tcontent: \"\\E6BB\";\n}\n.pe-7s-next-2:before {\n\tcontent: \"\\E6BC\";\n}\n.pe-7s-paint-bucket:before {\n\tcontent: \"\\E6BD\";\n}\n.pe-7s-pendrive:before {\n\tcontent: \"\\E6BE\";\n}\n.pe-7s-photo:before {\n\tcontent: \"\\E6BF\";\n}\n.pe-7s-piggy:before {\n\tcontent: \"\\E6C0\";\n}\n.pe-7s-plugin:before {\n\tcontent: \"\\E6C1\";\n}\n.pe-7s-refresh-2:before {\n\tcontent: \"\\E6C2\";\n}\n.pe-7s-rocket:before {\n\tcontent: \"\\E6C3\";\n}\n.pe-7s-settings:before {\n\tcontent: \"\\E6C4\";\n}\n.pe-7s-shield:before {\n\tcontent: \"\\E6C5\";\n}\n.pe-7s-smile:before {\n\tcontent: \"\\E6C6\";\n}\n.pe-7s-usb:before {\n\tcontent: \"\\E6C7\";\n}\n.pe-7s-vector:before {\n\tcontent: \"\\E6C8\";\n}\n.pe-7s-wine:before {\n\tcontent: \"\\E6C9\";\n}\n.pe-7s-cloud-upload:before {\n\tcontent: \"\\E68A\";\n}\n.pe-7s-cash:before {\n\tcontent: \"\\E68C\";\n}\n.pe-7s-close:before {\n\tcontent: \"\\E680\";\n}\n.pe-7s-bluetooth:before {\n\tcontent: \"\\E68D\";\n}\n.pe-7s-cloud-download:before {\n\tcontent: \"\\E68B\";\n}\n.pe-7s-way:before {\n\tcontent: \"\\E68E\";\n}\n.pe-7s-close-circle:before {\n\tcontent: \"\\E681\";\n}\n.pe-7s-id:before {\n\tcontent: \"\\E68F\";\n}\n.pe-7s-angle-up:before {\n\tcontent: \"\\E682\";\n}\n.pe-7s-wristwatch:before {\n\tcontent: \"\\E690\";\n}\n.pe-7s-angle-up-circle:before {\n\tcontent: \"\\E683\";\n}\n.pe-7s-world:before {\n\tcontent: \"\\E691\";\n}\n.pe-7s-angle-right:before {\n\tcontent: \"\\E684\";\n}\n.pe-7s-volume:before {\n\tcontent: \"\\E692\";\n}\n.pe-7s-angle-right-circle:before {\n\tcontent: \"\\E685\";\n}\n.pe-7s-users:before {\n\tcontent: \"\\E693\";\n}\n.pe-7s-angle-left:before {\n\tcontent: \"\\E686\";\n}\n.pe-7s-user-female:before {\n\tcontent: \"\\E694\";\n}\n.pe-7s-angle-left-circle:before {\n\tcontent: \"\\E687\";\n}\n.pe-7s-up-arrow:before {\n\tcontent: \"\\E695\";\n}\n.pe-7s-angle-down:before {\n\tcontent: \"\\E688\";\n}\n.pe-7s-switch:before {\n\tcontent: \"\\E696\";\n}\n.pe-7s-angle-down-circle:before {\n\tcontent: \"\\E689\";\n}\n.pe-7s-scissors:before {\n\tcontent: \"\\E697\";\n}\n.pe-7s-wallet:before {\n\tcontent: \"\\E600\";\n}\n.pe-7s-safe:before {\n\tcontent: \"\\E698\";\n}\n.pe-7s-volume2:before {\n\tcontent: \"\\E601\";\n}\n.pe-7s-volume1:before {\n\tcontent: \"\\E602\";\n}\n.pe-7s-voicemail:before {\n\tcontent: \"\\E603\";\n}\n.pe-7s-video:before {\n\tcontent: \"\\E604\";\n}\n.pe-7s-user:before {\n\tcontent: \"\\E605\";\n}\n.pe-7s-upload:before {\n\tcontent: \"\\E606\";\n}\n.pe-7s-unlock:before {\n\tcontent: \"\\E607\";\n}\n.pe-7s-umbrella:before {\n\tcontent: \"\\E608\";\n}\n.pe-7s-trash:before {\n\tcontent: \"\\E609\";\n}\n.pe-7s-tools:before {\n\tcontent: \"\\E60A\";\n}\n.pe-7s-timer:before {\n\tcontent: \"\\E60B\";\n}\n.pe-7s-ticket:before {\n\tcontent: \"\\E60C\";\n}\n.pe-7s-target:before {\n\tcontent: \"\\E60D\";\n}\n.pe-7s-sun:before {\n\tcontent: \"\\E60E\";\n}\n.pe-7s-study:before {\n\tcontent: \"\\E60F\";\n}\n.pe-7s-stopwatch:before {\n\tcontent: \"\\E610\";\n}\n.pe-7s-star:before {\n\tcontent: \"\\E611\";\n}\n.pe-7s-speaker:before {\n\tcontent: \"\\E612\";\n}\n.pe-7s-signal:before {\n\tcontent: \"\\E613\";\n}\n.pe-7s-shuffle:before {\n\tcontent: \"\\E614\";\n}\n.pe-7s-shopbag:before {\n\tcontent: \"\\E615\";\n}\n.pe-7s-share:before {\n\tcontent: \"\\E616\";\n}\n.pe-7s-server:before {\n\tcontent: \"\\E617\";\n}\n.pe-7s-search:before {\n\tcontent: \"\\E618\";\n}\n.pe-7s-film:before {\n\tcontent: \"\\E6A5\";\n}\n.pe-7s-science:before {\n\tcontent: \"\\E619\";\n}\n.pe-7s-disk:before {\n\tcontent: \"\\E6A6\";\n}\n.pe-7s-ribbon:before {\n\tcontent: \"\\E61A\";\n}\n.pe-7s-repeat:before {\n\tcontent: \"\\E61B\";\n}\n.pe-7s-refresh:before {\n\tcontent: \"\\E61C\";\n}\n.pe-7s-add-user:before {\n\tcontent: \"\\E6A9\";\n}\n.pe-7s-refresh-cloud:before {\n\tcontent: \"\\E61D\";\n}\n.pe-7s-paperclip:before {\n\tcontent: \"\\E69C\";\n}\n.pe-7s-radio:before {\n\tcontent: \"\\E61E\";\n}\n.pe-7s-note2:before {\n\tcontent: \"\\E69D\";\n}\n.pe-7s-print:before {\n\tcontent: \"\\E61F\";\n}\n.pe-7s-network:before {\n\tcontent: \"\\E69E\";\n}\n.pe-7s-prev:before {\n\tcontent: \"\\E620\";\n}\n.pe-7s-mute:before {\n\tcontent: \"\\E69F\";\n}\n.pe-7s-power:before {\n\tcontent: \"\\E621\";\n}\n.pe-7s-medal:before {\n\tcontent: \"\\E6A0\";\n}\n.pe-7s-portfolio:before {\n\tcontent: \"\\E622\";\n}\n.pe-7s-like2:before {\n\tcontent: \"\\E6A1\";\n}\n.pe-7s-plus:before {\n\tcontent: \"\\E623\";\n}\n.pe-7s-left-arrow:before {\n\tcontent: \"\\E6A2\";\n}\n.pe-7s-play:before {\n\tcontent: \"\\E624\";\n}\n.pe-7s-key:before {\n\tcontent: \"\\E6A3\";\n}\n.pe-7s-plane:before {\n\tcontent: \"\\E625\";\n}\n.pe-7s-joy:before {\n\tcontent: \"\\E6A4\";\n}\n.pe-7s-photo-gallery:before {\n\tcontent: \"\\E626\";\n}\n.pe-7s-pin:before {\n\tcontent: \"\\E69B\";\n}\n.pe-7s-phone:before {\n\tcontent: \"\\E627\";\n}\n.pe-7s-plug:before {\n\tcontent: \"\\E69A\";\n}\n.pe-7s-pen:before {\n\tcontent: \"\\E628\";\n}\n.pe-7s-right-arrow:before {\n\tcontent: \"\\E699\";\n}\n.pe-7s-paper-plane:before {\n\tcontent: \"\\E629\";\n}\n.pe-7s-delete-user:before {\n\tcontent: \"\\E6A7\";\n}\n.pe-7s-paint:before {\n\tcontent: \"\\E62A\";\n}\n.pe-7s-bottom-arrow:before {\n\tcontent: \"\\E6A8\";\n}\n.pe-7s-notebook:before {\n\tcontent: \"\\E62B\";\n}\n.pe-7s-note:before {\n\tcontent: \"\\E62C\";\n}\n.pe-7s-next:before {\n\tcontent: \"\\E62D\";\n}\n.pe-7s-news-paper:before {\n\tcontent: \"\\E62E\";\n}\n.pe-7s-musiclist:before {\n\tcontent: \"\\E62F\";\n}\n.pe-7s-music:before {\n\tcontent: \"\\E630\";\n}\n.pe-7s-mouse:before {\n\tcontent: \"\\E631\";\n}\n.pe-7s-more:before {\n\tcontent: \"\\E632\";\n}\n.pe-7s-moon:before {\n\tcontent: \"\\E633\";\n}\n.pe-7s-monitor:before {\n\tcontent: \"\\E634\";\n}\n.pe-7s-micro:before {\n\tcontent: \"\\E635\";\n}\n.pe-7s-menu:before {\n\tcontent: \"\\E636\";\n}\n.pe-7s-map:before {\n\tcontent: \"\\E637\";\n}\n.pe-7s-map-marker:before {\n\tcontent: \"\\E638\";\n}\n.pe-7s-mail:before {\n\tcontent: \"\\E639\";\n}\n.pe-7s-mail-open:before {\n\tcontent: \"\\E63A\";\n}\n.pe-7s-mail-open-file:before {\n\tcontent: \"\\E63B\";\n}\n.pe-7s-magnet:before {\n\tcontent: \"\\E63C\";\n}\n.pe-7s-loop:before {\n\tcontent: \"\\E63D\";\n}\n.pe-7s-look:before {\n\tcontent: \"\\E63E\";\n}\n.pe-7s-lock:before {\n\tcontent: \"\\E63F\";\n}\n.pe-7s-lintern:before {\n\tcontent: \"\\E640\";\n}\n.pe-7s-link:before {\n\tcontent: \"\\E641\";\n}\n.pe-7s-like:before {\n\tcontent: \"\\E642\";\n}\n.pe-7s-light:before {\n\tcontent: \"\\E643\";\n}\n.pe-7s-less:before {\n\tcontent: \"\\E644\";\n}\n.pe-7s-keypad:before {\n\tcontent: \"\\E645\";\n}\n.pe-7s-junk:before {\n\tcontent: \"\\E646\";\n}\n.pe-7s-info:before {\n\tcontent: \"\\E647\";\n}\n.pe-7s-home:before {\n\tcontent: \"\\E648\";\n}\n.pe-7s-help2:before {\n\tcontent: \"\\E649\";\n}\n.pe-7s-help1:before {\n\tcontent: \"\\E64A\";\n}\n.pe-7s-graph3:before {\n\tcontent: \"\\E64B\";\n}\n.pe-7s-graph2:before {\n\tcontent: \"\\E64C\";\n}\n.pe-7s-graph1:before {\n\tcontent: \"\\E64D\";\n}\n.pe-7s-graph:before {\n\tcontent: \"\\E64E\";\n}\n.pe-7s-global:before {\n\tcontent: \"\\E64F\";\n}\n.pe-7s-gleam:before {\n\tcontent: \"\\E650\";\n}\n.pe-7s-glasses:before {\n\tcontent: \"\\E651\";\n}\n.pe-7s-gift:before {\n\tcontent: \"\\E652\";\n}\n.pe-7s-folder:before {\n\tcontent: \"\\E653\";\n}\n.pe-7s-flag:before {\n\tcontent: \"\\E654\";\n}\n.pe-7s-filter:before {\n\tcontent: \"\\E655\";\n}\n.pe-7s-file:before {\n\tcontent: \"\\E656\";\n}\n.pe-7s-expand1:before {\n\tcontent: \"\\E657\";\n}\n.pe-7s-exapnd2:before {\n\tcontent: \"\\E658\";\n}\n.pe-7s-edit:before {\n\tcontent: \"\\E659\";\n}\n.pe-7s-drop:before {\n\tcontent: \"\\E65A\";\n}\n.pe-7s-drawer:before {\n\tcontent: \"\\E65B\";\n}\n.pe-7s-download:before {\n\tcontent: \"\\E65C\";\n}\n.pe-7s-display2:before {\n\tcontent: \"\\E65D\";\n}\n.pe-7s-display1:before {\n\tcontent: \"\\E65E\";\n}\n.pe-7s-diskette:before {\n\tcontent: \"\\E65F\";\n}\n.pe-7s-date:before {\n\tcontent: \"\\E660\";\n}\n.pe-7s-cup:before {\n\tcontent: \"\\E661\";\n}\n.pe-7s-culture:before {\n\tcontent: \"\\E662\";\n}\n.pe-7s-crop:before {\n\tcontent: \"\\E663\";\n}\n.pe-7s-credit:before {\n\tcontent: \"\\E664\";\n}\n.pe-7s-copy-file:before {\n\tcontent: \"\\E665\";\n}\n.pe-7s-config:before {\n\tcontent: \"\\E666\";\n}\n.pe-7s-compass:before {\n\tcontent: \"\\E667\";\n}\n.pe-7s-comment:before {\n\tcontent: \"\\E668\";\n}\n.pe-7s-coffee:before {\n\tcontent: \"\\E669\";\n}\n.pe-7s-cloud:before {\n\tcontent: \"\\E66A\";\n}\n.pe-7s-clock:before {\n\tcontent: \"\\E66B\";\n}\n.pe-7s-check:before {\n\tcontent: \"\\E66C\";\n}\n.pe-7s-chat:before {\n\tcontent: \"\\E66D\";\n}\n.pe-7s-cart:before {\n\tcontent: \"\\E66E\";\n}\n.pe-7s-camera:before {\n\tcontent: \"\\E66F\";\n}\n.pe-7s-call:before {\n\tcontent: \"\\E670\";\n}\n.pe-7s-calculator:before {\n\tcontent: \"\\E671\";\n}\n.pe-7s-browser:before {\n\tcontent: \"\\E672\";\n}\n.pe-7s-box2:before {\n\tcontent: \"\\E673\";\n}\n.pe-7s-box1:before {\n\tcontent: \"\\E674\";\n}\n.pe-7s-bookmarks:before {\n\tcontent: \"\\E675\";\n}\n.pe-7s-bicycle:before {\n\tcontent: \"\\E676\";\n}\n.pe-7s-bell:before {\n\tcontent: \"\\E677\";\n}\n.pe-7s-battery:before {\n\tcontent: \"\\E678\";\n}\n.pe-7s-ball:before {\n\tcontent: \"\\E679\";\n}\n.pe-7s-back:before {\n\tcontent: \"\\E67A\";\n}\n.pe-7s-attention:before {\n\tcontent: \"\\E67B\";\n}\n.pe-7s-anchor:before {\n\tcontent: \"\\E67C\";\n}\n.pe-7s-albums:before {\n\tcontent: \"\\E67D\";\n}\n.pe-7s-alarm:before {\n\tcontent: \"\\E67E\";\n}\n.pe-7s-airplay:before {\n\tcontent: \"\\E67F\";\n}\n", ""]);

// exports


/***/ }),
/* 33 */
/*!***************************************************!*\
  !*** ./node_modules/css-loader/lib/url/escape.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),
/* 34 */
/*!***********************************************************************************************************!*\
  !*** ./src/assets/Icon-font-7-stroke-PIXEDEN-v-1.2.0/pe-icon-7-stroke/fonts/Pe-icon-7-stroke.woff?d7yf1v ***!
  \***********************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "data:font/woff;base64,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"

/***/ }),
/* 35 */
/*!***************************************************************************************************!*\
  !*** ./src/assets/Icon-font-7-stroke-PIXEDEN-v-1.2.0/pe-icon-7-stroke/fonts/Pe-icon-7-stroke.eot ***!
  \***************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "data:application/vnd.ms-fontobject;base64,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"

/***/ }),
/* 36 */
/*!**********************************************************************************************************!*\
  !*** ./src/assets/Icon-font-7-stroke-PIXEDEN-v-1.2.0/pe-icon-7-stroke/fonts/Pe-icon-7-stroke.ttf?d7yf1v ***!
  \**********************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "data:font/ttf;base64,AAEAAAALAIAAAwAwT1MvMggi/X8AAAC8AAAAYGNtYXAaVc0gAAABHAAAAExnYXNwAAAAEAAAAWgAAAAIZ2x5ZsazPrwAAAFwAADb9GhlYWQCRQm5AADdZAAAADZoaGVhA+QCrQAA3ZwAAAAkaG10eH0LG34AAN3AAAADOGxvY2EbxONiAADg+AAAAZ5tYXhwAOgBxgAA4pgAAAAgbmFtZXbNq60AAOK4AAABlnBvc3QAAwAAAADkUAAAACAAAwIAAZAABQAAAUwBZgAAAEcBTAFmAAAA9QAZAIQAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADmyQHg/+D/4AHgACAAAAABAAAAAAAAAAAAAAAgAAAAAAACAAAAAwAAABQAAwABAAAAFAAEADgAAAAKAAgAAgACAAEAIObJ//3//wAAAAAAIOYA//3//wAB/+MaBAADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAABQAzABMBzQGtABsALAAxAEoAYwAAASM1NCYnLgEjISIGBw4BFREUFjMhMjY1ETQmIyUhMhYXHgEdASE1NDY3PgEzASERIREnFBYXHgEzMjY3PgE1NCYnLgEjIgYHDgEVMxQGBw4BIyImJy4BNTQ2Nz4BMzIWFx4BFQHAOAYFBQ4I/vgIDgUGBggFAYAFCAgF/poBCAQIAwMD/s0EAwMHBQFi/ogBeHgHBgYPCQkPBgYHBwYGDwkJDwYGB0QEAwMKBQUKAwQEBAQDCgUFCgMDBAFXLwgOBQYGBgYFDgj+mgUICAUBKwUHRQQDAwcFLy8FBwMDBP6IASL+3pEIEAYGBgYGBhAICRAFBgcHBQYQCQUJBAMEBAMECQUGCQMEBAQEAwkGAAQAKwALAdUBtQAGAA4AJwBAAAATFTMXNQcjFzcVJyM1MzcnIgYHDgEVFBYXHgEzMjY3PgE1NCYnLgEjESImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BI7NGOjpGUh0iPDwFBSxOHR0hIR0dTiwsTh0dISEdHU4sKUcbGh8fGhtHKSlHGxofHxobRykBC1Y6yjoMHHYhNAW2IR0dTiwsTh0dISEdHU4sLE4dHSH+Zx8aG0cpKUcbGh8fGhtHKSlHGxofAAYAKwALAdUBtQAGAA4AKQBEAF8AkgAAExUzFzUHIxc3FScjNTM3NwceARceARUUBgcOAQcXPgE3PgE1NCYnLgEnBz4BNz4BNTQmJy4BJwceARceARUUBgcOAQcXJz4BNz4BNTQmJy4BJwceARceARUUBgcOAQcXByImJy4BNTQ2Nz4BMzIWFx4BFzcuAScuASMiBgcOARUUFhceATMyNjc+ATcnDgEHDgEjs0Y6OkZSHSI8PAWmDgkPBQUFBQUFDwkOChAFBgUFBgUQCikHDAQFBAQFBAwHDgcLAwQEBAQDCwcOKQUIAwMDAwMDCAUOBQYDAgMDAgMGBQ5ZKUcbGh8fGhtHKRQmEhIfDQwOIhMTKhYsTh0dISEdHU4sFioTEyIODA0fEhImFAELVjrKOgwcdiE0BWAKDBsPDyAQECAPDxsMCg0eEBAiEhIiEBAeDeAKFwwMGg4OGgwMFwoLCRQLCxcMDBcLCxQJCx8HDwkIEgkJEggJDwcKBg0HBw8ICA8HBw0GCoIfGhtHKSlHGxofCAcIFQ0MDhgICAghHR1OLCxOHR0hCAgIGA4MDRUIBwgAAAADAAAAbQIAAVMAMgBLAGQAAAEiBgcOARUUFhceARcjPgE3PgE1NCYnLgEjIgYHDgEVFBYXHgEzITI2Nz4BNTQmJy4BIwU0Njc+ATMyFhceARUUBgcOASMiJicuATUFIiYnLgE1NDY3PgEzMhYXHgEVFAYHDgEjAY0YKhAPEggHBxQNog0UBwcIEg8QKhgYKg8QEhIQDyoYARoYKg8QEhIQDyoY/oQQDQ0kFBUjDg0PDw0OIxUUJA0NEAF8FSMODQ8PDQ4jFRQkDQ0QEA0NJBQBUxIQDyoYEBwNDRUHBxUNDRwQGCoPEBISEA8qGBgqDxASEhAPKhgYKg8QEnMUJA0ODw8ODSQUFCQNDg8PDg0kFGIPDg0kFBQkDQ4PDw4NJBQUJA0ODwAAAAMAEQBPAe8BcQAiADMAOgAAAQc1NCYnLgEjISIGBw4BHQEUFhceATMhMjY3PgE9ARczNSMHFAYjISImPQE0NjMhMhYdATcjJzU3MxUBw24EAwQJBf7vBgkDBAQEBAMJBgERBQkEAwRwKix/BQP+7wQFBQQBEQMFmhR1cxYBT0JKBgkEAwQEAwQJBu4GCQQDBAQDBAkGS0Pe5gQFBQTuBAUFBO4ZRjFFvAAAAAADADMAEwHNAa0AGAB6ANYAAAEiBgcOARUUFhceATMyNjc+ATU0JicuASMVMhYXHgEVFAYHDgEHLgEnLgEnLgE1NDY3PgE3PgE3NiYnMCYxNDY3NiYnLgEnLgEnIw4BBw4BBw4BFx4BBzAUIw4BFx4BFx4BFx4BFRQGBw4BBw4BBy4BJy4BNTQ2Nz4BMwM+ATc+ATc+ATU0JicuASc0JicuAScmNDc2NDU2JicmNjc+ATc+ATczHgEXHgEXHgEVDgEXFBYVHgEHDgEHDgEVFAYHDgEVFBYXHgEXHgEXDgEHDgEjIiYnLgEnAQAqSxwcICAcHEsqKkscHCAgHBxLKidEGhkeBgYFEQoHFg0MGgoCAQQDAgYBAwgCAwECAQECAgYKBAoHBxIMEQwSBwcKAwsFAQICAQEBAQIDBwMBBgICAgEBCxoNDBYGCxAGBgYeGRpEJ4MHFQsLFwoLAwEEAwQBAgECBgICAQECAgIBBAgECQYFDQcQCA0GBQoDCQMCAwIBAQECAwYCAQIFAwIGBAsJFwsLFQgNHhARJRMTJBERHQ0BrSAcHEsqKkscHCAgHBxLKipLHBwgER4ZGkQnESEPDxwMAwgFBAgDAQMHBgwFBRIIBA8NDAsFAQMYDAcdDgQKAwQGAQEGBAMKBA4dBwwYAwEFCwwNDwQIEgUEDAcIAgEDCQQFCAMMHBAPIREnRBoZHv6+AwcEBAgDAxAIBhAIBRAIAQMBAgwMCQYCAQIBBR4LBBYLBAgCAwMBAQMDAggECxYECx4FAQIBAgYJDAwCAQMBCBAFBg8JBxAEAwcEBAcDDRQHBwgIBwcTDQAAAAACAFX/6AGrAYIACAAUAAAlNycHFzcRMxEHNSMRIREjFTMRIREBSwxXVwxCEjRvATRvgP6qtAxXVwxC/vIBDrkSASL+3hIBRf67AAAAAgBVAAIBqwG+ACMAKAAAJSM1NDY3PgEzMhYXHgEdATM1NCYnLgEjIgYHDgEdASMVITUjFyE1IRUBd9UPDQwjExMjDA0PERIPDygXFygPDxI8AVY0I/7MATTpZhMiDQ0PDw0NIhMiIhcoDw8SEg8PKBdm5+fWxMQAAgAA//ECAAHPAF8AnAAAATUjFQ4BBw4BFRQWFzc0Njc+ATMyFhceARUzNDY3PgEzMhYXHgEdARQWFx4BMzI2Nz4BNSMUBiMiJj0BMTQ2Nz4BMzIWFx4BFTM0Njc+ATMyFhceARUzPgE1NCYnLgEnFyIGBw4BBy4BJy4BIyIGBw4BBy4BJy4BIyIGBw4BBy4BJy4BIyIGBw4BBz4BNz4BMzIWFx4BFy4BJy4BIwEJEjNaIiEnAQERCQcHEwoLFAcHCBIIBwcUCwoTCAcIBgYFDQgIDgUFBhEMCQgMCAcHFAsLEwcHCREIBwcUCwoTBwcJEQEBJyEiWjOwChMICAwFBA0ICBMJChMICAwFBA0ICBMJChMICA0EBA0ICBMKCA8HBwsFAyggIFQvL1QgICgDBQsHBw8IAbUaGgIpIiNbMwcOBwELEgcHCAgIBxMLCxMHCAgIBwcTC4QIDgUFBgYFBQ4ICQwMCYMLEwcICAgIBxMLCxMHCAgIBwcSCwcNBzNbIyIpAtUFBQUNCQkNBQUFBQUFDQkJDQUFBQUFBQ0JCQ0FBQUEAwMJBi5RHh4iIh4eUS4GCQMDBAAGAF4ACwGiAbUAJAAvAD4AQwBHAEsAAAEjNTQmJy4BKwEiBgcOAR0BIxUzExQWFx4BOwEyNjc+ATUTMzUnNDY7ATIWHQEjNRMVMRQGKwEiJjUxNQMzAwMzESMRCwEHExMnAxcBolUGBAUMB1YHDAUEBlUSEQUFBA0HuwcNBAUFERHeCgdWBwp4qwoHuwcKEf8ReBISIRIREogREREBghEHDQQFBQUFBA0HERH+vAcNBAUFBQUEDQcBRBERBwoKBxER/psBBwoKBwEBQ/69ASH+7wER/u8BEQH+7wERAf7vAQAAAAAEAB3/+wHlAcUAdQB6AMUA1QAAJSc3JwcnNx4BMzI2Nz4BNz4BNzYmLwEPAT8BJy4BJy4BIyIGBw4BBw4BBwYWFwcnNycHFzcXBy4BIyIGBw4BBw4BBwYWHwE3MxUHFx4BFx4BMzI2Nz4BNz4BNzYmJzcXBxc3Fx4BFx4BMzI2Nz4BNz4BNTQmJwE3FwcnEx4BBw4BBw4BBw4BIyoBJz8BIwcmNDc+ATc+ATc+ATMyFh8BNycuATc+ATc+ATc+ATMyFhcPAT8BFgYHDgEHDgEHDgEjIiYvAQcXBQ4BIyImLwE3Fx4BFRQGBwHZWwwMJDxIBw8ICREICA8GCg0CAwMGBScfAScLBQgFBAkFCREICA8GCgwCAwEFSWYMQyRDDGZICA8HCRIICA4HCgwCAwMFBSgeJwsECQUECQUJEQgIDwYJDAMDAgRIPSQMDFoDBwQECAQFCAQEBwMGBgYG/mUMKwwreQUCAgIKCAUMBwYOBwQJBBkBNhoCAwIKBgUMBwYOCAcPBgatAgUCAgIKCAUMBgcOBwQIBBkBOBkCAQIDCQcFDAYHDgcHDwcFrQIBFQMKBQUJBFokWgQEBAREWgwMJD1IAgMDBAMKBgoYDQwbDQsmAR4oBQEDAQEBAwQDCgYKFgwMGQ1IZgxDJEMMZkkDAwQDBAkHCRgNDRsNCygfJwUCAwEBAQQDBAkHCRYMDRkMST0kDAxaAwUCAQICAQIFAwYPCQgQBgFSDCsMK/7jCxULChMIBQgDAwIBGTgaCRIJCBEGBQgDAwIDAgOtBgoWCgsTCAUIAgMDAQEaNgEZCRMICRAHBQgDAgMDAwKtBWUEBAQEWiRaBAkFBQoDAAAAAgArAAsB1QG1ABoAVAAANzAWMR4BMzI2Nz4BNTQmJzAmIycmIgcOAR8BNyoBIxUjFTM1HgEXHgEVFAYHDgEjIiYnLgE1NDY3PgE3Jw4BBw4BFRQWFx4BMzI2Nz4BNTQmJy4BI+sBBAoGBQoDBAQFBAEBaAIGAgMBAlAVAgQCARInRBkaHR8aG0cpKUcbGh8IBwgVDQwOFwgJCCEdHU4sLE4dHSEhHR1OLNEBBAYEBAMKBQYJBAJPAgICBwNn5AldVQIgGhtGJylHGxofHxobRykUJxESHw4MDyITEyoWLE4dHSEhHR1OLCxOHR0hAAAABAAa//oB5gHGAAYADQAmADMAAAEjARcBNScXByc3MxcVJxQWFx4BMzI2Nz4BNTQmJy4BIyIGBw4BFTMUBiMiJjU0NjMyFhUBjXH+/soBAllI8bLxYlB3BQUFDAcHDAUFBQUFBQwHBwwFBQUzCgcHCgoHBwoBxv7/ywEBclnE8LPwT2ReBwwFBQUFBQUMBwcMBQUFBQUFDAcHCgoHBwoKBwAAAAAGADMAEQHNAa8AGAAxAEoAYwCOAKcAAAEiBgcOARUUFhceATMyNjc+ATU0JicuASMVIiYnLgE1NDY3PgEzMhYXHgEVFAYHDgEjNSIGBw4BFRQWFx4BMzI2Nz4BNTQmJy4BIxEiJicuATU0Njc+ATMyFhceARUUBgcOASM3NCYnLgEjIgYHDgEVFBYXHgEXBxc3HgEXHgEzMjY3PgE3FzcnPgE3PgE1ITQ2Nz4BMzIWFx4BFRQGBw4BIyImJy4BNQEBDhkJCgoKCgkZDg4ZCQkLCwkJGQ4LEgcHCAgHBxILChMHBwgIBwcTChwyExIWFhITMhwcMhITFRUTEjIcGSsREBMTEBErGRkrEBESEhEQKxnMIBwcSyoqSxwcIAoKCRsQIw0jDRwPDyARESAPDxsNIw0iEBsJCgr+dx4ZGkQnJ0QaGR4eGRpEJydEGhkeAScLCQkZDg4ZCgkLCwkKGQ4OGQkJC3gJBgcTCwoTBwcICAcHEwoLEwcGCbwVExIyHB0xExIWFhITMR0cMhITFf8AExAQLBkYLBAQExMQECwYGSwQEBN4KksbHCAgHBtLKhgsExQjDiwKKwkOBQUFBQUFDgkrCiwOIhQULBgmRRkaHR0aGUUmJ0QaGR4eGRpEJwAKAAD/4AIAAeAAGAAxADYAOwBAAEUASgBPAFQAWQAAASIGBw4BFRQWFx4BMzI2Nz4BNTQmJy4BIxUiJicuATU0Njc+ATMyFhceARUUBgcOASMDMxUjNREzFSM1JzMVIzUhMxUjNTcXByc3ASc3FwcRFwcnNwEnNxcHAQAbLhESFBQSES4bGi8REhQUEhEvGhcoDw8SEg8PKBcXKA8PEhIPDygXCBERERH4ZmYBmmZmFQxHDEf+ogxHDEdHDEcMAV5HDEcMAWAUEhEvGhsuEhEUFBESLhsaLxESFO8REA8oFxcoDw8SEg8PKBcXKA8QEQFvZ2f+ZmZmoxISEhKzDUcMSP6KDEcMRwF2SAxHDf6KRwxHDAADAAgAGwH4AaUACwAQABYAAAEnBxcVMzUXFSE1NycXByc3EyE1FzcVAfj4+CMRMwEiZ/jU1NTUgP8AgIABLXh4FbiuH9TUPmVngIBn/pq5Tk65AAADADwACwHEAbUAKABBAFQAAAE3FzcnBxcHLgEnLgEnNSMVDgEHDgEVFBYXHgEzMjY3PgE1NCYnLgEnAyImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BIzc1IxUOARUUFhcVMzU+ATU0JicBkQ4PEioSDw4MHA8PIREaJkMZGRwfGhtHKSlHGxofBwcGEwyRJUEZGBwcGBlBJSVBGRgcHBgZQSUJEgcKCgcSBwoKBwFUDg8SKhIPDgsRBwcIASIiAyAbGkUnKUcbGh8fGhtHKRMlEBEeDv7IHBgZQSUlQRkYHBwYGUElJUEZGBzLcHADDQgIDQMkJAMNCAgNAwAAAAACABoABgHmAboACgAXAAABJwcjFwc3Fyc3Ix8BJwc3LwEzNxczBxcBNjY2sI42jo42jrARJ25uKwtjhyoqh24EAROnp2anaGinZmx0UFCACEeAgE8MAAAABQAAAD0CAAGDAAoADwAXADIATQAAExUzFTM1MxcRByMXNTMVIz8BFScjNTM3NwceARceARUUBgcOAQcXPgE3PgE1NCYnLgEnDwEeARceARUUBgcOAQcXPgE3PgE1NCYnLgEnADMRg31+xhFERMBiZmdmBekMDxgICQkKCQkZEA0QHAkKCgoJCRoQNwwJEQUGBgYHBhELDAwTBwcIBwcGEgsBG3dnZ2UBRGhmVVVZUf1TVQRlDAwdERImFBUnEhEeDAwNIBMTKxcWKhITIA03DAYRCgoYDA0YCwoSBgwHFAwMHA8OGwsMFAcAAAAFABoAMQHmAY8AGAAxAEwAZwCCAAAlIgYHDgEVFBYXHgEzMjY3PgE1NCYnLgEjFSImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BIzUiBgcOAQcXPgE3PgEzMhYXHgEXNy4BJy4BIzUiBgcOAQcXPgE3PgEzMhYXHgEXNy4BJy4BIxUiBgcOAQcXPgE3PgEzMhYXHgEXNy4BJy4BIwEADxgKCQsLCQoYDw4YCgkLCwkKGA4LEwcHCAgHBxMLChMHBwgIBwcTChYoEREaCQ0HGA8PJRQTJQ8PGAcNCRoRESgVI0MdHjITDBIvHBw/IiI/HBwvEgwTMh0eQiQcNhcXJw4NDCQWFjEbGzIVFiQNDA4nFxc1HboLCQoZDg4ZCQkLCwkJGQ4OGQoJC3gIBwcTCgsTBwYJCQYHEwsKEwcHCMQMCwseEg0RHQoLCwsLCh0RDRIeCwsMiREQECwbDBoqDw8REQ4PKxoNGywPEBFEDw0NJhYNFiMNDQ4ODQwjFg0WJQ0NDwADACoAJQHWAZsADAASAB0AACUXIycjFTMXMwcXNycFIxUzNyc3MwcXNycHFyMHFwF9OGXQVk/QbDgMTU3+8E9WUw2KZTgMTU0MOGxTDLE33RHdOAxMTUQRVwx6Nw1NTAw4WAwAAwAzABMBzQGtAAQACQAwAAATESERIQEhESERJRQWFx4BMzI2Nz4BPQEzNSMVMxUUBgcOASMiJicuAT0BMzUjFTMVMwGa/mYBif6IAXj+1RIPDygXFygPDxIRMxEPDQwjExMjDA0PETMRAa3+ZgGa/ncBeP6I5xcpDw8REQ8PKRc7ERE7FCINDA8PDA0iFDsRETsAAAQAGgACAeYBvgBeAHcAkACpAAABIgYHDgEVFBYXBy4BJy4BIyIGBw4BFRQWFx4BMzI2Nz4BNxcOAQcOARUUFhceATMyNjc+ATU0JicuASMiBgcOAQcnPgE3PgE1NCYnNx4BFx4BMzI2Nz4BNTQmJy4BIwMyFhceARUUBgcOASMiJicuATU0Njc+ATMnIiYnLgE1NDY3PgEzMhYXHgEVFAYHDgEjJSImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BIwGiDhkJCQsBAsgEDQcIEgkOGQkKCgoKCRkOBw4HBgsFgAEDAQEBCgoJGQ4OGQkJCwsJCRkOCA4GBwsFgAIDAQEBAQHHBQwIBxIJDhkJCgoKCgkZDlUKEwcHCAgHBxMKCxIHBwgIBwcSC+8LEgcHCAgHBxILCxIHBwgIBwcSCwFECxIHBwgIBwcSCwsSBwcICAcHEgsBvgsJCRkOBQoEVAgMBQQFCgoJGQ4OGQkJCwMDAwgFXQMIBAQIBQ4ZCQkLCwkJGQ4PGAoJCwMDAwkFXAQIBAQJBAUJBFQIDAQFBQsJChgPDhkJCQv+vAgHBxMLChMHBwgIBwcTCgsTBwcIRAgHBxILCxIHBwgIBwcSCwsSBwcIiAgHBxMLChMHBwgIBwcTCgsTBwcIAAAABQA8AAIBxAG+ABoAMwBPAGoAhQAAASIGBw4BFREUFhceATMyNjc+ATURNCYnLgEjFTIWFx4BFRQGBw4BIyImJy4BNTQ2Nz4BMxMVFAYHDgEjIiYnLgE9AR4BFx4BMzI2Nz4BNxU1FAYHDgEjIiYnLgE9AR4BFx4BMzI2Nz4BNxU1FAYHDgEjIiYnLgE9AR4BFx4BMzI2Nz4BNxUBAClHGxofHxobRykpRxsaHx8aG0cpKEEYGBoaGBhBKChBGBgaGhgYQSizGhgYQSgoQRgYGgslFxc3Hh43FxclCxoYGEEoKEEYGBoLJRcXNx4eNxcXJQsaGBhBKChBGBgaCyUXFzceHjcXFyULAb4PDQwjE/8AEyMMDQ8PDQwjEwEAEyMMDQ8RDgsLGw4OGwsLDg4LCxsODhsLCw7+xBEOGwsLDg4LCxsOLwwVBwcICAcHFQweRA0cCwsNDQsLHA0vDBQIBwgIBwgUDC9WDhsLCw4OCwsbDi8NFAcICAgIBxQNLwAAAgA3ABcByQGpACEAOgAAJSc+ATc+ATU0JicuASMiBgcOARUUFhceATMyNjc+ATcXNyU0Njc+ATMyFhceARUUBgcOASMiJicuATUByXQJDgUFBRoWFjshIjsWFhkZFhY7Ig4dDQ0YCnQV/n8WFBQ1Hh40FBQXFxQUNB4eNRQUFix0ChgNDR0OIjsWFhkZFhY7IiE7FhYaBQUFDgl0FdseNRQUFhYUFDUeHjQUFBcXFBQ0HgAADgBHAAsBtgG1AGMAggDFANgA6wD4AQsBHgExAUoBbAGLAaQBwwAAJT4BNz4BJy4BJy4BIyIGBw4BBy4BJy4BIyIGBw4BBy4BJy4BIyIGBw4BBw4BFx4BFx4BFw4BBw4BFx4BFx4BMzI2Nz4BNx4BFx4BMzI2Nz4BNx4BFx4BMzI2Nz4BNzYmJy4BJycyFhceARcWBgcOAQcuAScuAScuAScuASc+ATc+ATMHDgEHDgEHLgEnLgEnLgEnLgEnJjQ1NCY1NDY1PAE3PgE3PgE3PgE3PgE3HgEXHgEXHgEXFBYVHAEVHAEVFAYVDgEHFw4BFQ4BBy4BJy4BJz4BNz4BNwcOAQcOAQcuAScuATUeARceARcnLgEnPgE3FAYVFBYVNzQ2Nz4BNx4BFx4BFw4BBw4BBzc+ATc+ATceARcUFhcuAScuAScXHgEXHgEXDgEHDgEHPAE1PAE1JzIWFx4BFw4BBw4BBy4BJy4BJz4BNz4BMwc+ATc+ATMyFhceARcOAQcOAQcOAQcOAQcuAScuAScmNDcXIiYnLgEnJjY3PgE3HgEXHgEXHgEXHgEXDgEHDgEjFyImJy4BJz4BNz4BNx4BFx4BFw4BBw4BIzcOAQcOASMiJicuASc+ATc+ATc+ATc+ATceARceAQcBiRAWBgYBBgIIBwYSDAcPCAgQCQYPCAkVCwsUCAkPBggOBwcNBg0SBgcIAgUBAwMNCwQLBhAWBgYBBgIIBwYSDQYNBwcOCAYPCQgUCwsVCQgPBgkQCAgPBwwSBgcIAgYBBgYWEAgFCwYFCQMEAgYFFA4FCwYFDQYBAQIBAgIIEAcIDQdeBAkEBQgFBAkFBAkEBQkEBQgEAQEBAQQIBQQJBQQJBAUJBAUIBQQJBAgNBwEBBw0IGgECAQIBBAkEBAkFBwwGBAkEUAULBQULBQECAQECBQ0GBg0GRQcMBgYMBwEBFAIBAQIBBQsFBQsFBg0GBg0FVwUJBAQJBAECAQIBBAkEBgwHPgQJBAQHBAQHBAQJBFUIDgcHDQUGDAcGDQYHDwcHDgcFDQcHDgekAwkGBQsGBQwHBg4HAgMBAQIBBQoFBQkEBgoECQsDAwMoBgsFBgkDAwEGBRQOBAkFBQoFAQIBAQMCBw4GBwwFfAcOBwcNBQcOBwcPBwYNBgcMBgUNBwcOCKwDCQUGCwUHDQgHEAgCAgECAQEGDQUGCwUOFAUGAgTgECAODhkKBAgDAwQBAQIEAhQiDAsNDAwLIRQCAwEBAQQDAwgECBMLCxkNBgwGECAODhkKBAgDAwQBAQEDAhQhCwwMDQsMIhQCBAIBAQQDAwgEChkODiAQdAEBAgYEBxMLDBsOBQkFBQkFBw8HBw4GAwMCAQGuAwUCAwQDAwQDAgUDAwYCAwYDBQgEBQkEBAkFBAkEAwYCAwYDAwUCAwQDAwQDAgUDBAkFBQoFBQoFBQoFBQoFBQkEBAUKBQUJBQIDAgEEAgMIAwMFAxkCBQICBAEFCwYGDAYECAQDCANCBQsFBQsFBQsFBQsFTgYMBgYLBQEEAgIFAgMIAwQIBB4CBAECAwIFCQUFCgUDBQMDCAM8AwcDBAcDAwcEAwcDBw0HBw0HqQsKCh0SAgUDAgYDAwcDAwUCEhwKCgpeBAYCAQEBAQEDAgcQCAgRCAQIBAQIBAUMBQsUCQgPBdoBAQIGBAcSDAwbDgQIBAQIBAgRCAgQBwIDAQEBUAoKChwSAgUDAwcDAwYCAwUCEh0KCgteBAYCAQEBAQIDAwYOBwcPBwUJBQUJBQ4bDAwSBwAEAF4AEwGiAa0ABQALABAAFQAAExE3FxEhAScHESERAzMVIzUVMxUjNV6iov68ATORkQEi5qqqqqoBrf5meHgBmv6Ia2sBZ/6ZAREREUQREQAAAAACACsADQHVAbMACgAVAAAlITcnBxc3JyE1IyUhBxc3JwcXIRUzAbP+mEgMXFwMRwF4Ef6aAWhIDFxcDEf+iBFxSAxcXAxHmVZIDFxcDEeaAAIAM//pAc0B1wApAC0AACUUBgcOASMiJicuATU0Njc+ATMVNycVIgYHDgEVFBYXHgEzMjY3PgE1IwMXBzUBvB4ZGkQnJ0QaGR4eGRpEJqKiKkocHCAgHBxLKipLHBwgEaxvb7UmRRkaHR0aGUUmJ0QaGR5VXl1VIBwcSisqSxscICAcG0sqAQVAQYEAAwAAAD4CAAGCADEAbQCXAAAlNDY1NCYnLgEjIgYHDgEHLgEjIgYHDgEHDgEHDgEVFBYXHgEzITI2Nz4BNTQmJy4BIxUjISImJy4BNTQ2Nz4BPwI+ATc+ATMyFh8BNz4BNz4BMzIWFx4BFRQwMRwBHQEzMhYXHgEVFAYHDgEjJyImJy4BNTQ2Nz4BMxU3JxUiBgcOARUUFhceATMyNjc+ATUjFAYHDgEjAaIBFRISMBwTJQ8PGQgHDwgNFwkJDAIPGQkKChAODiUVAT0TIg0MDw8NDCIUA/7HER8MCw4JBwgVDQkCAgkHBhEKBgsFEAcIFQ4OHxAYKhAPEhEQHAoLDAwLChwQogwWCAgKCggIFgxAQBAcCgsMDAsKHBAQHAoLDBEKCAgWDPoBAgEbMBISFQsKChwQAwQJBwgVDAUTDQwfERUlDg4QDw0MIxMTIg0ND6sOCwwfEQ4ZCwsQBAMKCg8GBgYDAwcPDxgJCQkSEBApGAEBAQERDQoKHBAQHAoLDDwJCAgWDQwWCAgJHyUlGgwKCxwPEBwLCgwMCgscEA0WCAgJAAAAABkAKwAcAdUBpAAnADgARQBSAF8AbAB5AIYAkwCgAK0AugDHANQA4QDuAPsBCAEVASIBLwFIAVUBbgF7AAABMCYxJSYGBwYWFwUhIgYHDgEVERQWFx4BMyEyNjc+ATURNCYnLgEjExQGIyEiJjURNDYzITIWFRElIgYVFBYzMjY1NCYjBzQmIyIGFRQWMzI2NTciBhUUFjMyNjU0JiMHIgYVFBYzMjY1NCYjFzQmIyIGFRQWMzI2NSciBhUUFjMyNjU0JiMXMjY1NCYjIgYVFBYzByIGFRQWMzI2NTQmIzMiBhUUFjMyNjU0JiMnIgYVFBYzMjY1NCYjFzI2NTQmIyIGFRQWMwciBhUUFjMyNjU0JiMzIgYVFBYzMjY1NCYjJzI2NTQmIyIGFRQWMzciBhUUFjMyNjU0JiMHIgYVFBYzMjY1NCYjFSIGFRQWMzI2NTQmIzUiBhUUFjMyNjU0JiM1IgYVFBYzMjY1NCYjFyIGBw4BFRQWFx4BMzI2Nz4BNTQmJy4BIxUiJjU0NjMyFhUUBiMVIgYHDgEVFBYXHgEzMjY3PgE1NCYnLgEjFSImNTQ2MzIWFRQGIwHCAf6WAwYBAQQDASP+zQUJAwMEBAMDCQUBegUJAwMEAwIDBwQCBAP+hgMEBAMBegME/wAFCAgFBgcHBl4HBQYHBwYFB8kFCAgFBQgIBZoFBwcFBgcHBmsHBgUICAUGB2sFBwcFBgcHBl4GBwcGBQgIBYgGBwcGBQgIBbMFCAgFBQgIBbMGBwcGBQgIBbMFCAgFBQgIBZIFCAgFBgcHBm8FBwcFBgcHBm4FCAgFBQgIBW4FBwcFBgcHBjcFCAgFBgcHBgUICAUGBwcGBQgIBQYHBwYFCAgFBgcHBsQFCQQDBAQDBAkFBgkEAwQEAwQJBgMFBQMEBQUEBQkEAwQEAwQJBQYJBAMEBAMECQYDBQUDBAUFBAFOAVUBBAMEBgFEBAMDCQX+/QUJAwMEBAMDCQUBAwQIAwMF/uYDBAQDAQMDBAQD/v2SBwUGBwcGBQcMBQcHBQYHBwYMBwUGBwcGBQcYCAUGBwcGBQgOBQgIBQUICAVABwYFCAgFBgcaCAUGBwcGBQgzBwYFCAgFBgcHBgUICAUGB2cIBQYHBwYFCBoHBgUICAUGB28HBgUHBwUGBwcGBQcHBQYHkQgFBQgIBQUIGggFBQgIBQUIiQcGBQgIBQYHMwcGBQgIBQYHmggFBgcHBgUIMwgFBQgIBQUIEQQEAwoFBQkEAwQEAwQJBQUKAwQEIgUDBAUFBAMFIwQDAwoFBQoDBAQEBAMKBQUKAwMEIgUEAwUFAwQFAAYAIgALAd4BtQAMABkAMgA3ADwARQAAEyIGFRQWMzI2NTQmIzMiBhUUFjMyNjU0JiMlIzUjFSMiBh0BFBY7ARUzNTMyNj0BNCYjJTMVIzUTIzUzFTcjNSMVIzUhFXgICgoIBwoKBzMHCgoHBwoKBwEqXu5eBAUFBF7uXgQFBQT+xczMzMzMZ1buVgGaARwKBwcKCgcHCgoHBwoKBwcKRFVVBQT/BAVERAUE/wQFRERE/niZmURmZu/vAAAABAARAFgB7wFoAAMABwALAA8AACUXEQcXJzcVJRcRBxcnNxUBAO/v3ry8/jPv7967u+CIARCIa2tr1muIARCIa2tr1gACADMACwHNAbUABAA3AAATMxUjNRcVHgEXHgEVFAYHDgEjIiYnLgE1NDY3PgE3NQ4BBw4BFRQWFx4BMzI2Nz4BNTQmJy4BJ/UREV4XJw0OEB4ZGkQnJ0QaGR4PDQ0lFhorDxARIBwcSyoqSxwcIBIQEC0bAbXMzCITDCIWFjMcJkUZGh0dGhlFJhsyFRYiDBMMJhgYOB8qSxscICAcG0sqIDkZGCYMAAAFADMAKQHNAZcACAANABcAHAAlAAABNSMVIxEhESMnMxUjNQczFSM1IxUjNTMXFSM1Mwc1MxUzNTMVIQE8eJEBmpFnVlYR+IB4gIBnVlbngHiA/ogBbSoq/rwBRBkZGSqJIiKJeDMzqogiIogAAAAAAwArAAsB1QG1ABgAMQA9AAABIgYHDgEVFBYXHgEzMjY3PgE1NCYnLgEjESImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BIxMjFSMVMxUzNTM1IwEALE4dHSEhHR1OLCxOHR0hIR0dTiwpRxsaHx8aG0cpKUcbGh8fGhtHKQkSdnYSd3cBtSEdHU4sLE4dHSEhHR1OLCxOHR0h/mcfGhtHKSlHGxofHxobRykpRxsaHwFEdxJ2dhIAAgBmAC0BmgGTAAMABwAAEw0BEScRLQF4AQD/ABIBNP7MAXWVlQEqHv6as7MAAAAAAgAY//kB5wHHACcASQAAFy8BPwE+AT8BJzcXNz4BNz4BMzIWMx8BHgEHDgEPARcHJwcOAQ8CJx8BPwIwNj8BFzcnNz4BJyYiIyIGDwEnBxcHDgEVDwKSFWUUXQMOBVSwLd9PAwkFBgwHCQ0BBAIDAQIBBwVPJy1WTgcVBQcnYVoTCwcCGwhfVhUnVgYFAwMHBAcRBlXfFrBlBhECWwYHZBYoBQUQBVVWLCdPBAUCAgECAQUJEwkJDwVQ3iyvTwYUBFcVhhRZBlUCGQdgrxXeVgUZDgEDBlUnFVdlBhUBAwULAAAAAwAaACQB5gGcAAgADwAUAAABNSERMxUhESMFESEVIRUjBSERIREBq/5vOwGRO/6AAW/+uyoBqv6RAW8BV0X+zUUBM90BETTdRQER/u8AAAAFAHj/+gGIAcYAHAAnACwANwA8AAABIyIGBw4BFREUFhceATsBMjY3PgE1ETQmJy4BIxMUBisBIiY9ATMVNSMRMxERIzU0NjsBMhYdAQMzFSM1AXHiBQkDAwMDAwMJBeIFCQMDAwMDAwkFBgMD4gMD7u7u7gMD4gMDkTQ0AcYDAwQIBf5iBQgEAwMDAwQIBQGeBQgEAwP+SwMDAwNPT2ABEf7vASIcAwMDAxz+qxERAAQAFP/wAewBzgA9AGoAbwB0AAABJwcnJiIPAQYUFx4BMzI2PwEXARcuASMiBgcOAQcOAQcwBjEOARUiFBUOATEwMjMyNjc+ATc+ATc2JicXAQEOAQcOAQc3Jwc+ATc+ATc1MzQ2MTQyNTI2Mz4BNz4BMzIWFx4BFx4BFRQGBwEHJzcXBxcHJzcB7EQQGAIHA4oCAgEEAQIDAYQS/tsTBg0HBgsGBQoEAQIBAQEBARMHAwQHHBAQIAwHCAIBAgUWAUH+kgcTCgsUCScMJgIDAgMHBAEBAQEBAQMHAwQJBAQIBAQHAwYHBwYBVmUsZSydLLgsuAGDRBAXAgKKAwcCAgEBAoQS/tsTAwMCAwIGBQECAQEBAQEBARxQAgMDDgwHEQkJEggVAUL+mwcKAwQDAScMJQgTCAkRBgEBAQEBAgMFAgECAgECBQMGEAgIEAYBZWUsZSxFLLksuQAAAAMAKwALAdUBtQAEAAgADAAANxcTBRc3JyUHFyc3A8ZMw/5WmwV3AUbPRzvRlqSZAarMRRE0ndGDd9P+tgAAAAADAC//8QHRAc8ASwBQAG0AAAE1NCYnLgEjISIGBw4BHQEjIgYHDgEdARQWFx4BMzcyFh0BIxUzNSM1NCYnLgErATEjIiY9ATQ2OwEVFBYXHgEzITI2Nz4BPQEzNSMDIzUzFRMUBgcOASMhIiYnLgE9ATQ2Nz4BMyEyFhceAR0BAcAHBQYPCf7tCA8GBgYIBw0FBQUFBQUNB6AICiJVIgUFBQwIFYsHCwsHCAYGBg8IARMJDwYFBxERmjMziQQDBAkF/u0FCQMDBAQDAwkFARMFCQQDBAGLGgkPBgUHBwUGDwkaBgUEDQc7Bw0EBQYBCwc7zc07Bw0EBQYKBzsHCxsJDwUGBwcGBQ8JGxH+d6urAV0FCQMEBAQEAwkFRgUJBAMEBAMECQVGAAQAMwATAc0BrQARABcALQA9AAABIyIGBw4BFREUFhceATMhESMHFScHNTMjMxU3FzUzESEiBgcOAQc1NDY3PgEzEyImJy4BNTQ2Nz4BMyEVIQEAiBAZCQkKBAcHHBgBVM0RKi5Ydw4/O7z+vAkOBwYLBQgGBxMMAQ8TBgYGBwYHEwwBRP69Aa0KCQkZEP7lBRQJCg4BmhGkJyilyTU2yv7mAgIDBgX4DBMHBgj+iAYFBQ0GChAFBQZNAAAAAwA8ABwBxAGkABQAHQAuAAABLgEjIgYPATUhESERIzc+ATU0JicDIREzBxUzNxUTByM1Nz4BMzIWFx4BFRQGBwG8AwoFBQkES/7vAUQQTAQEBARN/t79hSOHQc8LzgIDAQEEAQIBAQIBnQQDAwRLDv68ARFMAwoFBQkE/pABIoYlh/4BWNANzwEBAQECAwEBBAEAAAQAEQBYAe8BaAADAAcACwAPAAATETcnHwEHNTcRNycfAQc1Ee/vEby83u/vEbu7AWj+8IiIHWtr1h3+8IiIHWtr1gAACAArAAsB1QG1ABsAKQA6AD8ARABJAE4AUwAAExUjMBQVFBYXHgEzOgEzOgEzMjY3PgE1NBAxIQMiJj0BMxUUBgcOASsBJRQGBw4BIyE+ATc+ATURIREBMxUjNRUzFSM1FTMVIzU3IxUzNQcjNTMVkWYKCQgTCQlVNDVjFgoSBwgI/rwvCB5VBQUFDwgJAWIGBQQNBv7uBQYDAgIBIv8A3t7e3t7e3t7eEby8AbXvchkNEgYGBQgIBxIKDgFp/mcME3pzBA0GBgkiBg0EBQYECgUGCQQBYv6aAUQREeYRETwREeaAgG9eXgAAAAAGACsACwHVAbUABAAJAA4ALQA2AE8AABMzFSM1FTMVIzUVMxUjNSUXNCYnLgEnESoBIyIGBw4BFRQWFx4BMzI2NzY0PQE3JzUeARceARcDDgEHDgEjIiY1NDY3PgE7ARUxFAYHDgEHK97e3t7e3gEzdxcTFDEZCBkUExkICAcHCAcbFBwcBgZlZRUjDQwRA4MDBwUFDAYlDwcGBxIMNQIBAQUEAVcREUwREU0REY8PICgNDQ8G/rwJBwcTCQcSCAgKFA8QIxDcBA1BBgwJCRgS/tcDBQECAR4ECA0EBQQNBwwGBQoDAAAAAwAz//cBzQHJADsAVABtAAABBRUuAScuASMiBgcOARUUFhceATMyNjc+ATUxETcVLgEnLgEjIgYHDgEVFBYXHgEzMjY3PgE1PAE1MREBIiYnLgE1NDY3PgEzMhYXHgEVFAYHDgEjJSImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BIwHN/uYFDAcHEAgPGwkKDAwKCRsPDxoKCQz4BQ0HBw8JDxoKCgsLCgoaDw8bCQoM/q8MFAcICQkIBxQMCxQICAgICAgUCwEICxQICAgICAgUCwwUBwgJCQgHFAwByWT3BgoDBAMLCgoaDw8bCQoMCwoKGg8BGljlBgoDAwQLCgoaDw8bCgkMDAkKGw8BAgEBJ/4/CQgHFAwLFAgICAgICBQLDBQHCAleCQcIFAwLFAgHCQkHCBQLDBQIBwkAAAQAgP/gAYAB4AAxADsARQBVAAABNTQ2Nz4BNz4BPQEjFRQGBw4BBw4BHQEOAQcOAR0BFBYXHgEzMjY3PgE9ATQmJy4BJxcVIzUeARceARUjNDY3PgE3FSM1FyImJy4BPQEzFRQGBw4BIwEJEwoHDgYFBxEVCgcNBgUHGSsQEBMUEhEvGhovERIUExAQKxlmZhUlDg4Q3hAODiUVZm8XKA8PEt4SDw8oFwFXGgYPBgQJBQYLByoqBw4HBAkFBQsHGgIUERAsGX8ZLhEQFBQQES4ZfxksEBEUAnwMdwISDg4mFRUmDg4SAncM6hEPDicWYmIWJw4PEQAABgAAAK0CAAETABgAMQBKAGMAfACVAAATIgYHDgEVFBYXHgEzMjY3PgE1NCYnLgEjFSImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BIyUiBgcOARUUFhceATMyNjc+ATU0JicuASMVIiYnLgE1NDY3PgEzMhYXHgEVFAYHDgEjJyIGBw4BFRQWFx4BMzI2Nz4BNTQmJy4BIxUiJicuATU0Njc+ATMyFhceARUUBgcOASMzChMHBwgIBwcTCgsTBgcICAcGEwsHDAUEBgYEBQwHBw0EBQUFBQQNBwGaCxMGBwgIBwYTCwoTBwcICAcHEwoHDQQFBQUFBA0HBwwFBAYGBAUMB80LEgcHCAgHBxILCxIHBwgIBwcSCwcMBQUFBQUFDAcHDAUFBQUFBQwHARMIBwcSCwsSBwcICAcHEgsLEgcHCFUFBQUMBwcMBQUFBQUFDAcHDAUFBVUIBwcSCwsSBwcICAcHEgsLEgcHCFUFBQUMBwcMBQUFBQUFDAcHDAUFBVUIBwcSCwsSBwcICAcHEgsLEgcHCFUFBQUMBwcMBQUFBQUFDAcHDAUFBQAAAAACACsACwHVAbUAJABKAAATDgEHDgEVFBYXHgEzMjY3PgE3DgEHDgEjIiYnLgE1NDY3PgE3Nw4BBw4BFRQWFx4BMzI2Nz4BNw4BBw4BIyImJy4BNTQ2Nz4BNzGeBQgCAwMgHBtKKgwYDAwWCw0lFhczHClJGxsfDg0MJRYvIzwVFhgiHR1PLSZFHBwnCAweEBAkEydDGRkeBwcGEwwBjwoWCwsXDCpJHBsgAwIDCQUXJg0NDyAbG0gqGzIWFiUNJgkoGxxEJS1PHR4iGRcWPSQNEwcHBx0ZGUQmEyIQEB0NAAIAIgAcAd4BpAAMABEAACURIREzFSMVMzUjNTMBIREhEQHe/kTVO4g71f5VAZr+ZnEBM/7NRBERRAEi/u8BEQADAG//4QGRAd8AGgA1AF0AACUyNjc+AT0BNCYnLgEjIgYHDgEdARQWFx4BMwM0Njc+ATMyFhceAR0BFAYHDgEjIiYnLgE9ARcVFAYHDgEjIiYnLgE9ASMVFBYXHgEXIxUjFTM1IzUjPgE3PgE9ASMBABMjDA0PDw0MIxMTIg0NDw8NDSITTQ0KChwQEBwKCwwMCwocEBAcCgoNzRQSES8aGi8REhQRFhITMh0BTapMAh0yExIWEXoPDA0iFKoTIg0NDg4NDSITqhQiDQwPAQgQHAoKDAwKChwQqhAcCwoMDAoLHBCqVVUbLhIRFBQREi4bVVUdNBMUFwJVERFVAhcUEzQdVQAAAAAGADMATwHNAXEABAAJAA4AEwAYAB0AABMVITUhBSE1IRUFITUhFTchFSE1ByE1IRU3IRUhNTMBmv5mAYn+iAF4/ncBmv5mEQF4/ogRAZr+ZhEBeP6IAXFERDMiIoBERDMiIqJERDMiIgAAAAAFACsAEQHVAa8ADQASABcAHAAhAAABJwcxBycHETcXNxcRJwMHETcRFycRFxE3BxE3ERcnERcRAXELCF5mb29mZm9k4FVVZlVVZ1VVZlVVAaoFBC8zOP6aODQ0OAFmM/6tKgFAK/6/KioBQSv+wCoqAUAr/r8qKgFBK/7AAAAAAAQAVf/gAasB4AAaADMATwBpAAABMhYXHgEVFAYHDgEPAScuAScuATU0Njc+ATMVMjY3PgE1NCYnLgEjIgYHDgEVFBYXHgEzNSIGBw4BFRQWFx4BFxsBPgE3PgE1NCYnLgEjMRUiJicuATU0Njc+ATMyFhceARUUBgcOASMxAQAgOBUUGQMDAggFhYUFCAIDAxkUFTggDBYICAoKCAgWDAwWCAgKCggIFgwjPhgXGwMDAwkFlJQFCQMDAxsXGD4jCQ8GBgcHBgYPCQkPBgYHBwYGDwkBzxgVFTggChQJChMI5+cIEwoJFAogOBUVGNUJCAgWDA0VCAkJCQkIFQ0MFggICeYbFxc+JAsXCwoVCf8AAQAJFQoLFwskPhcXG9UGBgYPCQkQBQYHBwYFEAkJDwYGBgAABQArAFgB1QFoAAUADAAQABwAIAAAASERIREjDwEGIi8BIQUXBzUXNxceATMyNj8BFyElJzcVAcT+ZwGqERGlBhAGpQFm/olvbw1uLwUOBwcOBS9u/pIBe29vAWj+8AEQEaQGBqQGb2/e6G0vBgUFBi9tCm9v3gAABQAr//EB1QHPAAwAHQAjACwAMQAAAScuASMiBg8BESERJyU3NjIfAQcnLgEjIgYPASc3FwcxBzUXBzcxNzYyHwEhJRUnNxUB1LoFDgcHDgW7AaoB/nKsBhAGtHstBQ4HBw4FLnsJZgFvcGMKnwYQBqn+kgF7cXEBC7kFBgYFu/7oARgCAawGBrR7LgUGBgUuegmPAm7gcHsJoAUFqeXacHEHAAALACv/8QHVAc8ADwATABoAKQAuADUAPgBDAEgATQBSAAABJy4BIyIGDwEjFQcRIREnDwE1Fyc2Mh8BIzcfARUHJy4BIyIGDwEnNTMHNxUnNwc1FwcxBzUXNzE3NjIfASElFSc3FSUzFSM1FTMVIzU1MxUjNQHUugUOBwcOBSk9VQGqARJCQtAGEAYcVBxKMygtBQ4HBw4FLier9jpDCQpwAW8NCp8GEAap/pIBe3Fx/wB4eHh4VlYBC7kFBgYFKD5V/ugBGAIHQoRCtAYGHBwtNKYoLgUGBgUuJ9t/OoVCCS0OcAJu0t0JoAUFqejdcHEEbRERZhERMxERAAAEAEQACwG8AbUAHgAjACgARwAAARUUBgcOASMiJicuAT0BIxUUFhceATMyNjc+AT0BIxcVIzUzIRUjNTMTIiYnLgE9ATMVFBYXHgEzMjY3PgE9ATMVFAYHDgEjAVYODAsfEhIfCwwOZh4ZGkQnJ0QaGR5mVURE/u5ERGcjPhgXG0QRDg0mFRUmDQ4RRBsXGD4jAbXuEh8MCw4OCwwfEu7vJkUZGh0dGhlFJu8RMzMzM/54GxcXPiOamRYlDg4QEA4OJRaZmiM+FxcbAAADAAAAcQIAAU8AAwBAAHcAAAEHFzcHIiYnLgE1NDY3PgEzMhYXHgEXMRUXIxUzNSMVJyMuAScuASMiBgcOARUUFhceATMyNjc+ATcnDgEHDgEjJSIGBw4BBxc+ATc+ATMyFhceARUUBgcOASMiJicuAScxJwcXMx4BFx4BMzI2Nz4BNTQmJy4BIwFHlAyU5BMjDA0PDw0MIxMJEggJDgciHzwRIQEHEgkKFgsXKA8PEhIPDygXDBYKCxIHDAYQCAkTCgEiCxQJCREIDQYOCAcRCRMjDA0PDw0MIxMJEggIDwY5DDgBBxEKChULFygPDxISDw8oFwEzkwyTpQ8NDCMTEyMMDQ8EAwQJBgEhETwfIQgLBAQFEg8PKBcXKA8PEgUEBQ0IDAcLBAQEzQQEAwsGDAUJAwMDDw0MIxMTIwwNDwQDAwoGOAw4BwwEBAQSDw8oFxcoDw8SAAYAAABGAgABegAYADEASgBjAHwAlQAAASIGBw4BBx4BFx4BMzI2Nz4BNy4BJy4BIxEiJicuASc+ATc+ATMyFhceARcOAQcOASM1IgYHDgEVFBYXHgEzMjY3PgE1NCYnLgEjFSImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BIzUiBgcOARUUFhceATMyNjc+ATU0JicuASMVIiYnLgE1NDY3PgEzMhYXHgEVFAYHDgEjAQAjQB4fPiIdNx4eRSsrSiAgNRYWNiAgSiomPhwcMhofORwcOR8lQh0dMhYVMh0dQiYVJQ4OEBAODiUVFSUODhAQDg4lFRIfCwwNDQwLHxISHwsMDQ0MCx8SDBYICAoKCAgWDAwWCAgKCggIFgwJDwYGBwcGBg8JCQ8GBgcHBgYPCQF6FhQTOSQeOBUVGh8XFzUWGzcWFx3+3hUTEzEcITISERIYExQxGRYwFBQZ7hAODiUVFSUODhAQDg4lFRUlDg4Quw0MCx8SEh8LDA0NDAsfEhIfCwwNkQoICBYMDBYICAoKCAgWDAwWCAgKZwcGBg8JCQ8GBgcHBgYPCQkPBgYHAAMAVQACAasBvgATACMAKAAAJTU0JicuASMiBgcOAR0BIxUhNSMnNDY3PgEzMhYXHgEdASM1EyE1IRUBbxIPDygXFygPDxI8AVY8zQ8NDCMTEyMMDQ+8+P7MATTpZhcoDw8SEg8PKBdm5+dmEyINDQ8PDQ0iE2Zm/sTExAAGAIn/4AF3AeAACAAPABQAHAA3AEYAABMVFxEzETc1IxczFQcjJzUTNTMVIxMHESMRJzMHByIGBw4BHQEUFhceATMyNjc+AT0BNCYnLgEjFxQGIyImPQE0NjMyFh0BiTt4O+4RzALIAjtWVlgCVi+0LS0FCgMEBAQEAwoFBQoDBAQEBAMKBQkFBAQFBQQEBQHgM2f+mgFmZzMRHgQEHv4iIiIBXgT+2QEnUU1eBAMECQYiBQkEAwQEAwQJBSIGCQQDBDwDBQUDIgQFBQQiAAAAAgArAAsB1QG1ADIAbQAAJSImJy4BJzceATMyNj8BPgE1NCYvAS4BIyIGDwEnNz4BMzIWHwEeARUUBg8BDgEHDgEjByImJy4BLwEuATU0Nj8BPgEzMhYfAQcnLgEjIgYPAQ4BFRQWHwEeARceATMyNjc+AT8BFwcOAQcOASMBGQgQBwcOBgwKFw0MGAlrCgkJChQJGAwMGAlMDEwLHhAQHgsUDAwMDGsGDgcHEAeJCBAHBw4FFAwMDAxrDB4PEB4MFAwUChcNDBgJawoJCQoUBAsFBg0GBg0GBQsESAxIBQ4HBxAIkwMDAwkGDAkKCglsCRgMDBgJFAoJCQpLDEsMDAwMFAseEBAeC2wGCQMDA4gDAwMJBhQLHhAQHgxrDAwMDBQMFAkKCglsCRgMDBgJFAUHAgMCAgMCBwVHDEcGCQMDAwAAAgArACEB1QGfACYATgAAATIWFx4BFRQGBw4BDwEnLgEnLgE1NDY3PgEzMhYXHgEXPgE3PgEzNSIGBw4BBy4BJy4BIyIGBw4BFRQWFx4BHwE3PgE3PgE1NCYnLgEjMQFeFSUODhAEBAQMB6WoBgsEAwQQDg4lFRAdDAwTBgYTDAwdEA4bDAwVCAgVDAwbDhkrEBESBAQFDAi0sQkNBQQFEhEQKxkBjhAODiUVCxQKCRAHpqkGEAkJFAoVJQ4OEAkICRcODhcJCAkRBgYGEQsLEQYGBhMQECsZCxcKCxMItbIIFAoLGAwZKxAQEwAEAFX/6AGrAdgALwA0AEEAkAAAATQmJy4BIyIGBw4BFRQWFx4BFzEyFhUwMjEeARceAR0BMzU0Njc+ATcxPgE3PgE1AzUzFSMTIiY1NDYzMhYVFAYjFzgBIw4BBw4BHQEjNT4BNz4BNTQmJy4BIyIGBw4BFRQWFx4BFxUjNTQmJy4BJzA0MSI0IzA0Iy4BJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BBwGrGxcYPiMjPhgXGwoJCRkPAQEBBQsFBAeIBwUFDAUQGQkJCt5mZjMHCgoHBwoKB1wBBw4GBgcqBQkEAwQFBQUMBwcMBQUFBAMECQUqBwYFDgcBAQEOFwgHCRkUFTggIDgVFBkJCAcXDwEtIz4YFxsbFxg+IxUnEREeDAEBBA0ICRUMeHgNFgkIDQQLHhESJxX+zTMzASIKBwcKCgcHCmoFEAoLGQ8izgEHBAQLBgcMBQUFBQUFDAcGCwQEBwHOIg4ZCgoQBQEBAQsbEA8jEiA4FBUYGBUUOCASIxAPHAsAAwArAAsB1QG1ABgAMQA2AAABIgYHDgEVFBYXHgEzMjY3PgE1NCYnLgEjESImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BIyczFSM1AQAsTh0dISEdHU4sLE4dHSEhHR1OLClHGxofHxobRykpRxsaHx8aG0cpbt3dAbUhHR1OLCxOHR0hIR0dTiwsTh0dIf5nHxobRykpRxsaHx8aG0cpKUcbGh/NEhIAAAAAEgA8ABwBxAGkABgAMQBKAGMAfACVAK4AxwDgAPkBEgErAUQBXQF2AY8BqAHBAAA3IgYHDgEVFBYXHgEzMjY3PgE1NCYnLgEjFSImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BIxEiBgcOARUUFhceATMyNjc+ATU0JicuASMVIiYnLgE1NDY3PgEzMhYXHgEVFAYHDgEjFSIGBw4BFRQWFx4BMzI2Nz4BNTQmJy4BIxUiJicuATU0Njc+ATMyFhceARUUBgcOASMXIgYHDgEVFBYXHgEzMjY3PgE1NCYnLgEjFSImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BIxEiBgcOARUUFhceATMyNjc+ATU0JicuASMVIiYnLgE1NDY3PgEzMhYXHgEVFAYHDgEjFSIGBw4BFRQWFx4BMzI2Nz4BNTQmJy4BIxUiJicuATU0Njc+ATMyFhceARUUBgcOASMXIgYHDgEVFBYXHgEzMjY3PgE1NCYnLgEjFSImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BIxEyNjc+ATU0JicuASMiBgcOARUUFhceATM1MhYXHgEVFAYHDgEjIiYnLgE1NDY3PgEzFSIGBw4BFRQWFx4BMzI2Nz4BNTQmJy4BIxUiJicuATU0Njc+ATMyFhceARUUBgcOASNvCxIHBwgIBwcSCwsSBwcICAcHEgsHDAUFBQUFBQwHBwwFBQUFBQUMBwsSBwcICAcHEgsLEgcHCAgHBxILBwwFBQUFBQUMBwcMBQUFBQUFDAcLEgcHCAgHBxILCxIHBwgIBwcSCwcMBQUFBQUFDAcHDAUFBQUFBQwHkQsSBwcICAcHEgsLEgcHCAgHBxILBwwFBQUFBQUMBwcMBQUFBQUFDAcLEgcHCAgHBxILCxIHBwgIBwcSCwcMBQUFBQUFDAcHDAUFBQUFBQwHCxIHBwgIBwcSCwsSBwcICAcHEgsHDAUFBQUFBQwHBwwFBQUFBQUMB5ELEgcHCAgHBxILCxIHBwgIBwcSCwcMBQUFBQUFDAcHDAUFBQUFBQwHCxIHBwgIBwcSCwsSBwcICAcHEgsHDAUFBQUFBQwHBwwFBQUFBQUMBwsSBwcICAcHEgsLEgcHCAgHBxILBwwFBQUFBQUMBwcMBQUFBQUFDAeCCAcHEgsLEgcHCAgHBxILCxIHBwhVBQUFDAcHDAUFBQUFBQwHBwwFBQUBdwgHBxILCxIHBwgIBwcSCwsSBwcIVQUFBQwHBwwFBQUFBQUMBwcMBQUFOwkGBxMLChMHBwgIBwcTCgsTBwYJVgYEBQwHBw0EBQUFBQQNBwcMBQQGPAgHBxILCxIHBwgIBwcSCwsSBwcIVQUFBQwHBwwFBQUFBQUMBwcMBQUFAXcIBwcSCwsSBwcICAcHEgsLEgcHCFUFBQUMBwcMBQUFBQUFDAcHDAUFBTsJBgcTCwoTBwcICAcHEwoLEwcGCVYGBAUMBwcNBAUFBQUEDQcHDAUEBjwIBwcSCwsSBwcICAcHEgsLEgcHCFUFBQUMBwcMBQUFBQUFDAcHDAUFBQERCAcHEgsLEgcHCAgHBxILCxIHBwhVBQUFDAcHDAUFBQUFBQwHBwwFBQV/CQYHEwsKEwcHCAgHBxMKCxMHBglWBgQFDAcHDQQFBQUFBA0HBwwFBAYAAAAEACsATwHVAXEACwAuADkASAAAJScHJwcXBxc3FzcnNyEVMxcUFhceAR8BHgEXHgE7ATI2Nz4BPwE+ATc+ATU3MzUHDgErASImLwEhBzcdARQGIyEiJj0CJyEHAT8MMzMMMzQNMzMNNMn+VgwFAwIDBwQeAgUEBAsH5AcLBAQFAh4EBwMCAwUMUwEHCOQJBgEdAT4dMQoH/rwHCgUBcAXxDDMzDDMzDDMzDDOzESIFCgQEBgKvBwwEBQUFBAUMB68CBgQECgUiEf4GDQ8DqqnNAQEHCgoHAQEgIAAABAArAAsB1QG1ABgAIwA8AFUAAAEyNjc+ATU0JicuASMiBgcOARUUFhceATMXNSMVMxUjFTM1IwMiBgcOARUUFhceATMyNjc+ATU0JicuASMRIiYnLgE1NDY3PgEzMhYXHgEVFAYHDgEjAQEFCgMEBAQEAwoFBQoDBAQEBAMKBREzERFFEhIsTh0dISEdHU4sLE4dHSEhHR1OLClHGxofHxobRykpRxsaHx8aG0cpAS4EAwMKBQUKAwQEBAQDCgUFCgMDBCMREZEREQE7IR0dTiwsTh0dISEdHU4sLE4dHSH+Zx8aG0cpKUcbGh8fGhtHKSlHGxofAAAEACoACwHWAbUACgAPABkAIwAAAQc1IxUHFzcXNycHMxUHNQcVMzUzFTM1JwcFIzUjFSM1NxcVAQBVRTwMysoM1ogiIhJ4RHiamgEiVWZViIgBtVUiZjwMyckM1UQiIkSazHd3zJqau3d3tImJtAAACgAzABMBzQGtABgAMgBNAFwAeACHAKIAsQDPAN4AAAEiBgcOARUUFhceATMyNjc+ATU0JicuASMRIiYnLgE1NDY3PgEzMTIWFx4BFRQGBw4BIz8BHgEXHgEVFAYHDgEHJz4BNz4BNTQmJy4BJzcHLgEnLgEnNx4BFx4BFycHLgEnLgEjMSIGBw4BByc+ATc+ATMyFhceARcHFw4BBw4BByc+ATc+ATcHFw4BBw4BFRQWFx4BFwcuAScuATU0Njc+ATcXNx4BFx4BFwcuAScuAScXNx4BFx4BMzgBMTI2Nz4BNxcOAQcOASMiJicuASc3Jz4BNz4BNxcOAQcOAQcBACpLHBwgIBwcSyoqSxwcICAcHEsqEyMMDQ8PDQwjExMjDA0PDw0MIxNmQQUIAgMDAwMCCAVAAgMBAQEBAQEEAjhAAwgFBQoGKwkQBwgNBUkrBQoFBgoGBgoGBQoFKwoUCwoXCwsXCgsUCrkrBgoFBQgDQAUNCAcQCUNBAgQBAQEBAQEDAkAFCAIDAwMDAggFCEADCQQFCwUqCREHBw0GSSwECwUFCwYGCwUFCwUrChUKCxYMDBYLChUKuioFCwUECQNABg0HBxEJAa0gHBxLKipLHBwgIBwcSyoqSxwcIP7VDw0MIxMTIwwNDw8NDCMTEyMMDQ+JKwoUCwsWDAsXCgsUCisFCgUGCgYGCwUFCwU6KwYKBQQIBEAGDQcHEQhCQAIDAQEBAQEBAwJABQgCAwMDAwIIBQhABAgEBQoGKwgRBwcNBkkrBQsFBQsGBgoFBgoFKwoUCwoXCwwWCwsUCrorBgoFBQgEPwUNCAcQCUNBAgQBAQEBAQEEAkEFCAIDAwMDAggFCT8ECAUFCgYrCRAHCA0FAAAAAAQAKwALAdUBtQAYADEAZABxAAABIgYHDgEVFBYXHgEzMjY3PgE1NCYnLgEjESImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BIwMiBgcOAQczNDY3PgEzMhYXHgEVFAYHDgEHDgEHDgEHMzQ2Nz4BNz4BNz4BNTQmJy4BIxciBhUUFjMyNjU0JiMBACxOHR0hIR0dTiwsTh0dISEdHU4sKUcbGh8fGhtHKSlHGxofHxobRykBEBkJCAkBEwYGBhIMCRAFBgcDAgMHBAkLBAMDARQBAgIJCQYJBAMECggIFg0BBwoKBwcKCgcBtSEdHU4sLE4dHSEhHR1OLCxOHR0h/mcfGhtHKSlHGxofHxobRykpRxsaHwE0CgkJGRALFAcHCAYFBg4JBgsEBQkECAwHBhALCgsFBAoJBQsGBg4JDRQHBwi9CgcHCgoHBwoAAAAAAQArABwB1QGkABUAACUVIxEjESMRIxEjNSMVIzUjFTEVITUBxFURVRJVEVURAar6zQF3/okBAP8AZmaZmRHeAAMAMwATAc0BrQAEAA0AFgAAExEhESEFFQcnBycHESEBNTcXNxc3ESEzAZr+ZgGJcU1VMzIBeP6INTRVTW3+iAGt/mYBmhFKoj14IjoBP/6IHz0idj2d/vAAAAAABQAV//EB6wHPAHIAiwCkAL0A1gAAASIGBw4BFRQWFx4BFwciJiMiBgcnPgE1NCYnLgEjIgYHDgEVFBYXHgEXBy4BIyIGBw4BFRQWFx4BMzI2Nz4BNTQmJy4BJzceATMyNjcXDgEVFBYXHgEzMjY3PgE1NCYnLgEnNzoBMzI2Nz4BNTQmJy4BIwEiJicuATU0Njc+ATMyFhceARUUBgcOASM3IiYnLgE1NDY3PgEzMhYXHgEVFAYHDgEjFyImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BIxMiJicuATU0Njc+ATMyFhceARUUBgcOASMBwAkPBgYHAwMCBwRQAgMCCA0GUQMDBwYGDwkJDwYGBwICAgUEVgMHBAkPBgYHBwYGDwkJDwYGBwICAgUDVgMGBAgNBlACAwcGBg8JCQ8GBgcDAwIIBFACBAIJDwYGBwcGBg8J/oAFCgMDBQUDAwoFBQoDBAQEBAMKBYAFCgMEBAQEAwoFBQoDAwUFAwMKBZEFCgMEBAQEAwoFBQoDBAQEBAMKBW8FCgMEBAQEAwoFBQoDAwUFAwMKBQHPBwYFEAkFCwQFBwPVAQUFQwQKBggQBgYGBgYGEAgFCQQEBwOWAQEGBgYPCQkQBQYHBwYFEAkFCAQEBwOWAQEFBUMFCQYJDwYGBgYGBg8JBgoFBQcD1AYGBg8JCRAFBgf+MwQEAwoFBQkEAwQEAwQJBQUKAwQE3gQEAwkGBQkEAwQEAwQJBQYJAwQEdwQDBAkFBQoDBAQEBAMKBQUJBAMEASIEAwQJBQUKAwQEBAQDCgUFCQQDBAAAAAAEACsACwHVAbUAKAAxAEYAVQAAJTQmJy4BJzEjMQ4BBw4BFRQWFx4BMzI2Nz4BNzE3OAExNzU+ATc+ATUnBzUeARceARcDIiYnLgE1NDY3PgE3FRcOAQcOASM3JzceARceARUUBgcOAQcB1SAbHEsqEipLHBsgIR0dTiwQHQ8OGg0GCBMgDAsMIqocNBcWIguzKUcbGh8dGhlEJ3ALGQ0NGw51aK0CBAECAQsKCx0S4CtMHR0iAgIiHR1MKyxOHR0hBAQEDAgEBQEOJhUWMhpPQ7gBEhAPKhn+7R8aG0cpJ0YbGiACx6QHCwMEBCeZQwcQCAcRCBgtFBQjDQARACsACwHVAbUAKgA5AEcAVQBkAHgAjACbAKkAtwDGANoA7gEBARQBJwE6AAABOAExOAExOAEjIgYHDgEVFBYXHgEzMjAxOAExOAExMjY3PgE1NCYnLgEjFzI2Nz4BNx4BFx4BFSM1PQEeARceARcOAQcOASMnFSImJy4BJz4BNz4BNx0BIzQ2Nz4BNx4BFx4BMwcjPgE3PgE3HgEXHgEXDgEHDgEVFRQWFx4BFw4BBw4BBy4BJy4BJzM7ARUiBgcOAQcuAScuATUXFS4BJy4BJz4BNz4BMxc1MhYXHgEXDgEHDgEHPQEzFAYHDgEHLgEnLgEjNzMOAQcOAQcuAScuASc+ATc+ATU1NCYnLgEnPgE3PgE3HgEXHgEXIzcOAQcOAQcuAScuASceARceARcnDgEHDgEHLgEnLgEnPgE3PgE3Az4BNz4BNx4BFx4BFy4BJy4BJxc+ATc+ATceARceARcOAQcOAQcBAAEsTR0dISEdHU0sASxOHR0hIR0dTiwJCBEICBAIAwQBAQJMCBEICA4GCA8HCBAHEgcQCAgPBwUPCAgRCE0CAgEEAggQCQgRCF5dAQYGBhAJCA4IBxAIAwQCAQICAQIEAwgQBwgOCAkQBgYGAV0RTQgRCAkQCAIEAQICTQgRCAgPBQcPCAgQBxIHEAgHDwgGDggIEQhMAgEBBAMIEAgIEQhdXgEGBgYQCQgOCAgPCAIFAQECAgEBBQIIDwgIDggJEAYGBgFeJgcNBgcOBwQIBgULBg0aDAwVCroHCwUFCQQHDQcHDAcKFQwMGQ5eBg0HBw0HBAkFBQsHDhkMDBUKugYLBQYIBAcOBwYNBwoVDAwaDQG1IR0dTiwsTh0dISEdHU4sLE4dHSF/AQEBAwIJFAsLFwtNEVwDDQsLHRECAwEBAVxcAQEBAwISHQoLDgJtTQsXCwsUCQEEAQEBTRAfDw8aDAQHAwMGAgoWCwwXDBIMFwwLFgoCBgMDBwQMGg8PHxBNAQEBAwIJFAsLFwteXAIOCwodEgIDAQEBXFwBAQEDAhEdCwsNA21NCxcLCxQJAgMBAQFNEB8PDxoMBAcDAwYCChYLDBcMEgwXDAsWCgIGAwMHBAsbDw8fEIADBgMDBQIMFgoJEAcDCwYHEQo2BxAJChYMAwQDAwYDChEGBwoE/rgDBgMDBQIMFgoJEAcECgcGEQo2BxAJChYMAgUDAwYDChEHBgoEAAAAAgBm/+ABmgHgAAYADQAAAQczBzcjNzcDMwcTIzcBLBZhoxZhoxjecRvecRsBpLPVs9U8/t7eASLeAAAAAwAAAHUCAAFLAE0AZgB/AAAlIy4BJy4BIyIGBw4BBycmIg8BLgEnLgEjIgYHDgEHIyIGFRQWOwEeARceATMyNjc+ATU8ATU3FxwBFRQWFx4BMzI2Nz4BNzMyNjU0JiMFIiYnLgE1NDY3PgEzMhYXHgEVFAYHDgEjISImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BIwHzBQITDg4kFRMiDg0UBBgCBAIYBBQNDiITFSQODhMCBQUICAUFAhMODiQVFicODxAaGhAPDicWFSQODhMCBQUICAX+iRMgDQwODgwNIBMSIQwMDg4MDCESAQgSIQwMDg4MDCESEyANDA4ODA0gE+0UIg0MDw0LCx4SDQEBDRIeCwsNDwwNIhQIBQUIFCINDA8RDw4nFgEDAg0NAgMBFicODxEPDA0iFAgFBQhnDwwMIBMTIAwMDw8MDCATEyAMDA8PDAwgExMgDAwPDwwMIBMTIAwMDwAACAAzAAIBzQG+ACkAMgA2AE8AaABxAHYAewAAAT4BNz4BNTQmJy4BIyIGBw4BBy4BJy4BIyIGBw4BFRQWFx4BFyMRIREjFxUjNTMXNyczJxcjNzcyFhceARUUBgcOASMiJicuATU0Njc+ATMHNDY3PgEzMhYXHgEVFAYHDgEjIiYnLgE1FwcXNzMVIzUzBzMVIzUXNTMVIwFpBQkDAwMLCQkZDgoSBwgNBAQNCAcSCg4ZCQkLAwMDCQVkAZpkU7MKKg8llbwKFAo8ChMHBwgIBwcTCgsTBgcICAcGEwurCAcHEwoLEwYHCAgHBhMLChMHBwhIJQ8qCrOVlbOzxbOzAUYFCwcHDggOGAoJCwUFBQ0ICA0FBQULCQoYDggOBwcLBf68AUQRiIhICEAiERFWCAcHEwoLEwcHCAgHBxMLChMHBwgzChMHBwgIBwcTCgsTBwcICAcHEwtFQAhIiIiZiYmJiYkAAAAAAwAzADEBzQGPACQANAA/AAABIzU0JicuASsBIgYHDgEVERQWFx4BMyEyNjc+AT0BNCYnLgEjJTQ2OwEyFh0BMzIWHQEhNQEhIiY9ASEVFAYjAaveBgQFDAdWBwwFBAYGBAUMBwFWBwwFBAYGBAUMB/6ZCgdWBwrvBwr+iAFn/qoHCgF4CgcBZAkHDAUFBQUFBQwH/uYHDAUFBQUFBQwH7wcNBAUFCQcKCgcaCgcRPP7VCgfNzQcKAAIAZgAkAZoBnAArAFsAAAEHMAYjIiYnLgEnLgEnLgEjIgYPAREzNT4BMzIWFx4BFx4BFx4BMzI2PwE1Bw4BBw4BIyImJy4BJy4BJy4BIyIGBw4BBzU+ATMyFhceARceARceATMyNjc+ATcVAZoMKyQKEgkJEQkIEgkJEgolHwEEEgUaGAkRCQgRCQkSCQkUCiYuAQYSBA4JCRgNChIJCREJCBIJCRIKChEHBwsDBRoYCREJCBEJCRIJCRQKDBcJCg4FAZYECgIBAQQCAgMCAQILAQP+l6MCBgIBAQQCAgMCAQILAQLNwQEDAgECAgECAwICAwIBAgEBAQICqgIGAgECAwICBAEBAgECAQMBqgAAAgAiABwB3gGkAAYADQAAJSM1JyEHFSczNTchFxUBM2arAbyrVUSa/oiaHKbi4qYRm8vLmwAAAAADAGsAEwGVAa0ABgAKABEAAAEnIxEhETEnFyM1AxEzFTMVIQGVkZkBKpFxcYh3kf74ARyR/mYBCXlxcf6PAXiJ7wAAAAQAMwATAc0BrQAIABEAGgAjAAATNSMVMzUXNyc3FTMHFzcVMzUBBzUjFTM1IzcXJwcXIxUzNSOzgBF6DHr9Y3oMehH+8XoRgGN68noMemOAEQGcEYBjegx6ERF6DHpjgP79emOAEXpuegx6EYAAAAAEADMAEwHNAa0ABAAJABIAHAAANzM1IxU3MxUjNSUzNSMVMwcXNyUVMzUhESMVMxEzq6sRiYkBMxGIbH4Mff68EQF4vM0Tq6uaiYkziBF+DH5izbz+iBEBmgAAAAYAPAATAcQBrQAbADQAUABpAIgAoQAAATQmJy4BIyIGBw4BFRQWFx4BFxEzET4BNz4BNQciJicuATU0Njc+ATMyFhceARUUBgcOASMBESMRDgEHDgEVFBYXHgEzMjY3PgE1NCYnLgEnByImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BIzc1IxUOAQcOARUUFhceARcVMzU+ATc+ATU0JicuAScHIiYnLgE1NDY3PgEzMhYXHgEVFAYHDgEjAcQHBQYQCAkQBgUHBQUEDQcRBw0EBQUqBgkEAwQEAwQJBgUJBAMEBAMECQX+1REHDQQFBQcFBhAICRAGBQcFBQQNBwkFCQQDBAQDBAkFBgkEAwQEAwQJBqMSBwwFBAYGBAUMBxIHDAUEBgYEBQwHCQUKAwQEBAQDCgUFCgMEBAQEAwoFAYIJDwYGBwcGBg8JCA4FBgcC/t0BIwIHBgUOCBoFAwMKBQUKAwQEBAQDCgUFCgMDBf8AASP+3QIHBgUOCAkPBgYHBwYGDwkIDgUGBwJEBAQDCgUFCgMDBQUDAwoFBQoDBATmgYECBwYFDggIDgUGBwKBgQIHBgUOCAgOBQYHAkQEBAMKBQUKAwQEBAQDCgUFCgMEBAAAAAIAXv/xAaIBzwAiAEMAACU0JjUnBzEHBhQxDgEHDgEVFBYXHgEzMjY3PgE1NCYnLgEnByImJy4BNTQ2Nz4BNzA0MTcXMBQxHgEXHgEVFAYHDgEjAY0BjBR4AQUIAwIDGRYWOyIiOxYWGQMCAwgFjR41ExQXAwICCAV9fQUIAgIDFxQTNR7iAQIB6SLIAQEJEwoKFQshOxYWGhoWFjshCxQKChMJ4BcUFDQeChMJCRIIAdDQAQgSCQkTCh40FBQXAAMAKwBPAdUBcQAGABgAKgAAASMHFSE1JwczFyMUBgcOASMiJicuATUjNwEhNTMeARceATMyNjc+ATczFQF4714Bql3o4U2CCggIFgwMFggICoJOATT+eHkDDgoKGQ0NGQoKDgN5AXFmvLxmEVUMFQgICQkICBUMVf8Amg0VCAcJCQcIFQ2aAAACAFUAPQGrAdcACAAUAAATBxc3JwcRIxE3FTMRIREzNSMRIRG1DFdXDEISNG/+zG+AAVYBCwxXVwxCAQ7+8rkR/t4BIhH+uwFFAAAACQAaACAB5gGgABAAFQAaAB8AJAApAC4AMwA4AAABIRUzETMVIxUhNSM1MxEzNQMhESERJyMVMzUHIzUzFTsBFSM1NTMVIzUVMxUjNQchFSE1FSEVITUB5v40IruIASKIuyIz/poBZs1mZhFERDR3d3d3d3eJAQD/AAEA/wABoBH+zSsRESsBMxH+zQEi/t7vZ2dWRUUREVYRESsREV4RETMREQAFACIAGAHeAagADQASAB4ANwBQAAAlESERMxUHFzcXNyc1MwEhESERFycHJwcXNxc3FzcnFyIGBw4BFRQWFx4BMzI2Nz4BNTQmJy4BIxUiJicuATU0Njc+ATMyFhceARUUBgcOASMB3v5E1VAIUVEIUNX+VQGa/mbCMyI1JxEbMCQ3LxBdChMHBwgIBwcTCgsTBwcICAcHEwsHDAUEBgYEBQwHBw0FBAYGBAUNB3UBM/7NIS0PLS0PLSEBIv7vARGuR0JrjwRkYkdMngUkCQYHEwsKEwcHCAgHBxMKCxMHBglWBgQFDAcHDQQFBQUFBA0HBwwFBAYAAAYAMwATAc0BrQAFAAoAFAAZAB4AIwAAASERIREnBxUjNTMTIREzFTM1MxcRAzMVIzUHMxUjNRUzFSM1AXf+vAGaViKqqmf+iFbMCkyaEhJ3qqqqqgGt/mYBRFYReHj+iAF4iYlM/tQBVjQ03hERMxERAAAABwAzABMBzQGtAAQACQAOABMAGAAnAFwAABMRIREhBRUhNSEBESERIRMzFSM1OwEVIzUHDgEHDgEHIxUzFTM1IxUXIgYHNzM1IwczNz4BMzIWFx4BFRQGBw4BIyImJy4BPQEjFRQWFx4BMzI2Nz4BNTQmJy4BIzMBmv5mAYn+iAF4/ogBeP6IbxoagBoabQIFBAQLBwMhEg9kBgsFBjhGDQ8BBA4IBgsEBAQDBAQKBwYKBAQEEgcGBhAKChEGBwcGBgYRCwGt/mYBmhFNTf6IARr+5gFeGhoaGoEICAICAQEOX4YDKAQDHxFIAQcHBQQECwYGCwUEBgQEAwoGAwMKDwYGBggGBhEKChIGBgcAAAAEABoACwHmAbUAMgBAAFAAXQAAATAiKwExISoBMSIGBw4BFRQWHwE1FBYXHgEXFSMVMzUjNT4BNz4BNRU3PgE1NCYnLgEjBScuATU0NjMyMDMxMxUFFAYHDgEjIiYnLgE9ASEVNwc1MzIwMzIWFRQGBwHEAQEx/q0BAQcNBAUFBQVLFRMSMhxEmkQcMhITFUsFBQUFBA0H/qs/AwIJBwEBMgERFBIRLxoaLxESFAEAUD8yAQEHCQIDAbUFBQQNBwcMBUsFHTMTFBgBiRERiQEYFBMzHQVLBQwHBw0EBQVtPwIHAwcKXBMaLxESFBQSES8ab29SP1wKBwMHAgAHAAwADgH0AbIACwAPABQAGQAeACMAKAAAATMnBzMRIxUhNSMRJTcXIRMRMxEjMxEzESMzETMRIzMRMxEjMxEzESMBsET38T4iAaoi/pm0uf6TEjMzRDMzRDMzRDQ0RTMzAR+Tk/8AEREBABFubv7vAQD/AAEA/wABAP8AAQD/AAEA/wAAAAAAAwArABMB1QGtABMAFwAbAAAlETcnByE1IxUjFTMRIRUzNTM1IwMBESEDAREhAZEfDB7+6REzMwEiEUREHP76AQb6AQX++1gBFR4NHjMzEv7fNDQRARD+/AEE/vABBP78AAAAAAcAGgBGAeYBegAcACEALAA3ADwAQQBSAAABISIGBw4BFREUFhceATMhMjY3PgE1ETQmJy4BIwUhFSE1BRQGIyEiJj0BIRUlNTQ2MyEyFh0BIRczFSM1NTMVIzUFMzI2PQE0JisBIgYdARQWMwHN/mYFCQQDBAQDBAkFAZoFCQQDBAQDBAkF/l4Bqv5WAaoFA/5mAwUBqv5WBQMBmgMF/lYiqqpmZgEzIgcKCgciBwoKBwF6BAQDCgX/AAUKAwQEBAQDCgUBAAUKAwQERSIi1QMFBQOiouYaAwUFAxq7EREzERFECQcBBwoKBwEHCQAAAAUAQgAAAb4BwAAJAA0AFAAYACIAAAEnIxUjESE1MxEnFyM1AREzFTMRIxMXIzUTNScjNTMVMxEjAb5XvWgBFGhXPj7+7ZtW8aw+PlZWRZtWVgFqVkX+hUUBJT4+Pv5pAVlW/v0BUj4+/vPPVjRW/v0AAAAABAArAAsB1QG1AFgAcQC7ANUAAAEVFx4BFx4BHwE3FwcXHgEXHgEfATMVIwcOAQcOAQ8BFwcnBw4BBw4BDwEVIzUnLgEnLgEvAQcnNycuAScuAS8BIzUzNz4BNz4BPwEnNxc3PgE3PgE/ATUzAzI2Nz4BNTQmJy4BIyIGBw4BFRQWFx4BMxMjFQ4BBw4BBycHFw4BBw4BByMVMx4BFx4BFwcXNx4BFx4BFxUzNT4BNz4BNxc3Jz4BNz4BNzM1Iy4BJy4BJzcnBy4BJy4BJzUxAyImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BIzEBGgwGCgYFCgQMHiQeBgMFAgIDAQMsLQMCAwICBQMHISQhDAQJBQUKBQw0DAUKBQUJBAwhJCEHAwUCAgMCAy0sAwEDAgIFAwYeJB4MBAoFBgoGDDQaEBwKCwwMCwocEBAcCgsMDAsKHBArVgYMBQYLBSE8IQMFAgMDAi8xAQQDAgUDIzwkBQoGBQsFVgULBQYKBSQ8IwMFAgMEATEvAgMDAgUDITwhBQsGBQwGKwwWCAgKCggIFgwMFggICgoICBYMAaQpBAEEAgIFAwceJB8LBQkFBgoFDTQMBQoFBQkFCyEkIQYDBAICAwIDLy8DAgMCAgQDBiEkIQsFCQUFCgUMNA0FCgYFCQULHyQeBwMFAgIEAQQp/u8MCwocEBAcCgsMDAsKHBAQHAoLDAEiLQIEAgMFAyA8IQYKBgYLBlYFCwYFCwQkPCQDBQICBAEzMwEEAgIFAyQ8JAQLBQYLBVYGCwYGCgYhPCADBQMCBAIt/u8KCAgWDAwWCAgKCggIFgwMFggICgAABgAz//EBzQHPACoAQwBcAGEAZQBpAAABPgE1NCYnLgEjIgYHDgEVFBYXDgEHDgEVFBYXHgEzMjY3PgE1NCYnLgEnJzIWFx4BFRQGBw4BIyImJy4BNTQ2Nz4BMxEiJicuATU0Njc+ATMyFhceARUUBgcOASMnPwEPATcXBzcXJzcHASAFBgcGBg8JCQ8GBgcGBSU/FxcbIBwcSyoqSxwcIBsXFz8lIAUKAwQEBAQDCgUFCgMEBAQEAwoFJ0QaGR4eGRpEJydEGhkeHhkaRCdmikKLQUorUic4LFImAYgGDggJEAUGBwcGBRAJCA4GBiQaG0UmK0ocHCAgHBxKKyZFGxokBjYEBAMKBQUJBAMEBAMECQUFCgMEBP5EHhkaRCcnRBoZHh4ZGkQnJ0QaGR5VQotBjHcsJ1MgLCZSAAUAMwAtAc0BkwAfADMAQABNAFoAAAEhIgYHDgEdARQWFx4BOwEXNTMyNjc+AT0BNCYnLgEjExQGKwEVJyMiJj0BNDYzITIWHQEnIgYVFBYzMjY1NCYjMyIGFRQWMzI2NTQmIyMiBhUUFjMyNjU0JiMBq/6qBwwFBAYGBAUMB/BDIwcMBQQGBgQFDAcRCgc0K/cHCgoHAVYHCrwHCgoHBwoKB0QHCgoHBwoKB4cHCgoHBwoKBwGTBQUFDAfeBw0EBQVERAUFBA0H3gcMBQUF/wAHCiwsCgfeBwoKB96ACgcHCgoHBwoKBwcKCgcHCgoHBwoKBwcKAAAABwA8//oBxAHGABAAFQAlACkALgAzADgAACUzNSEVFBYXHgEzMjY3PgE3NTMVIzUDIiYnLgE9ASEVFAYHDgEjByE1IRMzFSM1OwEVIzUnMxUjNQGARP54GRYWOyIgOhYVGwIzM6IeNRQTFwEiFxQTNR6iAUT+vFUREYkREUUREaSJgCI7FhYZGBQVOCB4Z2f/ABcTFDUeb28eNRQTFyIRAaJNTU1NGWZmAAAAAAIAAAA+AgABggA7AG4AAAEyFhceARUUMDEcAR0BMzIWFx4BFRQGBw4BKwEhIiYnLgE1NDY3PgE/Aj4BNz4BMzIWHwE3PgE3PgEzNSIGBw4BBy4BIyIGBw4BBw4BBw4BFRQWFx4BMyEyNjc+ATU0JicuASM0NjU0JicuASMxAR4YKhAPEhEQHAoLDAwLChwQA/7HER8MCw4JBwgVDQkCAgkHBhEKBgsFEAcIFQ4OHxATJQ8PGQgHDwgNFwkJDAIPGQkKChAODiUVAT0TIg0MDw8NDCIUARUSEjAcAXESEBApGAEBAQERDQoKHBAQHAoLDA4LDB8RDhkLCxAEAwoKDwYGBgMDBw8PGAkJCRELCgocEAMECQcIFQwFEw0MHxEVJQ4OEA8NDCMTEyINDQ8BAgEbMBISFQAAAAMAMwATAc0BrQAYADEANwAAASIGBw4BFRQWFx4BMzI2Nz4BNTQmJy4BIxEiJicuATU0Njc+ATMyFhceARUUBgcOASM1IxUzNSMBACpLHBwgIBwcSyoqSxwcICAcHEsqJ0QaGR4eGRpEJydEGhkeHhkaRCdmdxEBrSAcHEsqKkscHCAgHBxLKipLHBwg/nceGRpEJydEGhkeHhkaRCcnRBoZHqsRqgAAAAMAKwALAdUBtQAYADEASAAAASIGBw4BFRQWFx4BMzI2Nz4BNTQmJy4BIxEiJicuATU0Njc+ATMyFhceARUUBgcOASMTBycmIgcGFB8BHgEzMjY/ATY0JyYiBwEALE4dHSEhHR1OLCxOHR0hIR0dTiwpRxsaHx8aG0cpKUcbGh8fGhtHKWuJMAQLAwQEOQEFAwIFAZIEAwQLAwG1IR0dTiwsTh0dISEdHU4sLE4dHSH+Zx8aG0cpKUcbGh8fGhtHKSlHGxofARCFMAQEAwsEOQIBAQKOAwsEBAQAAAADACsACwHVAbUADAATABsAAAE1IRUzFTMXMzUzNSMFNSEVIxUjBSMVJyM1IRUBVf7WgLFECyqA/ucBCJlvAYgqN6cBCAE1gOaARETmVcRvVYA3N8TEAAAABAAWAAIB6gG+ADYATwBoAG0AAAEhJyMVMxMOAQcOARUUFhceATMyNjc+ATU0JiczDgEVFBYXHgEzMjY3PgE1NCYnLgEjMSMnMzcBFAYHDgEjIiYnLgE1NDY3PgEzMhYXHgEVMxQGBw4BIyImJy4BNTQ2Nz4BMzIWFx4BFS8BIQcjAer+mR1QQ1MGDAQEBQcGBg8JCQ8GBgcFBHgEBQcGBRAJCQ8GBgYGBgYPCbcI8EX+6AQEAwoFBQkEAwQEAwQJBQUKAwQEuwQDBAkFBgkDBAQEBAMJBgUJBAME3CkBSjrnAUZ4Ef6pAggFBg0HCQ8GBgcHBgYPCQcNBQUNBwkPBgYHBwYGDwkJDwYGByLM/ucFCgMEBAQEAwoFBQkEAwQEAwQJBQUKAwQEBAQDCgUFCQQDBAQDBAkFXqqqAAYAKwA+AdUBggArAEgAYQB6AJMArAAAASMnMCI5AS4BKwEiBgcxByMiBgcOAR0BFBYXHgEzITI2Nz4BPQE0JicuASMXFAYjISImPQE0NjsBNxU3PgE7ATIWHwEzMhYdASciBgcOARUUFhceATMyNjc+ATU0JicuASMVIiYnLgE1NDY3PgEzMhYXHgEVFAYHDgEjNSIGBw4BFRQWFx4BMzI2Nz4BNTQmJy4BIxUiJicuATU0Njc+ATMyFhceARUUBgcOASMBs0YpAQQNB1UHDQUoSAcNBAUFBQUEDQcBZgcNBAUFBQUEDQcRCgf+mgcKCgdPGhQCBwNVBAYCLk4HCsQXKA8PEhIPDygXFygPDxISDw8oFxMjDA0PDw0MIxMTIwwNDw8NDCMTEBwKCwwMCwocEBAcCgsMDAsKHBAMFggICgoICBYMDBYICAoKCAgWDAFPKQUFBgUoBQUFDAfNBwwFBQUFBQUMB80HDAUFBe8HCgoHzQcKGgIVAwMDAi4KB83eEg8PKBcXKA8QEREQDygXFygPDxLNDw0MIxMTIwwNDw8NDCMTEyMMDQ+rDAsKHBAQHAoLDAwLChwQEBwKCwyJCggIFgwMFggICgoICBYMDBYICAoAAAACADP/+gHIAcYATACXAAAFIiYnLgEnLgEnLgE1NDY3PgE/AT4BMzIWFx4BFx4BBw4BDwEOAQcGFhceARceARceATMWNjc+ATEzPgEzMhYXHgExFx4BBw4BBw4BIwMiBg8BDgEHDgEVFBYXHgEXHgEXHgEzMjY3PgE3NiYnLgEnLgEjIgYHDgEHDgEnIiYnLgEnLgEnLgE3PgE3PgE/ATY0Jy4BJy4BIwF3DzAdHT8dHCoNDg4JBgcOBQMMHwcMDAMDHwICAQECBgUCBg8BAQMDCSARER0FBAgEBQgDBwYBAQoJBg0GETcBBQgIBBELCxkN5gYZCQMFDAUFBw4NDSgbHj0bGysMCRUJCQ4EBAQBBDQPBAgEBAQBAQcGBg4HBw8GBR4SESEIBQQBAQcEBAkEAgYBAh4DAgUFBhMTEzsoJkAcGy4SDhYIBwsEAgkGCwcFQwYECwUGCgQBBA0IBAkEDCkVFSIEBAQBAgMGBwEGBQQLJQEEFg8IFwoKDgG7BQYDAwkHBhALESsaGj4lJzkSEhEMCAkTCAkKAQMjCgMDAgEBBwUFBAEGBgUkFRYpCwcPCAYMBAUGAwEFDQIFQgYEBAAAAAwAZgATAZoBrQAEAAkAJgA3AD4ARQBMAFMAWgBhAGgAbwAAEzM1IxU3MxUjNTcjIgYHDgEVERQWFx4BOwEyNjc+ATURNCYnLgEjExQGKwEiJjURNDY7ATIWFREnNSMVMzUjBzUjFTM1Iwc1IxUzNSM3NSMVMzUjMzUjFTM1Iwc1IxUzNSMHNSMVMzUjMzUjFTM1I4nu7hHMzN3uBw0FBAYGBAUNB+4HDQUEBgYEBQ0HEQoH7gcKCgfuBwruEUQRIhFEESIRRBEzEUQRMxFEEXcRRBEiEUQRMxFEEQE+REQzIiI8BgQFDAf+qgcMBQQGBgQFDAcBVgcMBQQG/ogHCgoHAVYHCgoH/qq8M0QRVTNEEVY0RRGrM0QRM0QRVTNEEVY0RRGJmhEABgArAAsB1QG1AAQACQAOABMAGAAdAAATESERIQUVITUhAREhESETIRUhNSMzFSM1OwEVIzUrAar+VgGZ/ngBiP54AYj+eF4BCP74RRERIxERAbX+VgGqEURE/ngBM/7NAW8REREREREAAAAABAAa/+8B5gHRAAcADAARABYAAAEnBxEXNxEnAycRFxETJzcXBxcHETcRAd7e5ubmCOfMzAnFxcXF1czMAYBRVP7FU1MBOwP+hEoBHEr+5AErSEhISOFKARxK/uQAAAAABQAzACABzQGgAAgADQASAC8AQAAAASEVMxEhETM1AyERIRETITUhFQczMjY3PgE9ATQmJy4BKwEiBgcOAR0BFBYXHgEzJzQ2OwEyFh0BFAYrASImPQEBzf5mEQF4ESL+qgFWEf6IAXj6fAcLBQQFBQQFCwd8BgwEBQUFBQQMBg8JBnwGCQkGfAYJAaBv/u8BEW/+kQEA/wABEU1NgAUEBAwGBgcLBAQFBQQECwcGBgwEBAUlBggIBgYGCAgGBgAAAwArABwB1QGkADUARgBXAAABIyIGBy4BKwEiBgcOARURFBYXHgE7ATIwMTIWHQEzNTE1NDYzMDIxMzI2Nz4BNRE0JicuASMBETQ2OwEyFhURFAYrASImNSEUBisBIiY1ETQ2OwEyFhURAbOZCA0FBQ0ImQcNBAUFBQUEDQeZAQcJEgkHAZkHDQQFBQUFBA0H/okKB5kHCgoHmQcKAYgKB5kHCgoHmQcKAaQGBgYGBQUEDQf+3gcNBAUFCgcRCQgHCgUFBA0HASIHDQQFBf68ASIHCgoH/t4HCgoHBwoKBwEiBwoKB/7eAAYAAABTAgABbQBLAFUAXgB8AIAAnwAAASIGBw4BByczNSMXIyczNSMXMBQxBy4BJy4BIyIGBw4BFRQWFx4BMzI2Nz4BNzMyNj8BFw4BBw4BFRQWFx4BMzI2Nz4BNTQmJy4BIycXIy4BJy4BJzcHIzceARceARcHIiYnLgE1NDY3PgEzMhYXBwYUFx4BOwEOAQcOASM3JzMHFyImJy4BNTQ2Nz4BNxc3Jz4BMzIWFx4BFRQGBw4BIwGiBAkEBAgEKiA8EZQIHTkTJAUIBQUJBRMjDA0PDw0MIxMSIQwNEAFGAgQCThoKEAYGBw8NDCMTEyMMDQ8PDQwjE/I+MwEGBgUPCB4GQB8HCwUEBQFMEBwKCwwMCwocEAcPBiYCAgEEAk8BDgoKGg+hPoVHoxAcCgsMBQUFDQgkDyQGDQcQHAoLDAwLChwQAQ8BAQECAVMRIhERJgE/AgMBAQEPDQwjExMiDQ0PDQwMHxICAog0BhEKCxcNEyINDQ8PDQ0iExMjDA0PJnsLFAkIDwY2ezYEDAcHEAhWDAsKHBAQHAoLDAMDQwIEAgICDxkJCQtbe3tbDAsKHBAKEwkIDgVICEcDAgwLChwQEBwKCwwAAAADADMAAgHNAb4AHAAwAD4AACU1NCYnLgEnNTQmKwEiBh0BDgEHDgEdAQcVITUnFyE1NzU0Njc+ATMyFhceAR0BFxUHMjY3PgE1IxQWFx4BMwGREhAQLBkKBxIHChksEBASPAGaPCv+iDwUEhEvGhsuEhEUPLwJDwYGB1YHBgYPCYqJGzATExkFCwcKCgcLBRoSEzAbiTAcHDA7AjGRGy4SERQUERIuG5ExAk0HBgYPCQkPBgYHAAAABAAAAHECAAFPABAAGwBDAFEAABMVFBYXHgE7ATUjIgYHDgEVFyMiJj0BNDY7ARUlNCYnLgEjNTQmJy4BKwEVMzIWHQEUBisBFTMyNjc+AT0BMjY3PgE1BzUyFhceARUUBgcOASMABAQDCQbV1QYJAwQE3sQEBQUExAEiCAcHEwoEAwQJBbS0AwUFA7S0BQkEAwQKEwcHCDMHDAUEBgYEBQwHATasBQkDBATeBAQDCQW0BQOsAwW8XgsSBwcIIwUJAwQEEQUDrAMFEQQEAwkFIwgHBxILIkQFBQUMBwcMBQUFAAAABwArAAsB1QG1ABgAJgBAAE4AXAB2AIQAAAEiBgcOARUUFhceATMyNjc+ATU0JicuASMXIz4BNz4BNx4BFx4BFycyFhceARcOAQcOARUjNCYnLgEnPgE3PgEzBx4BFx4BFyM+ATc+ATcHMxQGBw4BBy4BJy4BJxciJicuASc+ATc+ATUzFBYXHgEXDgEHDgEjNy4BJy4BNTMOAQcOAQcBACxOHR0hIR0dTiwsTh0dISEdHU4sxJkBBwcGFAwWIw0ODwHECxUKChQJDRQHBwg0CAcHFA0JFAoKFQtgDBQGBwcBmQEPDQ4jFmSZCAcGFAwWIw0ODwHECxUKChQJDRQHBwg0CAcHFA0JFAoKFQtgDBQGBwiZARANDSMWAbUhHR1OLCxOHR0hIR0dTiwsTh0dIcwVKxUUJxIMIxQVMBq7AgIDBgQTKRUWLBcXLBYVKRMEBgMCAhkSJxQVKxUaMBUUIwy0FioVFCcSDCIVFTAauwICAwYEEykVFiwXFywWFSkTBAYDAgIZEicUFSoWGjAVFSIMAAACACsAPgHVAYIAEgAjAAATFTMeARceARcuAScuASsBFSc3NwcXNTIWFx4BFzQmJy4BJzXmESxFGRkfBxg0GRozFxGenhHMzB87HBw0GAoWFllPAWFGARQUFDsoHB8HBwJFcHAhkZFVBQsMMCscUCUmNgFWAAQAGgAYAeYBqAADAAcADAAZAAABAyEDFRMhEwczFSM1FyIGFRQWMzI2NTQmIwEA5gHM5sn+bskJEhIJBQgIBQUICAUBqP5wAZAi/qMBXYB3d5EHBQYHBwYFBwAAAgAg//oB4AHGAD4AVwAAJScHFzcOAQcOAQcRPgE3PgE1NCYnLgEjIgYHDgEVFBYXHgEXES4BJy4BJxc3JwcXNx4BFx4BMzI2Nz4BNxc3ATQ2Nz4BMzIWFx4BFRQGBw4BIyImJy4BNQHgIkwHMgkfFRUzHA0WCAgJCwkJGQ4OGQkKCgkICBYMGzMVFR8JLgdMIg8YCiQYGTshIDoYGSQKFg/+7wgHBxILChMHBwgIBwcTCgsSBwcIWEYfDxQZKxAQFAEBMwIMCQkXDQ4ZCQoKCgoJGQ4NFwkJDAL+zQETEBAqGRIPH0YIMh4yEhIUExIRMB0tCAEqCxIHBwgIBwcSCwsSBwcICAcHEgsAAAQAGgATAeYBrQAEAAkADgATAAATESERIQEhESERASEVITU3IRUhNRoBzP40Abv+VgGq/mcBiP54IgFE/rwBaP6rAVX+vAEz/s0BZxERIhERAAAAAAcAKwALAdUBtQAqAEMATwBaAGYAcgB4AAABIgYHDgEVFBYXHgEXBxc3HgEXHgEzMjY3PgE3FzcnPgE3PgE1NCYnLgEjESImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BIwMjIgYHDgEdATM3NQ8BNTQ2Nz4BOwExNyMVFzM1NCYnLgEjFzEnMTMyFhceAR0BByMVMzUjAQAnRBoZHgcFBhELLA0rDR0RECQTEyQQER0NKg4sChEGBgceGRpEJyM/FxcbGxcXPyMjPhcYGhoYFz4jTTMSHwsMDRhwEWYLCQkZDiLeM3AYDQwLHxJEZiIOGQkJC81ecBIBgh0aGUUnESIPEBwNNQs0DBMHBwcHBwcTDDQLNgwcEA8iESdFGRod/pobFxc+IyQ+FxcbGxcXPiQjPhcXGwGZDQwLHxIzcBgRZiIOGQkJCxEYcDMSHwsMDXdmCwkJGQ4ieBGaAAAAAAMAMwAtAc0BkwAIAAwAFAAAASERMwchJzMRATcXIyUjJwcjNSEVAc3+ZotYATRYi/6/dHToATCJMzOJAXgBk/8AZmYBAP6riIhmPDze3gAAAQCfAIABYQFBAAsAABMHFwcXNxc3JzcnB6wNVVQMVFQMVFUNVAFBDVRUDFRUDFRUDVUAAAMAKwALAdUBtQAYADEAPQAAEw4BFRQWFx4BMzI2Nz4BNTQmJy4BIyIGBwEOASMiJicuATU0Njc+ATMyFhceARUUBgcnBxcHFzcXNyc3JwdpHx8fHx9PKSlPHx8fHx8fTykpTx8BIh1IJiZIHRwdHRwdSCYmSB0cHR0c3w1VVAxUVAxUVQ1UAXcfTykpTx8fHx8fH08pKU8fHx8fH/7eHB0dHB1IJiZIHRwdHRwdSCYmSB3sDVRUDFRUDFRUDVUAAAEAoACyAWABHwAHAAABJwcXNxc3JwEMDGAMVFQMMAETDGANVVQMMAADACoACwHVAbYAGAAxADkAACUyNjc+ATU0JicuASMiBgcOARUUFhceATMRMhYXHgEVFAYHDgEjIiYnLgE1NDY3PgEzFycHFzcXNycBACxOHB0iIh0cTiwtTR0dIiIdHU0tKEgaGx8fGxpIKClHGxsfHxsbRykMDGEMVVQMMAshHR1OLCxOHR0iIh0dTiwsTh0dIQGZHhsbRykoSBsaHx8aG0goKUcbGx6RDGANVVQMMAAAAAABANIAgAE/AUAABwAAJTcnBxcHFzcBMwxhDFRUDDHUDGAMVFQMMAAAAwAqAAsB1QG2ABgAMQA5AAA3FBYXHgEzMjY3PgE1NCYnLgEjIgYHDgEVIRQGBw4BIyImJy4BNTQ2Nz4BMzIWFx4BFQc3JwcXBxc3KiIdHU0tLE4dHCIiHB1OLC1NHR0iAZofGxpIKClHGxsfHxsbRykoSBobH5EMYQxUVAwx4CxOHR0hIR0dTiwsTh0dIiIdHU4sKEgbGh8fGhtIKClHGxseHhsbRykMDGEMVVQMMAABAMEAgAEtAUAABwAANwcXNyc3JwfNDGAMVFQMMOwMYAxUVAwwAAAAAwAqAAsB1QG2ABgAMQA5AAAlNCYnLgEjIgYHDgEVFBYXHgEzMjY3PgE1ITQ2Nz4BMzIWFx4BFRQGBw4BIyImJy4BNTcHFzcnNycHAdUiHRxOLC1NHR0iIh0dTS0sTh0cIv5mHxsbRykoSBobHx8bGkgoKUcbGx+SDGAMVFQMMOAsTh0dIiIdHU4sLE4dHSEhHR1OLClHGxseHhsbRykoSBsaHx8aG0goDAxgDFRUDDAAAAAAAQCgAKEBYAEOAAcAADcXNycHJwcX9AxgDFRUDDCtDGEMVVQMMAAAAAMAKgALAdUBtgAYADEAOQAAASIGBw4BFRQWFx4BMzI2Nz4BNTQmJy4BIxEiJicuATU0Njc+ATMyFhceARUUBgcOASMnFzcnBycHFwEALU0dHSIiHR1NLSxOHB0iIh0cTiwpRxsbHx8bG0cpKEgaGx8fGxpIKA0MYQxVVAwxAbYiHR1OLCxOHR0hIR0dTiwsTh0dIv5mHxobSCgpRxsbHh4bG0cpKEgbGh+RDGEMVVQMMAAAAAIAAQA2AgEBzwAJAHkAADcnNxcHJxUjNQc3PAE1NCYnLgEjIgYHDgEHLgEjIgYHDgEHDgEHDgEVFBYXHgE7ATUjIiYnLgE1NDY3PgE/Aj4BNz4BMzIWHwE3PgE3PgEzMhYXHgEVMBQxHAEdATMyFhceARUUBgcOASsBFTMyNjc+ATU0JicuASPADE1MDDgROOMUEhIxGxQkDxAYCAcQCAwXCQkMAg8ZCgkKEA4OJRVvbxIfCwwNCAgHFg0JAgEKBgcRCQYMBRAHBxYODR8RGCoPEBIREBwKCwwMCwocEHh4FCIMDQ8PDQwjE90NTEwMN9/fN2kBAgEbMRESFQsKChsRAwQICAgVDAUTDA0fEBYlDg4QEQ4LDB8SDRoKCxAEBAoJEAUGBgIDCBAPGAgJCRIQDyoYAQEBAREMCwocEBAcCgsMEQ8NDCMTEyMMDQ8AAAIAAf/yAgABzwAJAHkAACUXByc3FzUzFTc3PAE1NCYnLgEjIgYHDgEHLgEjIgYHDgEHDgEHDgEVFBYXHgE7ATUjIiYnLgE1NDY3PgE/Aj4BNz4BMzIWHwE3PgE3PgEzMhYXHgEVMBQxHAEVBzMyFhceARUUBgcOASsBFTMyNjc+ATU0JicuASMBQQxMTQw4EThiFRISMBsUJBAPGAgHEAgNFgkJDAIPGgkJChAODSYVb28SHwsMDQgIBxUNCgIBCQcHEQkGDAUQBwcWDg0fERgqDxASARIQHAoKDAwKChwQeHgTIg0NDg4NDSITSgxMTAw44OA4/QECARsxERIVCwoKGxEDBAgICBUMBRMMDR8QFiUODhARDgsMHxINGgoLEAQECgkQBQYGAgMIEA8YCAkJEhAPKhgBAQEBEQwLChwQEBwKCg0RDw0NIhMTIwwNDwAAAAAKAAAAQQHWAX8AGAAxADYAPABEAEwAUQBWAFsAYAAAASIGBw4BFRQWFx4BMzI2Nz4BNTQmJy4BIxUiJicuATU0Njc+ATMyFhceARUUBgcOASMnFSE1IQUVITUhFQchNSMVITUjByE1IxUhNSMBMxUjNRUzFSM1JTMVIzUVMxUjNQENCxIHBwgIBwcSCwoSBwcICAcHEgoHDQQFBQUFBA0HBg0EBQUFBQQNBsoBk/5tAYL+jwFxSf62EAGSEEr+txEBkxH+6zIyMjIBDTIyMjIBNAgHBxIKCxIHBwgIBwcSCwoSBwcIVAUFBA0HBwwEBQUFBQQMBwcNBAUFn/v7OLPbKNTr/BEi6/sQAQwQEKcREacQEKcREQAAAwAA/+EBAgHfAAwAEAAUAAAXNQcnNyc3FzUXBxcHNxU3JzUVNyd3ZgxscQxri3l1hxFeXmJiH+lmDGxxDGvxinl1huS8Xl7yxGJiAAUAAP/9AWEBwwAWABwAIgAnACwAABMzNycjNSMVIxUzFSMHFzMVMzUzNSM1JzUhFwchBRUhJzchJTMVIzUXMxUjNbl1MzN1EZeXdjIydhGXl5cBBCQk/vwBHf77JCQBBf7zVFSoVFQBKzw6IiJ2EDs7qKh2EBFUKSsyVCoqdRAQhhERAAkAAAAOAbQBsgAEAAkADgAXABwAIQAmACsA0QAAATMVIzUVMxUjNTUzFSM1JzUjFSMRIREjFxUjNTMnMxUjNQczFSM1GQEhESE3LgEnLgEnIiY1NDY3PgE1PgE3NiYnNCIxNDY3NiYnLgEnIw4BBw4BFx4BFTAiFQ4BFx4BFxQWFx4BFRQGIw4BBw4BBw4BFRwBFTM1OAExMDI1PgE3PgE3PgE1NCYnLgEnNScwJic8ATE0NjU2Jic0Njc+ATczHgEXHgEVDgEXFTEUFhUwFgcOATEHFQ4BBw4BFRQWFx4BFx4BFzIWMRUzPAE1NCYnAQ11dXV1U1MRQ7kBtLioqKjbIiK4qKgBk/5t5gQPCAgQBwEBAwECBAIFAgIBAQEBAQEDBwUREAsPEQUHAwEBAQEBAQICBQIEAgEBAQEGEQkIDgQGBREBBA0ICBEGCwMCAgEDAQQDAgEBAgECBAQNCAoIDQQEAgECAQEBAQIDBAECAgIEBAoHDwgIDgUBAREGBwEbERFlEREyEBCXMzP+jwFxECIiMlRUMiIi/rABHf7jSwEGAwIGAgIFBAcDBAsGAgoJBwgCAQIQBwUTCQUMAQEMBQkTBQcQAgECCAcJCgIGCwQCCAUEAgIGAwMFAgMJBAIDAwgBAQUDAwYCAw8EBwsFAgkEBQQGBwUDAQIBBRQGAgwGBQUBAQUFBgwCBhQFAQEBAQMFBwYEBQQJAgULBgUPAwIFAwMFAgIHAwMCBAoDAAAAAAUAAAAEAbcBvAAFACUALwA6AFMAABMjFRc3JzcnBy4BIyIGBw4BFRQWFwcfATcWMjMyNjc+ATU8ATU3JxcHLgEnLgEnNwMvATceARceARcHNyImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BI9IRNQww5XdZBw8HHjQTExcCAT4ZXkQEBwQdNBQTFl93X0sEEQwMHRFHz0sTMAYUDQ0fETZZGi4RERQUEREuGhouEREUFBERLhoBM2A1DDBrd1oCARYUEzQdCA8HPmAXRQEWFBM0HgMIA2BfX0wSHw0MFAZH/nMSTTERHQwLEQU1QhMSES4aGi0SERMTERItGhouERITAAADAAD/8QFxAc8AGAAxAHwAADcUFhceATMyNjc+ATU0JicuASMiBgcOARU3MhYXHgEVFAYHDgEjIiYnLgE1NDY3PgEzExc3JwcXDgEHDgEjIiYnLgE1NDY3PgE3FzcnBxcOAQcOARUUFhceARcVIgYHDgEHMz4BNz4BMzIWFx4BFzMuAScuASM1MjY3PgE3MhkWFjohIToWFRkZFRY6ISE6FhYZoB00FBMXFxMUNB0eNBMTFxcTEzQeXwgPFw8HChULCxcLKEYbGh4PDQ4nGAgPFw8IGyoPDxAgGxtKKQ4cDQ4YDCMJEwoKFAsKFAoKEwkjCxkODRsPDBYLCxUK/SE6FRYZGRYVOiEhOxUWGRkWFTshjxYUEzQeHTQTFBYWFBM0HR40ExQW/rYQBy4HDwUIAgMDHxoaRigcMxYXJAwPBy4HEA0oGBg4HipLHBwjARoFBQQMBwQGAgIDAwICBgQHDAQFBRoDAwMIBQAABQAAABgBxQGoAA4AGgA1AFAAawAAEwcjFTkBFTMXNTE1MTUxBzEVJyM1MzcdAjE3HgEXHgEVFAYHDgEHFz4BNz4BNTQmJy4BJwc3Bx4BFx4BFRQGBw4BBxc+ATc+ATU0JicuASc3Bx4BFx4BFRQGBw4BBxc+ATc+ATU0JicuASfae19gehFkVFRkOAcLAwQDAwQECwcOCAwEBAQEBAQMBw5EDQwSBgcGBgYGEQwNDRMGBgcHBwcTDTQMERsJCQkJCAkaEQ0SGwkKCQoJChwTAYxiTEthYZdi6U5OdlA/EXaRCRQKCxYMCxcLChUJCgoXDAwZDQ0ZDAwWCgo9Cw4gERIkExIkEBEgDgsQIhISJhQUKBITIw83CxQtGBgzGxoyGBgsEwsVLhkaNRscNhoaLxUAAAADAAAAMAHFAZAAvgEbAXcAADccARUUFjM6ATM6ATEzMDIzHAEVFBYzOgEzOgExMzAyMzoBMzI2NTwBNTQmJy4BJy4BJyImNTQ2Nz4BNz4BNzYmJzwBMSY2NzYmJy4BJy4BKwEiBgcOAQcOARceARUwBhUOARceARceARceARUUBgcOAQcuAScuAScmNDU0Njc+ATc+ATc2JicwNDEmNjc2JicuAScuASsBIgYHDgEHDgEXHgEHMBQxDgEXHgEXHgEXHgEVHAEjDgEHDgEHDgEVFzQ2Nz4BNz4BNz4BNTQmJy4BLwIuAScmNjcxNTA2MTUxNiYnJjY3PgE3PgE3Mx4BFx4BFx4BBw4BFxUxFhQXFBYHDgEPARUOAQcOARUUFhceARceARceAR0BITUnNDY3PgE3PgE3PgE1NCYnLgE1LwEuAScmND0BMzwBMTUzNiYnNDY3PgE3PgE3Mx4BFx4BFQ4BFzkBFhQXHAEHDgEPAhQGBw4BFRQWFx4BFw4BBw4BFRwBFSM1AAUIBkgWBwcDAgIHCgdaGgkJAwoIG1oHCQcGCgYWDA0ZCwEBAgEDBQEEBwMCAQIBAgIBBQsDCgcHEgsRDBIHBwkECgYCAgEBAQIDAggDAQUDAgQBAQUJBQYOBgcNBQIBAgIEAQIGAwEBAQECAQEECQIIBgUPCQ4JDwUGCAIJBAEBAgECAQIDBgIBBAICAwIIFAoKEgUICJcEBQcVDQwZCQsEBQMCBAEBAwIFAwIBAQEBAgIBBAgECQYFDQgPCQ4GBQcDCAQBAgIBAQEBAgIGAQQBBQICAwQKChoMDBUGBAL+44YCAwYRCgoTCAsDBAMBBAEDAQQCAQEBAQICAwYCBwQFCQYMDg8EBgMCAgEBAQECBAEDAQQCAgIDCwYQCA0YBwoKdYAFGQQDCgYJAgULCwUEHwcGDgQDCAUECQMDBwgLBAYQCQMPDgsLBAEBAxcMBx0NBQkDBAYGBAMJBQ0dBwwXAwEBBAsLDg8DCRAGBQwGBwIBAQMCAgUCAwQBAQIGBgkDBQ0HAwwLCQkEAQITCQYYCwMHAwMFBQMDBwMLGAYJEwIBBAkJCwwDBw0FBAkFBgIDBgQDBwIDDAYWAQcCAwgEBAgDAxEGCQ8GBQ4HBQQBCwwJBgIBAgEGHQoEFgoFBwIDAwEBBAMDBwMKFgQKHQUBAQIBAgYJDAsBBAUHDgUGDgoHEAMDCQQECAMCBAMqKhYBAwEDBgQDBgMDEAUHDQYDCwUFBAEICQcEAQEBAQEGGQYDEAgEBQICAgEBCgUIEAMHGAYBAgEBBAcJCAEEBQULBAUMCAYPBAEGAgUJAwQPBgIEAh4AAAADAAAAFwGTAakAGABpALoAABMiBgcOARUUFhceATMyNjc+ATU0JicuASMDPgE3PgE3PgE3PgE9ASciJiMiJic+ATc+ATczNz4BNz4BMzIWFx4BFRcxHgEXHgEXDgEjIgYPARUUFhceARceARceARcOAQcOASMiJicuASc3LgE1PAExMDYzMjY3PgE3LgEnLgE1MS4BJy4BIyIGBw4BByMUBgcOAQceARceATMyFjEwFBUUBgcuAScuATU0Njc+ATMyFhceARUUBgcOAQfJKUobGyAgGxtKKSpJHBsgIBscSSpuBAoFBQkFDxMFBQMOARsMBwcEBQgEBAYBAQEBCwkJGA0OFwkJDAICBgQDCQQDCAYMHAENAwUFFBAECQQECQUMGQ4OHRAPHg4OGgvrGjkbCwYJBQQJBQYMBQUGAQ4LCx4REB4LDA0BAQYEBQwGBQgFBAoGCxo5Gg4WBwgIHRkZQyYnQxkZHQgICBcNAakfHBtJKipJGxwfHxwbSSoqSRscH/6jAgMCAgMBBQcDAwcFIQIEAQIKFw0NGQwWDRgICQkJCQgYDRYMGQ0NFwoCAQUBAx4FBwMDBwYBBAECAwIIDQUFBQUFBQ0JDAoTAgMOBQECAQcGCiAREiEMERwLCwwMCwscEQwhEhEgCgYHAQIBBA8DAhMJDB8RESYUJkMZGh0dGhlDJhQmEhEfDAAAAAADAAAADgGkAbIAGAAxADoAACU0JicuASMiBgcOARUUFhceATMyNjc+ATUhNDY3PgEzMhYXHgEVFAYHDgEjIiYnLgE1JTcnBxc3FTM1AaQhHRxNKyxMHRwhIRwdTCwrTRwdIf5tHhobRigoRhoaHx8aGkYoKEYbGh4BGwxmZgxREeArTRwdISEdHE0rK00cHSEhHRxNKyhGGhseHhsaRigoRhobHh4bGkYoDQxmZgxSzMwAAAADAAAASQH4AXcAGAAxAFoAACU0JicuASMiBgcOARUUFhceATMyNjc+ATUHIiYnLgE1NDY3PgEzMhYXHgEVFAYHDgEjEyMeARceARczMhYXHgEVFAYHDgErAQ4BBw4BBzMyNjc+ATU0JicuASMBLhgUFTcfHzcVFBgYFBU3Hx83FRQYlxwxEhIVFRISMRwcMRISFRUSEjEcyYADCAMDBwNlHDESExUVExIxHGUDBwMDCAOAIDcUFRgYFRQ3IOAfNxUUGBgUFTcfHzcVFBgYFBU3H4YVEhIxHBwxEhIVFRISMRwcMRISFQEdAgQCAgQDFRISMRwcMRISFQMEAgIEAhgUFTcfHzcVFBgAAAAACAADAEcB0wF3AFwAZwCAAJkAngCjAKgArQAANxcnLgEHJz4BNz4BJy4BJy4BBw4BBw4BFx4BFx4BMzI2NxcjLgEnLgEnLgEHDgEHDgEXHgEXHgE3PgE3PgE3MwYWFx4BFyMVMzUzNCYxNSMuAScuATUXIxUzNSMnNx4BFyc+ARceARclLgEnJjY3PgE3NhYXHgEXFgYHDgEHBiYnBw4BBwYmJy4BJyY2Nz4BNzYWFx4BFxYGBxczFSM1OwEVIzUhMxUjNSEzFSM12foOAY5qLQUHAwYBAwMPCgsXCwsSBgYCBAMPCgYNBwYNBihEAQUEAwsHChgKCxIGBgIEAw4LCxcLCxIGAgMBTgECAwIIBBwyAQEEBAYDAwM2DjIQRb4ECAS+HTMWFiQO/s8HCwIDAgQEDQgHEQgHCwICAQQEDQgIEAgGBA0ICBAICAoCAwIEBA0IBxEIBwsCAgEEFTMzyjIy/vMzMwFQMjK+Ag4BT0tCBAkFCxcLChMFBgIDBA4LCxcLChMFBAMCAzoHDQYGCQQGAgQDDwoLFwsLEgYFAgMDDwoFCQQQHA0NFgsQCAEBBggSCgoWDFAQEGcYAgUCAREMAQELCEQEDQcIEQcICgMCAQQFDQcIEQcICgMCAQVmBwsCAgEEBA0ICBAIBwsCAwIEBA0IBxEIXRAQEBAQEBAQAAAACAAAAB8BpAGhABsANwA8AEEARgBMAFEAVwAAEyIGBw4BByMVMx4BFx4BMzI2Nz4BNTQmJy4BIxUiJicuASczNSM+ATc+ATMyFhceARUUBgcOASMHNSMVMz0BIxUzNxEhESEBIzUzFTEBESERIQEhESERMdIPGgoKDQESEgENCgoaDw8cCgoMDAoKHA8LFAgICgE6OgEKCAgUCwwVCAgKCggIFQygEBAQEBEBHf7jAQ38/P6wAaT+XAGT/n4BggEsCwkJGA8QDxgJCQsMCwobEBAbCgsMhwgHBxILEAsSBwcICgcIFgwMFggHChIzQ4cyQ3b+4gEe/vP8/AE//n4Bgv6PAWD+oAAAAwAAAA4BpAGyABgAMQA6AAA3MjY3PgE1NCYnLgEjIgYHDgEVFBYXHgEzETIWFx4BFRQGBw4BIyImJy4BNTQ2Nz4BMxMXNycHFyMVM9IrTRwdISEdHE0rLEwdHCEhHB1MLChGGhofHxoaRigoRhsaHh4aG0YoDQtmZgtRy8sOIR0cTSsrTRwdISEdHE0rK00cHSEBkx4bGkYoKEYaGx4eGxpGKChGGhse/uUMZmYMUhAAAAAAAwAAAAgBrwG4AEoAWgBkAAAlBzEiBjEOASMiJicuATUmNjcXNx4BNz4BPwEXNyc3JwcnNycHJwcXBw4BBwYWFwcXDgEVFBYXHgEzMjY/AT4BMzIWFzcuASMiBgcnNxcHDgEjIiYnLgE1NDY3Bx4BFx4BFwcnNwEthAEBDSARESENDA0BDAwRHA4fDw8cDC8MDDBIDEcwRwxHLwwMMAsOAwIEBxwSDg4QDw8nFBQnD4YLGw8OHAsMDiESEiIN6DB2LwwfEBEfDAwMDAwWAgUDAwcDDRcNuYUBDQ0NDQwgEBEfDREcBwQCAw4LMAwML0cMRzBHDEgwDAwvDBwPDx8OHBIPJhQTJg8PEBAPhgsLCwsMDQ4ODZQvdjAMDAwMDB8QER8MdgMHAwMFAwwXDQAAAAIAAAAFAbYBuwAuAFkAABMXHgEzOgEzHgEXHgEXDgEHBhYfATcXNyc3Jy4BBw4BBy4BJy4BJzY0NS4BLwEHPwEWBjEHFx4BFzEXNz4BNzYWFwcuATc+AT8BJzEuAScuAS8BIwYiIyImJwAIARUUAwcDFyYODxMEBwkBAQQFBXqFC4R6DhEjEhIiEQUXEREsGgEBBQQGgBxgBQMCBFkzBAMDDh0PDx4P2AMCAgEJBgICAg0NDiwiAwUEBwQHCwQBOwUBCRosEREXBREiEhIjEQ56hAuFegUFBAEBCQcEEw8OJhcEDAgHEAgIgARhDhcFBE0qAgECBggCAgID2A8eDw8dDgMEBBAQEDMoAwEBAQAAAQABAB4BtQGiAIUAABM+ATc+ATMxMhYXHgEfAR4BFRQGBw4BBw4BIyImJy4BLwExJy4BJy4BNTQ2Nz4BNz4BNz4BMzIWFx4BHwEHJy4BIyIGBw4BFRQWHwEeARceATMyNjc+ATc+ATU0Ji8BLgEnLgEjIgYHDgEHDgEHDgEVFBYXHgEfAQcnLgEnLgE1NDY3PgE3IgcTCgkWCwsWCQoTB+ELCwsLBQ0HBw8HCA8HBwwGY3YDBQECAgICAQUDAwcEAwkEBAgEBAcDvgy+AwoFBQoDBAQEBNkFCQYFDAYGCwYFCgQJCQkJ4AcPCQgTCQkTCAgQBwYLAwQDAwQDCwbFDMQIDAUEBAQEBQwIAYIHDQQEBAQEBA0H4QsdDg8cDAUIAwMDAwMDCAVkdgMHBAQIBAUIBAMHAwMFAgECAgECBQO+C74DBAQDBAoFBQkE2gQGAwICAgIDBgQJFgwLFgnhBgsDBAMDBAMLBgcPCQgSCgkSCQgQBsUMxQgSCgoVCwsWCgoSCAAAAAAGAAD/8QGTAc8ABAAJAA4AIAA+AFMAADczFSM1FTMVIzUVMxUjNRMuAScuASMiBgcOAQcjESERIwc1NDY3PgEzMhYXHgEdARceARceARcjPgE3PgE/ARMhETMVDgEHDgEHMy4BJy4BJzUzEWXJycnJhoaWAQkHBxAKCREGBwkBmAGTmFMFBQQMBwcNBAUFCAcLBAUHA50DBwUECwYJ2v6PhgoRBgcIAskCCQYHEAqG/RAQQxERQxERAS4JDwYGBgYGBg8J/kwBtCYeBwwFBAUFBAUMBx4FBAgGBQsHBwsFBggEBf6DAZIMBQ8KCRULCxUJCg8FDP5uAAQAAAAXAZMBqQAYAB0AIgAnAAAlNSM1MzUjFTMVIxUjFTM1IzUzFSMVMzUjJzMVIzUTIzUzFTMjNTMVAUd1S6hMdUyoTNtMqEzBh4cRhobrhoa+Khqnpxoqp6caGqen24eH/o6Hh4eHAAAAAAMAAAAeAYUBogAVAB0AJwAAAScHNQcjFTkBFTMHFzczNzE3FTcxNwU1MzcdAQcjMzEVJwcXNTE1BwGFDHJ7YD9rDHYBEGMRfv64VWR7PrlWDHMRAZcLcl1iTEtrC3YQZAERf/J1UD8Mek5DDFpgbBEAAAAABQAA//UBLgHLACcAQQBaAHMAjAAAEz4BNz4BPQEjFRQWFx4BFw4BBw4BFRQWFx4BMzI2Nz4BNTQmJy4BJyc1MxUzNTMVFAYHLgEnLgEjIgYHDgEHLgE1EyImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BIzUiBgcOARUUFhceATMyNjc+ATU0JicuASMVIiYnLgE1NDY3PgEzMhYXHgEVFAYHDgEj2gQOBwcK2goHBw4EEx8LCwwYFBU3Hx83FRQYDAsLIBKfUxFUGRAGDAcGDQcHDQcGDQYNG1wcMRISFRUSEjEcHDESEhUVEhIxHBUkDg4QEA4OJBUVJQ0OEBAODSUVER8LDA0NDAsfEREfCwwNDQwLHxEBEwoiExIgBkFBBiATEiMJCRwREikWHzcVFBgYFBU3HxYpEhEcCXcwc3MwB0QlAgQBAQEBAQEEAh9KB/58FRISMRwcMRISFRUSEjEcHDESEhXrEA4NJRUVJA4OEBAODiQVFSUNDhC5DQwLHxERHwsMDQ0MCx8RER8LDA0AAAIAAAAPAbQBsQBTALkAACU0JicuASsBPgE3PgE1NCYnLgEjIgYHDgEVFAYHDgEHDgEjKgExBxUzMhYXHgEXHgE7ATI2Nz4BNTQmJz4BNz4BNTQmJz4BNz4BNTQmJz4BNz4BNQcjFTMyFhceARUUBgcOASsBFTMyFhceARUUBgcOASsBFTMyFhceARUUBgcOASsBMSMiJicuAScuASsBNToBMzoBMzI2Nz4BNz4BNz4BNTQ2MzIWFRQGMQczFDQxMzIWFRQGBw4BIwG0BQUGDQmIAwkDBAUIBwcQCAULBQUGCx8QFwkIDwkVOQhbBRcMChQKChIHhAgOBgUGBAQGCgQDBAQDBQoEAwQEAwYKBAQEJh0IBAgDAwQEAwMIBBkHBAgDAgQEAgMIBBcCBQgDAwMDAwMIBRVvBhAKCRMIERcHSgYRCQoTCAsUCgoXERETBQUCDAMHFhwGZzwKDAQDAggF5ggNBQUFCBcODh8RExcHBwQDBAMLBgZOGg0SBQYEAcMKBQQJAwQEBgUFDgcHCwUBBwUFCwcGDAUCBwQFDAYHCwUCBgUFDAcVEQQDAggFBAgDAwMRBAIDCAQECAMDAxEDAwMHBQQIAgMEBQMDCQQHCaIGBgYTDg4mEhIcBgUGCyEqRQwBAQwIBQcDAwMAAAADAAAADgGkAbIAGAAxADoAABMiBgcOARUUFhceATMyNjc+ATU0JicuASMRIiYnLgE1NDY3PgEzMhYXHgEVFAYHDgEjAycHFzcnMzUj0ixMHRwhIRwdTCwrTRwdISEdHE0rKEYbGh4eGhtGKChGGhofHxoaRigNDGZmDFLMzAGyIR0cTSsrTRwdISEdHE0rK00cHSH+bR4bGkYoKEYaGx4eGxpGKChGGhseARsMZmYMUhAAAAADAAD//QDrAcMABAAlAEkAABMzFSM1FzQmJy4BIyIGBw4BFRQWFx4BFxUzNTcnNTcnPgE3PgE1DwEVFwcVFwcVIzUnLgEnLgE1NDY3PgEzMhYXHgEVFAYHDgEHbRERfhIQECsZGCsQEBILCgocEFQaGiopEBwKCgtRDCQkExMyCw4YCQgJEA0OJRQVJQ4NEAkICRgOAX9DQzIYKxAQExMQECsYEyIODhYG4zsZGiEqKgYWDg4iE14EEiMjLxMSMd0EBhMMDB0QFSUNDhAQDg0lFRAdDAwTBgAHAAAABAHWAbwAaACwALwA1QDiAPsBCAAAASIGBw4BBzU0Njc+ATsBMjY3PgE3Iw4BBw4BKwEiBgcOARUxFTgBOQEVLgEnLgEjIgYHDgEVFBYzOAExMjY3PgE3PgE3PgEzOgEzOgExOgEzMhYXHgEXHgEXHgEzOAExMjY1NCYnLgEjFzkBIiYnLgEnLgEnLgErASIGBw4BBw4BBw4BIzkBIiY1NDY3PgEzMhYXHgEXHgEXHgEzMjY3PgE3PgE3PgEzMhYXHgEVFAYjJSMVIxUzFTM1MzUjNyIGBw4BFRQWFx4BMzI2Nz4BNTQmJy4BIxUiJjU0NjMyFhUUBiM3IgYHDgEVFBYXHgEzMjY3PgE1NCYnLgEjFSImNTQ2MzIWFRQGIwFcDBkNDBwPDAoLHxMKESMODhMCEQIQCwwdDgoXJQwNDg8cDQwZDA0pFBQcLwULFQoLFwwMEggIDwkHDwIBAQIPBwkPCAgSDAwXCwoVCwUvHBQUKQ1GCRIJCRQLDBQJCRQMMgwUCQkUDAsUCQkSCQYdGxESIwgFCgUGCwYIEAkJEgoKEgkJEAgGCwYFCgUIIxIRGx0G/uQQIiIQIiKxBgkDBAQEBAMJBgUJAwQEBAQDCQUEBQUEAwUFA0MGCQMEBAQEAwkGBQkDBAQEBAMJBQQFBQQDBQUDARQJBgULAhEPHgwMDw0NDSYXFB8KCwwRDg8jEgERAgsFBgkZGhlMMjMTBQYFEgwNEAQFBAQFBBANDBIFBgUTMzJMGRoZ/wQFBRALDBIFBgYGBgUSDAsQBQUEECUwRhcXFgMCAgUCBAcCAwQEAwIHBAIFAgIDFhcXRjAlELwhESIiEREEBAMJBgUJAwQEBAQDCQUGCQMEBCIFAwQFBQQDBREEBAMJBQYJAwQEBAQDCQYFCQMEBCIFBAMFBQMEBQAMAAAAMAGkAZAABAAJAA4AEwAYAB4AIwAoAC0AMgA2ADoAABMRIREhEyM1MxU1IzUzFTUjNTMVNSM1MxUFFSMRMxUXIzUzFTUjNTMVNSM1MxU1IzUzFQcVNycfAQc1AAGk/lxDMjIyMjIyMjIBDfz8QzMzMzMzMzMz63V1EUNDAZD+oAFg/rFDQ1NERFRERFRDQxzfAT5f30NDU0REVEREVENDGIhERB0nJ04ABwAAAA4BpAGyABgAMQBmAOIBCQFsAYUAADcyNjc+ATU0JicuASMiBgcOARUUFhceATM1MhYXHgEVFAYHDgEjIiYnLgE1NDY3PgEzFz4BNTQmJy4BIzE4ATEiBgcOAQc4ATEUBgcOAQccARUOAQcOARUUFhceATMyNjc+ATc0NjUnHAEVHAEHHAEVFAYVMAYVFAYVFDAxDgEVBhQVDgEHMAYxDgEHMAYxDgEHJz4BNTQmJy4BIzgBMTgBMTAGMSoBIzgBMQ4BBw4BByc+ATc+ATcxPgE3PgE3OAEzPgEzOgExMjYzOgEzMjYzOgEzMjAxMhYXHgEXHgEVHAEHBw4BBzAGMQ4BByIGMQ4BByIUIw4BBxQwIw4BByc+ATcXDgEHMCIxBw4BByIGIyIGByoBIwYiByoBMQYiIzAGIyoBByoBMSoBIyImJy4BJzwBNTwBNTwBNzwBMTQ2Nz4BNzgBMT4BNz4BNxcOAQcOARUGFBU4ATE4ATEUFhceATMyNjcXDgEHKgExJxQGBw4BIyImJy4BNTQ2Nz4BMzIWFx4BFdIIEAUGBwcGBRAICQ8GBgYGBgYPCQUJBAMEBAMECQUFCgMDBAQDAwoF0AEBIR0cTSseNxgYJg4BAQEEAgQGAgICIRwdTCwnRhscJQYBEAEBAQIBAgEBAQEBAQIBAQECAmQDBAwKCxsQAQIEAgYKBQQJBFQHDQcIDwgECQQFCQQBAgQCAQECBAIBAgEBAwECBQIBJEEZGSIGAQEBLQEEAQECAwEBAQEEAQEBAQQCAQQJBDgFCARkAwYDAVQCBAIBAQECAwIBAQECAwIBAgIEAgIBAgQCAQEDBQMnRBoaIAIBAwIBBQIEBwUFCgZTBAUCAgMBDAoLGxAHDwY4BQkFAQEECggIFQwMFggICQkICBYMDBUICAq2BwUGDwkJDwYFBwcFBg8JCQ8GBQdDBAMECQUFCQQDBAQDBAkFBQkEAwQzBg0HK00cHSEQDg8oGQECAQMIAwEBAQkTCgoUCytNHB0hGxgXQSUCBAIPAQIBAgQCAQIBAgQCAgECBgIBAgUDAQEBAgQCAgIFAgEDBQI8BxAJEBsKCwwBAQMCAgUDUwYKBQUHBAEDAgECAQEBAQEZFhY8IwcPBwMGAnECBAIBAQMCAQIDAQECAwEBAwYDaAMIBT0ECQQ6AQEBAQEBAQEBAQEdGBlDJgMFAgIFAwIDAgEBBw4HBw0GCA8IBw0GUwQKBQUMBgEDARAbCwoMAwNoAgQCtgwWCAcKCQgIFgwMFQgICgoIBxYMAAADAAAAMAGhAZAAaADFANEAACUuAScuAScuATU0Njc+ATc+ATc2Jic8ASM0Njc2JicuAScuASsBIgYHDgEHDgEXHgEVIhQVDgEXHgEXHgEXHgEVFAYjDgEHDgEHDgEVHAEVFBYzOgEzOgExMzAyMzoBMzI2NTwBNTQmJxchNTQ2Nz4BNz4BNz4BNTQmJy4BJzUnLgEnJjY1PgE1MTU2JicmNjc+ATc+ATczHgEXHgEXHgEHDgEXMRUyFDEVMR4BBw4BDwEVDgEHDgEVFBYXHgEXHgEXHgEdAT8BJwcnBxcHFzcXNwEsBxYNDBkKAgEEAgMFAQMIAgMBAgEBAgIGCgMKBwcSDBELEgcHCgMKBgICAQECAQMCCAMBBQMCAQEBCxkNDBYGCgYHCQhZGwgKAwoIG1kICQcKCQL+4wIEBhUMDRkKCwMCAwIFAQQBBgICAQEBAQICAQQIAwcGBQ4JEAcNBQYJBAgEAQICAQEBAQICBgEEAQUCAwUECwoYDQwVBwUERywMLCwMLCwMLCwMgwMIBQQIAwECBwYMBQYQCQMPDgsLBAEBAxcMBx0NBQkDBAYGBAMJBQ0dBwwXAwEBBAsLDg8DCRAGBAsIBwMDCQQFCAMEDgYHHwQFCwsFBB8HBg8EQyoDBAIDCAQECQMDEAcKDgYFDgcFBAELDAkGAgECAQEFHQoEFgoDBwMDBAEBAwMCBwUKFgQKHQYBAgECBgkMCwEEBQcOBQYPCQYRAwMIBAQIAwIHASqxKwwsLAwrLAwsLAwAAwAAAA4BpAGyABgAMQA6AAA3FBYXHgEzMjY3PgE1NCYnLgEjIgYHDgEVIRQGBw4BIyImJy4BNTQ2Nz4BMzIWFx4BFQUHFzcnBzUjFQAhHB1MLCtNHB0hIR0cTSssTB0cIQGTHxoaRigoRhsaHh4aG0YoKEYaGh/+5QxmZgxSEeArTRwdISEdHE0rK00cHSEhHRxNKyhGGhseHhsaRigoRhobHh4bGkYoDQxmZgxSzMwAAAAAAwAAADABtAGQAGgAxQDRAAAlLgEnLgEnLgE1NDY3PgE3PgE3NiYnPAEjNDY3NiYnLgEnLgErASIGBw4BBw4BFx4BFSIUFQ4BFx4BFx4BFx4BFRQGIw4BBw4BBw4BFRwBFRQWMzoBMzoBMTMwMjM6ATMyNjU8ATU0JicXITU0Njc+ATc+ATc+ATU0JicuASc1Jy4BJyY2NT4BNTE1NiYnJjY3PgE3PgE3Mx4BFx4BFx4BBw4BFzEVMhQxFTEeAQcOAQ8BFQ4BBw4BFRQWFx4BFx4BFx4BHQE3NSMVIxUzFTM1MzUBLAcWDQwZCgIBBAIDBQEDCAIDAQIBAQICBgoDCgcHEgwRCxIHBwoDCgYCAgEBAgEDAggDAQUDAgEBAQsZDQwWBgoGBwkIWRsICgMKCBtZCAkHCgkC/uMCBAYVDA0ZCgsDAgMCBQEEAQYCAgEBAQECAgEECAMHBgUOCRAHDQUGCQQIBAECAgEBAQECAgYBBAEFAgMFBAsKGA0MFQcFBEMRQ0MRQ4MDCAUECAMBAgcGDAUGEAkDDw4LCwQBAQMXDAcdDQUJAwQGBgQDCQUNHQcMFwMBAQQLCw4PAwkQBgQLCAcDAwkEBQgDBA4GBx8EBQsLBQQfBwYPBEMqAwQCAwgEBAkDAxAHCg4GBQ4HBQQBCwwJBgIBAgEBBR0KBBYKAwcDAwQBAQMDAgcFChYECh0GAQIBAgYJDAsBBAUHDgUGDwkGEQMDCAQECAMCBwEquUNDEUNDEQAAAAAIAAAAEwHNAa0ABAAJAA4AJwBAAFkAcgB/AAATESERIRczESMRASERIREnMjY3PgE1NCYnLgEjIgYHDgEVFBYXHgEzETIWFx4BFRQGBw4BIyImJy4BNTQ2Nz4BMxUyNjc+ATU0JicuASMiBgcOARUUFhceATM1MhYXHgEVFAYHDgEjIiYnLgE1NDY3PgEzFxQGIyImNTQ2MzIWFQABzf4zESsrAav+kQFvsyE7FhYaGhYWOyEiOxYWGhoWFjsiHjQUFBcXFBQ0Hh80FBQXFxQUNB8KEwcHCAgHBxMKCxMHBwgIBwcTCwcMBQQGBgQFDAcIDAUEBgYEBQwICAUDBAUFBAMFAa3+ZgGaEf6IAXj+iAF4/ogaGRYWOyIiOxYWGRkWFjsiIjsWFhkBMxcTFDUeHjUUExcXExQ1Hh41FBMXxAgHBxILCxIHBwgIBwcSCwsSBwcIVQUFBQwHBwwFBQUFBQUMBwcMBQUFIgQFBQQEBQUEAAAEAAAADAGoAbQAMgA5AEgAVwAAATcVMzUjFTMHLgEnLgEjIgYHDgEHFz4BNxcHIwczFTc1NxcOAQcXPgE3PgE1NCYnLgEnAwc1IzczFQM+ATc+ATMyFhceARcHJwUeARceARUUBgcOAQcnNwFnMBFEJzAQJhQVLRgbMhgXKhENAQMBmToqPDc7OpgBAgILFB8LCgsICQgYEPsZHhoeTw8kExQpFhYqExMjD5iZAT0OFwcICAgHCBYPmJgBZzAoRREwDxkICAkLCgsfEwsBAgKaOTw2Oys5mQECAgwRKhcXMxoYLhQVJhD+8xofGh8BDg4WCAgHCAgHFw2ZmQ0PIxMUKhYVKhMTJBCZmQAAAwAA//wB3gHFAAcALQBDAAATESERITUHFzcwFDUxFTM4ATMwMjkBMhYXHgEXLgEnLgEjIjArARU4ATEVJzcVBxc1MjYzMhYXHgEXNCYnLgEnMxEhEVUBif7Nq1VFEAEBHjIUEx0JEygTFCEMAQEee3s0RQIIBRAvGRktDg0NDica0P6ZARf+5QGJQHQ6bQEBERANDiUVDxMEBQMRLVNTIHgvTQEGCgsmIRszFhYkDP6ZAQAADAAF//MB1QHNABYAGwAgACkANgBDAFAAXQBqAHcAhACRAAABJy4BIyIGBwEGFB8BHgEzMjY3ATY0JwcnNxcHByc3Fwc3Jzc4ATkBFwcnFAYjIiY1NDYzMhYVFxQGIyImNTQ2MzIWFScUBiMiJjU0NjMyFhUXFAYjIiY1NDYzMhYVBxQGIyImNTQ2MzIWFRcUBiMiJjU0NjMyFhUnFAYjIiY1NDYzMhYVFxQGIyImNTQ2MzIWFQHVbAMGAwMGA/60BQVsAwYDBAYCAUwFBeRtYWxgdGxnbWjgbGxsbAMFBAMFBQMEBTAFAwQFBQQDBVQFBAMFBQMEBTAFBAQFBQQEBeUFBAMFBQMEBTAFBAMFBQMEBVUFAwQFBQQDBTEFBAMFBQMEBQFcbAMCAgP+tAUOBWwDAgIDAUwEDwXlbGFtYHNsZ2xn321sbG2RAwUFAwQFBQQwBAUFBAMFBQMMBAUFBAMFBQMwBAUFBAQFBQSFBAUFBAMFBQMwAwUFAwQFBQQMAwUFAwQFBQQxAwUFAwQFBQQAAAAJAAAALQHNAZMAGAAlAD4ASwCQAKEAsQDBANIAADciBgcOARUUFhceATMyNjc+ATU0JicuASMVIiY1NDYzMhYVFAYjJSIGBw4BFRQWFx4BMzI2Nz4BNTQmJy4BIxUiJjU0NjMyFhUUBiM3Jy4BJy4BKwEiBgcOAQ8BIxUzFQ4BBw4BHQEzFRQWFx4BMzI2Nz4BPQEzFRQWFx4BMzI2Nz4BPQEzNTQmJy4BJzUzNSMlPgE3PgE7ATIWFx4BHwEhNxMUBgcOASMiJicuAT0BMxUhFAYHDgEjIiYnLgE9ATMVNxUhNTQ2Nz4BMyEyFhceARVeBw0EBQUFBQQNBwcMBQUFBQUFDAcHCgoHBwoKBwERBw0EBQUFBQQNBwcMBQUFBQUFDAcHCgoHBwoKByMPAggGBg8J3ggPBQYHAw88NwkSBgYHGQcGBRAJCQ8GBgbeBwYFEAkJEAUGBxkHBgYRCjc7/skCBQQDCQXeBgoEAwYBEf7FEgsEAwMKBQYJAwQEMwE0BAQDCgUFCgMEBDQZ/mcFBQQNBwFVBw0EBQXpBgQFDQcHDAUEBgYEBQwHBw0FBAY0CgcHCgoHBwo0BgQFDQcHDAUEBgYEBQwHBw0FBAY0CgcHCgoHBwp4RAgNBAUEBAUEDQhEEQEBCAcHEgp3GggQBgYGBgYGEAgaGggQBgYGBgYGEAgadwoRBwcJAQERPwYIAwMCAgMDCAVSUf7rBQkEAwQEAwQJBRoaBQkEAwQEAwQJBRoakWZmBwwFBAYGBAUMBwAABgAAABMBvwGtAAgADAAQABQAGAAcAAABJyMPARcbAScrATcXIyczBycXIzcXFSczFzUzBwG3ZOdkCAfZ3wgWq1VWwlmwV21Xq1Rlu7sRuroBNXh4CAn+7wEaCGZmZ2dkZGR16urq6uoAAAAABAAAAAsBqwG1ABgAMQBNAG0AABMiBgcOARUUFhceATMyNjc+ATU0JicuASMRIiYnLgE1NDY3PgEzMhYXHgEVFAYHDgEjNzQmJy4BIyIGBw4BFRQWFx4BFwczJz4BNz4BNQcjPwEnLgEnLgE1NDY3PgEzMhYXHgEVFAYHDgEPAR8B1SxOHB0iIh0cTiwsTh0dIiIdHU4sKEgaGx8fGxpIKClHGxsfHxsbRylFCwkKGQ4OGQkJCwUFBQ0IJIkjBw0FBAYYWRsFDAYKBAMECAcHEwoLEwYHCQQEAwoGDQUcAbUhHR1OLCxOHR0hIR0dTiwsTh0dIf5nHxobRykpRxsaHx8aG0cpKUcbGh/3DhkJCgoKCgkZDgkSCAgMBWZmBQ0HCBIJkU8OBwMKBgYNBwsSBwcICAcHEgsHDQYGCQMHDlAAAAAAAwAAABEBnwGvADEARwBjAAABLgEnLgEjIgYHDgEPAScHFwcOAQcUFhcHFzceARceATMyNjc+AT8BFzcnNz4BNTYmJwEOAQcOASMiJicuAScuATU0Nj8BFwc3Jzc+ATc+ATMyFhceARceARceARUUBgcOAQ8BAYsFDAYHDgYHDgYHCwY9IwwpuQkJAQYHJAwkBAkFBQoFBgwGBgoFuSYMIT0LCgELCv7sBAcEBAkFBAkEBAgDBwcHB7lBuctNPQQJBQUKBgULBQQJBAQGAgICAgICBgQ9AZsFCAIDAgIDAggFPiMMKLkIFQsLFgojDCMDBQECAQICAwcEuScMIj0KGg4NGgv+qwQFAQICAgIBBQQGEQkJEQa6Qbm/TD4EBgICAgICAgYEBAkFBQoFBgoFBQkEPQACAAAAAgEjAb4ALwBUAAA3PgE1NCYnLgEnLgEjIgYHDgEHDgEVFBYXHgEXHgEzFSMVMxUzNTM1IzUyNjc+ATcnPgE3PgEzMhYXHgEXHgEVFAYHDgEHDgEjIiYnLgEnLgE1NDY3+BYVFRYKGQ0NGw4OHA0NGQoWFRUWChYMDBkNRUURREQMGgwMFgrBCRQMDBgNDRkLDBUJEhMTEgkVDAsZDQ0YDAwUCRMTExPGFTYbHDYVCxAFBQYFBgUQCxU2HBs2FQoPBgUGRRFERBFFBgYFDwrBCg4EBQUFBQUOCRMvGRgwEwgOBQQFBQUEDgkTLxkYMBIABQAAAEYCAAF6ABwAIQAmACsAMAAAJSM1IzUjFSM1IxUjFSMVMxUzFTM1MxUzNTM1MzUFNTMVIxcjETMRMyMRMxE3IzUzFQIAMjREqkUzNDQzRapENDL+RSIiVSIi7yIiNCMj6WYrkZErZhJmK5GRK2YSZ7y8KwES/u4BEv7uK7y8AAAABAAA//YB1AHKABEAFgAbACAAACUHJzcnDwEXNxcHFzcXBxc3JwcnNxcHLwE3FwcnFwcnNwHIDMgNDA2BDAle2gzaXQgMjQx5HmAeYCpzYXJgPR5gHV/3DcgMDAyCDAle2QzaXgkMjgx5HmEeYStyYHJg/R5hHmEABAAA//EBqwHPAFYAZABpAHcAACU0JicuASMiBgcOAR0BMxwBFRQWFx4BMzE1MSIGBw4BBzU0Njc+ATMyFhceAR0BLgEnLgErARUzMjY3DgEHDgEHNSMVMzU+ATc+ATc+ATc+ATU8ATUxNQUVLgEnLgE1NDY3PgE3FyM1MxU3NR4BFx4BFRQGBw4BBwGrIh0dTiwsThwdIgEQDg0lFQ4ZCgsSBx8bGkgoKUcbGx8HEgsLGQ0BAQcLBwoVDAsaDVZVFCYRER0LCQ4FBQb+qg4ZCQkLCwkJGQ6aMzNmDxkJCQsLCQkZD/osTR0dIiIdHU0sVwIEARUmDg4QzQYGBhELJihIGhsfHxsaSCgmChEGBgfNAgIKDwcGCQQeMwMFDwwLHBEHEQsKFwwCAwJXC6cDDwsMGxAPHAsLDwPtERFGpwMPCwscDxAbDAsPAwAKAAD/6QHvAdcASABXAHAAfwCOAJ0ArAC7AMoA2QAAJTUjNCYnLgEnNycHLgEnLgEnNSMVDgEHDgEHJwcXDgEHDgEVIxUzHgEXHgEXBxc3HgEXHgEXFTM1PgE3PgE3FzcnPgE3PgE1MycjLgEnLgEnNx4BFx4BFwciJicuATU0Njc+ATMyFhceARUUBgcOASM3By4BJy4BIzUeARceARcnFSIGBw4BByc+ATc+ATcHFw4BBw4BByM+ATc+ATcHMx4BFx4BFwcuAScuATUXNx4BFx4BMxUuAScuAScXNTI2Nz4BNxcOAQcOAQc3Jz4BNz4BNzMOAQcOAQcB7zwIBgYSCioMKgwbDw8gERERIA8PGwwrDCsLEgcGCDw8AQcGBxEKKgwqDBsPDyAREREhDg8bDCsMKwoSBgYIPk1mAQICAgUDSQkQBgUHAasKEwcHCAgHBxMKCxMHBwgIBwcTC3NKAwgEBAkEDx0ODRgLewUIBAQIA0oLGA0OHQ92SQMFAgICAWYBBwUGEAkrZgECAgEFA0gKEAUGBzdIAwgFBAkFDx0ODRgLewUJBAUIA0gLGA0OHQ92SAMEAgICAWYBBwUGEAnXEhEgDw8cDCsMKwsRBwYHATo6AQcHBhELKwwrDBwPDyAREhAhDg8bCysMKwsSBgYHAT08AQcHBhELKwwrDBoPDyAREgQKBAQIBEgKGQ0OHQ88CAcHEgsLEgcHCAgHBxILCxIHBwiySQIFAgEDaQEHBgYPCi1oAwECBQJJCQ8GBgcBOUgECAQECgQPHQ4NGQp8BAkEBAcESAsXDg0cD3RHAwQCAgNmAQcGBRAKLGYDAgEFA0gKDwYGBgE4RwQHBAUIBQ8cDg0YCgAAAwAAAAsBKwG1ACYANgBGAAATNTM1IRUzFRQWFx4BFw4BBw4BHQEjFSE1IzU0JicuASc+ATc+ATUHFSM1NDY3PgE3HgEXHgEVJy4BJy4BPQEzFRQGBw4BB/8s/tUrBQoJIhwYIQoKCSsBKywJCgohGBwiCQkGEbIHCQojHBwjCgkHWh0jCQoFsgYJCiMeAT9lERFlCxcNDBsNDBYMDRwRWBERWBEcDQwXDA0aDQwXC8tYWA4XCwwWDQ0XCwsXDnEOGAsMFAllZQkUDAsYDgAAAAIAAP/gAREB4AAbAD8AACU0JicuAScOAQcOARUUFhceARcVMzU+ATc+ATUHNTcnBzUjFScHFxUuAScuATU0Njc+ATceARceARUUBgcOAQcBERoUFDAWFzAUFBoaFBMtEhESLRMUGoA2DCoRLAw4EicQEBYVERErFhUrEREVFREQJxLVK0sgIToaGjohIEsrKDURERIGXl4GEhERNSiFQjYMKq1RLAw4ngYRDw8uIiVCHh41GRk1Hh5CJSIuDw8RBgAAAAAIAAAAEAGgAbAABAAJAA4AEwAYAB0AIgAnAAA/ARcHJxMzFSM1OwEVIzUHMxUjNTUzFSM1FwcnNxcHJzcXBy8BNxcHAN8M3wygRES7RUVEEREREWkwDDAMDDAMMAyEMQ0wDBzfDN8MAR0RERERRUREvEREKzEMMQy2MQwxDIUwDDAMAAACAAAAEwGaAa0AJgA/AAATFzcHLgEnLgEjIgYHDgEVFBYXHgEzMjY3PgE1NCYnLgEnNwcXNwcDIiYnLgE1NDY3PgEzMhYXHgEVFAYHDgEj7ASCgQkWDAwbDh41FBMXFxMUNR4eNRQTFwUFBA4Jgh8RKa5bGi8REhQUEhEvGhsuEhEUFBESLhsBhREegQgOBQQFFhQUNR4eNRMUFxcUEzUeDhoNDBYKgYIErSj+nxQSES8aGy4SERQUERIuGxovERIUAAAABQAA//oBiQHGACMAKABBAEoATwAAJSc1PgE3PgE1NCYnLgEjIgYHDgEVFBYXHgEXFScHFTcXNzUHDwE1NxUTNDY3PgEzMhYXHgEVFAYHDgEjIiYnLgE1Eyc1FxUzNRcVNwc1NxUBADMLEgcHCAkICBYNDBYICAkHBwcTCzOJiXeJiYlmZiMGBgYPCQkQBgUHBwUGEAkJDwYGBmZ3MxEzd2Zmyx1oAQsIBxQMDBYICAkJCAgWDAwUBwgLAV4dONE4RETRRIIprCqtAUIJDwYGBgYGBg8JCRAGBQcHBQYQCf6BRaodS0IdrDwzqzOrAAAAAwAA//wB3gHFAAcALABCAAABJxUhESERNycXBzU4ATE1IyoBMSIGBw4BBz4BNz4BMzEwMjEwMjEzNTgBPQETIREzDgEHDgEVPgE3PgEzOgEXFTcRAd6r/s0BiVWae3seAQEMIRQTKBMJHBQUMR4BAREz/prPGScODQ4PLhkYLxAECANEAVF0QP53ARs6U1NTLREDBQUSDxUlDg0QEAEg/mgBZwskFhczGiAnCwoGAU0u/wAABQAA//EBxQHPACgAOABOAGcAiAAAJTEnBzU0JicuASMiBgcOAR0BBw4BFRQWHwEeARceATMyNjc+AT8BMyclNDY3PgEzMhYXHgEdAQc1FwcOASMiJi8BLgE1NDY/ARUzNTcXIxcuATEwBgccARUUFhceATMyNjc+ATUmNCcHIiYnLgE1PAE1OQE+ATc+ATceARceARccARUWBgcOASMBZqcDCAcHEwoLEwcHCEYIBwcIYAMJBQQKBQUJBQQJBHppNP8ABgQFDAgHDAUEBkXEgAUMBwYNBGEEBQUEkRECs0eZAzM0AwkHCBQMCxQIBwkBATYIDgUGBgEIBQYMBgYMBgUIAQEGBQUOCPOnAwUKEwcHCAgHBxMKa0cHEwkKEghgBAUCAgICAgIFBHs1qQcMBQQGBgQFDAcWRFrNgAUEBAVgBQwHBgwFkGx9ArKfI0lKIwIDAQwUCAcJCQcIFAwBBAIuBgUGDggBAgEJFgsLFAkJFAsLFQkCAgEIDgYFBgAABQAA//oA7wHGABQAGQAqAC8ANAAAEzUjFSMRFBYXHgE7ATI2Nz4BNREjJzMVIzUTFAYHDgErASImJy4BNREzEQMzFSM1OwEVIzW8iTMHBwYRCpEKEQYGCDN4Z2eaBQQECwaRBgsEBAXNiRERNBERAT6IiP7rChEHBgcHBgcRCgEVd3d3/nQHCgQFBAQFBAoHAQT+/AFzKysrKwAABgAAABMBqwGtAAQACwAQABgAMQBKAAATESERIRM3FzcXITUFITUhFTUnBycHNSEVJzI2Nz4BNTQmJy4BIyIGBw4BFRQWFx4BMzUyFhceARUUBgcOASMiJicuATU0Njc+ATMAAav+VRF4djxZ/n0Bif53AYldPHh4AYleCQ8GBgYGBgYPCQkQBgUHBwUGEAkFCgMDBAQDAwoFBgkEAwQEAwQJBgGt/mYBmv7+fnczWiCHVlZ5YDN3fdj/hwcGBRAJCQ8GBgcHBgYPCQkQBQYHRQQEAwoFBgkDBAQEBAMJBgUKAwQEAAAAAAQAAP/5AekBxgCdALkBKAFBAAAlIy4BJy4BJzQ2Nz4BNw4BBw4BBy4BIyYiJz4BNTQmJy4BIyIGBw4BFRQWFx4BFw4BBw4BBy4BJy4BNTQ2Nz4BNycOAQcOARUUFhceARcOARUGFBUUFhceARcHBhYXHgEfAR4BMzI2Nz4BPwEeATMeATM6ATM+ATMXHgEXHgEzMjY/AT4BNzY0LwE+ATc+ATczMjY3PgE9AS4BJy4BIyU0Njc+ATMyFhceARUUBgcOAQcOAQcuAScuATUFFAYHDgErAQcOAQcOAQ8BHwEeAQcOAQ8BDgEjIiYvAgcOASMqAScuAS8BDwEOASMqAS8BLgEnJjQ/AicuAScuATU0Njc+ATM6ARcyFh8BNz4BNz4BNw4BFQ4BHQEXHgEXHgEfATMyFhceAR0BJxQGBw4BIyImJy4BNTQ2Nz4BMzIWFx4BFQG9CgUOCQkXDAECAgUDDRoLDBMHBAkEBQkEAQIMCgscEBAcCgsMBAIDCQUMFgkJDwUJDQUEBQUEBAoEBQgOBQYGAwUFEw8BAgEHCAcUDQoDAQQDCwgYAwYDBwsFBAgCBwYNBwYOBwQJBQQJBAoDBwUECwUFCAQWBwoDAgQGCQ8HBwsFEQkPBgUHAQgGBRAI/roKCAgWDA0VCQgJAwINGQsMFgoFCAMCBAFeBAMDCQUcBQQKBgYOCAwHBgIBAgEGBBYCBQMGCgMKBgwJEAgGDAcGDAYPBAcCCwcCBAEYBAYCAgEKBQoMEgcGBh0ZGUImBQsFBQsFDAYECgYGDggCAgEBCAwUCAkNBAQWBQkDAwReAwMDBwUECAMDAwMDAwgEBQcDAwPxDRcKChIIERYJCREKAQoIBxMMAQIBAQULBxAcCgoMDAoKHBAIDwcHDQUHEgoKFgwDCAUECwYHDAUGBwIQAgsHBxEJBQ4IBw8GBAgEBQgFEB4ODxkLHgcQBgcKAgkBAQMEAwkGFAEDAQEBARUFCAMCAwEDCwQLBwcPBw0GDQcIDwkHBQYPCRsJDwYFB4kMFggICQkICBYMBwwFAQMDAwgEBAoGBg0HzgUJBAMECAgOBgcMBQkNDQMJBAQHAgoBAQYGFQsCAQEBAQIBAw4UBggBCAIFBAQIBB8LCAoWDQwaDh40ExQWAQEBAgoGDQUFCQMGDAcHEQsJBgcQCQoUCwsEAwQJBRs4BAgDAwMDAwMIBAUHAwMEBAMDBwUAAAAJAAAAJAHNAa4AGAAxAGoAmwC0AM0A5gDrAPAAABMiBgcOARUUFhceATMyNjc+ATU0JicuASMVIiYnLgE1NDY3PgEzMhYXHgEVFAYHDgEjNz4BNTQmJy4BIyIGBw4BByc+ATU0JicuASMiBgcOARUUFhcHLgEnLgEjIgYHDgEVFBYXBxUXNzUnByc3HgEXHgEzMjY3PgE1NCYnNx4BFx4BMzI2Nz4BNxcOARUUFhceATMyNjc+ATcXBzcUBgcOASMiJicuATU0Njc+ATMyFhceARUnMhYXHgEVFAYHDgEjIiYnLgE1NDY3PgEzBzIWFx4BFRQGBw4BIyImJy4BNTQ2Nz4BMwcXFSc1FzU3FQfmDhkJCQsLCQkZDg4ZCgkLCwkKGQ4KEwcHCAgHBxMKCxMHBwgIBwcTC8cDAwsJCRkOBw4GBgsFFgECCwkKGQ4OGQkJCwECEQUKBgYMBw4ZCQkLAgIm5ucgx8gVBQsHBg8HDhkKCQsEBA0FDAcHDwgJDwcHDAUUAwMKCgkZDgcNBgYLBRDJvAgHBhMLCxMHBggIBgcTCwsTBgcIvAsTBwcICAcHEwsKEwcHCAgHBxMKgAsTBwcICAcHEwsKEwcHCAgHBxMKVc3N3s3NAUYGBgYPCQkQBgUHBwUGEAkJDwYGBkQFAwQJBQQJBAQEBAQECQQFCQQDBTwECQUJDwYGBgECAgQDCQMGAwkQBQYHBwYFEAkDBgMIAwQBAgEGBgYPCQQIBBGpYmOoD2pWCQMGAgICBwYFEAkFCgUFBAYDAgICAgMGBAkECAUJDwYGBwICAQQDBlV8BQkDBAUFBAMJBQQJBAQEBAQECQRMBQQDCQUECQQEBAQEBAkEBQkDBAUzBAQECQQFCQMEBQUEAwkFBAkEBARMV4xYi+OMV4tYAAAEAAAAEwGwAa0AHQAhAD8AQwAAJQc3Jz4BNz4BNTQmJy4BIxUyFhceARUUBgcOAQcnFzcXByU0Njc+ATcXNwcXDgEHDgEVFBYXHgEzNSImJy4BNTcHJzcBSBJ6MAYKAwMEIBwcSyonRBkaHgMDAwgFKwELOEP+yAYFBhAKNBJ6JwsRBgYHIBwcSisnRBoZHlwKOEK2fRMwCxgNDBoOK0ocHCARHhkaRCcMFwoLFQotaUQ6CpMRIA8PGw01fRMpDh4QESMTK0ocHCARHhkaRCeqRDoKAAkAAP/gAVUB4AAYADEATQBRAGEAagBvAHQAeQAAEyIGBw4BFRQWFx4BMzI2Nz4BNTQmJy4BIxUiJicuATU0Njc+ATMyFhceARUUBgcOASMXPAE1PAE1NCYnLgEnDgEHDgEVHAEVHAEVByEnByM3FTMjNTQ2Nz4BNx4BFx4BHQE3FyM8ATU8ATUHMxUjNTsBFSM1IzMVIzWrCRAGBQcHBQYQCQkPBgYGBgYGDwkGCQQDBAQDBAkGBQkEAwQEAwQJBVUMCwogFBQgCwsMVQFVVasxMZqJCQkJGREQGggJCRExMV4RESsREVYSEgFpBwYGDwkJEAUGBwcGBRAJCQ8GBgdFBAQDCQYFCgMEAwMEAwoFBgkDBARzFzAVFSIKEikTFCQMDCQUEyoSCSMVFTAXamtaPz/2DyIRER8NDR8RESIP9j8/Bg4HCBIKYVVVMzMzMwAAAAAKAAL/8AHeAc0ASABSAFwAZgBwAHoAhACQALYAwAAAJTc1Jy4BJy4BJzcnBy4BJy4BLwEjBw4BBw4BBycHFw4BBw4BDwEVFx4BFx4BFwcXNx4BFx4BHwEzNz4BNz4BNxc3Jz4BNz4BNzcVBzQ2NTQmNRcnFwcuAScuASc3JzMXIiYjIgYjNwc3Fw4BBw4BBycHNTcUBhUUFhUnFyc3HgEXHgEXBxcjJzIWMzkBMjYzByciJicuATU0Njc+ATc+ATc+ATMxMhYXHgEVFAYHDgEHDgEHDgEjNwcnPgE3PgE3FwGaREQCBQMDBwMmJzMHDQcGDwcIQAcIDgcGDQY1JyUEBgMDBAJERAIEAwMHBCYnMwYNBwcOCAhACQcOBwcMBzQnJwQHAwMEAjMzAQEzThMcAwcEAwgEJqEiBgYLBQYLBQSTFCcFBwQECAMcOjMBATNOExwDBwQDBwQloSIGBgsGBgsGBhEgOBUVGQYGBhELCxkODh4PIDgVFRgGBQYRCwsZDg0eEKQTJwQIBAQHAxy5B0AGCA8HBw0GMycmBAcDAwQCREQCBAMDBgQlJzUGDQYHDggHQAgHDwcHDQY0JycEBwMDBQJERAIFAgMHBCYnNgcNBgcOCDghBQULBgYKBgaTEyYECAMEBgQcOjMBATNOFBsEBwQECAQmoSIGBgsGBgsFBZISJgQHBAMHAxw7MwEBM0QYFRU4IA8eDg4ZCwsRBgUGGBUVOCAPHg4OGQsLEQYFBgoTHAMIBAQHBSgAAAADAAAACwFEAbUAFAAlADEAABMHMBQVFBYXHgEXPgE3PgE1PAExJxMUBgcOAQcuAScuAT0BNxcVJwcXBxc3FzcnNycHoqITFBM+Kis9FBQSopEREhI2JiU3EhIRkZHCDDMzDDMzDDMzDDMBtR7MGhUuFhcoDg4oFxYuFRrMHv78EigUFCUNDSUUFCgS1xwb2IMMNDMMNDQMMzQMNAAFAAAAEwGaAa0AGAAxAFYAbwCIAAATIgYHDgEVFBYXHgEzMjY3PgE1NCYnLgEjESImJy4BNTQ2Nz4BMzIWFx4BFRQGBw4BIzcmBgcOAQcOASMiJicuAScuAQcOARceARceATMyNjc+ATc2JicnFAYHDgEjIiYnLgE1NDY3PgEzMhYXHgEVMxQGBw4BIyImJy4BNTQ2Nz4BMzIWFx4BFc0rShwcICAcHEorKkscHCAgHBxLKidEGhkeHhkaRCcnRBkaHh4aGUQnagMGAgcUDA0cDxAcDA0UBwEHAwMCAQgXDg8hEhEhDw4XCAICBJUEAwQJBQYJBAMEBAMECQYFCQQDBIkEBAMKBQUKAwQEBAQDCgUFCgMEBAGtIBwcSisrShwcICAcHEorK0ocHCD+dx4ZGkQnJ0QaGR4eGRpEJydEGhkeiwICAw4WBwgICAgHFg4DAgIBBwMPGgkICgoICRoPAwcBXAYJAwQEBAQDCQYFCQQDBAQDBAkFBgkDBAQEBAMJBgUJBAMEBAMECQUAAAAABAAA/+AA5gHgAFYAYwB8AIEAABMjFTMVFAYPATUXNycHFzcRJy4BPQE+ATc+ATU0JicuASMiBgcOARUUFhceARcVFBYXHgEfARUOAQcOARUUFhceATMyNjc+ATU0JicuASc1Nz4BPQEzNQc0NjMyFhUUBiMiJjUTFAYHDgEjIiYnLgE1NDY3PgEzMhYXHgEVEzMVIzXmOxkCBzsMDiMjDww2BwcFCQQDBAUFBA0HBwwFBQUEAwQJBgMDAwcDQwgMBQQFBgYGDwkJEAYFBwUFBA0HRwsDENUKBwcKCgcHCoAEAwQJBgUJBAMEBAMECQUGCQQDBCsYGAF6OykHCwc67hQJOjoJFP7MNgcLBSgBBgUECwYHDQQFBQUFBA0HBgsEBAYCKAYKBAQIA0MwAQgFBg4HCRAGBQcHBQYQCQcOBgUIAXZHCxIIKTtnBwoKBwcKCgf++AYJBAMEBAMECQYFCQQDBAQDBAkFAV4ZGQAAAAAGAAD/9gHUAcwAaABtAIAAlgCbAKAAAAEHLgEnLgEjIgYHDgEHNx4BMzI2Nz4BNTQmJy4BIyIGBw4BBwYWFwcnBxcHLgEjIgYHDgEVFBYXHgEzMjY3PgE3NCYnNw4BFx4BFwcXNycHLgEnJjY3FzcnPgE3PgEzMhYXHgEXBxc3JwMHJzcXEz4BMzIWFxYUBw4BIyImJyY0NwMOASMiJicuATU0Njc+ATMyFhcWFAc3JzcXBwUnNxcHAasQDBwQDyARCxYLCxUJQQMJBQYMBQYFBQYFDAYHDAUEBQEBAwNSECoQVAQIBQYNBQUFBQUFDQYHDAUEBQECA0ENCgMDFhMPKioqDhMTAgEPDwcrCAsWDAwZDQ8dDg0aCw8rKSnmEhISEk8CBgQDBgMFBQMGAwQGAgUF5gIHAwMGAwIDAwIDBgMDBwIFBXIRERISAQsSEhISAUIPCxEFBgYDAwIIBUEDAwYFBQwHBwwFBQYGBQQLBQYLBVEPKg9UAwIFBQUNBgcNBQQFBQUECwUGCwVBGTYbGzMWECoqKg8WNBsaNRcGKQcICwQDBAUFBQ8KDykpK/7eEhISEgGUAwMDAwUNBQMDAwMEDgX+6wIDAwICBgQDBgMDAgIDBQ4FeBISEhIRERISEQAAAwAA//oBygHGABoAKQA0AAATMQcOAQcUFhcHJwcXNyc3HgE3PgE/ATM1NycTDgEjIiYnLgEnLgEnMwc3IS4BNz4BPwEXB/1ZFRUBEhNJSA2dDElJFTUaGzMVMAEpzWcTLxkYMBIEBwMEBQPzJDX+9gUBBAQRDU61GQHGWhUzGxo0FkhIDp0MSUgSEwEBFRQwAinO/uMSExMSBQgFBAkFJDYQIxARHw1OtRkAAAEAAAABAAA+c6mtXw889QALAgAAAAAA0JJkfgAAAADQkmR+AAD/4AIBAeAAAAAIAAIAAAAAAAAAAQAAAeD/4AAAAgAAAP/+AgEAAQAAAAAAAAAAAAAAAAAAAM4AAAAAAAAAAAAAAAABAAAAAgAAMwIAACsCAAArAgAAAAIAABECAAAzAgAAVQIAAFUCAAAAAgAAXgIAAB0CAAArAgAAGgIAADMCAAAAAgAACAIAADwCAAAaAgAAAAIAABoCAAAqAgAAMwIAABoCAAA8AgAANwIAAEcCAABeAgAAKwIAADMCAAAAAgAAKwIAACICAAARAgAAMwIAADMCAAArAgAAZgIAABgCAAAaAgAAeAIAABQCAAArAgAALwIAADMCAAA8AgAAEQIAACsCAAArAgAAMwIAAIACAAAAAgAAKwIAACICAABvAgAAMwIAACsCAABVAgAAKwIAACsCAAArAgAARAIAAAACAAAAAgAAVQIAAIkCAAArAgAAKwIAAFUCAAArAgAAPAIAACsCAAArAgAAKgIAADMCAAArAgAAKwIAADMCAAAVAgAAKwIAACsCAABmAgAAAAIAADMCAAAzAgAAZgIAACICAABrAgAAMwIAADMCAAA8AgAAXgIAACsCAABVAgAAGgIAACICAAAzAgAAMwIAABoCAAAMAgAAKwIAABoCAABCAgAAKwIAADMCAAAzAgAAPAIAAAACAAAzAgAAKwIAACsCAAAWAgAAKwIAADMCAABmAgAAKwIAABoCAAAzAgAAKwIAAAACAAAzAgAAAAIAACsCAAArAgAAGgIAACACAAAaAgAAKwIAADMCAACfAgAAKwIAAKACAAAqAgAA0gIAACoCAADBAgAAKgIAAKACAAAqAgAAAQIAAAEB1gAAAQIAAAFhAAABtQAAAbcAAAFyAAABxgAAAcUAAAGTAAABpAAAAfgAAAHTAAMBpAAAAaQAAAGvAAABtwAAAbcAAQGTAAABkwAAAYUAAAEuAAABtQAAAaQAAADrAAAB1gAAAaQAAAGkAAABoQAAAaQAAAG0AAABzQAAAakAAAHeAAAB2wAFAc0AAAG/AAABqwAAAaAAAAEjAAACAAAAAdQAAAGrAAAB7wAAASsAAAERAAABoAAAAZoAAAGJAAAB3gAAAcUAAADvAAABqwAAAecAAAHNAAABrwAAAVYAAAHeAAIBRQAAAZoAAADmAAAB1QAAAcoAAAAAAAAACgAUAB4AsAEQAeoCfgLUBAwEMgRuBUoFvAb8B3QHxgi2CUAJagnoChQKigtKC3wLxgy6DXoN1BByEJwQxBEKEd4T0BQuFFAUpBTcFTYVThXAFegWQBbuFw4XohgAGEoYbBjiGVYZ9BpwG0YbthvWHFockBzQHWodph34HnYe3B+IIGAgniEGIagiHiLgIzQloiYQJowmxCgQKLYo1ikEKjQqsix8LJotTi4CLl4u5i8CLyQvXC+KMHQw1DEYMT4xkDIMMkYyzjNMM5AzwjQ6NHQ1rDZKNsY3HDe4OAw4ejimOUQ6MDsSO6Y73DwMPGw84D3GPiI+lD9eP5g/xkBMQHZBJEFMQWZBxkHaQjRCSEKgQrRDDkMiQ3xEJETORVpFgEXCRtxHXEgSSKxKpEusTAZMjE2OThJObE8ET4xQUFDMUQJRPFIEUvxTVlPCVR5VdFdYWHpY1FnyWqxbMluMXFZdeF2uXlBe6l9kX6Zf4mCIYc5iNmKYYtpjPGO0ZA5kzmUcZZBnWmiwaRppxGrkazJr+myybaRt+gAAAAEAAADOAcQAGQAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAOAK4AAQAAAAAAAQAgAAAAAQAAAAAAAgAOAIYAAQAAAAAAAwAgADYAAQAAAAAABAAgAJQAAQAAAAAABQAWACAAAQAAAAAABgAQAFYAAQAAAAAACgA0ALQAAwABBAkAAQAgAAAAAwABBAkAAgAOAIYAAwABBAkAAwAgADYAAwABBAkABAAgAJQAAwABBAkABQAWACAAAwABBAkABgAgAGYAAwABBAkACgA0ALQAUABlAC0AaQBjAG8AbgAtADcALQBzAHQAcgBvAGsAZQBWAGUAcgBzAGkAbwBuACAAMQAuADAAUABlAC0AaQBjAG8AbgAtADcALQBzAHQAcgBvAGsAZVBlLWljb24tNy1zdHJva2UAUABlAC0AaQBjAG8AbgAtADcALQBzAHQAcgBvAGsAZQBSAGUAZwB1AGwAYQByAFAAZQAtAGkAYwBvAG4ALQA3AC0AcwB0AHIAbwBrAGUARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="

/***/ }),
/* 37 */
/*!**********************************************************************************************************!*\
  !*** ./src/assets/Icon-font-7-stroke-PIXEDEN-v-1.2.0/pe-icon-7-stroke/fonts/Pe-icon-7-stroke.svg?d7yf1v ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "Pe-icon-7-stroke--d7yf1v-usage",
      viewBox: undefined,
      url: __webpack_require__.p + "sprite.svg#Pe-icon-7-stroke--d7yf1v-usage",
      toString: function () {
        return this.url;
      }
    });

/***/ }),
/* 38 */
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 39 */
/*!***************************************************************************************!*\
  !*** ./src/assets/Icon-font-7-stroke-PIXEDEN-v-1.2.0/pe-icon-7-stroke/css/helper.css ***!
  \***************************************************************************************/
/*! dynamic exports provided */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!./helper.css */ 40);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ 8)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js!./helper.css", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js!./helper.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 40 */
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./src/assets/Icon-font-7-stroke-PIXEDEN-v-1.2.0/pe-icon-7-stroke/css/helper.css ***!
  \*****************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 7)(false);
// imports


// module
exports.push([module.i, "\n/* HELPER CLASS \n * -------------------------- */\n\n/* FA based classes */\n\n/*! Modified from font-awesome helper CSS classes - PIXEDEN\n *  Font Awesome 4.0.3 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (CSS: MIT License)\n */\n\n/* makes the font 33% larger relative to the icon container */\n.pe-lg {\n  font-size: 1.3333333333333333em;\n  line-height: 0.75em;\n  vertical-align: -15%;\n}\n.pe-2x {\n  font-size: 2em;\n}\n.pe-3x {\n  font-size: 3em;\n}\n.pe-4x {\n  font-size: 4em;\n}\n.pe-5x {\n  font-size: 5em;\n}\n.pe-fw {\n  width: 1.2857142857142858em;\n  text-align: center;\n}\n.pe-ul {\n  padding-left: 0;\n  margin-left: 2.142857142857143em;\n  list-style-type: none;\n}\n.pe-ul > li {\n  position: relative;\n}\n.pe-li {\n  position: absolute;\n  left: -2.142857142857143em;\n  width: 2.142857142857143em;\n  top: 0.14285714285714285em;\n  text-align: center;\n}\n.pe-li.pe-lg {\n  left: -1.8571428571428572em;\n}\n.pe-border {\n  padding: .2em .25em .15em;\n  border: solid 0.08em #eeeeee;\n  border-radius: .1em;\n}\n.pull-right {\n  float: right;\n}\n.pull-left {\n  float: left;\n}\n.pe.pull-left {\n  margin-right: .3em;\n}\n.pe.pull-right {\n  margin-left: .3em;\n}\n.pe-spin {\n  -webkit-animation: spin 2s infinite linear;\n  -moz-animation: spin 2s infinite linear;\n  -o-animation: spin 2s infinite linear;\n  animation: spin 2s infinite linear;\n}\n@-moz-keyframes spin {\n  0% {\n    -moz-transform: rotate(0deg);\n  }\n  100% {\n    -moz-transform: rotate(359deg);\n  }\n}\n@-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n  }\n}\n@-o-keyframes spin {\n  0% {\n    -o-transform: rotate(0deg);\n  }\n  100% {\n    -o-transform: rotate(359deg);\n  }\n}\n@-ms-keyframes spin {\n  0% {\n    -ms-transform: rotate(0deg);\n  }\n  100% {\n    -ms-transform: rotate(359deg);\n  }\n}\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(359deg);\n  }\n}\n.pe-rotate-90 {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);\n  -webkit-transform: rotate(90deg);\n  -moz-transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  -o-transform: rotate(90deg);\n  transform: rotate(90deg);\n}\n.pe-rotate-180 {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);\n  -webkit-transform: rotate(180deg);\n  -moz-transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  -o-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n.pe-rotate-270 {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);\n  -webkit-transform: rotate(270deg);\n  -moz-transform: rotate(270deg);\n  -ms-transform: rotate(270deg);\n  -o-transform: rotate(270deg);\n  transform: rotate(270deg);\n}\n.pe-flip-horizontal {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1);\n  -webkit-transform: scale(-1, 1);\n  -moz-transform: scale(-1, 1);\n  -ms-transform: scale(-1, 1);\n  -o-transform: scale(-1, 1);\n  transform: scale(-1, 1);\n}\n.pe-flip-vertical {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1);\n  -webkit-transform: scale(1, -1);\n  -moz-transform: scale(1, -1);\n  -ms-transform: scale(1, -1);\n  -o-transform: scale(1, -1);\n  transform: scale(1, -1);\n}\n.pe-stack {\n  position: relative;\n  display: inline-block;\n  width: 2em;\n  height: 2em;\n  line-height: 2em;\n  vertical-align: middle;\n}\n.pe-stack-1x,\n.pe-stack-2x {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  text-align: center;\n}\n.pe-stack-1x {\n  line-height: inherit;\n}\n.pe-stack-2x {\n  font-size: 2em;\n}\n.pe-inverse {\n  color: #ffffff;\n}\n\n/* Custom classes / mods - PIXEDEN */\n.pe-va {\n  vertical-align: middle;\n}\n\n.pe-border {\n  border: solid 0.08em #eaeaea;\n}\n\n[class^=\"pe-7s-\"], [class*=\" pe-7s-\"] {\n  display: inline-block;\n}", ""]);

// exports


/***/ }),
/* 41 */
/*!***********************!*\
  !*** ./src/index.pug ***!
  \***********************/
/*! dynamic exports provided */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(/*! ../node_modules/pug-runtime/index.js */ 42);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003C!DOCTYPE html5\u003E\u003Chtml\u003E\u003Chead\u003E\u003Ctitle\u003EBSS Netzmonitor\u003C\u002Ftitle\u003E\u003Cmeta charset=\"UTF-8\"\u002F\u003E\u003Clink href=\"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto\" rel=\"stylesheet\"\u002F\u003E\u003Clink href=\"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Noto+Sans\" rel=\"stylesheet\"\u002F\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E\u003Cdiv id=\"sidebar\"\u003E\u003Cdiv id=\"link-title\"\u003E \u003Cimg" + (pug.attr("src", __webpack_require__(/*! ./assets/bss_small.png */ 15), true, false)) + "\u002F\u003E\u003Cspan\u003ENetzmonitor\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sidebar-link\" id=\"link-map\"\u003E\u003Ci class=\"pe-7s-map pe-fw\"\u003E\u003C\u002Fi\u003E\u003Cspan\u003EMap\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sidebar-link\" id=\"link-first\"\u003E\u003Ci class=\"pe-7s-graph1 pe-fw\"\u003E\u003C\u002Fi\u003E\u003Cspan\u003EData\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sidebar-link\" id=\"link-status\"\u003E\u003Ci class=\"pe-7s-global pe-fw\"\u003E\u003C\u002Fi\u003E\u003Cspan\u003EStatus\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv id=\"mainarea\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 42 */
/*!*******************************************!*\
  !*** ./node_modules/pug-runtime/index.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';') 
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(/*! fs */ 43).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 43 */
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 44 */
/*!************************!*\
  !*** ./src/index.sass ***!
  \************************/
/*! dynamic exports provided */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/sass-loader/lib/loader.js!./index.sass */ 45);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ 8)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./index.sass", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./index.sass");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 45 */
/*!*******************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/index.sass ***!
  \*******************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ 7)(false);
// imports


// module
exports.push([module.i, "* {\n  box-sizing: border-box;\n  font-family: 'Noto Sans','Roboto', sans;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\nhtml, body {\n  margin: 0;\n  padding: 0;\n  height: 100%;\n  overflow: hidden; }\n\nbody {\n  display: flex;\n  flex-direction: row; }\n  body #sidebar {\n    height: 100%;\n    background: linear-gradient(#086bc2, #2c9dd1);\n    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.4);\n    z-index: 444;\n    color: white; }\n    body #sidebar #link-title {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      padding: 12px;\n      margin-bottom: 10px; }\n      body #sidebar #link-title:hover {\n        cursor: pointer;\n        background-color: rgba(190, 205, 228, 0.1); }\n      body #sidebar #link-title img {\n        margin-right: 8px; }\n      body #sidebar #link-title span {\n        font-weight: 700;\n        margin-right: 5px; }\n    body #sidebar .sidebar-link {\n      display: flex;\n      align-items: center;\n      justify-content: flex-start;\n      padding: 15px;\n      padding-left: 25px;\n      margin-top: 10px;\n      font-size: 18px; }\n      body #sidebar .sidebar-link:hover {\n        cursor: pointer;\n        background-color: rgba(190, 205, 228, 0.3); }\n      body #sidebar .sidebar-link i {\n        font-size: 24px;\n        padding: 5px;\n        margin-right: 10px; }\n    body #sidebar .sidebar-link.selected {\n      background-color: rgba(190, 205, 228, 0.3); }\n  body #mainarea {\n    flex-grow: 1;\n    overflow-y: auto;\n    overflow-x: hidden; }\n", ""]);

// exports


/***/ })
/******/ ]);