function hello(name) {
	return `Привет, ${name}`;
}

if (typeof module === 'object' && module.exports) {
	module.exports = hello;
}
