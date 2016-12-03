'use strict';

import './modules/swLoader';
import './css/main.scss';

import Router from './modules/router';
import ChatView from './views/chat';
import MainView from './views/main';
import ScoresView from './views/scores';
import GameView from './views/game';


// TIP: роуты нужно указывать от наиболее специфичного к наименее специфичному
// З.Ы. чтобы более ранние роуты не были префиксами более поздних ;]
(new Router)
	.addRoute('/scores', ScoresView)
	.addRoute('/chat', ChatView)
	.addRoute('/game', GameView)
	.addRoute('/', MainView)
	.start();
