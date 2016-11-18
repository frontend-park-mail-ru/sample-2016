'use strict';

/**
 * Класс Сообщений
 */
export default class Message {
	/**
	 * Создаёт соединение с сервером
	 * @param cb - функция обратного вызова, которая вызывается при обновлении чата
	 */
	constructor(cb) {
		const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
		const address = `${protocol}//${location.host}/ws/messages`;
		this.addNewMessageListener(cb);
		this.ws = new WebSocket(address);

		this.ws.onopen = function () {

			this.ws.onmessage = function ({data}) {
				const messages = JSON.parse(data);
				if (this.callback) {
					this.callback(messages);
				}
			}.bind(this);


			// предотвращает разрыв соединения с сервером
			setInterval(() => {
				console.info('refresh ws');
				this.ws.send('');
			}, 10000);


		}.bind(this);
	}

	/**
	 * Отправляет новое сообщение
	 * @param message - текст сообщения
	 */
	sendMessage(message) {
		this.ws.send(JSON.stringify({
			text: message
		}));
	}

	/**
	 * Устанавливает новый обработчик
	 * @param callback
	 */
	addNewMessageListener(callback) {
		this.callback = callback;
	}
}

