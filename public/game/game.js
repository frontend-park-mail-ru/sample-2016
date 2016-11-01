(function () {
	'use strict';

	const Ball = window.Ball;
	const KeyMaster = window.KeyMaster;

	class Game {
		constructor({ctx, width, height}) {
			this.ctx = ctx;
			this.width = width;
			this.height = height;

			this.key = new KeyMaster();
			this.key.init();

			this.ball = new Ball({x: 100, y: 100, r: 40, color: '#0e751f'});
		}

		start () {
			this.ball.draw(this.ctx);
			this.ball.dv({dvx: 0.1, dvy: 0.1});

			this.animate();
		}

		animate () {
			let date = Date.now();
			let doAnimate = () => {
				let localDate = Date.now();
				this.clear();

				this.ball.update(localDate - date);
				this.ball.draw(this.ctx);

				this.ball.checkRectIntersection({
					width: this.width,
					height: this.height
				}, 'reflect');

				this.doKeys();
				console.log(this.ball)

				date = localDate;

				requestAnimationFrame(doAnimate);
			}

			doAnimate();
		}

		doKeys () {
			if (this.key.is('w')) {
				this.ball.dv({dvy: -0.01})
			}

			if (this.key.is('s')) {
				this.ball.dv({dvy: 0.01})
			}

			if (this.key.is('a')) {
				this.ball.dv({dvx: -0.01})
			}

			if (this.key.is('d')) {
				this.ball.dv({dvx: 0.01})
			}
		}

		clear () {
			this.ctx.clearRect(0, 0, this.width, this.height);
		}
	}


	// export
	window.Game = Game;

})();
