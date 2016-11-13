(function () {
	'use strict';

	const View = window.View;
	const Chat = window.Chat;

	class ChatView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-chat');
			this.hide();
		}

		resume(options = {}) {
			if (!options.username && !options.email) {
				return this.router.go('/');
			}

			this._component = new Chat({
				el: this._el,
				data: {
					messages: [],
					username: options.username,
					email: options.email
				}
			});
			this._component.render();
			this.show();
		}
	}


	// export
	window.ChatView = ChatView;

})();
