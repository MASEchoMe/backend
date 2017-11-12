var express = require('express');
var router = express.Router();

/* Controllers */
var messagesController = require('../controllers/messagesController');
var usersController = require('../controllers/usersController');
var productsController = require('../controllers/productsController');

/* POST new group */
router.post('/api/newGroup', function(req, res, next) {
	body = req.body;
	usersController.newGroup(res);
});

/* POST new user */
router.post('/api/newUserTempToken', function(req, res, next) {
	body = req.body;
	console.log(req.body);
	if (!('name' in body && 'groupId' in body)) {

		res.status(400);
		res.send("Body must contain a name and groupId\n");
	} else {
		usersController.newUserTempToken(body["name"], body["groupId"], res);
	}
});

/* GET a user */
router.get('/api/getUserTempToken', function(req, res, next) {
	body = req.body;
	if (!("name" in body) || !("groupId" in body)) {
		res.status(400);
		res.send("Body must contain a name and a groupId\n");
	} else {
		usersController.getUserTempToken(body["name"], body["groupId"], res);
	}
});

router.get('/api/getUserToken', function(req, res, next) {
	body = req.body;
	if (!("tempToken" in body)) {
		res.status(400);
		res.send("Body must contain a tempToken\n");
	} else {
		usersController.getUserToken(body["tempToken"], res);
	}
});

/* GET all messages from a user. */
router.get('/api/messages', function(req, res, next) {
	body = req.body;
	if (!("name" in body) || !("groupId" in body)) {
		res.status(400);
		res.send("Body must contain a name and a groupId\n");
	} else {
		usersController.getMessages(body["name"], body["groupId"], res);
	}
});

/* GET only unread messages from a user. */
router.get('/api/users/unread/:userId', function(req, res, next) {
	usersController.getUnreadMessages(req.get("token"), req.params["userId"], res);
});

/* POST new message */
router.post('/api/messages', function(req, res, next) {
	body = req.body;
	if (!("recipient" in body) || !("groupId" in body) || !("sender" in body) || !("message" in body)) {
		res.status(400);
		res.send("Body must contain a recipient, a recipient's groupId, a sender, and a message\n");
	} else {
		messagesController.newMessage(body["recipient"], body["groupId"], body["sender"], body["message"], res);
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
