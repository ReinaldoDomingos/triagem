var express = require('express')
var app = express()
const port = normalizaPort(process.env.PORT || '3001');

function normalizaPort(val) {
	const port = parseInt(val, 10);
	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
}
app.listen(port, function () {
	console.log(`app listening on port ${port}`)
})

app.get('/salvar', function(req, res) {
	var drive =	require('./upload-drive')
	res.send('{'+
		'"cidade": "",'+
		'"idade": "",'+
		'"unidade": "",'+
		'"gravidade": "",'+
		'"data": "",'+
		'"id": 0'+
		'}');
	console.log('consulta salva') 
});