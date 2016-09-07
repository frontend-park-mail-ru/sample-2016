module.exports =  {
	"type": "object",
	"description": "Сообщение",

	"properties": {
		"login": {
			"description": "Логин автора",
			"type": "string",
			"minLength": 6,
 			"maxLength": 12
		},
		"text": {
			"description": "Текст сообщения",
			"type": "string",
			"minLength": 2,
 			"maxLength": 256
		},
		"id": {
			"description": "Идентификатор сообщения",
			"type": "integer",
			"minimum": 0
		}
	},

	"required": ["login", "text", "id"]
};
