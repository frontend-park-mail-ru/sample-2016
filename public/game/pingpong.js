'use strict';

import Ball from './ball';
import Pane from './pane';
import KeyMaster from './keymaster';


export default class PingPong {
	/**
	 * Конструктор класса Form
	 */
	constructor({ctx, width, height}) {
		this.ctx = ctx;
		this.width = width;
		this.height = height;

		this.ball = new Ball({});
		this.readyToShot = true;
		this.bullets = [];

		this.key = new KeyMaster();
	}

	/**
	 * Начало новой игры
	 */
	start() {
		this._stopped = false;
		this.key.init();
		this.startLoop();
	}

	isStopped() {
		return this._stopped;
	}

	/**
	 * Начинаем крутить петлю
	 */
	startLoop() {
		let time,
			isStopped = this.isStopped.bind(this),
			exec = this.exec.bind(this);

		function step() {
			var now = Date.now(),
				dt = now - (time || now);

			time = now;

			if (!isStopped()) {
				requestAnimationFrame(step);
			}

			exec(dt);
		}

		step();
	}

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}

	/**
	 * Обрабатываем текущий момент
	 * @param  {number} dt
	 */
	exec(dt) {
		let keys = this.keys;
		this.clear();

		this.bullets.forEach(bullet => {
			bullet.update(dt);
			bullet.checkRectangleIntersection({
				width: this.width,
				height: this.height
			}, 'destroy');

			bullet.draw(this.ctx);
		});

		this.ball.update(dt);
		this.checkControl();
		this.ball.checkRectangleIntersection({
			width: this.width,
			height: this.height
		}, 'reflect');

		this.ball.draw(this.ctx);
		this.collectGarbage();
	}

	collectGarbage() {
		this.bullets.forEach((bullet, index, arr) => {
			if (bullet.toDestroy) {
				arr.splice(index, 1);
			}
		});
	}

	createBullet() {
		if (!this.readyToShot) {
			return;
		}

		this.readyToShot = false;
		this.bullets.push(new Ball({
			color: '#000000',
			r: 10,
			x: this.ball.x,
			y: this.ball.y,
			vx: this.ball.vx * 5,
			vy: this.ball.vy * 5
		}));

		setTimeout(() => this.readyToShot = true, 300);
	}

	checkControl() {
		if (this.key.is('w')) {
			this.ball.dv({vy: -0.01});
		}

		if (this.key.is('s')) {
			this.ball.dv({vy: 0.01});
		}

		if (this.key.is('d')) {
			this.ball.dv({vx: 0.01});
		}

		if (this.key.is('a')) {
			this.ball.dv({vx: -0.01});
		}

		if (this.key.is(' ')) {
			this.createBullet();
		}
	}
}
