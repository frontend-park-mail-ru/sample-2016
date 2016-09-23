exports.post = {
	"tags": ["user"],
	"description": "Метод создания пользователя",

  "parameters": [
    {
			"name": "email",
			"description": "Логин пользователя",
			"type": "string"
		},
		{
			"name": "login",
			"description": "Логин пользователя",
			"type": "string"
		},
		{
			"name": "password",
			"description": "Пароль пользователя",
			"type": "string"
		}
	],

  "responses": {
		"200": {
			"schema": {
				"description": "Id сессии",
				"type": "#/definitions/Session"
			}
		},
		"403": {
			"description": "Ошибка при выполнении запроса"
		}
	}
};
exports.get = {
	"tags": ["user"],
	"description": "Метод получения информации о пользователе",

	"responses": {
		"200": {
			"schema": {
				"description": "Информация о пользователе",
        "type": "#/definitions/User"
			}
		},
		"401": {
			"description": "Ошибка при выполнении запроса"
		}
	}
};
exports.put = {
	"tags": ["user"],
	"description": "Метод изменения данных пользователя",

	"responses": {
		"200": {
			"schema": {
				"description": "Id  сессии"
			}
		},
		"403": {
			"description": "Ошибка при выполнении запроса"
		}
	}
};
exports.delete = {
	"tags": ["user"],
	"description": "Метод удаления пользователя",

	"responses": {
		"200": {
			"schema": {
				"description": "Успешный запрос"
			}
		},
		"403": {
			"description": "Ошибка при выполнении запроса"
		}
	}
};
