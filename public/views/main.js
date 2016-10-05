(function () {
	'use strict';

	const View = window.View;
	const Form = window.Form;
	const RouterInstance = window.RouterInstance;


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
							text: 'Войти',
							attrs: {
								type: 'submit'
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
				technolibs.request('/api/session', formData);


				let state = {
					username: formData.user,
					email: formData.email
				};

				RouterInstance.go('/chat', state);
			});
		}
	}

	window.MainView = MainView;

})();
