(function () {
	'use strict';

	beforeEach(function () {
		delete Router.__instance;
		this.router = new Router();
	});


	describe('Класс Router', function () {
		it('instance of Router is singletone', function () {
			expect(new Router()).toEqual(this.router);
		});
	});

	describe('Router.fn.start', function () {
		beforeEach(function () {
			spyOn(Route.prototype, 'navigate');
		});

		it('Не происходит переходов на роуты до вызова метода', function () {
			this.router.addRoute('/path1', View);
			this.router.addRoute('/path2', View);
			this.router.addRoute('/path3', View);
			expect(Route.prototype.navigate).not.toHaveBeenCalled();

			// имитирует переход по клику по ссылке
			this.router.history.pushState({}, '', '/path1');
			expect(Route.prototype.navigate).not.toHaveBeenCalled();

			this.router.go('/path2');
			expect(Route.prototype.navigate).not.toHaveBeenCalled();

			this.router.go('/path3');
			expect(Route.prototype.navigate).not.toHaveBeenCalled();

		});

		it('После вызова метода переходы по роутам происходят', function () {
			this.router.addRoute('/path1', View);
			this.router.addRoute('/path2', View);
			this.router.start();
			this.router.go('/path1');
			expect(Route.prototype.navigate).toHaveBeenCalledWith('/path1', {});
			this.router.go('/path2');
			expect(Route.prototype.navigate).toHaveBeenCalledWith('/path2', {});

		});


		it('Переходит на текущий роут', function () {
			history.pushState({}, '', '/hello');
			this.router.addRoute('/hello', View);
			this.router.start();
			expect(Route.prototype.navigate).toHaveBeenCalledWith('/hello', {});
		});

	});

	describe('Router.fn.addRoute', function () {
		it('создаёт новый Route', function () {
			this.router.addRoute('/path1', View);
			this.router.addRoute('/path2', View);
			expect(this.router.routes[0] instanceof Route).toBe(true);
			expect(this.router.routes[1] instanceof Route).toBe(true);
			expect(this.router.routes.length).toBe(2);
		});


		it('прокидывает свой инстанс в новый роут', function () {
			this.router.addRoute('/path1', View);
			expect(this.router.routes[0].__router).toEqual(this.router);
		});
	});

	describe('Router.fn.go', function () {
		beforeEach(function () {
			this.router.start();
			spyOn(this.router, 'onroute');
		});

		it('меняет pathname страницы', function () {
			this.router.go('/path1');
			expect(window.location.pathname).toBe('/path1');
		});

		it('вызывает метод onroute c новым путём', function () {
			this.router.go('/path2');
			expect(this.router.onroute).toHaveBeenCalledWith('/path2', {});
		});

		it('вызывает метод onroute только если новый путь отличался от старого', function () {
			this.router.history.pushState({}, '', '/hello');
			this.router.go('/hello');
			expect(this.router.onroute).not.toHaveBeenCalled();
		});
	});

})();
