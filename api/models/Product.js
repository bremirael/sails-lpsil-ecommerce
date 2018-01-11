/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    reference : { type: 'string' },

    title : { type: 'string' },

    price : { type: 'float' },

    description : { type: 'text' },

    image : { type: 'string' },

    new : { type: 'integer'},

    categoryid: {
    	model: 'category'
    }
  }
};

