/*
 * GET home page.
 */
exports.index = function(req, res){
	res.render('index', { title: 'Express' })
};

/*
 * GET projects list
 */
exports.projects = function(req, res, next) {
	var Project = require('../models/project')
		, timeoutId;
	timeoutId = setTimeout(function() {
		next(new Error('timeout on db query'));
	}, 500);
	Project.findAll().success(function(projects) {
		clearTimeout(timeoutId);
		res.render('projects', {
			projects: projects
		});
	});
};