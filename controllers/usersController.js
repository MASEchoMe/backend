var dbController = require('./dbController');

var addUser = function(token, name, res) {
    dbController.addUser(name, res);
}

var getMessages = function(token, userId, res) {
    dbController.getMessages(token, userId, res);
}

var getUnreadMessages = function(token, userId, res) {
    dbController.getUnreadMessages(token, userId, res);
}

module.exports = {addUser, getMessages, getUnreadMessages};