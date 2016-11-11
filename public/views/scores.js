(function () {
	'use strict';

	const View = window.View;
	const User = window.User;

	class ScoresView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-scores');
			this.hide();
			this._userModel = new User('user', 'password');
		}

		init(options = {}) {

		}

		resume() {
			this._userModel.fetchAll()
				.then(users => {
					this._el.innerHTML = '<ul>' + users.map(u => `<li>${u.username} - ${u.email}</li>`).join('') + '</ul>';
					this.show();
				})
				.catch(() => {
					this.router.go('/', {});
				});
		}
	}


	// export
	window.ScoresView = ScoresView;

})();
