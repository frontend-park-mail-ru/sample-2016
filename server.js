let express = require('express');
let technologger = require('technologger');
let parser = require('body-parser');
let app = express();
let technoDoc = require('techno-gendoc');
let path = require('path');

app.use('/', express.static('public'));
technoDoc.generate(require('./api'), 'public');

app.use(parser.json());
app.use(technologger);
app.get('/tests', technoDoc.runTests(require('./api')));

app.post('/api/messages', function (req, res) {
	res.send(technoDoc.mock(require('./api/scheme/Message')))
})

app.get('/api/messages', function (req, res) {
	res.send([
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message'))
	])
})

app.post('/users', (req, res) => {
    console.log(req.body);
    res.send('100');
    // TODO: вернуть количество обращений
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});
