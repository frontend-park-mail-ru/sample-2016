(function () {
	'use strict';

	//let pathToRegex = function () {};

	describe('pathToRegex', function () {
		it('pathToRegex возвращает функцию', function () {
			expect(typeof pathToRegex('/')).toBe('function');
		});

		describe('Простой шаблон пути: pathToRegex("/path")', function () {
			beforeEach(function () {
				this.func = pathToRegex('/path')
			});

			it('матчит "/path"', function () {
				expect(this.func('/path')).not.toBe(null);
			});

			it('матчит "/path/"', function () {
				expect(this.func('/path/')).not.toBe(null);
			});

			it('не матчит "/path1"', function () {
				expect(this.func('/path1')).toBe(null);
			});

			it('не матчит "/path/another"', function () {
				expect(this.func('/path/another')).toBe(null);
			});

			it('матчер возвращает пустой объект для "/path"', function () {
				expect(this.func('/path')).toEqual({});
			});
		});

		describe('Шаблон пути с переменной частью: pathToRegex("/user/:id")', function () {
			beforeEach(function () {
				this.func = pathToRegex('/user/:id')
			});

			it('матчит "/user/123"', function () {
				expect(this.func('/user/123')).not.toBe(null);
			});

			it('матчит "/user/123/"', function () {
				expect(this.func('/user/123/')).not.toBe(null);
			});

			it('не матчит "/user"', function () {
				expect(this.func('/user')).toBe(null);
			});

			it('не матчит "/user/"', function () {
				expect(this.func('/user/')).toBe(null);
			});

			it('не матчит "/user1/123"', function () {
				expect(this.func('/user1/123')).toBe(null);
			});

			it('не матчит "/user/123/age"', function () {
				expect(this.func('/user/123/age')).toBe(null);
			});

			it('матчер возвращает объект для "/user/123" со списком параметров', function () {
				expect(this.func('/user/123')).toEqual({id: '123'});
			});

			it('матчер возвращает объект для "/user/jhonsnow" со списком параметров', function () {
				expect(this.func('/user/jhonsnow')).toEqual({id: 'jhonsnow'});
			});

		});

		describe('Шаблон пути с несколькими переменными частями: pathToRegex("/user/:id/post/:key")', function () {
			beforeEach(function () {
				this.func = pathToRegex('/user/:id/post/:key')
			});

			it('матчер возвращает объект для "/user/123/post/321" со списком параметров', function () {
				expect(this.func('/user/123/post/321')).toEqual({id: '123', key: '321'});
			});

			it('матчер возвращает объект для "/user/foo/post/bar" со списком параметров', function () {
				expect(this.func('/user/foo/post/bar')).toEqual({id: 'foo', key: 'bar'});
			});

		});


	});


})();
