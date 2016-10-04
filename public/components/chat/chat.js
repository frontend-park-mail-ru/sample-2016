(function () {
	'use strict';
	
	// import
	let Button = window.Button;
	let Form = window.Form;
	
	class Chat {
		
		/**
		 * Конструктор класса Chat
 		 */
		constructor ({ data = { messages: [] }, el }) {
			this.template = window.fest['chat/chat.tmpl'];
			this.data = data;
			this.el = el;

			this.init();
			this.render();
		}

		/**
		 * Инициализация составных компонент
		 */
		init () {
			this._updateHtml();

			this.form = new Form({
				el: this.el.querySelector('.js-chat-form'),
				data: {
					fields: [
						{
							name: 'message',
							type: 'text',
							placeholder: 'Ваше сообщение'
						}
					],
					controls: [
						{
							text: 'Отправить',
							attrs: {
								type: 'submit'
							}
						}
					]
				}
			});
			this.form.on('submit', this._sendMessage.bind(this));
		}

		/**
		 * Обновление внешнего вида
		 */
		render () { 
			this._renderMessages();
			this._renderForm();
		}
		
		/**
		 * Обновить данные компонента
		 * @param {Object} data - данные компонента
		 * @returns {Chat}
		 */
		set (data) {
			this.data = Object.assign({}, this.data, data);
			
			return this;
		}

		/**
		 * Обоабатываем отпрвку сообщения из чата
		 */
		_sendMessage (event) {
			event.preventDefault();

			let data = {
				message: this.form.getFormData().message,
				email: this.data.email
			};

			let result = technolibs.request('/api/messages', data);
			this.form.reset();
		}

		/**
		 * Обновляем HTML элемента
		 */
		_updateHtml () {
			this.el.innerHTML = this.template(this.data);
		}

		/**
		 * Обновляем список сообщений
		 * @return {[type]} [description]
		 */
		_renderMessages () {
			let wrapper = this.el.querySelector('.js-messages');

			wrapper.innerHTML = this.template({
				block: 'chat__messages',
				data: this.data.messages
			});

			wrapper.scrollTop = wrapper.scrollHeight;
		}

		/**
		 * Обновляем форму
		 */
		_renderForm () {
			this.form.render();
		}

		/**
		 * Подписываем чат на сетевые и пользовательские события
		 */
		subscribe () {
			technolibs.onMessage(data => {
				this.data.messages = Object.keys(data).map(key => data[key]);
				this._renderMessages();
			});
		}

		/**
		 * Подписываемся на события чата
		 * @param  {string}   type     
		 * @param  {Function} callback 
		 * @return {Chat}            
		 */
		on (type, callback) {
			this.el.addEventListener(type, callback);

			return this;
		}
	}
	
	//export
	window.Chat = Chat;
})();
