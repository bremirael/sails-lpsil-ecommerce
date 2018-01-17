/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	show : function (req, res) {
		Category.query('SELECT * FROM category', function(err, result) {
			if(err) return res.serverError(err);

			console.log(result);

			res.view('category', {categories: result});
		});
	}
	
};

