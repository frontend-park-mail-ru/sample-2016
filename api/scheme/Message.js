module.exports =  {
	"type": "object",
	"description": "Сообщение",

	"properties": {
		"login": {
			"description": "Логин автора",
			"type": "string"
		},
		"text": {
			"description": "Текст сообщения",
			"type": "string"
		},
		"id": {
			"description": "Идентификатор сообщения",
			"type": "number"
		}
	},

	"required": ["login", "text", "id"]
};
