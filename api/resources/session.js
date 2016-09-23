exports.get = {
	"tags": ["session"],
	"description": "Метод получает авторизационную сессию",

	"responses": {
		"200": {
			"schema": {
				"description": "Id сессии",
				"type": "integer",
				"items": {
					"$ref": "#/definitions/Session"
				}
			}
		},
    "401": {
      "schema": {
        "description": "Ошибка",
        "type": "string"
      }
    }
	},

	"x-amples": [{
		"description": "получение сессии",
		"request": {
			"params": {}
		},
		"response": {
			"status": 200,
			"headers": {
				"content-type": "application/json"
			},
      "data" : {
        "id" : Math.floor(Math.random() * (1000))
      },
      "validator": function (res) {

				if (typeof res.id !== 'number' ) {
					return 'не корректный id';
				}

				return true;
			}
    }
	}]

};

exports.post = {
	"tags": ["session"],
	"description": "Метод логина пользователя",
	"parameters": [
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
		"400": {
			"description": "Ошибка при выполнении запроса"
		}
	},
	"x-amples": [{
		"description": "логин пользователя",
		"request": {
			"params": {
				"login": "dmitrydorofeev",
				"password": "veeforodyrtimd"
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

				return true;
			}
		}
	}]
};

exports.delete = {
	"tags": ["session"],
	"description": "Метод логаута пользователя",

	"responses": {
		"200": {
			"schema": {
				"description": "Успешный запрос"
			}
		},
		"400": {
			"description": "Ошибка при выполнении запроса"
		}
	},
	"x-amples": [{
		"description": "логаут пользователя",
    "request": {
			"params": {}
		},
		"response": {
			"status": 200,
			"headers": {
				"content-type": "application/json"
			}
		}
	}]
};
