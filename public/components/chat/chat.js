(function () {
	'use strict';
	
	// import
	let Button = window.Button;
	let Form = window.Form;
	// let technolibs = window.technolibs;

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
		 * Подписываем чат на сетевые и пользовательские события
		 */
		subscribe () {
			technolibs.onMessage(this._updateMessages.bind(this));
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
		 * Обновляем список сообщений
		 * @param {Object} data
		 */
		_updateMessages (data) {
			let messages = Object.keys(data).map(key => {
				let entry = data[key];

				entry.background = technolibs.colorHash(entry.email);
				entry.isMy = this.data.email === entry.email;
				
				return entry;
			});

			this.set({messages});
			this._renderMessages();
		}
	}
	
	//export
	window.Chat = Chat;
})();
