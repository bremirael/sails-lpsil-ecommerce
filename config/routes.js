/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {


  '/': {
    view: 'home'
  },

  '/home': {
    view: 'home'
  },

  '/product': {
    view: 'product/product'
  },

  /*'post /product/create': 'ProductController.create', */
  'get /product/new': 'ProductController.getNewProduct',
  'get /layout/category': 'CategoryController.show',
  'get /layout/product/:id': 'ProductController.showProductByCategory',

  // register
  'get /register': {
    view: 'register'
  },
  'post /register/create' : 'UserController.register',

  //Connection
  'get /login': {
    view: 'login'
  },
  'post /login/connect': 'UserController.login',

  'get /logout': 'UserController.logout',

  'get /admin': {
    view: 'admin'
  },

  'get /admin/adminUser': 'AdminController.printUser',
  'get /admin/adminUserEdit/:id': 'AdminController.editUser',
  'get /admin/userCreate': {view: 'adminUserCreate'},
  'post /admin/adminUserDelete/:id': 'AdminController.deleteUser',
  'post /admin/adminUserCreate': 'AdminController.createUser',
  'post /admin/adminUserUpdate': 'AdminController.updateUser',


  'get /admin/adminCategory': 'AdminController.showCategory',
  'get /admin/adminCategoryEdit/:id': 'AdminController.editCategory',
  'get /admin/categoryCreate': {view: 'adminCategoryCreate'},
  'post /admin/adminCategoryDelete/:id': 'AdminController.deleteCategory',
  'post /admin/adminCategoryCreate': 'AdminController.createCategory',
  'post /admin/adminCategoryUpdate': 'AdminController.updateUser',


  'get /admin/adminProduct': 'ProductController.showProduct',
  'get /admin/adminProductCreate': 'ProductController.showCreate',
  'post /product/create': 'ProductController.create',

  //'post /admin/updateUser': 'AdminController.updateUser'1

  /*'get /login': 'AuthController.login',
  'get /logout': 'AuthController.logout',
  'get /register': 'AuthController.register',
  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback', 

   
  'get /auth/:provider': 'AuthController.provider',
  'get /auth/:provider/callback': 'AuthController.callback',
  'get /auth/:provider/:action': 'AuthController.callback', */


};
