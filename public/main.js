(function () {
	'use strict';

	if (typeof window === 'object') {

		//import
		let Button = window.Button;
		let Chat = window.Chat;
		let Form = window.Form;

		let loginPage = document.querySelector('.js-login');
		let chatPage = document.querySelector('.js-chat');

		let form = new Form({
			el: document.createElement('div'),
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
						text: 'Войти',
						attrs: {
							type: 'submit'
						}
					}
				]
			}
		});

		let chat = new Chat({
			el: document.createElement('div'),
		});

		form.on('submit', event => {
			event.preventDefault();

			let formData = form.getFormData();
			technolibs.request('/api/session', formData);

			chat.set({
				username: formData.user,
				email: formData.email
			});
			chat.render();

			chat.subscribe();

			loginPage.hidden = true;
			chatPage.hidden = false;
		});

		loginPage.appendChild(form._get());
		chatPage.appendChild(chat._get());

		loginPage.hidden = false;
	}

})();
