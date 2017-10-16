var dbController = require('./dbController');

var newMessage = function(token, message, sender, recipient, res) {
    dbController.addMessage(message, sender, recipient, res);
}

var deleteMessage = function(token, messageId, res) {
    dbController.deleteMessage(token, messageId, res);
}

module.exports = {newMessage, deleteMessage};