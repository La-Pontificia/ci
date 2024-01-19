"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/ms@2.1.2";
exports.ids = ["vendor-chunks/ms@2.1.2"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("/**\n * Helpers.\n */ \nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar w = d * 7;\nvar y = d * 365.25;\n/**\n * Parse or format the given `val`.\n *\n * Options:\n *\n *  - `long` verbose formatting [false]\n *\n * @param {String|Number} val\n * @param {Object} [options]\n * @throws {Error} throw an error if val is not a non-empty string or a number\n * @return {String|Number}\n * @api public\n */ module.exports = function(val, options) {\n    options = options || {};\n    var type = typeof val;\n    if (type === \"string\" && val.length > 0) {\n        return parse(val);\n    } else if (type === \"number\" && isFinite(val)) {\n        return options.long ? fmtLong(val) : fmtShort(val);\n    }\n    throw new Error(\"val is not a non-empty string or a valid number. val=\" + JSON.stringify(val));\n};\n/**\n * Parse the given `str` and return milliseconds.\n *\n * @param {String} str\n * @return {Number}\n * @api private\n */ function parse(str) {\n    str = String(str);\n    if (str.length > 100) {\n        return;\n    }\n    var match = /^(-?(?:\\d+)?\\.?\\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);\n    if (!match) {\n        return;\n    }\n    var n = parseFloat(match[1]);\n    var type = (match[2] || \"ms\").toLowerCase();\n    switch(type){\n        case \"years\":\n        case \"year\":\n        case \"yrs\":\n        case \"yr\":\n        case \"y\":\n            return n * y;\n        case \"weeks\":\n        case \"week\":\n        case \"w\":\n            return n * w;\n        case \"days\":\n        case \"day\":\n        case \"d\":\n            return n * d;\n        case \"hours\":\n        case \"hour\":\n        case \"hrs\":\n        case \"hr\":\n        case \"h\":\n            return n * h;\n        case \"minutes\":\n        case \"minute\":\n        case \"mins\":\n        case \"min\":\n        case \"m\":\n            return n * m;\n        case \"seconds\":\n        case \"second\":\n        case \"secs\":\n        case \"sec\":\n        case \"s\":\n            return n * s;\n        case \"milliseconds\":\n        case \"millisecond\":\n        case \"msecs\":\n        case \"msec\":\n        case \"ms\":\n            return n;\n        default:\n            return undefined;\n    }\n}\n/**\n * Short format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */ function fmtShort(ms) {\n    var msAbs = Math.abs(ms);\n    if (msAbs >= d) {\n        return Math.round(ms / d) + \"d\";\n    }\n    if (msAbs >= h) {\n        return Math.round(ms / h) + \"h\";\n    }\n    if (msAbs >= m) {\n        return Math.round(ms / m) + \"m\";\n    }\n    if (msAbs >= s) {\n        return Math.round(ms / s) + \"s\";\n    }\n    return ms + \"ms\";\n}\n/**\n * Long format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */ function fmtLong(ms) {\n    var msAbs = Math.abs(ms);\n    if (msAbs >= d) {\n        return plural(ms, msAbs, d, \"day\");\n    }\n    if (msAbs >= h) {\n        return plural(ms, msAbs, h, \"hour\");\n    }\n    if (msAbs >= m) {\n        return plural(ms, msAbs, m, \"minute\");\n    }\n    if (msAbs >= s) {\n        return plural(ms, msAbs, s, \"second\");\n    }\n    return ms + \" ms\";\n}\n/**\n * Pluralization helper.\n */ function plural(ms, msAbs, n, name) {\n    var isPlural = msAbs >= n * 1.5;\n    return Math.round(ms / n) + \" \" + name + (isPlural ? \"s\" : \"\");\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vbXNAMi4xLjIvbm9kZV9tb2R1bGVzL21zL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBOztDQUVDO0FBRUQsSUFBSUEsSUFBSTtBQUNSLElBQUlDLElBQUlELElBQUk7QUFDWixJQUFJRSxJQUFJRCxJQUFJO0FBQ1osSUFBSUUsSUFBSUQsSUFBSTtBQUNaLElBQUlFLElBQUlELElBQUk7QUFDWixJQUFJRSxJQUFJRixJQUFJO0FBRVo7Ozs7Ozs7Ozs7OztDQVlDLEdBRURHLE9BQU9DLE9BQU8sR0FBRyxTQUFTQyxHQUFHLEVBQUVDLE9BQU87SUFDcENBLFVBQVVBLFdBQVcsQ0FBQztJQUN0QixJQUFJQyxPQUFPLE9BQU9GO0lBQ2xCLElBQUlFLFNBQVMsWUFBWUYsSUFBSUcsTUFBTSxHQUFHLEdBQUc7UUFDdkMsT0FBT0MsTUFBTUo7SUFDZixPQUFPLElBQUlFLFNBQVMsWUFBWUcsU0FBU0wsTUFBTTtRQUM3QyxPQUFPQyxRQUFRSyxJQUFJLEdBQUdDLFFBQVFQLE9BQU9RLFNBQVNSO0lBQ2hEO0lBQ0EsTUFBTSxJQUFJUyxNQUNSLDBEQUNFQyxLQUFLQyxTQUFTLENBQUNYO0FBRXJCO0FBRUE7Ozs7OztDQU1DLEdBRUQsU0FBU0ksTUFBTVEsR0FBRztJQUNoQkEsTUFBTUMsT0FBT0Q7SUFDYixJQUFJQSxJQUFJVCxNQUFNLEdBQUcsS0FBSztRQUNwQjtJQUNGO0lBQ0EsSUFBSVcsUUFBUSxtSUFBbUlDLElBQUksQ0FDakpIO0lBRUYsSUFBSSxDQUFDRSxPQUFPO1FBQ1Y7SUFDRjtJQUNBLElBQUlFLElBQUlDLFdBQVdILEtBQUssQ0FBQyxFQUFFO0lBQzNCLElBQUlaLE9BQU8sQ0FBQ1ksS0FBSyxDQUFDLEVBQUUsSUFBSSxJQUFHLEVBQUdJLFdBQVc7SUFDekMsT0FBUWhCO1FBQ04sS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7WUFDSCxPQUFPYyxJQUFJbkI7UUFDYixLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7WUFDSCxPQUFPbUIsSUFBSXBCO1FBQ2IsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1lBQ0gsT0FBT29CLElBQUlyQjtRQUNiLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1lBQ0gsT0FBT3FCLElBQUl0QjtRQUNiLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1lBQ0gsT0FBT3NCLElBQUl2QjtRQUNiLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1lBQ0gsT0FBT3VCLElBQUl4QjtRQUNiLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1lBQ0gsT0FBT3dCO1FBQ1Q7WUFDRSxPQUFPRztJQUNYO0FBQ0Y7QUFFQTs7Ozs7O0NBTUMsR0FFRCxTQUFTWCxTQUFTWSxFQUFFO0lBQ2xCLElBQUlDLFFBQVFDLEtBQUtDLEdBQUcsQ0FBQ0g7SUFDckIsSUFBSUMsU0FBUzFCLEdBQUc7UUFDZCxPQUFPMkIsS0FBS0UsS0FBSyxDQUFDSixLQUFLekIsS0FBSztJQUM5QjtJQUNBLElBQUkwQixTQUFTM0IsR0FBRztRQUNkLE9BQU80QixLQUFLRSxLQUFLLENBQUNKLEtBQUsxQixLQUFLO0lBQzlCO0lBQ0EsSUFBSTJCLFNBQVM1QixHQUFHO1FBQ2QsT0FBTzZCLEtBQUtFLEtBQUssQ0FBQ0osS0FBSzNCLEtBQUs7SUFDOUI7SUFDQSxJQUFJNEIsU0FBUzdCLEdBQUc7UUFDZCxPQUFPOEIsS0FBS0UsS0FBSyxDQUFDSixLQUFLNUIsS0FBSztJQUM5QjtJQUNBLE9BQU80QixLQUFLO0FBQ2Q7QUFFQTs7Ozs7O0NBTUMsR0FFRCxTQUFTYixRQUFRYSxFQUFFO0lBQ2pCLElBQUlDLFFBQVFDLEtBQUtDLEdBQUcsQ0FBQ0g7SUFDckIsSUFBSUMsU0FBUzFCLEdBQUc7UUFDZCxPQUFPOEIsT0FBT0wsSUFBSUMsT0FBTzFCLEdBQUc7SUFDOUI7SUFDQSxJQUFJMEIsU0FBUzNCLEdBQUc7UUFDZCxPQUFPK0IsT0FBT0wsSUFBSUMsT0FBTzNCLEdBQUc7SUFDOUI7SUFDQSxJQUFJMkIsU0FBUzVCLEdBQUc7UUFDZCxPQUFPZ0MsT0FBT0wsSUFBSUMsT0FBTzVCLEdBQUc7SUFDOUI7SUFDQSxJQUFJNEIsU0FBUzdCLEdBQUc7UUFDZCxPQUFPaUMsT0FBT0wsSUFBSUMsT0FBTzdCLEdBQUc7SUFDOUI7SUFDQSxPQUFPNEIsS0FBSztBQUNkO0FBRUE7O0NBRUMsR0FFRCxTQUFTSyxPQUFPTCxFQUFFLEVBQUVDLEtBQUssRUFBRUwsQ0FBQyxFQUFFVSxJQUFJO0lBQ2hDLElBQUlDLFdBQVdOLFNBQVNMLElBQUk7SUFDNUIsT0FBT00sS0FBS0UsS0FBSyxDQUFDSixLQUFLSixLQUFLLE1BQU1VLE9BQVFDLENBQUFBLFdBQVcsTUFBTSxFQUFDO0FBQzlEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2kvLi9ub2RlX21vZHVsZXMvLnBucG0vbXNAMi4xLjIvbm9kZV9tb2R1bGVzL21zL2luZGV4LmpzPzQyODkiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBIZWxwZXJzLlxuICovXG5cbnZhciBzID0gMTAwMDtcbnZhciBtID0gcyAqIDYwO1xudmFyIGggPSBtICogNjA7XG52YXIgZCA9IGggKiAyNDtcbnZhciB3ID0gZCAqIDc7XG52YXIgeSA9IGQgKiAzNjUuMjU7XG5cbi8qKlxuICogUGFyc2Ugb3IgZm9ybWF0IHRoZSBnaXZlbiBgdmFsYC5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICAtIGBsb25nYCB2ZXJib3NlIGZvcm1hdHRpbmcgW2ZhbHNlXVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gdmFsXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAdGhyb3dzIHtFcnJvcn0gdGhyb3cgYW4gZXJyb3IgaWYgdmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSBudW1iZXJcbiAqIEByZXR1cm4ge1N0cmluZ3xOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG4gIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBwYXJzZSh2YWwpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHZhbCkpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb25nID8gZm10TG9uZyh2YWwpIDogZm10U2hvcnQodmFsKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3ZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgdmFsaWQgbnVtYmVyLiB2YWw9JyArXG4gICAgICBKU09OLnN0cmluZ2lmeSh2YWwpXG4gICk7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChzdHIubGVuZ3RoID4gMTAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBtYXRjaCA9IC9eKC0/KD86XFxkKyk/XFwuP1xcZCspICoobWlsbGlzZWNvbmRzP3xtc2Vjcz98bXN8c2Vjb25kcz98c2Vjcz98c3xtaW51dGVzP3xtaW5zP3xtfGhvdXJzP3xocnM/fGh8ZGF5cz98ZHx3ZWVrcz98d3x5ZWFycz98eXJzP3x5KT8kL2kuZXhlYyhcbiAgICBzdHJcbiAgKTtcbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbiA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuICB2YXIgdHlwZSA9IChtYXRjaFsyXSB8fCAnbXMnKS50b0xvd2VyQ2FzZSgpO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgY2FzZSAneXJzJzpcbiAgICBjYXNlICd5cic6XG4gICAgY2FzZSAneSc6XG4gICAgICByZXR1cm4gbiAqIHk7XG4gICAgY2FzZSAnd2Vla3MnOlxuICAgIGNhc2UgJ3dlZWsnOlxuICAgIGNhc2UgJ3cnOlxuICAgICAgcmV0dXJuIG4gKiB3O1xuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZCc6XG4gICAgICByZXR1cm4gbiAqIGQ7XG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hycyc6XG4gICAgY2FzZSAnaHInOlxuICAgIGNhc2UgJ2gnOlxuICAgICAgcmV0dXJuIG4gKiBoO1xuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgY2FzZSAnbWlucyc6XG4gICAgY2FzZSAnbWluJzpcbiAgICBjYXNlICdtJzpcbiAgICAgIHJldHVybiBuICogbTtcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICBjYXNlICdzZWNvbmQnOlxuICAgIGNhc2UgJ3NlY3MnOlxuICAgIGNhc2UgJ3NlYyc6XG4gICAgY2FzZSAncyc6XG4gICAgICByZXR1cm4gbiAqIHM7XG4gICAgY2FzZSAnbWlsbGlzZWNvbmRzJzpcbiAgICBjYXNlICdtaWxsaXNlY29uZCc6XG4gICAgY2FzZSAnbXNlY3MnOlxuICAgIGNhc2UgJ21zZWMnOlxuICAgIGNhc2UgJ21zJzpcbiAgICAgIHJldHVybiBuO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8qKlxuICogU2hvcnQgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10U2hvcnQobXMpIHtcbiAgdmFyIG1zQWJzID0gTWF0aC5hYnMobXMpO1xuICBpZiAobXNBYnMgPj0gZCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gZCkgKyAnZCc7XG4gIH1cbiAgaWYgKG1zQWJzID49IGgpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGgpICsgJ2gnO1xuICB9XG4gIGlmIChtc0FicyA+PSBtKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBtKSArICdtJztcbiAgfVxuICBpZiAobXNBYnMgPj0gcykge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gcykgKyAncyc7XG4gIH1cbiAgcmV0dXJuIG1zICsgJ21zJztcbn1cblxuLyoqXG4gKiBMb25nIGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdExvbmcobXMpIHtcbiAgdmFyIG1zQWJzID0gTWF0aC5hYnMobXMpO1xuICBpZiAobXNBYnMgPj0gZCkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBkLCAnZGF5Jyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IGgpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgaCwgJ2hvdXInKTtcbiAgfVxuICBpZiAobXNBYnMgPj0gbSkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBtLCAnbWludXRlJyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IHMpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgcywgJ3NlY29uZCcpO1xuICB9XG4gIHJldHVybiBtcyArICcgbXMnO1xufVxuXG4vKipcbiAqIFBsdXJhbGl6YXRpb24gaGVscGVyLlxuICovXG5cbmZ1bmN0aW9uIHBsdXJhbChtcywgbXNBYnMsIG4sIG5hbWUpIHtcbiAgdmFyIGlzUGx1cmFsID0gbXNBYnMgPj0gbiAqIDEuNTtcbiAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBuKSArICcgJyArIG5hbWUgKyAoaXNQbHVyYWwgPyAncycgOiAnJyk7XG59XG4iXSwibmFtZXMiOlsicyIsIm0iLCJoIiwiZCIsInciLCJ5IiwibW9kdWxlIiwiZXhwb3J0cyIsInZhbCIsIm9wdGlvbnMiLCJ0eXBlIiwibGVuZ3RoIiwicGFyc2UiLCJpc0Zpbml0ZSIsImxvbmciLCJmbXRMb25nIiwiZm10U2hvcnQiLCJFcnJvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdHIiLCJTdHJpbmciLCJtYXRjaCIsImV4ZWMiLCJuIiwicGFyc2VGbG9hdCIsInRvTG93ZXJDYXNlIiwidW5kZWZpbmVkIiwibXMiLCJtc0FicyIsIk1hdGgiLCJhYnMiLCJyb3VuZCIsInBsdXJhbCIsIm5hbWUiLCJpc1BsdXJhbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("/**\n * Helpers.\n */ \nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar w = d * 7;\nvar y = d * 365.25;\n/**\n * Parse or format the given `val`.\n *\n * Options:\n *\n *  - `long` verbose formatting [false]\n *\n * @param {String|Number} val\n * @param {Object} [options]\n * @throws {Error} throw an error if val is not a non-empty string or a number\n * @return {String|Number}\n * @api public\n */ module.exports = function(val, options) {\n    options = options || {};\n    var type = typeof val;\n    if (type === \"string\" && val.length > 0) {\n        return parse(val);\n    } else if (type === \"number\" && isFinite(val)) {\n        return options.long ? fmtLong(val) : fmtShort(val);\n    }\n    throw new Error(\"val is not a non-empty string or a valid number. val=\" + JSON.stringify(val));\n};\n/**\n * Parse the given `str` and return milliseconds.\n *\n * @param {String} str\n * @return {Number}\n * @api private\n */ function parse(str) {\n    str = String(str);\n    if (str.length > 100) {\n        return;\n    }\n    var match = /^(-?(?:\\d+)?\\.?\\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);\n    if (!match) {\n        return;\n    }\n    var n = parseFloat(match[1]);\n    var type = (match[2] || \"ms\").toLowerCase();\n    switch(type){\n        case \"years\":\n        case \"year\":\n        case \"yrs\":\n        case \"yr\":\n        case \"y\":\n            return n * y;\n        case \"weeks\":\n        case \"week\":\n        case \"w\":\n            return n * w;\n        case \"days\":\n        case \"day\":\n        case \"d\":\n            return n * d;\n        case \"hours\":\n        case \"hour\":\n        case \"hrs\":\n        case \"hr\":\n        case \"h\":\n            return n * h;\n        case \"minutes\":\n        case \"minute\":\n        case \"mins\":\n        case \"min\":\n        case \"m\":\n            return n * m;\n        case \"seconds\":\n        case \"second\":\n        case \"secs\":\n        case \"sec\":\n        case \"s\":\n            return n * s;\n        case \"milliseconds\":\n        case \"millisecond\":\n        case \"msecs\":\n        case \"msec\":\n        case \"ms\":\n            return n;\n        default:\n            return undefined;\n    }\n}\n/**\n * Short format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */ function fmtShort(ms) {\n    var msAbs = Math.abs(ms);\n    if (msAbs >= d) {\n        return Math.round(ms / d) + \"d\";\n    }\n    if (msAbs >= h) {\n        return Math.round(ms / h) + \"h\";\n    }\n    if (msAbs >= m) {\n        return Math.round(ms / m) + \"m\";\n    }\n    if (msAbs >= s) {\n        return Math.round(ms / s) + \"s\";\n    }\n    return ms + \"ms\";\n}\n/**\n * Long format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */ function fmtLong(ms) {\n    var msAbs = Math.abs(ms);\n    if (msAbs >= d) {\n        return plural(ms, msAbs, d, \"day\");\n    }\n    if (msAbs >= h) {\n        return plural(ms, msAbs, h, \"hour\");\n    }\n    if (msAbs >= m) {\n        return plural(ms, msAbs, m, \"minute\");\n    }\n    if (msAbs >= s) {\n        return plural(ms, msAbs, s, \"second\");\n    }\n    return ms + \" ms\";\n}\n/**\n * Pluralization helper.\n */ function plural(ms, msAbs, n, name) {\n    var isPlural = msAbs >= n * 1.5;\n    return Math.round(ms / n) + \" \" + name + (isPlural ? \"s\" : \"\");\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vbXNAMi4xLjIvbm9kZV9tb2R1bGVzL21zL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBOztDQUVDO0FBRUQsSUFBSUEsSUFBSTtBQUNSLElBQUlDLElBQUlELElBQUk7QUFDWixJQUFJRSxJQUFJRCxJQUFJO0FBQ1osSUFBSUUsSUFBSUQsSUFBSTtBQUNaLElBQUlFLElBQUlELElBQUk7QUFDWixJQUFJRSxJQUFJRixJQUFJO0FBRVo7Ozs7Ozs7Ozs7OztDQVlDLEdBRURHLE9BQU9DLE9BQU8sR0FBRyxTQUFTQyxHQUFHLEVBQUVDLE9BQU87SUFDcENBLFVBQVVBLFdBQVcsQ0FBQztJQUN0QixJQUFJQyxPQUFPLE9BQU9GO0lBQ2xCLElBQUlFLFNBQVMsWUFBWUYsSUFBSUcsTUFBTSxHQUFHLEdBQUc7UUFDdkMsT0FBT0MsTUFBTUo7SUFDZixPQUFPLElBQUlFLFNBQVMsWUFBWUcsU0FBU0wsTUFBTTtRQUM3QyxPQUFPQyxRQUFRSyxJQUFJLEdBQUdDLFFBQVFQLE9BQU9RLFNBQVNSO0lBQ2hEO0lBQ0EsTUFBTSxJQUFJUyxNQUNSLDBEQUNFQyxLQUFLQyxTQUFTLENBQUNYO0FBRXJCO0FBRUE7Ozs7OztDQU1DLEdBRUQsU0FBU0ksTUFBTVEsR0FBRztJQUNoQkEsTUFBTUMsT0FBT0Q7SUFDYixJQUFJQSxJQUFJVCxNQUFNLEdBQUcsS0FBSztRQUNwQjtJQUNGO0lBQ0EsSUFBSVcsUUFBUSxtSUFBbUlDLElBQUksQ0FDakpIO0lBRUYsSUFBSSxDQUFDRSxPQUFPO1FBQ1Y7SUFDRjtJQUNBLElBQUlFLElBQUlDLFdBQVdILEtBQUssQ0FBQyxFQUFFO0lBQzNCLElBQUlaLE9BQU8sQ0FBQ1ksS0FBSyxDQUFDLEVBQUUsSUFBSSxJQUFHLEVBQUdJLFdBQVc7SUFDekMsT0FBUWhCO1FBQ04sS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7WUFDSCxPQUFPYyxJQUFJbkI7UUFDYixLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7WUFDSCxPQUFPbUIsSUFBSXBCO1FBQ2IsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1lBQ0gsT0FBT29CLElBQUlyQjtRQUNiLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1lBQ0gsT0FBT3FCLElBQUl0QjtRQUNiLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1lBQ0gsT0FBT3NCLElBQUl2QjtRQUNiLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1lBQ0gsT0FBT3VCLElBQUl4QjtRQUNiLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1lBQ0gsT0FBT3dCO1FBQ1Q7WUFDRSxPQUFPRztJQUNYO0FBQ0Y7QUFFQTs7Ozs7O0NBTUMsR0FFRCxTQUFTWCxTQUFTWSxFQUFFO0lBQ2xCLElBQUlDLFFBQVFDLEtBQUtDLEdBQUcsQ0FBQ0g7SUFDckIsSUFBSUMsU0FBUzFCLEdBQUc7UUFDZCxPQUFPMkIsS0FBS0UsS0FBSyxDQUFDSixLQUFLekIsS0FBSztJQUM5QjtJQUNBLElBQUkwQixTQUFTM0IsR0FBRztRQUNkLE9BQU80QixLQUFLRSxLQUFLLENBQUNKLEtBQUsxQixLQUFLO0lBQzlCO0lBQ0EsSUFBSTJCLFNBQVM1QixHQUFHO1FBQ2QsT0FBTzZCLEtBQUtFLEtBQUssQ0FBQ0osS0FBSzNCLEtBQUs7SUFDOUI7SUFDQSxJQUFJNEIsU0FBUzdCLEdBQUc7UUFDZCxPQUFPOEIsS0FBS0UsS0FBSyxDQUFDSixLQUFLNUIsS0FBSztJQUM5QjtJQUNBLE9BQU80QixLQUFLO0FBQ2Q7QUFFQTs7Ozs7O0NBTUMsR0FFRCxTQUFTYixRQUFRYSxFQUFFO0lBQ2pCLElBQUlDLFFBQVFDLEtBQUtDLEdBQUcsQ0FBQ0g7SUFDckIsSUFBSUMsU0FBUzFCLEdBQUc7UUFDZCxPQUFPOEIsT0FBT0wsSUFBSUMsT0FBTzFCLEdBQUc7SUFDOUI7SUFDQSxJQUFJMEIsU0FBUzNCLEdBQUc7UUFDZCxPQUFPK0IsT0FBT0wsSUFBSUMsT0FBTzNCLEdBQUc7SUFDOUI7SUFDQSxJQUFJMkIsU0FBUzVCLEdBQUc7UUFDZCxPQUFPZ0MsT0FBT0wsSUFBSUMsT0FBTzVCLEdBQUc7SUFDOUI7SUFDQSxJQUFJNEIsU0FBUzdCLEdBQUc7UUFDZCxPQUFPaUMsT0FBT0wsSUFBSUMsT0FBTzdCLEdBQUc7SUFDOUI7SUFDQSxPQUFPNEIsS0FBSztBQUNkO0FBRUE7O0NBRUMsR0FFRCxTQUFTSyxPQUFPTCxFQUFFLEVBQUVDLEtBQUssRUFBRUwsQ0FBQyxFQUFFVSxJQUFJO0lBQ2hDLElBQUlDLFdBQVdOLFNBQVNMLElBQUk7SUFDNUIsT0FBT00sS0FBS0UsS0FBSyxDQUFDSixLQUFLSixLQUFLLE1BQU1VLE9BQVFDLENBQUFBLFdBQVcsTUFBTSxFQUFDO0FBQzlEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2kvLi9ub2RlX21vZHVsZXMvLnBucG0vbXNAMi4xLjIvbm9kZV9tb2R1bGVzL21zL2luZGV4LmpzPzQyODkiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBIZWxwZXJzLlxuICovXG5cbnZhciBzID0gMTAwMDtcbnZhciBtID0gcyAqIDYwO1xudmFyIGggPSBtICogNjA7XG52YXIgZCA9IGggKiAyNDtcbnZhciB3ID0gZCAqIDc7XG52YXIgeSA9IGQgKiAzNjUuMjU7XG5cbi8qKlxuICogUGFyc2Ugb3IgZm9ybWF0IHRoZSBnaXZlbiBgdmFsYC5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICAtIGBsb25nYCB2ZXJib3NlIGZvcm1hdHRpbmcgW2ZhbHNlXVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gdmFsXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAdGhyb3dzIHtFcnJvcn0gdGhyb3cgYW4gZXJyb3IgaWYgdmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSBudW1iZXJcbiAqIEByZXR1cm4ge1N0cmluZ3xOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG4gIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBwYXJzZSh2YWwpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHZhbCkpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb25nID8gZm10TG9uZyh2YWwpIDogZm10U2hvcnQodmFsKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3ZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgdmFsaWQgbnVtYmVyLiB2YWw9JyArXG4gICAgICBKU09OLnN0cmluZ2lmeSh2YWwpXG4gICk7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChzdHIubGVuZ3RoID4gMTAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBtYXRjaCA9IC9eKC0/KD86XFxkKyk/XFwuP1xcZCspICoobWlsbGlzZWNvbmRzP3xtc2Vjcz98bXN8c2Vjb25kcz98c2Vjcz98c3xtaW51dGVzP3xtaW5zP3xtfGhvdXJzP3xocnM/fGh8ZGF5cz98ZHx3ZWVrcz98d3x5ZWFycz98eXJzP3x5KT8kL2kuZXhlYyhcbiAgICBzdHJcbiAgKTtcbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbiA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuICB2YXIgdHlwZSA9IChtYXRjaFsyXSB8fCAnbXMnKS50b0xvd2VyQ2FzZSgpO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgY2FzZSAneXJzJzpcbiAgICBjYXNlICd5cic6XG4gICAgY2FzZSAneSc6XG4gICAgICByZXR1cm4gbiAqIHk7XG4gICAgY2FzZSAnd2Vla3MnOlxuICAgIGNhc2UgJ3dlZWsnOlxuICAgIGNhc2UgJ3cnOlxuICAgICAgcmV0dXJuIG4gKiB3O1xuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZCc6XG4gICAgICByZXR1cm4gbiAqIGQ7XG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hycyc6XG4gICAgY2FzZSAnaHInOlxuICAgIGNhc2UgJ2gnOlxuICAgICAgcmV0dXJuIG4gKiBoO1xuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgY2FzZSAnbWlucyc6XG4gICAgY2FzZSAnbWluJzpcbiAgICBjYXNlICdtJzpcbiAgICAgIHJldHVybiBuICogbTtcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICBjYXNlICdzZWNvbmQnOlxuICAgIGNhc2UgJ3NlY3MnOlxuICAgIGNhc2UgJ3NlYyc6XG4gICAgY2FzZSAncyc6XG4gICAgICByZXR1cm4gbiAqIHM7XG4gICAgY2FzZSAnbWlsbGlzZWNvbmRzJzpcbiAgICBjYXNlICdtaWxsaXNlY29uZCc6XG4gICAgY2FzZSAnbXNlY3MnOlxuICAgIGNhc2UgJ21zZWMnOlxuICAgIGNhc2UgJ21zJzpcbiAgICAgIHJldHVybiBuO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8qKlxuICogU2hvcnQgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10U2hvcnQobXMpIHtcbiAgdmFyIG1zQWJzID0gTWF0aC5hYnMobXMpO1xuICBpZiAobXNBYnMgPj0gZCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gZCkgKyAnZCc7XG4gIH1cbiAgaWYgKG1zQWJzID49IGgpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGgpICsgJ2gnO1xuICB9XG4gIGlmIChtc0FicyA+PSBtKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBtKSArICdtJztcbiAgfVxuICBpZiAobXNBYnMgPj0gcykge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gcykgKyAncyc7XG4gIH1cbiAgcmV0dXJuIG1zICsgJ21zJztcbn1cblxuLyoqXG4gKiBMb25nIGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdExvbmcobXMpIHtcbiAgdmFyIG1zQWJzID0gTWF0aC5hYnMobXMpO1xuICBpZiAobXNBYnMgPj0gZCkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBkLCAnZGF5Jyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IGgpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgaCwgJ2hvdXInKTtcbiAgfVxuICBpZiAobXNBYnMgPj0gbSkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBtLCAnbWludXRlJyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IHMpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgcywgJ3NlY29uZCcpO1xuICB9XG4gIHJldHVybiBtcyArICcgbXMnO1xufVxuXG4vKipcbiAqIFBsdXJhbGl6YXRpb24gaGVscGVyLlxuICovXG5cbmZ1bmN0aW9uIHBsdXJhbChtcywgbXNBYnMsIG4sIG5hbWUpIHtcbiAgdmFyIGlzUGx1cmFsID0gbXNBYnMgPj0gbiAqIDEuNTtcbiAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBuKSArICcgJyArIG5hbWUgKyAoaXNQbHVyYWwgPyAncycgOiAnJyk7XG59XG4iXSwibmFtZXMiOlsicyIsIm0iLCJoIiwiZCIsInciLCJ5IiwibW9kdWxlIiwiZXhwb3J0cyIsInZhbCIsIm9wdGlvbnMiLCJ0eXBlIiwibGVuZ3RoIiwicGFyc2UiLCJpc0Zpbml0ZSIsImxvbmciLCJmbXRMb25nIiwiZm10U2hvcnQiLCJFcnJvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdHIiLCJTdHJpbmciLCJtYXRjaCIsImV4ZWMiLCJuIiwicGFyc2VGbG9hdCIsInRvTG93ZXJDYXNlIiwidW5kZWZpbmVkIiwibXMiLCJtc0FicyIsIk1hdGgiLCJhYnMiLCJyb3VuZCIsInBsdXJhbCIsIm5hbWUiLCJpc1BsdXJhbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js\n");

/***/ })

};
;