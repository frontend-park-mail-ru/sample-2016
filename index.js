let express = require('express');
let app = express();

app.get('/', (req, res) => {
    res.end('Hello, world!');
});

app.listen(process.env.PORT || 3000);