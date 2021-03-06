/*
 * params.js
 * Copyright (c) 2014 alloyed, ISC license.
 */

/* 
 * Reads query string of current URL, and puts the key-value pairs into a js
 * object.
 * Special cases:
 *	* empty values are assumed to be true.
 *	* keys with dashes get converted to underscores.
 */
function getJsonFromUrl() {
	var result = {}
	var query = location.search.substr(1);
	query.split("&").forEach(function(part) {
		var item = part.split("=");
		var key = item[0].replace('-', '_');
		var val = item[1];
		if (val === undefined) {
			val = true;
		}
		val = decodeURIComponent(val);
		if (val === "false") {
			val = false;
		}
		result[key] = val;
	});
	return result;
}

/* 
 * The inverse of getJsonFromUrl(). Returns a query string corresponding to
 * the js object obj. Underscores are converted back to dashes, and true values
 * are turned empty.
 */
function getUrlFromJson(obj) {
	var result = "";
	var sep = '?';
	for (var key in obj) {
		var val = obj[key];
		var pair = encodeURIComponent(key.replace('_', '-'));

		if (val !== true) {
			pair += "=" + encodeURIComponent(obj[key]);
		}
		result += sep + pair;
		sep = '&';
	}
	return obj;
}

function merge( /* & arguments */ ) {
	var result = {};
	for (var i = 0; i < arguments.length; i++) {
		var obj = arguments[i];
		for (var key in obj) {
			if (obj[key] !== undefined) {
				result[key] = obj[key];
			}
		}
	}
	return result;
}

getParams = (function() {
	var params = null;
	return function() {
		if (params !== null) {
			return params;
		}
		var stored = localStorage.getItem("settings");
		var params_stored = {};
		if (stored) {
			params_stored = JSON.parse(stored);
		}
		var params_url = getJsonFromUrl();

		params = merge(config, params_stored, params_url);
		console.log(params);

		if (params.store) {
			delete params.store;
			localStorage.setItem('settings', JSON.stringify(params));
		}
		return params;
	};
})();
