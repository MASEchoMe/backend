var dbController = require('./dbController');

dbController.addMessage("1", "1234", "I hope this is working");
dbController.addMessage("2", "456", "hello bob");
dbController.addMessage("3", "789", "hello susan");
dbController.addMessage("4", "1234", "Maybe it isn't though...");

var newMessage = function(token, message, sender, recipient) {

}

var deleteMessage = function(token, messageId) {

}

module.exports = {newMessage, deleteMessage};