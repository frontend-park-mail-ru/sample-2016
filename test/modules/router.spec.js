(function () {
	'use strict';

	let view;

	class TestView {
		constructor() {
			view = this;
		}

		init() {
		}

		pause() {
		}

		resume() {
		}

		setRouter() {
		}
	}

	beforeEach(function () {
		this.router = new Router();
	});

	describe('Класс Router', function () {
		it('instance of Router is singletone', function () {
			expect(new Router() === new Router()).toBe(true);
		});
	});


	describe('Router.fn.start', function () {

		it('Не происходит инстанцирования View до start', function () {
			this.router.addRoute('/hello', TestView);
			expect(view).toBeUndefined();
		});

		it('Переходит на текущий роут', function () {
			history.pushState({}, '', '/hello');

			this.router.addRoute('/hello', TestView);
			spyOn(TestView.prototype, 'resume');
			this.router.start();

			expect(TestView.prototype.resume).toHaveBeenCalled();
		});
	})

})();
