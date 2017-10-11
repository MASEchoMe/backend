var dbController = require('./dbController');

dbController.addMessage("1234", "103124123", "This is a test message");

var newMessage = function(token, message, sender, recipient) {

}

var deleteMessage = function(token, messageId) {

}

module.exports = newMessage, deleteMessage;