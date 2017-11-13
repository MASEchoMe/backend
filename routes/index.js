var express = require('express');
var router = express.Router();

/* Controllers */
var messagesController = require('../controllers/messagesController');
var usersController = require('../controllers/usersController');
var productsController = require('../controllers/productsController');

/* POST a new group */
router.post('/api/newGroup', function(req, res, next) {
	body = req.body;
	usersController.newGroup(res);
});

/* POST a new user */
router.post('/api/newUserTempToken', function(req, res, next) {
	body = req.body;
	if (!('name' in body && 'groupId' in body)) {
		res.status(400);
		res.send("Body must contain a name and groupId\n");
	} else {
		usersController.newUserTempToken(body["name"], body["groupId"], res);
	}
});

/* GET an existing user's temporary token */
router.get('/api/getUserTempToken', function(req, res, next) {
	if (!req.query.name || !req.query.groupId) {
		res.status(400);
		res.send("Parameters must contain a name and a groupId\n");
	} else {
		usersController.getUserTempToken(req.query.name, req.query.groupId, res);
	}
});

/* GET an existing user via a temporary token */
router.get('/api/getUser', function(req, res, next) {
	if (!req.query.tempToken) {
		res.status(400);
		res.send("Parameters must contain a temporary token\n");
	} else {
		usersController.getUser(req.query.tempToken, res);
	}
});

/* GET all messages for a specific user */
router.get('/api/messages', function(req, res, next) {
	if (!req.query.name || !req.query.groupId) {
		res.status(400);
		res.send("Parameters must contain a name and a groupId\n");
	} else {
		usersController.getMessages(req.query.name, req.query.groupId, res);
	}
});

/* POST a new message */
router.post('/api/messages', function(req, res, next) {
	body = req.body;
	if (!("recipient" in body) || !("groupId" in body) || !("sender" in body) || !("message" in body)) {
		res.status(400);
		res.send("Body must contain a recipient, a recipient's groupId, a sender, and a message\n");
	} else {
		messagesController.newMessage(body["recipient"], body["groupId"], body["sender"], body["message"], res);
	}
});

/* DELETE a message for a specific user */
router.delete('/api/messages', function(req, res, next) {
	body = req.body;
	if (!("messageId" in body)) {
		res.status(400);
		res.send("Body must contain a messageId\n");
	} else {
		messagesController.deleteMessage(body["messageId"], res);
	}
});

/* GET only unread messages for a specific user */
router.get('/api/messages/unread', function(req, res, next) {
	if (!req.query.name || !req.query.groupId) {
		res.status(400);
		res.send("Parameters must contain a name and a groupId\n");
	} else {
		usersController.getUnreadMessages(req.query.name, req.query.groupId, res);
	}
});

 /* GET a product recommendation */
router.get('/api/products', function(req, res, next) {
	if (!req.query.product) {
		res.status(400);
		res.send("Parameters must contain a product\n");
	} else {
		productsController.getProductLink(req.query.product, res);
	}
})

module.exports = router;
