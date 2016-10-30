'use strict';

const fest = require('fest');

function compile (template, options) {
	var context = options.context || '';
	var name = template.replace(context, '').replace('.xml', '');
	var exclude = options.exclude || [];

	name = exclude.reduce(function (res, item) {
		return res.replace(item, '');
	}, name);

	var compiled = fest.compile(template);

	return [
		'',
		'/** ',
		' * =============================================================',
		' * ' + name + ' template',
		' * =============================================================',
		' */',
		'',
		'module.exports = ' + compiled
	].join('\n');
}

function parseQuery (queryStr) {
	try {
		return JSON.parse(queryStr.replace('?', ''));
	} catch (ex) {
		return {};
	}
}

module.exports = function festLoader (source, inputSourceMap) {
	var file = this.request.split('!')[1];
	var options = parseQuery(this.query);

	this.cacheable();
	this.callback(null, compile(file, options), inputSourceMap);
};
