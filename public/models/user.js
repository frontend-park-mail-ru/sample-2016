(function () {
	'use strict';


	/**
	 * Класс User
	 */
	class User {
		/**
		 * Создаёт нового пользователя
		 * @param {string} username - имя пользователя
		 * @param {string} email - email пользователя
		 */
		constructor(username, email) {
			this.username = username;
			this.email = email;
		}

		/**
		 * Регистрирует пользователя на сервере
		 * @returns {Promise}
		 */
		signup() {
			return new Promise(function (resolve, reject) {
				const xhr = new XMLHttpRequest();

				const json = JSON.stringify({
					username: this.username,
					email: this.email
				});

				xhr.open('POST', `${window.__HOST}/api/users`, true);
				xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

				xhr.onreadystatechange = function () {
					if (this.readyState !== 4) return;
					if (this.status !== 201) {
						return reject(this.statusText);
					}
					resolve(JSON.parse(json));
				};

				xhr.send(json);
			}.bind(this));
		}


		fetchAll() {
			return new Promise(function (resolve, reject) {
				const xhr = new XMLHttpRequest();

				xhr.open('GET', `${window.__HOST}/api/users`, true);
				xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

				xhr.onreadystatechange = function () {
					if (this.readyState !== 4) return;
					if (this.status !== 200) {
						return reject(this.statusText);
					}
					resolve(JSON.parse(this.responseText));
				};

				xhr.send();
			}.bind(this));
		}

		/**
		 * Возвращает характеристики пользователя в виде plain объекта
		 * @returns {{username: (string|*), email: (string|*)}} - данные о пользователе
		 */
		get json() {
			return {
				username: this.username,
				email: this.email
			};
		}
	}

	//export
	window.User = User;
})();
