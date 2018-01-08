/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {

		var rp = require('fs.realpath');
		var dir = '../../assets/uploads/';
		var real;
		

		req.file('avatar').upload({
    			// don't allow the total upload size to exceed ~100MB
    			maxBytes: 100000000,
    			// set the directory
    			dirname: dir
  			},function (err, uploadedFile) {
   	 			if (err) return res.serverError(err);
    			// logging the filename


    			var up = uploadedFile[0].filename;
    			var dirBase = dir.toString() + up.toString()

    			real = rp.realpathSync(uploadedFile[0].fd.toString());

    			Product.create({ 
					reference: Math.random().toString(36),
					title: req.param('title'), 
					price: req.param('price'),
					description: req.param('description'),
					image: real.toString(),
					categoryid: 1 
				} ,function(err, created) {
				 	if(!err) {
	        			console.log('Produit créé : '+created.title+', ayant pour reference : '+created.reference+'.');
	        			res.redirect('/');
	   			 	} else {
	       				 return err;
	    		 	}

				});
    			//return real;	
    			//return res.json({msg : 'no problem'});

  		});

		

		
		/*Product.create({ 
				reference: Math.random().toString(36),
				title: req.param('title'), 
				price: req.param('price'),
				description: req.param('description'),
				image: real.toString(),
				categoryid: 1 
			} ,function(err, created) {
				 if(!err) {
	        		console.log('Produit créé : '+created.title+', ayant pour reference : '+created.reference+'.');
	        		res.redirect('/');
	   			 } else {
	       			 return err;
	    		 }

		});*/
	}
};
