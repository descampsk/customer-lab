var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
	category: {
		type: String,
	},
	projectName: {
		type: String,
	},
	companyName: {
		type: String,
	},
	description: {
		type: String
	},
	longDescription: {
		type: String
	},
	daysLeft: {
		type: String
	},
	projectPicUrl: {
		type: String
	},
	companyPicUrl: {
		type: String
	},
	pledged: {
		type: String
	},
	required: {
		type: String
	},
	votes: {
		type: String
	},
	publicKey: {
		type: String
	},
	tags: {
		type: String
	},
	geoloc: {
		type: String
	},
	quote: {
		type: String
	}
});

module.exports = ProjectSchema;
