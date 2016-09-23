module.exports =  {
	"type": "object",
	"description": "Сессия",

	"properties": {
		"id": {
			"description": "Id авторизационной сессии",
			"type": "integer",
			"minimum": 0
		}
	},

	"required": ["id"]
};
