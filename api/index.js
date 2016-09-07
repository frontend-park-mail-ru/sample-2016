module.exports = {
	"swagger": "2.0",
	"info": {
		"version": "0.0.3",
		"title": "TechnoChat API",
		"description": "**ТехноЧат**"
	},
	"basePath": "/api",
	"schemes": ["http"],
   	"host": "http://localhost:3000",

	paths: {
		'/messages': require('./resources/messages')
	},

	definitions: {
		Message: require('./scheme/Message'),
	}

}
