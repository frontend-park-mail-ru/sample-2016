(function () {
	'use strict';

	class Ball {
		constructor ({x = 0, y = 0, vx = 0, vy = 0, r = 30, color = '#5d5d15'}) {
			this.x = x;
			this.y = y;

			this.vx = vx;
			this.vy = vy;

			this.r = r;
			this.color =  color;
		}

		update (dt) {
			this.x += this.vx * dt;
			this.y += this.vy * dt;
		}

		draw (ctx) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
		}

		dv ({dvx, dvy}) {
			this.vx += dvx;
			this.vy += dvy;
		}

	}


	// export
	window.Ball = Ball;

})();
