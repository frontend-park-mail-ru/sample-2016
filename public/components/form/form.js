'use strict';

// import
import Block from '../block/block';
import Button from '../button/button';
import template from './form.tmpl.xml';

export default class Form extends Block {

	/**
	 * Конструктор класса Form
	 */
	constructor(options = {data: {}}) {
		super('form');
		this.template = template;
		this.data = options.data;
		this._el = options.el;
		this.render();
	}

	/**
	 * Обновляем HTML
	 */
	render() {
		this._updateHtml();
		this._installControls();
	}

	/**
	 * Обнуляем форму
	 */
	reset() {
		this._el.querySelector('form').reset();
	}

	/**
	 * Обновить html компонента
	 */
	_updateHtml() {
		this._el.innerHTML = this.template(this.data);
	}

	/**
	 * Вставить управляющие элементы в форму
	 */
	_installControls() {
		let {controls = []} = this.data;

		controls.forEach(data => {
			let control = new Button({text: data.text});
			this._el.querySelector('.js-controls').appendChild(control._get());
		});
	}

	/**
	 * Взять данные формы
	 * @return {object}
	 */
	getFormData() {
		let form = this._el.querySelector('form');
		let elements = form.elements;
		let fields = {};

		Object.keys(elements).forEach(element => {
			let name = elements[element].name;
			let value = elements[element].value;

			if (!name) {
				return;
			}

			fields[name] = value;
		});

		return fields;
	}

}
