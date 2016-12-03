'use strict';

import serviceWorkerURL from 'file?name=[name].[hash].js!../sw';


if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register(serviceWorkerURL, {scope: '/'})
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
