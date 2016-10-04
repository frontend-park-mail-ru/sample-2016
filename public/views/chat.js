(function () {
	'use strict';

	const View = window.View;
	const Chat = window.Chat;
	const RouterInstance = window.RouterInstance;

	class ChatView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-chat');
			this.hide();
		}

		resume(options = {}) {
			this._component = new Chat({
				el: this._el,
				data: {
					messages: [],
					username: options.username,
					email: options.email
				}
			});
			this._component.render();
			this._component.subscribe();
			this.show();
		}
	}

	window.ChatView = ChatView;

})();
