'use strict';

let express = require('express');
let app = express();

//**********************************************//


//**********************************************//


app.listen(3001, () => {
	console.log(`Backend started on port ${process.env.PORT || 3001}`);
});
