var path = require('path');

module.exports = {
	entry: [
		path.join(__dirname, 'app/index/index.js')
	],
	output: {
		path: path.join(__dirname, 'app/dist'),
		filename: 'main.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: path.join(__dirname, 'app'),
				exclude: path.join(__dirname, 'node_modules'),
				loader: 'babel-loader'
			}
		]
	}
}
