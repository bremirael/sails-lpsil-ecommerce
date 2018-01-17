/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



	showCreate: function(req, res) {
		Category.query('SELECT * FROM category', function(err, result){
			if(err) return res.serverError(err);

			res.view('adminProductCreate', {categories: result});
		});
	},

	showProduct: function (req, res, next) {
    	Product.query('SELECT * FROM product', function(err, result){
			if(err) return res.serverError(err);
			console.log(result);
			res.view('adminProduct', {products: result, layout: null});
		});        
    },



	create: function(req, res) {

		var rp = require('fs.realpath');
		var dir = '../../assets/images/';
		// permet d'éviter d'avoir un même nom de fichier
		var ran = Math.random().toString(5); 
		var real;
		

		req.file('avatar').upload({
    			// don't allow the total upload size to exceed ~100MB
    			maxBytes: 100000000,
    			// set the directory
    			//dirname: dir
    			saveAs:function(file, handler) {
       						handler(null,dir+"/"+ran+'_'+file.filename);
   						}	
  			},function (err, uploadedFile) {
   	 			if (err) return res.serverError(err);
    			// logging the filename


    			//var up = uploadedFile[0].filename;
    			//var dirBase = dir.toString() + up.toString()

    			//real = rp.realpathSync(uploadedFile[0].fd.toString());

    			console.log(uploadedFile);

    			Product.create({ 
					reference: Math.random().toString(36),
					title: req.param('title'), 
					price: req.param('price'),
					description: req.param('description'),
					image: ran+'_'+uploadedFile[0].filename,
					new: req.param('new'),
					categoryid: req.param('category'),
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
	},

	/* getProduct: function(req, res) {
		Product.find({}, function(err, found) {
			res.view('article', {products: found});
		});
	} */


	getNewProduct: function(req, res) {
		Product.query('SELECT * FROM product WHERE new = 1', function(err, result){
			if(err) return res.serverError(err);

			console.log(result);

			res.view('article', {articles: result});
		});
  	},

  	showProductByCategory: function(req, res) {
  		var string = 'SELECT * FROM product INNER JOIN category ON product.categoryid = category.id WHERE categoryid = '+req.allParams('id').id
  		console.log(string);
  		Product.query(string, function(err, result){
			if(err) return res.serverError(err);

			console.log(result);

			res.view('produit', {articles: result});
		});
  	}


};
