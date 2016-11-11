'use strict';

let technoDoc = require('techno-gendoc');
let express = require('express');
let app = express();


technoDoc.generate(require('./api'), 'public');
app.use('/', express.static('public', {maxAge: 1}));
app.use('/chat', express.static('public', {maxAge: 1}));
app.use('/game', express.static('public', {maxAge: 1}));
app.use('/libs', express.static('node_modules'));


//**********************************************//


let cookieParser = require('cookie-parser');
let websokify = require('express-ws');
let makeUser = require('./make-user');
let parser = require('body-parser');
let full = require('./full');
websokify(app);

const users = new Map();
const messages = [];
full(users, messages);


app.use(parser.json());
app.use(cookieParser());


app.use(function (req, res, next) {
	console.log(`${req.method}  ${req.originalUrl}`);
	if (req.method === 'POST') {
		console.dir(req.body);
	}
	next();
});

// получение списка всех пользователей
app.get('/api/users', function (req, res) {
	console.dir(req.cookies);
	const secret = req.cookies.secret;
	if (!secret || !users.has(secret)) {
		console.log('ooops!');
		return res.status(401).end();
	}
	const r = [...users.values()].map(user => {
		user.secret = undefined;
		return user;
	});
	res.json(r);
});

// создание нового пользователя
app.post('/api/users', function (req, res) {
	const body = req.body;
	if (body.username && body.email) {
		const user = makeUser(body.username, body.email);
		users.set(user.secret, user);
		res.set('Set-Cookie', 'name=value');
		// res.cookie('username', 'kopte3', {domain: 'my.localhost.com'});
		// res.cookie('username', user.secret);
		// res.cookie('secret', user.secret);
		// res.cookie('secret', user.secret);
		return res.status(201).end();
	}
	return res.status(400).json({error: 'Неверные имя пользователя и/или пароль'});
});


const clients = new Set();
app.ws('/messages', function (ws, req) {
	console.dir(arguments);
	console.log('Add new client');
	clients.add(ws);
	console.log(`NOW ${clients.size} clients exists`);
	console.log(req);

	ws.on('message', function (msg) {
		console.dir(arguments);
		ws.send(msg);
	});

	ws.on('close', function (evt) {
		console.log('Remove client');
		clients.delete(ws);
		console.log(`NOW ${clients.size} clients exists`);
		console.dir(arguments);

	});
});


//**********************************************//

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});
