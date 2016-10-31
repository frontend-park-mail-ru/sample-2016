(function () {
	'use strict';


	describe('Класс View', function () {
		beforeEach(function () {
			this.view = new View({createElement: true});
		});

		it('Если при создании view задана опция createElement, то создастся элемент div', function () {
			expect(this.view._el).toBeDefined();
			expect(this.view._el.tagName.toLowerCase()).toBe('div');
		});

		describe('View.fn.resume', function () {
			it('по умолчанию устанавливает элементу атрибут hidden в false', function () {
				this.view.resume();
				expect(this.view._el.hidden).toBe(false);
			});
		});


		describe('View.fn.pause', function () {
			it('по умолчанию устанавливает элементу атрибут hidden в true', function () {
				this.view.pause();
				expect(this.view._el.hidden).toBe(true);
			});
		});

	})
})();
