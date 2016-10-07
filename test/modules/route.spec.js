(function () {
	'use strict';

	class View {
		constructor() {

		}

		init() {

		}

		resume() {

		}

		pause() {

		}

		setRouter(router) {
			this.router = router;
		}
	}

	describe('View.fn.match', function () {
		beforeEach(function () {
			this.route = new Route('/path/:key', View);
		});

		it('возвращает true, если переданный путь удовлетворяет шаблону, заданому при создании роута', function () {
			expect(this.route.match('/path/123')).toBe(true);
			expect(this.route.match('/path/foo')).toBe(true);
			expect(this.route.match('/path/foobar/')).toBe(true);
		});


		it('возвращает false, если переданный путь не удовлетворяет шаблону, заданому при создании роута', function () {
			expect(this.route.match('/path')).toBe(false);
			expect(this.route.match('/path2/123')).toBe(false);
			expect(this.route.match('/path/123/another')).toBe(false);
			expect(this.route.match('/pathpathpath/123')).toBe(false);

		});
	})

	describe('View.fn.navigate', function () {
		beforeEach(function () {
			this.route = new Route('/path/:key', View);
			spyOn(View.prototype, 'init');
			spyOn(View.prototype, 'resume');
		});

		it('при первом переходе на роут создаётся инстанс view', function () {
			this.route.navigate('/path/123');
			expect(this.route._view).toBeDefined();
			expect(this.route._view instanceof View).toBe(true);
		});

		it('при первом переходе на роут у созданной view вызывается метод init()', function () {
			this.route.navigate('/path/123');
			expect(View.prototype.init).toHaveBeenCalled();
		});

		it('при переходе на роут у созданной view вызывается метод resume() c первым артументом, содержащим параметры пути', function () {
			this.route.navigate('/path/123');
			expect(View.prototype.resume).toHaveBeenCalledWith({key: '123'});
		});

		it('при переходе на роут у созданной view вызывается метод resume() c первым артументом, содержащим данные из state', function () {
			let state = {foo: 'bar'};
			this.route.navigate('/path/123', state);
			expect(View.prototype.resume).toHaveBeenCalledWith({foo: 'bar', key: '123'});
		});

	})

})();
