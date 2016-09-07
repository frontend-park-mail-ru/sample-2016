exports.post = {
	"tags": ["message"],
	"description": "Метод создает новое сообщение",
	"parameters": [
		{
			"name": "login",
			"description": "Имя пользователя",
			"type": "string"
		},
		{
			"name": "text",
			"description": "Текст сообщения",
			"type": "string"
		}
	],
	"responses": {
		"200": {
			"schema": {
				"description": "Данные о созданом сообщение",
				"type": "#/definitions/Message"
			}
		},
		"400": {
			"description": "Ошибка при выполнении запроса"
		}
	},
	"x-amples": [{
		"description": "создание тестового сообщения",
		"request": {
			"params": {
			  "login": "test",
			  "text": "Проверяем"
			}
		},
		"response": {
			"status": 200,
				"headers": {
				"content-type": "application/json"
			},
			"validator": function (res) {

				if (typeof res.id !== 'number' ) {
					return 'не корректный id';
				}

				if (typeof res.text !== 'string') {
					return 'не корректный текст сообщения';
				}

				if (typeof res.login !== 'string') {
					return 'не корректный login';
				}

				return true;
			}
		}
	}]
}
