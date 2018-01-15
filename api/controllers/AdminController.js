/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


    printUser: function (req, res, next) {
    	User.query('SELECT * FROM user', function(err, result){
			if(err) return res.serverError(err);

			res.view('adminUser', {users: result, layout: null});
		});        
    },

    editUser: function (req, res, next) {
    	User.query('SELECT * FROM user WHERE id = '+req.allParams('id').id, function(err, result){
    		console.log(result);
    		if(err) return res.serverError(err);

			res.view('adminUserEdit', {users: result});
    	});
    },

    updateUser: function (req, res, next) {

    	User.update({ id : req.param("id")},
        {
            email: req.param("email"),
            name: req.param("name"),
            password: req.param()
        }).exec(function (err, updatedUser){
            if (err) return res.negotiate(err);
 			else return res.redirect('/admin');
        });
    },

    createUser: function(req, res) {
    	console.log(req.param('isAdmin'));
		User.create({ 
			username: req.param('username'),
			email: req.param('email'), 
			password: req.param('password'),
			isAdmin: parseInt(req.param('isAdmin'))
		} ,function(err, created) {
			if(!err) {
	        	console.log('Utilisateur créé : '+created.username+', password '+created.password+' isAdmin :'+created.isAdmin+'.');
	        	res.redirect('/admin');
	   		} else {
	       		return err;
	    	}

		});
	},
};