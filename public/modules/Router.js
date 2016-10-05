(function () {
	'use strict';

	const pathToRegex = window.pathToRegex;
	const history = window.history;

	class Router {
		constructor() {
			if (Router.__instance) {
				return Router.__instance;
			}

			this._paths = [];
			this._viewStorage = new Map();
			this._currentView = null;
			this._id = 1;

			Router.__instance = this;
		}

		route(path, view, options = {}) {
			let p = {
				id: 'p' + this._id,
				path,
				regex: pathToRegex(path),
				View: view,
				options
			};

			this._id++;
			this._paths.push(p);

			return this;
		}

		start(state = {}) {
			console.dir(this._paths);

			window.onpopstate = function (event) {
				let state = event.state;
				let path = window.location.pathname;
				this.onroute(path, state);
			}.bind(this);

			const path = window.location.pathname;
			this.onroute(path, state);
		}

		onroute(path, state = {}) {
			console.info(`[ROUTER] go to ${path}`);

			let info = this._paths.find(p => {
				let keys = p.regex(path);
				if (keys) {
					return Object.assign({}, p, {keys});
				}
			});

			if (!info) {
				return;
			}

			if (!this._viewStorage.has(info.id)) {
				let view = new info.View(info.options);

				view.init(info.options);
				view.setRouter(this);

				this._viewStorage.set(info.id, view);
			}

			if (this._currentView) {
				this._currentView.pause();
			}

			this._currentView = this._viewStorage.get(info.id);
			this._currentView.resume(Object.assign(state, info.keys));
		}

		go(path, state = {}) {
			if (window.location.pathname === path) {
				return;
			}
			history.pushState(state, '', path);
			this.onroute(path, state);
		}

		static back() {
			history.back();
		}

		static forward() {
			history.forward();
		}
	}

	window.Router = Router;

})();
