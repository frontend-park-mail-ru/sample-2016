(function () {
	'use strict';

	const pathToRegex = function (path) {
		let keyNames = [];
		let parts = path
			.split('/')
			.filter(part => part)
			.map(part => {
				if (/^:/.exec(part)) {
					keyNames.push(part.slice(1));
					return new RegExp(`^\/([^/]+)`, `i`);
				}
				return new RegExp(`^\/${part}`, `i`);
			});

		// console.dir(keyNames);
		// console.dir(parts);

		return function (url) {

			let keys = [];
			let check = parts.every((regexp, step) => {
				// console.dir({
				// 	step,
				// 	url,
				// 	regexp
				// });
				let tmp = regexp.exec(url);
				if (!tmp) {
					return false;
				}
				if (tmp.length === 2) {
					keys.push(tmp[1]);
				}
				url = url.replace(regexp, '');
				return true;
			});

			if (check) {
				return keys.reduce((prev, curr, pos) => {
					prev[keyNames[pos]] = curr;
					return prev;
				}, {});
			}
			return null;
		};
	};


	// export
	window.pathToRegex = pathToRegex;

})();
