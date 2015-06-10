module.exports = function(app) 
{
	//var Usuario = app.models.usuario;
	var AlunosController = 
	{
	  	index: function(req, res)
	 	{
			res.render('alunos/index');
		},
	};
	return AlunosController;
};