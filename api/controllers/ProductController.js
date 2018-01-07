/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {

		var dir = '../../assets/uploads/';
		
		req.file('avatar').upload({
    			// don't allow the total upload size to exceed ~100MB
    			maxBytes: 100000000,
    			// set the directory
    			dirname: dir
  			},function (err, uploadedFile) {
    			// if error negotiate
   	 			if (err) return res.serverError(err);
    			// logging the filename
    			console.log(uploadedFile);
    			return res.json({msg: 'The tran file are transfered'});
  		});

		



		
		/*Product.create({ 
				reference: Math.random().toString(36),
				title: req.param('title'), 
				price: req.param('price'),
				description: req.param('description'),
				image: "test",
				categoryid: 1 
			} ,function(err, created) {
				 if(!err) {
	        		console.log('Produit créé : '+created.title+', ayant pour reference : '+created.reference+'.');
	        		res.redirect('/');
	   			 } else {
	       			 return err;
	    		 }

		}); */
	}
};

