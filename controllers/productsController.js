var amazon = require('amazon-product-api');

var client = amazon.createClient({
    awsId: process.env.AWS_ID,
    awsSecret: process.env.AWS_SECRET,
    awsTag: process.env.AWS_TAG
  });

// var client = amazon.createClient({
//     awsId: "AKIAI6RASLQCHLXUANVQ",
//     awsSecret: "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",
//     awsTag: "echome0b-20"
//   });

var getProductLink = function(product, res) {
    client.itemSearch({
        director: 'Quentin Tarantino',
        actor: 'Samuel L. Jackson',
        searchIndex: 'DVD',
        audienceRating: 'R',
        responseGroup: 'ItemAttributes,Offers,Images'
      }, function(err, results) {
        if (err) {
          res.send(err);
        } else {
          res.send(results); 
        }
      });
}

module.exports = {getProductLink};