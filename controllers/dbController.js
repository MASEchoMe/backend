var mysql = require('mysql');

// Configuration for database connection
// TODO: move this to a config file and don't hardcode the password
var connection = mysql.createConnection({
	host: 'echome-db.cdwdr3fxmjiq.us-east-1.rds.amazonaws.com',
	user: 'chainvaper',
	password: 'Chainvapers!',
	port: 3306,
	database: 'echome_db'
});

// Establish a connection to the database
connection.connect(function(err) {
	if (err) throw err;
	console.log("Successfully connected to database");
});

/****************************** Database Controller Methods ******************************/

/**
 * Adds a user to the 'users' table in the database
 * 
 * @param {*} name 
 * @param {*} res 
 */
var addUser = function(name, groupId, token, res, callback) {

/* TODO:::::::::::::: */
/* UPDATE THE QUERY TO INCLUDE GROUPID AND TOKEN */
	var query = 'INSERT INTO users (name, create_date, is_active) VALUES (?, ?, 1)';

	connection.query(query, [name, new Date()], function (err, results) {
		if (err) {
			res.status(400);
			res.write(err);
		} else {
			callback();
		}
	});
}

/**
 * Add a message to the 'messages' table in the database
 * 
 * @param {*} message
 * @param {*} senderName
 * @param {*} recipientName
 * @param {*} res
 */
var addMessage = function(message, senderName, recipientName, res) {
	
	var query = `INSERT INTO messages (sender_id, sender_name, recipient_id,
						recipient_name, message, is_read, create_date, expiration_date,
						is_reminder, next_remind_date, reminder_frequency_id)
					VALUES (?)`;

	getUsers(senderName, recipientName, function(err, sender, recipient) {
		if (err) {
			throw err;
		} else {
			var values = [
				sender.user_id,		//sender_id
				sender.name,		//sender_name
				recipient.user_id,	//recipient_id
				recipient.name,		//recipient_name
				message,			//message
				0,					//is_read
				new Date(),			//create_date
				null,				//expiration_date
				0,					//is_reminder
				null,				//next_remind_date
				null				//reminder_frequency_id
			];

			connection.query(query, [values], function (err, results) {
				if (err) {
					res.status(400);
					res.write(err);
				} else {
					res.write("Successfully added " + senderName + "'s message to " + recipientName);
				}
			});
		}
	});
}

/**
 * Deletes a message from the 'messages' table in the database
 * 
 * @param {*} token 
 * @param {*} messageId 
 * @param {*} res 
 */
var deleteMessage = function(token, messageId, res) {

	var query = 'DELETE FROM messages WHERE message_id=?';
	
	connection.query(query, [messageId], function (err, results) {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.send("Successfully deleted message " + messageId);
		}
	});
}

/**
 * Returns all the messages for a particular user
 * 
 * @param {*} token
 * @param {*} userId 
 * @param {*} res 
 */
var getMessages = function(token, userId, res) {

	// get the messages for the user with 'user_id'
	var query = 'SELECT sender_name, message, create_date FROM messages WHERE recipient_id=?';

	connection.query(query, [userId], function (err, results) {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.send(results);
		}
	});

	// update the messages to read by changing each message's 'is_read' value to 1
	query = 'UPDATE messages SET is_read = 1 WHERE recipient_id=?';

	connection.query(query, [userId], function (err, results) {
		if (err) {
			res.status(400);
			res.send(err);
		}
	});
}

/**
 * Returns all the unread messages for a particular user
 * 
 * @param {*} token 
 * @param {*} userId 
 * @param {*} res 
 */
var getUnreadMessages = function(token, userId, res) {
	
	// get the messages for the user with 'user_id'
	var query = 'SELECT sender_name, message, create_date FROM messages WHERE recipient_id=? and is_read=0';

	connection.query(query, [userId], function (err, results) {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.send(results);
		}
	});

	// update the messages to read by changing each message's 'is_read' value to 1
	query = 'UPDATE messages SET is_read = 1 WHERE recipient_id=?';

	connection.query(query, [userId], function (err, results) {
		if (err) {
			res.status(400);
			res.send(err);
		}
	});
}

var getUserByNameAndToken = function(token, name, callback) {
	// get user with name or token
	callback(null);
}

module.exports = {addUser, addMessage, deleteMessage, getMessages, getUnreadMessages};

/****************************** Helper Methods ******************************/

var getUsers = function(senderName, recipientName, callback) {

	var query = 'SELECT user_id, name FROM users WHERE name=? or name=?';
	
	connection.query(query, [senderName, recipientName], function (err, results) {
		if (err) {
			res.status(400);
			res.send("Sender and/or recipient is not a valid user.\n" + err);
		} else {

			// TODO: fix this crap code...it is late and I want it to work
			var sender, recipient;
			if (results[0].name == senderName) {
				sender = results[0];
				recipient = results[1];
			} else {
				sender = results[1];
				recipient = results[0];
			}
			callback(null, sender, recipient);
		}
	});
}


