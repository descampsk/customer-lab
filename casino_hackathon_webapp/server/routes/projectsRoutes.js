var Project = require('../data/models/project');

function ProjectsRoutes(app) {
	app.post('/projects', function (req, res) {
		Project.create(req.body, function(err) {
			if (err) {
				if (err.name === 'ValidationError') {
					res.status(406).send(Object.keys(err.errors).map(function (errField) {
						return err.errors[errField].message;
					}).join('.'));
				} else {
					return next(err);
				}
			} else {
				res.setHeader('Content-Type', 'application/json');
				res.status(200).send(JSON.stringify({status: "success"}));
			}
		});
	});
	app.get('/projects', function (req, res) {
		Project.find({}, function(err, projects) {
			if (err) {
				return res.status(505).send(err);
			} else {
				return res.status(200).send(projects);
			}
		});
	});
}

module.exports = ProjectsRoutes;
