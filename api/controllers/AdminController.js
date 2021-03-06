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
            username: req.param("username"),
            password: req.param("password")
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
			isAdmin: req.param('type')
		} ,function(err, created) {
			if(!err) {
	        	console.log('Utilisateur créé : '+created.username+', password '+created.password+' isAdmin :'+created.isAdmin+'.');
	        	res.redirect('/admin');
	   		} else {
	       		return err;
	    	}

		});
	},

	deleteUser: function(req, res) {
		User.destroy({
  			id: req.allParams('id').id
		}).exec(function (err){
  			if (err) {
    			return res.negotiate(err);
  			}
  			sails.log('Deleted user !!');
  			return res.redirect('/admin');
		});      
    },

	/************
	 * CATEGORY 
	 ***********/

	showCategory: function (req, res, next) {
    	Category.query('SELECT * FROM category', function(err, result){
			if(err) return res.serverError(err);
			console.log(result);
			res.view('adminCategory', {categories: result, layout: null});
		});        
    },

    createCategory: function(req, res) {
		Category.create({ 
			nom: req.param('title'),
		} ,function(err, created) {
			if(!err) {
	        	console.log('Catégorie créé : '+created.nom+'.');
	        	res.redirect('/admin');
	   		} else {
	       		return err;
	    	}

		});
	},

	editCategory: function (req, res, next) {
    	Category.query('SELECT * FROM category WHERE id = '+req.allParams('id').id, function(err, result){
    		console.log(result);
    		if(err) return res.serverError(err);

			res.view('adminCategoryEdit', {categories: result});
    	});
    },


    updateCategory: function (req, res, next) {

    	Category.update({ id : req.param("id")},
    	{
    		nom: req.param("nom")
    	}).exec(function (err, updatedUser) {
            if (err) return res.negotiate(err);
 			else return res.redirect('/admin');
        });
    },

    deleteCategory: function(req, res) {
		Category.destroy({
  			id: req.allParams('id').id
		}).exec(function (err){
  			if (err) {
    			return res.negotiate(err);
  			}
  			sails.log('Category deleted !!');
  			return res.redirect('/admin');
		});      
    },
};