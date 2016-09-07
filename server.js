let express = require('express');
let technologger = require('technologger');
let parser = require('body-parser');
let app = express();

let technolibs = require('technolibs');

app.use('/', express.static('public'));
app.use('/libs', express.static('node_modules'));

app.use(parser.json());

app.post('/messages', (req, res) => {
	technolibs.publish(req.body).then(body => res.json(req.body));
});

app.get('/messages', (req, res) => {
	technolibs.publish(req.body).then(body => res.json(body));
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});
