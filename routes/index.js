var express = require('express');
var router = express.Router();

/* GET all messages from a user. */
router.get('/api/users/:userId', function(req, res, next) {

});

/* GET only unread messages from a user. */
router.get('/api/users/unread/:userId', function(req, res, next) {

});

/* POST new message */
router.post('/api/messages', function(req, res, next) {

});

/* DELETE a message (must have receiver's token) */
router.delete('/api/messages/:messageId', function(req, res, next) {

});

 /* GET a product recommendation */
router.get('/api/products', function(req, res, next) {

})

module.exports = router;
