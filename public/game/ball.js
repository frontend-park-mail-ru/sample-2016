(function () {
	'use strict';

	class Ball {

		/**
		 * Конструктор класса Ball
		 */
		constructor ({x = 100, y = 100, r = 40}) {
			this.vx = 0;
			this.vy = 0;

			this.r = r;
			this.x = x;
			this.y = y;
		}

		dv ({vx = 0, vy = 0}) {
			this.vx += vx;
			this.vy += vy;
		}

		update (dt) {
			this.x += this.vx * dt;
			this.y += this.vy * dt;
		}

		checkRectangleIntersection ({width, height}) {
			if (this.x + this.r > width || this.x - this.r < 0) {
				this.vx *= -1;
			}

			if (this.y + this.r > height || this.y - this.r < 0) {
				this.vy *= -1;
			}
		}

		draw (ctx) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
		}


	}

	//export
	window.Ball = Ball;
})();
