function request(url, data) {
	let xhr = new XMLHttpRequest();
	
	xhr.open('POST', url, false);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(data));
	
	return xhr.responseText;
}
