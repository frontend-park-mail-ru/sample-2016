'use strict';

// import
import './chat.css';
import Block from '../block/block';
import Form from '../form/form';
import Message from '../../models/message';
import template from './chat.tmpl.xml';


export default class Chat extends Block {
	constructor({data = {messages: [], username: '', email: ''}, el}) {
		super('form');
		this.template = template;
		this.data = data;
		this._el = el;


		this.messagesModel = new Message(this._updateMessages.bind(this));

		this.init();
		this.render();
	}

	init() {
		this._updateHtml();
		this.form = new Form({
			el: this._el.querySelector('.js-chat-form'),
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

	render() {
		this._renderMessages();
		this._renderForm();
	}

	set(data) {
		this.data = Object.assign({}, this.data, data);
		return this.render();
	}

	subscribe(a) {
		this.messagesModel.addNewMessageListener(a);
	}

	_sendMessage(event) {
		event.preventDefault();

		let data = {
			message: this.form.getFormData().message,
			email: this.data.email
		};

		let message = new Message(data);

		message.save()
			.then(data => {
				this.form.reset();
			});
	}

	_updateHtml() {
		this.data.username = this.data.username || this.data.user || 'Anon';
		this._el.innerHTML = this.template(this.data);
	}

	_renderMessages(messages) {
		let wrapper = this._el.querySelector('.js-messages');
		console.log(this.data);

		wrapper.innerHTML = this.template({
			block: 'chat__messages',
			data: this.data.messages
		});

		wrapper.scrollTop = wrapper.scrollHeight;
	}

	_renderForm() {
		this.form.render();
	}

	_updateMessages(data) {
		data = data.map(msg => {
			msg.isMy = msg.email === this.data.email;
			return msg
		});
		this._renderMessages(data);
	}
}
