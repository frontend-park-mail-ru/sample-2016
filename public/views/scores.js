'use strict';

import View from '../modules/view';
import User from '../models/user';


export default class ScoresView extends View {
	constructor(options = {}) {
		super(options);
		this._el = document.querySelector('.js-scores');
		this.hide();
	}

	init(options = {}) {

	}

	resume() {
		User.fetchAll()
			.then(users => {
				this._el.innerHTML = '<ul>' + users.map(u => `<li>${u.username} - ${u.email}</li>`).join('') + '</ul>';
				this.show();
			})
			.catch(() => {
				this.router.go('/', {});
			});
	}
}
