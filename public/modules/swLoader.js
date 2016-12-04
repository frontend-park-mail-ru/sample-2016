'use strict';

import serviceWorkerURL from '../sw'; // see webpack.config.js


if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register(serviceWorkerURL.replace('/index', ''), {scope: '/'})
		.then(function (registration) {
			// при удачной регистрации имеем объект типа ServiceWorkerRegistration
			console.info('ServiceWorker registration', registration);
			// строкой ниже можно прекратить работу serviceWorker’а
			// registration.unregister();
		})
		.catch(function (err) {
			throw new Error('ServiceWorker error: ' + err);
		});
}
