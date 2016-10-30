'use strict';

import Model from '../modules/model';

export default class Message extends Model {

	constructor(attributes) {
		super(attributes);
	}

	get defaults() {
		return {
			name: 'Anon',
			email: 'anon@mail.ru'
		}
	}

	get url() {
		return '/api/messages/';
	}

}
