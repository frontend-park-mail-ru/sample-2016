(function () {
	'use strict';

	const View = window.View;
	const Game = window.Game;

	class GameView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-game');
			this.hide();
		}

		init () {
			this.canvas = this._el.querySelector('.js-canvas');
			this.canvas.width = '1024';
			this.canvas.height = '768';

			this.ctx = this.canvas.getContext('2d');
		}

		resume(options = {}) {
			this._game = new Game({
				ctx: this.ctx,
				width: 1024,
				height: 768
			});
			this._game.start();

			this.show();
		}
	}


	// export
	window.GameView = GameView;

})();
