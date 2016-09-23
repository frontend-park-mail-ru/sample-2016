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
						type: 'text'
					},
					{
						name: 'email',
						type: 'email'
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
			technolibs.request('/api/login', formData);

			chat.set({
				username: formData.user,
				email: formData.email
			})
			.render();
			
			chat.subscribe();
			
			loginPage.hidden = true;
			chatPage.hidden = false;
		});
		
		loginPage.appendChild(form.el);
		chatPage.appendChild(chat.el);
		
		loginPage.hidden = false;
	}

	if (typeof exports === 'object') { // for NodeJS
		exports.filter = filter;
	}

})();
