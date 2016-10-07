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

			// TODO: дописать реализацию

			this.show();
		}
	}


	// export
	window.ChatView = ChatView;

})();
