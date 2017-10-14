var dbController = require('./dbController');


var getMessages = function(token, userId, res) {
    dbController.getMessages(userId);
}

var getUnreadMessages = function(token, userId, res) {

}

module.exports =getMessages, getUnreadMessages;