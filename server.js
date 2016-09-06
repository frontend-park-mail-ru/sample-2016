let express = require('express');
let technologger = require('technologger');
let parser = require('body-parser');
let app = express();

let socket = require('./socket');

app.use('/', express.static('public'));

app.use(parser.json());

app.post('/messages', (req, res) => {
	socket.publish(req.body).then(body => res.json(body));
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});
