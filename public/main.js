(function () {
	'use strict';

	window.__HOST = 'http://my.localhost.com';

	const Router = window.Router;
	const ChatView = window.ChatView;
	const MainView = window.MainView;
	const GameView = window.GameView;


	// TIP: роуты нужно указывать от наиболее специфичного к наименее специфичному
	// З.Ы. чтобы более ранние роуты не были префиксами более поздних ;]
	(new Router)
		.addRoute('/chat', ChatView)
		.addRoute('/game', GameView)
		.addRoute('/', MainView)
		.start();

})();
