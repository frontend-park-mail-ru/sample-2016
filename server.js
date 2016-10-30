let express = require('express');
let parser = require('body-parser');
let app = express();
let technoDoc = require('techno-gendoc');

let publish = require('technolibs/publish');

app.use('/', express.static('dist', {maxAge: 1}));
app.use('/chat', express.static('dist', {maxAge: 1}));
technoDoc.generate(require('./api'), 'public');

app.use(parser.json());

app.get('/api/session', (req, res) => {
	res.send(technoDoc.mock(require('./api/scheme/Session')))
});

app.post('/api/session', (req, res) => {
	res.send(technoDoc.mock(require('./api/scheme/Session')))
});


app.post('/api/messages', (req, res) => {
	publish(req.body).then(body => res.json(req.body));
});

app.get('/api/messages', function (req, res) {
	res.send([
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message'))
	])
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});
