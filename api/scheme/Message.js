module.exports =  {
	"type": "object",
	"description": "Сообщение",

	"properties": {
		"email": {
			"description": "Логин автора",
			"type": "string",
			"minLength": 6,
			"maxLength": 50
		},
		"message": {
			"description": "Текст сообщения",
			"type": "string",
			"minLength": 2,
			"maxLength": 140
		},
		"id": {
			"description": "Идентификатор сообщения",
			"type": "integer",
			"minimum": 0
		}
	},

	"required": ["email", "message", "id"]
};
