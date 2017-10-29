var express = require('express');
var router = express.Router();

/* Controllers */
var messagesController = require('../controllers/messagesController');
var usersController = require('../controllers/usersController');
var productsController = require('../controllers/productsController');

/* POST new user */
router.post('/api/users', function(req, res, next) {
	body = req.body;
	if (!("name" in body)) {
		res.status(400);
		res.send("Body must contain a name\n");
	} else {
		usersController.addUser(req.get("token"), body["name"], res);
	}
});

/* GET all messages from a user. */
router.get('/api/users/:userId', function(req, res, next) {
	usersController.getMessages(req.get("token"), req.params["userId"], res);
});

/* GET only unread messages from a user. */
router.get('/api/users/unread/:userId', function(req, res, next) {
	usersController.getUnreadMessages(req.get("token"), req.params["userId"], res);
});

/* POST new message */
router.post('/api/messages', function(req, res, next) {
	body = req.body;
	if (!("message" in body) || !("sender" in body) || !("recipient" in body)) {
		res.status(400);
		res.send("Body must contain a message, a sender, and a recipient\n");
	} else {
		messagesController.newMessage(req.get("token"),
				body["message"], body["sender"], body["recipient"], res);
	}
});

/* DELETE a message (must have receiver's token) */
router.delete('/api/messages/:messageId', function(req, res, next) {
	messagesController.deleteMessage(req.get("token"), req.params["messageId"], res)
});

 /* GET a product recommendation */
router.get('/api/products', function(req, res, next) {
	body = req.body;
	if (!("product" in body)) {
		res.status(400);
		res.send("Body must contain a product search term\n");
	} else {
		productsController.getProductLink(req.get("token"), body["product"], res);
	}
})

module.exports = router;
