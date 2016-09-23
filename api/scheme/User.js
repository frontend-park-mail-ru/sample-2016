module.exports =  {
  "type": "object",
  "description": "Пользователи",

  "properties": {
    "id": {
      "description": "Id авторизационной сессии",
      "type": "integer",
      "minimum": 0
    },
    "email": {
      "description": "Email пользователя",
      "type": "string",
      "minLength": 6,
      "maxLength": 50
    },
    "login": {
      "description": "Логин пользователя",
      "type": "string",
      "minLength": 1,
      "maxLength": 50
    },
    "password": {
      "description": "Пароль пользователя",
      "type": "string",
      "minLength": 1,
      "maxLength": 50
    },
  },

  "required": ["id", "email", "login", "password"]
};
