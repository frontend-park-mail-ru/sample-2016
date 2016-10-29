'use strict';

import Model from '../modules/model';

export default class User extends Model {

	constructor(attributes) {
		super(attributes);
	}

	get defaults() {
		return {
			name: '',
			email: ''
		}
	}

	get url() {
		return '/user/';
	}

}
