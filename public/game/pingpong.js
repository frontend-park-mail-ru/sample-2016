(function () {
	'use strict';

	const Ball = window.Ball;
	const Pane = window.Pane;

	class PingPong {

		/**
		 * Конструктор класса Form
		 */
		constructor ({ctx, width, height}) {
			this.ctx = ctx;
			this.width = width;
			this.height = height;

			this.keys = {};

			this.ball = new Ball({});
			this.ball.dv({vx: 0.1, vy: 0.1});

			this.pane = new Pane();
		}

		/**
		 * Начало новой игры
		 */
		start () {
			this._stopped = false;
			this.initEvents();
			this.startLoop();
		}

		initEvents () {
			document.addEventListener('keydown', this._keyHandler.bind(this, 'press'));
			document.addEventListener('keyup', this._keyHandler.bind(this, 'up'));
		}

		_keyHandler (type, event) {
			this.keys[event.key] = type === 'press';
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
			this.ball.checkRectangleIntersection({
				width: this.width,
				height: this.height
			});

			if (keys['w']) {
				this.ball.dv({vy: -0.01});
			}

			if (keys['s']) {
				this.ball.dv({vy: 0.01});
			}

			if (keys['d']) {
				this.ball.dv({vx: 0.01});
			}

			if (keys['a']) {
				this.ball.dv({vx: -0.01});
			}


		    this.ball.draw(this.ctx);
		}

	}

	//export
	window.PingPong = PingPong;
})();
