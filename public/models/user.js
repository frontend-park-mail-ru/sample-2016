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
				console.log('wwwwwww');
				window.fetch(`${window.__HOST}/api/users`, {
					method: 'POST',
					mode: 'cors',
					body: JSON.stringify({
						username: this.username,
						email: this.email
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				}).then((res)=> {
					console.log('statusCode', res.statusCode);
					console.log('status', res.status);
					resolve();
				});
			}.bind(this));
		}


		fetchAll() {
			return new Promise(function (resolve, reject) {
				window.fetch(`${host}/api/users`, {
					method: 'GET',
					mode: 'cors'
				}).then((res)=> {
					console.log('statusCode', res.statusCode);
					console.log('status', res.status);
					resolve();
				});
			});
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
