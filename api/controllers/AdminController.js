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
    	User.query('SELECT * FROM user WHERE id = 1', function(err, result){
    		console.log(result);
    		if(err) return res.serverError(err);

			res.view('adminUserEdit', {users: result});
    	});
    	/*User.findOne(req.param('id'), function foundUser (err, result) {
    		if (err) {
    			console.log(err);
    			return next(err);
    		}
    		if (!user) return next();

    		console.log(user);

    		res.view('adminUserEdit', {user: user})
    	}); */
    }

};

