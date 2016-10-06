'use strict';

(function () {

})();

beforeEach(function () {
	this.router = new Router();
})

describe('Класс Router', function() {
	it ('instance of Router is singletone', function () {
		expect(this.router === new Router).to.be.true;
	});
});
