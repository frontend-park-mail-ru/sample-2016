(function () {
	'use strict';

	if (typeof window === 'object') {
		const RouterInstance = window.RouterInstance;
		const ChatView = window.ChatView;
		const MainView = window.MainView;


		// TIP: роуты нужно указывать от наиболее специфичного к наименее специфичному
		// З.Ы. чтобы более ранние роуты не были префиксами более поздних ;]
		RouterInstance
			.route('/chat', ChatView)
			.route('/', MainView)
			.start();

	}

})();
