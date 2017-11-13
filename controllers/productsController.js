var amazon = require('amazon-product-api');

/**
 * Gets a product recommendation link for the keyword product
 * 
 * @param {*} product 
 * @param {*} res 
 */
var getProductLink = function(product, res) {
    client.itemSearch({
        keywords: product
      }, function(err, results) {
        if (err) {
          res.send(err);
        } else {
          res.send(results[0].DetailPageURL); 
        }
      });
}

module.exports = {getProductLink};