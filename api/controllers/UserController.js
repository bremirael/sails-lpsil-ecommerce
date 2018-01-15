/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	login: function(req, res) {
 
        var log = req.param('username');
        var password = req.param('password');
 
        if(!(log && password)) {
            req.session.errorMessage = "Veuillez remplir les champs!";
            res.redirect('/login');
        }
 
        else {
            User.findOne({username: log}).exec(function (err, user) {
                console.log(log);
                if (err) {
                    req.session.errorMessage = "Nom d'utilisateur ou mot de passe invalide!";
                    return res.redirect('/login');
                }
                if (user) {
                    if(log == user.username && password == user.password){
                        req.session.authenticated = true;
                        if(user.isAdmin == 1){
                            req.session.level == "admin";
                        }else req.session.level == "user";
                        req.session.user = user;
                        req.session.save(function(err, saved){
                            if(err){console.log(err);}
                            else{
                                console.log(req.session.user);
                                //res.locals.User.password = req.session.User;
                                return res.redirect('/');
                            }
                        });
                    }
                    else return res.redirect('/connexion');
                }
            });
        }
	},

	/** 
	 *	The password is not salt.
	 *  @TODO gen salt before create user
	 */
	register: function(req, res) {
		User.create({ 
			username: req.param('username'),
			email: req.param('email'), 
			password: req.param('password'),
			isAdmin: 0
		} ,function(err, created) {
			if(!err) {
	        	console.log('Utilisateur créé : '+created.username+', password '+created.password+' isAdmin :'+created.isAdmin+'.');
	        	res.redirect('/');
	   		} else {
	       		return err;
	    	}

		});
	},

	logout: function(req, res){
		req.session.destroy(function(err) {
            setTimeout(function(){
                return res.redirect('/');
          }, 1000); // redirect wait time 2.5 seconds
        });
	}
	
};

