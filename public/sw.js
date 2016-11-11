// наименование для нашего хранилища кэша
const CACHE_NAME = 'app_serviceworker_v_1';
// ссылки на кэшируемые файлы
const cacheUrls = [
	'/css/milligram.min.css',
	'/css/main.css',
	'/components/button/button.css',
	'/components/chat/chat.css',

	'/libs/technolibs/index.js',

	'/modules/pathToRegex.js',
	'/modules/view.js',
	'/modules/model.js',
	'/modules/route.js',
	'/modules/router.js',

	'/models/message.js',
	'/models/user.js',

	'/components/block/block.js',
	'/components/button/button.js',
	'/components/form/form.tmpl.js',
	'/components/form/form.js',
	'/components/chat/chat.tmpl.js',
	'/components/chat/chat.js',

	'/game/keymaster.js',
	'/game/ball.js',
	'/game/pane.js',
	'/game/pingpong.js',

	'/views/main.js',
	'/views/game.js',
	'/views/chat.js',

	'/main.js'
];

this.addEventListener('install', function (event) {
	// задержим обработку события
	// если произойдёт ошибка, serviceWorker не установится
	event.waitUntil(
		// находим в глобальном хранилище Cache-объект с нашим именем
		// если такого не существует, то он будет создан
		caches.open(CACHE_NAME).then(function (cache) {
			// загружаем в наш cache необходимые файлы
			return cache.addAll(cacheUrls);
		})
	);
});

this.addEventListener('fetch', function (event) {
	event.respondWith(
		// ищем запрашиваемый ресурс в хранилище кэша
		caches.match(event.request).then(function (cachedResponse) {

			// выдаём кэш, если он есть
			if (cachedResponse) {
				return cachedResponse;
			}

			// иначе запрашиваем из сети как обычно
			return fetch(event.request);
		})
	);
});
