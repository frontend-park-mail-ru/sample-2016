(function () {
	'use strict';

	const Router = window.Router;
	const ChatView = window.ChatView;
	const GameView = window.GameView;
	const MainView = window.MainView;


	// TIP: роуты нужно указывать от наиболее специфичного к наименее специфичному
	// З.Ы. чтобы более ранние роуты не были префиксами более поздних ;]
	(new Router)
		.addRoute('/chat', ChatView)
		.addRoute('/game', GameView)
		.addRoute('/', MainView)
		.start();

})();
