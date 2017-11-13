var dbController = require('./dbController');

var newMessage = function(recipient, groupId, sender, message, res) {
    dbController.addMessage(recipient, groupId, sender, message, res);
}

var deleteMessage = function(messageId, res) {
    dbController.deleteMessage(messageId, res);
}

module.exports = {newMessage, deleteMessage};