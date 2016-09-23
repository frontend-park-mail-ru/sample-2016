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
      "description": "Id сессии",
      "schema": {
        "$ref": "#/definitions/Session"
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

  "parameters": [
    {
      "name": "id",
      "description": "Id сессии",
      "type": "integer",
      "in": "path",
      "required": true
    },
  ],

  "responses": {
    "200": {
      "description": "Информация о пользователе",
      "schema": {
        "$ref": "#/definitions/User"
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

  "parameters": [
    {
      "name": "id",
      "description": "Id сессии",
      "type": "integer",
      "in": "path",
      "required": true
    },
  ],

  "responses": {
    "200": {
      "description": "Id  сессии",
      "schema": {
        "$ref": "#/definitions/Session"
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

  "parameters": [
    {
      "name": "id",
      "description": "Id сессии",
      "type": "integer",
      "in": "path",
      "required": true
    },
  ],

  "responses": {
    "200": {
      "description": "Успешный запрос"
    },
    "403": {
      "description": "Ошибка при выполнении запроса"
    }
  }
};
