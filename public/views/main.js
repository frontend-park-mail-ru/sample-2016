(function () {
	'use strict';

	const View = window.View;
	const Form = window.Form;
	const User = window.User;

	class MainView extends View {
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
						console.log('cookie is');
						console.dir(document.cookie);
						this.router.go('/chat', user.json);
					})
					.catch(console.error);
			});

			let playButton = document.getElementById('js-play');
			playButton.addEventListener('click', event => {
				event.preventDefault();
				this.router.go('/game');
			});
		}
	}


	// export
	window.MainView = MainView;

})();
