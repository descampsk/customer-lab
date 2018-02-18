#!/usr/binenv node

var express = require("express");
var path = require("path");

var bodyParser = require("body-parser");

var dbUrl = 'mongodb://localhost:27017/casinocoin';
var db = require("mongoose").connect(dbUrl);

var projectsRoutes = require('./routes/projectsRoutes');

var app = express();

app.use(express.static(path.join(__dirname, "../app/dist")));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

var port = 3000;

var webpack = require("webpack");

var webpackDevMiddleware = require('webpack-dev-middleware');
var config = require("../webpack.config.js");
var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler));

projectsRoutes(app);

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, '../app/dist/index.html'));
});

app.listen(port, function(error) {
	if (error) {
		console.log(error);
	} else {
		console.log("Server listening on port " + port);
	}
});
