exports.get = {
	"tags": ["session"],
	"description": "Метод получает авторизационную сессию",

	"responses": {
		"200": {
			"schema": {
				"description": "Id сессии",
				"type": "integer"
			}
		},
    "401": {
      "schema": {
        "description": "Ошибка",
        "type": "string"
      }
    }
	},

	// "x-amples": [{
	// 	"description": "получение сессии",
	// 	"request": {
	// 		"params": {}
	// 	},
	// 	"response": {
	// 		"status": 200,
	// 		"headers": {
	// 			"content-type": "application/json"
	// 		},
  //     "data" : {
  //       "id" : 1
  //     }
  //   }
	// }]


}
