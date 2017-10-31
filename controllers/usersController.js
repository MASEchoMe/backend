var smallrand = require('unique-random')(10000000, 99999999);

var dbController = require('./dbController');

var tempTokens = {};

/*****************************
 ********** Helpers **********
 *****************************
 */

var token16 = function() {
    str = ""
    for (var i = 0; i < 2; i++) {
        str += smallrand();
    }
    return str;
}

var token256 = function() {
    str = ""
    for (var i = 0; i < 16; i++) {
        str += token16();
    }
    return str;
}

/*****************************
 ********** Helpers **********
 *****************************
 */

var newGroup = function(res) {
    groupToken = token256();
    res.json({
        "groupId": groupToken
    });
    res.end();
}

/**
 * This method is invoked to retrieve a temporary token
 * when a new user is created. Here, you ask Alexa to
 * create a new user, and it gives back a 6 digit number
 * that expires in 10 minutes.
 *
 * Then, you use that temporary
 * token to retrieve a secret token which you save to the
 * device and use whenever you need to authenticate a user.
 */
var newUserTempToken = function(name, groupId, res) {
    tempToken = token16();
    bigToken = token256();
    dbController.addUser(name, groupId, bigToken, res, function() {
        tempTokens[tempToken] = {
            "token": bigToken,
            "timestamp": new Date().getTime() / 1000,
            "name": name
        };
        res.json({"tempToken": tempToken});
        res.end();
    });
}

/**
 * This method retrieves a temporary token for a user that
 * already exists. So if you create a user and need to log
 * into his account on a new device, call this with the
 * extended token that you have saved for the account on the
 * Alexa or app.
 */
var getUserTempToken = function(token, name, res) {
    tempToken = token16();
    console.log(tempToken);
    dbController.getUserByTokenAndName(token, name, function(user) {
        if (user == null) {
            // If the token is wrong or user doesn't exist, throw
            // authentication error.
            res.status(401);
        } else {
            // If the user does exist, simply return a temporary token
            // that can be used to fetch the permanent token

            tempToken = token16();
            tempTokens[tempToken] = {
                "token": user.token,
                "timestamp": new Date().getTime() / 1000,
                "name": name
            };
            res.json({
                "tempToken": tempToken,
                "name": user.name
            });
            res.end();
        }
    });
}

/**
 * After you've successfully been given a temporary token,
 * call this method with the temporary token as a parameter
 * to retrieve the full token
 */
var getUserToken = function(tempToken, res) {
    var time = new Date().getTime() / 1000;
    if (tempToken in tempTokens &&
                time - tempTokens[tempToken].timestamp < 60000) {
        console.log("Getting the user's token");
        res.json({
            "token": tempTokens[tempToken].token,
            "name": tempTokens[tempToken].name
        });
        res.end();
    } else {
        res.status(401);
        res.send("Authentication error");
    }
}

var getMessages = function(token, name, res) {
    dbController.getMessages(token, name, res);
}

var getUnreadMessages = function(token, name, res) {
    dbController.getUnreadMessages(token, name, res);
}

module.exports = {newGroup, newUserTempToken, getUserTempToken, 
        getUserToken, getMessages, getUnreadMessages};