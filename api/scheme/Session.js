module.exports =  {
	"type": "object",
	"description": "Получение сессии",

	"properties": {
		"token": {
			"description": "Id авторизационной сессии",
			"type": "string",
			"minLength": 6,
 			"maxLength": 50
		}
	},

	"required": ["token"]
};
