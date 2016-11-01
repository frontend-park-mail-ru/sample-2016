(function () {
	'use strict';

	const Ball = window.Ball;
	const Pane = window.Pane;
	const KeyMaster = window.KeyMaster;

	class PingPong {

		/**
		 * Конструктор класса Form
		 */
		constructor ({ctx, width, height}) {
			this.ctx = ctx;
			this.width = width;
			this.height = height;

			this.ball = new Ball({});
			this.key = new KeyMaster();
		}

		/**
		 * Начало новой игры
		 */
		start () {
			this._stopped = false;
			this.key.init();
			this.startLoop();
		}

		isStopped () {
			return this._stopped;
		}

		/**
		 * Начинаем крутить петлю
		 */
		startLoop () {
			let time,
				isStopped =  this.isStopped.bind(this),
				exec = this.exec.bind(this);

			function step () {
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

		clear () {
			this.ctx.clearRect(0, 0, this.width, this.height);
		}

		/**
		 * Обрабатываем текущий момент
		 * @param  {number} dt
		 */
		exec (dt) {
			let keys = this.keys;
			this.clear();

			this.ball.update(dt);
			this.checkControl();
			this.ball.checkRectangleIntersection({
				width: this.width,
				height: this.height
			});

		    this.ball.draw(this.ctx);
		}

		checkControl () {
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
		}

	}

	//export
	window.PingPong = PingPong;
})();
