(function () {
	'use strict';

	const Ball = window.Ball;

	class Game {
		constructor({ctx, width, height}) {
			this.ctx = ctx;
			this.width = width;
			this.height = height;

			this.ball = new Ball({x: 100, y: 100});
		}

		start () {
			this.ball.draw(this.ctx);
			this.ball.dv({dvx: 0.05, dvy: 0.05});

			this.animate();
		}

		animate () {
			let date = Date.now();
			let doAnimate = () => {
				let localDate = Date.now();
				this.clear();

				this.ball.update(localDate - date);
				this.ball.draw(this.ctx);

				date = localDate;

				requestAnimationFrame(doAnimate);
			}

			doAnimate();
		}

		clear () {
			this.ctx.clearRect(0, 0, this.width, this.height);
		}
	}


	// export
	window.Game = Game;

})();
