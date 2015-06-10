module.exports = function(app) 
{
	var alunos = app.controllers.alunos;
	app.get('/alunos', alunos.index);
};
