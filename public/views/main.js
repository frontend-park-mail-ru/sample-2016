'use strict';

import View from '../modules/view';
import Form from '../components/form/form';
import User from '../models/user';


export default class MainView extends View {
	constructor(options = {}) {
		super(options);
		this._el = document.querySelector('.js-login');
		this.hide();
		this._component = new Form({
			el: this._el,
			data: {
				title: 'Login',
				fields: [
					{
						name: 'user',
						type: 'text',
						placeholder: 'Ваш логин'
					},
					{
						name: 'email',
						type: 'email',
						placeholder: 'Ваш email'
					}
				],
				controls: [
					{
						text: 'Войти в чат',
						attrs: {
							type: 'submit'
						}
					}, {
						text: 'Играть',
						attrs: {
							id: 'js-play',
							type: 'button'
						}
					}, {
						text: 'Пользователи',
						attrs: {
							id: 'js-scores-btn',
							type: 'button'
						}
					}
				]
			}
		});
	}

	init(options = {}) {
		this._component.on('submit', event => {
			event.preventDefault();

			let formData = this._component.getFormData();
			const user = new User(formData.user, formData.email);

			user
				.signup()
				.then(() => {
					this.router.go('/chat', user.json);
				})
				.catch(console.error);
		});

		let playButton = document.getElementById('js-play');
		playButton.addEventListener('click', event => {
			event.preventDefault();
			this.router.go('/game');
		});

		let scoresButton = document.getElementById('js-scores-btn');
		scoresButton.addEventListener('click', event => {
			event.preventDefault();
			this.router.go('/scores');
		});
	}
}
