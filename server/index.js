let express = require('express');
let http = require('http');
let https = require('https');
let logger = require('morgan');
let bodyParser = require ('body-parser');
let fs = require('fs');
let validator = require ('express-validator');
let models = require ('./db/models');
let path = require('path');
let rfs = require('rotating-file-stream');
let swaggerJSDoc = require ('swagger-jsdoc');

let app = express();
let port = 8443;
let host = 'localhost';
let logDirectory = path.join(__dirname, 'logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

let accessLogStream = rfs('access.log', {
		  interval: '1d',
		  path: logDirectory
});

let swaggerDefinition = {
	info: {
		title: 'Node Swagger API',
		version: '1.0.0',
		description: 'Documentation of the Resource API',
	},
	host: 'localhost:8443/api-docs',
	basePath: '/',
};

const options = {
	key: fs.readFileSync ('ssl/server.key'),
	cert: fs.readFileSync ('ssl/server.crt'),
	passphrase: 'XXXXXX',
};

const swaggerOptions = {
	swaggerDefinition: swaggerDefinition,
	apis: ['./routes/*.js']
};

let swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use (logger('combined',{stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use ('/swagger.json', function (req, res) {
	res.setHeader('Content-Type','application/json');
	res.send(swaggerSpec);
});

app.use (validator());
app.use ('/resource',require ('./routes/resource'));
app.use(express.static(path.join(__dirname, 'public')));

server = https.createServer (options, app).listen (port,host,function() {
	console.log ("Server listening on port 8443");
});

module.exports = server;
