(function () {
	'use strict';

	let Route = window.Route;


	/** Класс роутера */
	class Router {
		/**
		 * Создаёт новый роутер или возвращает уже созданный инстанс
		 */
		constructor() {
			if (Router.__instance) {
				return Router.__instance;
			}

			this.routes = [];
			this.activeRoute = null;

			this.history = window.history;

			Router.__instance = this;
		}

		/**
		 * Добавляет новый Route в роутер
		 * @param {string} pathname - Шаблон пути
		 * @param {View} view - Класс конкретной View
		 * @param {Object} [options={}] - Дополнительные параметры, которые будут переданы во view при её создании и инициализации
		 * @returns {Router}
		 */
		addRoute(pathname, view, options = {}) {
			let route = new Route(pathname, view, options);
			route.setRouter(this);
			this.routes.push(route);
			return this;
		}

		/**
		 * Запускает роутер и переходит по текущему пути в приложении
		 * @param {Object} [state={}] - Объект state, который передаётся в первый вызов onroute
		 */
		start(state = {}) {
			window.onpopstate = function (event) {
				let state = event.state;
				let pathname = window.location.pathname;
				this.onroute(pathname, state);
			}.bind(this);

			const pathname = window.location.pathname;
			this.onroute(pathname, state);
		}

		/**
		 * Функция, вызываемая при переходе на новый роут в приложении
		 * @param {string} pathname - Путь, по которому происходит переход
		 * @param {Object} [state={}] - Объект state, который передаётся в вызов метода navigate
		 */
		onroute(pathname, state = {}) {
			let route = this.routes.find(route => route.match(pathname));
			if (!route) {
				return;
			}

			if (this.activeRoute) {
				this.activeRoute.leave();
			}

			this.activeRoute = route;
			this.activeRoute.navigate(pathname, state);
		}

		/**
		 * Программный переход на новый путь
		 * @param {string} pathname - Путь
		 * @param {Object} [state={}] - Объект state, который передаётся в вызов history.pushState
		 */
		go(pathname, state = {}) {
			if (window.location.pathname === pathname) {
				return;
			}
			this.history.pushState(state, '', pathname);
			this.onroute(pathname, state);
		}

		/**
		 * Позволяет установить свою собственную реализацию History API
		 * @param {Object} history - должен предоставлять реализацию методов back(), forward(), pushState()
		 */
		setHistory(history) {
			this.history = history;
		}

		/**
		 * Возврат на один шаг назад в истории браузера
		 */
		back() {
			this.history.back();
		}

		/**
		 * Переход на один шаг вперёд в истории браузера
		 */
		forward() {
			this.history.forward();
		}
	}

	// export
	window.Router = Router;

})();
