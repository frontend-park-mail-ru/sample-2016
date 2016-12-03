'use strict';

import Block from '../block/block';
import './button.scss';

export default class Button extends Block {
	constructor(options) {
		super('button', options);
		this._el.classList.add('button');
		this._el.innerText = this._options.text || 'Press me';
	}
}
