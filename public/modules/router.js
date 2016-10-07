(function () {
	'use strict';

	let routes = {};

	function route (path, view) {
		routes[path] = view;
	}

	function onRoute () {
		let path = document.location.pathname;

		if (routes[path]) {
			routes[path]();
		}

		console.log(path, routes[path] && routes[path].name);
	}

	function start () {
		window.onpopstate = function(event) {
			onRoute();
		};

		onRoute();
	}

	function go (path, title = '', state = {}) {
		history.pushState(state, title, path);

		onRoute();
	}

	// export
	window.router = {
		route,
		start,
		go
	};

})();
