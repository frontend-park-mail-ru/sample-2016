(function () {
	'use strict';

	/**
	 * Модуль для опреления нажатых клавиш
	 */
	class KeyMaster {

		/**
		 * Конструктор класса KeyMaster
		 */
		constructor () {
			this.keys = {};

			this._onPress = this._keyHandler.bind(this, 'press');
			this._onUp = this._keyHandler.bind(this, 'up');
		}

		/**
		 * Начинаем слушать события клавиатуры
		 */
		init () {
			document.addEventListener('keydown', this._onPress);
			document.addEventListener('keyup', this._onUp);
		}

		/**
		 * Прекращаем слушать события клавиатуры
		 */
		destroy () {
			document.removeEventListener('keydown', this._onPress);
			document.removeEventListener('keyup', this._onUp);
		}

		/**
		 * Нажата ли клавиша?
		 * @param  {string}  key
		 * @return {boolean}
		 */
		is (key) {
			return this.keys[key];
		}

		/**
		 * Обработчик события
		 * @param  {string} type
		 * @param  {Event} event
		 */
		_keyHandler (type, event) {
			this.keys[event.key] = type === 'press';
		}


	}

	//export
	window.KeyMaster = KeyMaster;
})();
