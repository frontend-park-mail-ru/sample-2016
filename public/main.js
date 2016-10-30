'use strict';

import './css/milligram.min.css';
import './css/main.css';


import Router from './modules/router';
import ChatView from './views/chat';
import MainView from './views/main';


// TIP: роуты нужно указывать от наиболее специфичного к наименее специфичному
// З.Ы. чтобы более ранние роуты не были префиксами более поздних ;]
(new Router)
	.addRoute('/chat', ChatView)
	.addRoute('/', MainView)
	.start();
