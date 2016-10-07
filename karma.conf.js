module.exports = function (config) {
	'use strict';
	config.set({

		basePath: '',

		frameworks: ['jasmine'],

		files: [
			'./public/components/**/*.js',
			'./public/modules/**/*.js',
			'./public/views/**/*.js',
			'./test/**/*.spec.js'
		],

		reporters: ['progress', 'coverage'],
		preprocessors: {
			'./public/components/**/*.js': ['coverage'],
			'./public/modules/**/*.js': ['coverage'],
			'./public/views/**/*.js': ['coverage']
		},

		port: 9876,
		colors: true,
		autoWatch: false,
		singleRun: false,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		browsers: ['Chrome'],
		coverageReporter: {
			type: 'html',
			dir: 'coverage/'
		}
	});
};
