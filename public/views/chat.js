'use strict';

import View from '../modules/view';
import Chat from '../components/chat/chat';

export default class ChatView extends View {
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
