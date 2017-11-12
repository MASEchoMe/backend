var dbController = require('./dbController');

var newMessage = function(recipient, groupId, sender, message, res) {
    dbController.addMessage(recipient, groupId, sender, message, res);
}

var deleteMessage = function(token, messageId, res) {
    dbController.deleteMessage(token, messageId, res);
}

module.exports = {newMessage, deleteMessage};